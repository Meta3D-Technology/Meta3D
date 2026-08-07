/**
 * tmp-s17-diag — S17 偏差构成诊断探针（临时，分析用）
 *
 * 分解 S17 dev = angle(segBone, segSkin) 的构成：
 *   A. segBone vs animSegDir：骨骼位置段方向 vs 动画真实段方向（位置链 quality）
 *   B. segSkin vs animSegDir：蒙皮质心段方向 vs 动画真实段方向（蒙皮链 quality）
 *   C. segBone vs segSkin：S17 断言本身
 *   D. 刚性假设：如果蒙皮质心严格随骨（质心在骨上的 bind 偏移被 R_bone 旋转），
 *      segSkin_rigid 应该是什么，与实际 segSkin 差多少（蒙皮 blend 失真）
 *   E. cluster 质心偏移：每骨 cluster 质心相对骨位置的 bind 偏移量/方向（mesh 固有）
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "tmp-s17-diag" --forceExit
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
const S17_BONES = [
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
function fmtV(v: THREE.Vector3): string { return `(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`; }

function firstMesh(root: THREE.Object3D): THREE.SkinnedMesh {
    let mesh: THREE.SkinnedMesh | null = null;
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh; });
    if (!mesh) throw new Error('no skinned mesh');
    return mesh;
}

/** 正确 CPU 蒙皮（.array 直读，d5 语义：bindMatrix → boneMat → bindMatrixInverse → matrixWorld） */
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

/** cluster 质心 = Σ w·vSkin / Σ w（累计权重 ≥ threshold，d5 语义） */
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

test('tmp-s17-diag: S17 偏差构成分解', () => {
    const report: string[] = [];
    report.push('# TMP-S17-DIAG — S17 偏差构成分解');
    report.push('');
    report.push('## A/B/C：每帧 segBone/segSkin vs 动画真实段方向');
    report.push('');

    const model = parseFreshFbx(MODEL_FBX);
    convertTripoToMixamo(model);
    const mesh = firstMesh(model);

    // ── S0 原始 A-pose bind（未 re-pose，identity 蒙皮）──
    report.push('## S0：原始 A-pose bind 帧（identity 蒙皮 = 原始顶点）');
    report.push('');
    model.updateMatrixWorld(true);
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => { if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone); });
    const bindPos = new Map<string, THREE.Vector3>();
    for (const [bn, b] of boneByName) bindPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const origPos = (posAttr.array as Float32Array).slice();
    const meshWorld0 = mesh.matrixWorld.clone();
    const nVerts = posAttr.count;
    const pos0: THREE.Vector3[] = new Array(nVerts);
    for (let i = 0; i < nVerts; i++) pos0[i] = new THREE.Vector3(origPos[i * 3], origPos[i * 3 + 1], origPos[i * 3 + 2]).applyMatrix4(meshWorld0);
    const c0 = skinClusterCentroid(mesh, pos0, S17_BONES, 0.3);
    // 每骨 cluster 质心偏移（bind，mesh 固有）
    report.push('| 骨 | cluster 质心 | 骨位置 | 偏移向量 | 偏移长度 |');
    report.push('|---|---|---|---|---|');
    for (const bn of S17_BONES) {
        const c = c0.get(bn)!;
        const p = bindPos.get(bn)!;
        const off = c.clone().sub(p);
        report.push(`| ${bn} | ${fmtV(c)} | ${fmtV(p)} | ${fmtV(off)} | ${off.length().toFixed(4)} |`);
    }
    report.push('');
    for (const side of ['Left', 'Right'] as const) {
        const sh = `mixamorig${side}Shoulder`;
        const fo = `mixamorig${side}ForeArm`;
        const ha = `mixamorig${side}Hand`;
        const segBoneUp = bindPos.get(fo)!.clone().sub(bindPos.get(sh)!).normalize();
        const segSkinUp = c0.get(fo)!.clone().sub(c0.get(sh)!).normalize();
        const segBoneFo = bindPos.get(ha)!.clone().sub(bindPos.get(fo)!).normalize();
        const segSkinFo = c0.get(ha)!.clone().sub(c0.get(fo)!).normalize();
        report.push(`| ${side} 上臂 | segBone=${fmtV(segBoneUp)} segSkin=${fmtV(segSkinUp)} dev=${angleDeg(segBoneUp, segSkinUp).toFixed(1)}° |`);
        report.push(`| ${side} 前臂 | segBone=${fmtV(segBoneFo)} segSkin=${fmtV(segSkinFo)} dev=${angleDeg(segBoneFo, segSkinFo).toFixed(1)}° |`);
    }
    report.push('');

    // ── normalizeRootMotion + 播放 ──
    const animObj = parseFreshFbx(ANIM_FBX);
    const rawClip = animObj.animations[0];
    const clip = normalizeRootMotion(rawClip, model, animObj);
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();

    // 动画骨架真实段方向（S_w 采样）
    const animSkeleton = animObj;
    const animBone = new Map<string, THREE.Bone>();
    animSkeleton.traverse((n) => { if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone); });
    // 播放 normalizedClip 到动画骨架，得到 anim 真实段方向
    const animMixer = new THREE.AnimationMixer(animSkeleton);
    const animAction = animMixer.clipAction(rawClip);
    animAction.reset();
    animAction.play();

    report.push('## A/B/C：播放帧 segBone vs animSegDir vs segSkin');
    report.push('');
    report.push('| t | side | seg | segBone | segSkin | animSeg | A:boneVsAnim | B:skinVsAnim | C:S17 |');
    report.push('|---|---|---|---|---|---|---|---|---|');
    let worstA = 0, worstB = 0, worstC = 0;
    for (const t of TIMES) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        animMixer.setTime(t);
        animSkeleton.updateMatrixWorld(true);
        const animPos = new Map<string, THREE.Vector3>();
        for (const [bn, b] of animBone) animPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
        const boneMat = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) boneMat.set(bn, b.matrixWorld.clone());
        const skinned = skinCorrectCPU(mesh, boneMat);
        const c = skinClusterCentroid(mesh, skinned, S17_BONES, 0.3);
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const pSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
            const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            const aUp = animPos.get(fo)!.clone().sub(animPos.get(sh)!).normalize();
            const aFo = animPos.get(ha)!.clone().sub(animPos.get(fo)!).normalize();
            // 上臂
            const segBoneUp = pFo.clone().sub(pSh).normalize();
            const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
            const Aup = angleDeg(segBoneUp, aUp);
            const Bup = angleDeg(segSkinUp, aUp);
            const Cup = angleDeg(segBoneUp, segSkinUp);
            worstA = Math.max(worstA, Aup); worstB = Math.max(worstB, Bup); worstC = Math.max(worstC, Cup);
            report.push(`| ${t} | ${side} | 上臂 | ${fmtV(segBoneUp)} | ${fmtV(segSkinUp)} | ${fmtV(aUp)} | ${Aup.toFixed(1)}° | ${Bup.toFixed(1)}° | ${Cup.toFixed(1)}° |`);
            // 前臂
            const segBoneFo = pHa.clone().sub(pFo).normalize();
            const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
            const Afo = angleDeg(segBoneFo, aFo);
            const Bfo = angleDeg(segSkinFo, aFo);
            const Cfo = angleDeg(segBoneFo, segSkinFo);
            worstA = Math.max(worstA, Afo); worstB = Math.max(worstB, Bfo); worstC = Math.max(worstC, Cfo);
            report.push(`| ${t} | ${side} | 前臂 | ${fmtV(segBoneFo)} | ${fmtV(segSkinFo)} | ${fmtV(aFo)} | ${Afo.toFixed(1)}° | ${Bfo.toFixed(1)}° | ${Cfo.toFixed(1)}° |`);
        }
    }
    report.push('');
    report.push(`worst A(segBone vs anim)=${worstA.toFixed(1)}°  worst B(segSkin vs anim)=${worstB.toFixed(1)}°  worst C(S17)=${worstC.toFixed(1)}°`);
    report.push('');

    // ── D/E：刚性假设 ──
    // 在 t=1.5 计算：若 cluster 顶点严格随 bone（R_bone 旋转 bind 偏移），segSkin_rigid 与实际的差。
    report.push('## D：刚性假设（t=1.5）— segSkin_rigid = 骨位置 + R_bone·bind偏移');
    report.push('');
    {
        const t = 1.5;
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        const boneMat = new Map<string, THREE.Matrix4>();
        const boneQ = new Map<string, THREE.Quaternion>();
        for (const [bn, b] of boneByName) {
            boneMat.set(bn, b.matrixWorld.clone());
            boneQ.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
        }
        const skinned = skinCorrectCPU(mesh, boneMat);
        const c = skinClusterCentroid(mesh, skinned, S17_BONES, 0.3);
        // rigid: 把每骨 cluster 顶点按「当前骨世界 R」旋转其 bind 位置（相对骨 bind 位置）
        // centroid_rigid = p_bone(t) + R_bone(t)·(centroid_bind − bindPos_bone)
        const cRigid = new Map<string, THREE.Vector3>();
        for (const bn of S17_BONES) {
            const cb = c0.get(bn)!.clone();
            const bp = bindPos.get(bn)!;
            const pNow = boneByName.get(bn)!.getWorldPosition(new THREE.Vector3());
            const R = boneQ.get(bn)!;
            const off = cb.clone().sub(bp);
            cRigid.set(bn, pNow.clone().add(off.applyQuaternion(R)));
        }
        report.push('| side | seg | segSkin(实际) | segSkin_rigid | dev(实际) | dev(rigid) | Δ |');
        report.push('|---|---|---|---|---|---|---|');
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const pSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
            const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            const segBoneUp = pFo.clone().sub(pSh).normalize();
            const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
            const segRigidUp = cRigid.get(fo)!.clone().sub(cRigid.get(sh)!).normalize();
            const dActUp = angleDeg(segBoneUp, segSkinUp);
            const dRigUp = angleDeg(segBoneUp, segRigidUp);
            report.push(`| ${side} | 上臂 | ${fmtV(segSkinUp)} | ${fmtV(segRigidUp)} | ${dActUp.toFixed(1)}° | ${dRigUp.toFixed(1)}° | ${(dActUp - dRigUp).toFixed(1)}° |`);
            const segBoneFo = pHa.clone().sub(pFo).normalize();
            const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
            const segRigidFo = cRigid.get(ha)!.clone().sub(cRigid.get(fo)!).normalize();
            const dActFo = angleDeg(segBoneFo, segSkinFo);
            const dRigFo = angleDeg(segBoneFo, segRigidFo);
            report.push(`| ${side} | 前臂 | ${fmtV(segSkinFo)} | ${fmtV(segRigidFo)} | ${dActFo.toFixed(1)}° | ${dRigFo.toFixed(1)}° | ${(dActFo - dRigFo).toFixed(1)}° |`);
        }
        report.push('');
        report.push('注：rigid 假设 = 若蒙皮 blend 无损（质心偏移严格随 bone R 旋转），S17 应达到的数值。');
        report.push('Δ = 实际 − rigid = 蒙皮 blend/权重分布的额外失真。');
        report.push('');
    }

    // ── E：swing3 公式目标验证 ──
    // 每骨 meshDir = worldQ(bone,t)·bindQ(bone)⁻¹·bindSegDir（公式构造目标）vs animSegDir(t)
    // 若 E≈0 → 公式方向对齐正确，S17 偏差全部来自「cluster 质心 ≠ 骨位置」的网格/权重几何。
    // bindQ/bindDir 必须来自同一 bind 帧（re-pose 后，normalizeRootMotion 内部采样基准）。
    report.push('## E：swing3 公式目标验证（每骨 meshDir vs animSegDir）');
    report.push('');
    report.push('| t | side | 骨 | meshDir(formula) | animSegDir | dev |');
    report.push('|---|---|---|---|---|---|');
    model.updateMatrixWorld(true);
    const bindQ = new Map<string, THREE.Quaternion>();
    const bindDir = new Map<string, THREE.Vector3>();
    for (const side of ['Left', 'Right'] as const) {
        const sh = `mixamorig${side}Shoulder`;
        const fo = `mixamorig${side}ForeArm`;
        const ha = `mixamorig${side}Hand`;
        for (const bn of [sh, fo] as const) {
            const b = boneByName.get(bn)!;
            bindQ.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
        }
        bindDir.set(sh, boneByName.get(fo)!.getWorldPosition(new THREE.Vector3()).sub(boneByName.get(sh)!.getWorldPosition(new THREE.Vector3())).normalize());
        bindDir.set(fo, boneByName.get(ha)!.getWorldPosition(new THREE.Vector3()).sub(boneByName.get(fo)!.getWorldPosition(new THREE.Vector3())).normalize());
    }
    let worstE = 0;
    for (const t of TIMES) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        const animPos = new Map<string, THREE.Vector3>();
        for (const [bn, ab] of animBone) animPos.set(bn, ab.getWorldPosition(new THREE.Vector3()));
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            for (const [bn, dwn] of [[sh, fo], [fo, ha]] as const) {
                const bone = boneByName.get(bn)!;
                const wq = bone.getWorldQuaternion(new THREE.Quaternion());
                const meshDir = bindDir.get(bn)!.clone().applyQuaternion(bindQ.get(bn)!.clone().invert()).applyQuaternion(wq).normalize();
                const animDir = animPos.get(dwn)!.clone().sub(animPos.get(bn)!).normalize();
                const d = angleDeg(meshDir, animDir);
                worstE = Math.max(worstE, d);
                report.push(`| ${t} | ${side} | ${bn} | ${fmtV(meshDir)} | ${fmtV(animDir)} | ${d.toFixed(2)}° |`);
            }
        }
    }
    report.push('');
    report.push(`worst E(meshDir vs animDir) = ${worstE.toFixed(2)}° ${worstE < 1 ? '→ 公式方向对齐正确' : '→ 公式有偏差'}`);
    report.push('');

    // ── F：理想 retarget 蒙皮 ──
    // 用动画骨架自身世界矩阵 S_w 蒙皮（等同「完美 retarget 的骨骼朝向」），
    // segSkin_vs_anim 仍 >10° → 数学上不可达，纯网格/权重 floor。
    // ⚠️ boneInverse 是模型 bind 的，anim world 矩阵在模型 bind 系下不可直接相乘，
    //    需把 anim bone world 旋转映射到模型 bind 系：R_model(t) = animR(t)·animBindR⁻¹·modelBindR。
    report.push('## F：理想 retarget 蒙皮（animR·animBindR⁻¹·modelBindR，等同骨骼完美跟随动画）');
    report.push('');
    report.push('| t | side | seg | segBone(anim系) | segSkin_ideal | dev |');
    report.push('|---|---|---|---|---|---|');
    let worstF = 0;
    // bindQ 全骨补齐（E 只存了手臂 8 骨，F 需要全部骨骼）
    for (const [bn, bone] of boneByName) {
        if (!bindQ.has(bn)) bindQ.set(bn, bone.getWorldQuaternion(new THREE.Quaternion()));
    }
    for (const t of TIMES) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        animMixer.setTime(t);
        animSkeleton.updateMatrixWorld(true);
        const animR = new Map<string, THREE.Quaternion>();
        for (const [bn, ab] of animBone) animR.set(bn, ab.getWorldQuaternion(new THREE.Quaternion()));
        // 模型 bind 系（re-pose 后）的 anim 映射 R
        const idealQ = new Map<string, THREE.Quaternion>();
        for (const [bn] of boneByName) {
            const ab = animBone.get(bn);
            if (!ab) continue;
            const rq = ab.getWorldQuaternion(new THREE.Quaternion()); // animBindR（播放前 rest，非 clip 驱动）
            idealQ.set(bn, rq.clone().invert().multiply(animR.get(bn)!).multiply(bindQ.get(bn)!));
        }
        // 构造 ideal bone matrixWorld（位置用播放后骨位置，旋转用 idealQ）
        const idealMat = new Map<string, THREE.Matrix4>();
        for (const [bn, bone] of boneByName) {
            const p = bone.getWorldPosition(new THREE.Vector3());
            idealMat.set(bn, new THREE.Matrix4().compose(p, idealQ.get(bn)!, new THREE.Vector3(1, 1, 1)));
        }
        const skinned = skinCorrectCPU(mesh, idealMat);
        const c = skinClusterCentroid(mesh, skinned, S17_BONES, 0.3);
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const pSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
            const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            const segBoneUp = pFo.clone().sub(pSh).normalize();
            const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
            const segBoneFo = pHa.clone().sub(pFo).normalize();
            const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
            const dup = angleDeg(segBoneUp, segSkinUp);
            const dfo = angleDeg(segBoneFo, segSkinFo);
            worstF = Math.max(worstF, dup, dfo);
            report.push(`| ${t} | ${side} | 上臂 | ${fmtV(segBoneUp)} | ${fmtV(segSkinUp)} | ${dup.toFixed(1)}° |`);
            report.push(`| ${t} | ${side} | 前臂 | ${fmtV(segBoneFo)} | ${fmtV(segSkinFo)} | ${dfo.toFixed(1)}° |`);
        }
    }
    report.push('');
    report.push(`worst F(理想 retarget 蒙皮) = ${worstF.toFixed(1)}° ${worstF < 10 ? '→ 理想可过 10°' : '→ 理想仍 >10°，纯网格/权重 floor，数学上不可达 10°'}`);
    report.push('');

    fs.writeFileSync(path.join(__dirname, 'TMP-S17-DIAG-RESULT.md'), report.join('\n'), 'utf8');
    console.log(report.join('\n'));
    expect(worstC).toBeGreaterThan(0); // 非空断言，探针仅输出
});
