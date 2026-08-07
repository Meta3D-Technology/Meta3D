/**
 * tmp-stage2-diag — 阶段2 修复前几何诊断
 * 验证 re-pose 仅改 Hips 是否会破坏躯干链，以及 fix1（worldQ root 分支）的实际效果
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
function worldQuat(root: THREE.Object3D, name: string): THREE.Quaternion {
    let q = new THREE.Quaternion();
    root.traverse((n) => { if ((n as THREE.Bone).isBone && n.name === name) q = (n as THREE.Bone).getWorldQuaternion(new THREE.Quaternion()); });
    return q;
}
function eStr(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return `(${(e.x * 180 / Math.PI).toFixed(1)},${(e.y * 180 / Math.PI).toFixed(1)},${(e.z * 180 / Math.PI).toFixed(1)})`;
}
function eStrR(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return `(${e.x.toFixed(2)},${e.y.toFixed(2)},${e.z.toFixed(2)})`;
}
const CHAIN = ['mixamorigHips', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigNeck', 'mixamorigHead',
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot'];

function dumpChain(label: string, root: THREE.Object3D, out: string[]): void {
    out.push(`--- ${label} ---`);
    for (const bn of CHAIN) {
        out.push(`${bn}: world=${eStr(worldQuat(root, bn))}`);
    }
}

describe('tmp-stage2-diag', () => {
    test('re-pose 仅改 Hips 的几何效果 + fix1 播放效果', () => {
        const out: string[] = [];

        // A. 原始 converted 模型
        const modelA = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelA);
        modelA.updateMatrixWorld(true);
        dumpChain('A. converted raw', modelA, out);
        out.push('');

        // B. anim t=0 目标
        const animB = parseFreshFbx(ANIM_FBX);
        const rawClip = animB.animations[0];
        const poseMixer = new THREE.AnimationMixer(animB);
        const poseAction = poseMixer.clipAction(rawClip);
        poseAction.reset(); poseAction.play();
        poseMixer.setTime(0);
        animB.updateMatrixWorld(true);
        dumpChain('B. anim t=0 (re-pose 目标)', animB, out);
        out.push('');

        // C. normalizeRootMotion 后（当前实现，未播放）
        const modelC = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelC);
        const animC = parseFreshFbx(ANIM_FBX);
        normalizeRootMotion(animC.animations[0], modelC, animC);
        modelC.updateMatrixWorld(true);
        dumpChain('C. normalize 后未播放（当前）', modelC, out);
        out.push('');

        // D. 手动 re-pose 仅 Hips → anim t=0 world（验证是否会破坏躯干）
        const modelD = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelD);
        const animD = parseFreshFbx(ANIM_FBX);
        const clipD = animD.animations[0];
        // 驱动 animD 到 t=0 作为 re-pose 目标
        const mD = new THREE.AnimationMixer(animD);
        const aD = mD.clipAction(clipD);
        aD.reset(); aD.play();
        mD.setTime(0);
        animD.updateMatrixWorld(true);
        // 找模型 root bone
        const boneByNameD = new Map<string, THREE.Bone>();
        modelD.traverse((n) => { if ((n as THREE.Bone).isBone) boneByNameD.set(n.name, n as THREE.Bone); });
        const hipsD = boneByNameD.get('mixamorigHips')!;
        const animHipsD = (() => { let h: THREE.Bone | null = null; animD.traverse((n) => { if ((n as THREE.Bone).isBone && n.name === 'mixamorigHips') h = n as THREE.Bone; }); return h!; })();
        const targetQ = new THREE.Quaternion().setFromRotationMatrix(animHipsD.matrixWorld);
        const parentD = hipsD.parent!;
        const pQ = new THREE.Quaternion().setFromRotationMatrix(parentD.matrixWorld);
        const lq = pQ.clone().invert().multiply(targetQ);
        hipsD.quaternion.copy(lq);
        modelD.updateMatrixWorld(true);
        dumpChain('D. 仅 re-pose Hips→anim t=0（躯干是否破坏）', modelD, out);
        out.push('');
        // D 的躯干偏离判断
        const spineDTilt = worldQuat(modelD, 'mixamorigSpine').angleTo(worldQuat(modelA, 'mixamorigSpine')) * 180 / Math.PI;
        out.push(`D. Spine 相对原始 bind 的旋转角 = ${spineDTilt.toFixed(1)}°（>15° 则仅改 Hips 会破坏躯干）`);
        out.push('');
        out.push(`A.Hips bind euler=${eStrR(worldQuat(modelA, 'mixamorigHips'))}`);
        out.push(`B.anim t=0 Hips euler=${eStrR(worldQuat(animB, 'mixamorigHips'))}`);
        out.push(`C.normalize 后 Hips euler=${eStrR(worldQuat(modelC, 'mixamorigHips'))}`);

        // ── E. 修复后（当前源码含 fix1+fix2）：静态帧 + 播放 t=0 全链 ──
        const modelE = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelE);
        const animE = parseFreshFbx(ANIM_FBX);
        const clipE = normalizeRootMotion(animE.animations[0], modelE, animE);
        modelE.updateMatrixWorld(true);
        dumpChain('E. 修复后 静态帧（未播放）', modelE, out);
        // 静态帧躯干/腿偏离 anim t=0
        const chainB = ['mixamorigHips', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigNeck', 'mixamorigHead'];
        const chainL = ['mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot'];
        let worstTorso = 0, worstLeg = 0;
        for (const bn of [...chainB, ...chainL]) {
            const dev = worldQuat(modelE, bn).angleTo(worldQuat(animB, bn)) * 180 / Math.PI;
            if (chainB.includes(bn)) worstTorso = Math.max(worstTorso, dev);
            else worstLeg = Math.max(worstLeg, dev);
        }
        out.push(`E. 静态帧 躯干链 worst vs anim t=0 = ${worstTorso.toFixed(1)}°；腿链 worst = ${worstLeg.toFixed(1)}°（应小，证明 re-pose 未破坏躯干/腿）`);
        out.push('');
        // 播放 t=0
        const mixerE = new THREE.AnimationMixer(modelE);
        const actionE = mixerE.clipAction(clipE);
        actionE.reset(); actionE.play();
        mixerE.setTime(0);
        modelE.updateMatrixWorld(true);
        dumpChain('F. 修复后 播放 t=0', modelE, out);
        out.push(`F. 播放t0 Hips vs anim t=0 = ${(worldQuat(modelE, 'mixamorigHips').angleTo(worldQuat(animB, 'mixamorigHips')) * 180 / Math.PI).toFixed(1)}°`);
        out.push('');

        console.log(out.join('\n'));
        fs.writeFileSync(path.join(__dirname, 'tmp-stage2-diag.log'), out.join('\n'), 'utf8');
        expect(1).toBe(1);
    });
});
