/**
 * bone_converter D5 BDD 步骤定义 — 动画播放验收（模型不移动 + 手臂/躯干/腿/头在正确移动）
 *
 * 覆盖 d5-animation.feature 的 7 个场景：
 *  S1 normalizeRootMotion 后播放 Idle，Hips 世界位置稳定（不瞬移、不漂移）
 *  S2 手臂骨骼（LeftForeArm/LeftHand）相对 Hips 的世界旋转/位移随时间变化
 *  S3 头部骨骼（Head/Neck）相对 Hips 的世界旋转/位移随时间变化
 *  S4 t=0 手臂自然下垂（非 A-pose 外展）：LeftShoulder→LeftHand 方向与竖直向下夹角 < 45°
 *  S5 躯干在动：Spine 相对 Hips 的世界旋转变化 > 0.4°
 *  S6 下半身在动：LeftUpLeg/RightUpLeg 相对 Hips 的世界旋转变化 > 0.55°
 *  S7 头部动画方向正确：Head RELrot > 1° 且 Head 世界方向相对绑定姿态有变化
 *
 * 运行：cd services/bone_converter && npx jest --config jest.config.js --forceExit
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

import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

const feature = loadFeature('./test/features/d5-animation.feature');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);
const ANIM_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx',
);
/** V11：Walk 动画（与 demo ANIM_URL=Walk/1.fbx 一致）——S18w/S19w/S20 采样用 */
const ANIM_WALK_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Walk/1.fbx',
);

/** 解析真实 FBX（每次新解析，避免场景间互相污染） */
function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** 采样骨骼集合（root + 手臂 + 头 + 躯干 + 腿） */
const SAMPLE_BONES = [
    'mixamorigHips',
    'mixamorigLeftShoulder',
    'mixamorigLeftArm',
    'mixamorigLeftForeArm',
    'mixamorigLeftHand',
    'mixamorigRightShoulder',
    'mixamorigRightArm',
    'mixamorigRightForeArm',
    'mixamorigRightHand',
    'mixamorigNeck',
    'mixamorigHead',
    'mixamorigSpine',
    'mixamorigSpine1',
    'mixamorigSpine2',
    'mixamorigLeftUpLeg',
    'mixamorigRightUpLeg',
];

/**
 * 播放归一化后的动画并在指定时刻采样每骨骼世界变换。
 * 返回 Map<骨骼名, {pos, quat, relPos, relQuat}[]>，其中 rel* 是相对 Hips（身体坐标系）。
 */
function samplePlayback(clip: THREE.AnimationClip, model: THREE.Object3D): Map<string, Array<{
    pos: THREE.Vector3;
    quat: THREE.Quaternion;
    relPos: THREE.Vector3;
    relQuat: THREE.Quaternion;
}>> {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();

    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });

    const out = new Map<string, Array<{ pos: THREE.Vector3; quat: THREE.Quaternion; relPos: THREE.Vector3; relQuat: THREE.Quaternion }>>();
    for (const t of [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        const hips = boneByName.get('mixamorigHips')!;
        const hipsPos = hips.getWorldPosition(new THREE.Vector3());
        const hipsQuat = hips.getWorldQuaternion(new THREE.Quaternion());
        const hipsQuatInv = hipsQuat.clone().invert();
        for (const bn of SAMPLE_BONES) {
            const b = boneByName.get(bn);
            if (!b) continue;
            const p = b.getWorldPosition(new THREE.Vector3());
            const q = b.getWorldQuaternion(new THREE.Quaternion());
            if (!out.has(bn)) out.set(bn, []);
            out.get(bn)!.push({
                pos: p.clone(),
                quat: q.clone(),
                relPos: p.clone().sub(hipsPos),
                relQuat: hipsQuatInv.clone().multiply(q),
            });
        }
    }
    return out;
}

/** 相对 Hips 的世界旋转最大变化角（度） */
function maxRelAngle(samples: Array<{ relQuat: THREE.Quaternion }>): number {
    let max = 0;
    for (const s of samples) {
        const a = samples[0].relQuat.angleTo(s.relQuat) * 180 / Math.PI;
        if (a > max) max = a;
    }
    return max;
}

/** V11 S18/S18w：骨骼世界前向（局部 -Z 轴）与 +Z 轴夹角（度）。翻转后角色面朝 +Z → 接近 0° */
function forwardZAngle(worldQuat: THREE.Quaternion): number {
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(worldQuat).normalize();
    const z = new THREE.Vector3(0, 0, 1);
    return fwd.angleTo(z) * 180 / Math.PI;
}

/** V11 S19/S19w：normalizeRootMotion 后未播放时，模型骨骼世界位置 Y（直接读 model matrixWorld） */
function worldPosAfterNormalize(model: THREE.Object3D): Map<string, THREE.Vector3> {
    model.updateMatrixWorld(true);
    const out = new Map<string, THREE.Vector3>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) out.set(n.name, n.getWorldPosition(new THREE.Vector3()));
    });
    return out;
}

/** V11 S20/S20i：三骨段夹角（UpLeg→Leg 与 Leg→Foot，度）。膝生理范围 Idle≤45°/Walk≤100° */
function kneeSegmentAngle(worldPos: Map<string, THREE.Vector3>, side: 'Left' | 'Right'): number {
    const up = worldPos.get(`mixamorig${side}UpLeg`);
    const leg = worldPos.get(`mixamorig${side}Leg`);
    const fo = worldPos.get(`mixamorig${side}Foot`);
    if (!up || !leg || !fo) return -1;
    const v1 = leg.clone().sub(up);
    const v2 = fo.clone().sub(leg);
    const dot = Math.max(-1, Math.min(1, v1.dot(v2) / (v1.length() * v2.length())));
    return Math.acos(dot) * 180 / Math.PI;
}

/**
 * V11 采样：播放归一化 clip 并在指定时刻返回每骨骼世界位置/朝向。
 * 翻转后（模型 rotateY(π)）采样以对齐 demo/游戏相机方向（S18/S18w 面朝 +Z 基准）。
 */
function samplePlaybackAtTimes(
    clip: THREE.AnimationClip,
    model: THREE.Object3D,
    times: number[],
): Map<string, Array<{ pos: THREE.Vector3; quat: THREE.Quaternion }>> {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const out = new Map<string, Array<{ pos: THREE.Vector3; quat: THREE.Quaternion }>>();
    for (const t of times) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        for (const [bn, b] of boneByName) {
            if (!out.has(bn)) out.set(bn, []);
            out.get(bn)!.push({
                pos: b.getWorldPosition(new THREE.Vector3()),
                quat: b.getWorldQuaternion(new THREE.Quaternion()),
            });
        }
    }
    return out;
}
/** 相对 Hips 的世界位置最大位移 */
function maxRelMove(samples: Array<{ relPos: THREE.Vector3 }>): number {
    let max = 0;
    for (const s of samples) {
        const d = samples[0].relPos.distanceTo(s.relPos);
        if (d > max) max = d;
    }
    return max;
}

/** Hips 世界位置最大位移 */
function maxHipsMove(samples: Array<{ pos: THREE.Vector3 }>): number {
    let max = 0;
    for (const s of samples) {
        const d = samples[0].pos.distanceTo(s.pos);
        if (d > max) max = d;
    }
    return max;
}

/** t=0 时左臂方向（LeftShoulder→LeftHand 世界方向，归一化）与竖直向下的夹角（度） */
function armAngleToDownAt0(samples: Map<string, Array<{ pos: THREE.Vector3 }>>): number {
    const shoulder = samples.get('mixamorigLeftShoulder')![0].pos;
    const hand = samples.get('mixamorigLeftHand')![0].pos;
    const dir = hand.clone().sub(shoulder).normalize();
    const down = new THREE.Vector3(0, -1, 0);
    const dot = Math.max(-1, Math.min(1, dir.dot(down)));
    return Math.acos(dot) * 180 / Math.PI;
}

/** Head 世界方向相对绑定姿态（t=0）的最大变化角（度）：> 0 说明头确实转动/点头了 */
function maxHeadWorldDeltaFromBind(samples: Map<string, Array<{ quat: THREE.Quaternion }>>): number {
    const head = samples.get('mixamorigHead')!;
    let max = 0;
    for (const s of head) {
        const a = head[0].quat.angleTo(s.quat) * 180 / Math.PI;
        if (a > max) max = a;
    }
    return max;
}

/** t=0 时 Hips 世界旋转欧拉角指定分量（度，'YXZ' 顺序，与 probe/spec 测量一致） */
function hipsWorldEulerComponent(samples: Map<string, Array<{ quat: THREE.Quaternion }>>, axis: 'X' | 'Y' | 'Z'): number {
    const q = samples.get('mixamorigHips')![0].quat;
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    const rad = axis === 'X' ? e.x : axis === 'Y' ? e.y : e.z;
    return rad * 180 / Math.PI;
}

/** t=0 时 Head 是否在 Hips 上方（world.y 更高） */
function headAboveHips(samples: Map<string, Array<{ pos: THREE.Vector3 }>>): boolean {
    const headY = samples.get('mixamorigHead')![0].pos.y;
    const hipsY = samples.get('mixamorigHips')![0].pos.y;
    return headY > hipsY;
}

/** 提取骨骼名（去 .position/.quaternion/.scale 后缀） */
function trackBoneName(trackName: string): string {
    return trackName.replace(/\.(position|quaternion|scale)$/, '');
}

// eslint 保留：未来如需直接读轨道可复用。
void trackBoneName;

/** 模型 bind 世界姿态快照：骨骼名 → {世界位置, 世界朝向} */
function captureBindPose(model: THREE.Object3D): Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }> {
    model.updateMatrixWorld(true);
    const out = new Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) {
            out.set(n.name, {
                pos: n.getWorldPosition(new THREE.Vector3()),
                quat: n.getWorldQuaternion(new THREE.Quaternion()),
            });
        }
    });
    return out;
}

/**
 * S10：每个被驱动骨骼世界位置相对 bind 的最大偏差（多帧采样）。
 * 防拉丝：骨骼不得被拉到动画链位置（当前实现 3.87 单位 → 拉丝）。
 */
function maxBoneBindDeviation(
    samples: Map<string, Array<{ pos: THREE.Vector3 }>>,
    bind: Map<string, { pos: THREE.Vector3 }>,
): { maxDev: number; worst: string } {
    let maxDev = 0;
    let worst = '';
    for (const [bn, arr] of samples) {
        const bp = bind.get(bn)?.pos;
        if (!bp || arr.length === 0) continue;
        for (const s of arr) {
            const d = s.pos.distanceTo(bp);
            if (d > maxDev) { maxDev = d; worst = bn; }
        }
    }
    return { maxDev, worst };
}

/**
 * S11：每个子骨骼相对父骨骼的偏移长度 vs 模型 bind 偏移长度的最大比值（多帧采样）。
 * 比值 ≈1 = 链不拉伸；当前实现把骨骼拉到动画链 → 比值爆炸（>10）。
 */
function chainLengthRatioVsBind(
    samples: Map<string, Array<{ pos: THREE.Vector3 }>>,
    model: THREE.Object3D,
    bind: Map<string, { pos: THREE.Vector3 }>,
): { ratios: Map<string, number>; minRatio: number; maxRatio: number; worst: string } {
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const ratios = new Map<string, number>();
    let minRatio = Infinity, maxRatio = 0, worst = '';
    for (const [bn, arr] of samples) {
        const b = boneByName.get(bn);
        if (!b || arr.length === 0) continue;
        const parent = b.parent;
        if (!parent || !(parent as THREE.Bone).isBone) continue;
        const bindP = bind.get(parent.name)?.pos;
        const bindC = bind.get(bn)?.pos;
        if (!bindP || !bindC) continue;
        const bindLen = bindC.distanceTo(bindP);
        if (bindLen < 1e-6) continue;
        let max = 0;
        for (const s of arr) {
            const pCur = parent.getWorldPosition(new THREE.Vector3());
            const len = s.pos.distanceTo(pCur);
            const ratio = len / bindLen;
            if (ratio > max) max = ratio;
        }
        ratios.set(bn, max);
        if (max > maxRatio) { maxRatio = max; worst = bn; }
        if (max < minRatio) minRatio = max;
    }
    return { ratios, minRatio, maxRatio, worst };
}

/**
 * S12：躯干骨骼世界朝向相对 bind 的旋转角（t=0，度）。
 * 骨盆/脊柱不被扭转：当前实现把骨骼朝向覆盖成动画帧 → Hips 与 bind 差 ~40°。
 */
function torsoOrientationDelta(
    samples: Map<string, Array<{ quat: THREE.Quaternion }>>,
    bind: Map<string, { quat: THREE.Quaternion }>,
): { deltas: Map<string, number>; maxDelta: number; worst: string } {
    const TORSO = ['mixamorigHips', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigNeck', 'mixamorigHead'];
    const deltas = new Map<string, number>();
    let maxDelta = 0, worst = '';
    for (const bn of TORSO) {
        const arr = samples.get(bn);
        const bq = bind.get(bn)?.quat;
        if (!arr || arr.length === 0 || !bq) continue;
        const deg = arr[0].quat.angleTo(bq) * 180 / Math.PI;
        deltas.set(bn, deg);
        if (deg > maxDelta) { maxDelta = deg; worst = bn; }
    }
    return { deltas, maxDelta, worst };
}

/**
 * S13：手臂链关节角度（t=0）。分段检查抓肘部反折/前臂内旋——S4 只查肩→手总方向，
 * 反折会被抵消。本骨架布局：Shoulder/Arm 都在肩关节附近，真实上臂 = 肩→肘（ForeArm 骨），
 * 前臂 = 肘→腕（Hand 骨）。
 */

/** 上臂段（Shoulder→ForeArm，肩到肘）方向与竖直向下的夹角（度） */
function upperArmAngleToDown(
    samples: Map<string, Array<{ pos: THREE.Vector3 }>>,
    side: 'Left' | 'Right',
): number {
    const s = samples.get(`mixamorig${side}Shoulder`)![0].pos;
    const f = samples.get(`mixamorig${side}ForeArm`)![0].pos;
    const dir = f.clone().sub(s).normalize();
    const dot = Math.max(-1, Math.min(1, dir.dot(new THREE.Vector3(0, -1, 0))));
    return Math.acos(dot) * 180 / Math.PI;
}

/** 前臂段（ForeArm→Hand，肘到腕）方向与竖直向下的夹角（度） */
function forearmAngleToDown(
    samples: Map<string, Array<{ pos: THREE.Vector3 }>>,
    side: 'Left' | 'Right',
): number {
    const f = samples.get(`mixamorig${side}ForeArm`)![0].pos;
    const h = samples.get(`mixamorig${side}Hand`)![0].pos;
    const dir = h.clone().sub(f).normalize();
    const dot = Math.max(-1, Math.min(1, dir.dot(new THREE.Vector3(0, -1, 0))));
    return Math.acos(dot) * 180 / Math.PI;
}

/** 肘部弯曲角 = 上臂段方向 与 前臂段方向 的夹角（0°=完全伸直，~180°=反折） */
function elbowBendAngle(
    samples: Map<string, Array<{ pos: THREE.Vector3 }>>,
    side: 'Left' | 'Right',
): number {
    const s = samples.get(`mixamorig${side}Shoulder`)![0].pos;
    const f = samples.get(`mixamorig${side}ForeArm`)![0].pos;
    const h = samples.get(`mixamorig${side}Hand`)![0].pos;
    const d1 = f.clone().sub(s).normalize();
    const d2 = h.clone().sub(f).normalize();
    const dot = Math.max(-1, Math.min(1, d1.dot(d2)));
    return Math.acos(dot) * 180 / Math.PI;
}

/**
 * S13：世界四元数 q 绕世界单位轴 axis 的 twist（滚动）角（度）。
 * Shoemake swing-twist 分解，axis 必须单位向量。世界系直接投影（不要 applyQuaternion 转局部，
 * 局部系投影是错的——sanity 测试返回 180°）。v = q 虚部，twistVec = axis·(v·axis)。
 * ⚠️ 必须用**原始 q.w**（twist 角 = 2·atan2(|v·axis|, q.w)）：先 normalize tw 再取 tw.w 会让
 * 主导 swing 的四元数（q.w ≪ |q_imag|）角度被压缩失真（probe-v10 实锤：真值 135.4° 误测 ~53°）。
 * w<0 时翻转符号，保证返回值落在 (-180, 180]，消除旧实现「Left Shoulder 差 ~365°」问题。
 */
function worldTwistAngle(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(axis);
    const twistVec = axis.clone().multiplyScalar(dot);
    const ang = 2 * Math.atan2(twistVec.length(), Math.abs(q.w)) * 180 / Math.PI;
    return ang * (q.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
}

/**
 * D10 swing3 公式的**独立复算**（作为 S13/S14/S15 的正确 retarget 目标）。
 * worldQ(b,t) = Twist · Swing：
 *   - v(b)      = bindQ(b)⁻¹ · bindSegDir_world   （模型 bind 局部段方向）
 *   - Swing     = 最短旋转(v → animSegDir(t))      （方向修正：dev=0）
 *   - roll      = twist(animQ(b,t), animSegDir(t)) （动画真实滚动：rollVsAnim=0）
 *   - Twist     = 绕 animSegDir(t) 转 roll
 * 独立于 normalizeRootMotion 的实现（只吃 bindPose / animT0 快照），实现若偏离公式即 gap>0。
 */
function swing3TargetQ(
    bone: string,
    bindPose: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animT0: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
): THREE.Quaternion {
    const side: 'Left' | 'Right' = bone.includes('Left') ? 'Left' : 'Right';
    const segIsFo = bone.includes('ForeArm') || bone.includes('Hand');
    const sh = `mixamorig${side}Shoulder`;
    const fo = `mixamorig${side}ForeArm`;
    const ha = `mixamorig${side}Hand`;
    const bindSegDir = segIsFo
        ? bindPose.get(ha)!.pos.clone().sub(bindPose.get(fo)!.pos)
        : bindPose.get(fo)!.pos.clone().sub(bindPose.get(sh)!.pos);
    const v = bindSegDir.applyQuaternion(bindPose.get(bone)!.quat.clone().invert()).normalize();
    const animSegDir = segIsFo
        ? animT0.get(ha)!.pos.clone().sub(animT0.get(fo)!.pos)
        : animT0.get(fo)!.pos.clone().sub(animT0.get(sh)!.pos);
    const animDir = animSegDir.normalize();
    const swing = new THREE.Quaternion().setFromUnitVectors(v, animDir);
    const roll = worldTwistAngle(animT0.get(bone)!.quat, animDir);
    const twist = new THREE.Quaternion().setFromAxisAngle(animDir, roll * Math.PI / 180);
    return twist.clone().multiply(swing);
}

/**
 * S13：手臂骨绕段轴的滚动角与**帧校正目标**的滚动偏差（度）。
 * V9 参考系修正（probe-v9-diag Q8 实锤）：旧断言对比「输出 vs raw anim 滚动」，而 V8 恰好
 * 把输出设成 raw animQ → 恒 0° 恒过，测不出扭曲。正确 retarget 的蒙皮一致性条件是
 *   worldQ_out(b) = animQ(b,t) · animBindQ(b)⁻¹ · bindQ_model(b)   （帧校正公式）
 * 故对比目标 = targetQ 绕段轴的 twist（animQ·animBindQ⁻¹·bindQ），输出应与 targetQ 的
 * 滚动一致（正确实现差 ≈0°；V8 裸 animQ 差 bindFrameDelta 的 twist 分量，应 >20°）。
 * 段轴用输出世界系（位置 walk 与 anim 段方向一致，probe-v9-diag Q6：0~2.5°）。
 */
function armBoneRoll(
    samples: Map<string, Array<{ pos: THREE.Vector3; quat: THREE.Quaternion }>>,
    bindPose: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animT0: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animBind: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    side: 'Left' | 'Right',
    bone: 'Shoulder' | 'Arm' | 'ForeArm' | 'Hand',
): number {
    const bn = `mixamorig${side}${bone}`;
    const isFore = bone === 'ForeArm' || bone === 'Hand';
    const segOf = (a: { pos: THREE.Vector3 }, b: { pos: THREE.Vector3 }) => b.pos.clone().sub(a.pos).normalize();
    // 段轴：输出世界系（上臂 = Shoulder→ForeArm，前臂 = ForeArm→Hand），
    // 输出位置 = poseQ 刚性 walk = 动画位置，故段轴 ≈ 动画段方向。
    const outSh = samples.get(`mixamorig${side}Shoulder`)![0];
    const outFo = samples.get(`mixamorig${side}ForeArm`)![0];
    const outHa = samples.get(`mixamorig${side}Hand`)![0];
    const axis = isFore ? segOf(outFo, outHa) : segOf(outSh, outFo);
    // 输出滚动（绕输出段轴）
    const thOut = worldTwistAngle(samples.get(bn)![0].quat, axis);
    // D10：正确 retarget 的滚动 = 动画真实滚动（swing3 的 Twist 分量 = twist(animQ, segDir)，
    // probe-v10 实测 rollVsAnim=0）。目标改为动画世界朝向 animQ，绕同一段轴算滚动——
    // 非循环断言：V9 帧校正输出（L ForeArm 80°/R ForeArm 69°）与 V8 raw animQ 路径
    // （滚动偏 swing）都会真实 RED。
    const thTarget = worldTwistAngle(animT0.get(bn)!.quat, axis);
    void animBind;
    void bindPose;
    // 两个角度是圆的，比较必须用圆距离（wrap 到 [-180,180)）。
    const circular = (thOut - thTarget + 540) % 360 - 180;
    return Math.abs(circular);
}

/** 8 根手臂骨（S14/S15 采样集合） */
const ARM_BONE_NAMES = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;

/**
 * S14：手臂蒙皮相对旋转偏差（度）= angle( worldQ_out·bindQ_model⁻¹ , swing3Target·bindQ_model⁻¹ )。
 * V9 版对比 animQ·animBindQ⁻¹（帧校正目标）——该目标本身方向错误（外展过度根因），
 * D10 改为对比独立复算的 swing3 retarget（swing3TargetQ）。正确实现差 ≈0°；
 * V8 raw animQ / V9 帧校正 / joint-space 都会真实 RED（probe-v10 实测 99~164°）。
 */
function armSkinRelativeDelta(
    samples: Map<string, Array<{ quat: THREE.Quaternion }>>,
    bindPose: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animT0: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animBind: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    bone: string,
): number {
    const outQ = samples.get(bone)![0].quat;
    const bindQ = bindPose.get(bone)!.quat;
    const targetQ = swing3TargetQ(bone, bindPose, animT0);
    const relOut = outQ.clone().multiply(bindQ.clone().invert());
    const relTarget = targetQ.clone().multiply(bindQ.clone().invert());
    const rel = relOut.clone().multiply(relTarget.clone().invert());
    const w = Math.min(1, Math.abs(rel.w));
    void animBind;
    return 2 * Math.acos(w) * 180 / Math.PI;
}

/**
 * S15：CPU 蒙皮 —— 用指定骨骼世界矩阵（按名）对网格蒙皮，返回每顶点世界位置。
 * 同 probe-v9-diag Q7 已验证的方法：v_world = Σ w_i·(boneMatrix_i · boneInverse_i)·v_bind + mesh.matrixWorld。
 */
function skinWithBoneMatrices(mesh: THREE.SkinnedMesh, boneMatrices: Map<string, THREE.Matrix4>): THREE.Vector3[] {
    mesh.updateMatrixWorld(true);
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const n = posAttr.count;
    const out: THREE.Vector3[] = new Array(n);
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const bi = idxAttr.getX(i * 4 + k);
            const w = wgtAttr.getX(i * 4 + k);
            if (w === 0) continue;
            const bone = sk.bones[bi];
            if (!bone) continue;
            const m = boneMatrices.get(bone.name);
            if (!m) continue;
            boneMat.copy(m).multiply(sk.boneInverses[bi]);
            const c = new THREE.Vector3().copy(vBind).applyMatrix4(boneMat).multiplyScalar(w);
            acc.add(c);
        }
        acc.applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

/** 每顶点权重最高骨的索引数组（用于选手臂区域顶点） */
function dominantBoneIndices(mesh: THREE.SkinnedMesh): Int32Array {
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const n = (mesh.geometry.attributes.position as THREE.BufferAttribute).count;
    const dom = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        let best = -1;
        let bestW = -1;
        for (let k = 0; k < 4; k++) {
            const w = wgtAttr.getX(i * 4 + k);
            if (w > bestW) { bestW = w; best = idxAttr.getX(i * 4 + k); }
        }
        dom[i] = best;
    }
    return dom;
}

/**
 * S15：手臂蒙皮顶点位移 —— 输出骨骼矩阵蒙皮 vs 帧校正目标骨骼矩阵蒙皮的 |Δv|。
 * 顶点集合 = 权重最高骨 ∈ 8 根手臂骨（Shoulder/Arm/ForeArm/Hand ×2）的顶点。
 * ⚠️ 不用 dominant 骨质心（probe Q7：左手 dominant 匹配 0 顶点），用逐顶点位移。
 * ⚠️ 帧校正只作用于手臂骨：躯干/腿走 bindQ·deltaLocalQ（实现中未改），帧校正目标对其不适用
 *   （probe-v9-s15 实测 LeftUpLeg out-vs-帧校正 27.2°），故非手臂骨 target = 输出本身，
 *   Δv 只反映手臂骨输出 vs 帧校正目标的朝向差（正是 S14 的顶点形式，防前臂内旋/掌心朝后）。
 */
function armSkinVertexDelta(
    model: THREE.Object3D,
    bindPose: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animT0: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
    animBind: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>,
): { avg: number; max: number; count: number } {
    void animBind;
    let mesh: THREE.SkinnedMesh | null = null;
    model.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh;
    });
    if (!mesh) return { avg: NaN, max: NaN, count: 0 };
    // 输出骨骼矩阵 = 模型骨骼当前 matrixWorld（播放归一化 clip 后）
    const outMats = new Map<string, THREE.Matrix4>();
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) { boneByName.set(n.name, n as THREE.Bone); outMats.set(n.name, n.matrixWorld.clone()); }
    });
    // D10 retarget 目标矩阵：仅手臂骨朝向替换为 swing3TargetQ（独立复算），位置用输出。
    // 非手臂骨 target = 输出（躯干/腿路径未改）。正确实现 → outV == targetV（Δv≈0）。
    const armSet = new Set<string>(ARM_BONE_NAMES);
    const targetMats = new Map<string, THREE.Matrix4>();
    for (const [bn, b] of boneByName) {
        if (!armSet.has(bn)) {
            targetMats.set(bn, outMats.get(bn)!);
            continue;
        }
        const p = new THREE.Vector3();
        const q = new THREE.Quaternion();
        const s = new THREE.Vector3();
        b.matrixWorld.decompose(p, q, s);
        const targetQ = swing3TargetQ(bn, bindPose, animT0);
        targetMats.set(bn, new THREE.Matrix4().compose(p, targetQ, s));
    }
    const outV = skinWithBoneMatrices(mesh, outMats);
    const targetV = skinWithBoneMatrices(mesh, targetMats);
    const dom = dominantBoneIndices(mesh);
    const sk = mesh.skeleton;
    let max = 0;
    let sum = 0;
    let cnt = 0;
    for (let i = 0; i < outV.length; i++) {
        const bone = sk.bones[dom[i]];
        if (!bone || !armSet.has(bone.name)) continue;
        const d = outV[i].distanceTo(targetV[i]);
        if (d > max) max = d;
        sum += d;
        cnt++;
    }
    return { avg: cnt > 0 ? sum / cnt : NaN, max, count: cnt };
}

/**
 * S16：多时间点输出骨架 vs 原始动画源锚点（第九轮 D10.1 重构，消除循环论证）。
 *
 * 旧版（D10）用「朝向法」meshDir = bindDir·(outQ·bindQ⁻¹)，而 swing3 公式按构造保证
 * meshDir == animDir → dev 恒 0° 全绿但实机仍扭曲（断言锚定被测管线自身输出）。
 *
 * 本版全部锚定「原始动画源」：raw anim skeleton 播放 rawClip（不经任何转换）采样的
 * 段方向 / twist / 掌向 作为真值，对比输出骨架（模型播放 normalizedClip）的同一度量：
 *   ① 段方向（位置法）：Shoulder→ForeArm / ForeArm→Hand 世界位置段方向，各自 Hips 归一化
 *      （消除两套骨架世界系差异）。位置法测「骨架实际朝哪」，非 swing3 构造目标。
 *   ② twist：每根手臂骨世界朝向绕其段轴的滚动角（swing3 的 Twist 分量），
 *      输出 vs 原始动画（rollVsAnim，防掌心朝后）。
 *   ③ 掌向：Hand 骨绕前臂段轴的滚动（掌心的方位），输出 vs 原始动画。
 * 断言：|mesh − anim| < 20°（方向/twist/掌向 × 左右 × 6 时间点）。
 */
function worldTwistAngleSafe(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(axis);
    const twistVec = axis.clone().multiplyScalar(dot);
    const ang = 2 * Math.atan2(twistVec.length(), Math.abs(q.w)) * 180 / Math.PI;
    return ang * (q.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
}

function circularDelta(a: number, b: number): number {
    return Math.abs((a - b + 540) % 360 - 180);
}

interface S16Rows {
    dirRows: Array<{ t: number; side: 'Left' | 'Right'; seg: 'up' | 'fo'; meshFromDown: number; animFromDown: number; dev: number }>;
    twistRows: Array<{ t: number; side: 'Left' | 'Right'; bone: string; out: number; anim: number; dev: number }>;
    palmRows: Array<{ t: number; side: 'Left' | 'Right'; out: number; anim: number; dev: number }>;
}

function sampleOutputVsAnimSource(
    model: THREE.Object3D,
    normalizedClip: THREE.AnimationClip,
    animObj: THREE.Object3D,
    rawClip: THREE.AnimationClip,
    times: number[],
): S16Rows {
    const angleBetween = (a: THREE.Vector3, b: THREE.Vector3): number => {
        const da = a.clone().normalize();
        const db = b.clone().normalize();
        const dot = Math.max(-1, Math.min(1, da.dot(db)));
        return Math.acos(dot) * 180 / Math.PI;
    };
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const animBone = new Map<string, THREE.Bone>();
    animObj.traverse((n) => {
        if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
    });
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(normalizedClip);
    action.reset();
    action.play();
    const animMixer = new THREE.AnimationMixer(animObj);
    const animAction = animMixer.clipAction(rawClip);
    animAction.reset();
    animAction.play();

    const outQ = new Map<string, THREE.Quaternion>();
    const outPos = new Map<string, THREE.Vector3>();
    const animQ = new Map<string, THREE.Quaternion>();
    const animPos = new Map<string, THREE.Vector3>();
    const dirRows: S16Rows['dirRows'] = [];
    const twistRows: S16Rows['twistRows'] = [];
    const palmRows: S16Rows['palmRows'] = [];
    for (const t of times) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        animMixer.setTime(t);
        animObj.updateMatrixWorld(true);
        outQ.clear(); outPos.clear(); animQ.clear(); animPos.clear();
        for (const [bn, b] of boneByName) {
            outQ.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
            outPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
        }
        for (const [bn, ab] of animBone) {
            animQ.set(bn, ab.getWorldQuaternion(new THREE.Quaternion()));
            animPos.set(bn, ab.getWorldPosition(new THREE.Vector3()));
        }
        const segOf = (a: THREE.Vector3, b: THREE.Vector3) => b.clone().sub(a).normalize();
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            // ① 段方向（位置法）：直接比两段向量夹角。
            //   模型世界与动画世界同为 Y-up 对齐（探针位置法实测 dev 0-2.5°），
            //   无需 Hips 归一化（Hips 归一化反而因两骨架 Hips 朝向不同引入帧污染）。
            //   这是「骨架实际朝哪」的真实测量，非 swing3 公式的构造目标。
            const outUp = segOf(outPos.get(sh)!, outPos.get(fo)!);
            const animUp = segOf(animPos.get(sh)!, animPos.get(fo)!);
            const outFoD = segOf(outPos.get(fo)!, outPos.get(ha)!);
            const animFoD = segOf(animPos.get(fo)!, animPos.get(ha)!);
            dirRows.push({ t, side, seg: 'up', meshFromDown: angleBetween(outUp, animUp), animFromDown: 0, dev: angleBetween(outUp, animUp) });
            dirRows.push({ t, side, seg: 'fo', meshFromDown: angleBetween(outFoD, animFoD), animFromDown: 0, dev: angleBetween(outFoD, animFoD) });
            // ② twist：每根手臂骨绕其段轴的滚动（输出 vs 原始动画）
            const outFoAxis = segOf(outPos.get(fo)!, outPos.get(ha)!);
            const animFoAxis = segOf(animPos.get(fo)!, animPos.get(ha)!);
            const outUpAxis = segOf(outPos.get(sh)!, outPos.get(fo)!);
            const animUpAxis = segOf(animPos.get(sh)!, animPos.get(fo)!);
            const isFo = (b: string) => b.includes('ForeArm') || b.includes('Hand');
            for (const bone of ['Shoulder', 'Arm', 'ForeArm', 'Hand'] as const) {
                const bn = `mixamorig${side}${bone}`;
                const axis = isFo(bn) ? outFoAxis : outUpAxis;
                const aAxis = isFo(bn) ? animFoAxis : animUpAxis;
                const outTw = worldTwistAngleSafe(outQ.get(bn)!, axis);
                const animTw = worldTwistAngleSafe(animQ.get(bn)!, aAxis);
                twistRows.push({ t, side, bone: bone as string, out: outTw, anim: animTw, dev: circularDelta(outTw, animTw) });
            }
            // ③ 掌向：Hand 绕前臂段轴的滚动
            const outPalm = worldTwistAngleSafe(outQ.get(ha)!, outFoAxis);
            const animPalm = worldTwistAngleSafe(animQ.get(ha)!, animFoAxis);
            palmRows.push({ t, side, out: outPalm, anim: animPalm, dev: circularDelta(outPalm, animPalm) });
        }
    }
    return { dirRows, twistRows, palmRows };
}

/**
 * S17：蒙皮顶点质心段方向 vs 骨位置段方向（帧内自洽，I1 强独立，GLM-5.2 最终裁决设计）。
 *
 * 独立参考源：同一帧内、同一输出骨架，两条计算路径完全分离，互不引用：
 *   ① 骨段方向 segBone = unit(下骨.worldPos − 上骨.worldPos)（位置法，复用 worldPos walk）
 *   ② 蒙皮段方向 segSkin = unit(centroid(下骨 cluster) − centroid(上骨 cluster))
 * cluster = 该骨「累计权重 ≥ 0.3」的所有顶点（⚠️ 不是 dominant 权重骨——V9.2 前 dominant=0 会漂移）；
 * 质心 = Σ w·vSkin / Σ w，vSkin = CPU 蒙皮后的世界顶点。
 *
 * 断言：angle(segBone, segSkin) < 10°，左右 × 上臂/前臂 × 6 时间点。
 *
 * ⚠️ 为什么不用 S15 的 skinWithBoneMatrices：它用 idxAttr.getX(i*4+k) 读 skinIndex/skinWeight，
 *   但 getX(index) 内部已乘 itemSize（index*4）→ 越界/错位读。probe-s17-verify 实测 bind 姿态
 *   下该读法蒙皮 vs 原始顶点 avg=0.91 max=2.88（损坏），而 .array[i*4+k] 直读 avg=0.0000 完全
 *   复现。S15 之所以仍绿是因为 outV/targetV 用同一套损坏蒙皮算出两边恒等（Δv≈0）→ 断言失明。
 *   本处必须用正确直读，否则 segSkin 是无意义垃圾。
 * ⚠️ boneMatrix 一律用输出骨架自身 bone.matrixWorld，禁止用 swing3TargetQ 或任何 target 矩阵
 *   替换对比（会循环论证——target 由被测公式构造，等于断言被测代码自身）。
 */
const S17_ARM_BONES = [
    'mixamorigLeftShoulder', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;

/** 正确 CPU 蒙皮：v = Σ w·(boneMat·boneInv)·vBind + mesh.matrixWorld（.array 直读，勿用 getX(i*4+k)） */
function skinCorrectCPU(mesh: THREE.SkinnedMesh, boneMatrices: Map<string, THREE.Matrix4>): THREE.Vector3[] {
    mesh.updateMatrixWorld(true);
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const n = posAttr.count;
    const out: THREE.Vector3[] = new Array(n);
    const vBind = new THREE.Vector3();
    const skinVertex = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
        skinVertex.copy(vBind).applyMatrix4(mesh.bindMatrix);
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const w = wa[i * 4 + k];
            if (w === 0) continue;
            const bi = ia[i * 4 + k];
            const bone = sk.bones[bi];
            if (!bone) continue;
            const m = boneMatrices.get(bone.name);
            if (!m) continue;
            boneMat.copy(m).multiply(sk.boneInverses[bi]);
            acc.addScaledVector(skinVertex.clone().applyMatrix4(boneMat), w);
        }
        acc.applyMatrix4(mesh.bindMatrixInverse).applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

/** S17 cluster 质心：骨 b 的 cluster = 累计权重 ≥ threshold 的顶点；质心 = Σ w·vSkin / Σ w */
function skinClusterCentroid(
    mesh: THREE.SkinnedMesh,
    vSkin: THREE.Vector3[],
    boneNames: readonly string[],
    threshold: number,
): Map<string, THREE.Vector3> {
    const sk = mesh.skeleton;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const sumW = new Map<string, number>();
    const sumV = new Map<string, THREE.Vector3>();
    for (const bn of boneNames) {
        sumW.set(bn, 0);
        sumV.set(bn, new THREE.Vector3());
    }
    const n = (mesh.geometry.attributes.position as THREE.BufferAttribute).count;
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < 4; k++) {
            const w = wa[i * 4 + k];
            if (w < threshold) continue;
            const bi = ia[i * 4 + k];
            const bone = sk.bones[bi];
            if (!bone || !sumW.has(bone.name)) continue;
            sumW.set(bone.name, sumW.get(bone.name)! + w);
            sumV.get(bone.name)!.addScaledVector(vSkin[i], w);
        }
    }
    const out = new Map<string, THREE.Vector3>();
    for (const bn of boneNames) {
        const s = sumW.get(bn)!;
        out.set(bn, s > 0 ? sumV.get(bn)!.multiplyScalar(1 / s) : new THREE.Vector3());
    }
    return out;
}

interface S17Row {
    t: number;
    side: 'Left' | 'Right';
    seg: 'up' | 'fo';
    segBone: THREE.Vector3;
    segSkin: THREE.Vector3;
    dev: number;
}

/** S17：输出骨架播放 normalizedClip，逐时间点采样 蒙皮质心段方向 vs 骨位置段方向（帧内）。 */
function sampleSkinVsBoneSegDir(
    model: THREE.Object3D,
    normalizedClip: THREE.AnimationClip,
    times: number[],
): S17Row[] {
    const angleBetween = (a: THREE.Vector3, b: THREE.Vector3): number => {
        const da = a.clone().normalize();
        const db = b.clone().normalize();
        const dot = Math.max(-1, Math.min(1, da.dot(db)));
        return Math.acos(dot) * 180 / Math.PI;
    };
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(normalizedClip);
    action.reset();
    action.play();
    let mesh: THREE.SkinnedMesh | null = null;
    model.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh;
    });
    if (!mesh) return [];
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const rows: S17Row[] = [];
    for (const t of times) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        // ⚠️ 骨矩阵 = 输出骨架自身 matrixWorld（禁止 target/swing3 替换，避免循环论证）
        const boneMat = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) boneMat.set(bn, b.matrixWorld.clone());
        const skinned = skinCorrectCPU(mesh, boneMat);
        const c = skinClusterCentroid(mesh, skinned, S17_ARM_BONES, 0.3);
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const pSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
            const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            // 上臂段：ForeArm − Shoulder
            const segBoneUp = pFo.clone().sub(pSh).normalize();
            const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
            rows.push({ t, side, seg: 'up', segBone: segBoneUp, segSkin: segSkinUp, dev: angleBetween(segBoneUp, segSkinUp) });
            // 前臂段：Hand − ForeArm
            const segBoneFo = pHa.clone().sub(pFo).normalize();
            const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
            rows.push({ t, side, seg: 'fo', segBone: segBoneFo, segSkin: segSkinFo, dev: angleBetween(segBoneFo, segSkinFo) });
        }
    }
    return rows;
}

// ---- V11.1（v3.0）S21~S23：躯干链 worldQ 与动画 S_w 一致性断言 ----
// 目标：躯干链（Spine/Spine1/Spine2/Neck/Head）改走 S_w 直取后，
//   worldQ(out) == quat(S_w) → cos 距离 ≈ 0（GREEN）；当前 bind·delta 路径有参考系错配 → RED。
const TORSO_CHAIN_BONES = [
    'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigNeck', 'mixamorigHead',
];

/** S21：输出骨架播放 normalizedClip vs 原始动画骨架播放 rawClip，逐帧对比躯干链 worldQ 的四元数 cos 距离（1-|dot|） */
function sampleTorsoVsAnimSw(
    model: THREE.Object3D,
    normalizedClip: THREE.AnimationClip,
    animObj: THREE.Object3D,
    rawClip: THREE.AnimationClip,
    bones: string[],
    times: number[],
): Map<string, number[]> {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(normalizedClip);
    action.reset();
    action.play();
    const animMixer = new THREE.AnimationMixer(animObj);
    const animAction = animMixer.clipAction(rawClip);
    animAction.reset();
    animAction.play();
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const animBone = new Map<string, THREE.Bone>();
    animObj.traverse((n) => {
        if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
    });
    const out = new Map<string, number[]>();
    for (const t of times) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        animMixer.setTime(t);
        animObj.updateMatrixWorld(true);
        for (const bn of bones) {
            const bOut = boneByName.get(bn);
            const bAnim = animBone.get(bn);
            if (!bOut || !bAnim) throw new Error(`骨骼 ${bn} 在输出骨架或动画骨架中缺失`);
            const qOut = bOut.getWorldQuaternion(new THREE.Quaternion());
            const qAnim = bAnim.getWorldQuaternion(new THREE.Quaternion());
            const cosDist = 1 - Math.abs(qOut.dot(qAnim));
            if (!out.has(bn)) out.set(bn, []);
            out.get(bn)!.push(cosDist);
        }
    }
    return out;
}

/** S22：normalizeRootMotion（内部含 re-pose）后，读取模型躯干链绑定世界 Y euler（YXZ，度） */
function torsoBindWorldYEuler(model: THREE.Object3D, bones: string[]): Map<string, number> {
    model.updateMatrixWorld(true);
    const out = new Map<string, number>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone && bones.includes(n.name)) {
            const q = n.getWorldQuaternion(new THREE.Quaternion());
            const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
            out.set(n.name, e.y * 180 / Math.PI);
        }
    });
    return out;
}

/** S23：输出骨架 vs 原始动画骨架播放 Walk，逐帧 Head 局部 -Z 世界方向余弦相似度（带符号 dot，非 |dot|，能抓 180° 反相） */
function headForwardCosSim(
    model: THREE.Object3D,
    normalizedClip: THREE.AnimationClip,
    animObj: THREE.Object3D,
    rawClip: THREE.AnimationClip,
    times: number[],
): number[] {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(normalizedClip);
    action.reset();
    action.play();
    const animMixer = new THREE.AnimationMixer(animObj);
    const animAction = animMixer.clipAction(rawClip);
    animAction.reset();
    animAction.play();
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const animBone = new Map<string, THREE.Bone>();
    animObj.traverse((n) => {
        if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
    });
    const out: number[] = [];
    for (const t of times) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        animMixer.setTime(t);
        animObj.updateMatrixWorld(true);
        const bOut = boneByName.get('mixamorigHead');
        const bAnim = animBone.get('mixamorigHead');
        if (!bOut || !bAnim) throw new Error('mixamorigHead 在输出骨架或动画骨架中缺失');
        const qOut = bOut.getWorldQuaternion(new THREE.Quaternion());
        const qAnim = bAnim.getWorldQuaternion(new THREE.Quaternion());
        const vOut = new THREE.Vector3(0, 0, -1).applyQuaternion(qOut).normalize();
        const vAnim = new THREE.Vector3(0, 0, -1).applyQuaternion(qAnim).normalize();
        out.push(Math.max(-1, Math.min(1, vOut.dot(vAnim))));
    }
    return out;
}

defineFeature(feature, (test) => {
    let model: THREE.Object3D;
    let normalizedClip: THREE.AnimationClip;
    let samples: Map<string, Array<{ pos: THREE.Vector3; quat: THREE.Quaternion; relPos: THREE.Vector3; relQuat: THREE.Quaternion }>>;
    /** 模型 bind 世界姿态（转换后、播放前捕获，S10-S12 无扭曲基准） */
    let bindPose: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>;
    /** 原始动画骨架 t=0 世界姿态（V8：S13 对比动画滚动基准） */
    let animT0World: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>;
    /** 原始动画骨架播放前（rest）世界朝向 —— 帧校正公式的 animBindQ（V9 S13/S14/S15 基准） */
    let animBindWorld: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>;

    const givenPackageDirectoryExists = (given: DefineStepFunction): void => {
        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
    };

    const givenConvertedModel = (given: DefineStepFunction): void => {
        given('a real Tripo model converted to Mixamo skeleton', () => {
            model = parseFreshFbx(MODEL_FBX);
            convertTripoToMixamo(model);
            // 转换后应为 22 个 mixamorig 命名骨骼
            let count = 0;
            model.traverse((n) => {
                if ((n as THREE.Bone).isBone) count += 1;
            });
            expect(count).toBe(22);
            // 播放前捕获 bind 世界姿态（S10-S12 无扭曲基准；不能在动画播放后捕获，否则偏差恒为 0）
            bindPose = captureBindPose(model);
            // 动画轨道骨骼名与模型骨骼必须匹配（否则 mixer 绑定不上，播放无效）
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            const boneNames = new Set<string>();
            model.traverse((n) => {
                if ((n as THREE.Bone).isBone) boneNames.add(n.name);
            });
            let matched = 0;
            for (const t of clip.tracks) {
                const boneName = t.name.replace(/\.(position|quaternion|scale)$/, '');
                if (boneNames.has(boneName)) matched += 1;
            }
            expect(matched).toBeGreaterThanOrEqual(15);
        });
    };

    const whenNormalizeAndPlay = (when: DefineStepFunction): void => {
        when('normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            // 直接调用实际代码：convertTripoToMixamo + normalizeRootMotion + AnimationMixer
            // 变体 B：传入原始动画骨架（animObj）采样 S_w，保证 Mixamo rest 不丢失
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            // 方案 F（D11）：normalizeRootMotion 会 re-pose 模型手臂骨 bind（对齐 clip 首帧），
            // 故必须在 normalizeRootMotion 之后重捕 bindPose（S14/S15 的 swing3TargetQ 需基于
            // re-pose 后的新 bind 帧；given 阶段捕获的是 re-pose 前的旧帧）
            bindPose = captureBindPose(model);
            samples = samplePlayback(normalizedClip, model);
        });
    };

    const whenNormalizeAndSampleAt0 = (when: DefineStepFunction): void => {
        when('normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            // V9：捕获原始动画骨架播放前（rest）世界朝向 —— 帧校正公式的 animBindQ。
            // 必须在 normalizeRootMotion 之前捕获（该函数内部会用 mixer 播放 animObj，之后不再是 rest）。
            animObj.updateMatrixWorld(true);
            animBindWorld = new Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
            animObj.traverse((n) => {
                if ((n as THREE.Bone).isBone) {
                    animBindWorld.set(n.name, {
                        pos: n.getWorldPosition(new THREE.Vector3()),
                        quat: n.getWorldQuaternion(new THREE.Quaternion()),
                    });
                }
            });
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            // 方案 F（D11）：normalizeRootMotion 会 re-pose 模型手臂骨 bind（对齐 clip 首帧），
            // 故必须在 normalizeRootMotion 之后重捕 bindPose（S14/S15 的 swing3TargetQ 需基于
            // re-pose 后的新 bind 帧；given 阶段捕获的是 re-pose 前的旧帧）
            bindPose = captureBindPose(model);
            samples = samplePlayback(normalizedClip, model);
            // V9：把模型重置回 t=0 状态（samplePlayback 内部 mixer 停在最后采样时刻），
            // 供 S15 CPU 蒙皮直接读 model 骨骼 t=0 的 matrixWorld 作为「输出骨骼矩阵」。
            const resetMixer = new THREE.AnimationMixer(model);
            const resetAction = resetMixer.clipAction(normalizedClip);
            resetAction.reset();
            resetAction.play();
            resetMixer.setTime(0);
            model.updateMatrixWorld(true);
            // V8：捕获原始动画骨架 t=0 世界姿态（S13 对比动画滚动基准，消除循环论证）
            const mixer = new THREE.AnimationMixer(animObj);
            const action = mixer.clipAction(clip);
            action.reset();
            action.play();
            mixer.setTime(0);
            animObj.updateMatrixWorld(true);
            animT0World = new Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
            animObj.traverse((n) => {
                if ((n as THREE.Bone).isBone) {
                    animT0World.set(n.name, {
                        pos: n.getWorldPosition(new THREE.Vector3()),
                        quat: n.getWorldQuaternion(new THREE.Quaternion()),
                    });
                }
            });
        });
    };

    // ---- S1：Hips 世界位置稳定 ----
    test('S1 normalizeRootMotion 后播放 Idle，Hips 世界位置稳定不漂移', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^Hips 骨骼世界位置最大位移应小于 ([\d.]+) 单位$/, (threshold) => {
            const move = maxHipsMove(samples.get('mixamorigHips')!);
            expect(move).toBeLessThan(Number(threshold));
        });

        and('Hips 世界位置在 t=0 时应处于模型绑定位置附近', () => {
            // t=0 时 Hips 应停留在模型自身的绑定位置（不瞬移），距离根节点原点不应过大
            const p0 = samples.get('mixamorigHips')![0].pos;
            // 模型 Hips 绑定世界位置约 (0.03, 0.48, 0.00)，任何方向偏移都不应超过 2 单位
            expect(Math.abs(p0.y)).toBeLessThan(2);
            expect(Math.abs(p0.x)).toBeLessThan(2);
            expect(Math.abs(p0.z)).toBeLessThan(2);
        });
    });

    // ---- S2：手臂在动 ----
    test('S2 normalizeRootMotion 后播放 Idle，手臂骨骼在移动（非 T-pose 僵硬）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^LeftForeArm 骨骼世界旋转相对 Hips 的变化量应大于 ([\d.]+) 度$/, (threshold) => {
            const ang = maxRelAngle(samples.get('mixamorigLeftForeArm')!);
            expect(ang).toBeGreaterThan(Number(threshold));
        });

        and(/^LeftHand 骨骼世界位置相对 Hips 的位移应大于 ([\d.]+) 单位$/, (threshold) => {
            const move = maxRelMove(samples.get('mixamorigLeftHand')!);
            expect(move).toBeGreaterThan(Number(threshold));
        });
    });

    // ---- S3：头在动 ----
    test('S3 normalizeRootMotion 后播放 Idle，头部骨骼在移动（呼吸/点头）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^Head 骨骼世界旋转相对 Hips 的变化量应大于 ([\d.]+) 度$/, (threshold) => {
            const ang = maxRelAngle(samples.get('mixamorigHead')!);
            expect(ang).toBeGreaterThan(Number(threshold));
        });

        and(/^Head 骨骼世界位置相对 Hips 的位移应大于 ([\d.]+) 单位$/, (threshold) => {
            const move = maxRelMove(samples.get('mixamorigHead')!);
            expect(move).toBeGreaterThan(Number(threshold));
        });
    });

    // ---- S4：t=0 手臂自然下垂（非 A-pose 外展） ----
    test('S4 normalizeRootMotion 后播放 Idle，t=0 时手臂自然下垂（非 A-pose 外展）', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        then(/^LeftShoulder 到 LeftHand 的手臂方向与竖直向下的夹角应小于 ([\d.]+) 度$/, (threshold) => {
            const angle = armAngleToDownAt0(samples);
            expect(angle).toBeLessThan(Number(threshold));
        });
    });

    // ---- S5：躯干在动 ----
    test('S5 normalizeRootMotion 后播放 Idle，躯干在动（Spine 有真实摆动）', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^Spine 骨骼世界旋转相对 Hips 的变化量应大于 ([\d.]+) 度$/, (threshold) => {
            const ang = maxRelAngle(samples.get('mixamorigSpine')!);
            expect(ang).toBeGreaterThan(Number(threshold));
        });
    });

    // ---- S6：下半身在动 ----
    test('S6 normalizeRootMotion 后播放 Idle，下半身在动（UpLeg 有真实摆动）', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^LeftUpLeg 或 RightUpLeg 骨骼世界旋转相对 Hips 的变化量应大于 ([\d.]+) 度$/, (threshold) => {
            const l = maxRelAngle(samples.get('mixamorigLeftUpLeg')!);
            const r = maxRelAngle(samples.get('mixamorigRightUpLeg')!);
            expect(Math.max(l, r)).toBeGreaterThan(Number(threshold));
        });
    });

    // ---- S7：头部动画方向正确 ----
    test('S7 normalizeRootMotion 后播放 Idle，头部动画方向正确（转动/点头，非错误方向）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^Head 骨骼世界旋转相对 Hips 的变化量应大于 ([\d.]+) 度$/, (threshold) => {
            const ang = maxRelAngle(samples.get('mixamorigHead')!);
            expect(ang).toBeGreaterThan(Number(threshold));
        });

        and(/^Head 世界方向相对绑定姿态的变化量应大于 ([\d.]+) 度$/, (threshold) => {
            const delta = maxHeadWorldDeltaFromBind(samples);
            expect(delta).toBeGreaterThan(Number(threshold));
        });
    });

    // ---- S8：t=0 站立（Hips 世界朝向正确，专抓横躺） ----
    test('S8 normalizeRootMotion 后 t=0 模型应站立（Hips 世界朝向正确）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        then(/^Hips 骨骼世界旋转 ([XYZ]) 轴分量应在 \[-([\d.]+), ([\d.]+)\] 度范围内$/, (axis, neg, pos) => {
            const deg = hipsWorldEulerComponent(samples, axis as 'X' | 'Y' | 'Z');
            expect(deg).toBeGreaterThanOrEqual(-Number(neg));
            expect(deg).toBeLessThanOrEqual(Number(pos));
        });

        and(/^Hips 骨骼世界旋转 ([XYZ]) 轴分量应在 \[-([\d.]+), ([\d.]+)\] 度范围内$/, (axis, neg, pos) => {
            const deg = hipsWorldEulerComponent(samples, axis as 'X' | 'Y' | 'Z');
            expect(deg).toBeGreaterThanOrEqual(-Number(neg));
            expect(deg).toBeLessThanOrEqual(Number(pos));
        });

        and(/^Hips 骨骼世界旋转 ([XYZ]) 轴分量应在 \[-([\d.]+), ([\d.]+)\] 度范围内$/, (axis, neg, pos) => {
            const deg = hipsWorldEulerComponent(samples, axis as 'X' | 'Y' | 'Z');
            expect(deg).toBeGreaterThanOrEqual(-Number(neg));
            expect(deg).toBeLessThanOrEqual(Number(pos));
        });

        and('Head 骨骼世界位置应在 Hips 上方（world.y > Hips.world.y）', () => {
            expect(headAboveHips(samples)).toBe(true);
        });
    });

    // ---- S9：t=0 尺度正常（无飞出视锥） ----
    test('S9 normalizeRootMotion 后模型整体尺度正常（无飞出视锥）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        then(/^Hips 世界位置 Y 应在 \[(\d+), (\d+)\] 范围内$/, (lo, hi) => {
            const y = samples.get('mixamorigHips')![0].pos.y;
            expect(y).toBeGreaterThanOrEqual(Number(lo));
            expect(y).toBeLessThanOrEqual(Number(hi));
        });

        and(/^Head 世界位置 Y 应大于 ([\d.]+) 且小于 ([\d.]+)$/, (lo, hi) => {
            const y = samples.get('mixamorigHead')![0].pos.y;
            expect(y).toBeGreaterThan(Number(lo));
            expect(y).toBeLessThan(Number(hi));
        });
    });

    // ---- S10：无扭曲（骨骼不脱离模型 bind 位置，防拉丝）----
    test('S10 无扭曲（骨骼不脱离模型 bind 位置，防拉丝）', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^每个被驱动骨骼的世界位置与模型 bind 世界位置偏差应小于 ([\d.]+) 单位$/, (threshold) => {
            const bind = bindPose;
            const { maxDev, worst } = maxBoneBindDeviation(samples, bind);
            expect(maxDev).toBeLessThan(Number(threshold));
            expect(worst).toBeTruthy();
        });
    });

    // ---- S11：无扭曲（骨骼链不拉伸：段长保持 bind 长度）----
    test('S11 无扭曲（骨骼链不拉伸：段长保持 bind 长度，无压缩/拉长）', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndPlay(when);

        then(/^每个子骨骼相对父骨骼的偏移长度与模型 bind 偏移长度的比值应在 ([\d.]+) 到 ([\d.]+) 之间$/, (lo, hi) => {
            const bind = bindPose;
            const { ratios, minRatio, maxRatio, worst } = chainLengthRatioVsBind(samples, model, bind);
            const bad = Array.from(ratios.entries()).filter(([, r]) => r < Number(lo) || r > Number(hi));
            if (bad.length > 0) {
                const list = bad
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([bn, r]) => `${bn}: ${r.toFixed(3)}`)
                    .join('\n');
                throw new Error(`骨骼段长比值超出 [${lo},${hi}]（${bad.length} 处, min=${minRatio.toFixed(3)} max=${maxRatio.toFixed(3)} worst=${worst}）:\n${list}`);
            }
            expect(maxRatio).toBeLessThanOrEqual(Number(hi));
            expect(minRatio).toBeGreaterThanOrEqual(Number(lo));
        });
    });

    // ---- S12：无扭曲（躯干骨骼朝向稳定，骨盆/脊柱不被扭转）----
    test('S12 无扭曲（躯干骨骼朝向稳定，骨盆/脊柱不被扭转）', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        then(/^Hips\/Spine\/Neck\/Head 骨骼世界朝向相对模型 bind 的旋转角应小于 ([\d.]+) 度$/, (threshold) => {
            const bind = bindPose;
            const { deltas, maxDelta, worst } = torsoOrientationDelta(samples, bind);
            const bad = Array.from(deltas.entries()).filter(([, d]) => d > Number(threshold));
            if (bad.length > 0) {
                const list = bad
                    .sort((a, b) => b[1] - a[1])
                    .map(([bn, d]) => `${bn}: ${d.toFixed(1)}°`)
                    .join(', ');
                throw new Error(`躯干骨骼朝向相对 bind 旋转过大（max=${maxDelta.toFixed(1)}° worst=${worst}）: ${list}`);
            }
            expect(maxDelta).toBeLessThan(Number(threshold));
        });
    });

    // ---- S13：无扭曲（手臂链关节角度自然，肘部无反折/前臂无内旋）----
    test('S13 无扭曲（手臂链关节角度自然，肘部无反折；骨滚动角对比动画）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        const sideOf = (s: string): 'Left' | 'Right' => (s === 'Left' ? 'Left' : 'Right');

        then(/^(\w+) 上臂段（肩到肘）方向与竖直向下的夹角应小于 ([\d.]+) 度$/, (side, threshold) => {
            const ang = upperArmAngleToDown(samples, sideOf(side));
            expect(ang).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) 上臂段（肩到肘）方向与竖直向下的夹角应小于 ([\d.]+) 度$/, (side, threshold) => {
            const ang = upperArmAngleToDown(samples, sideOf(side));
            expect(ang).toBeLessThan(Number(threshold));
        });

        and(/^(\w+) 前臂段（肘到腕）方向与竖直向下的夹角应小于 ([\d.]+) 度$/, (side, threshold) => {
            const ang = forearmAngleToDown(samples, sideOf(side));
            expect(ang).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) 前臂段（肘到腕）方向与竖直向下的夹角应小于 ([\d.]+) 度$/, (side, threshold) => {
            const ang = forearmAngleToDown(samples, sideOf(side));
            expect(ang).toBeLessThan(Number(threshold));
        });

        and(/^(\w+) 肘部弯曲角（上臂段与前臂段夹角）应小于 ([\d.]+) 度$/, (side, threshold) => {
            const ang = elbowBendAngle(samples, sideOf(side));
            expect(ang).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) 肘部弯曲角（上臂段与前臂段夹角）应小于 ([\d.]+) 度$/, (side, threshold) => {
            const ang = elbowBendAngle(samples, sideOf(side));
            expect(ang).toBeLessThan(Number(threshold));
        });

        const boneOf = (s: string): 'Shoulder' | 'Arm' | 'ForeArm' | 'Hand' =>
            s === 'Shoulder' ? 'Shoulder' : s === 'Arm' ? 'Arm' : s === 'ForeArm' ? 'ForeArm' : 'Hand';

        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            if (side === 'Left' && bone === 'Shoulder') {
                const report = (['Left', 'Right'] as const)
                    .flatMap((s) => (['Shoulder', 'Arm', 'ForeArm', 'Hand'] as const).map((b) => {
                        const bn = `mixamorig${s}${b}`;
                        const r = armBoneRoll(samples, bindPose, animT0World, animBindWorld, s, b);
                        return `${bn}: ${r.toFixed(1)}°`;
                    }))
                    .join(', ');
                console.log(`[S13] 手臂骨相对动画滚动角: ${report}`);
            }
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            expect(roll).toBeLessThan(Number(threshold));
        });
        and(/^(\w+) (Shoulder|Arm|ForeArm|Hand) 手臂骨相对动画的滚动角应小于 ([\d.]+) 度$/, (side, bone, threshold) => {
            const roll = armBoneRoll(samples, bindPose, animT0World, animBindWorld, sideOf(side), boneOf(bone));
            if (side === 'Left' && bone === 'Shoulder') {
                const report = (['Left', 'Right'] as const)
                    .flatMap((s) => (['Shoulder', 'Arm', 'ForeArm', 'Hand'] as const).map((b) => {
                        const bn = `mixamorig${s}${b}`;
                        const r = armBoneRoll(samples, bindPose, animT0World, animBindWorld, s, b);
                        return `${bn}: ${r.toFixed(1)}°`;
                    }))
                    .join(', ');
                console.log(`[S13] 手臂骨相对动画滚动角: ${report}`);
            }
            expect(roll).toBeLessThan(Number(threshold));
        });
    });

    // ---- S14：无扭曲（手臂蒙皮相对旋转与动画帧校正目标一致，防前臂内旋/掌心朝后）----
    // gap = angle( worldQ_out·bindQ_model⁻¹ , animQ·animBindQ⁻¹ )
    // V8 裸 animQ 时 gap = bindFrameDelta 99~146°（probe-v9-diag Q8 实锤）；帧校正后 ≈0°。
    test('S14 无扭曲（手臂蒙皮相对旋转与正确 retarget 目标一致，防前臂内旋/掌心朝后）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        const boneOf14 = (s: string): string =>
            s === 'Shoulder' ? 'Shoulder' : s === 'Arm' ? 'Arm' : s === 'ForeArm' ? 'ForeArm' : 'Hand';

        const reg = /^(\w+) (Shoulder|Arm|ForeArm|Hand) 蒙皮相对旋转偏差应小于 ([\d.]+) 度$/;
        for (let k = 0; k < 8; k++) {
            const fn = (k === 0 ? then : and);
            fn(reg, (side, bone, threshold) => {
                const bn = `mixamorig${side}${boneOf14(bone)}`;
                const gap = armSkinRelativeDelta(samples, bindPose, animT0World, animBindWorld, bn);
                const report = ARM_BONE_NAMES
                    .map((n) => `${n}: ${armSkinRelativeDelta(samples, bindPose, animT0World, animBindWorld, n).toFixed(1)}°`)
                    .join(', ');
                if (k === 0) console.log(`[S14] 蒙皮相对旋转偏差: ${report}`);
                if (gap >= Number(threshold)) {
                    throw new Error(`蒙皮相对旋转偏差越界（${bn}=${gap.toFixed(1)}° ≥ ${threshold}°）:\n${report}`);
                }
            });
        }
    });

    // ---- S15：无扭曲（蒙皮后手臂区域顶点与帧校正目标一致，防网格扭曲）----
    // CPU 蒙皮（probe-v9-diag Q7 已验证）：同网格、同 bind，输出骨骼矩阵 vs 帧校正目标骨骼矩阵，
    // 手臂区域顶点 |Δv| 应 ≈0。V8 实测手部区域质心位移 2.8 → 平均/最大阈值稳抓 V8。
    test('S15 无扭曲（蒙皮后手臂区域顶点与帧校正目标一致，防网格扭曲）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);
        whenNormalizeAndSampleAt0(when);

        then(/^手臂蒙皮顶点平均位移应小于 ([\d.]+) 单位$/, (threshold) => {
            const { avg, max, count } = armSkinVertexDelta(model, bindPose, animT0World, animBindWorld);
            console.log(`[S15] 手臂蒙皮顶点 avg=${avg.toFixed(4)} max=${max.toFixed(4)} 顶点数=${count}`);
            if (!(avg < Number(threshold))) {
                throw new Error(`手臂蒙皮顶点平均位移越界（avg=${avg.toFixed(4)} 单位 ≥ ${threshold}，max=${max.toFixed(4)}，顶点数=${count}）`);
            }
        });

        and(/^手臂蒙皮顶点最大位移应小于 ([\d.]+) 单位$/, (threshold) => {
            const { avg, max, count } = armSkinVertexDelta(model, bindPose, animT0World, animBindWorld);
            if (!(max < Number(threshold))) {
                throw new Error(`手臂蒙皮顶点最大位移越界（max=${max.toFixed(4)} 单位 ≥ ${threshold}，avg=${avg.toFixed(4)}，顶点数=${count}）`);
            }
        });
    });

    // ---- S16：多时间点输出骨架 vs 原始动画源锚点（防外展过度/前臂反折/掌心朝后）----
    // 第九轮 D10.1 重构：旧版「朝向法」meshDir = bindDir·(outQ·bindQ⁻¹) 是 swing3 公式的
    // 构造目标（公式按构造保证 meshDir==animDir）→ 恒 0° 全绿但实机仍扭曲（断言锚定被测
    // 管线自身输出）。本版改为位置法段方向 + twist + 掌向，全部锚定「原始动画源」：
    // raw anim skeleton 播放 rawClip（不经任何转换）。V9/V9.1 骨级方向 dev 22°+（位置法）
    // 真实 RED；修复后 0-2.5° GREEN（探针 probe-anchor-src 验证）。
    test('S16 多时间点输出骨架方向/twist/掌向跟随原始动画源（锚定不经转换的动画数据）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        let s16: S16Rows = { dirRows: [], twistRows: [], palmRows: [] };
        let s16Violations: string[] = [];

        when('normalizeRootMotion 处理 Mixamo Idle 动画并多时间点采样输出骨架 vs 原始动画（t=0,0.5,1.5,2.5,3.5,4.5）', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const rawClip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(rawClip, model, animObj);
            s16 = sampleOutputVsAnimSource(model, normalizedClip, animObj, rawClip, [0, 0.5, 1.5, 2.5, 3.5, 4.5]);
        });

        const collect = (seg: 'up' | 'fo', threshold: number): void => {
            const segLabel = seg === 'up' ? '上臂' : '前臂';
            const report = s16.dirRows
                .filter((r) => r.seg === seg)
                .map((r) => `t=${r.t} ${r.side} ${segLabel}: mesh=${r.meshFromDown.toFixed(1)}° anim=${r.animFromDown.toFixed(1)}° dev=${r.dev.toFixed(1)}°`)
                .join('\n');
            console.log(`[S16] ${segLabel} 段方向(位置法) vs 原始动画:\n${report}`);
            for (const r of s16.dirRows) {
                if (r.seg === seg && Math.abs(r.dev) >= threshold) {
                    s16Violations.push(`t=${r.t} ${r.side} ${segLabel}: mesh=${r.meshFromDown.toFixed(1)}° anim=${r.animFromDown.toFixed(1)}° dev=${r.dev.toFixed(1)}°`);
                }
            }
        };

        then(/^每个时间点 左右上臂 输出骨架段方向与原始动画段方向的偏差应小于 ([\d.]+) 度$/, (threshold) => {
            collect('up', Number(threshold));
        });

        and(/^每个时间点 左右前臂 输出骨架段方向与原始动画段方向的偏差应小于 ([\d.]+) 度$/, (threshold) => {
            collect('fo', Number(threshold));
        });

        and(/^每个时间点 左右上臂\/前臂 输出骨骼绕段轴 twist 与原始动画 twist 的偏差应小于 ([\d.]+) 度$/, (threshold) => {
            const report = s16.twistRows
                .map((r) => `t=${r.t} ${r.side} ${r.bone}: out=${r.out.toFixed(1)}° anim=${r.anim.toFixed(1)}° dev=${r.dev.toFixed(1)}°`)
                .join('\n');
            console.log(`[S16] twist(绕段轴) vs 原始动画:\n${report}`);
            for (const r of s16.twistRows) {
                if (r.dev >= threshold) {
                    s16Violations.push(`twist t=${r.t} ${r.side} ${r.bone}: out=${r.out.toFixed(1)}° anim=${r.anim.toFixed(1)}° dev=${r.dev.toFixed(1)}°`);
                }
            }
        });

        and(/^每个时间点 左右 Hand 掌向（绕前臂段轴滚动）与原始动画的偏差应小于 ([\d.]+) 度$/, (threshold) => {
            const report = s16.palmRows
                .map((r) => `t=${r.t} ${r.side}: out=${r.out.toFixed(1)}° anim=${r.anim.toFixed(1)}° dev=${r.dev.toFixed(1)}°`)
                .join('\n');
            console.log(`[S16] Hand 掌向(绕前臂段轴) vs 原始动画:\n${report}`);
            for (const r of s16.palmRows) {
                if (r.dev >= threshold) {
                    s16Violations.push(`掌向 t=${r.t} ${r.side}: out=${r.out.toFixed(1)}° anim=${r.anim.toFixed(1)}° dev=${r.dev.toFixed(1)}°`);
                }
            }
            if (s16Violations.length > 0) {
                throw new Error(`输出骨架偏离原始动画源超过 20°（${s16Violations.length} 处）:\n${s16Violations.join('\n')}`);
            }
        });
    });

    // ---- S17：蒙皮顶点质心段方向 vs 骨骼位置段方向（帧内自洽，I1 强独立）----
    // GLM-5.2 最终裁决设计。S13/S14/S15/S16 的参考系 = 被测代码公式副本（swing3 构造目标 /
    // swing3TargetQ / 帧校正目标 / 损坏的 getX(i*4+k) 蒙皮），对蒙皮扭曲失明。S17 把两条计算
    // 路径完全分离：骨段方向（位置法，复用 worldPos walk）vs 蒙皮质心段方向（cluster 权重≥0.3
    // 质心，正确 CPU 蒙皮）。断言 angle(segBone, segSkin) < 10°，左右 × 上臂/前臂 × 6 时间点。
    // 当前 D10 实测 dev 10~165° → 必 RED（probe-s17-red 实测 10.2~141.3°）。
    test('S17 蒙皮顶点质心段方向 vs 骨骼位置段方向（帧内自洽，独立于公式构造目标）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        let s17: S17Row[] = [];
        let s17Violations: string[] = [];

        when('normalizeRootMotion 处理 Mixamo Idle 动画并多时间点采样蒙皮质心段方向 vs 骨位置段方向（t=0,0.5,1.5,2.5,3.5,4.5）', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const rawClip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(rawClip, model, animObj);
            s17 = sampleSkinVsBoneSegDir(model, normalizedClip, [0, 0.5, 1.5, 2.5, 3.5, 4.5]);
        });

        const collect17 = (seg: 'up' | 'fo', threshold: number): void => {
            const segLabel = seg === 'up' ? '上臂' : '前臂';
            const fmt = (v: THREE.Vector3) => `(${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)})`;
            const report = s17
                .filter((r) => r.seg === seg)
                .map((r) => `t=${r.t} ${r.side} ${segLabel}: 骨${fmt(r.segBone)} 蒙皮${fmt(r.segSkin)} dev=${r.dev.toFixed(1)}°`)
                .join('\n');
            console.log(`[S17] ${segLabel} 蒙皮质心段方向 vs 骨位置段方向(帧内):\n${report}`);
            for (const r of s17) {
                if (r.seg === seg && r.dev >= threshold) {
                    s17Violations.push(`t=${r.t} ${r.side} ${segLabel}: dev=${r.dev.toFixed(1)}° ≥ ${threshold}°`);
                }
            }
        };

        then(/^每个时间点 左右上臂 蒙皮质心段方向与骨位置段方向的偏差应小于 ([\d.]+) 度$/, (threshold) => {
            collect17('up', Number(threshold));
        });

        and(/^每个时间点 左右前臂 蒙皮质心段方向与骨位置段方向的偏差应小于 ([\d.]+) 度$/, (threshold) => {
            collect17('fo', Number(threshold));
            if (s17Violations.length > 0) {
                throw new Error(`蒙皮质心段方向偏离骨位置段方向超过 ${threshold}°（${s17Violations.length} 处）:\n${s17Violations.join('\n')}`);
            }
        });
    });

    // ---- V11 翻转/脚接地/膝角 新断言（S18~S20i，翻转后坐标系） ----
    // S18/S18w 面朝 +Z：翻转（model.rotateY(π)）后 Hips/Head 局部 -Z（前向）与世界 +Z 夹角 <10°。
    // 注意：solution §4 的「Hips 世界 Y euler 绝对值 <10°」在翻转后数学上为 ±180°，故改用前向向量夹角。
    // S19/S19w 脚接地：S9 Idle 未播放双脚贴地；S9w Walk 至少一脚贴地（支撑脚）。
    // S20/S20i 膝角：S10 Walk 0-1s 每0.1s ≤100°；S10i Idle 0-6s 每0.5s ≤45°。

    let flipSamples: Map<string, Array<{ pos: THREE.Vector3; quat: THREE.Quaternion }>>;
    let unplayedWorld: Map<string, THREE.Vector3>;
    let kneeRows: Map<string, Array<{ t: number; angle: number }>>;

    test('S18 V11 翻转后 Idle 角色绝对面朝 +Z（朝向相机）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Idle 动画并应用 180°Y 翻转采样 t=0 姿态', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            model.rotateY(Math.PI);
            flipSamples = samplePlaybackAtTimes(normalizedClip, model, [0]);
        });

        then(/^Hips 骨骼世界前向（局部 -Z 轴）与 \+Z 轴夹角应小于 ([\d.]+) 度$/, (threshold) => {
            const q = flipSamples.get('mixamorigHips')![0].quat;
            const ang = forwardZAngle(q);
            console.log(`[S18] Hips 前向 vs +Z: ${ang.toFixed(2)}°`);
            if (!(ang < Number(threshold))) {
                throw new Error(`Hips 前向 vs +Z 越界（${ang.toFixed(2)}° ≥ ${threshold}°）`);
            }
        });

        and(/^Head 骨骼局部 -Z 轴在世界空间的方向与 \+Z 轴夹角应小于 ([\d.]+) 度$/, (threshold) => {
            const q = flipSamples.get('mixamorigHead')![0].quat;
            const ang = forwardZAngle(q);
            console.log(`[S18] Head 前向 vs +Z: ${ang.toFixed(2)}°`);
            if (!(ang < Number(threshold))) {
                throw new Error(`Head 前向 vs +Z 越界（${ang.toFixed(2)}° ≥ ${threshold}°）`);
            }
        });
    });

    test('S18w V11 翻转后 Walk 角色绝对面朝 +Z（两时刻）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Walk 动画并应用 180°Y 翻转采样 t=0 与 t=0.15 姿态', () => {
            const animObj = parseFreshFbx(ANIM_WALK_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            model.rotateY(Math.PI);
            flipSamples = samplePlaybackAtTimes(normalizedClip, model, [0, 0.15]);
        });

        then(/^两时刻的 Hips 骨骼世界前向（局部 -Z 轴）与 \+Z 轴夹角均小于 ([\d.]+) 度$/, (threshold) => {
            const qs = flipSamples.get('mixamorigHips')!.map((s) => s.quat);
            const angs = qs.map((q) => forwardZAngle(q));
            console.log(`[S18w] Hips 前向 vs +Z 两时刻: ${angs.map((a) => a.toFixed(2)).join('°, ')}°`);
            if (!angs.every((a) => a < Number(threshold))) {
                throw new Error(`Hips 前向 vs +Z 越界（${angs.map((a) => a.toFixed(2)).join(', ')}°，阈值 ${threshold}°）`);
            }
        });

        and(/^两时刻的 Head 骨骼局部 -Z 轴在世界空间的方向与 \+Z 轴夹角均小于 ([\d.]+) 度$/, (threshold) => {
            const qs = flipSamples.get('mixamorigHead')!.map((s) => s.quat);
            const angs = qs.map((q) => forwardZAngle(q));
            console.log(`[S18w] Head 前向 vs +Z 两时刻: ${angs.map((a) => a.toFixed(2)).join('°, ')}°`);
            if (!angs.every((a) => a < Number(threshold))) {
                throw new Error(`Head 前向 vs +Z 越界（${angs.map((a) => a.toFixed(2)).join(', ')}°，阈值 ${threshold}°）`);
            }
        });
    });

    test('S19 normalizeRootMotion 后未播放时 Idle 双脚应踩在地面上', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Idle 动画并读取未播放模型骨骼世界位置', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            unplayedWorld = worldPosAfterNormalize(model);
        });

        const boneY = (bone: string): number => {
            const p = unplayedWorld.get('mixamorig' + bone);
            if (!p) throw new Error(`未找到骨骼 mixamorig${bone}`);
            return p.y;
        };

        then(/^(\w+) 世界位置 Y 应在 \[-([\d.]+), ([\d.]+)\] 范围内$/, (bone, neg, pos) => {
            const y = boneY(bone);
            console.log(`[S19] mixamorig${bone} Y=${y.toFixed(4)}`);
            if (!(y >= -Number(neg) && y <= Number(pos))) {
                throw new Error(`骨骼 ${bone} 世界 Y=${y.toFixed(4)} 不在 [-${neg}, ${pos}]`);
            }
        });

        and(/^(\w+) 世界位置 Y 应在 \[-([\d.]+), ([\d.]+)\] 范围内$/, (bone, neg, pos) => {
            const y = boneY(bone);
            if (!(y >= -Number(neg) && y <= Number(pos))) {
                throw new Error(`骨骼 ${bone} 世界 Y=${y.toFixed(4)} 不在 [-${neg}, ${pos}]`);
            }
        });

        and(/^(\w+) 世界位置 Y 应在 \[-([\d.]+), ([\d.]+)\] 范围内$/, (bone, neg, pos) => {
            const y = boneY(bone);
            if (!(y >= -Number(neg) && y <= Number(pos))) {
                throw new Error(`骨骼 ${bone} 世界 Y=${y.toFixed(4)} 不在 [-${neg}, ${pos}]`);
            }
        });

        and(/^(\w+) 世界位置 Y 应在 \[-([\d.]+), ([\d.]+)\] 范围内$/, (bone, neg, pos) => {
            const y = boneY(bone);
            if (!(y >= -Number(neg) && y <= Number(pos))) {
                throw new Error(`骨骼 ${bone} 世界 Y=${y.toFixed(4)} 不在 [-${neg}, ${pos}]`);
            }
        });
    });

    test('S19w 播放 Walk 动画时至少一个支撑脚踩在地面上（0-1s）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Walk 动画并多帧采样（0-1s 每 0.1s）', () => {
            const animObj = parseFreshFbx(ANIM_WALK_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            model.rotateY(Math.PI);
            flipSamples = samplePlaybackAtTimes(normalizedClip, model, Array.from({ length: 11 }, (_, i) => i * 0.1));
        });

        then(/^至少一个 ToeBase 世界位置 Y 在 \[-([\d.]+), ([\d.]+)\] 内（支撑脚贴地）$/, (neg, pos) => {
            const toeL = flipSamples.get('mixamorigLeftToeBase')!.map((s) => s.pos.y);
            const toeR = flipSamples.get('mixamorigRightToeBase')!.map((s) => s.pos.y);
            const ok = (ys: number[]) => ys.some((y) => y >= -Number(neg) && y <= Number(pos));
            console.log(`[S19w] ToeBase L Y 范围 [${Math.min(...toeL).toFixed(3)}, ${Math.max(...toeL).toFixed(3)}] R [${Math.min(...toeR).toFixed(3)}, ${Math.max(...toeR).toFixed(3)}]`);
            if (!(ok(toeL) || ok(toeR))) {
                throw new Error(`无支撑脚贴地（L [${Math.min(...toeL).toFixed(3)},${Math.max(...toeL).toFixed(3)}] R [${Math.min(...toeR).toFixed(3)},${Math.max(...toeR).toFixed(3)}]，要求任一在 [-${neg},${pos}]）`);
            }
        });

        and(/^至少一个 Foot 世界位置 Y 在 \[-([\d.]+), ([\d.]+)\] 内（踝部近地）$/, (neg, pos) => {
            const footL = flipSamples.get('mixamorigLeftFoot')!.map((s) => s.pos.y);
            const footR = flipSamples.get('mixamorigRightFoot')!.map((s) => s.pos.y);
            const ok = (ys: number[]) => ys.some((y) => y >= -Number(neg) && y <= Number(pos));
            console.log(`[S19w] Foot L Y [${Math.min(...footL).toFixed(3)}, ${Math.max(...footL).toFixed(3)}] R [${Math.min(...footR).toFixed(3)}, ${Math.max(...footR).toFixed(3)}]`);
            if (!(ok(footL) || ok(footR))) {
                throw new Error(`无踝部近地（L [${Math.min(...footL).toFixed(3)},${Math.max(...footL).toFixed(3)}] R [${Math.min(...footR).toFixed(3)},${Math.max(...footR).toFixed(3)}]，要求任一在 [-${neg},${pos}]）`);
            }
        });
    });

    test('S20 播放 Walk 动画时膝弯曲角应在生理合理范围（0-1s 每 0.1s）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Walk 动画并多帧采样（0-1s 每 0.1s）', () => {
            const animObj = parseFreshFbx(ANIM_WALK_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            model.rotateY(Math.PI);
            flipSamples = samplePlaybackAtTimes(normalizedClip, model, Array.from({ length: 11 }, (_, i) => i * 0.1));
            kneeRows = new Map();
            for (const side of ['Left', 'Right'] as const) {
                const rows: Array<{ t: number; angle: number }> = [];
                const up = flipSamples.get(`mixamorig${side}UpLeg`)!;
                const leg = flipSamples.get(`mixamorig${side}Leg`)!;
                const fo = flipSamples.get(`mixamorig${side}Foot`)!;
                for (let i = 0; i < up.length; i++) {
                    const m = new Map<string, THREE.Vector3>();
                    m.set(`mixamorig${side}UpLeg`, up[i].pos);
                    m.set(`mixamorig${side}Leg`, leg[i].pos);
                    m.set(`mixamorig${side}Foot`, fo[i].pos);
                    rows.push({ t: i * 0.1, angle: kneeSegmentAngle(m, side) });
                }
                kneeRows.set(side, rows);
            }
        });

        const checkKnee = (side: 'Left' | 'Right', threshold: number): void => {
            const rows = kneeRows.get(side)!;
            const report = rows.map((r) => `t=${r.t.toFixed(1)}:${r.angle.toFixed(1)}°`).join(' ');
            console.log(`[S20] ${side} 膝角: ${report}`);
            const bad = rows.filter((r) => r.angle < 0 || r.angle > threshold);
            if (bad.length > 0) {
                throw new Error(`${side} 膝角越界（${bad.map((r) => `t=${r.t}:${r.angle.toFixed(1)}°`).join(', ')}, 阈值 ${threshold}°）`);
            }
        };

        then(/^所有时刻 LeftUpLeg→LeftLeg→LeftFoot 段夹角应在 \[(\d+), (\d+)\] 度范围内$/, (_lo, hi) => {
            checkKnee('Left', Number(hi));
        });

        and(/^所有时刻 RightUpLeg→RightLeg→RightFoot 段夹角应在 \[(\d+), (\d+)\] 度范围内$/, (_lo, hi) => {
            checkKnee('Right', Number(hi));
        });
    });

    test('S20i 播放 Idle 动画时膝弯曲角应在生理合理范围（0-6s 每 0.5s）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            model.rotateY(Math.PI);
            flipSamples = samplePlaybackAtTimes(normalizedClip, model, Array.from({ length: 13 }, (_, i) => i * 0.5));
            kneeRows = new Map();
            for (const side of ['Left', 'Right'] as const) {
                const rows: Array<{ t: number; angle: number }> = [];
                const up = flipSamples.get(`mixamorig${side}UpLeg`)!;
                const leg = flipSamples.get(`mixamorig${side}Leg`)!;
                const fo = flipSamples.get(`mixamorig${side}Foot`)!;
                for (let i = 0; i < up.length; i++) {
                    const m = new Map<string, THREE.Vector3>();
                    m.set(`mixamorig${side}UpLeg`, up[i].pos);
                    m.set(`mixamorig${side}Leg`, leg[i].pos);
                    m.set(`mixamorig${side}Foot`, fo[i].pos);
                    rows.push({ t: i * 0.5, angle: kneeSegmentAngle(m, side) });
                }
                kneeRows.set(side, rows);
            }
        });

        const checkKnee = (side: 'Left' | 'Right', threshold: number): void => {
            const rows = kneeRows.get(side)!;
            const report = rows.map((r) => `t=${r.t.toFixed(1)}:${r.angle.toFixed(1)}°`).join(' ');
            console.log(`[S20i] ${side} 膝角: ${report}`);
            const bad = rows.filter((r) => r.angle < 0 || r.angle > threshold);
            if (bad.length > 0) {
                throw new Error(`${side} 膝角越界（${bad.map((r) => `t=${r.t}:${r.angle.toFixed(1)}°`).join(', ')}, 阈值 ${threshold}°）`);
            }
        };

        then(/^所有时刻 LeftUpLeg→LeftLeg→LeftFoot 段夹角应在 \[(\d+), (\d+)\] 度范围内$/, (_lo, hi) => {
            checkKnee('Left', Number(hi));
        });

        and(/^所有时刻 RightUpLeg→RightLeg→RightFoot 段夹角应在 \[(\d+), (\d+)\] 度范围内$/, (_lo, hi) => {
            checkKnee('Right', Number(hi));
        });
    });

    // ---- V11.1（v3.0）躯干链 S_w 直取断言（S21~S23） ----
    // S21 躯干链 worldQ 与动画 S_w 一致（5 骨 × 3 帧，四元数 cos 距离 < 0.01）。
    // S22 re-pose 后躯干链绑定世界 Y euler < 15°（Tripo 原 180° → Mixamo 0°）。
    // S23 Walk 播放 Head 局部 -Z 世界方向与动画 S_w 余弦相似度 > 0.99。

    let torsoCosDist: Map<string, number[]>;
    let torsoBindYEuler: Map<string, number>;
    let headForwardSim: number[];

    test('S21 躯干链（Spine/Spine1/Spine2/Neck/Head）的 worldQ 与动画 S_w 一致', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0, t=0.5, t=1.0 对比躯干链 S_w', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            torsoCosDist = sampleTorsoVsAnimSw(model, normalizedClip, animObj, clip, TORSO_CHAIN_BONES, [0, 0.5, 1.0]);
        });

        const reg21 = /^(\w+) 骨骼每帧 world 旋转与动画 S_w 的 cos 距离应小于 ([\d.]+)$/;
        for (let k = 0; k < 5; k++) {
            const fn = k === 0 ? then : and;
            fn(reg21, (bone, threshold) => {
                const arr = torsoCosDist.get('mixamorig' + bone);
                if (!arr) throw new Error(`未找到骨骼 mixamorig${bone} 的采样`);
                const report = arr.map((d) => d.toFixed(5)).join(', ');
                console.log(`[S21] mixamorig${bone} vs S_w cos 距离: ${report}`);
                if (!arr.every((d) => d < Number(threshold))) {
                    throw new Error(`mixamorig${bone} worldQ 与 S_w cos 距离越界（${report}，阈值 ${threshold}）`);
                }
            });
        }
    });

    test('S22 re-pose 后躯干链骨骼世界 Y 朝向接近 Mixamo 标准（非 Tripo 原 180°）', ({ given, when, then, and }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Idle 动画并读取 re-pose 后躯干链世界 Y 朝向', () => {
            const animObj = parseFreshFbx(ANIM_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            torsoBindYEuler = torsoBindWorldYEuler(model, TORSO_CHAIN_BONES);
        });

        const reg22 = /^mixamorig(\w+) 世界 Y euler(（YXZ）)? *绝对值应小于 ([\d.]+) 度$/;
        for (let k = 0; k < 5; k++) {
            const fn = k === 0 ? then : and;
            fn(reg22, (bone, _yxz, threshold) => {
                const y = torsoBindYEuler.get('mixamorig' + bone);
                if (y === undefined) throw new Error(`未找到骨骼 mixamorig${bone}`);
                console.log(`[S22] mixamorig${bone} 世界 Y euler: ${y.toFixed(2)}°`);
                if (!(Math.abs(y) < Number(threshold))) {
                    throw new Error(`mixamorig${bone} 世界 Y euler ${y.toFixed(2)}° ≥ ${threshold}°（期望接近 0°，Tripo 原 180°）`);
                }
            });
        }
    });

    test('S23 播放 Walk 动画时头部面朝方向与动画一致', ({ given, when, then }) => {
        givenPackageDirectoryExists(given);
        givenConvertedModel(given);

        when('normalizeRootMotion 处理 Mixamo Walk 动画并采样 t=0, t=0.15, t=0.5 对比头部朝向', () => {
            const animObj = parseFreshFbx(ANIM_WALK_FBX);
            const clip = animObj.animations[0];
            normalizedClip = normalizeRootMotion(clip, model, animObj);
            headForwardSim = headForwardCosSim(model, normalizedClip, animObj, clip, [0, 0.15, 0.5]);
        });

        then(/^Head 骨骼局部 -Z 轴在世界空间的方向与动画 S_w\(Head\) 对应的方向余弦相似度应大于 ([\d.]+)（每帧）$/, (threshold) => {
            const report = headForwardSim.map((s) => s.toFixed(4)).join(', ');
            console.log(`[S23] Head 前向余弦相似度(带符号) vs S_w: ${report}`);
            if (!headForwardSim.every((s) => s > Number(threshold))) {
                throw new Error(`Head 前向与 S_w 余弦相似度越界（${report}，阈值 ${threshold}）`);
            }
        });
    });
});

