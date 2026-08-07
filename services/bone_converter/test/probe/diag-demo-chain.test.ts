/* 临时诊断：复刻 demo 实机完整调用链，验证 re-pose 是否生效 + 播放时骨骼姿态 */
import * as THREE from 'three';
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

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

const path = require('path');
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');
const ANIM_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');

function parseFreshFbx(p: string): THREE.Object3D {
    const fs = require('fs');
    const fbx = require('three/examples/jsm/loaders/FBXLoader');
    const loader = new fbx.FBXLoader();
    const buf = fs.readFileSync(p);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return loader.parse(ab, '');
}
function quatAngleDeg(q1: THREE.Quaternion, q2: THREE.Quaternion): number {
    const d = q1.dot(q2);
    return Math.min(180, Math.abs(2 * Math.acos(Math.min(1, Math.abs(d))) * 180 / Math.PI));
}
function boneByNameMap(root: THREE.Object3D): Map<string, THREE.Bone> {
    const m = new Map<string, THREE.Bone>();
    root.traverse((n) => { if ((n as THREE.Bone).isBone) m.set(n.name, n as THREE.Bone); });
    return m;
}

const ARM8 = ['mixamorigLeftShoulder','mixamorigLeftArm','mixamorigLeftForeArm','mixamorigLeftHand','mixamorigRightShoulder','mixamorigRightArm','mixamorigRightForeArm','mixamorigRightHand'];

describe('diag-demo-chain', () => {
    test('demo 完整链路：转换 → 加载动画 → normalizeRootMotion → mixer 播放', () => {
        // 1. demo: 加载模型（原始 FBX）
        const model = parseFreshFbx(MODEL_FBX);
        // 2. demo: convertTripoToMixamo
        const report = convertTripoToMixamo(model);
        console.log('convert report:', JSON.stringify(report));
        // 3. demo: 加载动画
        const animObj = parseFreshFbx(ANIM_FBX);
        const animClip = animObj.animations[0];
        const animSkeleton = animObj;
        // 4. demo: normalizeRootMotion(animClip, model, animSkeleton)
        const clip = normalizeRootMotion(animClip, model, animSkeleton ?? undefined);
        console.log('clip tracks:', clip.tracks.length);
        // 5. demo: 建立 mixer 播放
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.reset();
        action.play();

        // 检查 re-pose 后模型 bind（未播放时）手臂姿态
        model.updateMatrixWorld(true);
        const bones = boneByNameMap(model);
        const bindQ = new Map<string, THREE.Quaternion>();
        const bindPos = new Map<string, THREE.Vector3>();
        for (const bn of ARM8) {
            const b = bones.get(bn);
            if (!b) { console.log(`MISSING BONE: ${bn}`); continue; }
            bindQ.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
            bindPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
        }
        // anim 参考 t=0 姿态
        const animRef = parseFreshFbx(ANIM_FBX);
        const refMixer = new THREE.AnimationMixer(animRef);
        const refAction = refMixer.clipAction(animRef.animations[0]);
        refAction.reset(); refAction.play();
        refMixer.setTime(0);
        animRef.updateMatrixWorld(true);
        const animBones = boneByNameMap(animRef);
        const animQ0 = new Map<string, THREE.Quaternion>();
        const animPos0 = new Map<string, THREE.Vector3>();
        for (const bn of ARM8) {
            const b = animBones.get(bn);
            if (!b) continue;
            animQ0.set(bn, b.getWorldQuaternion(new THREE.Quaternion()));
            animPos0.set(bn, b.getWorldPosition(new THREE.Vector3()));
        }
        console.log('=== re-pose 后 bind（未播放） vs anim t=0 ===');
        for (const bn of ARM8) {
            const bq = bindQ.get(bn);
            const aq = animQ0.get(bn);
            if (!bq || !aq) continue;
            const ang = quatAngleDeg(bq, aq);
            console.log(`${bn}: bindQ vs animQ0 = ${ang.toFixed(1)}°`);
        }
        // 播放各时刻
        console.log('=== 播放后 worldQ vs anim t ===');
        for (const tm of [0, 1.5, 4.5]) {
            mixer.setTime(tm);
            model.updateMatrixWorld(true);
            refMixer.setTime(tm);
            animRef.updateMatrixWorld(true);
            let worst = 0; let worstBone = '';
            for (const bn of ARM8) {
                const b = bones.get(bn);
                const ab = animBones.get(bn);
                if (!b || !ab) continue;
                const wq = b.getWorldQuaternion(new THREE.Quaternion());
                const aq = ab.getWorldQuaternion(new THREE.Quaternion());
                const ang = quatAngleDeg(wq, aq);
                if (ang > worst) { worst = ang; worstBone = bn; }
            }
            console.log(`t=${tm}: D1 worst=${worst.toFixed(1)}° (${worstBone})`);
        }
        // upper arm 是否真的不动：播放 t=0 vs t=4.5 的 Shoulder/Arm worldQ 变化
        mixer.setTime(0); model.updateMatrixWorld(true);
        const qStart = new Map<string, THREE.Quaternion>();
        for (const bn of ['mixamorigLeftShoulder','mixamorigLeftArm','mixamorigLeftForeArm','mixamorigLeftHand']) {
            qStart.set(bn, bones.get(bn)!.getWorldQuaternion(new THREE.Quaternion()).clone());
        }
        mixer.setTime(4.5); model.updateMatrixWorld(true);
        console.log('=== upper arm 动没动（播放 t=0 → t=4.5 worldQ 变化角）===');
        for (const bn of ['mixamorigLeftShoulder','mixamorigLeftArm','mixamorigLeftForeArm','mixamorigLeftHand']) {
            const q1 = qStart.get(bn)!;
            const q2 = bones.get(bn)!.getWorldQuaternion(new THREE.Quaternion());
            console.log(`${bn}: ${quatAngleDeg(q1, q2).toFixed(1)}°`);
        }
    });
});
