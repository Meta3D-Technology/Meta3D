/**
 * diag-convert-vs-mixamo.steps.ts — 临时诊断：转换后骨骼 vs Mixamo 官方骨骼
 *
 * 兄弟验收标准（2026-08-06 16:01）：
 *  1. 转换后的骨骼必须是 Mixamo 官方骨骼的**子集**（Tripo 无手指骨，可缺手指/End 骨）
 *  2. 相同骨骼的 local transform（pos/quat）必须**完全一致**
 *  3. 骨骼层级（父子关系）必须**完全一致**
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPatterns diag-convert-vs-mixamo --forceExit
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

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const MIXAMO_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function collectBones(root: THREE.Object3D): THREE.Bone[] {
    const bones: THREE.Bone[] = [];
    root.traverse((n) => { if ((n as THREE.Bone).isBone) bones.push(n as THREE.Bone); });
    return bones;
}

interface BoneInfo {
    parent: string | null;
    localPos: [number, number, number];
    localQuat: [number, number, number, number];
    children: string[];
}

function extractBoneMap(root: THREE.Object3D): Map<string, BoneInfo> {
    const map = new Map<string, BoneInfo>();
    const bones = collectBones(root);
    for (const b of bones) {
        map.set(b.name, {
            parent: b.parent && (b.parent as THREE.Bone).isBone ? b.parent.name : null,
            localPos: [b.position.x, b.position.y, b.position.z],
            localQuat: [b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w],
            children: b.children.filter((c) => (c as THREE.Bone).isBone).map((c) => c.name).sort(),
        });
    }
    return map;
}

function qDist(a: [number, number, number, number], b: [number, number, number, number]): number {
    // quaternion 距离（考虑 ±q 等价）
    const dot = Math.abs(a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3]);
    return 1 - Math.min(dot, 1);
}

function posDist(a: [number, number, number], b: [number, number, number]): number {
    return Math.hypot(a[0]-b[0], a[1]-b[1], a[2]-b[2]);
}

describe('DIAG: converted bones vs Mixamo official bones', () => {
    it('subset + identical transform + identical hierarchy', () => {
        const tripoRoot = loadFbx(TRIPO_FBX);
        const mixamoRoot = loadFbx(MIXAMO_FBX);

        // 转换前
        const beforeBones = collectBones(tripoRoot).map((b) => b.name).sort();
        console.log(`\n[Tripo 原始] ${beforeBones.length} bones`);

        // 跑转换管线（D6：传入 lod2 官方骨架做 rest pose 对齐）
        const report = convertTripoToMixamo(tripoRoot, { officialRestPose: mixamoRoot });
        const convertedBones = collectBones(tripoRoot).map((b) => b.name).sort();
        console.log(`[转换后] ${convertedBones.length} bones`);
        console.log(`[报告] renamed=${report.renameCount} removed=${report.removedBones.length} unmatched=${report.unmatchedBones.length} alreadyConverted=${report.alreadyConverted}`);
        if (report.unmatchedBones.length) console.log(`[unmatched] ${report.unmatchedBones.join(', ')}`);

        const mixamoBones = collectBones(mixamoRoot).map((b) => b.name).sort();
        console.log(`[Mixamo 官方] ${mixamoBones.length} bones`);

        const mixamoSet = new Set(mixamoBones);

        // ── 1. 子集检查 ──
        const notInMixamo = convertedBones.filter((n) => !mixamoSet.has(n));
        console.log(`\n=== 1. 子集检查（转换后 ⊆ 官方）===`);
        console.log(`转换后不在官方集合的骨骼: ${notInMixamo.length ? notInMixamo.join(', ') : '(无 — 完全子集 ✅)'}`);
        expect(notInMixamo).toEqual([]);

        // ── 2. transform 一致性（同名骨骼）──
        const convertedMap = extractBoneMap(tripoRoot);
        const mixamoMap = extractBoneMap(mixamoRoot);
        const sharedNames = convertedBones.filter((n) => mixamoSet.has(n));

        console.log(`\n=== 2. 同名骨骼 local transform 对比（${sharedNames.length} 根）===`);
        const posMismatch: string[] = [];
        const quatMismatch: string[] = [];
        const parentMismatch: string[] = [];
        const childMismatch: string[] = [];
        let maxQDist = 0, maxPDist = 0;
        for (const name of sharedNames) {
            const c = convertedMap.get(name)!;
            const m = mixamoMap.get(name)!;
            const qd = qDist(c.localQuat, m.localQuat);
            const pd = posDist(c.localPos, m.localPos);
            maxQDist = Math.max(maxQDist, qd);
            maxPDist = Math.max(maxPDist, pd);
            if (qd > 1e-6) quatMismatch.push(`${name}(qd=${qd.toFixed(8)})`);
            if (pd > 1e-6) posMismatch.push(`${name}(pd=${pd.toFixed(8)})`);
            if (c.parent !== m.parent) parentMismatch.push(`${name}: convParent=${c.parent} vs officialParent=${m.parent}`);
            // 子集原则：转换后的 children 必须是官方 children 的子集；
            // 官方独有的 children（Roll/End/手指等被转换合并/删除的骨骼）允许缺失
            const onlyC = c.children.filter((x) => !m.children.includes(x));
            if (onlyC.length) {
                childMismatch.push(`${name}: convOnly=[${onlyC.join(',')}]`);
            }
        }
        console.log(`最大 quat 距离: ${maxQDist.toFixed(10)} (阈值 1e-6)`);
        console.log(`最大 pos 距离: ${maxPDist.toFixed(10)} (阈值 1e-6)`);
        console.log(`quat 不一致: ${quatMismatch.length ? '\n  ' + quatMismatch.join('\n  ') : '(无 ✅)'}`);
        console.log(`pos 不一致: ${posMismatch.length ? '\n  ' + posMismatch.join('\n  ') : '(无 ✅)'}`);
        console.log(`parent 不一致: ${parentMismatch.length ? '\n  ' + parentMismatch.join('\n  ') : '(无 ✅)'}`);
        console.log(`children 不一致: ${childMismatch.length ? '\n  ' + childMismatch.join('\n  ') : '(无 ✅)'}`);

        expect(quatMismatch).toEqual([]);
        expect(posMismatch).toEqual([]);
        expect(parentMismatch).toEqual([]);
        expect(childMismatch).toEqual([]);

        // ── 3. 官方独有（转换后缺的）──
        const officialOnly = mixamoBones.filter((n) => !convertedBones.includes(n));
        console.log(`\n=== 3. 官方有、转换后缺的骨骼（${officialOnly.length} 根）===`);
        console.log(officialOnly.join(', '));

        // ── 4. 官方独有骨骼的父骨骼是否在转换后集合中（层级穿透检查）──
        const officialMap = extractBoneMap(mixamoRoot);
        const orphans = officialOnly.filter((n) => {
            const info = officialMap.get(n);
            return info && info.parent && convertedBones.includes(info.parent);
        });
        console.log(`\n=== 4. 官方独有骨骼中父骨骼属于转换后集合的（层级穿透）===`);
        console.log(orphans.length ? orphans.join(', ') : '(无 ✅ — 缺的骨骼父级也不在转换后集合，无层级穿透)');

        // 汇总
        console.log(`\n======= 汇总 =======`);
        console.log(`转换后 ${convertedBones.length} / 官方 ${mixamoBones.length}`);
        console.log(`子集: ${notInMixamo.length === 0 ? '✅' : '❌'} | transform: ${quatMismatch.length === 0 && posMismatch.length === 0 ? '✅' : '❌'} | 层级: ${parentMismatch.length === 0 && childMismatch.length === 0 ? '✅' : '❌'}`);
    }, 120000);
});
