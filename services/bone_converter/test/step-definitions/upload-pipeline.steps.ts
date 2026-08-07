/**
 * bone_converter upload-pipeline BDD 步骤定义
 *
 * 覆盖 upload-pipeline.feature 的 9 个场景（S1-S9）：
 *  S1 解压 tripo zip → fbx + 纹理
 *  S2 无 fbx 的 zip 抛明确错误
 *  S3 加载 tripo fbx → SkinnedMesh + >20 骨
 *  S4 转换骨骼 → 全 mixamorig、22 骨、无 Root/Pelvis/Twist、skinIndex 合法、报告完整
 *  S5 传官方 rest pose → restPoseAlignedCount > 0
 *  S6 导出 ASCII FBX → FBXLoader 重新解析：网格/骨骼存在、mixamorig、skinIndex 合法、权重和 ≈1
 *  S7 纹理嵌入 → 重解析材质 map.image.src 为 data URL、解码字节与原 PNG 一致
 *  S8 主流程 processTripoZip → fbxData 可解析、骨骼全 mixamorig、纹理嵌入 ≥1、< 3MB
 *  S9 幂等守卫 → alreadyConverted=true
 *
 * 资产：demo/snapshot_EliteGiantess10/ 下 tripo fbx + PNG + lod2 fbx。
 * zip 在测试内用 jszip 现场打包（不依赖桌面文件）。
 */
// ── Node 环境 polyfill（three FBXLoader 需要 browser globals）──
// 增强版 MockImage：支持 addEventListener('load')，使 TextureLoader 的 data: URL
// 图片加载能触发回调 → S7 可断言 map.image.src 为 data URL。
(global as any).self = global;
(global as any).window = global;
(global as any).document = {
    createElement: (tag: string) => {
        if (tag === 'img' || tag === 'image') return new (global as any).MockImage();
        return {};
    },
    createElementNS: (_ns: string, tag: string) => {
        if (tag === 'img' || tag === 'image') return new (global as any).MockImage();
        return {};
    },
};
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 1;
    height = 1;
    private _listeners: Record<string, Array<() => void>> = {};
    private _src = '';
    get src() { return this._src; }
    set src(v: string) {
        this._src = v;
        // 同步触发（ImageLoader 的 onImageLoad 用 `this` 指代 image，需 bind）
        this.onload?.();
        (this._listeners['load'] || []).forEach((cb) => cb.call(this));
    }
    addEventListener(event: string, cb: any) {
        (this._listeners[event] = this._listeners[event] || []).push(cb);
    }
    removeEventListener(event: string, cb: any) {
        this._listeners[event] = (this._listeners[event] || []).filter((x) => x !== cb);
    }
    setAttribute(_name: string, _value: string) { }
    getAttribute(_name: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import { loadFeature, defineFeature } from 'jest-cucumber';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import JSZip from 'jszip';
import * as fs from 'fs';
import * as path from 'path';
import {
    processTripoZip,
    unzipTripoZip,
    loadFbx,
    convertToMixamo,
    exportFbx,
    loadOfficialRestPose,
    base64ToUint8Array,
    UploadPipelineResult,
    UnzippedTripo,
} from '../../src/tool/upload_pipeline/index';

const feature = loadFeature('./test/features/upload-pipeline.feature');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const SNAPSHOT_DIR = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess10');
const TRIPO_FBX = path.join(
    SNAPSHOT_DIR,
    'tripo_convert_1efef564-f149-410e-8df7-aff0deb624f6/tripo_convert_1efef564-f149-410e-8df7-aff0deb624f6.fbx',
);
const TRIPO_PNG = path.join(
    SNAPSHOT_DIR,
    'tripo_convert_1efef564-f149-410e-8df7-aff0deb624f6/tripo_convert_1efef564-f149-410e-8df7-aff0deb624f6.fbm/动漫女孩3d模型_basecolor.PNG',
);
const TRIPO_FBX_NAME = 'tripo_convert_1efef564-f149-410e-8df7-aff0deb624f6';
const TRIPO_PNG_NAME = '动漫女孩3d模型_basecolor.PNG';

/** 读取文件 → Uint8Array */
function readBytes(file: string): Uint8Array {
    const buf = fs.readFileSync(file);
    return new Uint8Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

/** 用 jszip 现场打包真实资产（fbx 顶层 + png 在 .fbm 目录下） */
async function buildRealZip(): Promise<ArrayBuffer> {
    const zip = new JSZip();
    zip.file(`${TRIPO_FBX_NAME}.fbx`, readBytes(TRIPO_FBX));
    zip.file(`${TRIPO_FBX_NAME}.fbm/${TRIPO_PNG_NAME}`, readBytes(TRIPO_PNG));
    return zip.generateAsync({ type: 'arraybuffer' });
}

/** 构造不含 fbx 的 zip */
async function buildNoFbxZip(): Promise<ArrayBuffer> {
    const zip = new JSZip();
    zip.file('readme.txt', 'no fbx here');
    zip.file('notes/folder.txt', 'another');
    return zip.generateAsync({ type: 'arraybuffer' });
}

function collectBoneNames(root: THREE.Object3D): string[] {
    const names: string[] = [];
    root.traverse((n) => { if ((n as THREE.Bone).isBone) names.push(n.name); });
    return names;
}

function collectMeshes(root: THREE.Object3D): THREE.SkinnedMesh[] {
    const meshes: THREE.SkinnedMesh[] = [];
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) meshes.push(n as THREE.SkinnedMesh); });
    return meshes;
}

defineFeature(feature, (test) => {
    /** Background 共享步骤：feature 里每个场景都隐式含 `Given the bone_converter package directory exists` */
    const givenPackageDirectoryExists = (given: (step: string, fn: () => void) => void): void => {
        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services/bone_converter'))).toBe(true);
        });
    };

    // ---- S1 解压 zip ----
    test('S1 解压 tripo zip 得到 fbx 与纹理', ({ given, when, then, and }) => {
        let zipBytes: ArrayBuffer;
        let result: UnzippedTripo;

        givenPackageDirectoryExists(given);

        given('a tripo zip built in-memory from the real snapshot_EliteGiantess10 assets', async () => {
            zipBytes = await buildRealZip();
        });
        when('unzipping the tripo zip', async () => {
            result = await unzipTripoZip(zipBytes);
        });
        then('the unzipped result should contain an fbx with at least 100KB and a matching fbx name', () => {
            expect(result.fbxBytes.length).toBeGreaterThan(100 * 1024);
            expect(result.fbxName).toBe(TRIPO_FBX_NAME);
        });
        and('the unzipped textures should contain exactly 1 entry whose bytes equal the original PNG', () => {
            expect(result.textures.size).toBe(1);
            const bytes = result.textures.get(TRIPO_PNG_NAME);
            expect(bytes).toBeDefined();
            expect(Buffer.from(bytes!)).toEqual(fs.readFileSync(TRIPO_PNG));
        });
    });

    // ---- S2 无 fbx 的 zip ----
    test('S2 无 fbx 的 zip 抛出明确错误', ({ given, when, then }) => {
        let zipBytes: ArrayBuffer;
        let error: Error | null = null;

        givenPackageDirectoryExists(given);

        given('a zip without any fbx file', async () => {
            zipBytes = await buildNoFbxZip();
        });
        when('unzipping the tripo zip', async () => {
            try {
                await unzipTripoZip(zipBytes);
            } catch (e) {
                error = e as Error;
            }
        });
        then('the unzip should reject with a clear error message', () => {
            expect(error).toBeDefined();
            expect(error!.message).toMatch(/fbx/i);
        });
    });

    // ---- S3 加载 tripo fbx ----
    test('S3 加载 tripo fbx 得到含蒙皮网格与骨骼的场景', ({ given, when, then }) => {
        let fbxBytes: Uint8Array;
        let obj: THREE.Object3D;

        givenPackageDirectoryExists(given);

        given('the unzipped tripo fbx bytes', async () => {
            fbxBytes = readBytes(TRIPO_FBX);
        });
        when('loading the fbx into a THREE.Object3D', () => {
            obj = loadFbx(fbxBytes);
        });
        then('the loaded object should contain a SkinnedMesh and more than 20 bones', () => {
            expect(collectMeshes(obj).length).toBeGreaterThan(0);
            expect(collectBoneNames(obj).length).toBeGreaterThan(20);
        });
    });

    // ---- S4 转换骨骼 ----
    test('S4 转换骨骼为 Mixamo 命名体系', ({ given, when, then, and }) => {
        let obj: THREE.Object3D;
        let report: ReturnType<typeof convertToMixamo>;

        givenPackageDirectoryExists(given);

        given('the loaded tripo Object3D', () => {
            obj = loadFbx(readBytes(TRIPO_FBX));
        });
        when('converting the bones to Mixamo skeleton', () => {
            report = convertToMixamo(obj);
        });
        then('all bones should start with mixamorig and the count should be 22', () => {
            const names = collectBoneNames(obj);
            expect(names.length).toBe(22);
            for (const n of names) expect(n.startsWith('mixamorig')).toBe(true);
        });
        and('no Root Pelvis or Twist bones should remain', () => {
            const names = collectBoneNames(obj);
            for (const n of names) {
                expect(n).not.toBe('Root');
                expect(n).not.toBe('Pelvis');
                expect(n).not.toMatch(/(Twist|twist)\d+$/i);
            }
        });
        and('every skinIndex should be less than the bone count', () => {
            for (const m of collectMeshes(obj)) {
                const si = m.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
                const arr = si.array as ArrayLike<number>;
                let max = -1;
                for (let i = 0; i < arr.length; i++) if (arr[i] > max) max = arr[i];
                expect(max).toBeLessThan(m.skeleton.bones.length);
            }
        });
        and('the convert report fields should be complete', () => {
            expect(report.alreadyConverted).toBe(false);
            expect(report.boneCountBefore).toBe(41);
            expect(report.boneCountAfter).toBe(22);
            expect(report.renameCount).toBeGreaterThanOrEqual(22);
            expect(report.skeletonRebuilt).toBe(true);
            expect(Array.isArray(report.boneNamesAfter)).toBe(true);
            expect(Array.isArray(report.warnings)).toBe(true);
        });
    });

    // ---- S5 官方 rest pose 对齐 ----
    test('S5 转换时传入官方 rest pose 对齐生效', ({ given, when, then }) => {
        let obj: THREE.Object3D;
        let report: ReturnType<typeof convertToMixamo>;

        givenPackageDirectoryExists(given);

        given('the loaded tripo Object3D and the official lod2 rest pose', () => {
            obj = loadFbx(readBytes(TRIPO_FBX));
        });
        when('converting the bones with the official rest pose', () => {
            report = convertToMixamo(obj, loadOfficialRestPose());
        });
        then('the report should count positive rest pose aligned bones', () => {
            expect(report.restPoseAlignedCount).toBeGreaterThan(0);
        });
    });

    // ---- S6 导出 FBX 可重解析 ----
    test('S6 导出 ASCII FBX 可被 FBXLoader 重新解析', ({ given, when, then, and }) => {
        let obj: THREE.Object3D;
        let fbxData: ArrayBuffer;
        let re: THREE.Object3D;

        givenPackageDirectoryExists(given);

        given('a converted Mixamo model with its embedded textures', () => {
            obj = loadFbx(readBytes(TRIPO_FBX));
            convertToMixamo(obj, loadOfficialRestPose());
        });
        when('exporting the model to an ASCII FBX ArrayBuffer', () => {
            const textures = new Map<string, Uint8Array>();
            textures.set(TRIPO_PNG_NAME, readBytes(TRIPO_PNG));
            fbxData = exportFbx(obj, { textures });
        });
        then('the exported ArrayBuffer should be non-empty', () => {
            expect(fbxData.byteLength).toBeGreaterThan(0);
        });
        and('the exported FBX should reparse successfully with bones named mixamorig', () => {
            re = new FBXLoader().parse(fbxData, '');
            const names = collectBoneNames(re);
            expect(names.length).toBe(22);
            for (const n of names) expect(n.startsWith('mixamorig')).toBe(true);
        });
        and('the reparsed mesh skinIndex values should be less than the bone count', () => {
            const mesh = collectMeshes(re)[0];
            expect(mesh).toBeDefined();
            const si = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
            const arr = si.array as ArrayLike<number>;
            let max = -1;
            for (let i = 0; i < arr.length; i++) if (arr[i] > max) max = arr[i];
            expect(max).toBeLessThan(mesh.skeleton.bones.length);
        });
        and('the reparsed per-vertex skin weight sums should be approximately 1', () => {
            const mesh = collectMeshes(re)[0];
            const sw = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
            const wArr = sw.array as ArrayLike<number>;
            const perVertex = wArr.length / 4;
            let sum = 0;
            for (let i = 0; i < wArr.length; i++) sum += wArr[i];
            const avg = sum / perVertex;
            expect(avg).toBeGreaterThan(0.95);
            expect(avg).toBeLessThan(1.05);
        });
    });

    // ---- S7 纹理嵌入 ----
    test('S7 纹理嵌入后 FBXLoader 可读出 data URL 且字节一致', ({ given, when, then, and }) => {
        let obj: THREE.Object3D;
        let fbxData: ArrayBuffer;
        let re: THREE.Object3D;

        givenPackageDirectoryExists(given);

        given('a converted Mixamo model with its embedded textures', () => {
            obj = loadFbx(readBytes(TRIPO_FBX));
            convertToMixamo(obj, loadOfficialRestPose());
        });
        when('exporting and reparsing the FBX', () => {
            const textures = new Map<string, Uint8Array>();
            textures.set(TRIPO_PNG_NAME, readBytes(TRIPO_PNG));
            fbxData = exportFbx(obj, { textures });
            re = new FBXLoader().parse(fbxData, '');
        });
        then('the reparsed material map should exist and its image src should start with data:image/png;base64,', () => {
            const mesh = collectMeshes(re)[0];
            const mat = mesh.material as THREE.MeshStandardMaterial;
            expect(mat.map).toBeDefined();
            const src = (mat.map as any).image?.src as string | undefined;
            expect(src).toBeDefined();
            expect(src!.startsWith('data:image/png;base64,')).toBe(true);
        });
        and('decoding the embedded base64 should equal the original PNG bytes', () => {
            const mesh = collectMeshes(re)[0];
            const mat = mesh.material as THREE.MeshStandardMaterial;
            const src = (mat.map as any).image?.src as string;
            const b64 = src.slice('data:image/png;base64,'.length);
            const decoded = base64ToUint8Array(b64);
            expect(Buffer.from(decoded)).toEqual(fs.readFileSync(TRIPO_PNG));
        });
    });

    // ---- S8 主流程 ----
    test('S8 主流程 processTripoZip 输出可解析且带嵌入纹理的 fbxData', ({ given, when, then, and }) => {
        let zipBytes: ArrayBuffer;
        let result: UploadPipelineResult;
        let re: THREE.Object3D;

        givenPackageDirectoryExists(given);

        given('a tripo zip built in-memory from the real snapshot_EliteGiantess10 assets', async () => {
            zipBytes = await buildRealZip();
        });
        when('calling processTripoZip on the zip bytes', async () => {
            result = await processTripoZip(zipBytes);
        });
        then('the result fbxData should reparse with all bones starting with mixamorig', () => {
            re = new FBXLoader().parse(result.fbxData, '');
            const names = collectBoneNames(re);
            expect(names.length).toBe(22);
            for (const n of names) expect(n.startsWith('mixamorig')).toBe(true);
        });
        and('the result should embed at least 1 texture', () => {
            expect(result.textureCount).toBeGreaterThanOrEqual(1);
        });
        and('the fbxByteLength should be less than 3MB', () => {
            expect(result.fbxByteLength).toBeLessThan(3 * 1024 * 1024);
        });
        and('the result report warnings should be an array', () => {
            expect(Array.isArray(result.warnings)).toBe(true);
        });
    });

    // ---- S9 幂等 ----
    test('S9 幂等守卫', ({ given, when, then }) => {
        let tree: THREE.Group;
        let report: ReturnType<typeof convertToMixamo>;

        givenPackageDirectoryExists(given);

        given('a bone tree already named with mixamorig names', () => {
            tree = new THREE.Group();
            tree.add(new THREE.Bone(), new THREE.Bone());
            const names = ['mixamorigHips', 'mixamorigRightArm', 'mixamorigRightUpLeg'];
            tree.children[0].name = names[0];
            tree.children[1].name = names[1];
            const third = new THREE.Bone();
            third.name = names[2];
            tree.add(third);
        });
        when('converting the bones to Mixamo skeleton', () => {
            report = convertToMixamo(tree);
        });
        then('the report should mark the model as already converted', () => {
            expect(report.alreadyConverted).toBe(true);
        });
    });
});
