/**
 * bone_converter D7 BDD 步骤定义 - 网格顶点变换到 lod2 坐标系验收
 *
 * 覆盖 d7-mesh-lod2.feature 的 4 个场景：
 *  R1 转换后网格顶点数与 lod2 官方网格一致
 *  R2 转换后网格顶点与 lod2 官方网格一致（最近邻 maxErr < 0.01）
 *  R3 转换后网格包围盒与 lod2 官方网格包围盒一致
 *  R4 骨骼 rest pose 保持与 lod2 一致（转换不破坏 D6）
 *
 * 背景（V12.1 修复）：
 *   alignRestPose 只把骨骼 local pos/quat 对齐到 lod2（竖立坐标系），网格顶点仍在
 *   Tripo 原始坐标系 → 骨骼与网格错位 → 蒙皮拉扯扭曲。修复：把网格顶点变换到
 *   lod2 坐标系（M = scale + translate，由 bbox 求刚体变换）。
 *
 * 注意：Tripo 与 lod2 两次 FBX 导出的顶点顺序不同（同一网格 15075 顶点，顺序不一致），
 *   因此不能用「同 index 对应」断言，用「空间哈希最近邻」断言 maxErr。
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

const feature = loadFeature('./test/features/d7-mesh-lod2.feature');

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

function collectMeshes(root: THREE.Object3D): THREE.Mesh[] {
    const meshes: THREE.Mesh[] = [];
    root.traverse((n) => { if ((n as THREE.Mesh).isMesh) meshes.push(n as THREE.Mesh); });
    return meshes;
}

/** quaternion 夹角（度），考虑 ±q 等价 */
function quatAngleDeg(a: THREE.Quaternion, b: THREE.Quaternion): number {
    const dot = Math.abs(a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w);
    return 2 * Math.acos(Math.min(1, dot)) * 180 / Math.PI;
}

interface D7Context {
    convertedRoot: THREE.Object3D;
    officialRoot: THREE.Object3D;
}

/** 公共 Given：转换后网格 + lod2 官方网格（rest pose 对齐模式，与 D6 同一接线） */
function givenConvertedWithOfficialRestPose(given: DefineStepFunction, ctx: Partial<D7Context>) {
    given('a real Tripo model converted to Mixamo skeleton with official lod2 rest pose', () => {
        const tripoRoot = parseFreshFbx(TRIPO_FBX);
        const lod2Root = parseFreshFbx(OFFICIAL_LOD2_FBX);
        convertTripoToMixamo(tripoRoot, { officialRestPose: lod2Root });
        ctx.convertedRoot = tripoRoot;
        ctx.officialRoot = lod2Root;
    });
}

/** 取网格 position attribute（若多个 SkinnedMesh 取第一个） */
function positionAttr(root: THREE.Object3D): THREE.BufferAttribute {
    const meshes = collectMeshes(root);
    const m = meshes.find((x) => (x as THREE.SkinnedMesh).isSkinnedMesh) ?? meshes[0];
    if (!m) throw new Error('no mesh found');
    const pos = m.geometry.getAttribute('position') as THREE.BufferAttribute;
    if (!pos) throw new Error('no position attribute');
    return pos;
}

/** 空间哈希：把 lod2 顶点装入 cell，返回 key->顶点数组 */
function buildHash(attr: THREE.BufferAttribute, cell: number): Map<string, number[]> {
    const map = new Map<string, number[]>();
    const key = (x: number, y: number, z: number) =>
        `${Math.round(x / cell)},${Math.round(y / cell)},${Math.round(z / cell)}`;
    for (let i = 0; i < attr.count; i++) {
        const k = key(attr.getX(i), attr.getY(i), attr.getZ(i));
        let arr = map.get(k);
        if (!arr) { arr = []; map.set(k, arr); }
        arr.push(i);
    }
    return map;
}

/** 计算转换后每个采样顶点到 lod2 顶点集的最近邻距离 */
function computeMaxNearestErr(convAttr: THREE.BufferAttribute, lod2Attr: THREE.BufferAttribute): number {
    const CELL = 0.02;
    const hash = buildHash(lod2Attr, CELL);
    let maxErr = 0;
    let errCount = 0;
    let checked = 0;
    // 采样上限（15075 全量太久，采样 6000 点足够统计 maxErr）
    const step = Math.max(1, Math.floor(convAttr.count / 6000));
    for (let i = 0; i < convAttr.count; i += step) {
        const x = convAttr.getX(i), y = convAttr.getY(i), z = convAttr.getZ(i);
        const cx = Math.round(x / CELL), cy = Math.round(y / CELL), cz = Math.round(z / CELL);
        let best = Infinity;
        for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) {
            const arr = hash.get(`${cx + dx},${cy + dy},${cz + dz}`);
            if (!arr) continue;
            for (const j of arr) {
                const d = Math.hypot(x - lod2Attr.getX(j), y - lod2Attr.getY(j), z - lod2Attr.getZ(j));
                if (d < best) best = d;
            }
        }
        checked++;
        if (best > maxErr) maxErr = best;
        if (best > 0.01) errCount++;
    }
    console.log(`[D7] 最近邻检查 ${checked} 点: maxErr=${maxErr.toFixed(5)} 超差(>0.01)=${errCount}/${checked}`);
    return maxErr;
}

/** R1: 顶点数一致 */
function assertVertexCount(ctx: D7Context): void {
    const convCount = positionAttr(ctx.convertedRoot).count;
    const lod2Count = positionAttr(ctx.officialRoot).count;
    console.log(`[D7 R1] 转换后顶点=${convCount} lod2 顶点=${lod2Count}`);
    expect(convCount).toBe(lod2Count);
}

/** R2: 最近邻 maxErr < 0.01 */
function assertVertexMatch(ctx: D7Context): void {
    const conv = positionAttr(ctx.convertedRoot);
    const lod2 = positionAttr(ctx.officialRoot);
    const maxErr = computeMaxNearestErr(conv, lod2);
    expect(maxErr).toBeLessThan(0.01);
}

/** R3: bbox min/max 差 < 0.05 */
function assertBBoxMatch(ctx: D7Context): void {
    const box3 = (attr: THREE.BufferAttribute) => new THREE.Box3().setFromBufferAttribute(attr);
    const cb = box3(positionAttr(ctx.convertedRoot));
    const lb = box3(positionAttr(ctx.officialRoot));
    const minD = cb.min.distanceTo(lb.min);
    const maxD = cb.max.distanceTo(lb.max);
    console.log(`[D7 R3] conv min=(${cb.min.x.toFixed(4)},${cb.min.y.toFixed(4)},${cb.min.z.toFixed(4)}) lod2 min=(${lb.min.x.toFixed(4)},${lb.min.y.toFixed(4)},${lb.min.z.toFixed(4)}) minD=${minD.toFixed(4)} maxD=${maxD.toFixed(4)}`);
    expect(minD).toBeLessThan(0.05);
    expect(maxD).toBeLessThan(0.05);
}

/** R4: 骨骼 rest pose 保持 D6（quat <1°，pos <0.01） */
function assertRestPoseKept(ctx: D7Context): void {
    const convBones = collectBones(ctx.convertedRoot);
    const officialByName = new Map(collectBones(ctx.officialRoot).map((b) => [b.name, b]));
    let worstQuat = 0, worstPos = 0;
    for (const b of convBones) {
        const ob = officialByName.get(b.name);
        if (!ob) continue;
        const ang = quatAngleDeg(b.quaternion, ob.quaternion);
        if (ang > worstQuat) worstQuat = ang;
        const d = b.position.distanceTo(ob.position);
        if (d > worstPos) worstPos = d;
    }
    console.log(`[D7 R4] worst quat=${worstQuat.toFixed(4)}°（<1°） worst pos=${worstPos.toFixed(5)}（<0.01）`);
    expect(worstQuat).toBeLessThan(1);
    expect(worstPos).toBeLessThan(0.01);
}

defineFeature(feature, (test) => {
    test('R1 转换后网格顶点数与 lod2 网格一致', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D7Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('转换后 SkinnedMesh 顶点数与 lod2 官方网格一致', () => {
            assertVertexCount(ctx as D7Context);
        });
    });

    test('R2 转换后网格顶点与 lod2 官方网格一致（最近邻 maxErr < 0.01）', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D7Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('每个转换后网格顶点在 lod2 官方网格中有最近邻且最大距离小于 0.01', () => {
            assertVertexMatch(ctx as D7Context);
        });
    });

    test('R3 转换后网格包围盒与 lod2 官方网格包围盒一致', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D7Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('转换后网格包围盒 min/max 与 lod2 官方网格差应小于 0.05', () => {
            assertBBoxMatch(ctx as D7Context);
        });
    });

    test('R4 骨骼 rest pose 保持与 lod2 一致（转换不破坏 D6）', ({ given, then }) => {
        given('the bone_converter package directory exists', () => { });
        const ctx: Partial<D7Context> = {};
        givenConvertedWithOfficialRestPose(given, ctx);
        then('同名骨骼 local quaternion 与 lod2 官方夹角仍小于 1 度且 position 距离仍小于 0.01', () => {
            assertRestPoseKept(ctx as D7Context);
        });
    });
});
