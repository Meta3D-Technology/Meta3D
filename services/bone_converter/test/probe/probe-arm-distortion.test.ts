/**
 * 第七轮探针：左臂扭曲实锤
 *
 * 对 t=0 姿态，输出左/右臂链每个骨骼的：
 *  - 世界位置 / 世界朝向
 *  - 段方向：Shoulder→Arm、Arm→ForeArm、ForeArm→Hand
 *  - 肘部弯曲角 = Arm→ForeArm 段 与 ForeArm→Hand 段夹角（0=伸直，~180=反折）
 *  - 每段与竖直向下 (0,-1,0) 的夹角
 *
 * 对比三组数据：
 *  ① 当前实现输出（normalizeRootMotion + AnimationMixer）
 *  ② 原始动画骨架 world（Mixamo Idle t=0 原始值，当前实现 ARM_BONES 直接取这个）
 *  ③ 模型 bind 手臂朝向（转换后、未播放）
 *
 * 运行：cd packages/bone_converter && npx jest --config jest.config.js test/probe/probe-arm-distortion.test.ts
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
    addEventListener(_event: string, _cb: any) { }
    removeEventListener(_event: string, _cb: any) { }
    setAttribute(_name: string, _value: string) { }
    getAttribute(_name: string) { return null; }
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

const ARM_BONES = [
    'mixamorigLeftShoulder',
    'mixamorigLeftArm',
    'mixamorigLeftForeArm',
    'mixamorigLeftHand',
    'mixamorigRightShoulder',
    'mixamorigRightArm',
    'mixamorigRightForeArm',
    'mixamorigRightHand',
];

function boneWorldMap(model: THREE.Object3D): Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }> {
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

/** 段方向（从 boneA 世界位置指向 boneB 世界位置）与竖直向下 (0,-1,0) 的夹角 */
function segAngleToDown(m: Map<string, { pos: THREE.Vector3 }>, a: string, b: string): number {
    const pa = m.get(a)!.pos;
    const pb = m.get(b)!.pos;
    const dir = pb.clone().sub(pa).normalize();
    const down = new THREE.Vector3(0, -1, 0);
    const dot = Math.max(-1, Math.min(1, dir.dot(down)));
    return Math.acos(dot) * 180 / Math.PI;
}

/** 肘部弯曲角：Arm→ForeArm 段方向 与 ForeArm→Hand 段方向 的夹角 */
function elbowBend(m: Map<string, { pos: THREE.Vector3 }>, arm: string, forearm: string, hand: string): number {
    const pa = m.get(arm)!.pos;
    const pf = m.get(forearm)!.pos;
    const ph = m.get(hand)!.pos;
    const d1 = pf.clone().sub(pa).normalize();
    const d2 = ph.clone().sub(pf).normalize();
    const dot = Math.max(-1, Math.min(1, d1.dot(d2)));
    return Math.acos(dot) * 180 / Math.PI;
}

function report(label: string, m: Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>): void {
    console.log(`\n===== ${label} =====`);
    for (const bn of ARM_BONES) {
        const e = m.get(bn);
        if (!e) { console.log(`${bn}: MISSING`); continue; }
        const eul = new THREE.Euler().setFromQuaternion(e.quat, 'XYZ');
        console.log(
            `${bn}\n  pos=(${e.pos.x.toFixed(4)}, ${e.pos.y.toFixed(4)}, ${e.pos.z.toFixed(4)})\n` +
            `  quat=(${e.quat.x.toFixed(4)}, ${e.quat.y.toFixed(4)}, ${e.quat.z.toFixed(4)}, ${e.quat.w.toFixed(4)})` +
            ` eulXYZ=(${(eul.x * 180 / Math.PI).toFixed(1)}, ${(eul.y * 180 / Math.PI).toFixed(1)}, ${(eul.z * 180 / Math.PI).toFixed(1)})`
        );
    }
    for (const side of ['Left', 'Right'] as const) {
        const S = `mixamorig${side}Shoulder`;
        const A = `mixamorig${side}Arm`;
        const F = `mixamorig${side}ForeArm`;
        const H = `mixamorig${side}Hand`;
        const shA = segAngleToDown(m, S, A);
        const aF = segAngleToDown(m, A, F);
        const fH = segAngleToDown(m, F, H);
        const bend = elbowBend(m, A, F, H);
        console.log(
            `${side}臂段方向 vs 竖直向下: S→Arm=${shA.toFixed(2)}°  Arm→ForeArm=${aF.toFixed(2)}°  ForeArm→Hand=${fH.toFixed(2)}°` +
            `  肘部弯曲角=${bend.toFixed(2)}°`
        );
    }
}

describe('probe-arm-distortion', () => {
    test('t=0 左臂链对比（当前实现 / anim原始 / 模型bind）', () => {
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const animObj = parseFreshFbx(ANIM_FBX);
        const clip = animObj.animations[0];
        const normalizedClip = normalizeRootMotion(clip, model, animObj);

        // ① 当前实现输出
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(normalizedClip);
        action.reset();
        action.play();
        mixer.setTime(0);
        const cur = boneWorldMap(model);
        report('当前实现 normalizeRootMotion + playback t=0', cur);

        // ② 原始动画骨架 world（Mixamo Idle t=0 原始值）
        const animMixer = new THREE.AnimationMixer(animObj);
        const aAction = animMixer.clipAction(clip);
        aAction.reset();
        aAction.play();
        animMixer.setTime(0);
        const anim = boneWorldMap(animObj);
        report('原始动画骨架 Mixamo Idle t=0 (world)', anim);

        // ③ 模型 bind 手臂朝向（转换后、未播放）
        const bind = boneWorldMap(model);
        report('模型 bind（转换后未播放）', bind);

        // bind 左右臂不对称检查
        const lS = bind.get('mixamorigLeftShoulder')!.pos;
        const rS = bind.get('mixamorigRightShoulder')!.pos;
        console.log(`\nbind LeftShoulder=(${lS.x.toFixed(4)}, ${lS.y.toFixed(4)}, ${lS.z.toFixed(4)})`);
        console.log(`bind RightShoulder=(${rS.x.toFixed(4)}, ${rS.y.toFixed(4)}, ${rS.z.toFixed(4)})`);
        console.log(`bind LeftArm 段角 vs down=${segAngleToDown(bind, 'mixamorigLeftShoulder', 'mixamorigLeftArm').toFixed(2)}°`);
        console.log(`bind RightArm 段角 vs down=${segAngleToDown(bind, 'mixamorigRightShoulder', 'mixamorigRightArm').toFixed(2)}°`);

        expect(true).toBe(true);
    });
});
