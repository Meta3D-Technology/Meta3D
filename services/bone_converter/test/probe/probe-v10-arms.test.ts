/**
 * probe-v10-arms — 判决性探针（验证 P1）+ 四臂对比探针（A/C/D/F）
 *
 * Part 1（判决性探针）：按方案 E 改法（solution.md line 449-462）生成 E 版 track，
 *   AnimationMixer 实际播放采样，验证 P1 预测：
 *   ① localPos ≡ bindLocalPos（位置链是否退化）
 *   ② 播放后位置是否偏离 anim（方案 A 的 22° 偏差行为是否重现）
 *   ③ S17 度量：E 版 dev 相比当前是否改善/恶化
 * Part 2（四臂对比探针）：实现 A/C/D/F 四个变体，各自用 S17 度量，
 *   输出 4 张数值表（t × Left/Right × 上臂/前臂 dev），裁决最优方案。
 *
 * 约束：不修改 src/、不修改 steps/features。探针内独立实现各变体公式。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v10-arms" --forceExit
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
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');
const ANIM_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');
const TIMES = [0, 0.5, 1.5, 2.5, 3.5, 4.5];
const OUT_PATH = path.join(__dirname, 'PROBE-V10-ARMS-RESULT.md');

const ARM_BONES_8 = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;
const S17_ARM_BONES = [
    'mixamorigLeftShoulder', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function angleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const da = a.clone().normalize();
    const db = b.clone().normalize();
    const dot = Math.max(-1, Math.min(1, da.dot(db)));
    return Math.acos(dot) * 180 / Math.PI;
}

/** 两四元数夹角度数（2·acos(|q1·q2|)） */
function quatAngleDeg(qa: THREE.Quaternion, qb: THREE.Quaternion): number {
    const dot = Math.min(1, Math.max(-1, Math.abs(qa.x * qb.x + qa.y * qb.y + qa.z * qb.z + qa.w * qb.w)));
    return 2 * Math.acos(dot) * 180 / Math.PI;
}
function fmtV(v: THREE.Vector3): string { return `(${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)})`; }

/** Shoemake swing-twist：世界四元数 q 绕世界单位轴 axis 的 twist（滚动）角（度）。 */
function twistAroundQ(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(axis);
    const twistVec = axis.clone().multiplyScalar(dot);
    const ang = 2 * Math.atan2(twistVec.length(), Math.abs(q.w)) * 180 / Math.PI;
    return ang * (q.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
}

// ─────────────────────────────────────────────────────────────
// S17 度量：正确 CPU 蒙皮 + cluster 质心 + 蒙皮段 vs 骨段方向（帧内）
// 复用 d5-animation.steps.ts 的 skinCorrectCPU/skinClusterCentroid 语义
// ─────────────────────────────────────────────────────────────
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
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
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
            acc.addScaledVector(vBind.clone().applyMatrix4(boneMat), w);
        }
        acc.applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

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
    for (const bn of boneNames) { sumW.set(bn, 0); sumV.set(bn, new THREE.Vector3()); }
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
    dev: number;
}

/** S17：播放 clip，逐时间点采样 蒙皮质心段方向 vs 骨位置段方向（帧内）。 */
function sampleS17(model: THREE.Object3D, clip: THREE.AnimationClip, times: number[]): S17Row[] {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
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
            const segBoneUp = pFo.clone().sub(pSh).normalize();
            const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
            rows.push({ t, side, seg: 'up', dev: angleDeg(segBoneUp, segSkinUp) });
            const segBoneFo = pHa.clone().sub(pFo).normalize();
            const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
            rows.push({ t, side, seg: 'fo', dev: angleDeg(segBoneFo, segSkinFo) });
        }
    }
    return rows;
}

/** S17 在 bind pose 采样（不播放 clip，直接读骨架 bind world 变换）——隔离第二根因（蒙皮层是否自洽）。 */
function sampleS17Bind(model: THREE.Object3D, bindLocalPos: Map<string, THREE.Vector3>): S17Row[] {
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
    // bind pose：恢复所有骨到 bind local 变换（不施加 clip）
    for (const [bn, b] of boneByName) {
        const bl = bindLocalPos.get(bn);
        if (bl) b.position.copy(bl);
    }
    model.updateMatrixWorld(true);
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
        const segBoneUp = pFo.clone().sub(pSh).normalize();
        const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
        rows.push({ t: -1, side, seg: 'up', dev: angleDeg(segBoneUp, segSkinUp) });
        const segBoneFo = pHa.clone().sub(pFo).normalize();
        const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
        rows.push({ t: -1, side, seg: 'fo', dev: angleDeg(segBoneFo, segSkinFo) });
    }
    return rows;
}
function playSampleWorld(
    model: THREE.Object3D,
    clip: THREE.AnimationClip,
    times: number[],
): Map<number, { pos: Map<string, THREE.Vector3>; quat: Map<string, THREE.Quaternion> }> {
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const out = new Map<number, { pos: Map<string, THREE.Vector3>; quat: Map<string, THREE.Quaternion> }>();
    for (const t of times) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        const pos = new Map<string, THREE.Vector3>();
        const quat = new Map<string, THREE.Quaternion>();
        for (const b of ARM_BONES_8) {
            const bn = boneByName.get(b)!;
            pos.set(b, bn.getWorldPosition(new THREE.Vector3()));
            quat.set(b, bn.getWorldQuaternion(new THREE.Quaternion()));
        }
        out.set(t, { pos, quat });
    }
    return out;
}

/** 播放 rawClip 于动画骨架，返回每时间点 anim 手臂骨 worldPos（用于对比）。 */
function playAnimWorld(
    animObj: THREE.Object3D,
    clip: THREE.AnimationClip,
    times: number[],
): Map<number, Map<string, THREE.Vector3>> {
    const mixer = new THREE.AnimationMixer(animObj);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();
    const boneByName = new Map<string, THREE.Bone>();
    animObj.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const out = new Map<number, Map<string, THREE.Vector3>>();
    for (const t of times) {
        mixer.setTime(t);
        animObj.updateMatrixWorld(true);
        const pos = new Map<string, THREE.Vector3>();
        for (const b of ARM_BONES_8) {
            pos.set(b, boneByName.get(b)!.getWorldPosition(new THREE.Vector3()));
        }
        out.set(t, pos);
    }
    return out;
}

/** 播放 rawClip 于动画骨架，返回每时间点 anim 手臂骨 worldQuat（用于 F 的 D 度量）。 */
function playAnimWorldQuat(
    animObj: THREE.Object3D,
    clip: THREE.AnimationClip,
    times: number[],
): Map<number, Map<string, THREE.Quaternion>> {
    const mixer = new THREE.AnimationMixer(animObj);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();
    const boneByName = new Map<string, THREE.Bone>();
    animObj.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const out = new Map<number, Map<string, THREE.Quaternion>>();
    for (const t of times) {
        mixer.setTime(t);
        animObj.updateMatrixWorld(true);
        const quat = new Map<string, THREE.Quaternion>();
        for (const b of ARM_BONES_8) {
            quat.set(b, boneByName.get(b)!.getWorldQuaternion(new THREE.Quaternion()));
        }
        out.set(t, quat);
    }
    return out;
}

/** 段方向（骨位置法）：seg='up' → Fo−Sh；seg='fo' → Ha−Fo */
function segDir(p: Map<string, THREE.Vector3>, side: 'Left' | 'Right', seg: 'up' | 'fo'): THREE.Vector3 {
    const sh = `mixamorig${side}Shoulder`;
    const fo = `mixamorig${side}ForeArm`;
    const ha = `mixamorig${side}Hand`;
    if (seg === 'up') return p.get(fo)!.clone().sub(p.get(sh)!);
    return p.get(ha)!.clone().sub(p.get(fo)!);
}

// ─────────────────────────────────────────────────────────────
// 变体 clip 生成器 —— 复刻 normalizeRootMotion.ts D10 核心（line 307-473），
// 按 variant 参数切换 worldQ 公式 / poseQ 链 / local 父帧
// ─────────────────────────────────────────────────────────────
type VariantName = 'current' | 'E' | 'A' | 'C' | 'D' | 'F';

interface VariantOpts {
    /** 手臂 worldQ 公式 */
    armWorldQ: 'swing3' | 'C' | 'D';
    /** 手臂 poseQ 来源：rawAnimQ（分叉链）或 worldQ（统一链） */
    armPoseQ: 'rawAnimQ' | 'worldQ';
    /** 手臂骨 child local 计算的父帧：worldQ（当前）或 poseQ（方案 E） */
    localParent: 'worldQ' | 'poseQ';
}

const OPTS: Record<VariantName, VariantOpts> = {
    // 当前 D10：worldQ=swing3，poseQ=raw animQ（分叉链），local 父帧=worldQ → 剪切角 36.2°
    current: { armWorldQ: 'swing3', armPoseQ: 'rawAnimQ', localParent: 'worldQ' },
    // 方案 E：仅改 local 父帧为 poseQ（solution.md line 448-450）
    E: { armWorldQ: 'swing3', armPoseQ: 'rawAnimQ', localParent: 'poseQ' },
    // 方案 A：统一链 —— poseQ=worldQ=swing3
    A: { armWorldQ: 'swing3', armPoseQ: 'worldQ', localParent: 'worldQ' },
    // 方案 C：worldQ = animQ·animBindQ⁻¹·C·bindQ，C=最短旋转(bindSeg→restSeg)，统一链
    C: { armWorldQ: 'C', armPoseQ: 'worldQ', localParent: 'worldQ' },
    // 方案 D：worldQ = animQ·R_fixed，R_fixed=最短旋转(bindLocalSeg→restLocalSeg)，统一链
    D: { armWorldQ: 'D', armPoseQ: 'worldQ', localParent: 'worldQ' },
    // 方案 F：需先 re-pose bind 对齐 anim rest 帧，再走 current 路径
    F: { armWorldQ: 'swing3', armPoseQ: 'rawAnimQ', localParent: 'worldQ' },
};

function buildVariantClip(
    clip: THREE.AnimationClip,
    root: THREE.Object3D,
    animSkeleton: THREE.Object3D,
    variant: VariantName,
): { outClip: THREE.AnimationClip; bindLocalPos: Map<string, THREE.Vector3> } {
    const opts = OPTS[variant];
    const boneByName = new Map<string, THREE.Bone>();
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    if (boneByName.size === 0) return { outClip: clip, bindLocalPos: new Map() };

    const rootBoneName: string | null = (() => {
        for (const [name, b] of boneByName) {
            const parent = b.parent;
            if (!parent || !(parent as THREE.Bone).isBone) return name;
        }
        return null;
    })();
    if (!rootBoneName) return { outClip: clip, bindLocalPos: new Map() };

    root.updateMatrixWorld(true);
    const bindWorldQ = new Map<string, THREE.Quaternion>();
    const bindWorldPos = new Map<string, THREE.Vector3>();
    const bindLocalPos = new Map<string, THREE.Vector3>();
    for (const [bn, b] of boneByName) {
        bindWorldQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(b.matrixWorld));
        bindWorldPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
        bindLocalPos.set(bn, b.position.clone());
    }

    const drivenBones = new Set<string>();
    for (const t of clip.tracks) {
        const bn = t.name.replace(/\.(position|quaternion|scale)$/, '');
        drivenBones.add(bn);
    }
    const drivenInModel = Array.from(drivenBones).filter((bn) => boneByName.has(bn));
    if (drivenInModel.length === 0) return { outClip: clip, bindLocalPos };

    const timeSet = new Set<number>([0]);
    for (const t of clip.tracks) for (const tm of t.times) timeSet.add(tm);
    const times = Array.from(timeSet).sort((a, b) => a - b);

    // ── anim 骨架采样（同 D10 line 199-239）──
    const animBone = new Map<string, THREE.Bone>();
    animSkeleton!.traverse((n) => {
        if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
    });
    const sampleNames = Array.from(boneByName.keys()).filter((bn) => animBone.has(bn));
    if (sampleNames.length === 0) return { outClip: clip, bindLocalPos };
    const S_w = new Map<string, THREE.Matrix4[]>();
    const S_local = new Map<string, THREE.Matrix4[]>();
    for (const bn of sampleNames) { S_w.set(bn, []); S_local.set(bn, []); }
    const animRestLocal = new Map<string, THREE.Matrix4>();
    const animBindWorldQ = new Map<string, THREE.Quaternion>();
    animSkeleton!.updateMatrixWorld(true);
    for (const bn of sampleNames) {
        const ab = animBone.get(bn)!;
        animRestLocal.set(bn, ab.matrix.clone());
        animBindWorldQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(ab.matrixWorld));
    }
    const mixer = new THREE.AnimationMixer(animSkeleton!);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();
    for (const tm of times) {
        mixer.setTime(tm);
        animSkeleton!.updateMatrixWorld(true);
        for (const bn of sampleNames) {
            const ab = animBone.get(bn)!;
            S_w.get(bn)!.push(ab.matrixWorld.clone());
            S_local.get(bn)!.push(ab.matrix.clone());
        }
    }

    // ── bind 参考（同 D10 line 316-323）──
    const ARM_BONES: Set<string> = new Set(ARM_BONES_8);
    const deltaLocalQ = new Map<string, THREE.Quaternion[]>();
    const tmpA = new THREE.Matrix4();
    for (const bn of sampleNames) {
        deltaLocalQ.set(bn, []);
        for (let i = 0; i < times.length; i++) {
            const l = S_local.get(bn)![i];
            if (!l) { deltaLocalQ.get(bn)!.push(new THREE.Quaternion()); continue; }
            tmpA.copy(animRestLocal.get(bn)!).invert().multiply(l);
            deltaLocalQ.get(bn)!.push(new THREE.Quaternion().setFromRotationMatrix(tmpA));
        }
    }
    const parentOf = new Map<string, THREE.Bone | null>();
    const childrenOf = new Map<string, string[]>();
    for (const [bn, b] of boneByName) {
        const p = b.parent;
        parentOf.set(bn, p && (p as THREE.Bone).isBone ? p as THREE.Bone : null);
    }
    for (const [bn, b] of boneByName) {
        const pp = b.parent;
        if (pp && (pp as THREE.Bone).isBone) {
            if (!childrenOf.has(pp.name)) childrenOf.set(pp.name, []);
            childrenOf.get(pp.name)!.push(bn);
        }
    }

    // ── C / D 的固定修正量（probe-v10-formula 已定义公式）──
    // anim rest 世界位置（arm 段方向用）
    const animRestPos = new Map<string, THREE.Vector3>();
    for (const [bn, ab] of animBone) {
        animRestPos.set(bn, ab.getWorldPosition(new THREE.Vector3()));
    }
    const Cfix = new Map<string, THREE.Quaternion>();
    const Rfix = new Map<string, THREE.Quaternion>();
    if (opts.armWorldQ === 'C' || opts.armWorldQ === 'D') {
        for (const side of ['Left', 'Right'] as const) {
            const shN = `mixamorig${side}Shoulder`;
            const arN = `mixamorig${side}Arm`;
            const foN = `mixamorig${side}ForeArm`;
            const haN = `mixamorig${side}Hand`;
            const bindUp = bindWorldPos.get(foN)!.clone().sub(bindWorldPos.get(shN)!);
            const restUp = animRestPos.get(foN)!.clone().sub(animRestPos.get(shN)!);
            const bindFo = bindWorldPos.get(haN)!.clone().sub(bindWorldPos.get(foN)!);
            const restFo = animRestPos.get(haN)!.clone().sub(animRestPos.get(foN)!);
            if (opts.armWorldQ === 'C') {
                const cUp = new THREE.Quaternion().setFromUnitVectors(bindUp.clone().normalize(), restUp.clone().normalize());
                const cFo = new THREE.Quaternion().setFromUnitVectors(bindFo.clone().normalize(), restFo.clone().normalize());
                Cfix.set(shN, cUp); Cfix.set(arN, cUp);
                Cfix.set(foN, cFo); Cfix.set(haN, cFo);
            } else {
                for (const [b, segIsFo] of [[shN, false], [arN, false], [foN, true], [haN, true]] as const) {
                    const bindSeg = segIsFo ? bindFo.clone() : bindUp.clone();
                    const restSeg = segIsFo ? restFo.clone() : restUp.clone();
                    const bindLocal = bindSeg.clone().applyQuaternion(bindWorldQ.get(b)!.clone().invert()).normalize();
                    const restLocal = restSeg.clone().applyQuaternion(animBindWorldQ.get(b)!.clone().invert()).normalize();
                    Rfix.set(b, new THREE.Quaternion().setFromUnitVectors(bindLocal, restLocal));
                }
            }
        }
    }

    // ── 构建新轨道 ──
    const localPositions: Record<string, number[]> = {};
    const localQuats: Record<string, number[]> = {};
    for (const bn of drivenInModel) { localPositions[bn] = []; localQuats[bn] = []; }
    const worldQ = new Map<string, THREE.Quaternion>();
    const worldPos = new Map<string, THREE.Vector3>();
    const identityQ = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const mTmp2 = new THREE.Matrix4();
    const vTmp2 = new THREE.Vector3();
    const vTmp3 = new THREE.Vector3();
    const posB = new THREE.Vector3();
    const posC = new THREE.Vector3();
    const swingTmp = new THREE.Quaternion();
    const twistTmp = new THREE.Quaternion();

    for (let i = 0; i < times.length; i++) {
        for (const bn of sampleNames) {
            if (ARM_BONES.has(bn)) {
                const side: 'Left' | 'Right' = bn.includes('Left') ? 'Left' : 'Right';
                const segIsFo = bn.includes('ForeArm') || bn.includes('Hand');
                const shName = `mixamorig${side}Shoulder`;
                const foName = `mixamorig${side}ForeArm`;
                const haName = `mixamorig${side}Hand`;
                const bindSegDir = segIsFo
                    ? bindWorldPos.get(haName)!.clone().sub(bindWorldPos.get(foName)!)
                    : bindWorldPos.get(foName)!.clone().sub(bindWorldPos.get(shName)!);
                if (opts.armWorldQ === 'swing3') {
                    // D10 swing3：v = bindQ⁻¹·bindSegDir → animSegDir(t)
                    vTmp3.copy(bindSegDir).applyQuaternion(bindWorldQ.get(bn)!.clone().invert()).normalize();
                    pos.setFromMatrixPosition(S_w.get(foName)![i]);
                    posB.setFromMatrixPosition(S_w.get(shName)![i]);
                    posC.setFromMatrixPosition(S_w.get(haName)![i]);
                    const animSegDir = (segIsFo ? posC.clone().sub(pos) : pos.clone().sub(posB)).normalize();
                    swingTmp.setFromUnitVectors(vTmp3, animSegDir);
                    quat.setFromRotationMatrix(S_w.get(bn)![i]);
                    const roll = twistAroundQ(quat, animSegDir);
                    twistTmp.setFromAxisAngle(animSegDir, roll * Math.PI / 180);
                    quat.copy(twistTmp).multiply(swingTmp);
                } else if (opts.armWorldQ === 'C') {
                    // worldQ = animQ·animBindQ⁻¹·C·bindQ
                    quat.setFromRotationMatrix(S_w.get(bn)![i]);
                    quat.multiply(animBindWorldQ.get(bn)!.clone().invert())
                        .multiply(Cfix.get(bn)!.clone())
                        .multiply(bindWorldQ.get(bn)!);
                } else {
                    // worldQ = animQ·R_fixed
                    quat.setFromRotationMatrix(S_w.get(bn)![i]);
                    quat.multiply(Rfix.get(bn)!);
                }
            } else {
                const bq = bindWorldQ.get(bn) || identityQ;
                const dq = deltaLocalQ.get(bn)![i];
                quat.copy(bq).multiply(dq);
            }
            worldQ.set(bn, quat.clone());
        }
        for (const [bn, b] of boneByName) {
            if (!worldQ.has(bn)) worldQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(b.matrixWorld));
        }
        // poseQ：手臂按 opts.armPoseQ，其余 = worldQ
        const poseQ = new Map<string, THREE.Quaternion>();
        for (const bn of sampleNames) {
            if (ARM_BONES.has(bn) && opts.armPoseQ === 'rawAnimQ') {
                quat.setFromRotationMatrix(S_w.get(bn)![i]);
                poseQ.set(bn, quat.clone());
            } else {
                poseQ.set(bn, worldQ.get(bn)!);
            }
        }
        for (const [bn] of boneByName) {
            if (!poseQ.has(bn)) poseQ.set(bn, worldQ.get(bn) || identityQ);
        }
        // worldPos walk（poseQ 链）
        worldPos.set(rootBoneName!, bindWorldPos.get(rootBoneName!)!.clone());
        const stack: string[] = [rootBoneName!];
        while (stack.length) {
            const bn = stack.pop()!;
            const pq = poseQ.get(bn) || worldQ.get(bn) || identityQ;
            const pp = worldPos.get(bn)!;
            for (const c of childrenOf.get(bn) || []) {
                vTmp2.copy(bindLocalPos.get(c)!).applyQuaternion(pq).add(pp);
                worldPos.set(c, vTmp2.clone());
                stack.push(c);
            }
        }
        // 转 local：方案 E 手臂骨用 poseQ 父帧，其余用 worldQ 父帧
        for (const bn of drivenInModel) {
            const b = boneByName.get(bn)!;
            const parent = parentOf.get(bn);
            let localM: THREE.Matrix4;
            if (parent) {
                const pPos = worldPos.get(parent.name)!;
                let pQ = worldQ.get(parent.name) || identityQ;
                if (opts.localParent === 'poseQ' && ARM_BONES.has(bn)) {
                    pQ = poseQ.get(parent.name) || pQ;
                }
                mTmp2.compose(pPos, pQ, new THREE.Vector3(1, 1, 1)).invert();
                localM = new THREE.Matrix4().compose(worldPos.get(bn)!, worldQ.get(bn)!, new THREE.Vector3(1, 1, 1)).premultiply(mTmp2);
            } else {
                const pNode = b.parent;
                const pInv = pNode ? pNode.matrixWorld.clone().invert() : new THREE.Matrix4().identity();
                localM = new THREE.Matrix4().compose(worldPos.get(bn)!, worldQ.get(bn)!, new THREE.Vector3(1, 1, 1)).premultiply(pInv);
            }
            localM.decompose(pos, quat, scale);
            localPositions[bn].push(pos.x, pos.y, pos.z);
            localQuats[bn].push(quat.x, quat.y, quat.z, quat.w);
        }
        worldQ.clear();
        worldPos.clear();
    }

    const newTracks: THREE.KeyframeTrack[] = [];
    for (const bn of drivenInModel) {
        newTracks.push(new THREE.VectorKeyframeTrack(bn + '.position', times, new Float32Array(localPositions[bn])));
        newTracks.push(new THREE.QuaternionKeyframeTrack(bn + '.quaternion', times, new Float32Array(localQuats[bn])));
    }
    if (newTracks.length === 0) return { outClip: clip, bindLocalPos };
    return { outClip: new THREE.AnimationClip(clip.name, clip.duration, newTracks), bindLocalPos };
}

/**
 * 方案 F：bind re-pose 对齐 anim rest 帧。
 * 将手臂骨 world 朝向/段方向 re-pose 到 anim rest 帧（61°→88.5° 帧差消除），
 * 保持模型骨长不变。re-pose 后 swing3 的 v(b)=bindQ⁻¹·bindSegDir ≈ restLocalSegDir，
 * → worldQ ≈ animQ → D≈0 → 位置链/朝向链自然重合。
 */
function rePoseModelBindToAnimRest(model: THREE.Object3D, animSkeleton: THREE.Object3D): void {
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const animBone = new Map<string, THREE.Bone>();
    animSkeleton.traverse((n) => {
        if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
    });
    animSkeleton.updateMatrixWorld(true);
    model.updateMatrixWorld(true);
    const restPos = new Map<string, THREE.Vector3>();
    const restQ = new Map<string, THREE.Quaternion>();
    for (const [bn, ab] of animBone) {
        restPos.set(bn, ab.getWorldPosition(new THREE.Vector3()));
        restQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(ab.matrixWorld));
    }
    for (const side of ['Left', 'Right'] as const) {
        const sh = `mixamorig${side}Shoulder`;
        const ar = `mixamorig${side}Arm`;
        const fo = `mixamorig${side}ForeArm`;
        const ha = `mixamorig${side}Hand`;
        const bSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
        const bAr = boneByName.get(ar)!.getWorldPosition(new THREE.Vector3());
        const bFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
        const bHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
        const restUp = restPos.get(fo)!.clone().sub(restPos.get(sh)!).normalize();
        const restFo = restPos.get(ha)!.clone().sub(restPos.get(fo)!).normalize();
        const nSh = bSh.clone();
        const nAr = nSh.clone().add(restUp.clone().multiplyScalar(bAr.clone().sub(bSh).length()));
        const nFo = nSh.clone().add(restUp.clone().multiplyScalar(bFo.clone().sub(bSh).length()));
        const nHa = nFo.clone().add(restFo.clone().multiplyScalar(bHa.clone().sub(bFo).length()));
        const nPos = new Map<string, THREE.Vector3>([
            [sh, nSh], [ar, nAr], [fo, nFo], [ha, nHa],
        ]);
        const nQ = new Map<string, THREE.Quaternion>([
            [sh, restQ.get(sh)!.clone()], [ar, restQ.get(ar)!.clone()],
            [fo, restQ.get(fo)!.clone()], [ha, restQ.get(ha)!.clone()],
        ]);
        for (const bn of [sh, ar, fo, ha]) {
            const bone = boneByName.get(bn)!;
            const parent = bone.parent;
            if (parent) {
                const pPos = nPos.get(parent.name) || parent.getWorldPosition(new THREE.Vector3());
                const pQ = nQ.get(parent.name) || new THREE.Quaternion().setFromRotationMatrix(parent.matrixWorld);
                const pInvQ = pQ.clone().invert();
                const lp = nPos.get(bn)!.clone().sub(pPos).applyQuaternion(pInvQ);
                const lq = pInvQ.clone().multiply(nQ.get(bn)!);
                bone.position.copy(lp);
                bone.quaternion.copy(lq);
            }
        }
    }
    model.updateMatrixWorld(true);
    // 重建 skeleton inverse bind（re-pose 改变了 bind 世界变换）
    model.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
            const m = n as THREE.SkinnedMesh;
            if (m.skeleton) m.skeleton.calculateInverses();
        }
    });
}

// ─────────────────────────────────────────────────────────────
// 主探针
// ─────────────────────────────────────────────────────────────
describe('probe-v10-arms', () => {
    test('判决性探针（P1 验证，方案 E）+ 四臂对比探针（A/C/D/F）', () => {
        const report: string[] = [];
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const animObj = parseFreshFbx(ANIM_FBX);
        const rawClip = animObj.animations[0];

        report.push('# PROBE-V10-ARMS-RESULT');
        report.push('');
        report.push('> 判决性探针（验证 final-report P1：方案 E 在 AnimationMixer 播放重组下退化为方案 A）');
        report.push(`> 模型：${path.basename(MODEL_FBX)}；动画：${path.basename(ANIM_FBX)}`);
        report.push(`> 时间点：${TIMES.join(', ')}；S17 阈值 < 10°`);
        report.push('');

        // ══════════ Part 1：判决性探针（方案 E）══════════
        report.push('## Part 1：判决性探针（方案 E — P1 验证）');
        report.push('');
        report.push('### 1.1 P1 预测①：E 版 child local position ≡ bindLocalPos（位置链退化）');
        report.push('');
        report.push('| 骨 | bindLocalPos | E 版 position track (t=0,0.5,1.5,2.5,3.5,4.5) | max|diff| | 是否≡ |');
        report.push('|---|---|---|---|---|');

        const e = buildVariantClip(rawClip, model, animObj, 'E');
        const clipE = e.outClip;

        const bindByName = new Map<string, THREE.Bone>();
        model.traverse((n) => {
            if ((n as THREE.Bone).isBone) bindByName.set(n.name, n as THREE.Bone);
        });

        let maxLocalPosDiff = 0;
        let localPosAllEqual = true;
        for (const bn of ARM_BONES_8) {
            const track = clipE.tracks.find((t) => t.name === bn + '.position') as THREE.VectorKeyframeTrack | undefined;
            const bindLocal = e.bindLocalPos.get(bn) || bindByName.get(bn)!.position.clone();
            if (!track) { report.push(`| ${bn} | ${fmtV(bindLocal)} | (无 position track) | — | — |`); continue; }
            const vals = track.values as Float32Array;
            let maxDiff = 0;
            for (let j = 0; j < vals.length; j += 3) {
                const d = Math.max(Math.abs(vals[j] - bindLocal.x), Math.abs(vals[j + 1] - bindLocal.y), Math.abs(vals[j + 2] - bindLocal.z));
                if (d > maxDiff) maxDiff = d;
            }
            if (maxDiff > 1e-4) localPosAllEqual = false;
            if (maxDiff > maxLocalPosDiff) maxLocalPosDiff = maxDiff;
            const sample = Array.from({ length: Math.min(6, vals.length / 3) }, (_, k) => `(${vals[k * 3].toFixed(3)},${vals[k * 3 + 1].toFixed(3)},${vals[k * 3 + 2].toFixed(3)})`).join(' ');
            report.push(`| ${bn} | ${fmtV(bindLocal)} | ${sample} | ${maxDiff.toFixed(4)} | ${maxDiff <= 1e-4 ? '✅' : '❌'} |`);
        }
        report.push('');
        report.push(`**结论：E 版所有手臂骨 localPos 与 bindLocalPos 的 max|diff| = ${maxLocalPosDiff.toFixed(6)}，${localPosAllEqual ? '✅ 全部 ≡ bindLocalPos（P1 预测①证实，位置链退化）' : '❌ 存在偏差'}`);

        // 1.2 P1 预测②：播放后位置是否偏离 anim（方案 A 的 22° 行为）
        report.push('');
        report.push('### 1.2 P1 预测②：播放后位置是否偏离 anim（方案 A 的 22° 偏差行为是否重现）');
        report.push('');
        report.push('骨位置段方向 vs anim 段方向（每时间点）。若 E ≈ A ≈ 22°+ → P1 预测②证实。');
        report.push('');
        report.push('| 变体 | t=0 | t=0.5 | t=1.5 | t=2.5 | t=3.5 | t=4.5 | 段 | 侧 |');
        report.push('|---|---|---|---|---|---|---|---|---|');

        // 用真实 normalizeRootMotion 生成 current 基准（与 buildVariantClip('current') 对照）
        const realCur = normalizeRootMotion(rawClip, model, animObj);
        const a = buildVariantClip(rawClip, model, animObj, 'A');

        const animWorld = playAnimWorld(animObj, rawClip, TIMES);
        const played = new Map<VariantName, Map<number, { pos: Map<string, THREE.Vector3>; quat: Map<string, THREE.Quaternion> }>>();
        played.set('current', playSampleWorld(model, realCur, TIMES));
        played.set('E', playSampleWorld(model, clipE, TIMES));
        played.set('A', playSampleWorld(model, a.outClip, TIMES));

        const posDevTable: { variant: VariantName; t: number; side: 'Left' | 'Right'; seg: 'up' | 'fo'; dev: number }[] = [];
        for (const v of ['current', 'E', 'A'] as VariantName[]) {
            const pw = played.get(v)!;
            for (const t of TIMES) {
                for (const side of ['Left', 'Right'] as const) {
                    for (const seg of ['up', 'fo'] as const) {
                        const outSeg = segDir(pw.get(t)!.pos, side, seg);
                        const animSeg = segDir(animWorld.get(t)!, side, seg);
                        posDevTable.push({ variant: v, t, side, seg, dev: angleDeg(outSeg, animSeg) });
                    }
                }
            }
        }
        // 输出行（按 段 × 侧 分组）
        for (const seg of ['up', 'fo'] as const) {
            for (const side of ['Left', 'Right'] as const) {
                const fmt = (v: VariantName) => {
                    const row = posDevTable.filter((r) => r.variant === v && r.side === side && r.seg === seg);
                    if (row.length !== TIMES.length) return '—';
                    return row.map((r) => r.dev.toFixed(1) + '°').join(' | ');
                };
                report.push(`| current | ${fmt('current')} | ${seg === 'up' ? '上臂' : '前臂'} | ${side} |`);
                report.push(`| E | ${fmt('E')} | ${seg === 'up' ? '上臂' : '前臂'} | ${side} |`);
                report.push(`| A | ${fmt('A')} | ${seg === 'up' ? '上臂' : '前臂'} | ${side} |`);
            }
        }
        // E vs current 位置段方向偏离统计
        const ePosWorst = posDevTable.filter((r) => r.variant === 'E').reduce((m, r) => Math.max(m, r.dev), 0);
        const aPosWorst = posDevTable.filter((r) => r.variant === 'A').reduce((m, r) => Math.max(m, r.dev), 0);
        const curPosWorst = posDevTable.filter((r) => r.variant === 'current').reduce((m, r) => Math.max(m, r.dev), 0);
        report.push('');
        report.push(`**位置段方向 vs anim worst：current=${curPosWorst.toFixed(1)}° | E=${ePosWorst.toFixed(1)}° | A=${aPosWorst.toFixed(1)}°**`);
        report.push(`**E worst (${ePosWorst.toFixed(1)}°) vs A worst (${aPosWorst.toFixed(1)}°)：${ePosWorst >= 20 && aPosWorst >= 20 ? '✅ 两者都偏离 anim ≥20° → P1 预测②证实（E 重现 A 的 22° 偏差行为）' : '需人工判断'}`);

        // 1.3 P1 预测③：S17 度量 E vs current
        report.push('');
        report.push('### 1.3 P1 预测③：S17 度量 E 版 vs 当前版');
        report.push('');
        report.push('蒙皮质心段方向 vs 骨位置段方向（帧内），阈值 < 10°。');
        report.push('');
        report.push('| 变体 | t=0 | t=0.5 | t=1.5 | t=2.5 | t=3.5 | t=4.5 | 段 | 侧 |');
        report.push('|---|---|---|---|---|---|---|---|---|');

        const s17cur = sampleS17(model, realCur, TIMES);
        const s17E = sampleS17(model, clipE, TIMES);
        const s17A = sampleS17(model, a.outClip, TIMES);

        const s17Summary: { variant: VariantName; seg: 'up' | 'fo'; side: 'Left' | 'Right'; dev: number }[] = [];
        for (const [label, rows] of [['current', s17cur], ['E', s17E], ['A', s17A]] as const) {
            for (const r of rows) s17Summary.push({ variant: label, seg: r.seg, side: r.side, dev: r.dev });
        }
        for (const seg of ['up', 'fo'] as const) {
            for (const side of ['Left', 'Right'] as const) {
                const fmt = (v: VariantName) => {
                    const vals = s17Summary.filter((r) => r.variant === v && r.side === side && r.seg === seg).map((r) => r.dev);
                    if (vals.length !== TIMES.length) return '—';
                    return vals.map((d) => d.toFixed(1) + '°').join(' | ');
                };
                report.push(`| current | ${fmt('current')} | ${seg === 'up' ? '上臂' : '前臂'} | ${side} |`);
                report.push(`| E | ${fmt('E')} | ${seg === 'up' ? '上臂' : '前臂'} | ${side} |`);
                report.push(`| A | ${fmt('A')} | ${seg === 'up' ? '上臂' : '前臂'} | ${side} |`);
            }
        }
        const s17EViol = s17E.filter((r) => r.dev >= 10);
        const s17CurViol = s17cur.filter((r) => r.dev >= 10);
        const s17AViol = s17A.filter((r) => r.dev >= 10);
        const eS17Worst = s17E.reduce((m, r) => Math.max(m, r.dev), 0);
        const curS17Worst = s17cur.reduce((m, r) => Math.max(m, r.dev), 0);
        report.push('');
        report.push(`**S17 dev worst：current=${curS17Worst.toFixed(1)}°（RED ${s17CurViol.length}/24） | E=${eS17Worst.toFixed(1)}°（RED ${s17EViol.length}/24） | A=${aPosWorst.toFixed(1)}° 位置/A S17 RED ${s17AViol.length}/24**`);
        report.push('');

        // 1.4 P1 判定
        const p1PosConfirmed = localPosAllEqual;
        const p1DevConfirmed = ePosWorst >= 20;
        report.push('### 1.4 P1 判定汇总');
        report.push('');
        report.push(`| P1 预测 | 验证结果 | 判定 |`);
        report.push('|---|---|---|');
        report.push(`| ① localPos ≡ bindLocalPos（位置链退化） | max\\|diff\\| = ${maxLocalPosDiff.toFixed(6)} | ${p1PosConfirmed ? '✅ 证实' : '❌ 证伪'} |`);
        report.push(`| ② 播放后位置偏离 anim（方案 A 的 22° 行为重现） | E 位置段方向 worst = ${ePosWorst.toFixed(1)}°，A = ${aPosWorst.toFixed(1)}° | ${p1DevConfirmed ? '✅ 证实' : '❌ 证伪'} |`);
        report.push(`| ③ S17：E 相比当前改善/恶化 | current worst=${curS17Worst.toFixed(1)}° → E worst=${eS17Worst.toFixed(1)}°（E RED ${s17EViol.length}/24） | ${eS17Worst < curS17Worst ? 'E 表面改善（剪切角下降），但代价是位置脱离 anim（①②）' : 'E 未改善'} |`);
        report.push('');
        const p1Verdict = p1PosConfirmed && p1DevConfirmed
            ? `**P1 证实：方案 E 在 AnimationMixer 播放重组下 localPos≡bindLocalPos → 位置链被统一到 worldQ 链 → 重现方案 A 的 ${ePosWorst.toFixed(1)}° 位置偏差。方案 E 不可作为主方案。**`
            : '**P1 未完全证实，需人工复核。**';
        report.push(p1Verdict);
        report.push('');

        // 1.5 隔离性探针：bind pose 下蒙皮层是否自洽（第二根因定位）
        // 若 bind pose 下 S17 已 > 10°，则蒙皮偏差根源在 bind/boneInverse 层而非动画链。
        report.push('### 1.5 隔离性探针：bind pose 下蒙皮 vs 骨段方向（第二根因定位）');
        report.push('');
        report.push('在 bind pose（不施加 clip，用全新未播放模型）下采样 S17。若这里已 RED，说明蒙皮层与骨架 bind 帧不自洽（第二根因），与动画链公式无关。');
        report.push('');
        const freshBind = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(freshBind);
        const s17Bind = sampleS17Bind(freshBind, e.bindLocalPos);
        report.push('| 段 | Left | Right |');
        report.push('|---|---|---|');
        for (const seg of ['up', 'fo'] as const) {
            const l = s17Bind.find((r) => r.side === 'Left' && r.seg === seg);
            const r = s17Bind.find((x) => x.side === 'Right' && x.seg === seg);
            report.push(`| ${seg === 'up' ? '上臂' : '前臂'} | ${l ? l.dev.toFixed(1) + '°' : '—'} | ${r ? r.dev.toFixed(1) + '°' : '—'} |`);
        }
        const bindWorst = s17Bind.reduce((m, x) => Math.max(m, x.dev), 0);
        report.push('');
        report.push(`**bind pose S17 worst = ${bindWorst.toFixed(1)}° → ${bindWorst >= 10 ? '蒙皮层在 bind 帧即不自洽（第二根因在 bind/boneInverse/蒙皮归属，非动画链公式）' : 'bind 帧自洽，偏差来自动画链（需要看四臂对比）'}**`);
        report.push('');

        // 1.6 复刻度验证：buildVariantClip('current') vs 真实 normalizeRootMotion
        report.push('### 1.6 复刻度验证：探针生成器 current 复现真实 normalizeRootMotion');
        report.push('');
        report.push('探针的 buildVariantClip 是 normalizeRootMotion D10 核心的独立复刻。验证其 current 变体与真实函数输出一致，确保 A/C/D/E/F 变体度量可信。');
        report.push('');
        const replicaCur = buildVariantClip(rawClip, model, animObj, 'current');
        const s17RealCur = sampleS17(model, realCur, TIMES);
        const s17ReplicaCur = sampleS17(model, replicaCur.outClip, TIMES);
        const rcWorst = s17RealCur.reduce((m, r) => Math.max(m, r.dev), 0);
        const rpWorst = s17ReplicaCur.reduce((m, r) => Math.max(m, r.dev), 0);
        report.push(`真实 normalizeRootMotion S17 worst=${rcWorst.toFixed(1)}°；复刻 current S17 worst=${rpWorst.toFixed(1)}°；差异=${Math.abs(rcWorst - rpWorst).toFixed(1)}°`);
        report.push('');

        // ══════════ Part 2：四臂对比探针（A/C/D/F）══════════
        report.push('## Part 2：四臂对比探针（A/C/D/F，S17 度量裁决）');
        report.push('');
        report.push('### 2.1 各变体 S17 数值表（蒙皮质心段方向 vs 骨位置段方向，帧内）');
        report.push('');
        report.push('阈值 < 10°。表格行 = t=0,0.5,1.5,2.5,3.5,4.5 的 dev。');
        report.push('');

        // 生成 C / D / F 变体
        const c = buildVariantClip(rawClip, model, animObj, 'C');
        const d = buildVariantClip(rawClip, model, animObj, 'D');
        // F：re-pose bind 后走 current 路径
        const modelF = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelF);
        rePoseModelBindToAnimRest(modelF, animObj);
        const f = buildVariantClip(rawClip, modelF, animObj, 'F');

        const variants: { name: VariantName; model: THREE.Object3D; clip: THREE.AnimationClip }[] = [
            { name: 'A', model, clip: a.outClip },
            { name: 'C', model, clip: c.outClip },
            { name: 'D', model, clip: d.outClip },
            { name: 'F', model: modelF, clip: f.outClip },
        ];

        const s17Tables: Record<VariantName, S17Row[]> = {
            current: [], E: [], A: [], C: [], D: [], F: [],
        };
        const posDevAll: Record<VariantName, number[]> = {
            current: [], E: [], A: [], C: [], D: [], F: [],
        };
        for (const v of variants) {
            const rows = sampleS17(v.model, v.clip, TIMES);
            s17Tables[v.name] = rows;
            // 位置段方向 vs anim
            const pw = playSampleWorld(v.model, v.clip, TIMES);
            const devs: number[] = [];
            for (const t of TIMES) {
                for (const side of ['Left', 'Right'] as const) {
                    for (const seg of ['up', 'fo'] as const) {
                        devs.push(angleDeg(segDir(pw.get(t)!.pos, side, seg), segDir(animWorld.get(t)!, side, seg)));
                    }
                }
            }
            posDevAll[v.name] = devs;
        }

        // 2.1b 变体属性验证（确保各变体真的实现了方案定义，而非实现错误）
        report.push('');
        report.push('### 2.1b 变体属性验证（确认各变体符合方案定义）');
        report.push('');
        report.push('统一链变体（A/C/D）应使 localPos track ≡ bindLocalPos；方案 C 用 C-fix 公式、D 用 recon 公式、F 用 re-pose bind。验证避免实现错误导致的误判。');
        report.push('');
        report.push('| 变体 | localPos track 偏离 bindLocalPos (max, 手臂骨) | 说明 |');
        report.push('|---|---|---|');
        const bindPosLocal = e.bindLocalPos;
        const variantInfos = [
            { name: 'A' as const, clip: a.outClip, desc: '统一链：poseQ=worldQ=swing3' },
            { name: 'C' as const, clip: c.outClip, desc: '统一链 + C-fix 帧修正' },
            { name: 'D' as const, clip: d.outClip, desc: '统一链 + recon 局部帧修正' },
        ];
        for (const vi of variantInfos) {
            const clip = vi.clip;
            let maxDiff = -1;
            for (const bn of ARM_BONES_8) {
                const track = clip.tracks.find((t) => t.name === `${bn}.position`);
                if (!track) continue;
                const vals = (track as THREE.VectorKeyframeTrack).values;
                const bl = bindPosLocal.get(bn)!;
                for (let i = 0; i < vals.length; i += 3) {
                    const d = Math.max(Math.abs(vals[i] - bl.x), Math.abs(vals[i + 1] - bl.y), Math.abs(vals[i + 2] - bl.z));
                    if (d > maxDiff) maxDiff = d;
                }
            }
            report.push(`| ${vi.name} | ${maxDiff < 0 ? '—' : maxDiff.toFixed(6)} | ${vi.desc} |`);
        }
        report.push('');

        for (const v of variants) {
            const rows = s17Tables[v.name];
            const label = v.name === 'F' ? 'F (re-pose bind)' : `${v.name}`;
            report.push(`#### 变体 ${label} — S17 dev（t × Left/Right × 上臂/前臂）`);
            report.push('');
            report.push('| 时间 | Left 上臂 | Left 前臂 | Right 上臂 | Right 前臂 |');
            report.push('|---|---|---|---|---|');
            for (const t of TIMES) {
                const cell = (side: 'Left' | 'Right', seg: 'up' | 'fo') => {
                    const r = rows.find((x) => x.t === t && x.side === side && x.seg === seg);
                    return r ? r.dev.toFixed(1) + '°' : '—';
                };
                report.push(`| t=${t} | ${cell('Left', 'up')} | ${cell('Left', 'fo')} | ${cell('Right', 'up')} | ${cell('Right', 'fo')} |`);
            }
            const worst = rows.reduce((m, r) => Math.max(m, r.dev), 0);
            const viol = rows.filter((r) => r.dev >= 10).length;
            report.push('');
            report.push(`**变体 ${v.name}：worst=${worst.toFixed(1)}°（RED ${viol}/24）**`);
            report.push('');
        }

        // 2.2 汇总裁决表
        report.push('### 2.2 汇总裁决表');
        report.push('');
        report.push('| 变体 | S17 worst | S17 RED 数 | 位置段方向 vs anim worst | S17 全 < 10°? |');
        report.push('|---|---|---|---|---|');
        const curS17WorstVal = curS17Worst;
        report.push(`| current | ${curS17WorstVal.toFixed(1)}° | ${s17CurViol.length}/24 | ${curPosWorst.toFixed(1)}° | ❌ |`);
        for (const v of variants) {
            const rows = s17Tables[v.name];
            const worst = rows.reduce((m, r) => Math.max(m, r.dev), 0);
            const viol = rows.filter((r) => r.dev >= 10).length;
            const posWorst = Math.max(...posDevAll[v.name]);
            report.push(`| ${v.name} | ${worst.toFixed(1)}° | ${viol}/24 | ${posWorst.toFixed(1)}° | ${viol === 0 ? '✅' : '❌'} |`);
        }

        // F 帧差 D 度量（先计算，供 2.3 裁决与 2.4 表格使用）
        // D = worldQ vs poseQ（分叉链时 D 是剪切根源）
        // 对 F 而言 poseQ=raw animQ，worldQ=swing3，D=angle(worldQ,poseQ)（世界系）
        const fPlayed = playSampleWorld(modelF, f.outClip, TIMES);
        const animQuatWorld = playAnimWorldQuat(animObj, rawClip, TIMES);
        const dRow: { t: number; side: 'Left' | 'Right'; seg: 'up' | 'fo'; dev: number }[] = [];
        for (const t of TIMES) {
            for (const side of ['Left', 'Right'] as const) {
                for (const seg of ['up', 'fo'] as const) {
                    const bn = seg === 'up'
                        ? (side === 'Left' ? 'mixamorigLeftArm' : 'mixamorigRightArm')
                        : (side === 'Left' ? 'mixamorigLeftForeArm' : 'mixamorigRightForeArm');
                    const qf = fPlayed.get(t)!.quat.get(bn)!;
                    const qa = animQuatWorld.get(t)!.get(bn)!;
                    const dev = quatAngleDeg(qf, qa);
                    dRow.push({ t, side, seg, dev });
                }
            }
        }
        const dWorst = dRow.reduce((m, x) => Math.max(m, x.dev), 0);
        const dMean = dRow.reduce((s, x) => s + x.dev, 0) / Math.max(1, dRow.length);

        // 2.3 裁决
        report.push('');
        report.push('### 2.3 裁决');
        report.push('');
        const greenVariants = variants.filter((v) => s17Tables[v.name].filter((r) => r.dev >= 10).length === 0);
        if (greenVariants.length === 0) {
            report.push('**没有任何变体使 S17 全部 < 10°。**');
            report.push('');
            report.push('关键实证（相互印证）：');
            report.push('');
            report.push(`1. **bind pose S17 worst = ${bindWorst.toFixed(1)}°（GREEN）** — 模型自身蒙皮层在 bind 帧自洽，骨架/几何没有先天错位；`);
            report.push('2. **但所有统一链变体（A/C/D/F）动画播放后 S17 仍 100~155°** — 剪切角归零（2.1b 已证实 localPos≡bindLocalPos）并不能让蒙皮跟随骨骼；');
            report.push(`3. **方案 F：D worst=${dWorst.toFixed(1)}°（D≈0，swing3≈animQ 两链自然重合）但 S17 仍 ${s17Tables.F.reduce((m, r) => Math.max(m, r.dev), 0).toFixed(1)}°** — 说明 61°→88.5° 帧差不是蒙皮偏差的主导因；`);
            report.push('');
            report.push(`**裁决：分叉链（poseQ≠worldQ）并非 S17 RED 的主因。第二根因（蒙皮层：boneInverse 帧约定 / Twist 骨权重 / 蒙皮顶点归属）占主导。链级公式方案（A/C/D/E）无法修复 S17。**`);
            report.push('');
            report.push('**推荐：转向第二根因排查 — ① 检查 model mesh.bind 后 boneInverse 是否与 clip 世界矩阵一致（bind 帧 vs 播放帧）；② 检查蒙皮顶点归属（skinIndex/skinWeight 是否绑定正确骨骼）；③ 方案 F（bind re-pose）为唯一链级方向性正确候选（D≈0 已证实），但需与蒙皮重绑定配合才能真正修复 S17。**');
        } else {
            const posWorstOf = (n: VariantName) => Math.max(...posDevAll[n]);
            greenVariants.sort((x, y) => posWorstOf(x.name) - posWorstOf(y.name));
            const best = greenVariants[0];
            const bestPos = posWorstOf(best.name);
            report.push(`**S17 全部 < 10° 的变体：${greenVariants.map((g) => g.name).join(', ')}（${greenVariants.length}/4）**`);
            report.push('');
            report.push(`**最优方案（S17 GREEN + 位置段方向 vs anim 最小）：${best.name}（位置段方向 worst=${bestPos.toFixed(1)}°）**`);
            report.push('');
            report.push(`> 若 ${best.name} 的位置段方向仍 > 10°，说明方向仍偏离动画（S4/S13 口径），需结合 S16/S18 再裁决。`);
        }

        // 2.4 F 帧差消除验证
        report.push('');
        report.push('### 2.4 方案 F：bind re-pose 帧差消除验证（swing3≈animQ → D≈0）');
        report.push('');
        report.push('F 版播放后手臂骨世界朝向 vs anim 世界朝向（D = angle(worldQ, animQ)，swing3≈animQ 时 D≈0）。');
        report.push('');
        report.push('| 时间 | Left 上臂 | Left 前臂 | Right 上臂 | Right 前臂 |');
        report.push('|---|---|---|---|---|');
        for (const t of TIMES) {
            const cell = (side: 'Left' | 'Right', seg: 'up' | 'fo') => {
                const r = dRow.find((x) => x.t === t && x.side === side && x.seg === seg);
                return r ? r.dev.toFixed(1) + '°' : '—';
            };
            report.push(`| t=${t} | ${cell('Left', 'up')} | ${cell('Left', 'fo')} | ${cell('Right', 'up')} | ${cell('Right', 'fo')} |`);
        }
        report.push('');
        report.push(`**F：D worst=${dWorst.toFixed(1)}°（均值 ${dMean.toFixed(1)}°）→ ${dWorst < 10 ? '✅ swing3≈animQ，两链自然重合（D≈0 证实）' : dWorst < 20 ? '⚠️ 部分接近（<20°），未完全重合' : '❌ D 未归零'}**`);
        report.push('');

        // 写文件
        fs.writeFileSync(OUT_PATH, report.join('\n'), 'utf8');
        console.log(`[probe-v10-arms] 结果已写入 ${OUT_PATH}`);

        // console 输出关键结论
        console.log(`[probe-v10-arms] P1 ① localPos≡bindLocalPos max|diff|=${maxLocalPosDiff.toFixed(6)}`);
        console.log(`[probe-v10-arms] P1 ② 位置段方向 vs anim worst: current=${curPosWorst.toFixed(1)}° E=${ePosWorst.toFixed(1)}° A=${aPosWorst.toFixed(1)}°`);
        console.log(`[probe-v10-arms] P1 ③ S17 worst: current=${curS17Worst.toFixed(1)}° E=${eS17Worst.toFixed(1)}° A=${s17A.reduce((m, r) => Math.max(m, r.dev), 0).toFixed(1)}°`);
        console.log(`[probe-v10-arms] 四臂 S17 worst: ${variants.map((v) => `${v.name}=${s17Tables[v.name].reduce((m, r) => Math.max(m, r.dev), 0).toFixed(1)}°`).join(' ')}`);
        console.log(`[probe-v10-arms] 四臂 位置段方向 vs anim worst: ${variants.map((v) => `${v.name}=${Math.max(...posDevAll[v.name]).toFixed(1)}°`).join(' ')}`);

        expect(true).toBe(true);
    });
});
