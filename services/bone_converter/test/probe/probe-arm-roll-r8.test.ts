/**
 * 第八轮根因探针：左臂滚动来源对比（bind vs anim vs V7 输出）
 *
 * 目的：验证「循环论证」怀疑 —— S13 的「理想帧」定义 = align·bindQ 与 V7 实现公式
 * （worldQ = R(t)·bindWorldQ，R(t)=setFromUnitVectors(bindDir, curDir)）是同一个，
 * 因此 S13 全绿只能证明「输出 = 实现公式」，不能证明「滚动对齐了 anim 的滚动」。
 * V7 保留的是 bind 帧的滚动（绕手臂轴），如果 bind 滚动 ≠ anim 滚动（Mixamo Idle
 * 掌心朝大腿外侧），播放后手臂下垂但滚动仍错 → 视觉扭曲（左前臂内旋/掌心朝后）。
 *
 * 量化对比 5 个状态的手臂链（Shoulder/Arm/ForeArm/Hand）绕段轴滚动角：
 *   bind        模型转换后未播放（V7 保留的滚动来源）
 *   anim_t0     Mixamo Idle 原始骨架 t=0
 *   anim_t2s    Mixamo Idle 原始骨架 t=2s
 *   v7_output_t0  normalizeRootMotion + mixer 播放 t=0
 *   v7_output_t2s  normalizeRootMotion + mixer 播放 t=2s
 *
 * 滚动角计算（对骨骼世界四元数 q 与段方向 d）：
 *   1. 取 r ⊥ d（up×(0,1,0) 叉积 d 规范化，平行时回退 X 轴）
 *   2. alignQ = setFromUnitVectors(d, r)
 *   3. q_r = alignQ · q（段方向转到参考系）
 *   4. 取 v ⊥ r，w = r×v；v' = q_r 作用 v；滚动角 = atan2(v'·w, v'·v)
 *
 * 若 v7 输出滚动 ≈ bind 滚动（而非 anim 滚动）→ 循环论证实锤 + bind 滚动错误。
 *
 * 运行：cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" \
 *       --testPathPattern "probe-arm-roll-r8" --forceExit
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
type Side = 'Left' | 'Right';
type BoneSeg = 'Shoulder' | 'Arm' | 'ForeArm' | 'Hand';

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** 采集所有手臂骨的世界位置/四元数 */
function captureArmWorld(root: THREE.Object3D): Map<BoneName, { pos: THREE.Vector3; quat: THREE.Quaternion }> {
    root.updateMatrixWorld(true);
    const out = new Map<BoneName, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone && ARM_BONES.includes(n.name as BoneName)) {
            out.set(n.name as BoneName, {
                pos: n.getWorldPosition(new THREE.Vector3()),
                quat: n.getWorldQuaternion(new THREE.Quaternion()),
            });
        }
    });
    return out;
}

function sideOf(bn: BoneName): Side { return bn.startsWith('mixamorigLeft') ? 'Left' : 'Right'; }
function segOf(bn: BoneName): BoneSeg {
    if (bn.includes('Shoulder')) return 'Shoulder';
    if (bn.includes('Arm') && !bn.includes('ForeArm')) return 'Arm';
    if (bn.includes('ForeArm')) return 'ForeArm';
    return 'Hand';
}

/** 段方向：Shoulder/Arm 用 Shoulder→ForeArm，ForeArm/Hand 用 ForeArm→Hand */
function segDir(w: Map<BoneName, { pos: THREE.Vector3 }>, bn: BoneName): THREE.Vector3 {
    const s = sideOf(bn);
    const isFore = bn.includes('ForeArm') || bn.includes('Hand');
    if (isFore) {
        const f = w.get(`mixamorig${s}ForeArm` as BoneName)!.pos;
        const h = w.get(`mixamorig${s}Hand` as BoneName)!.pos;
        return h.clone().sub(f).normalize();
    }
    const sh = w.get(`mixamorig${s}Shoulder` as BoneName)!.pos;
    const fo = w.get(`mixamorig${s}ForeArm` as BoneName)!.pos;
    return fo.clone().sub(sh).normalize();
}

/** 滚动角：骨骼世界四元数 q 绕段方向 d 的旋转分量（度），相对「段方向对齐零滚动基准」 */
function rollAroundSeg(q: THREE.Quaternion, d: THREE.Vector3): { rollDeg: number; qr: THREE.Quaternion; eulDeg: [number, number, number] } {
    const dn = d.clone().normalize();
    // 1. r ⊥ dn
    let r = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), dn);
    if (r.lengthSq() < 1e-8) r = new THREE.Vector3().crossVectors(new THREE.Vector3(1, 0, 0), dn);
    r.normalize();
    // 2. alignQ: dn → r
    const alignQ = new THREE.Quaternion().setFromUnitVectors(dn, r.clone());
    // 3. q_r = alignQ · q
    const qr = alignQ.clone().multiply(q.clone());
    // 4. 取 v ⊥ r, w = r×v
    let v = new THREE.Vector3().crossVectors(r, new THREE.Vector3(0, 1, 0));
    if (v.lengthSq() < 1e-8) v = new THREE.Vector3().crossVectors(r, new THREE.Vector3(1, 0, 0));
    v.normalize();
    const wAxis = new THREE.Vector3().crossVectors(r, v).normalize();
    const v1 = v.clone().applyQuaternion(qr);
    const rollDeg = Math.atan2(v1.dot(wAxis), v1.dot(v)) * 180 / Math.PI;
    const e = new THREE.Euler().setFromQuaternion(qr, 'XYZ');
    return { rollDeg, qr, eulDeg: [e.x * 180 / Math.PI, e.y * 180 / Math.PI, e.z * 180 / Math.PI] };
}

interface BoneReport {
    quat: [number, number, number, number];
    eulDeg: [number, number, number];
    segDir: [number, number, number];
    rollDeg: number;
    /** q_r 欧拉（段方向对齐后） */
    qrEulDeg: [number, number, number];
    /** swing-twist 分解的 twist 角（绕段轴滚动，度） */
    twistDeg: number;
}

/**
 * swing-twist 分解：返回世界四元数 q 绕世界轴 axis 的 twist（滚动）角（度）。
 * 将世界轴转到 q 的局部系，投影 q 的虚部到局部轴，归一化得 twist 四元数。
 */
function twistAngle(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const a = axis.clone().normalize();
    const aLocal = a.clone().applyQuaternion(q.clone().invert());
    const p = new THREE.Vector3(q.x, q.y, q.z);
    const dot = p.dot(aLocal);
    const tw = new THREE.Quaternion(q.w, aLocal.x * dot, aLocal.y * dot, aLocal.z * dot);
    tw.normalize();
    return 2 * Math.atan2(Math.sqrt(tw.x * tw.x + tw.y * tw.y + tw.z * tw.z), tw.w) * 180 / Math.PI;
}

/** A 相对 B 绕段轴（用 A 的段方向）的滚动差（度，取 [0,180]） */
function rollDiffAbout(segDirA: THREE.Vector3, qA: THREE.Quaternion, qB: THREE.Quaternion): number {
    const rel = qA.clone().multiply(qB.clone().invert());
    const d = twistAngle(rel, segDirA);
    return Math.min(d, 360 - d);
}

interface StateReport {
    Left: Record<BoneSeg, BoneReport>;
    Right: Record<BoneSeg, BoneReport>;
}

function buildState(w: Map<BoneName, { pos: THREE.Vector3; quat: THREE.Quaternion }>): StateReport {
    const out: StateReport = { Left: {} as any, Right: {} as any };
    for (const bn of ARM_BONES) {
        const e = w.get(bn);
        if (!e) continue;
        const side = sideOf(bn);
        const seg = segOf(bn);
        const d = segDir(w, bn);
        const { rollDeg, eulDeg } = rollAroundSeg(e.quat, d);
        out[side][seg] = {
            quat: [e.quat.x, e.quat.y, e.quat.z, e.quat.w],
            eulDeg: (() => { const x = new THREE.Euler().setFromQuaternion(e.quat, 'XYZ'); return [x.x * 180 / Math.PI, x.y * 180 / Math.PI, x.z * 180 / Math.PI]; })(),
            segDir: [d.x, d.y, d.z],
            rollDeg,
            qrEulDeg: eulDeg,
            twistDeg: twistAngle(e.quat, d),
        };
    }
    return out;
}

/** 掌心朝向量候选：前臂骨 local 轴在世界的朝向 × 前臂段方向。同时输出 Hand 骨世界 local 轴。 */
function palmInfo(w: Map<BoneName, { pos: THREE.Vector3; quat: THREE.Quaternion }>, side: Side): Record<string, any> {
    const f = w.get(`mixamorig${side}ForeArm` as BoneName);
    const h = w.get(`mixamorig${side}Hand` as BoneName);
    if (!f || !h) return { missing: true };
    const foreDir = h.pos.clone().sub(f.pos).normalize();
    const local = (q: THREE.Quaternion, ax: [number, number, number]) => {
        const v = new THREE.Vector3(ax[0], ax[1], ax[2]).applyQuaternion(q);
        return [v.x.toFixed(3), v.y.toFixed(3), v.z.toFixed(3)];
    };
    const cross = (q: THREE.Quaternion, ax: [number, number, number]) => {
        const v = new THREE.Vector3(ax[0], ax[1], ax[2]).applyQuaternion(q);
        const c = new THREE.Vector3().crossVectors(v, foreDir).normalize();
        return [c.x.toFixed(3), c.y.toFixed(3), c.z.toFixed(3)];
    };
    return {
        foreDir: [foreDir.x.toFixed(3), foreDir.y.toFixed(3), foreDir.z.toFixed(3)],
        foreArmLocalXYZ_world: [local(f.quat, [1, 0, 0]), local(f.quat, [0, 1, 0]), local(f.quat, [0, 0, 1])],
        handLocalXYZ_world: [local(h.quat, [1, 0, 0]), local(h.quat, [0, 1, 0]), local(h.quat, [0, 0, 1])],
        palmCandidates: {
            localX_cross_foreDir: cross(f.quat, [1, 0, 0]),
            localY_cross_foreDir: cross(f.quat, [0, 1, 0]),
            localZ_cross_foreDir: cross(f.quat, [0, 0, 1]),
        },
    };
}

describe('probe-arm-roll-r8', () => {
    test('bind vs anim vs V7 输出滚动角对比', () => {
        // ── bind：模型转换后未播放 ──
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const bindWorld = captureArmWorld(model);
        const bind = buildState(bindWorld);

        // ── anim：Mixamo Idle 原始骨架 t=0 / t=2s ──
        const animObj = parseFreshFbx(ANIM_FBX);
        const clip = animObj.animations[0];
        const animMixer = new THREE.AnimationMixer(animObj);
        const aAct = animMixer.clipAction(clip);
        aAct.reset(); aAct.play();
        animMixer.setTime(0);
        const animT0World = captureArmWorld(animObj);
        const anim_t0 = buildState(animT0World);
        const t2 = Math.min(2, clip.duration);
        animMixer.setTime(t2);
        const animT2World = captureArmWorld(animObj);
        const anim_t2s = buildState(animT2World);

        // ── v7 输出：normalizeRootMotion + mixer 播放 ──
        const modelV7 = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelV7);
        const animObjV7 = parseFreshFbx(ANIM_FBX);
        const clipV7 = animObjV7.animations[0];
        const normalizedClip = normalizeRootMotion(clipV7, modelV7, animObjV7);
        const mixer = new THREE.AnimationMixer(modelV7);
        const action = mixer.clipAction(normalizedClip);
        action.reset(); action.play();
        mixer.setTime(0);
        const v7T0World = captureArmWorld(modelV7);
        const v7_output_t0 = buildState(v7T0World);
        mixer.setTime(t2);
        const v7T2World = captureArmWorld(modelV7);
        const v7_output_t2s = buildState(v7T2World);

        // ── 对比表：每根骨头的 rollDeg ──
        const rollCompare: Record<string, Record<string, number>> = {};
        for (const bn of ARM_BONES) {
            const s = sideOf(bn);
            const seg = segOf(bn);
            rollCompare[bn] = {
                bind: bind[s][seg].rollDeg,
                anim_t0: anim_t0[s][seg].rollDeg,
                anim_t2s: anim_t2s[s][seg].rollDeg,
                v7_t0: v7_output_t0[s][seg].rollDeg,
                v7_t2s: v7_output_t2s[s][seg].rollDeg,
            };
        }

        // ── 结论判定：swing-twist 滚动差（v7 相对 bind / anim），排除 pitch/yaw ──
        const summary: Record<string, any> = {};
        let closerBind = 0;
        let closerAnim = 0;
        for (const bn of ARM_BONES) {
            const d = segDir(v7T0World, bn);
            const qV7 = v7T0World.get(bn)!.quat;
            const qBind = bindWorld.get(bn)!.quat;
            const qAnim = animT0World.get(bn)!.quat;
            const dBind = rollDiffAbout(d, qV7, qBind);
            const dAnim = rollDiffAbout(d, qV7, qAnim);
            const isBind = dBind < dAnim;
            if (isBind) closerBind += 1; else closerAnim += 1;
            summary[bn] = {
                'v7-vs-bind(roll°)': +dBind.toFixed(2),
                'v7-vs-anim(roll°)': +dAnim.toFixed(2),
                'v7更接近': isBind ? 'bind(循环论证)' : 'anim',
            };
        }
        const conclusion = closerBind >= closerAnim
            ? `循环论证实锤：${closerBind}/${ARM_BONES.length} 根手臂骨 V7 输出滚动更接近 bind 帧（非 anim）——V7 保留的是 bind 帧滚动`
            : `怀疑不成立：${closerAnim}/${ARM_BONES.length} 根手臂骨 V7 输出滚动更接近 anim 帧`;

        const palm = {
            bind: { Left: palmInfo(bindWorld, 'Left'), Right: palmInfo(bindWorld, 'Right') },
            anim_t0: { Left: palmInfo(animT0World, 'Left'), Right: palmInfo(animT0World, 'Right') },
            v7_t0: { Left: palmInfo(v7T0World, 'Left'), Right: palmInfo(v7T0World, 'Right') },
        };

        console.log('\n===== 探针输出（probe-arm-roll-r8）=====');
        console.log(JSON.stringify({
            clip: { name: clip.name, duration: clip.duration, t2s: t2 },
            bind,
            anim_t0,
            anim_t2s,
            v7_output_t0,
            v7_output_t2s,
            rollCompare,
            rollDiff: summary,
            结论: conclusion,
            掌心朝向: palm,
        }, null, 2));

        expect(true).toBe(true);
    });
});
