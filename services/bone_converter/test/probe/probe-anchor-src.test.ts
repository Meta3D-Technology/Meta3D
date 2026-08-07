/**
 * probe-anchor-src — D10 swing3 公式修复：断言锚定原始动画源（第 5 步独立探针）
 *
 * 背景（第九轮验收）：
 *   S16 断言 dev=0.0° 全绿但实机渲染手臂仍扭曲（Kimi K2.7 视觉诊断确认），根因是
 *   **S13/S16 断言循环论证**：swing3 公式按构造让 meshDir=animDir、twist(out)=twist(anim)
 *   （S16 meshDir = bindDir·rel，rel = outQ·bindQ⁻¹，公式把 Swing·v 定为 animDir；
 *   S13 roll 对比 animQ twist 也是公式的构造目标）。断言与公式共用同一目标 → 恒绿。
 *
 * 本探针锚定**原始动画源**（不经转换、不经 normalizeRootMotion 的 rawClip 在 raw animObj
 * 上播放），对 swing3 输出（normalizeRootMotion 后的 normalizedClip 在 model 上播放）做
 * **独立**逐骨逐时间点对比：
 *   - 段方向：用**位置法**（世界关节位置差，含骨骼位置自由度）对比 raw anim 段方向，
 *     不用「朝向法」（outQ·bindQ⁻¹·bindDir 已被公式构造锁定，必为 0）。
 *   - twist：绕段轴 twist 对比 raw anim（frame-invariant，直接可比）。
 *   - 掌向：手骨世界朝向相对段轴的 roll 方位（palm 朝前/朝后/朝上）。
 *
 * 输出：逐骨逐时间点对比表（方向 dev、twist dev、掌向 dev），定位 swing3 公式缺陷。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-anchor-src" --forceExit
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

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

const SIDES = ['Left', 'Right'] as const;
const TIMES = [0, 0.5, 1.5, 2.5, 3.5, 4.5];

/** 世界四元数 q 绕单位轴 axis 的 twist（滚动）角（度），与 steps worldTwistAngle 一致（用原始 q.w） */
function worldTwistAngle(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(axis);
    const twistVec = axis.clone().multiplyScalar(dot);
    const ang = 2 * Math.atan2(twistVec.length(), Math.abs(q.w)) * 180 / Math.PI;
    return ang * (q.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
}

function angleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const dot = Math.max(-1, Math.min(1, a.clone().normalize().dot(b.clone().normalize())));
    return Math.acos(dot) * 180 / Math.PI;
}

function circularDelta(a: number, b: number): number {
    return Math.abs((a - b + 540) % 360 - 180);
}

/** 手骨 local 系中指向掌心的轴。先探测 anim hand local 轴与段方向的关系，返回 (boneName, localAxis) */
function detectPalmAxis(animObj: THREE.Object3D): { hand: string; axis: THREE.Vector3; label: string } {
    const handBone = new Map<string, THREE.Bone>();
    animObj.traverse((n) => {
        if ((n as THREE.Bone).isBone) handBone.set(n.name, n as THREE.Bone);
    });
    const h = handBone.get('mixamorigLeftHand');
    const fo = handBone.get('mixamorigLeftForeArm');
    const sh = handBone.get('mixamorigLeftShoulder');
    if (!h || !fo || !sh) return { hand: 'mixamorigLeftHand', axis: new THREE.Vector3(0, 0, -1), label: 'unknown' };
    animObj.updateMatrixWorld(true);
    const hPos = h.getWorldPosition(new THREE.Vector3());
    const foPos = fo.getWorldPosition(new THREE.Vector3());
    const shPos = sh.getWorldPosition(new THREE.Vector3());
    void hPos;
    void foPos;
    void shPos;
    const seg = foPos.clone().sub(shPos).normalize(); // 上臂段（近似前臂方向）
    const hq = h.getWorldQuaternion(new THREE.Quaternion());
    const axes = {
        '+X': new THREE.Vector3(1, 0, 0),
        '-X': new THREE.Vector3(-1, 0, 0),
        '+Y': new THREE.Vector3(0, 1, 0),
        '-Y': new THREE.Vector3(0, -1, 0),
        '+Z': new THREE.Vector3(0, 0, 1),
        '-Z': new THREE.Vector3(0, 0, -1),
    };
    let best = '';
    let bestScore = Infinity;
    const scores: Record<string, number> = {};
    for (const [label, a] of Object.entries(axes)) {
        const world = a.clone().applyQuaternion(hq).normalize();
        // 掌心轴 ≈ 垂直于前臂段，且指向模型身体外侧（对 Left 手，+X 或 -Z 常为掌心）
        const perp = 1 - Math.abs(world.dot(seg));
        scores[label] = perp;
        if (perp < bestScore) { bestScore = perp; best = label; }
    }
    return { hand: 'mixamorigLeftHand', axis: axes[best as keyof typeof axes].clone(), label: best };
}

describe('probe-anchor-src', () => {
    test('swing3 output vs raw-anim anchor: 逐骨逐时间点 方向/twist/掌向 dev', () => {
        const report0: string[] = [];
        // ---- 0. 蒙皮合法性诊断（转换前后对比）：转换前（原始 Tripo 网格）----
        const rawModel = parseFreshFbx(MODEL_FBX);
        {
            const diag: string[] = [];
            rawModel.traverse((n) => {
                if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
                    const m = n as THREE.SkinnedMesh;
                    const si = m.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
                    const sw = m.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
                    const vc = m.geometry.attributes.position.count;
                    const sk = m.skeleton;
                    let oob = 0, allZero = 0, anyValid = 0;
                    for (let i = 0; i < vc; i++) {
                        let valid = false;
                        let hasW = false;
                        for (let k = 0; k < 4; k++) {
                            const w = sw.getX(i * 4 + k);
                            if (w > 0) hasW = true;
                            const bi = si.getX(i * 4 + k);
                            if (bi >= 0 && bi < (sk ? sk.bones.length : 0) && w > 0) valid = true;
                            if (bi < 0 || bi >= (sk ? sk.bones.length : 0)) oob++;
                        }
                        if (valid) anyValid++;
                        if (!hasW) allZero++;
                    }
                    diag.push(`[转换前] mesh=${m.name} 顶点=${vc} skeleton.bones=${sk ? sk.bones.length : 'null'} 有效顶点=${anyValid} 全零权重点=${allZero} 越界槽位=${oob}`);
                }
            });
            report0.push(diag.join('\n'));
        }
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        {
            const diag: string[] = [];
            model.traverse((n) => {
                if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
                    const m = n as THREE.SkinnedMesh;
                    const si = m.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
                    const sw = m.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
                    const vc = m.geometry.attributes.position.count;
                    const sk = m.skeleton;
                    let oob = 0, allZero = 0, anyValid = 0;
                    for (let i = 0; i < vc; i++) {
                        let valid = false;
                        let hasW = false;
                        for (let k = 0; k < 4; k++) {
                            const w = sw.getX(i * 4 + k);
                            if (w > 0) hasW = true;
                            const bi = si.getX(i * 4 + k);
                            if (bi >= 0 && bi < (sk ? sk.bones.length : 0) && w > 0) valid = true;
                            if (bi < 0 || bi >= (sk ? sk.bones.length : 0)) oob++;
                        }
                        if (valid) anyValid++;
                        if (!hasW) allZero++;
                    }
                    diag.push(`[转换后] mesh=${m.name} 顶点=${vc} skeleton.bones=${sk ? sk.bones.length : 'null'} 有效顶点=${anyValid} 全零权重点=${allZero} 越界槽位=${oob}`);
                }
            });
            report0.push(diag.join('\n'));
        }
        model.updateMatrixWorld(true);
        const boneByName = new Map<string, THREE.Bone>();
        model.traverse((n) => {
            if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
        });
        const bindQ = new Map<string, THREE.Quaternion>();
        const bindPos = new Map<string, THREE.Vector3>();
        const bindLocalPos = new Map<string, THREE.Vector3>();
        for (const [bn, b] of boneByName) {
            bindQ.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
            bindPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
            bindLocalPos.set(bn, b.position.clone());
        }

        // ---- 原始动画源锚点：rawClip 在 raw animObj 上播放（不经任何转换）----
        const animObj = parseFreshFbx(ANIM_FBX);
        const rawClip = animObj.animations[0];
        const palmInfo = detectPalmAxis(animObj);
        const animBone = new Map<string, THREE.Bone>();
        animObj.traverse((n) => {
            if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
        });
        const animMixer = new THREE.AnimationMixer(animObj);
        const animAction = animMixer.clipAction(rawClip);
        animAction.reset();
        animAction.play();

        // ---- swing3 输出：normalizeRootMotion 后 model 播放 ----
        const normalizedClip = normalizeRootMotion(rawClip, model, animObj);
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(normalizedClip);
        action.reset();
        action.play();

        const report: string[] = [];
        report.push(`palm axis: ${palmInfo.hand} local ${palmInfo.label}`);
        report.push('');
        report.push(report0.join('\n'));
        report.push('');
        // ---- 真实蒙皮网格方向（CPU skinning）：锚定「屏幕渲染什么」 ----
        const armBoneSet = new Set([
            'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
            'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
        ]);
        // 对「S16 朝向法」的批判：meshDir = bindDir·(outQ·bindQ⁻¹) 只用驱动骨旋转且 bindDir
        // 用模型 bind 段方向，未考虑多骨权重/骨位置。真值 = 用输出骨矩阵 CPU 蒙皮，取
        // 肩/肘/腕区域蒙皮顶点质心，算实际段方向。与 raw anim 对比。
        let mesh: THREE.SkinnedMesh | null = null;
        model.traverse((n) => {
            if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh;
        });
        const skinnedArmDirs: Array<{ t: number; side: 'Left' | 'Right'; seg: 'up' | 'fo'; meshDir: THREE.Vector3; animDir: THREE.Vector3; dev: number }> = [];
        const meshFollowRows: Array<{ t: number; side: 'Left' | 'Right'; seg: 'up' | 'fo'; dev: number }> = [];
        const shearRows: Array<{ t: number; bn: string; shearDeg: number }> = [];
        const jointConsistency: string[] = [];
        let skinnedMeshOk = false;
        if (mesh) {
            skinnedMeshOk = true;
            const sk = mesh.skeleton;
            const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
            const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
            const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
            const n = posAttr.count;
            // ⚠️ 正确读法：getX(index) 内部已乘 itemSize，绝不能用 getX(i*4+k)。直接读 array。
            const ia = idxAttr.array as Uint16Array;
            const wa = wgtAttr.array as Float32Array;
            const wAt = (i: number, k: number) => wa[i * 4 + k];
            const idxAt = (i: number, k: number) => ia[i * 4 + k];
            // ---- 蒙皮合法性诊断：有效 skinIndex 顶点比例 ----
            let validVert = 0;
            let outRange = 0;
            for (let i = 0; i < n; i++) {
                let ok = false;
                for (let k = 0; k < 4; k++) {
                    const bi = idxAt(i, k);
                    if (bi >= 0 && bi < sk.bones.length && wAt(i, k) > 0) { ok = true; break; }
                }
                if (ok) validVert++; else outRange++;
            }
            report.push(`[蒙皮诊断] 顶点总数=${n} 有效skinIndex=${validVert} 无效/越界=${outRange} (${(outRange * 100 / n).toFixed(1)}%)`);
            // dominant 骨 = 每顶点权重最高骨，统计每根手臂骨支配的顶点数
            const domCount = new Map<string, number>();
            for (const bn of armBoneSet) domCount.set(bn, 0);
            for (let i = 0; i < n; i++) {
                let best = -1, bestW = -1;
                for (let k = 0; k < 4; k++) {
                    const w = wAt(i, k);
                    if (w > bestW) { bestW = w; best = idxAt(i, k); }
                }
                if (best >= 0 && best < sk.bones.length) {
                    const bn = sk.bones[best]!.name;
                    if (domCount.has(bn)) domCount.set(bn, domCount.get(bn)! + 1);
                }
            }
            report.push(`[蒙皮诊断] 各手臂骨 dominant 顶点数: ${Array.from(domCount.entries()).map(([b, c]) => `${b}=${c}`).join(' ')}`);
            // 决定性：转换后各手臂骨「权重>0 影响顶点数」（区分 dominant，看是否顶点被正确骨骼驱动）
            const inflCount = new Map<string, number>();
            for (const bn of armBoneSet) inflCount.set(bn, 0);
            for (let i = 0; i < n; i++) {
                for (let k = 0; k < 4; k++) {
                    const w = wAt(i, k);
                    if (w <= 0) continue;
                    const bi = idxAt(i, k);
                    const bone = sk.bones[bi];
                    if (!bone) continue;
                    if (inflCount.has(bone.name)) inflCount.set(bone.name, inflCount.get(bone.name)! + 1);
                }
            }
            report.push(`[蒙皮诊断] 转换后各手臂骨 权重>0影响顶点数: ${Array.from(inflCount.entries()).map(([b, c]) => `${b}=${c}`).join(' ')}`);
            // CPU 蒙皮（与 steps skinWithBoneMatrices 同口径）：v = Σ w·(boneMat·boneInv)·v_bind + mesh.matrixWorld
            const skinAll = (boneMatrices: Map<string, THREE.Matrix4>): THREE.Vector3[] => {
                const out: THREE.Vector3[] = new Array(n);
                const vBind = new THREE.Vector3();
                const acc = new THREE.Vector3();
                const m = new THREE.Matrix4();
                for (let i = 0; i < n; i++) {
                    vBind.fromBufferAttribute(posAttr as any, i);
                    acc.set(0, 0, 0);
                    for (let k = 0; k < 4; k++) {
                        const w = wAt(i, k);
                        if (w === 0) continue;
                        const bi = idxAt(i, k);
                        const bone = sk.bones[bi];
                        if (!bone) continue;
                        const bm = boneMatrices.get(bone.name);
                        if (!bm) continue;
                        m.copy(bm).multiply(sk.boneInverses[bi]);
                        acc.add(new THREE.Vector3().copy(vBind).applyMatrix4(m).multiplyScalar(w));
                    }
                    acc.applyMatrix4(mesh.matrixWorld);
                    out[i] = acc.clone();
                }
                return out;
            };
            // 每根手臂骨的支配顶点索引（dominant bone = 该骨）——这是「网格真正由谁驱动」
            const domVerts = new Map<string, number[]>();
            for (const bn of armBoneSet) domVerts.set(bn, []);
            for (let i = 0; i < n; i++) {
                let best = -1, bestW = -1;
                for (let k = 0; k < 4; k++) {
                    const w = wAt(i, k);
                    if (w > bestW) { bestW = w; best = idxAt(i, k); }
                }
                if (best >= 0 && best < sk.bones.length) {
                    const bn = sk.bones[best]!.name;
                    if (armBoneSet.has(bn)) domVerts.get(bn)!.push(i);
                }
            }
            const centroid = (verts: THREE.Vector3[], idxs: number[]): THREE.Vector3 => {
                const acc = new THREE.Vector3();
                for (const i of idxs) acc.add(verts[i]);
                return acc.multiplyScalar(1 / Math.max(1, idxs.length));
            };
            // ---- 决定性 sanity：bind 姿态下用 bind 矩阵 CPU 蒙皮，蒙皮段方向 vs bind 段方向 ----
            // 若 mesh 权重正常，蒙皮质心应落在各骨关节附近 → 段方向≈bind 段方向（dev≈0）。
            // 若权重退化（如 Σw≈4 或全绑到 Head），蒙皮会偏离 → dev 大 → 网格先天无法跟骨。
            {
                const restMat = new Map<string, THREE.Matrix4>();
                model.updateMatrixWorld(true);
                for (const [bn, b] of boneByName) restMat.set(bn, b.matrixWorld.clone());
                const restSkinned = skinAll(restMat);
                // 终极校验：bind 姿态蒙皮是否复现原始顶点（若 skinning 本身正确，v_skinned≈v_bind）
                const posBind = new THREE.Vector3();
                let maxVDev = 0, sumVDev = 0, cntV = 0;
                for (let i = 0; i < n; i++) {
                    posBind.fromBufferAttribute(posAttr as any, i).applyMatrix4(mesh.matrixWorld);
                    const d = restSkinned[i].distanceTo(posBind);
                    if (d > maxVDev) maxVDev = d;
                    sumVDev += d; cntV++;
                }
                report.push(`[bind-skinning校验] bind蒙皮 vs 原始顶点: avg=${(sumVDev / Math.max(1, cntV)).toFixed(4)} max=${maxVDev.toFixed(4)}`);
                const row: string[] = [];
                for (const side of SIDES) {
                    const shName = `mixamorig${side}Shoulder`;
                    const foName = `mixamorig${side}ForeArm`;
                    const haName = `mixamorig${side}Hand`;
                    const shC = centroid(restSkinned, domVerts.get(shName)!);
                    const foC = centroid(restSkinned, domVerts.get(foName)!);
                    const haC = centroid(restSkinned, domVerts.get(haName)!);
                    const bindUp = bindPos.get(foName)!.clone().sub(bindPos.get(shName)!);
                    const bindFo = bindPos.get(haName)!.clone().sub(bindPos.get(foName)!);
                    const skUp = foC.clone().sub(shC);
                    const skFo = haC.clone().sub(foC);
                    row.push(`[bind-sanity ${side}] 蒙皮上臂 vs bind上臂 dev=${angleDeg(skUp, bindUp).toFixed(1)}° 蒙皮前臂 vs bind前臂 dev=${angleDeg(skFo, bindFo).toFixed(1)}°`);
                }
                report.push(row.join('\n'));
            }
            for (const t of TIMES) {
                mixer.setTime(t);
                model.updateMatrixWorld(true);
                animMixer.setTime(t);
                animObj.updateMatrixWorld(true);
                const boneMat = new Map<string, THREE.Matrix4>();
                for (const [bn, b] of boneByName) boneMat.set(bn, b.matrixWorld.clone());
                const outQAt = new Map<string, THREE.Quaternion>();
                for (const [bn, b] of boneByName) outQAt.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
                const animQAt = new Map<string, THREE.Quaternion>();
                for (const [bn, ab] of animBone) animQAt.set(bn, ab.getWorldQuaternion(new THREE.Quaternion()));
                const skinned = skinAll(boneMat);
                const readAnimPos = (name: string): THREE.Vector3 => {
                    const ab = animBone.get(name)!;
                    return ab.getWorldPosition(new THREE.Vector3());
                };
                const readOutPos = (name: string): THREE.Vector3 => {
                    const b = boneByName.get(name)!;
                    return b.getWorldPosition(new THREE.Vector3());
                };
                for (const side of SIDES) {
                    const shName = `mixamorig${side}Shoulder`;
                    const foName = `mixamorig${side}ForeArm`;
                    const haName = `mixamorig${side}Hand`;
                    const shC = centroid(skinned, domVerts.get(shName)!);
                    const foC = centroid(skinned, domVerts.get(foName)!);
                    const haC = centroid(skinned, domVerts.get(haName)!);
                    // 关节一致性诊断：蒙皮质心 vs 骨骼实际位置（若网格跟骨，质心应≈骨关节）
                    const oSh = readOutPos(shName);
                    const oFo = readOutPos(foName);
                    const oHa = readOutPos(haName);
                    jointConsistency.push(`t=${t} ${side}: 蒙皮Sh(${shC.x.toFixed(3)},${shC.y.toFixed(3)},${shC.z.toFixed(3)}) vs 骨Sh(${oSh.x.toFixed(3)},${oSh.y.toFixed(3)},${oSh.z.toFixed(3)}) dev=${shC.distanceTo(oSh).toFixed(4)} | 蒙皮Fo(${foC.x.toFixed(3)},${foC.y.toFixed(3)},${foC.z.toFixed(3)}) vs 骨Fo(${oFo.x.toFixed(3)},${oFo.y.toFixed(3)},${oFo.z.toFixed(3)}) dev=${foC.distanceTo(oFo).toFixed(4)} | 蒙皮Ha(${haC.x.toFixed(3)},${haC.y.toFixed(3)},${haC.z.toFixed(3)}) vs 骨Ha(${oHa.x.toFixed(3)},${oHa.y.toFixed(3)},${oHa.z.toFixed(3)}) dev=${haC.distanceTo(oHa).toFixed(4)}`);
                    const upMesh = foC.clone().sub(shC);
                    const foMesh = haC.clone().sub(foC);
                    const upAnim = readAnimPos(foName).clone().sub(readAnimPos(shName));
                    const foAnim = readAnimPos(haName).clone().sub(readAnimPos(foName));
                    // 帧归一化：两侧都转到各自 Hips 局部系，消除骨架世界系差异
                    const oHipsQ = outQAt.get('mixamorigHips')!;
                    const aHipsQ = animQAt.get('mixamorigHips')!;
                    const upMeshH = upMesh.clone().applyQuaternion(oHipsQ.clone().invert());
                    const upAnimH = upAnim.clone().applyQuaternion(aHipsQ.clone().invert());
                    const foMeshH = foMesh.clone().applyQuaternion(oHipsQ.clone().invert());
                    const foAnimH = foAnim.clone().applyQuaternion(aHipsQ.clone().invert());
                    skinnedArmDirs.push({ t, side, seg: 'up', meshDir: upMeshH, animDir: upAnimH, dev: angleDeg(upMeshH, upAnimH) });
                    skinnedArmDirs.push({ t, side, seg: 'fo', meshDir: foMeshH, animDir: foAnimH, dev: angleDeg(foMeshH, foAnimH) });
                    // 决定性帧内测试：蒙皮网格段方向 vs 模型自身骨段方向（同一世界系，无 Hips 差异污染）
                    const outSh = readOutPos(`mixamorig${side}Shoulder`);
                    const outFo = readOutPos(`mixamorig${side}ForeArm`);
                    const outHa = readOutPos(`mixamorig${side}Hand`);
                    meshFollowRows.push({
                        t, side, seg: 'up',
                        dev: angleDeg(upMesh, outFo.clone().sub(outSh)),
                    });
                    meshFollowRows.push({
                        t, side, seg: 'fo',
                        dev: angleDeg(foMesh, outHa.clone().sub(outFo)),
                    });
                }
            }
        }

        report.push(skinnedMeshOk
            ? '=== 真值：CPU 蒙皮网格段方向 vs raw anim（含骨位置/多骨权重）==='
            : '=== WARN: 无 SkinnedMesh，跳过真值蒙皮检查 ===');
        report.push('t | 侧 | 段 | meshDir(蒙皮质心, Hips系) | animDir(Hips系) | dev');
        for (const r of skinnedArmDirs) {
            const fmt = (v: THREE.Vector3) => `(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`;
            report.push(`${r.t} | ${r.side} | ${r.seg} | ${fmt(r.meshDir)} | ${fmt(r.animDir)} | ${r.dev.toFixed(1)}°`);
        }
        report.push('');
        // 决定性帧内测试：蒙皮网格 vs 模型自身骨骼（同一世界系，直接可比）
        report.push('=== 决定性：蒙皮网格段方向 vs 模型自身骨段方向（帧内，无 Hips 污染）===');
        report.push('t | 侧 | 段 | dev');
        for (const r of meshFollowRows) {
            report.push(`${r.t} | ${r.side} | ${r.seg} | ${r.dev.toFixed(1)}°`);
        }
        report.push('');
        // 关节一致性：蒙皮质心 vs 骨骼位置（若网格跟骨，质心应≈骨关节）
        report.push('=== 关节一致性：蒙皮各骨区域质心 vs 骨骼实际位置（t=0，距离）===');
        report.push(jointConsistency.filter((s) => s.startsWith('t=0')).join('\n'));
        report.push('');
        // 决定性剪切测试：位置链 vs 朝向链（移到 time loop 之后填充，这里仅占位）

        interface Row {
            t: number;
            bn: string;
            seg: 'up' | 'fo';
            animSegDir: THREE.Vector3;
            outPosSegDir: THREE.Vector3;
            animTwist: number;
            outTwist: number;
            animPalm: THREE.Vector3;
            outPalm: THREE.Vector3;
        }
        const rows: Row[] = [];
        // 决定性剪切测试：位置链(poseQ) vs 朝向链(worldQ) 是否一致
        // 骨骼世界位置 = 父位置 + poseQ(父)·bindLocalPos(child)；而蒙皮朝向 = worldQ。
        // 若 poseQ(臂) = raw animQ ≠ worldQ(swing3)，则同一条骨骼「位置说往A走、朝向说往B走」→ 网格剪切。

        for (const t of TIMES) {
            mixer.setTime(t);
            model.updateMatrixWorld(true);
            animMixer.setTime(t);
            animObj.updateMatrixWorld(true);
            // 采样输出（model）位置/朝向
            const outPos = new Map<string, THREE.Vector3>();
            const outQ = new Map<string, THREE.Quaternion>();
            for (const [bn, b] of boneByName) {
                outPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
                outQ.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
            }
            // 剪切测量：期望子关节位置 = 父位置 + worldQ(父)·bindLocalPos(子)（朝向链），
            // 实际子关节位置 = outPos(子)（位置链）。两者夹角 = 剪切角。
            for (const side of SIDES) {
                for (const bn of [(`mixamorig${side}Arm` as const), (`mixamorig${side}ForeArm` as const), (`mixamorig${side}Hand` as const)]) {
                    const p = bn.replace(/^(mixamorig(Left|Right))(Arm|ForeArm|Hand)$/, (_, pre: string, _s: string, seg: string) => {
                        if (seg === 'Arm') return pre + 'Shoulder';
                        if (seg === 'ForeArm') return pre + 'Arm';
                        return pre + 'ForeArm';
                    });
                    const expPos = outPos.get(p)!.clone().add(bindLocalPos.get(bn)!.clone().applyQuaternion(outQ.get(p)!));
                    const actPos = outPos.get(bn)!;
                    const expDir = expPos.clone().sub(outPos.get(p)!);
                    const actDir = actPos.clone().sub(outPos.get(p)!);
                    const shearDeg = angleDeg(expDir, actDir);
                    shearRows.push({ t, bn, shearDeg });
                }
            }
            // 采样 raw anim 位置/朝向
            const animPos = new Map<string, THREE.Vector3>();
            const animQ = new Map<string, THREE.Quaternion>();
            for (const [bn, ab] of animBone) {
                animPos.set(bn, ab.getWorldPosition(new THREE.Vector3()));
                animQ.set(bn, ab.getWorldQuaternion(new THREE.Quaternion()));
            }
            for (const side of SIDES) {
                for (const bn of [(`mixamorig${side}Shoulder` as const), (`mixamorig${side}Arm` as const), (`mixamorig${side}ForeArm` as const), (`mixamorig${side}Hand` as const)]) {
                    const seg: 'up' | 'fo' = bn.includes('ForeArm') || bn.includes('Hand') ? 'fo' : 'up';
                    // raw anim 段方向（位置法）
                    const aSh = animPos.get(`mixamorig${side}Shoulder`)!;
                    const aFo = animPos.get(`mixamorig${side}ForeArm`)!;
                    const aHa = animPos.get(`mixamorig${side}Hand`)!;
                    const animSegDir = seg === 'up'
                        ? aFo.clone().sub(aSh).normalize()
                        : aHa.clone().sub(aFo).normalize();
                    // swing3 输出段方向（位置法：model 世界关节位置差）—— NOT outQ·bindQ⁻¹·bindDir
                    const oSh = outPos.get(`mixamorig${side}Shoulder`)!;
                    const oFo = outPos.get(`mixamorig${side}ForeArm`)!;
                    const oHa = outPos.get(`mixamorig${side}Hand`)!;
                    const outPosSegDir = seg === 'up'
                        ? oFo.clone().sub(oSh).normalize()
                        : oHa.clone().sub(oFo).normalize();
                    // twist（frame-invariant：绕段轴，两侧世界系不同但 twist 角相同）
                    const animTwist = worldTwistAngle(animQ.get(bn)!, animSegDir);
                    const outTwist = worldTwistAngle(outQ.get(bn)!, outPosSegDir);
                    // 掌向：手骨 local palmAxis → 世界（相对段轴方向，用 Hips 系消除骨架系差异）
                    const aHipsQ = animQ.get('mixamorigHips')!;
                    const oHipsQ = outQ.get('mixamorigHips')!;
                    const aPalmWorld = palmInfo.axis.clone().applyQuaternion(animQ.get(palmInfo.hand)!);
                    const oPalmWorld = palmInfo.axis.clone().applyQuaternion(outQ.get(palmInfo.hand)!);
                    const animPalm = aPalmWorld.clone().applyQuaternion(aHipsQ.clone().invert()); // → Hips 局部
                    const outPalm = oPalmWorld.clone().applyQuaternion(oHipsQ.clone().invert());
                    rows.push({ t, bn, seg, animSegDir, outPosSegDir, animTwist, outTwist, animPalm, outPalm });
                }
            }
        }

        // ---- 逐骨汇总（所有时间点 max）----
        report.push('=== 逐骨汇总（跨全部时间点） ===');
        report.push('骨 | 方向dev(max,位置法) | twistDev(max) | 掌向dev(max) | 方向dev(t=0) | twistDev(t=0)');
        const boneGroups = new Map<string, Row[]>();
        for (const r of rows) {
            if (!boneGroups.has(r.bn)) boneGroups.set(r.bn, []);
            boneGroups.get(r.bn)!.push(r);
        }
        for (const [bn, group] of boneGroups) {
            const dirDevs = group.map((r) => angleDeg(r.outPosSegDir, r.animSegDir));
            const twistDevs = group.map((r) => circularDelta(r.outTwist, r.animTwist));
            const palmDevs = group.map((r) => angleDeg(r.outPalm, r.animPalm));
            const t0 = group.find((r) => r.t === 0)!;
            const dirT0 = angleDeg(t0.outPosSegDir, t0.animSegDir);
            const twistT0 = circularDelta(t0.outTwist, t0.animTwist);
            report.push(
                `${bn} | ${Math.max(...dirDevs).toFixed(1)}° | ${Math.max(...twistDevs).toFixed(1)}° | ${Math.max(...palmDevs).toFixed(1)}° | ${dirT0.toFixed(1)}° | ${twistT0.toFixed(1)}°`,
            );
        }
        report.push('');
        report.push('=== 全时间点明细 ===');
        report.push('t | 骨 | seg | animSegDir | outPosSegDir | 方向dev | animTwist | outTwist | twistDev | palmDev');
        for (const r of rows) {
            const dirDev = angleDeg(r.outPosSegDir, r.animSegDir);
            const twistDev = circularDelta(r.outTwist, r.animTwist);
            const palmDev = angleDeg(r.outPalm, r.animPalm);
            const fmt = (v: THREE.Vector3) => `(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`;
            report.push(
                `${r.t} | ${r.bn} | ${r.seg} | ${fmt(r.animSegDir)} | ${fmt(r.outPosSegDir)} | ${dirDev.toFixed(1)}° | ${r.animTwist.toFixed(1)}° | ${r.outTwist.toFixed(1)}° | ${twistDev.toFixed(1)}° | ${palmDev.toFixed(1)}°`,
            );
        }
        // 决定性剪切测试：位置链 vs 朝向链
        report.push('');
        report.push('=== 决定性：位置链(poseQ) vs 朝向链(worldQ) 剪切角（每臂骨，全时间点 max | t=0）===');
        report.push('骨 | 剪切角 max | t=0');
        const shearGroup = new Map<string, Array<{ t: number; shearDeg: number }>>();
        for (const s of shearRows) {
            if (!shearGroup.has(s.bn)) shearGroup.set(s.bn, []);
            shearGroup.get(s.bn)!.push(s);
        }
        for (const [bn, g] of shearGroup) {
            const t0 = g.find((x) => x.t === 0)!.shearDeg;
            report.push(`${bn} | ${Math.max(...g.map((x) => x.shearDeg)).toFixed(1)}° | ${t0.toFixed(1)}°`);
        }
        report.push('');

        // 写盘（防 session 中断丢进度）
        const outPath = path.join(__dirname, 'probe-anchor-src-RESULT.md');
        fs.writeFileSync(outPath, report.join('\n'), 'utf8');
        console.log(report.join('\n'));
    });
});
