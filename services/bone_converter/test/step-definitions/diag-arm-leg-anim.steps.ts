/**
 * diag-arm-leg-anim.steps.ts — V12.2 后续：上臂(Arm)/小腿(Leg) 动画逐帧对比（主导骨分桶）
 *
 * 任务 3：
 *   A. 骨骼 worldQ diff（聚焦 Arm/Leg 链，应全部 ~0 —— 骨骼层正确）
 *   B. 蒙皮顶点逐帧 diff：**mesh-local 空间**（不乘 matrixWorld，规避两 FBX 根变换差异）
 *      空间哈希最近邻匹配（规避顶点顺序差异），按「主导骨」分桶定位失真区域
 *   C. 主导骨混淆矩阵：同一物理顶点（最近邻）在转换后 vs 官方分别绑到哪根骨，
 *      直接暴露权重映射错位（如官方绑 ForeArm 的顶点转换后绑到 Arm）
 *
 * 跑法：cd services/bone_converter && npx jest --config jest.config.js --testPathPattern diag-arm-leg-anim --forceExit
 * 输出：temp/diag-arm-leg-anim.json + 控制台
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
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const LOD2_FBX = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx');
const ANIM_WALK_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Walk/1.fbx');

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
/** CPU 蒙皮：mesh-local 空间（不乘 matrixWorld） */
function skinnedVertices(mesh: THREE.SkinnedMesh): Float32Array {
    const geom = mesh.geometry;
    const pos = geom.getAttribute('position') as THREE.BufferAttribute;
    const idx = geom.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgt = geom.getAttribute('skinWeight') as THREE.BufferAttribute;
    const sk = mesh.skeleton;
    const out = new Float32Array(pos.count * 3);
    const bmFwd = mesh.bindMatrix;
    const bmInv = mesh.bindMatrix.clone().invert();
    const p = pos.array as Float32Array;
    const i = idx.array as Uint16Array | Uint32Array;
    const w = wgt.array as Float32Array;
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let v = 0; v < pos.count; v++) {
        vBind.fromArray(p, v * 3).applyMatrix4(bmFwd);
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const wt = w[v * 4 + k];
            if (wt === 0) continue;
            const bi = i[v * 4 + k];
            const bone = sk.bones[bi];
            const inv = sk.boneInverses[bi];
            if (!bone || !inv) continue;
            boneMat.copy(bone.matrixWorld).multiply(inv);
            tmp.copy(vBind).applyMatrix4(boneMat);
            acc.addScaledVector(tmp, wt);
        }
        acc.applyMatrix4(bmInv);
        out[v * 3] = acc.x; out[v * 3 + 1] = acc.y; out[v * 3 + 2] = acc.z;
    }
    return out;
}
/** 空间哈希最近邻 */
function nearestIdx(pts: Float32Array, target: Float32Array, cell: number, radius = 3): { dist: Float32Array; idx: Int32Array } {
    const map = new Map<string, number[]>();
    const key = (x: number, y: number, z: number) => `${Math.round(x / cell)},${Math.round(y / cell)},${Math.round(z / cell)}`;
    const tgtCount = target.length / 3;
    for (let v = 0; v < tgtCount; v++) {
        const k = key(target[v * 3], target[v * 3 + 1], target[v * 3 + 2]);
        let arr = map.get(k);
        if (!arr) { arr = []; map.set(k, arr); }
        arr.push(v);
    }
    const n = pts.length / 3;
    const dist = new Float32Array(n).fill(Infinity);
    const idx = new Int32Array(n).fill(-1);
    for (let v = 0; v < n; v++) {
        const x = pts[v * 3], y = pts[v * 3 + 1], z = pts[v * 3 + 2];
        const cx = Math.round(x / cell), cy = Math.round(y / cell), cz = Math.round(z / cell);
        let best = Infinity, bi = -1;
        for (let dx = -radius; dx <= radius; dx++) for (let dy = -radius; dy <= radius; dy++) for (let dz = -radius; dz <= radius; dz++) {
            const arr = map.get(`${cx + dx},${cy + dy},${cz + dz}`);
            if (!arr) continue;
            for (const j of arr) {
                const d = Math.hypot(x - target[j * 3], y - target[j * 3 + 1], z - target[j * 3 + 2]);
                if (d < best) { best = d; bi = j; }
            }
        }
        dist[v] = best; idx[v] = bi;
    }
    return { dist, idx };
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

describe('DIAG: Arm/Leg animated frame compare (dominant-bone bucketed, V12.2 follow-up)', () => {
    it('plays Walk on both, dominant-bone bucketed vertex diff + confusion matrix', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const officialAnim = loadFbx(ANIM_WALK_FBX);
        const officialClip = officialAnim.animations[0];
        const clipOfficial = normalizeRootMotion(officialClip, officialRoot, officialAnim);
        officialRoot.rotateY(Math.PI);
        const officialMixer = new THREE.AnimationMixer(officialRoot);
        const officialAction = officialMixer.clipAction(clipOfficial);
        officialAction.reset(); officialAction.play();

        const convRoot = loadFbx(TRIPO_FBX);
        const convAnim = loadFbx(ANIM_WALK_FBX);
        const convClipRaw = convAnim.animations[0];
        const lod2ForRest = loadFbx(LOD2_FBX);
        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });
        const clipConv = normalizeRootMotion(convClipRaw, convRoot, convAnim);
        convRoot.rotateY(Math.PI);
        const convMixer = new THREE.AnimationMixer(convRoot);
        const convAction = convMixer.clipAction(clipConv);
        convAction.reset(); convAction.play();

        const duration = officialClip.duration;
        const times: number[] = [0];
        const step = duration <= 1 ? 0.05 : 0.1;
        for (let t = step; t <= duration + 1e-6; t += step) times.push(+t.toFixed(4));

        const offBones = new Map<string, THREE.Bone>();
        officialRoot.traverse((n) => { if ((n as THREE.Bone).isBone) offBones.set(n.name, n as THREE.Bone); });
        const convBones = new Map<string, THREE.Bone>();
        convRoot.traverse((n) => { if ((n as THREE.Bone).isBone) convBones.set(n.name, n as THREE.Bone); });
        const shared = Array.from(offBones.keys()).filter((n) => convBones.has(n) && /^(mixamorig)/.test(n));

        const offMesh = firstSkinned(officialRoot);
        const convMesh = firstSkinned(convRoot);
        const nVerts = (convMesh.geometry.getAttribute('position') as THREE.BufferAttribute).count;
        const convDominant: string[] = new Array(nVerts);
        for (let v = 0; v < nVerts; v++) convDominant[v] = dominantBone(convMesh, v);

        const lines: string[] = [];
        lines.push(`动画: ${officialClip.name} 时长=${duration.toFixed(3)}s 采样 ${times.length} 帧`);
        lines.push(`共享骨骼 ${shared.length}，转换后顶点 ${nVerts}`);

        const focusBones = [
            'mixamorigLeftArm', 'mixamorigRightArm', 'mixamorigLeftForeArm', 'mixamorigRightForeArm',
            'mixamorigLeftLeg', 'mixamorigRightLeg', 'mixamorigLeftFoot', 'mixamorigRightFoot',
            'mixamorigLeftShoulder', 'mixamorigRightShoulder', 'mixamorigLeftUpLeg', 'mixamorigRightUpLeg',
        ];
        lines.push('');
        lines.push('=== A. 骨骼 worldQ diff（转换后 vs 官方，逐帧 max）===');
        const q1 = new THREE.Quaternion();
        const q2 = new THREE.Quaternion();
        const boneMaxDiff = new Map<string, number>();
        for (const bn of focusBones) boneMaxDiff.set(bn, 0);
        for (const t of times) {
            officialMixer.setTime(t); officialRoot.updateMatrixWorld(true);
            convMixer.setTime(t); convRoot.updateMatrixWorld(true);
            for (const bn of focusBones) {
                offBones.get(bn)!.getWorldQuaternion(q1);
                convBones.get(bn)!.getWorldQuaternion(q2);
                const ang = q1.angleTo(q2) * 180 / Math.PI;
                boneMaxDiff.set(bn, Math.max(boneMaxDiff.get(bn)!, ang));
            }
        }
        for (const bn of focusBones) {
            const d = boneMaxDiff.get(bn)!;
            lines.push(`  ${bn.padEnd(26)} maxWorldQDiff=${d.toExponential(2)}° ${d > 1 ? '<<< RED' : ''}`);
        }

        const sampleFrames = times.filter((_, i) => i % Math.max(1, Math.floor(times.length / 10)) === 0);
        const vertexSample = new Set<number>();
        const regionCount = new Map<string, number>();
        for (let v = 0; v < nVerts; v++) {
            const r = convDominant[v];
            const c = regionCount.get(r) || 0;
            if (c < 150) { vertexSample.add(v); regionCount.set(r, c + 1); }
        }

        lines.push('');
        lines.push('=== B. 蒙皮顶点 diff（mesh-local 空间，转换后 → 官方最近邻），按主导骨分桶 ===');
        const regionAgg: Record<string, { max: number; sum: number; n: number; unmatched: number }> = {};
        for (let v = 0; v < nVerts; v++) {
            const r = convDominant[v];
            if (!regionAgg[r]) regionAgg[r] = { max: 0, sum: 0, n: 0, unmatched: 0 };
        }
        const perVertSum = new Float32Array(nVerts).fill(0);
        const perVertN = new Int32Array(nVerts).fill(0);
        const perVertUnmatched = new Uint8Array(nVerts).fill(0);
        for (const t of sampleFrames) {
            officialMixer.setTime(t); officialRoot.updateMatrixWorld(true);
            convMixer.setTime(t); convRoot.updateMatrixWorld(true);
            const a = skinnedVertices(offMesh);
            const b = skinnedVertices(convMesh);
            const { dist } = nearestIdx(b, a, 0.05);
            for (let v = 0; v < nVerts; v++) {
                if (isFinite(dist[v])) { perVertSum[v] += dist[v]; perVertN[v]++; }
                else perVertUnmatched[v] = 1;
            }
        }
        for (let v = 0; v < nVerts; v++) {
            const r = convDominant[v];
            const agg = regionAgg[r]!;
            const d = perVertN[v] ? perVertSum[v] / perVertN[v] : Infinity;
            agg.max = Math.max(agg.max, d);
            agg.sum += d;
            agg.n += 1;
            if (perVertUnmatched[v]) agg.unmatched++;
        }
        const regionOrder = Object.keys(regionAgg).sort((x, y) => regionAgg[y].max - regionAgg[x].max);
        lines.push('| 主导骨 | mean|Δv| | 无匹配 | 采样顶点 |');
        lines.push('|--------|---------|--------|---------|');
        for (const r of regionOrder) {
            const agg = regionAgg[r]!;
            const flag = agg.max > 0.1 ? ' <<< RED' : '';
            lines.push(`| ${r.padEnd(26)} | ${agg.max.toFixed(4).padStart(8)} | ${String(agg.unmatched).padStart(6)} | ${String(agg.n).padStart(7)} |${flag}`);
        }

        lines.push('');
        lines.push('=== C. 主导骨混淆矩阵（物理最近邻：转换后主导骨 → 官方主导骨）===');
        const lastT = sampleFrames[sampleFrames.length - 1];
        officialMixer.setTime(lastT); officialRoot.updateMatrixWorld(true);
        convMixer.setTime(lastT); convRoot.updateMatrixWorld(true);
        const aLast = skinnedVertices(offMesh);
        const bLast = skinnedVertices(convMesh);
        const { idx: lastIdx } = nearestIdx(bLast, aLast, 0.05, 3);
        const confusion = new Map<string, Map<string, number>>();
        const offDominant = (v: number) => dominantBone(offMesh, v);
        for (let v = 0; v < nVerts; v++) {
            const cd = convDominant[v];
            const oi = lastIdx[v];
            if (oi < 0) continue;
            const od = offDominant(oi);
            if (!confusion.has(cd)) confusion.set(cd, new Map());
            const m = confusion.get(cd)!;
            m.set(od, (m.get(od) || 0) + 1);
        }
        const focusDominants = ['mixamorigLeftArm', 'mixamorigRightArm', 'mixamorigLeftForeArm', 'mixamorigRightForeArm',
            'mixamorigLeftLeg', 'mixamorigRightLeg', 'mixamorigLeftFoot', 'mixamorigRightFoot',
            'mixamorigLeftUpLeg', 'mixamorigRightUpLeg', 'mixamorigLeftHand', 'mixamorigRightHand',
            'mixamorigLeftShoulder', 'mixamorigRightShoulder'];
        for (const cd of focusDominants) {
            const m = confusion.get(cd);
            if (!m) continue;
            const sorted = Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
            const total = sorted.reduce((s, [, c]) => s + c, 0);
            lines.push(`  ${cd.padEnd(24)} (${total} 顶点): ${sorted.slice(0, 5).map(([od, c]) => `${od}:${c}`).join(', ')}`);
        }

        // D. 采样 Arm/Leg 区域最坏顶点权重槽
        lines.push('');
        lines.push('=== D. Arm/Leg 主导顶点权重槽采样（转换后 vs 官方最近邻）===');
        for (const r of ['mixamorigLeftArm', 'mixamorigRightArm', 'mixamorigLeftLeg', 'mixamorigRightLeg']) {
            let worstV = -1, worstD = -1;
            for (const v of vertexSample) {
                if (convDominant[v] !== r) continue;
                if (perVertN[v] && (perVertSum[v] / perVertN[v]) > worstD) { worstD = perVertSum[v] / perVertN[v]; worstV = v; }
            }
            if (worstV < 0) continue;
            const oi = lastIdx[worstV];
            lines.push(`  [${r}] worstV=${worstV} mean|Δv|=${worstD.toFixed(4)}`);
            lines.push(`    转换后: ${slotsOf(convMesh, worstV)}`);
            lines.push(`    官方最近邻(v=${oi}): ${oi >= 0 ? slotsOf(offMesh, oi) : '(未匹配)'}`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');
        const outPath = path.join(__dirname, '..', '..', 'temp', 'diag-arm-leg-anim.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text, boneMaxDiff: Object.fromEntries(boneMaxDiff), regionAgg }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 240000);
});
