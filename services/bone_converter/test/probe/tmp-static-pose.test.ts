/**
 * tmp-static-pose — V11 阶段 2 临时探针：量化「animloaded 静止姿态」基线（RED 证据）
 * 测量 normalizeRootMotion 后（未播放）模型静态姿态：
 *   1. 躯干扭转（Hips/Spine 相对竖直轴）
 *   2. 上臂/前臂相对竖直向下夹角、肘部弯曲角、前臂横向错开
 *   3. re-pose 目标（animSkeleton 驱动到 clip t=0）的手臂方向
 *   4. animSkeleton 静态 rest（bind pose）手臂方向 —— 验证「re-pose 基准错选」
 */
(global as any).self = global;
(global as any).window = global;
(global as any).document = {
    createElement: (tag: string) => (tag === 'img' || tag === 'image' ? new (global as any).MockImage() : {}),
    createElementNS: (_ns: string, tag: string) => (tag === 'img' || tag === 'image' ? new (global as any).MockImage() : {}),
};
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 1; height = 1;
    private _src = '';
    get src() { return this._src; }
    set src(v: string) { this._src = v; if (this.onload) setTimeout(() => this.onload!(), 0); }
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

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}
function boneWorldPos(root: THREE.Object3D, name: string): THREE.Vector3 {
    let p = new THREE.Vector3();
    root.traverse((n) => { if ((n as THREE.Bone).isBone && n.name === name) p = (n as THREE.Bone).getWorldPosition(new THREE.Vector3()); });
    return p;
}
function boneWorldQuat(root: THREE.Object3D, name: string): THREE.Quaternion {
    let q = new THREE.Quaternion();
    root.traverse((n) => { if ((n as THREE.Bone).isBone && n.name === name) q = (n as THREE.Bone).getWorldQuaternion(new THREE.Quaternion()); });
    return q;
}
function angleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const da = a.clone().normalize();
    const db = b.clone().normalize();
    const dot = Math.max(-1, Math.min(1, da.dot(db)));
    return Math.acos(dot) * 180 / Math.PI;
}
function angleFromDown(v: THREE.Vector3): number {
    return angleDeg(v, new THREE.Vector3(0, -1, 0));
}
function fmtV(v: THREE.Vector3): string { return `(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`; }

function gpuSkinWorld(mesh: THREE.SkinnedMesh, boneMatWorld: Map<string, THREE.Matrix4>): THREE.Vector3[] {
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
        v.applyMatrix4(bmFwd);
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
        acc.applyMatrix4(bmInv);
        acc.applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

const ARM8_SET = ['mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand'];

function skinClusterCentroid(mesh: THREE.SkinnedMesh, vSkin: THREE.Vector3[], threshold: number): Map<string, THREE.Vector3> {
    const sk = mesh.skeleton;
    const idxAttr = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const sumW = new Map<string, number>();
    const sumV = new Map<string, THREE.Vector3>();
    for (const bn of ARM8_SET) { sumW.set(bn, 0); sumV.set(bn, new THREE.Vector3()); }
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
    for (const bn of ARM8_SET) {
        const s = sumW.get(bn)!;
        out.set(bn, s > 0 ? sumV.get(bn)!.multiplyScalar(1 / s) : new THREE.Vector3());
    }
    return out;
}

function firstMesh(root: THREE.Object3D): THREE.SkinnedMesh {
    let mesh: THREE.SkinnedMesh | null = null;
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh; });
    if (!mesh) throw new Error('no mesh');
    return mesh;
}

function dumpMeshArm(label: string, c: Map<string, THREE.Vector3>, out: string[]): void {
    for (const side of ['Left', 'Right'] as const) {
        const sh = c.get(`mixamorig${side}Shoulder`)!;
        const fo = c.get(`mixamorig${side}ForeArm`)!;
        const ha = c.get(`mixamorig${side}Hand`)!;
        const up = fo.clone().sub(sh);
        const foDir = ha.clone().sub(fo);
        out.push(`MESH ${label} ${side}: 上臂相对向下=${angleFromDown(up).toFixed(1)}° 前臂相对向下=${angleFromDown(foDir).toFixed(1)}° 肘弯=${angleDeg(up, foDir).toFixed(1)}° 前臂横向错开=${foDir.clone().sub(up.clone().normalize().multiplyScalar(foDir.dot(up.clone().normalize()))).length().toFixed(3)}`);
    }
}

function dumpArmPose(label: string, root: THREE.Object3D, out: string[]): void {
    for (const side of ['Left', 'Right'] as const) {
        const sh = boneWorldPos(root, `mixamorig${side}Shoulder`);
        const fo = boneWorldPos(root, `mixamorig${side}ForeArm`);
        const ha = boneWorldPos(root, `mixamorig${side}Hand`);
        const up = fo.clone().sub(sh);
        const foDir = ha.clone().sub(fo);
        const elbow = angleDeg(up, foDir);
        // 前臂横向错开：前臂段方向相对上臂段「旋转面」的横向分量
        // 近似：前臂方向在「垂直于上臂」平面上的投影大小（0 = 共线）
        const upN = up.clone().normalize();
        const foN = foDir.clone().normalize();
        const perp = foN.clone().sub(upN.clone().multiplyScalar(foN.dot(upN)));
        out.push(`${label} ${side}: 上臂相对向下=${angleFromDown(up).toFixed(1)}° 前臂相对向下=${angleFromDown(foDir).toFixed(1)}° 肘弯=${elbow.toFixed(1)}° 前臂横向错开=${perp.length().toFixed(3)}`);
        out.push(`    sh=${fmtV(sh)} fo=${fmtV(fo)} ha=${fmtV(ha)}`);
    }
}

function torsoTwist(root: THREE.Object3D): Record<string, number> {
    const q = boneWorldQuat(root, 'mixamorigHips');
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return { x: e.x * 180 / Math.PI, y: e.y * 180 / Math.PI, z: e.z * 180 / Math.PI };
}

describe('tmp-static-pose', () => {
    test('量化 animloaded 静止姿态 + re-pose 目标', () => {
        const out: string[] = [];
        out.push('# TMP 静止姿态基线');

        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        model.updateMatrixWorld(true);
        out.push(`--- 1. converted（转换后、未加载动画）---`);
        out.push(`Hips euler(YXZ)=${JSON.stringify(torsoTwist(model))}`);
        dumpArmPose('converted', model, out);

        const animObj = parseFreshFbx(ANIM_FBX);
        const rawClip = animObj.animations[0];
        out.push(`--- 2. anim 静态 rest（FBX bind，mixer 前）---`);
        animObj.updateMatrixWorld(true);
        out.push(`Hips euler=${JSON.stringify(torsoTwist(animObj))}`);
        dumpArmPose('anim-rest', animObj, out);

        // 3. anim 驱动到 clip t=0（normalizeRootMotion 的 re-pose 目标）
        const poseMixer = new THREE.AnimationMixer(animObj);
        const poseAction = poseMixer.clipAction(rawClip);
        poseAction.reset(); poseAction.play();
        poseMixer.setTime(0);
        animObj.updateMatrixWorld(true);
        out.push(`--- 3. anim 驱动到 clip t=0（re-pose 目标）---`);
        out.push(`Hips euler=${JSON.stringify(torsoTwist(animObj))}`);
        dumpArmPose('anim-t0', animObj, out);
        out.push(`anim clip 轨道: ${rawClip.tracks.length} 条, name=${rawClip.name}, duration=${rawClip.duration}`);
        out.push(`轨道样例: ${rawClip.tracks.slice(0, 4).map((t) => t.name).join(' | ')}`);
        const animBoneNames: string[] = [];
        animObj.traverse((n) => { if ((n as THREE.Bone).isBone) animBoneNames.push(n.name); });
        out.push(`anim 骨骼数=${animBoneNames.length}，样例: ${animBoneNames.slice(0, 8).join(' | ')}`);
        // anim t=0 全层级位置（re-pose walk 设计用）
        const t0Bones = ['mixamorigHips', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigNeck', 'mixamorigHead',
            'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
            'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
            'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot'];
        out.push(`--- 2.5 anim t=0 各骨世界位置/朝向 ---`);
        for (const bn of t0Bones) {
            const p = boneWorldPos(animObj, bn);
            const q = boneWorldQuat(animObj, bn);
            const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
            out.push(`${bn}: pos=${fmtV(p)} euler(${e.x.toFixed(1)},${e.y.toFixed(1)},${e.z.toFixed(1)})`);
        }
        // 模型绑定各骨世界位置（re-pose 前）
        out.push(`--- 2.6 模型 bind 各骨世界位置（re-pose 前）---`);
        for (const bn of t0Bones) {
            const p = boneWorldPos(model, bn);
            out.push(`${bn}: pos=${fmtV(p)}`);
        }

        // 4. normalizeRootMotion 后（未播放）—— animloaded 静止姿态
        const model2 = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model2);
        const animObj2 = parseFreshFbx(ANIM_FBX);
        const clip2 = normalizeRootMotion(animObj2.animations[0], model2, animObj2);
        model2.updateMatrixWorld(true);
        out.push(`--- 4. normalizeRootMotion 后未播放（animloaded 静止姿态）---`);
        out.push(`Hips euler=${JSON.stringify(torsoTwist(model2))}`);
        dumpArmPose('animloaded', model2, out);
        // Spine 相对竖直
        const spineQ = boneWorldQuat(model2, 'mixamorigSpine');
        const spineE = new THREE.Euler().setFromQuaternion(spineQ, 'YXZ');
        out.push(`Spine euler=${spineE.x.toFixed(1)},${spineE.y.toFixed(1)},${spineE.z.toFixed(1)}`);
        const sh = boneWorldPos(model2, 'mixamorigLeftShoulder');
        const fo = boneWorldPos(model2, 'mixamorigLeftForeArm');
        const ha = boneWorldPos(model2, 'mixamorigLeftHand');
        out.push(`左臂 sh=${fmtV(sh)} fo=${fmtV(fo)} ha=${fmtV(ha)}`);

        // 4.5 网格蒙皮测量（animloaded 静止 + 播放 t=0）
        const mesh = firstMesh(model2);
        model2.updateMatrixWorld(true);
        {
            const bm = new Map<string, THREE.Matrix4>();
            model2.traverse((n) => { if ((n as THREE.Bone).isBone) bm.set(n.name, (n as THREE.Bone).matrixWorld.clone()); });
            const skin = gpuSkinWorld(mesh, bm);
            const c = skinClusterCentroid(mesh, skin, 0.3);
            out.push(`--- 4.5 网格蒙皮 animloaded（未播放）---`);
            dumpMeshArm('animloaded', c, out);
        }
        // 5. 播放 t=0（mixer 首帧，对比）
        const mixer = new THREE.AnimationMixer(model2);
        const action = mixer.clipAction(clip2);
        action.reset(); action.play();
        mixer.setTime(0);
        model2.updateMatrixWorld(true);
        out.push(`--- 5. 播放 t=0（mixer 首帧）---`);
        out.push(`Hips euler=${JSON.stringify(torsoTwist(model2))}`);
        dumpArmPose('play0', model2, out);
        {
            const bm = new Map<string, THREE.Matrix4>();
            model2.traverse((n) => { if ((n as THREE.Bone).isBone) bm.set(n.name, (n as THREE.Bone).matrixWorld.clone()); });
            const skin = gpuSkinWorld(mesh, bm);
            const c = skinClusterCentroid(mesh, skin, 0.3);
            out.push(`--- 5.5 网格蒙皮 play0 ---`);
            dumpMeshArm('play0', c, out);
        }

        console.log(out.join('\n'));
        fs.writeFileSync(path.join(__dirname, 'tmp-static-pose.log'), out.join('\n'), 'utf8');
        expect(1).toBe(1);
    });
});
