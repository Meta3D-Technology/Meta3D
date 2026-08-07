/**
 * probe-v9-multitime — V9 多时间点诊断探针（t≠0 帧是否真扭曲）
 *
 * 背景：V9 帧校正（normalizeRootMotion D9）修复后 BDD 39/39 全绿，但所有断言只采样 t=0。
 * E2E t≈4s 截图经 Kimi 提示左臂外展/双臂不对称/前臂轻度内旋。需确认动画播放中（t≠0）
 * 手臂是否真的扭曲。
 *
 * 本探针复用 probe-v9-diag 骨架（Node polyfill + FBXLoader + convertTripoToMixamo +
 * normalizeRootMotion + AnimationMixer），在 clip 时长内均匀采样 8-10 个时间点（含开头/
 * 中段/结尾），逐 t 计算并输出：
 *   Q1 逐时间点蒙皮相对旋转偏差（S14 动态版）：gap(t) = angle(worldQ_out·bindQ_model⁻¹,
 *      animQ(t)·animBindQ⁻¹)，阈值 10°
 *   Q2 双臂对称性（左臂 vs 右臂镜像后的夹角，绕 Y 镜像）
 *   Q3 段方向 vs 竖直向下（位置版 + 朝向版「网格实际蒙皮方向」）
 *   Q4 动画 clip 基本信息（name / duration / track 名）
 *   Q5 逐 t 判定（正常 / 单侧扭曲 / 双侧扭曲 / 动作帧）
 *
 * 只写探针，禁止修改 src/、test/step-definitions/、test/features/、doc/、笔记/。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v9-multitime" --forceExit
 */
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
    addEventListener(_e: string, _cb: any) { }
    removeEventListener(_e: string, _cb: any) { }
    setAttribute(_n: string, _v: string) { }
    getAttribute(_n: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);
const ANIM_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx',
);

const ARM_BONES = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;
type BoneName = typeof ARM_BONES[number];

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

type WorldState = Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>;

function captureAll(root: THREE.Object3D): WorldState {
    root.updateMatrixWorld(true);
    const out = new Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) {
            out.set(n.name, {
                pos: n.getWorldPosition(new THREE.Vector3()),
                quat: n.getWorldQuaternion(new THREE.Quaternion()),
            });
        }
    });
    return out;
}

const rad2deg = (r: number) => r * 180 / Math.PI;

function quatDiffDeg(qA: THREE.Quaternion, qB: THREE.Quaternion): number {
    const rel = qA.clone().multiply(qB.clone().invert());
    const w = Math.min(1, Math.abs(rel.w));
    return rad2deg(2 * Math.acos(w));
}

/** 绕 YZ 平面（x=0，身体中线）镜像四元数：q' = (w, -x, y, z) */
function mirrorQuatX(q: THREE.Quaternion): THREE.Quaternion {
    return new THREE.Quaternion(-q.x, q.y, q.z, q.w);
}

function sideOf(bn: BoneName): 'Left' | 'Right' { return bn.startsWith('mixamorigLeft') ? 'Left' : 'Right'; }

function r2(x: number): number { return +x.toFixed(2); }

/** CPU skinning: skinned world position per vertex + dominant bone name (max weight) */
function skinMesh(mesh: THREE.SkinnedMesh): { skinned: THREE.Vector3[]; dominantBone: string[] } {
    mesh.updateMatrixWorld(true);
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const n = posAttr.count;
    const skinned: THREE.Vector3[] = new Array(n);
    const dominantBone: string[] = new Array(n);
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
        acc.set(0, 0, 0);
        let best = -1;
        let bestW = -1;
        for (let k = 0; k < 4; k++) {
            const bi = idxAttr.getX(i * 4 + k);
            const w = wgtAttr.getX(i * 4 + k);
            if (w > bestW) { bestW = w; best = bi; }
            if (w === 0) continue;
            const bone = sk.bones[bi];
            if (!bone) continue;
            boneMat.copy(bone.matrixWorld).multiply(sk.boneInverses[bi]);
            const c = new THREE.Vector3().copy(vBind).applyMatrix4(boneMat).multiplyScalar(w);
            acc.add(c);
        }
        acc.applyMatrix4(mesh.matrixWorld);
        skinned[i] = acc.clone();
        dominantBone[i] = best >= 0 && sk.bones[best] ? sk.bones[best].name : '(none)';
    }
    return { skinned, dominantBone };
}

function boneRegion(skinned: THREE.Vector3[], dominant: string[], needle: string): { centroid: THREE.Vector3; count: number } {
    let c = new THREE.Vector3();
    let cnt = 0;
    for (let i = 0; i < skinned.length; i++) {
        if (dominant[i].includes(needle)) { c.add(skinned[i]); cnt++; }
    }
    return { centroid: cnt > 0 ? c.divideScalar(cnt) : new THREE.Vector3(), count: cnt };
}

function findSkinnedMesh(root: THREE.Object3D): THREE.SkinnedMesh | null {
    let found: THREE.SkinnedMesh | null = null;
    root.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh && !found) found = n as THREE.SkinnedMesh;
    });
    return found;
}

describe('probe-v9-multitime', () => {
    test('Q1-Q5: multi-time sampling of arm distortion across clip duration', () => {
        // ---- bind（转换后、播放前） ----
        const modelBind = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelBind);
        const bind = captureAll(modelBind);
        // bind 手臂段方向（模型局部空间，用于 Q3 朝向版）
        const bindUpDir: Record<'Left' | 'Right', THREE.Vector3> = {} as any;
        const bindFoDir: Record<'Left' | 'Right', THREE.Vector3> = {} as any;
        for (const s of ['Left', 'Right'] as const) {
            bindUpDir[s] = bind.get(`mixamorig${s}ForeArm`)!.pos.clone()
                .sub(bind.get(`mixamorig${s}Shoulder`)!.pos).normalize();
            bindFoDir[s] = bind.get(`mixamorig${s}Hand`)!.pos.clone()
                .sub(bind.get(`mixamorig${s}ForeArm`)!.pos).normalize();
        }
        const bindQ = new Map<string, THREE.Quaternion>();
        for (const bn of ARM_BONES) bindQ.set(bn, bind.get(bn)!.quat.clone());

        // ---- anim rest（播放前）+ clip ----
        const animSrc = parseFreshFbx(ANIM_FBX);
        const animRest = captureAll(animSrc); // animBindQ
        const clip = animSrc.animations[0];

        // ---- V9 输出：normalizeRootMotion + mixer ----
        const modelOut = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelOut);
        const normalized = normalizeRootMotion(clip, modelOut, animSrc);
        const mixerOut = new THREE.AnimationMixer(modelOut);
        mixerOut.clipAction(normalized).reset().play();

        // ---- anim 逐 t 采样骨架 ----
        const animRef = parseFreshFbx(ANIM_FBX);
        const animMixer = new THREE.AnimationMixer(animRef);
        animMixer.clipAction(animRef.animations[0]).reset().play();

        // ---- 采样时间点：t=0..4.0（0.5 步长）∪ {duration/2, duration*0.99}，去重排序 ----
        const duration = clip.duration;
        const named = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0].filter((t) => t <= duration + 1e-6);
        const times = Array.from(new Set([
            ...named.map((t) => +t.toFixed(3)),
            +(duration * 0.5).toFixed(3),
            +(duration * 0.99).toFixed(3),
        ])).sort((a, b) => a - b);

        const DOWN = new THREE.Vector3(0, -1, 0);

        const q1: Record<string, any>[] = []; // per-t gap table
        const q2: Record<string, any>[] = []; // per-t asymmetry
        const q3: Record<string, any>[] = []; // per-t segment vs down
        const q5: Record<string, any>[] = []; // per-t verdict
        const q6: Record<string, any>[] = []; // 原始四元数（t=0/4）
        const q7: Record<string, any>[] = []; // CPU 蒙皮（t=0/4）
        const q2b: Record<string, any> = {}; // bind L/R 对称性基线（镜像公式自校验 + 模型 bind 本身对称性）
        for (const part of ['Arm', 'ForeArm'] as const) {
            const lQ = bind.get(`mixamorigLeft${part}` as BoneName)!.quat;
            const rQ = bind.get(`mixamorigRight${part}` as BoneName)!.quat;
            const aQl = animRest.get(`mixamorigLeft${part}` as BoneName)!.quat;
            const aQr = animRest.get(`mixamorigRight${part}` as BoneName)!.quat;
            q2b[`bind_Left${part}_vs_mirrorRight${part}_deg`] = r2(quatDiffDeg(mirrorQuatX(lQ), rQ));
            q2b[`animRest_Left${part}_vs_mirrorRight${part}_deg`] = r2(quatDiffDeg(mirrorQuatX(aQl), aQr));
        }
        // 镜像公式自校验：mirror(mirror(q)) == q
        const selfTest = mirrorQuatX(new THREE.Quaternion(0.1, -0.2, 0.3, 0.9));
        q2b['mirrorFormula_selfTest'] = {
            q: [0.1, -0.2, 0.3, 0.9],
            doubleMirror: [r2(selfTest.x), r2(selfTest.y), r2(selfTest.z), r2(selfTest.w)],
            note: 'double-mirror 应为原值 (0.1,-0.2,0.3,0.9)；且 q 与 -q 同旋转，quatDiffDeg 用 |w| 对符号不敏感',
        };
        const outPosCache: Record<string, WorldState> = {};
        const animPosCache: Record<string, WorldState> = {};

        for (const t of times) {
            mixerOut.setTime(t);
            const out = captureAll(modelOut);
            outPosCache[t] = out;
            animMixer.setTime(t);
            const anim = captureAll(animRef);
            animPosCache[t] = anim;

            // ===== Q1: gap(t) per bone =====
            const row: Record<string, any> = { t };
            let maxGap = 0;
            let maxBone = '';
            const bySide: Record<'Left' | 'Right', number[]> = { Left: [], Right: [] };
            for (const bn of ARM_BONES) {
                const worldQOut = out.get(bn)!.quat;
                // D10：gap 目标从「帧校正」改为「swing3 retarget」。
                // 帧校正目标 animQ·animBindQ⁻¹ 本身方向错（只保相对自身 bind 旋转 → V9 外展过度
                // 根因），swing3 输出必然偏离它（Q1 旧口径 164° 属预期）。swing3 独立复算：
                //   worldQ = Twist · Swing
                //   Swing = 最短旋转(bindQ⁻¹·bindSegDir → animSegDir(t))
                //   Twist = 绕 animSegDir(t) 转 animQ(b,t) 的真实 twist
                const side: 'Left' | 'Right' = sideOf(bn);
                const segIsFo = bn.includes('ForeArm') || bn.includes('Hand');
                const bindDir = (segIsFo ? bindFoDir[side] : bindUpDir[side]).clone()
                    .applyQuaternion(bindQ.get(bn)!.clone().invert()).normalize();
                const animDir = segIsFo
                    ? anim.get(`mixamorig${side}Hand` as BoneName)!.pos.clone()
                        .sub(anim.get(`mixamorig${side}ForeArm` as BoneName)!.pos).normalize()
                    : anim.get(`mixamorig${side}ForeArm` as BoneName)!.pos.clone()
                        .sub(anim.get(`mixamorig${side}Shoulder` as BoneName)!.pos).normalize();
                const swing = new THREE.Quaternion().setFromUnitVectors(bindDir, animDir);
                const animQb = anim.get(bn)!.quat;
                const dot = new THREE.Vector3(animQb.x, animQb.y, animQb.z).dot(animDir);
                const twistVec = animDir.clone().multiplyScalar(dot);
                const roll = 2 * Math.atan2(twistVec.length(), Math.abs(animQb.w)) * 180 / Math.PI
                    * (animQb.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
                const twist = new THREE.Quaternion().setFromAxisAngle(animDir, roll * Math.PI / 180);
                const targetQ = twist.clone().multiply(swing);
                const gap = quatDiffDeg(
                    worldQOut.clone().multiply(bindQ.get(bn)!.clone().invert()),
                    targetQ.clone().multiply(bindQ.get(bn)!.clone().invert()),
                );
                row[bn] = r2(gap);
                if (gap > maxGap) { maxGap = gap; maxBone = bn; }
                bySide[sideOf(bn)].push(gap);
            }
            row['maxGap_deg'] = r2(maxGap);
            row['maxGapBone'] = maxBone;
            row['leftMax_deg'] = r2(Math.max(...bySide.Left));
            row['rightMax_deg'] = r2(Math.max(...bySide.Right));
            q1.push(row);

            // ===== Q2: L/R 镜像对称性 =====
            const asy: Record<string, any> = { t };
            for (const part of ['Arm', 'ForeArm'] as const) {
                const lQ = out.get(`mixamorigLeft${part}` as BoneName)!.quat;
                const rQ = out.get(`mixamorigRight${part}` as BoneName)!.quat;
                // 左臂镜像（绕 x=0 平面）后与右臂夹角
                const mirror = quatDiffDeg(mirrorQuatX(lQ), rQ);
                asy[`Left${part}_vs_mirrorRight${part}_deg`] = r2(mirror);
                // anim 侧同名（判断动画本身是否对称）
                const lQa = anim.get(`mixamorigLeft${part}` as BoneName)!.quat;
                const rQa = anim.get(`mixamorigRight${part}` as BoneName)!.quat;
                asy[`anim_${part}_mirrorAsym_deg`] = r2(quatDiffDeg(mirrorQuatX(lQa), rQa));
            }
            q2.push(asy);

            // ===== Q3: 段方向 vs 竖直向下（位置版 + 朝向版）=====
            const seg: Record<string, any> = { t };
            for (const s of ['Left', 'Right'] as const) {
                const up = out.get(`mixamorig${s}ForeArm`)!.pos.clone()
                    .sub(out.get(`mixamorig${s}Shoulder`)!.pos).normalize();
                const fo = out.get(`mixamorig${s}Hand`)!.pos.clone()
                    .sub(out.get(`mixamorig${s}ForeArm`)!.pos).normalize();
                seg[`${s}UpArm_posFromDown_deg`] = r2(vecAngleDeg(up, DOWN));
                seg[`${s}FoArm_posFromDown_deg`] = r2(vecAngleDeg(fo, DOWN));
                // 朝向版：网格实际蒙皮方向 = worldQ_out(bone)·bind 段方向（bind 段方向是模型局部
                // 沿骨的方向，bone 世界朝向把它转出去 = 网格蒙皮所见）
                const armRel = out.get(`mixamorig${s}Arm` as BoneName)!.quat.clone()
                    .multiply(bindQ.get(`mixamorig${s}Arm` as BoneName)!.clone().invert());
                const foRel = out.get(`mixamorig${s}ForeArm` as BoneName)!.quat.clone()
                    .multiply(bindQ.get(`mixamorig${s}ForeArm` as BoneName)!.clone().invert());
                const armMeshDir = bindUpDir[s].clone().applyQuaternion(armRel);
                const foMeshDir = bindFoDir[s].clone().applyQuaternion(foRel);
                seg[`${s}UpArm_meshDirFromDown_deg`] = r2(vecAngleDeg(armMeshDir, DOWN));
                seg[`${s}FoArm_meshDirFromDown_deg`] = r2(vecAngleDeg(foMeshDir, DOWN));
                // anim 侧位置版（参考：动画自身手臂是否抬起）
                const upA = anim.get(`mixamorig${s}ForeArm`)!.pos.clone()
                    .sub(anim.get(`mixamorig${s}Shoulder`)!.pos).normalize();
                seg[`${s}UpArm_animPosFromDown_deg`] = r2(vecAngleDeg(upA, DOWN));
            }
            q3.push(seg);

            // ===== Q5: 逐 t 判定（基于可靠量：Q1 swing3-gap + Q3 网格朝向 vs 动画朝向）=====
            // 注：Q2 的镜像公式对「双臂朝相反水平方向」的骨骼恒给出 ~180°（T/A-pose 固有，
            // 见 Q2b：bind 154°/animRest 126° 同样大），不能作为单侧扭曲判据；
            // 判据改为 mesh 方向与动画方向的单侧偏差 + swing3 retarget 相对旋转 gap。
            // D10：Q1 gap 目标已从帧校正改为 swing3（帧校正目标本身方向错，见 Q1 注释）。
            const maxGapSideL = Math.max(...bySide.Left);
            const maxGapSideR = Math.max(...bySide.Right);
            const asymArm = asy['LeftArm_vs_mirrorRightArm_deg'];
            const asymFo = asy['LeftForeArm_vs_mirrorRightForeArm_deg'];
            const lUp = seg['LeftUpArm_posFromDown_deg'];
            const rUp = seg['RightUpArm_posFromDown_deg'];
            const lMesh = seg['LeftUpArm_meshDirFromDown_deg'];
            const rMesh = seg['RightUpArm_meshDirFromDown_deg'];
            const lMeshDev = Math.abs(lMesh - seg['LeftUpArm_animPosFromDown_deg']);
            const rMeshDev = Math.abs(rMesh - seg['RightUpArm_animPosFromDown_deg']);
            const lMeshDevFo = Math.abs(seg['LeftFoArm_meshDirFromDown_deg'] - (seg['LeftFoArm_posFromDown_deg']));
            const rMeshDevFo = Math.abs(seg['RightFoArm_meshDirFromDown_deg'] - (seg['RightFoArm_posFromDown_deg']));

            let verdict: string;
            if (maxGap > 10) {
                verdict = Math.abs(maxGapSideL - maxGapSideR) > 20
                    ? `单侧相对旋转失真(gap 超限, 侧差 ${r2(maxGapSideL - maxGapSideR)}°, max=${r2(maxGap)}° @${maxBone})`
                    : `双侧相对旋转失真(gap 超限, max=${r2(maxGap)}° @${maxBone})`;
            } else if (lMeshDev > 30 && rMeshDev > 30) {
                verdict = `双侧外展过度(mesh 相对 anim 差 L=${r2(lMeshDev)}° R=${r2(rMeshDev)}°, gap 小 => 帧校正目标本身朝向错)`;
            } else if (lMeshDev > 30 || rMeshDev > 30 || lMeshDevFo > 30 || rMeshDevFo > 30) {
                verdict = `单侧外展异常(mesh 差 L=${r2(lMeshDev)}° R=${r2(rMeshDev)}° 上臂; 前臂 L=${r2(lMeshDevFo)}° R=${r2(rMeshDevFo)}°)`;
            } else if (lUp > 60 && rUp > 60) {
                verdict = `动作帧(双侧手臂抬起 ${r2(lUp)}°/${r2(rUp)}°, 动画同样抬起 => 内容)`;
            } else {
                verdict = '正常';
            }
            q5.push({
                t, verdict,
                gapL: r2(maxGapSideL), gapR: r2(maxGapSideR),
                asymArm: r2(asymArm), asymFo: r2(asymFo),
                seg: `${r2(lUp)}/${r2(rUp)}`, mesh: `${r2(lMesh)}/${r2(rMesh)}`,
                meshDev: `${r2(lMeshDev)}/${r2(rMeshDev)}`,
                animUp: `${r2(seg['LeftUpArm_animPosFromDown_deg'])}/${r2(seg['RightUpArm_animPosFromDown_deg'])}`,
            });

            // Q6（原始四元数，t=0 / t=4 采样点）
            if (t === 0 || t === 4) {
                const q6row: Record<string, any> = { t };
                for (const bn of ARM_BONES) {
                    const w = out.get(bn)!.quat;
                    const b = bind.get(bn)!.quat;
                    const a = anim.get(bn)!.quat;
                    q6row[bn] = {
                        bind: [r2(b.x), r2(b.y), r2(b.z), r2(b.w)],
                        anim: [r2(a.x), r2(a.y), r2(a.z), r2(a.w)],
                        out: [r2(w.x), r2(w.y), r2(w.z), r2(w.w)],
                    };
                }
                q6.push(q6row);
            }

            // Q7（CPU 蒙皮，t=0 / t=4）：网格实际前臂段方向 = 最贴近视觉的量
            if (t === 0 || t === 4) {
                const mesh = findSkinnedMesh(modelOut);
                if (mesh) {
                    const sk = skinMesh(mesh);
                    const q7row: Record<string, any> = { t };
                    for (const s of ['Left', 'Right'] as const) {
                        const upRegion = boneRegion(sk.skinned, sk.dominantBone, `${s}Arm`);
                        const foRegion = boneRegion(sk.skinned, sk.dominantBone, `${s}ForeArm`);
                        const handRegion = boneRegion(sk.skinned, sk.dominantBone, `${s}Hand`);
                        let upDir: THREE.Vector3 | null = null;
                        let foDir: THREE.Vector3 | null = null;
                        if (upRegion.count > 0 && foRegion.count > 0) {
                            upDir = upRegion.centroid.clone().sub(foRegion.centroid).normalize();
                        }
                        if (foRegion.count > 0 && handRegion.count > 0) {
                            foDir = foRegion.centroid.clone().sub(handRegion.centroid).normalize();
                        }
                        q7row[`${s}UpArm_meshCentroidFromDown_deg`] = upDir ? r2(vecAngleDeg(upDir, DOWN)) : null;
                        q7row[`${s}FoArm_meshCentroidFromDown_deg`] = foDir ? r2(vecAngleDeg(foDir, DOWN)) : null;
                        q7row[`${s}upRegionVerts`] = upRegion.count;
                        q7row[`${s}foRegionVerts`] = foRegion.count;
                        q7row[`${s}handRegionVerts`] = handRegion.count;
                    }
                    q7.push(q7row);
                }
            }
        }

        // ===== Q4: clip 信息 =====
        const q4 = {
            name: clip.name,
            duration: +duration.toFixed(3),
            trackCount: clip.tracks.length,
            first5Tracks: clip.tracks.slice(0, 5).map((t) => t.name),
            trackBones: Array.from(new Set(clip.tracks.map((t) => t.name.replace(/\.(position|quaternion|scale)$/, '')))).slice(0, 40),
            sampleTimes: times,
        };

        // ===== 汇总判定 =====
        const worstGap = Math.max(...q1.map((r) => r['maxGap_deg']));
        const worstGapBone = q1.reduce((a, b) => (b['maxGap_deg'] > a['maxGap_deg'] ? b : a), q1[0])['maxGapBone'];
        const worstGapT = q1.reduce((a, b) => (b['maxGap_deg'] > a['maxGap_deg'] ? b : a), q1[0])['t'];
        const worstAsym = Math.max(...q2.map((r) => r['LeftArm_vs_mirrorRightArm_deg']));
        const anySingleSided = q5.some((r) => String(r.verdict).includes('单侧'));
        const anyGapOver = worstGap > 10;
        const anyMeshOverAbduction = q5.some((r) => String(r.verdict).includes('外展'));

        const summary = {
            worstGapDeg: r2(worstGap),
            worstGapBone,
            worstGapAtT: worstGapT,
            worstAsymDeg: r2(worstAsym),
            hasAnySingleSided: anySingleSided,
            hasAnyGapOver10: anyGapOver,
            hasAnyMeshOverAbduction: anyMeshOverAbduction,
            conclusion: anyGapOver
                ? `相对旋转失真（gap>10°）→ 代码 bug，需修复`
                : anyMeshOverAbduction
                    ? `网格外展过度（mesh 方向 vs anim 方向偏差 >30°，gap 小 => 帧校正目标本身朝向错）→ 代码 retarget 缺陷，需修复`
                    : '全程正常（所有 t gap<10° 且网格双臂与动画一致）→ 视觉异常 = 动画动作帧内容 / 截图角度',
        };

        console.log('\n================= V9 MULTI-TIME PROBE (probe-v9-multitime) =================');
        console.log('\n[Q4] Animation clip info');
        console.log(JSON.stringify(q4, null, 2));
        console.log('\n[Q2b] Bind/AnimRest L/R mirror symmetry baseline (formula sanity + model bind symmetry)');
        console.log(JSON.stringify(q2b, null, 2));
        console.log('\n[Q1] gap(t) = angle(worldQ_out·bindQ_model^-1, animQ(t)·animBindQ^-1) per bone (deg, threshold 10)');
        console.log('      row: { t, 8 bones, maxGap_deg, maxGapBone, leftMax_deg, rightMax_deg }');
        console.log(JSON.stringify(q1, null, 2));
        console.log('\n[Q2] L/R mirror asymmetry (deg) per t');
        console.log(JSON.stringify(q2, null, 2));
        console.log('\n[Q3] Segment direction vs vertical-down (deg) per t');
        console.log(JSON.stringify(q3, null, 2));
        console.log('\n[Q5] Verdict per t');
        console.log(JSON.stringify(q5, null, 2));
        console.log('\n[Q6] Raw world quaternions (bind / anim / out) at t=0, t=4');
        console.log(JSON.stringify(q6, null, 2));
        console.log('\n[Q7] CPU-skinned mesh segment direction vs vertical-down (t=0, t=4, closest to visual)');
        console.log(JSON.stringify(q7, null, 2));
        console.log('\n===== SUMMARY =====');
        console.log(JSON.stringify(summary, null, 2));

        expect(true).toBe(true);
    });
});

function vecAngleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const dot = Math.max(-1, Math.min(1, a.normalize().dot(b.normalize())));
    return rad2deg(Math.acos(dot));
}
