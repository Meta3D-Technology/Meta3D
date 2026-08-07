/**
 * probe-arm-leg-fixsim.steps.ts — 候选修复验证：脚部区域顶点应绑 Foot 而非 Leg
 *
 * 背景（diag-arm-leg-region 实锤）：
 *   官方 Foot 区域主导骨 = Foot(216)，转换后 = Leg(212)（LeftFoot 仅 23）。
 *   根因：Tripo 脚踝区顶点权重在 CalfTwist01/02 上，V12.2 semanticParent 把
 *   CalfTwist → L_Calf(Leg)，脚踝顶点跟随小腿 → 脚踝不弯折（兄弟反馈「小腿 Leg 有问题」）。
 *
 * 本探针验证修复假说：
 *   A. 打印脚部区域顶点的权重槽（确认主导骨 = Leg，来源 = CalfTwist 合并）
 *   B. 模拟修复：把「bind 位置在 Foot 区域 && 主导骨=Leg」的顶点的 Leg 槽改指 Foot，
 *      其余不变 → 重建区域对照表 → 确认 Foot 区域主导骨变为 Foot
 *   C. 修复后脚部区域顶点分布 vs 官方对比（主导骨应一致）
 *
 * 若 B/C 通过 → 修复方案成立（映射 CalfTwist02 → Foot 或后处理重绑脚踝区顶点）。
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern probe-arm-leg-fixsim --forceExit
 * 输出：temp/probe-arm-leg-fixsim.json + 控制台
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
const TRIPO_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const LOD2_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx');

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}
function firstSkinned(root: THREE.Object3D): THREE.SkinnedMesh {
    let m: THREE.SkinnedMesh | null = null;
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !m) m = n as THREE.SkinnedMesh; });
    if (!m) throw new Error('no skinned mesh');
    return m;
}
function dominantBone(mesh: THREE.SkinnedMesh, vIdx: number): string {
    const idx = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgt = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
    const iA = idx.array as Uint16Array | Uint32Array;
    const wA = wgt.array as Float32Array;
    let bi = -1, bw = -1;
    for (let k = 0; k < 4; k++) {
        if (wA[vIdx * 4 + k] > bw) { bw = wA[vIdx * 4 + k]; bi = iA[vIdx * 4 + k]; }
    }
    return mesh.skeleton.bones[bi]?.name ?? `?${bi}`;
}
function slotsOf(mesh: THREE.SkinnedMesh, vIdx: number): string {
    const idx = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgt = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
    const iA = idx.array as Uint16Array | Uint32Array;
    const wA = wgt.array as Float32Array;
    const bones = mesh.skeleton.bones;
    const parts: string[] = [];
    for (let k = 0; k < 4; k++) {
        const wt = wA[vIdx * 4 + k];
        if (wt === undefined || wt === null || wt <= 0.01) continue;
        parts.push(`${bones[iA[vIdx * 4 + k]]?.name ?? '?'}:${wt.toFixed(3)}`);
    }
    return parts.join(' + ');
}
const REGION_BONES = [
    'mixamorigHead', 'mixamorigNeck', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigHips',
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
    'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
    'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
];

describe('PROBE: fix simulation — foot-region vertices should bind Foot not Leg', () => {
    it('shows foot vertex slots, simulates Leg→Foot remap, rebuilds region table', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const convRoot = loadFbx(TRIPO_FBX);
        const lod2ForRest = loadFbx(LOD2_FBX);
        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });

        officialRoot.updateMatrixWorld(true);
        const offBoneWorld = new Map<string, THREE.Vector3>();
        officialRoot.traverse((n) => {
            if ((n as THREE.Bone).isBone) offBoneWorld.set(n.name, (n as THREE.Bone).getWorldPosition(new THREE.Vector3()));
        });
        const regionOf = (p: THREE.Vector3): string => {
            let best = 'mixamorigHips', bestD = Infinity;
            for (const rn of REGION_BONES) {
                const wp = offBoneWorld.get(rn);
                if (!wp) continue;
                const d = p.distanceTo(wp);
                if (d < bestD) { bestD = d; best = rn; }
            }
            return best;
        };

        const offMesh = firstSkinned(officialRoot);
        const convMesh = firstSkinned(convRoot);
        const offAttr = offMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const convAttr = convMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const nVerts = offAttr.count;
        const vTmp = new THREE.Vector3();

        // 转换后每顶点：区域 + 主导骨
        const convRegion: string[] = new Array(nVerts);
        const convDom: string[] = new Array(nVerts);
        for (let v = 0; v < nVerts; v++) {
            vTmp.set(convAttr.getX(v), convAttr.getY(v), convAttr.getZ(v));
            convRegion[v] = regionOf(vTmp);
            convDom[v] = dominantBone(convMesh, v);
        }

        const lines: string[] = [];
        lines.push('=== A. Foot 区域顶点权重槽采样（转换后，确认主导骨=Leg + 来源）===');
        // 找 Foot 区域中主导骨=Leg 的顶点，打印前 8 个的权重槽
        const skel = convMesh.skeleton;
        const footIdx = new Map<string, number>();
        skel.bones.forEach((b, i) => { if (b.name === 'mixamorigLeftFoot' || b.name === 'mixamorigRightFoot') footIdx.set(b.name, i); });
        let sampled = 0;
        for (let v = 0; v < nVerts && sampled < 8; v++) {
            if (convRegion[v] !== 'mixamorigLeftFoot' && convRegion[v] !== 'mixamorigRightFoot') continue;
            if (convDom[v] !== 'mixamorigLeftLeg' && convDom[v] !== 'mixamorigRightLeg') continue;
            lines.push(`  v${v} 区域=${convRegion[v].replace('mixamorig', '')} 主导=${convDom[v].replace('mixamorig', '')} 槽: ${slotsOf(convMesh, v)}`);
            sampled++;
        }
        if (sampled === 0) lines.push('  （无 Foot 区域主导=Leg 的顶点？）');

        // B. 模拟修复：Foot 区域主导=Leg → 改指 Foot（权重不变）
        lines.push('');
        lines.push('=== B. 模拟修复：Foot区域主导=Leg → Foot 槽 ===');
        const idxArr = (convMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute).array as Uint16Array;
        const wgtArr = (convMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute).array as Float32Array;
        let remapped = 0;
        for (let v = 0; v < nVerts; v++) {
            if (convRegion[v] !== 'mixamorigLeftFoot' && convRegion[v] !== 'mixamorigRightFoot') continue;
            const dom = convDom[v];
            if (dom !== 'mixamorigLeftLeg' && dom !== 'mixamorigRightLeg') continue;
            // 找主导槽（=Leg 的最大权重槽），改指同侧 Foot
            const targetFoot = dom === 'mixamorigLeftLeg' ? 'mixamorigLeftFoot' : 'mixamorigRightFoot';
            const targetIdx = footIdx.get(targetFoot);
            if (targetIdx === undefined) continue;
            let bi = -1, bw = -1;
            for (let k = 0; k < 4; k++) {
                if (wgtArr[v * 4 + k] > bw) { bw = wgtArr[v * 4 + k]; bi = k; }
            }
            if (bi < 0) continue;
            idxArr[v * 4 + bi] = targetIdx;
            remapped++;
        }
        lines.push(`  Foot区域主导=Leg → Foot 顶点数: ${remapped}`);

        // C. 重建区域对照表（修复后）
        lines.push('');
        lines.push('=== C. 修复后 Foot 区域主导骨 vs 官方 ===');
        const countDom = (getDom: (v: number) => string, verts: number[]): Map<string, number> => {
            const m = new Map<string, number>();
            for (const v of verts) {
                const d = getDom(v);
                m.set(d, (m.get(d) || 0) + 1);
            }
            return m;
        };
        for (const footRegion of ['mixamorigLeftFoot', 'mixamorigRightFoot']) {
            const footVerts: number[] = [];
            for (let v = 0; v < nVerts; v++) if (convRegion[v] === footRegion) footVerts.push(v);
            // 官方（用官方顶点 index —— 顶点顺序不同！需按位置最近邻，但主导骨是 per-vertex 的，
            // 这里简化：用官方网格自身 position 归区域，index 是官方的）
            const offFootVerts: number[] = [];
            for (let v = 0; v < nVerts; v++) {
                vTmp.set(offAttr.getX(v), offAttr.getY(v), offAttr.getZ(v));
                if (regionOf(vTmp) === footRegion) offFootVerts.push(v);
            }
            const offDom = countDom((v) => dominantBone(offMesh, v), offFootVerts);
            const convDom2 = countDom((v) => dominantBone(convMesh, v), footVerts);
            const fmt = (m: Map<string, number>) =>
                Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([bn, c]) => `${bn.replace('mixamorig', '')}:${c}`).join('  ');
            lines.push(`  ${footRegion.replace('mixamorig', '')}: 官方=[${fmt(offDom)}]  修复后=[${fmt(convDom2)}]`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');
        const outPath = path.join(__dirname, '..', '..', 'temp', 'probe-arm-leg-fixsim.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text, remapped }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 240000);
});
