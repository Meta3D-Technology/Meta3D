/**
 * bone_converter D4 BDD 步骤定义
 *
 * 覆盖 d4-convert.feature 的 6 个场景：
 *  1. S2 restructureHierarchy：Root 删除、Hip 提升、Pelvis 合并、世界变换保持
 *  2. S3 fixSkinningIndices：指向被删骨的 skinIndex 重映射，权重和保持
 *  3. S4 mergeBoneWeights：Twist 骨槽重定向到父骨新索引，权重不动
 *  4. B2 两个 SkinnedMesh 共享同一 Skeleton，只重建一份
 *  5. convertTripoToMixamo 主流程：真实 Tripo FBX 完整转换
 *  6. 幂等守卫：已是 mixamorig 命名的树 early-return
 *
 * 运行：cd services/bone_converter && yarn test:bdd
 */
// ── Node 环境 polyfill（three FBXLoader 需要 browser globals）──
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
    private _src = '';
    get src() { return this._src; }
    set src(v: string) {
        this._src = v;
        if (this.onload) setTimeout(() => this.onload!(), 0);
    }
    addEventListener(_event: string, _cb: any) { }
    removeEventListener(_event: string, _cb: any) { }
    setAttribute(_name: string, _value: string) { }
    getAttribute(_name: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_TRIPO_TO_MIXAMO_MAP } from '../../src/tool/bone_converter/BoneMapping';
import { restructureHierarchy } from '../../src/tool/bone_converter/restructureHierarchy';
import { fixSkinningIndices } from '../../src/tool/bone_converter/fixSkinningIndices';
import { mergeBoneWeights } from '../../src/tool/bone_converter/mergeBoneWeights';
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';
import { ConvertReport } from '../../src/tool/bone_converter/types';

const feature = loadFeature('./test/features/d4-convert.feature');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);
// V12.3 关节区重绑场景：EliteGiantess9 快照（tripo 转换模型 + 官方 lod2 参照）
const ELITE_TRIPO_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const ELITE_LOD2_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

/** 解析真实 FBX（每次新解析，避免场景间互相污染） */
function parseFreshModel(): THREE.Object3D {
    const buf = fs.readFileSync(MODEL_FBX);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** 收集全部骨骼名（遍历序） */
function collectBoneNames(root: THREE.Object3D): string[] {
    const names: string[] = [];
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) names.push(n.name);
    });
    return names;
}

/** 收集全部 SkinnedMesh */
function collectMeshes(root: THREE.Object3D): THREE.SkinnedMesh[] {
    const meshes: THREE.SkinnedMesh[] = [];
    root.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh) meshes.push(n as THREE.SkinnedMesh);
    });
    return meshes;
}

/** 解析 FBX（新解析，避免场景间互相污染） */
function parseFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** V12.3 区域分桶骨名（Mixamo 基础身骨，与 diag-arm-leg-region 一致） */
const REGION_BONES_22 = [
    'mixamorigHead', 'mixamorigNeck', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigHips',
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
    'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
    'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
];

/**
 * V12.3 验证助手：用官方 lod2 骨骼 bind 世界位置给物理顶点分桶（最近骨=区域），
 * 统计每个区域的「主导骨（最大权重槽）」分布。与 diag-arm-leg-region 同一方法。
 */
function computeRegionDominant(
    model: THREE.Object3D,
    officialRoot: THREE.Object3D,
): Map<string, Map<string, number>> {
    officialRoot.updateMatrixWorld(true);
    const offBoneWorld = new Map<string, THREE.Vector3>();
    officialRoot.traverse((n) => {
        if ((n as THREE.Bone).isBone) {
            offBoneWorld.set(n.name, (n as THREE.Bone).getWorldPosition(new THREE.Vector3()));
        }
    });
    const regionOf = (p: THREE.Vector3): string => {
        let best = 'mixamorigHips';
        let bestD = Infinity;
        for (const rn of REGION_BONES_22) {
            const wp = offBoneWorld.get(rn);
            if (!wp) continue;
            const d = p.distanceTo(wp);
            if (d < bestD) {
                bestD = d;
                best = rn;
            }
        }
        return best;
    };

    const mesh = collectMeshes(model)[0];
    const posAttr = mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
    const si = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const sw = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
    const bones = mesh.skeleton.bones;
    const map = new Map<string, Map<string, number>>();
    const vTmp = new THREE.Vector3();
    for (let v = 0; v < posAttr.count; v++) {
        vTmp.set(posAttr.getX(v), posAttr.getY(v), posAttr.getZ(v));
        const r = regionOf(vTmp);
        let bi = -1;
        let bw = -1;
        for (let k = 0; k < 4; k++) {
            const w = (sw.array as Float32Array)[v * 4 + k];
            if (w > bw) {
                bw = w;
                bi = k;
            }
        }
        const dom = bi >= 0 ? (bones[(si.array as Uint16Array)[v * 4 + bi]]?.name ?? '?') : '?';
        if (!map.has(r)) map.set(r, new Map<string, number>());
        const m = map.get(r)!;
        m.set(dom, (m.get(dom) || 0) + 1);
    }
    return map;
}

/** 取区域主导骨分布中某骨名的顶点数（缺省 0） */
function regionCount(dom: Map<string, Map<string, number>>, region: string, boneName: string): number {
    return dom.get(region)?.get(boneName) ?? 0;
}

const mkBone = (name: string): THREE.Bone => {
    const b = new THREE.Bone();
    b.name = name;
    return b;
};

/** 构造 1 顶点 SkinnedMesh：skinIndex/skinWeight 为 4 槽数组 */
function makeSkinnedMesh(
    bones: THREE.Bone[],
    skinIndex: number[],
    skinWeight: number[],
): THREE.SkinnedMesh {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
    geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(new Uint16Array(skinIndex), 4));
    geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(new Float32Array(skinWeight), 4));
    const mesh = new THREE.SkinnedMesh(geo, new THREE.MeshBasicMaterial());
    mesh.bind(new THREE.Skeleton(bones));
    return mesh;
}

/** 记录每个骨骼的世界位置（骨骼名 → position） */
function recordWorldPositions(root: THREE.Object3D): Map<string, THREE.Vector3> {
    root.updateMatrixWorld(true);
    const map = new Map<string, THREE.Vector3>();
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) {
            const v = new THREE.Vector3();
            (n as THREE.Bone).getWorldPosition(v);
            map.set(n.name, v);
        }
    });
    return map;
}

/** 对比两套世界位置，返回最大欧氏距离 */
function maxWorldDelta(before: Map<string, THREE.Vector3>, after: Map<string, THREE.Vector3>): number {
    let maxDelta = 0;
    for (const [name, pos] of before) {
        const afterPos = after.get(name);
        if (!afterPos) continue;
        const d = pos.distanceTo(afterPos);
        if (d > maxDelta) maxDelta = d;
    }
    return maxDelta;
}

defineFeature(feature, (test) => {
    /**
     * S2：Background Given「the bone_converter package directory exists」共享注册。
     * jest-cucumber 3.x 的 Background 步骤会并入每个场景的 parsed steps（校验时逐场景比对），
     * 无法只在单个场景注册后其他场景删除；提取为共享步骤函数，各场景复用以消除重复。
     */
    const givenPackageDirectoryExists = (given: DefineStepFunction): void => {
        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
    };

    // ---- 场景 1：S2 restructureHierarchy ----
    test('S2 restructureHierarchy 删除 Root 合并 Pelvis 并保持世界变换', ({ given, when, then, and }) => {
        let group: THREE.Group;
        let worldBefore: Map<string, THREE.Vector3>;
        let result: { oldToNewIndexMap: Map<number, number>; deletedBoneNames: string[] };
        let rThigh: THREE.Bone;

        givenPackageDirectoryExists(given);

        given('a bone tree with Root Hip Pelvis and R_Thigh', () => {
            const root = mkBone('Root');
            const hip = mkBone('Hip');
            const pelvis = mkBone('Pelvis');
            rThigh = mkBone('R_Thigh');
            const waist = mkBone('Waist');
            root.position.set(0, 2, 0);
            hip.position.set(0, 1, 0);
            pelvis.position.set(0, 1, 0);
            rThigh.position.set(0.5, -1, 0.3);
            waist.position.set(0, 0.5, 0);
            root.add(hip);
            hip.add(pelvis);
            hip.add(waist);
            pelvis.add(rThigh);
            group = new THREE.Group();
            group.add(root);
            worldBefore = recordWorldPositions(group);
        });

        when('calling restructureHierarchy with the default mapping', () => {
            result = restructureHierarchy(group, DEFAULT_TRIPO_TO_MIXAMO_MAP);
        });

        then('the Root and Pelvis bones should no longer exist in the tree', () => {
            const names = collectBoneNames(group);
            expect(names).not.toContain('Root');
            expect(names).not.toContain('Pelvis');
        });

        and('R_Thigh should be a direct child of Hip', () => {
            expect(rThigh.parent).toBeDefined();
            expect((rThigh.parent as THREE.Bone).name).toBe('Hip');
        });

        and('Hip should be the root of the bone hierarchy', () => {
            const hip = group.children.find((c) => (c as THREE.Bone).isBone && c.name === 'Hip');
            expect(hip).toBeDefined();
            expect(hip!.parent).toBe(group);
        });

        and(/^every bone world transform should be preserved within ([\d.]+)$/, () => {
            const worldAfter = recordWorldPositions(group);
            const delta = maxWorldDelta(worldBefore, worldAfter);
            expect(delta).toBeLessThan(0.001);
        });

        and('the returned deleted bone names should include Root and Pelvis', () => {
            expect(result.deletedBoneNames).toContain('Root');
            expect(result.deletedBoneNames).toContain('Pelvis');
        });
    });

    // ---- 场景 2：S3 fixSkinningIndices ----
    test('S3 fixSkinningIndices 修复指向被删骨的 skinIndex', ({ given, when, then, and }) => {
        let group: THREE.Group;
        let mesh: THREE.SkinnedMesh;
        let oldToNewIndexMap: Map<number, number>;
        let result: { fixedVertexCount: number };
        let weightSum: number;

        givenPackageDirectoryExists(given);

        given('a SkinnedMesh with 3 bones and skinIndex referencing a deleted bone', () => {
            const hip = mkBone('Hip');
            const pelvis = mkBone('Pelvis'); // 将被删（merge 到 Hip）
            const rThigh = mkBone('R_Thigh');
            const bones = [hip, pelvis, rThigh];
            const skinIndex = [0, 1, 1, 2]; // 槽1/槽2 指向被删的 Pelvis(1)
            const skinWeight = [0.5, 0.3, 0.1, 0.1]; // 和为 1
            mesh = makeSkinnedMesh(bones, skinIndex, skinWeight);
            group = new THREE.Group();
            group.add(mesh);
            // 全量映射：Pelvis(1) → Hip(0)，其余保持
            oldToNewIndexMap = new Map<number, number>([
                [0, 0],
                [1, 0],
                [2, 2],
            ]);
        });

        when('calling fixSkinningIndices with a full index map', () => {
            result = fixSkinningIndices(group, oldToNewIndexMap);
        });

        then('the maximum skinIndex should be less than the bone count', () => {
            const si = mesh.geometry.attributes.skinIndex.array as Uint16Array;
            let max = -1;
            for (const v of Array.from(si)) if (v > max) max = v;
            expect(max).toBeLessThan(mesh.skeleton.bones.length); // 2 < 3
        });

        and('no skinIndex value should be -1 or 65535', () => {
            const si = mesh.geometry.attributes.skinIndex.array as Uint16Array;
            for (const v of Array.from(si)) {
                expect(v).not.toBe(-1);
                expect(v).not.toBe(65535);
                expect(v).toBeGreaterThanOrEqual(0);
            }
        });

        and('the per-vertex skin weight sum should be approximately 1', () => {
            const sw = mesh.geometry.attributes.skinWeight.array as Float32Array;
            weightSum = Array.from(sw).reduce((a, b) => a + b, 0);
            expect(weightSum).toBeGreaterThan(0.95);
            expect(weightSum).toBeLessThan(1.05);
        });

        and('the fixed vertex count should be 2', () => {
            expect(result.fixedVertexCount).toBe(2);
        });
    });

    // ---- 场景 3：S4 mergeBoneWeights ----
    test('S4 mergeBoneWeights 将 Twist 骨槽重定向到父骨', ({ given, when, then, and }) => {
        let group: THREE.Group;
        let mesh: THREE.SkinnedMesh;
        let twistBoneNames: Set<string>;
        let oldToNewIndexMap: Map<number, number>;
        let weightsBefore: number[];

        givenPackageDirectoryExists(given);

        given('a SkinnedMesh with a twist bone influence slot', () => {
            const hip = mkBone('Hip');
            const upperarm = mkBone('R_Upperarm');
            const twist = mkBone('R_UpperarmTwist01'); // Twist 骨
            const forearm = mkBone('R_Forearm');
            const bones = [hip, upperarm, twist, forearm]; // 索引 0,1,2,3
            const skinIndex = [0, 2, 3, 0]; // 槽1 指向 Twist 骨(2)
            const skinWeight = [0.5, 0.3, 0.15, 0.05]; // 和为 1
            mesh = makeSkinnedMesh(bones, skinIndex, skinWeight);
            // 从实际 Float32 buffer 记录权重（避免浮点精度差异导致 deep-equal 失败）
            weightsBefore = Array.from(mesh.geometry.attributes.skinWeight.array as Float32Array);
            group = new THREE.Group();
            group.add(mesh);
            twistBoneNames = new Set<string>(['R_UpperarmTwist01']);
            // Twist(2) → 父骨 R_Upperarm(1) 的新索引（保持不变=1）
            oldToNewIndexMap = new Map<number, number>([
                [0, 0],
                [1, 1],
                [2, 1],
                [3, 3],
            ]);
        });

        when('calling mergeBoneWeights with the twist bone names', () => {
            mergeBoneWeights(group, twistBoneNames, oldToNewIndexMap);
        });

        then('the twist bone slot should redirect to the parent new index', () => {
            const si = mesh.geometry.attributes.skinIndex.array as Uint16Array;
            expect(Array.from(si)).toEqual([0, 1, 3, 0]); // 槽1: 2 → 1(父骨)
        });

        and('the skin weights should remain unchanged', () => {
            const sw = mesh.geometry.attributes.skinWeight.array as Float32Array;
            expect(Array.from(sw)).toEqual(weightsBefore);
        });
    });

    // ---- 场景 4：B2 两个 SkinnedMesh 共享同一 Skeleton ----
    test('B2 两个 SkinnedMesh 共享同一 Skeleton', ({ given, when, then, and }) => {
        let model: THREE.Group;
        let mesh1: THREE.SkinnedMesh;
        let mesh2: THREE.SkinnedMesh;
        let report: ConvertReport;

        givenPackageDirectoryExists(given);

        given('a model with two SkinnedMeshes sharing one Skeleton', () => {
            const root = mkBone('Root');
            const hip = mkBone('Hip');
            const pelvis = mkBone('Pelvis');
            const rThigh = mkBone('R_Thigh');
            root.add(hip);
            hip.add(pelvis);
            pelvis.add(rThigh);
            const bones = [root, hip, pelvis, rThigh]; // 索引 0,1,2,3
            const skeleton = new THREE.Skeleton(bones);
            const skinIndex = [1, 2, 3, 0]; // 槽含被删的 Root(0)/Pelvis(2)
            const skinWeight = [0.5, 0.3, 0.1, 0.1];
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
            geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(new Uint16Array(skinIndex), 4));
            geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(new Float32Array(skinWeight), 4));
            mesh1 = new THREE.SkinnedMesh(geo, new THREE.MeshBasicMaterial());
            mesh2 = new THREE.SkinnedMesh(geo, new THREE.MeshBasicMaterial());
            mesh1.bind(skeleton);
            mesh2.bind(skeleton);
            expect(mesh1.skeleton).toBe(mesh2.skeleton); // 前提：转换前共享同一份
            model = new THREE.Group();
            model.add(root, mesh1, mesh2);
        });

        when('calling convertTripoToMixamo on the model', () => {
            report = convertTripoToMixamo(model);
        });

        then('both meshes should share the same skeleton instance', () => {
            expect(mesh1.skeleton).toBe(mesh2.skeleton);
        });

        and('the report should mark the skeleton as rebuilt', () => {
            expect(report.skeletonRebuilt).toBe(true);
        });

        and('every mesh skinIndex should be valid after conversion', () => {
            for (const m of [mesh1, mesh2]) {
                const si = m.geometry.attributes.skinIndex.array as Uint16Array;
                let max = -1;
                for (const v of Array.from(si)) if (v > max) max = v;
                expect(max).toBeLessThan(m.skeleton.bones.length);
            }
        });
    });

    // ---- 场景 5：主流程 真实 Tripo FBX ----
    test('convertTripoToMixamo 对真实 Tripo FBX 完成完整转换', ({ given, when, then, and }) => {
        let model: THREE.Object3D;
        let report: ConvertReport;
        let worldBefore: Map<string, THREE.Vector3>;

        givenPackageDirectoryExists(given);

        given('the real tripo model FBX', () => {
            model = parseFreshModel();
            worldBefore = recordWorldPositions(model);
        });

        when('calling convertTripoToMixamo on a fresh parse', () => {
            report = convertTripoToMixamo(model);
        });

        then('all remaining bones should start with mixamorig', () => {
            const names = collectBoneNames(model);
            expect(names.length).toBe(22);
            for (const n of names) {
                expect(n.startsWith('mixamorig')).toBe(true);
            }
        });

        and('the bone count should go from 41 to 22', () => {
            expect(report.boneCountBefore).toBe(41);
            expect(report.boneCountAfter).toBe(22);
        });

        and('no twist Root or Pelvis bones should remain', () => {
            const names = collectBoneNames(model);
            for (const n of names) {
                expect(n).not.toMatch(/(Twist|twist)\d+$/i);
                expect(n).not.toBe('Root');
                expect(n).not.toBe('Pelvis');
                expect(n).not.toBe('NeckTwist02');
            }
        });

        and('every skinIndex should be less than the bone count after conversion', () => {
            for (const m of collectMeshes(model)) {
                const si = m.geometry.attributes.skinIndex.array as Uint16Array;
                let max = -1;
                for (const v of Array.from(si)) if (v > max) max = v;
                expect(max).toBeLessThan(m.skeleton.bones.length);
            }
        });

        // V12.2：Skeleton 重建含全场景树骨骼（22 骨含 9 主链骨），主链骨恢复可寻址
        and('the rebuilt skeleton should contain all 22 bones including the main chain', () => {
            const skelNames = collectMeshes(model)[0].skeleton.bones.map((b) => b.name);
            expect(skelNames.length).toBe(22);
            // 9 个主链骨必须出现在 skeleton.bones 中（V12.2 前只有 13 个权重承载骨，缺这些）
            for (const main of [
                'mixamorigHips',
                'mixamorigLeftUpLeg',
                'mixamorigLeftLeg',
                'mixamorigRightUpLeg',
                'mixamorigRightLeg',
                'mixamorigLeftArm',
                'mixamorigLeftForeArm',
                'mixamorigRightArm',
                'mixamorigRightForeArm',
            ]) {
                expect(skelNames).toContain(main);
            }
        });

        // V12.2：twist 权重槽必须重映射到语义父骨索引（LeftUpLeg/Leg/Arm/ForeArm），
        // 不得全部坍缩到 index 0（mixamorigRightFoot）——后者正是「动画后拉丝」根因
        and('skinIndex slots should map to semantic parent bones not all collapse to index 0', () => {
            const mesh = collectMeshes(model)[0];
            const si = mesh.geometry.attributes.skinIndex.array as Uint16Array;
            const sw = mesh.geometry.attributes.skinWeight.array as Float32Array;
            const skelNames = mesh.skeleton.bones.map((b) => b.name);
            // 统计被非零权重引用的骨骼索引集合
            const refIdx = new Set<number>();
            for (let i = 0; i < si.length; i++) {
                if (sw[i] > 0) refIdx.add(si[i]);
            }
            // 必须存在语义父骨（LeftUpLeg/LeftLeg/RightUpLeg/RightLeg/LeftArm/LeftForeArm/RightArm/RightForeArm）
            // 被非零权重引用 —— 说明 twist 槽已重定向到主链骨而非全部 index 0
            const refNames = new Set(Array.from(refIdx).map((i) => skelNames[i]));
            for (const main of [
                'mixamorigLeftUpLeg',
                'mixamorigRightUpLeg',
                'mixamorigRightLeg',
                'mixamorigLeftLeg',
                'mixamorigRightArm',
                'mixamorigRightForeArm',
                'mixamorigLeftArm',
                'mixamorigLeftForeArm',
            ]) {
                expect(refNames).toContain(main);
            }
            // 引用骨骼数应明显 > 1（V12.2 前全部坍缩到 index 0=RightFoot，仅 1 个）
            expect(refIdx.size).toBeGreaterThan(5);
        });

        and(/^surviving bone world transforms should be preserved within ([\d.]+)$/, () => {
            const worldAfter = recordWorldPositions(model);
            const delta = maxWorldDelta(worldBefore, worldAfter);
            expect(delta).toBeLessThan(0.001);
        });

        and('the report should contain complete fields', () => {
            expect(report.alreadyConverted).toBe(false);
            expect(report.renameCount).toBeGreaterThanOrEqual(22);
            expect(report.mergedTwistCount).toBe(16);
            expect(report.skeletonRebuilt).toBe(true);
            expect(report.skinIndexFixCount).toBeGreaterThan(0);
            expect(report.removedBones.length).toBe(19);
            expect(report.removedBones).toContain('Root');
            expect(report.removedBones).toContain('Pelvis');
            expect(report.boneNamesAfter.length).toBe(22);
            expect(report.durationMs).toBeGreaterThanOrEqual(0);
            expect(Array.isArray(report.warnings)).toBe(true);
        });
    });

    // ---- 场景 6：幂等守卫 ----
    test('convertTripoToMixamo 幂等守卫', ({ given, when, then, and }) => {
        let tree: THREE.Group;
        let beforeNames: string[];
        let report: ConvertReport;

        givenPackageDirectoryExists(given);

        given('a bone tree already named with mixamorig names', () => {
            tree = new THREE.Group();
            tree.add(mkBone('mixamorigHips'), mkBone('mixamorigRightArm'), mkBone('mixamorigRightUpLeg'));
            beforeNames = collectBoneNames(tree);
        });

        when('calling convertTripoToMixamo on the tree', () => {
            report = convertTripoToMixamo(tree);
        });

        then('the report should mark the model as already converted', () => {
            expect(report.alreadyConverted).toBe(true);
        });

        and('no bone names should change', () => {
            expect(collectBoneNames(tree)).toEqual(beforeNames);
        });
    });

    // ---- 场景 7（S1）：无骨骼模型 ----
    test('convertTripoToMixamo 对无骨骼模型返回 0 骨骼数', ({ given, when, then, and }) => {
        let obj: THREE.Object3D;
        let report: ConvertReport;

        givenPackageDirectoryExists(given);

        given('an object without any bones', () => {
            obj = new THREE.Group();
            obj.add(new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial()));
        });

        when('calling convertTripoToMixamo on the object', () => {
            report = convertTripoToMixamo(obj);
        });

        then('the report should report boneCountBefore 0', () => {
            expect(report.boneCountBefore).toBe(0);
            expect(report.boneCountAfter).toBe(0);
            expect(report.alreadyConverted).toBe(false);
        });

        and('the conversion should not throw any exception', () => {
            // report 已正常生成即未抛异常；此处显式校验字段完整
            expect(report.removedBones).toEqual([]);
            expect(report.boneNamesAfter).toEqual([]);
            expect(report.durationMs).toBeGreaterThanOrEqual(0);
        });
    });

    // ---- 场景 8（S1）：handleTwistBones=false 保留 Twist 骨 ----
    test('convertTripoToMixamo 关闭 handleTwistBones 时保留 Twist 骨', ({ given, when, then, and }) => {
        let model: THREE.Group;
        let report: ConvertReport;

        givenPackageDirectoryExists(given);

        given('a model with a Twist bone and handleTwistBones disabled', () => {
            const root = mkBone('Root');
            const hip = mkBone('Hip');
            const upperarm = mkBone('R_Upperarm');
            const twist = mkBone('R_UpperarmTwist01'); // 匹配 TWIST_BONE_PATTERNS
            root.add(hip);
            hip.add(upperarm);
            upperarm.add(twist);
            model = new THREE.Group();
            model.add(root);
        });

        when('calling convertTripoToMixamo on the model', () => {
            report = convertTripoToMixamo(model, { handleTwistBones: false });
        });

        then('the Twist bone should still exist in the tree', () => {
            const names = collectBoneNames(model);
            expect(names).toContain('R_UpperarmTwist01');
        });

        and('the report should count zero merged twist bones', () => {
            expect(report.mergedTwistCount).toBe(0);
        });
    });

    // ---- 场景 9（V12.3）：关节区权重重绑 ----
    test('V12.3 rebindJointVerts 重绑脚踝上臂肩区顶点', ({ given, when, then, and }) => {
        let model: THREE.Object3D;
        let officialRoot: THREE.Object3D;
        let report: ConvertReport;
        let regionDom: Map<string, Map<string, number>>;

        givenPackageDirectoryExists(given);

        given('the real EliteGiantess model FBX with official lod2 reference', () => {
            officialRoot = parseFbx(ELITE_LOD2_FBX);
            model = parseFbx(ELITE_TRIPO_FBX);
        });

        when('calling convertTripoToMixamo with officialRestPose enabling joint rebind', () => {
            const lod2ForRest = parseFbx(ELITE_LOD2_FBX); // 独立解析，避免官方参照被复用/污染
            report = convertTripoToMixamo(model, { officialRestPose: lod2ForRest });
            // 重算区域 → 主导骨（用官方 lod2 骨骼位置分桶，与 diag-arm-leg-region 同一方法）
            regionDom = computeRegionDominant(model, officialRoot);
        });

        // V12.3 断言 1：脚踝区（Foot 区域）主导骨 = Foot 非 Leg
        then('the foot region dominant bone should be Foot not Leg', () => {
            for (const footRegion of ['mixamorigLeftFoot', 'mixamorigRightFoot']) {
                const footCount = regionCount(regionDom, footRegion, footRegion);
                const legCount = regionCount(
                    regionDom,
                    footRegion,
                    footRegion === 'mixamorigLeftFoot' ? 'mixamorigLeftLeg' : 'mixamorigRightLeg',
                );
                // 修复目标（fixsim 实测）：Foot 主导（Left 235 / Right 239），Leg 不再主导
                expect(footCount).toBeGreaterThan(legCount);
                // 官方对照：官方 Foot 区域 Foot > Leg（Left 216>85 / Right 267>79）
                // 重绑后 Foot 至少为官方量级（≥216）
                expect(footCount).toBeGreaterThanOrEqual(216);
            }
            // 报告字段也应反映重绑发生
            expect(report.reboundFootCount).toBeGreaterThan(0);
        });

        // V12.3 断言 2：上臂区主导骨分布——Shoulder 顶点数 > Arm 顶点数（非 Arm 独占）
        and('the arm region Shoulder-dominant count should exceed Arm-dominant count', () => {
            let shoulderCount = 0;
            let armCount = 0;
            for (const armRegion of ['mixamorigLeftArm', 'mixamorigRightArm']) {
                const side = armRegion === 'mixamorigLeftArm' ? 'Left' : 'Right';
                shoulderCount += regionCount(regionDom, armRegion, `mixamorig${side}Shoulder`);
                armCount += regionCount(regionDom, armRegion, `mixamorig${side}Arm`);
            }
            // 修复目标：Shoulder 主导 + Arm 次之（而非转换后 Arm:1368 独占）
            expect(shoulderCount).toBeGreaterThan(armCount);
            expect(report.reboundArmCount).toBeGreaterThan(0);
        });

        // V12.3 断言 3：Shoulder 区域无 Head 主导顶点（Head 泄漏清零）
        and('the shoulder region should have no Head-dominant vertices', () => {
            for (const shRegion of ['mixamorigLeftShoulder', 'mixamorigRightShoulder']) {
                expect(regionCount(regionDom, shRegion, 'mixamorigHead')).toBe(0);
            }
            expect(report.reboundHeadCount).toBeGreaterThan(0);
        });
    });

    // ---- 场景 10（V12.4）：boneInverse 参考系统一为官方 lod2 TransformLink 帧 ----
    test('V12.4 boneInverse 参考系统一为官方 lod2 TransformLink 帧', ({ given, when, then, and }) => {
        let model: THREE.Object3D;
        let report: ConvertReport;
        let convMesh: THREE.SkinnedMesh;
        let offMesh: THREE.SkinnedMesh;

        givenPackageDirectoryExists(given);

        given('the real EliteGiantess model FBX with official lod2 reference', () => {
            model = parseFbx(ELITE_TRIPO_FBX);
        });

        when('calling convertTripoToMixamo with officialRestPose enabling joint rebind', () => {
            const lod2ForRest = parseFbx(ELITE_LOD2_FBX); // 独立解析，避免官方参照被复用/污染
            report = convertTripoToMixamo(model, { officialRestPose: lod2ForRest });
            convMesh = collectMeshes(model)[0];
            offMesh = collectMeshes(lod2ForRest)[0];
        });

        // V12.4 断言 1：全部 22 骨（22/22）boneInverse 被覆盖为官方帧
        then('the report should count 22 bones with official boneInverse frames', () => {
            expect(report.boneInverseAlignedCount).toBe(22);
        });

        // V12.4 断言 2：同名骨 boneInverse 与官方 lod2 TransformLink 帧逐元素一致（阈值 0.01）
        and('every shared bone boneInverse should match official lod2 within 0.01', () => {
            const convBones = convMesh.skeleton.bones;
            const offBones = offMesh.skeleton.bones;
            const offInvByName = new Map<string, THREE.Matrix4>();
            for (let i = 0; i < offBones.length; i++) {
                const b = offBones[i];
                if (b) offInvByName.set(b.name, offMesh.skeleton.boneInverses[i]);
            }
            let maxDiff = 0;
            for (let i = 0; i < convBones.length; i++) {
                const b = convBones[i];
                if (!b) continue;
                const offInv = offInvByName.get(b.name);
                if (!offInv) continue;
                const ce = convMesh.skeleton.boneInverses[i].elements;
                const oe = offInv.elements;
                for (let k = 0; k < 16; k++) {
                    const d = Math.abs(ce[k] - oe[k]);
                    if (d > maxDiff) maxDiff = d;
                }
            }
            expect(maxDiff).toBeLessThan(0.01);
        });

        // V12.4 断言 3：官方帧模式下蒙皮输出仍正确（与官方 lod2 静态蒙皮接近，
        // 验证「不 rebind geometry、不 calculateInverses」不会破坏蒙皮）
        and('the reposed model should still render skin within 0.5 of official raw output', () => {
            const skin = (mesh: THREE.SkinnedMesh): Float32Array => {
                mesh.updateMatrixWorld(true);
                const pos = mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
                const idx = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
                const wgt = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
                const sk = mesh.skeleton;
                const out = new Float32Array(pos.count * 3);
                const bm = mesh.bindMatrix;
                const p = pos.array as Float32Array;
                const si = idx.array as ArrayLike<number>;
                const sw = wgt.array as ArrayLike<number>;
                const vBind = new THREE.Vector3();
                const acc = new THREE.Vector3();
                const tmp = new THREE.Vector3();
                const boneMat = new THREE.Matrix4();
                for (let v = 0; v < pos.count; v++) {
                    vBind.fromArray(p, v * 3).applyMatrix4(bm);
                    acc.set(0, 0, 0);
                    for (let k = 0; k < 4; k++) {
                        const w = sw[v * 4 + k];
                        if (w === 0) continue;
                        const bi = si[v * 4 + k];
                        const bone = sk.bones[bi];
                        const inv = sk.boneInverses[bi];
                        if (!bone || !inv) continue;
                        boneMat.copy(bone.matrixWorld).multiply(inv);
                        tmp.copy(vBind).applyMatrix4(boneMat);
                        acc.addScaledVector(tmp, w);
                    }
                    out[v * 3] = acc.x; out[v * 3 + 1] = acc.y; out[v * 3 + 2] = acc.z;
                }
                return out;
            };
            const convSk = skin(convMesh);
            const offSk = skin(offMesh);
            // 最近邻映射（顶点序在两次 FBX 导出间不同，用空间最近邻绕开）
            let maxErr = 0;
            let sum = 0;
            let n = 0;
            const offMap = new Map<string, number[]>();
            const nOff = offSk.length / 3;
            for (let i = 0; i < nOff; i++) {
                const key = `${Math.round(offSk[i * 3] / 0.1)},${Math.round(offSk[i * 3 + 1] / 0.1)},${Math.round(offSk[i * 3 + 2] / 0.1)}`;
                if (!offMap.has(key)) offMap.set(key, []);
                offMap.get(key)!.push(i);
            }
            const nConv = convSk.length / 3;
            for (let j = 0; j < nConv; j++) {
                const x = convSk[j * 3], y = convSk[j * 3 + 1], z = convSk[j * 3 + 2];
                const cx = Math.round(x / 0.1), cy = Math.round(y / 0.1), cz = Math.round(z / 0.1);
                let best = Infinity;
                for (let dx = -6; dx <= 6; dx++) {
                    for (let dy = -6; dy <= 6; dy++) {
                        for (let dz = -6; dz <= 6; dz++) {
                            const cand = offMap.get(`${cx + dx},${cy + dy},${cz + dz}`);
                            if (!cand) continue;
                            for (const pi of cand) {
                                const d = (offSk[pi * 3] - x) ** 2 + (offSk[pi * 3 + 1] - y) ** 2 + (offSk[pi * 3 + 2] - z) ** 2;
                                if (d < best) best = d;
                            }
                        }
                    }
                }
                if (isFinite(best)) { const d = Math.sqrt(best); if (d > maxErr) maxErr = d; sum += d; n++; }
            }
            const mean = n > 0 ? sum / n : NaN;
            // 官方帧模式下静态蒙皮应与 lod2 参考接近（finger 区缺失允许个别 >0.5，均值应 <0.5）
            expect(mean).toBeLessThan(0.5);
        });
    });
});
