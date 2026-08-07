/**
 * diag-anim-frame-compare.steps.ts — 任务 2：动画逐帧对比探针
 *
 * 加载「官方 lod2」和「转换后模型（Tripo→convertTripoToMixamo）」，
 * 同一动画（Walk/1.fbx），走 demo 完全相同路径：
 *   normalizeRootMotion(clip, model, animSkeleton) → model.rotateY(π) → mixer
 * 逐帧采样每骨骼 worldQ/worldPos，官方 vs 转换后 逐骨对比。
 *
 * 锁定失真是哪条链（Hips / TORSO_CHAIN / 腿 / 手臂），并给出 diff 幅度。
 *
 * 跑法：cd services/bone_converter && npx jest --config jest.config.js --testPathPattern diag-anim-frame-compare --forceExit
 * 输出：temp/diag-anim-frame-compare.json + 控制台
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
const TRIPO_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const LOD2_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);
const ANIM_WALK_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Walk/1.fbx',
);

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function chainOf(bone: string): 'hips' | 'torso' | 'armL' | 'armR' | 'legL' | 'legR' | 'other' {
    if (bone === 'mixamorigHips') return 'hips';
    if (/mixamorig(Spine|Spine1|Spine2|Neck|Head)$/.test(bone)) return 'torso';
    if (bone.startsWith('mixamorigLeft') && /(Shoulder|Arm|ForeArm|Hand)$/.test(bone)) return 'armL';
    if (bone.startsWith('mixamorigRight') && /(Shoulder|Arm|ForeArm|Hand)$/.test(bone)) return 'armR';
    if (bone.startsWith('mixamorigLeft') && /(UpLeg|Leg|Foot|ToeBase)$/.test(bone)) return 'legL';
    if (bone.startsWith('mixamorigRight') && /(UpLeg|Leg|Foot|ToeBase)$/.test(bone)) return 'legR';
    return 'other';
}

describe('DIAG: anim frame compare — official lod2 vs converted model', () => {
    it('plays Walk on both, diffs worldQ/worldPos per bone per frame', () => {
        // ⚠️ normalizeRootMotion 会 re-pose 模型 bind + 驱动 animSkeleton，必须每侧用全新 FBX parse
        const officialRoot = loadFbx(LOD2_FBX);
        const officialAnim = loadFbx(ANIM_WALK_FBX);
        const officialClip = officialAnim.animations[0];

        // 官方路径（对照组，与 demo loadOfficialModel + setupMixer 完全一致）
        const clipOfficial = normalizeRootMotion(officialClip, officialRoot, officialAnim);
        officialRoot.rotateY(Math.PI);
        const officialMixer = new THREE.AnimationMixer(officialRoot);
        const officialAction = officialMixer.clipAction(clipOfficial);
        officialAction.reset();
        officialAction.play();

        // 转换后路径（demo loadModel + convert + setupMixer 完全一致）
        const convRoot = loadFbx(TRIPO_FBX);
        const convAnim = loadFbx(ANIM_WALK_FBX);
        const convClipRaw = convAnim.animations[0];
        // demo: convertTripoToMixamo(model, { officialRestPose: officialRestRoot })
        const lod2ForRest = loadFbx(LOD2_FBX);
        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });
        const clipConv = normalizeRootMotion(convClipRaw, convRoot, convAnim);
        convRoot.rotateY(Math.PI);
        const convMixer = new THREE.AnimationMixer(convRoot);
        const convAction = convMixer.clipAction(clipConv);
        convAction.reset();
        convAction.play();

        // 采样时间（clip 时长）
        const duration = officialClip.duration;
        const times: number[] = [0];
        const step = duration <= 1 ? 0.05 : 0.1;
        for (let t = step; t <= duration + 1e-6; t += step) times.push(+t.toFixed(4));

        const offBones = new Map<string, THREE.Bone>();
        officialRoot.traverse((n) => { if ((n as THREE.Bone).isBone) offBones.set(n.name, n as THREE.Bone); });
        const convBones = new Map<string, THREE.Bone>();
        convRoot.traverse((n) => { if ((n as THREE.Bone).isBone) convBones.set(n.name, n as THREE.Bone); });

        const shared = Array.from(offBones.keys()).filter((n) => convBones.has(n) && /^(mixamorig)/.test(n));
        // 记录每骨骼每帧 worldQ angle diff + worldPos distance
        const perBone: Record<string, { maxAngleDeg: number; meanAngleDeg: number; maxPosDist: number; meanPosDist: number; frames: number }> = {};

        const q1 = new THREE.Quaternion();
        const q2 = new THREE.Quaternion();
        const p1 = new THREE.Vector3();
        const p2 = new THREE.Vector3();

        for (const bn of shared) {
            perBone[bn] = { maxAngleDeg: 0, meanAngleDeg: 0, maxPosDist: 0, meanPosDist: 0, frames: 0 };
        }

        for (const t of times) {
            officialMixer.setTime(t);
            officialRoot.updateMatrixWorld(true);
            convMixer.setTime(t);
            convRoot.updateMatrixWorld(true);
            for (const bn of shared) {
                const ob = offBones.get(bn)!;
                const cb = convBones.get(bn)!;
                ob.getWorldQuaternion(q1);
                cb.getWorldQuaternion(q2);
                const ang = q1.angleTo(q2) * 180 / Math.PI;
                ob.getWorldPosition(p1);
                cb.getWorldPosition(p2);
                const dist = p1.distanceTo(p2);
                const rec = perBone[bn]!;
                rec.maxAngleDeg = Math.max(rec.maxAngleDeg, ang);
                rec.maxPosDist = Math.max(rec.maxPosDist, dist);
                rec.meanAngleDeg += ang;
                rec.meanPosDist += dist;
                rec.frames += 1;
            }
        }
        for (const bn of shared) {
            const rec = perBone[bn]!;
            rec.meanAngleDeg /= rec.frames;
            rec.meanPosDist /= rec.frames;
        }

        // 分组汇总
        const chainSum: Record<string, { maxAngle: number; maxPos: number; meanAngle: number; n: number }> = {};
        for (const bn of shared) {
            const ch = chainOf(bn);
            if (!chainSum[ch]) chainSum[ch] = { maxAngle: 0, maxPos: 0, meanAngle: 0, n: 0 };
            const rec = perBone[bn]!;
            chainSum[ch].maxAngle = Math.max(chainSum[ch].maxAngle, rec.maxAngleDeg);
            chainSum[ch].maxPos = Math.max(chainSum[ch].maxPos, rec.maxPosDist);
            chainSum[ch].meanAngle += rec.meanAngleDeg;
            chainSum[ch].n += 1;
        }
        for (const k of Object.keys(chainSum)) chainSum[k].meanAngle /= chainSum[k].n;

        const lines: string[] = [];
        lines.push(`动画: ${officialClip.name} 时长=${duration.toFixed(3)}s 采样 ${times.length} 帧`);
        lines.push(`共享骨骼 ${shared.length} 个（官方 ${offBones.size}，转换后 ${convBones.size}）`);
        lines.push('');
        lines.push('=== 分组汇总（转换后 vs 官方，逐帧世界姿态差）===');
        lines.push('| 链 | 骨数 | maxAngle(°) | meanAngle(°) | maxPos | meanPos |');
        lines.push('|---|-----|------------|-------------|--------|---------|');
        for (const [ch, s] of Object.entries(chainSum)) {
            lines.push(`| ${ch.padEnd(6)}| ${String(s.n).padStart(4)}| ${s.maxAngle.toFixed(2).padStart(10)}| ${s.meanAngle.toFixed(2).padStart(11)}| ${s.maxPos.toFixed(4).padStart(6)}| ${(s.maxPos / (s.n || 1)).toFixed(4).padStart(7)}|`);
        }
        lines.push('');
        lines.push('=== 逐骨明细（maxAngle 降序）===');
        const sorted = shared.slice().sort((a, b) => perBone[b]!.maxAngleDeg - perBone[a]!.maxAngleDeg);
        for (const bn of sorted) {
            const rec = perBone[bn]!;
            const flag = rec.maxAngleDeg > 1 ? ' <<< RED' : rec.maxAngleDeg > 0.2 ? ' yellow' : '';
            lines.push(`${bn.padEnd(30)} maxAng=${rec.maxAngleDeg.toFixed(3).padStart(8)}° mean=${rec.meanAngleDeg.toFixed(3).padStart(8)}° maxPos=${rec.maxPosDist.toFixed(5)}${flag}`);
        }

        // ── 网格蒙皮顶点对比（骨骼一致不代表网格一致！）──
        lines.push('');
        lines.push('=== 蒙皮网格顶点对比（skinned vertex 逐帧）===');
        // CPU 蒙皮：vOut = bindMatrix⁻¹ · Σ w_i · matrixWorld(bone_i) · boneInverse_i · bindMatrix · v
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

        const offMeshes: THREE.SkinnedMesh[] = [];
        officialRoot.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) offMeshes.push(n as THREE.SkinnedMesh); });
        const convMeshes: THREE.SkinnedMesh[] = [];
        convRoot.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) convMeshes.push(n as THREE.SkinnedMesh); });
        lines.push(`官方 SkinnedMesh ${offMeshes.length} 个 / 转换后 ${convMeshes.length} 个`);

        let maxVertexDist = 0;
        let meanVertexDist = 0;
        let worstFrame = 0;
        const sampleFrames = times.filter((_, i) => i % Math.max(1, Math.floor(times.length / 8)) === 0);
        for (const t of sampleFrames) {
            officialMixer.setTime(t);
            officialRoot.updateMatrixWorld(true);
            convMixer.setTime(t);
            convRoot.updateMatrixWorld(true);
            const a = skinnedVertices(offMeshes[0]);
            const b = skinnedVertices(convMeshes[0]);
            let frameMax = 0;
            let frameSum = 0;
            const n = a.length / 3;
            for (let v = 0; v < n; v++) {
                const dx = a[v * 3] - b[v * 3];
                const dy = a[v * 3 + 1] - b[v * 3 + 1];
                const dz = a[v * 3 + 2] - b[v * 3 + 2];
                const d = Math.hypot(dx, dy, dz);
                frameMax = Math.max(frameMax, d);
                frameSum += d;
            }
            const frameMean = frameSum / n;
            if (frameMax > maxVertexDist) { maxVertexDist = frameMax; worstFrame = t; }
            meanVertexDist += frameMean;
            lines.push(`  t=${t.toFixed(3)}: max|Δv|=${frameMax.toFixed(4)} mean|Δv|=${frameMean.toFixed(6)}`);
        }
        meanVertexDist /= sampleFrames.length;
        lines.push(`最坏帧 t=${worstFrame.toFixed(3)} maxVertexDist=${maxVertexDist.toFixed(4)}`);

        // 轨道匹配统计（任务 3 数据）
        lines.push('');
        lines.push('=== 轨道匹配（任务 3：动画轨道名 vs 转换后模型骨骼名）===');
        const convNameSet = new Set(Array.from(convBones.keys()));
        const clipTracks = officialClip.tracks;
        const trackBones = new Set(clipTracks.map((t) => t.name.replace(/\.(position|quaternion|scale)$/, '')));
        const nonFingerTracks = Array.from(trackBones).filter((n) => !/(Thumb|Index|Middle|Ring|Pinky)\d*$/.test(n));
        const matchedNonFinger = nonFingerTracks.filter((n) => convNameSet.has(n));
        lines.push(`clip 轨道骨骼名（非手指）: ${nonFingerTracks.length} 个`);
        lines.push(`命中转换后模型: ${matchedNonFinger.length} 个: ${matchedNonFinger.join(', ')}`);
        lines.push(`未命中（轨道有、转换后没有）: ${nonFingerTracks.filter((n) => !convNameSet.has(n)).join(', ') || '(无)'}`);

        const text = lines.join('\n');
        console.log('\n' + text + '\n');

        const outPath = path.join(__dirname, '..', '..', 'temp', 'diag-anim-frame-compare.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({
            clipName: officialClip.name,
            duration,
            times,
            boneCountOfficial: offBones.size,
            boneCountConverted: convBones.size,
            sharedBones: shared,
            chainSummary: chainSum,
            perBone,
            trackMatch: {
                nonFingerTracks: nonFingerTracks.length,
                matched: matchedNonFinger,
                unmatched: nonFingerTracks.filter((n) => !convNameSet.has(n)),
            },
        }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);

        // 诊断断言：手臂/躯干/腿/hips 都应 < 1°（若某链超阈值即定位失真链）
        for (const [ch, s] of Object.entries(chainSum)) {
            if (ch === 'other') continue;
            if (s.maxAngle > 1) {
                console.log(`[DIAG-FAIL] 链 ${ch} 失真: maxAngle=${s.maxAngle.toFixed(2)}°（>1°）`);
            }
        }
    }, 180000);
});
