/**
 * probe-v11-skin — 第十一轮：顶点级探针（骨骼对 / 蒙皮错 实锤）
 *
 * 背景：方案 F re-pose 只改了骨骼 local transform + 重建 boneInverse，
 * 但 geometry position attribute（顶点 v）没变，还是原始 Tripo A-pose 帧顶点坐标。
 * 推论：
 *   骨骼处于「新 bind 帧」（re-pose 后姿态）时：
 *     boneMat = matrixWorld_new × boneInverse_new = I
 *     → 蒙皮输出 = bindMatrixInverse × bindMatrix × v = v（原始 A-pose 顶点）
 *     → 蒙皮纹丝不动停在 A-pose，骨骼却已下垂 → 「骨骼对、蒙皮错」。
 *
 * 本探针四组指标（全部在「新 bind 帧 = re-pose 后、未播放」测量）：
 *   S1 skinStuckAtApose：GPU 等价蒙皮输出(world) vs 原始顶点经 mesh.matrixWorld(world) 的最大距离
 *     → RED 期预期 < 1e-3（蒙皮停在 A-pose）；GREEN 期应 > 1e-1（蒙皮已跟随新帧）
 *   S2 boneDroop：re-pose 前后手臂骨段方向变化角（Shoulder→ForeArm / ForeArm→Hand）
 *     → 应 > 15°（骨骼确实从 A-pose 下垂到动画帧）
 *   S3 skinVsBone S17：蒙皮 cluster 质心段方向 vs 骨骼段方向夹角（上臂/前臂 × Left/Right）
 *     → RED 期预期 40°+（蒙皮 A-pose 段方向 vs 骨骼下垂段方向）；GREEN 期应 < 15°
 *   S4 播放帧复验：t=0 / t=1.5 播放后 S17（确认修复后播放帧蒙皮跟随骨骼）
 *
 * 约束：不修改 src/。复用 probe-v10 的 gpuSkin 思路（含 bindMatrix 全链，.array 直读）。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v11-skin" --forceExit
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
const OUT_PATH = path.join(__dirname, 'PROBE-V11-SKIN-RESULT.md');

const ARM8 = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;
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
function fmtV(v: THREE.Vector3): string { return `(${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)})`; }
function fmtM(m: THREE.Matrix4): string {
    const e = m.elements;
    return `[${e.map((x) => x.toFixed(3)).join(',')}]`;
}

function firstMesh(root: THREE.Object3D): THREE.SkinnedMesh {
    let mesh: THREE.SkinnedMesh | null = null;
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh; });
    if (!mesh) throw new Error('no skinned mesh');
    return mesh;
}
function boneWorldPos(root: THREE.Object3D, name: string): THREE.Vector3 {
    let pos = new THREE.Vector3();
    root.traverse((n) => { if ((n as THREE.Bone).isBone && n.name === name) pos = (n as THREE.Bone).getWorldPosition(new THREE.Vector3()); });
    return pos;
}


/**
 * GPU 等价蒙皮（three r159 skinning_vertex.glsl 全链，含 bindMatrix）：
 *   skinVertex = bindMatrix × v
 *   skinned    = Σ w·boneMat(skinIndex)·skinVertex    boneMat(i)=matrixWorld(bone_i)×boneInverse(i)
 *   out        = bindMatrixInverse × skinned          （mesh-local）
 * 返回 world 坐标（再 × mesh.matrixWorld）。
 */
function gpuSkinWorld(
    mesh: THREE.SkinnedMesh,
    boneMatWorld: Map<string, THREE.Matrix4>,
): THREE.Vector3[] {
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const n = posAttr.count;
    const bmFwd = mesh.bindMatrix;
    const bmInv = mesh.bindMatrix.clone().invert();
    const out: THREE.Vector3[] = new Array(n);
    const v = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        v.fromBufferAttribute(posAttr as any, i);
        v.applyMatrix4(bmFwd); // skinVertex = bindMatrix × v
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const w = wa[i * 4 + k];
            if (w === 0) continue;
            const bi = ia[i * 4 + k];
            const bone = sk.bones[bi];
            if (!bone) continue;
            const m = boneMatWorld.get(bone.name);
            if (!m) continue;
            boneMat.copy(m).multiply(sk.boneInverses[bi]);
            acc.addScaledVector(v.clone().applyMatrix4(boneMat), w);
        }
        acc.applyMatrix4(bmInv); // bindMatrixInverse × skinned
        acc.applyMatrix4(mesh.matrixWorld); // mesh-local → world
        out[i] = acc.clone();
    }
    return out;
}

/** S17 cluster 质心（d5 语义）：骨 b 的 cluster = 累计权重 ≥ threshold 的顶点；质心 = Σ w·vSkin / Σ w */
function skinClusterCentroid(
    mesh: THREE.SkinnedMesh,
    vSkin: THREE.Vector3[],
    boneNames: readonly string[],
    threshold: number,
): Map<string, THREE.Vector3> {
    const sk = mesh.skeleton;
    const idxAttr = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
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

/** S17：蒙皮 cluster 质心段方向 vs 骨骼段方向夹角（°） */
function s17Dev(
    c: Map<string, THREE.Vector3>,
    boneP: (name: string) => THREE.Vector3,
): Record<string, number> {
    const dev: Record<string, number> = {};
    for (const side of ['Left', 'Right'] as const) {
        const sh = `mixamorig${side}Shoulder`;
        const fo = `mixamorig${side}ForeArm`;
        const ha = `mixamorig${side}Hand`;
        const pSh = boneP(sh);
        const pFo = boneP(fo);
        const pHa = boneP(ha);
        dev[`${side}上臂`] = angleDeg(pFo.clone().sub(pSh), c.get(fo)!.clone().sub(c.get(sh)!));
        dev[`${side}前臂`] = angleDeg(pHa.clone().sub(pFo), c.get(ha)!.clone().sub(c.get(fo)!));
    }
    return dev;
}

describe('probe-v11-skin', () => {
    test('顶点级：蒙皮停在 A-pose vs 骨骼 re-pose（S1/S2/S3/S4）', () => {
        const report: string[] = [];
        report.push('# PROBE-V11-SKIN-RESULT');
        report.push('');
        report.push('> 第十一轮顶点级探针：验证「骨骼对 / 蒙皮错」——re-pose 后（新 bind 帧、未播放）蒙皮顶点是否停留在原始 A-pose 位置');
        report.push(`> 模型：${path.basename(MODEL_FBX)}；动画：${path.basename(ANIM_FBX)}`);
        report.push('');

        // ── 1. 完整 demo 链路 ──
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const mesh = firstMesh(model);

        // 捕获 re-pose 前（原始 Tripo A-pose bind 帧）状态
        model.updateMatrixWorld(true);
        const oldBonePos = new Map<string, THREE.Vector3>();
        const oldSegDir: Record<string, THREE.Vector3> = {};
        for (const bn of ARM8) oldBonePos.set(bn, boneWorldPos(model, bn));
        for (const side of ['Left', 'Right'] as const) {
            oldSegDir[`${side}up`] = oldBonePos.get(`mixamorig${side}ForeArm`)!.clone().sub(oldBonePos.get(`mixamorig${side}Shoulder`)!);
            oldSegDir[`${side}fo`] = oldBonePos.get(`mixamorig${side}Hand`)!.clone().sub(oldBonePos.get(`mixamorig${side}ForeArm`)!);
        }
        // 原始 position attribute 副本（A-pose 顶点）
        const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
        const origPos = (posAttr.array as Float32Array).slice();
        const nVerts = posAttr.count;
        const meshWorld0 = mesh.matrixWorld.clone();
        report.push(`- 顶点数=${nVerts}；mesh.matrixWorld=${fmtM(meshWorld0)}（bindMatrix=${fmtM(mesh.bindMatrix)}）`);
        report.push('');

        // ── 1.5 S0：原始 A-pose bind 帧 S17（模型固有对齐质量，判定 10° 是否可达）──
        // 原始 bind：boneMat = MW_old × Inv_old = I → 蒙皮输出 = bindMatrix⁻¹·bindMatrix·v = v（原始顶点）
        // 因此直接用 origPos×meshWorld 作蒙皮输出，与原始骨位置段方向比。
        {
            report.push('## S0：原始 A-pose bind 帧 S17（模型固有 floor）');
            report.push('');
            const pos0: THREE.Vector3[] = new Array(nVerts);
            for (let i = 0; i < nVerts; i++) pos0[i] = new THREE.Vector3(origPos[i * 3], origPos[i * 3 + 1], origPos[i * 3 + 2]).applyMatrix4(meshWorld0);
            const c0 = skinClusterCentroid(mesh, pos0, S17_BONES, 0.3);
            const dev0 = s17Dev(c0, (name) => oldBonePos.get(name)!.clone());
            report.push('| 段 | Left | Right |');
            report.push('|---|---|---|');
            for (const seg of ['上臂', '前臂'] as const) {
                report.push(`| ${seg} | ${dev0['Left' + seg].toFixed(1)}° | ${dev0['Right' + seg].toFixed(1)}° |`);
            }
            report.push(`**S0：原始 A-pose bind S17 worst = ${Math.max(...Object.values(dev0)).toFixed(1)}°（模型固有 floor，判 10° 是否可达）`);
            report.push('');
        }

        // ── 2. normalizeRootMotion（内部 re-pose + calculateInverses）──
        const animObj = parseFreshFbx(ANIM_FBX);
        const rawClip = animObj.animations[0];
        const clip = normalizeRootMotion(rawClip, model, animObj);

        // ── 3. 新 bind 帧（re-pose 后、未播放）──
        model.updateMatrixWorld(true);
        const sk = mesh.skeleton;
        const newBonePos = new Map<string, THREE.Vector3>();
        for (const bn of ARM8) newBonePos.set(bn, boneWorldPos(model, bn));
        const newSegDir: Record<string, THREE.Vector3> = {};
        for (const side of ['Left', 'Right'] as const) {
            newSegDir[`${side}up`] = newBonePos.get(`mixamorig${side}ForeArm`)!.clone().sub(newBonePos.get(`mixamorig${side}Shoulder`)!);
            newSegDir[`${side}fo`] = newBonePos.get(`mixamorig${side}Hand`)!.clone().sub(newBonePos.get(`mixamorig${side}ForeArm`)!);
        }
        const boneMatWorld = new Map<string, THREE.Matrix4>();
        model.traverse((n) => { if ((n as THREE.Bone).isBone) boneMatWorld.set(n.name, (n as THREE.Bone).matrixWorld.clone()); });

        report.push('## S2：骨骼下垂（re-pose 前后骨段方向变化角）');
        report.push('');
        report.push('| 骨段 | re-pose 前方向 | re-pose 后方向 | 变化角 |');
        report.push('|---|---|---|---|');
        const droop: Record<string, number> = {};
        for (const side of ['Left', 'Right'] as const) {
            const up = angleDeg(oldSegDir[`${side}up`], newSegDir[`${side}up`]);
            const fo = angleDeg(oldSegDir[`${side}fo`], newSegDir[`${side}fo`]);
            droop[`${side}上臂`] = up;
            droop[`${side}前臂`] = fo;
            report.push(`| ${side} 上臂 | ${fmtV(oldSegDir[`${side}up`])} | ${fmtV(newSegDir[`${side}up`])} | ${up.toFixed(1)}° |`);
            report.push(`| ${side} 前臂 | ${fmtV(oldSegDir[`${side}fo`])} | ${fmtV(newSegDir[`${side}fo`])} | ${fo.toFixed(1)}° |`);
        }
        report.push('');
        report.push(`**S2：骨骼下垂角 worst = ${Math.max(...Object.values(droop)).toFixed(1)}° → ${Math.max(...Object.values(droop)) > 15 ? '✅ 骨骼确实从 A-pose 下垂到动画帧' : '⚠️ 骨骼几乎未动'}`);
        report.push('');

        // ── 4. S1：蒙皮是否停在 A-pose ──
        report.push('## S1：蒙皮是否停在 A-pose（GPU 等价蒙皮 world 输出 vs 原始 A-pose 顶点 world）');
        report.push('');
        const skinNewBind = gpuSkinWorld(mesh, boneMatWorld);
        // A-pose 参考（world）= mesh.matrixWorld × 原始顶点（bindMatrix×v 后 boneMat=I → 输出 v，再 ×meshWorld）
        let s1Max = 0; let s1Vi = -1;
        for (let i = 0; i < nVerts; i++) {
            const v = new THREE.Vector3(origPos[i * 3], origPos[i * 3 + 1], origPos[i * 3 + 2]).applyMatrix4(meshWorld0);
            const d = v.distanceTo(skinNewBind[i]);
            if (d > s1Max) { s1Max = d; s1Vi = i; }
        }
        // 找出手臂区域（Shoulder/Arm/ForeArm/Hand 任一权重>0）的顶点单独统计
        const idxAttr = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        const wgtAttr = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
        const ia = idxAttr.array as Uint16Array;
        const wa = wgtAttr.array as Float32Array;
        const armIdx = new Set<number>();
        sk.bones.forEach((b, i) => { if (ARM8.includes(b.name as any)) armIdx.add(i); });
        let s1ArmMax = 0;
        for (let i = 0; i < nVerts; i++) {
            let inArm = false;
            for (let k = 0; k < 4; k++) { if (wa[i * 4 + k] > 0 && armIdx.has(ia[i * 4 + k])) { inArm = true; break; } }
            if (!inArm) continue;
            const v = new THREE.Vector3(origPos[i * 3], origPos[i * 3 + 1], origPos[i * 3 + 2]).applyMatrix4(meshWorld0);
            const d = v.distanceTo(skinNewBind[i]);
            if (d > s1ArmMax) s1ArmMax = d;
        }
        report.push(`- 全顶点最大偏差 = ${s1Max.toFixed(6)}（顶点#${s1Vi}）`);
        report.push(`- 手臂影响顶点最大偏差 = ${s1ArmMax.toFixed(6)}`);
        report.push('');
        report.push(`**S1：手臂蒙皮 vs 原始 A-pose 最大偏移 = ${s1ArmMax.toFixed(6)} → ${s1ArmMax < 1e-3 ? '🔴 RED 实锤：蒙皮顶点停留在原始 A-pose 位置（骨骼已 re-pose，蒙皮未跟随）' : s1ArmMax > 0.1 ? '✅ GREEN：蒙皮顶点已离开 A-pose（跟随新 bind 帧）' : '⚠️ 边界（0.001~0.1）'}`);
        report.push('');
        report.push('每个手臂骨 dominant 单槽顶点示例（蒙皮输出 vs A-pose 参考）：');
        report.push('');
        report.push('| 骨 | 顶点# | 蒙皮输出(world) | A-pose参考(world) | 距离 |');
        report.push('|---|---|---|---|---|');
        const idxOf = new Map<string, number>();
        sk.bones.forEach((b, i) => idxOf.set(b.name, i));
        for (const bn of ARM8) {
            const bi = idxOf.get(bn);
            if (bi === undefined) continue;
            let bestVi = -1; let bestW = -0.1;
            for (let vi = 0; vi < nVerts; vi++) {
                let wBone = 0, sum = 0;
                for (let k = 0; k < 4; k++) {
                    const w = wa[vi * 4 + k];
                    if (w === 0) continue;
                    sum += w;
                    if (ia[vi * 4 + k] === bi) wBone += w;
                }
                if (wBone > bestW && sum > 0.99) { bestW = wBone; bestVi = vi; }
            }
            if (bestVi < 0) { report.push(`| ${bn} | 无 | — | — | — |`); continue; }
            const aPose = new THREE.Vector3(origPos[bestVi * 3], origPos[bestVi * 3 + 1], origPos[bestVi * 3 + 2]).applyMatrix4(meshWorld0);
            const d = aPose.distanceTo(skinNewBind[bestVi]);
            report.push(`| ${bn} | ${bestVi} | ${fmtV(skinNewBind[bestVi])} | ${fmtV(aPose)} | ${d.toFixed(6)} |`);
        }
        report.push('');

        // ── 5. S3：S17 蒙皮 vs 骨骼（新 bind 帧）──
        report.push('## S3：S17 蒙皮 vs 骨骼（新 bind 帧，蒙皮是否跟随骨骼）');
        report.push('');
        const cNewBind = skinClusterCentroid(mesh, skinNewBind, S17_BONES, 0.3);
        const devNewBind = s17Dev(cNewBind, (name) => newBonePos.get(name)!.clone());
        report.push('| 段 | Left | Right |');
        report.push('|---|---|---|');
        for (const seg of ['上臂', '前臂'] as const) {
            report.push(`| ${seg} | ${devNewBind['Left' + seg].toFixed(1)}° | ${devNewBind['Right' + seg].toFixed(1)}° |`);
        }
        const s3Worst = Math.max(...Object.values(devNewBind));
        report.push('');
        report.push(`**S3：新 bind 帧 S17 worst = ${s3Worst.toFixed(1)}° → ${s3Worst < 15 ? '✅ 蒙皮跟随骨骼' : s3Worst > 30 ? '🔴 RED：蒙皮段方向远离骨骼段（A-pose 外展 vs 骨骼下垂）' : '⚠️ 中等偏差'}`);
        report.push('');
        report.push('各骨 cluster 质心 vs 骨位置（新 bind 帧）：');
        report.push('');
        report.push('| 骨 | cluster 质心 | 骨位置 | 距离 |');
        report.push('|---|---|---|---|');
        for (const bn of S17_BONES) {
            const c = cNewBind.get(bn)!;
            const p = newBonePos.get(bn)!;
            report.push(`| ${bn} | ${fmtV(c)} | ${fmtV(p)} | ${c.distanceTo(p).toFixed(3)} |`);
        }
        report.push('');

        // ── 6. S4：播放帧复验 ──
        report.push('## S4：播放帧复验（S17，t=0 / t=1.5）');
        report.push('');
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.reset();
        action.play();
        report.push('| 时间 | 段 | Left | Right | worst |');
        report.push('|---|---|---|---|---|');
        const playDev: Record<string, Record<string, number>> = {};
        for (const t of [0, 1.5]) {
            mixer.setTime(t);
            model.updateMatrixWorld(true);
            const bm = new Map<string, THREE.Matrix4>();
            model.traverse((n) => { if ((n as THREE.Bone).isBone) bm.set(n.name, (n as THREE.Bone).matrixWorld.clone()); });
            const skinT = gpuSkinWorld(mesh, bm);
            const cT = skinClusterCentroid(mesh, skinT, S17_BONES, 0.3);
            const boneP = (name: string) => boneWorldPos(model, name);
            const devT = s17Dev(cT, boneP);
            playDev[`t=${t}`] = devT;
            const w = Math.max(...Object.values(devT));
            for (const seg of ['上臂', '前臂'] as const) {
                report.push(`| t=${t} | ${seg} | ${devT['Left' + seg].toFixed(1)}° | ${devT['Right' + seg].toFixed(1)}° | ${w.toFixed(1)}° |`);
            }
        }
        const s4Worst = Math.max(...Object.values(playDev['t=1.5']));
        report.push('');
        report.push(`**S4：播放 t=1.5 S17 worst = ${s4Worst.toFixed(1)}° → ${s4Worst < 15 ? '✅ 播放帧蒙皮跟随骨骼' : s4Worst > 30 ? '🔴 RED：播放帧蒙皮段方向远离骨骼段' : '⚠️ 中等偏差'}`);
        report.push('');

        // ── 结论 ──
        report.push('## 结论');
        report.push('');
        report.push(`- S2 骨骼下垂 = ${Math.max(...Object.values(droop)).toFixed(1)}°（骨骼对）`);
        report.push(`- S1 蒙皮停 A-pose = ${s1ArmMax.toFixed(6)}（${s1ArmMax < 1e-3 ? 'RED：蒙皮错，顶点未跟随 re-pose' : s1ArmMax > 0.1 ? 'GREEN：蒙皮已跟随' : '边界'}）`);
        report.push(`- S3 新 bind 帧 S17 = ${s3Worst.toFixed(1)}°（${s3Worst < 15 ? 'GREEN' : s3Worst > 30 ? 'RED' : '边界'}）`);
        report.push(`- S4 播放 t=1.5 S17 = ${s4Worst.toFixed(1)}°`);
        report.push('');

        fs.writeFileSync(OUT_PATH, report.join('\n'), 'utf8');
        console.log(report.join('\n'));

        // 断言（探针数据快照）：S1 红 = 蒙皮停 A-pose；S2 骨骼确实下垂；S3 红 = 蒙皮不跟随骨骼。
        // 记录当前状态即可（修复后同一探针数值翻绿）。
        expect(Math.max(...Object.values(droop))).toBeGreaterThan(0);
        expect(skinNewBind.length).toBe(nVerts);
        console.log(`[PROBE-V11] S1 armMax=${s1ArmMax.toFixed(6)} S2 droopWorst=${Math.max(...Object.values(droop)).toFixed(1)}° S3=${s3Worst.toFixed(1)}° S4=${s4Worst.toFixed(1)}°`);
    });
});
