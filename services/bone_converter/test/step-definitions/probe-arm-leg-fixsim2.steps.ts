/**
 * probe-arm-leg-fixsim2.steps.ts — 候选修复验证 2：上臂(Arm)区域顶点应混合 Shoulder
 *
 * 背景（diag-arm-leg-region 实锤）：
 *   转换后 Arm 区域主导骨 = Arm(615)，官方 = Shoulder(305)/Spine1(265)/Arm(149)。
 *   根因：Tripo 肩帽/三角肌顶点权重在 UpperarmTwist01（位于肩关节，localPos≈0），
 *   V12.2 semanticParent → L_Upperarm(Arm)，肩帽顶点被 Arm 骨刚性拖拽 → 上臂僵硬。
 *
 * 本探针验证上臂修复假说：
 *   A. 打印 Arm 区域顶点的权重槽（确认主导=Arm，来源=UpperarmTwist 合并）
 *   B. 模拟修复：把「Arm 区域 && 主导=Arm && bind 位置在肩关节半区（距 Shoulder 近）」的
 *      顶点的 Arm 槽改指 Shoulder → 重建区域对照表 → 确认 Arm 区域与官方一致
 *   C. 输出修复后 Arm 区域主导骨分布 vs 官方
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern probe-arm-leg-fixsim2 --forceExit
 * 输出：temp/probe-arm-leg-fixsim2.json + 控制台
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

describe('PROBE: fix simulation 2 — Arm region should blend Shoulder', () => {
    it('shows arm vertex slots, simulates Arm→Shoulder remap, rebuilds region table', () => {
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

        const convRegion: string[] = new Array(nVerts);
        const convDom: string[] = new Array(nVerts);
        for (let v = 0; v < nVerts; v++) {
            vTmp.set(convAttr.getX(v), convAttr.getY(v), convAttr.getZ(v));
            convRegion[v] = regionOf(vTmp);
            convDom[v] = dominantBone(convMesh, v);
        }

        const lines: string[] = [];
        lines.push('=== A. Arm 区域顶点权重槽采样（转换后，确认主导=Arm）===');
        const skel = convMesh.skeleton;
        const shIdx = new Map<string, number>();
        skel.bones.forEach((b, i) => { if (b.name === 'mixamorigLeftShoulder' || b.name === 'mixamorigRightShoulder') shIdx.set(b.name, i); });
        let sampled = 0;
        for (let v = 0; v < nVerts && sampled < 8; v++) {
            if (convRegion[v] !== 'mixamorigLeftArm' && convRegion[v] !== 'mixamorigRightArm') continue;
            if (convDom[v] !== 'mixamorigLeftArm' && convDom[v] !== 'mixamorigRightArm') continue;
            lines.push(`  v${v} 区域=${convRegion[v].replace('mixamorig', '')} 主导=${convDom[v].replace('mixamorig', '')} 槽: ${slotsOf(convMesh, v)}`);
            sampled++;
        }
        if (sampled === 0) lines.push('  （无 Arm 区域主导=Arm 的顶点？）');

        // B. 模拟修复：Arm 区域主导=Arm 且 bind 位置距 Shoulder < 距 ForeArm 的顶点 → 改指 Shoulder
        lines.push('');
        lines.push('=== B. 模拟修复：Arm区域主导=Arm 且肩半区 → Shoulder 槽 ===');
        const idxArr = (convMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute).array as Uint16Array;
        const wgtArr = (convMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute).array as Float32Array;
        let remapped = 0;
        for (let v = 0; v < nVerts; v++) {
            const dom = convDom[v];
            if (dom !== 'mixamorigLeftArm' && dom !== 'mixamorigRightArm') continue;
            if (convRegion[v] !== dom) continue; // 只处理 Arm 区域主导=Arm
            const side = dom === 'mixamorigLeftArm' ? 'Left' : 'Right';
            const shName = `mixamorig${side}Shoulder`;
            const foName = `mixamorig${side}ForeArm`;
            const shPos = offBoneWorld.get(shName)!;
            const foPos = offBoneWorld.get(foName)!;
            const targetSh = shIdx.get(shName);
            if (targetSh === undefined) continue;
            vTmp.set(convAttr.getX(v), convAttr.getY(v), convAttr.getZ(v));
            // 肩半区：距 Shoulder < 距 ForeArm（bind 几何位置判断）
            if (vTmp.distanceTo(shPos) >= vTmp.distanceTo(foPos)) continue;
            // 主导槽改指 Shoulder
            let bi = -1, bw = -1;
            for (let k = 0; k < 4; k++) {
                if (wgtArr[v * 4 + k] > bw) { bw = wgtArr[v * 4 + k]; bi = k; }
            }
            if (bi < 0) continue;
            idxArr[v * 4 + bi] = targetSh;
            remapped++;
        }
        lines.push(`  Arm区域主导=Arm 肩半区 → Shoulder 顶点数: ${remapped}`);

        // C. 重建区域对照表（修复后 Arm 区域）
        lines.push('');
        lines.push('=== C. 修复后 Arm 区域主导骨 vs 官方 ===');
        const countDom = (getDom: (v: number) => string, verts: number[]): Map<string, number> => {
            const m = new Map<string, number>();
            for (const v of verts) {
                const d = getDom(v);
                m.set(d, (m.get(d) || 0) + 1);
            }
            return m;
        };
        for (const armRegion of ['mixamorigLeftArm', 'mixamorigRightArm']) {
            const armVerts: number[] = [];
            for (let v = 0; v < nVerts; v++) if (convRegion[v] === armRegion) armVerts.push(v);
            const offArmVerts: number[] = [];
            for (let v = 0; v < nVerts; v++) {
                vTmp.set(offAttr.getX(v), offAttr.getY(v), offAttr.getZ(v));
                if (regionOf(vTmp) === armRegion) offArmVerts.push(v);
            }
            const offDom = countDom((v) => dominantBone(offMesh, v), offArmVerts);
            const convDom2 = countDom((v) => dominantBone(convMesh, v), armVerts);
            const fmt = (m: Map<string, number>) =>
                Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([bn, c]) => `${bn.replace('mixamorig', '')}:${c}`).join('  ');
            lines.push(`  ${armRegion.replace('mixamorig', '')}: 官方=[${fmt(offDom)}]  修复后=[${fmt(convDom2)}]`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');
        const outPath = path.join(__dirname, '..', '..', 'temp', 'probe-arm-leg-fixsim2.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text, remapped }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 240000);
});
