/**
 * bone_converter D6 BDD 步骤定义 - rest pose 对齐验收
 *
 * 覆盖 d6-rest-pose.feature 的 4 个场景：
 *  R1 转换后骨骼是 Mixamo lod2 官方骨架的子集
 *  R2 同名骨骼 local quaternion 与 lod2 官方一致（< 1 度）
 *  R3 同名骨骼 local position 与 lod2 官方一致（< 0.01）
 *  R4 骨骼层级一致层级与 lod2 官方一致
 *
 * 运行：cd packages/bone_converter && npx jest --config jest.config.js --forceExit
 */
// -- Node 环境 polyfill（three FBXLoader 需要 browser globals）--
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const feature = loadFeature('./test/features/d6-rest-pose.feature');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const OFFICIAL_LOD2_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

/** 解析真实 FBX（每次新解析，避免场景间互相污染） */
function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function collectBones(root: THREE.Object3D): THREE.Bone[] {
    const bones: THREE.Bone[] = [];
    root.traverse((n) => { if ((n as THREE.Bone).isBone) bones.push(n as THREE.Bone); });
    return bones;
}

/** quaternion 夹角（度），考虑 ±q 等价 */
function quatAngleDeg(a: THREE.Quaternion, b: THREE.Quaternion): number {
    const dot = Math.abs(a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w);
    return 2 * Math.acos(Math.min(1, dot)) * 180 / Math.PI;
}

interface D6Context {
    convertedRoot: THREE.Object3D;
    officialRoot: THREE.Object3D;
}

/** 公共 Given：转换后骨骼 + 骨骼 并传入 lod2 官方 骨骼 作为 rest pose 参考 */
function givenConvertedWithOfficialRestPose(given: DefineStepFunction, ctx: Partial<D6Context>) {
    given('a real Tripo model converted to Mixamo skeleton with official lod2 rest pose', () => {
        const tripoRoot = parseFreshFbx(TRIPO_FBX);
        const lod2Root = parseFreshFbx(OFFICIAL_LOD2_FBX);
        convertTripoToMixamo(tripoRoot, { officialRestPose: lod2Root });
        ctx.convertedRoot = tripoRoot;
        ctx.officialRoot = lod2Root;
    });
}

/** 断言：转换后骨骼 集合 ⊆ 官方 骨骼 集合 */
function assertSubset(ctx: D6Context): void {
    const convNames = collectBones(ctx.convertedRoot).map((b) => b.name);
    const officialNames = new Set(collectBones(ctx.officialRoot).map((b) => b.name));
    const notInOfficial = convNames.filter((n) => !officialNames.has(n));
    console.log(`[D6 R1] ${convNames.length} 骨 ⊆ ${officialNames.size} 骨: ${notInOfficial.length ? notInOfficial.join(', ') : '(无)'}`);
    expect(notInOfficial).toEqual([]);
}

/** 断言：同名 骨骼 local quaternion 夹角 < 1° */
function assertQuatMatch(ctx: D6Context): void {
    const convBones = collectBones(ctx.convertedRoot);
    const officialByName = new Map(collectBones(ctx.officialRoot).map((b) => [b.name, b]));
    const bad: string[] = [];
    let worst = 0;
    for (const b of convBones) {
        const ob = officialByName.get(b.name);
        if (!ob) continue;
        const ang = quatAngleDeg(b.quaternion, ob.quaternion);
        if (ang > worst) worst = ang;
        if (ang >= 1) bad.push(`${b.name}=${ang.toFixed(2)}°`);
    }
    console.log(`[D6 R2] worst quat 夹角=${worst.toFixed(4)}°（阈值 1°）`);
    expect(bad).toEqual([]);
}

/** 断言：同名 骨骼 local position 距离 < 0.01 */
function assertPosMatch(ctx: D6Context): void {
    const convBones = collectBones(ctx.convertedRoot);
    const officialByName = new Map(collectBones(ctx.officialRoot).map((b) => [b.name, b]));
    const bad: string[] = [];
    let worst = 0;
    for (const b of convBones) {
        const ob = officialByName.get(b.name);
        if (!ob) continue;
        const d = b.position.distanceTo(ob.position);
        if (d > worst) worst = d;
        if (d >= 0.01) bad.push(`${b.name}=${d.toFixed(4)}`);
    }
    console.log(`[D6 R3] worst pos 距离=${worst.toFixed(5)}（阈值 0.01）`);
    expect(bad).toEqual([]);
}

/** 断言：同名 骨骼 parent 名称一致 */
function assertHierarchyMatch(ctx: D6Context): void {
    const convBones = collectBones(ctx.convertedRoot);
    const officialByName = new Map(collectBones(ctx.officialRoot).map((b) => [b.name, b]));
    const parentName = (b: THREE.Bone): string => (b.parent && (b.parent as THREE.Bone).isBone ? b.parent.name : '');
    const bad: string[] = [];
    for (const b of convBones) {
        const ob = officialByName.get(b.name);
        if (!ob) continue;
        const pConv = parentName(b);
        const pOfficial = parentName(ob);
        if (pConv !== pOfficial) bad.push(`${b.name}: conv=${pConv || '(非骨)'} official=${pOfficial || '(非骨)'}`);
    }
    console.log(`[D6 R4] 层级一致: ${bad.length ? bad.join('; ') : '(无)'}`);
    expect(bad).toEqual([]);
}

defineFeature(feature, (test) => {
    test('R1 转换后骨骼是 Mixamo lod2 官方骨架的子集', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D6Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('转换后骨骼名称应全部属于 lod2 官方骨骼集合', () => {
            assertSubset(ctx as D6Context);
        });
    });

    test('R2 同名骨骼 local quaternion 与 lod2 官方一致（< 1 度）', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D6Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('每个同名骨骼的 local quaternion 与 lod2 官方的夹角应小于 1 度', () => {
            assertQuatMatch(ctx as D6Context);
        });
    });

    test('R3 同名骨骼 local position 与 lod2 官方一致（< 0.01）', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D6Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('每个同名骨骼的 local position 与 lod2 官方的距离应小于 0.01', () => {
            assertPosMatch(ctx as D6Context);
        });
    });

    test('R4 骨骼层级一致层级与 lod2 官方一致', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D6Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('每个同名骨骼的父骨骼名称应与 lod2 官方一致', () => {
            assertHierarchyMatch(ctx as D6Context);
        });
    });
});
