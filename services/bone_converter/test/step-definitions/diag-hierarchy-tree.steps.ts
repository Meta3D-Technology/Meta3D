/**
 * diag-hierarchy-tree.steps.ts — 任务 1：转换后骨骼层级 vs 官方 lod2 骨骼层级
 *
 * 对比「Tripo 41 → 22 骨转换结果」与「官方 lod2（65 骨）」的骨骼层级树：
 *  - 输出两棵完整层级树（父子逐层）
 *  - 逐骨核对 parent 链：转换后骨骼的祖先链 vs 官方同名骨骼祖先链
 *  - 检查层级跳变/错挂/漏挂（Spine/Neck/Head 链、UpLeg/Leg/Foot 链、Arm/ForeArm/Hand 链）
 *
 * 跑法：cd services/bone_converter && npx jest --config jest.config.js --testPathPattern diag-hierarchy-tree --forceExit
 * 输出：temp/diag-hierarchy-tree.json + 控制台
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
    'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const LOD2_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function collectBones(root: THREE.Object3D): THREE.Bone[] {
    const out: THREE.Bone[] = [];
    root.traverse((n) => { if ((n as THREE.Bone).isBone) out.push(n as THREE.Bone); });
    return out;
}

interface NodeInfo {
    parent: string | null;
    children: string[];
    localPos: [number, number, number];
    localQuat: [number, number, number, number];
}

function buildTreeMap(root: THREE.Object3D): Map<string, NodeInfo> {
    const map = new Map<string, NodeInfo>();
    const bones = collectBones(root);
    for (const b of bones) {
        map.set(b.name, {
            parent: b.parent && (b.parent as THREE.Bone).isBone ? b.parent.name : null,
            children: b.children.filter((c) => (c as THREE.Bone).isBone).map((c) => c.name).sort(),
            localPos: [b.position.x, b.position.y, b.position.z],
            localQuat: [b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w],
        });
    }
    return map;
}

/** 祖先链（从根到自身），返回 null 表示出现环 */
function ancestorChain(map: Map<string, NodeInfo>, name: string): string[] | null {
    const chain: string[] = [];
    const seen = new Set<string>();
    let cur: string | null = name;
    while (cur) {
        if (seen.has(cur)) return null; // 环
        seen.add(cur);
        chain.unshift(cur);
        const info = map.get(cur);
        if (!info) return null;
        cur = info.parent;
    }
    return chain;
}

/** 打印层级树（ASCII） */
function printTree(map: Map<string, NodeInfo>, roots: string[], indent = ''): string[] {
    const lines: string[] = [];
    roots.forEach((r, i) => {
        const isLast = i === roots.length - 1;
        const connector = isLast ? '└─ ' : '├─ ';
        lines.push(`${indent}${connector}${r}`);
        const kids = map.get(r)?.children ?? [];
        if (kids.length) {
            lines.push(...printTree(map, kids, indent + (isLast ? '   ' : '│  ')));
        }
    });
    return lines;
}

describe('DIAG: hierarchy tree — converted vs official lod2', () => {
    it('prints both trees and diffs ancestor chains', () => {
        const tripo = loadFbx(TRIPO_FBX);
        const lod2 = loadFbx(LOD2_FBX);

        // 转换（与 demo 完全一致：传入 officialRestPose）
        const report = convertTripoToMixamo(tripo, { officialRestPose: lod2 });
        const convMap = buildTreeMap(tripo);
        const offMap = buildTreeMap(lod2);

        const convNames = Array.from(convMap.keys()).sort();
        const offNames = Array.from(offMap.keys()).sort();
        const convRoots = convNames.filter((n) => convMap.get(n)!.parent === null);
        const offRoots = offNames.filter((n) => offMap.get(n)!.parent === null);

        // 分类官方骨骼
        const fingerRe = /(Thumb|Index|Middle|Ring|Pinky)\d*$/;
        const offNonFinger = offNames.filter((n) => !fingerRe.test(n));

        const outLines: string[] = [];
        outLines.push(`=== 转换后 ${convNames.length} 骨层级树（根: ${convRoots.join(', ')}）===`);
        outLines.push(...printTree(convMap, convRoots));
        outLines.push('');
        outLines.push(`=== 官方 lod2 非手指骨 ${offNonFinger.length} 层级树（根: ${offRoots.join(', ')}）===`);
        outLines.push(...printTree(offMap, offRoots.filter((r) => offNonFinger.includes(r))));
        outLines.push('');
        outLines.push(`=== 官方 lod2 全部 ${offNames.length} 骨（含手指）根列表 ===`);
        outLines.push(`roots: ${offRoots.join(', ')}`);
        outLines.push(`fingerBones: ${offNames.filter((n) => fingerRe.test(n)).length} 个`);

        // ── 逐骨 parent 链对比（转换后 ⊆ 官方）──
        outLines.push('');
        outLines.push('=== 逐骨 parent 链对比（转换后 vs 官方同名骨）===');
        const chainMismatch: string[] = [];
        const missingInOfficial: string[] = [];
        const present = new Set(offNames);
        for (const name of convNames) {
            if (!present.has(name)) {
                missingInOfficial.push(name);
                continue;
            }
            const cChain = ancestorChain(convMap, name);
            const oChain = ancestorChain(offMap, name);
            if (!cChain || !oChain) {
                chainMismatch.push(`${name}: 祖先链解析失败（环/缺失）`);
                continue;
            }
            // 官方链可能比转换链长（End/手指等中间层），只要转换链是官方链的「前缀 + 尾部一致」即视为层级一致；
            // 实际检查：转换链中每个非终结点必须与官方链对应位置一致。
            let ok = true;
            if (cChain.length !== oChain.length) {
                // 官方链有额外的中间层（End/手指）。检查公共前缀从根开始是否一致
                const commonLen = Math.min(cChain.length, oChain.length);
                for (let i = 0; i < commonLen; i++) {
                    if (cChain[i] !== oChain[i]) { ok = false; break; }
                }
                // 转换链的尾部（commonLen 之后官方可能有多余）不要求
            } else {
                for (let i = 0; i < cChain.length; i++) {
                    if (cChain[i] !== oChain[i]) { ok = false; break; }
                }
            }
            if (!ok) {
                chainMismatch.push(`${name}: conv=[${cChain.join('>')}] official=[${oChain.join('>')}]`);
            }
        }
        outLines.push(`转换后不在官方集合: ${missingInOfficial.length ? missingInOfficial.join(', ') : '(无)'}`);
        outLines.push(`parent 链不一致: ${chainMismatch.length ? '\n  ' + chainMismatch.join('\n  ') : '(无 ✅)'}`);

        // 关键链专项：Spine/Neck/Head、UpLeg/Leg/Foot、Arm/ForeArm/Hand
        outLines.push('');
        outLines.push('=== 关键链专项 ===');
        const KEY_CHAINS: Array<[string, string[]]> = [
            ['Spine链', ['mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2']],
            ['Neck/Head链', ['mixamorigNeck', 'mixamorigHead']],
            ['左腿链', ['mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase']],
            ['右腿链', ['mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase']],
            ['左臂链', ['mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand']],
            ['右臂链', ['mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand']],
        ];
        for (const [label, bones] of KEY_CHAINS) {
            for (const bn of bones) {
                const c = convMap.get(bn);
                const o = offMap.get(bn);
                if (!c) { outLines.push(`${label} ${bn}: 转换后缺失`); continue; }
                if (!o) { outLines.push(`${label} ${bn}: 官方缺失`); continue; }
                const cp = c.parent;
                const op = o.parent;
                const same = cp === op;
                outLines.push(`${label} ${bn}: convParent=${cp} officialParent=${op} ${same ? '✅' : '❌'}`);
            }
        }

        // local pos/quat 一致性（共享骨）
        outLines.push('');
        outLines.push('=== 共享骨 local pos/quat 一致性 ===');
        let maxPosDiff = 0;
        let maxQuatDiff = 0;
        const localMismatch: string[] = [];
        for (const name of convNames) {
            const c = convMap.get(name);
            const o = offMap.get(name);
            if (!c || !o) continue;
            const pd = Math.hypot(c.localPos[0]-o.localPos[0], c.localPos[1]-o.localPos[1], c.localPos[2]-o.localPos[2]);
            const dot = Math.abs(c.localQuat[0]*o.localQuat[0] + c.localQuat[1]*o.localQuat[1] + c.localQuat[2]*o.localQuat[2] + c.localQuat[3]*o.localQuat[3]);
            const qd = 1 - Math.min(dot, 1);
            maxPosDiff = Math.max(maxPosDiff, pd);
            maxQuatDiff = Math.max(maxQuatDiff, qd);
            if (pd > 1e-6 || qd > 1e-6) localMismatch.push(`${name}: posΔ=${pd.toExponential(2)} quatΔ=${qd.toExponential(2)}`);
        }
        outLines.push(`maxPosDiff=${maxPosDiff.toExponential(4)} maxQuatDiff=${maxQuatDiff.toExponential(4)}`);
        outLines.push(`不一致: ${localMismatch.length ? '\n  ' + localMismatch.join('\n  ') : '(无 ✅)'}`);

        const text = outLines.join('\n');
        console.log('\n' + text + '\n');

        const outPath = path.join(__dirname, '..', '..', 'temp', 'diag-hierarchy-tree.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({
            report: {
                boneCountBefore: report.boneCountBefore,
                boneCountAfter: report.boneCountAfter,
                restPoseAlignedCount: report.restPoseAlignedCount,
                meshAlignedVertexCount: report.meshAlignedVertexCount,
                warnings: report.warnings,
            },
            convertedBones: convNames,
            officialBones: offNames,
            officialNonFinger: offNonFinger,
            tree: text,
            chainMismatch,
            missingInOfficial,
            maxPosDiff,
            maxQuatDiff,
        }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);

        // 断言：关键链 parent 全部一致、共享骨 transform 一致（诊断性，非 BDD）
        const anyKeyMismatch = KEY_CHAINS.flatMap(([, bones]) => bones).some((bn) => {
            const c = convMap.get(bn), o = offMap.get(bn);
            return c && o && c.parent !== o.parent;
        });
        expect(chainMismatch).toEqual([]);
        expect(missingInOfficial).toEqual([]);
        expect(anyKeyMismatch).toBe(false);
        expect(maxQuatDiff).toBeLessThan(1e-6);
        expect(maxPosDiff).toBeLessThan(1e-6);
    }, 120000);
});
