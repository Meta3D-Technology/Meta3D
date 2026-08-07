/**
 * 第七轮根因探针：左臂扭曲根因定位
 *
 * 输出（对左/右臂链 8 根骨骼）：
 *  - 模型真实 bind（convertTripoToMixamo 后、未播放）世界 quat + 世界 XYZ 轴
 *  - anim 静态 rest（FBXLoader parse 后、未播放）世界 quat + 世界 XYZ 轴
 *  - anim t=0（播放 clip 后）世界 quat + 世界 XYZ 轴
 *  - clip 首帧 local quat（轨道原始值，t=0 第一个关键帧）
 *  - 各骨架段方向（Shoulder→Arm / Arm→ForeArm / ForeArm→Hand）vs 竖直向下
 *
 * 运行：npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-arm-rootcause" --forceExit
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

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

const ARM = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
];

function quatAxis(q: THREE.Quaternion, axis: 'X' | 'Y' | 'Z'): THREE.Vector3 {
    const v = new THREE.Vector3();
    if (axis === 'Z') v.set(0, 0, 1);
    else if (axis === 'Y') v.set(0, 1, 0);
    else v.set(1, 0, 0);
    return v.applyQuaternion(q);
}

function fmtV(v: THREE.Vector3): string {
    return `(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`;
}

function fmtQ(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'XYZ');
    return `q=(${q.x.toFixed(4)}, ${q.y.toFixed(4)}, ${q.z.toFixed(4)}, ${q.w.toFixed(4)}) eul=(${(e.x * 180 / Math.PI).toFixed(1)}, ${(e.y * 180 / Math.PI).toFixed(1)}, ${(e.z * 180 / Math.PI).toFixed(1)})`;
}

function boneWorld(name: string, root: THREE.Object3D): { pos: THREE.Vector3; quat: THREE.Quaternion } | null {
    root.updateMatrixWorld(true);
    let out: { pos: THREE.Vector3; quat: THREE.Quaternion } | null = null;
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone && n.name === name) {
            out = {
                pos: n.getWorldPosition(new THREE.Vector3()),
                quat: n.getWorldQuaternion(new THREE.Quaternion()),
            };
        }
    });
    return out;
}

function segAngleToDown(pa: THREE.Vector3, pb: THREE.Vector3): number {
    const dir = pb.clone().sub(pa).normalize();
    const dot = Math.max(-1, Math.min(1, dir.dot(new THREE.Vector3(0, -1, 0))));
    return Math.acos(dot) * 180 / Math.PI;
}

describe('probe-arm-rootcause', () => {
    test('骨骼轴向与 clip 首帧 local 数据', () => {
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const animObj = parseFreshFbx(ANIM_FBX);
        const clip = animObj.animations[0];

        // anim 静态 rest（未播放）
        const animRest = new Map<string, THREE.Quaternion>();
        for (const bn of ARM) animRest.set(bn, boneWorld(bn, animObj)!.quat.clone());

        // anim t=0（播放 clip）
        const amixer = new THREE.AnimationMixer(animObj);
        const aAct = amixer.clipAction(clip);
        aAct.reset(); aAct.play();
        amixer.setTime(0);
        const animT0 = new Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
        for (const bn of ARM) animT0.set(bn, boneWorld(bn, animObj)!);

        // clip t=0 首帧 local quat（轨道值）
        const clipLocalQ = new Map<string, THREE.Quaternion>();
        for (const t of clip.tracks) {
            if (!t.name.endsWith('.quaternion')) continue;
            const bn = t.name.replace('.quaternion', '');
            if (!ARM.includes(bn)) continue;
            const vals = (t as THREE.QuaternionKeyframeTrack).values as Float32Array;
            if (vals.length >= 4) clipLocalQ.set(bn, new THREE.Quaternion(vals[0], vals[1], vals[2], vals[3]));
        }

        console.log('\n===== 模型真实 bind（convertTripoToMixamo 后、未播放）=====');
        for (const bn of ARM) {
            const w = boneWorld(bn, model);
            if (!w) { console.log(`${bn}: MISSING`); continue; }
            console.log(`${bn}\n  ${fmtQ(w.quat)}\n  localZ=${fmtV(quatAxis(w.quat, 'Z'))} localY=${fmtV(quatAxis(w.quat, 'Y'))}`);
        }
        console.log('\n  bind 段方向 vs 竖直向下:');
        for (const side of ['Left', 'Right'] as const) {
            const S = boneWorld(`mixamorig${side}Shoulder`, model)!.pos;
            const A = boneWorld(`mixamorig${side}Arm`, model)!.pos;
            const F = boneWorld(`mixamorig${side}ForeArm`, model)!.pos;
            const H = boneWorld(`mixamorig${side}Hand`, model)!.pos;
            console.log(`  ${side}: S→Arm=${segAngleToDown(S, A).toFixed(2)}°  Arm→ForeArm=${segAngleToDown(A, F).toFixed(2)}°  ForeArm→Hand=${segAngleToDown(F, H).toFixed(2)}°`);
        }

        console.log('\n===== anim 静态 rest（FBXLoader parse 后、未播放）=====');
        for (const bn of ARM) {
            const q = animRest.get(bn)!;
            console.log(`${bn}\n  ${fmtQ(q)}\n  localZ=${fmtV(quatAxis(q, 'Z'))} localY=${fmtV(quatAxis(q, 'Y'))}`);
        }

        console.log('\n===== anim t=0（播放 clip）=====');
        for (const bn of ARM) {
            const w = animT0.get(bn)!;
            console.log(`${bn}\n  ${fmtQ(w.quat)}\n  localZ=${fmtV(quatAxis(w.quat, 'Z'))} localY=${fmtV(quatAxis(w.quat, 'Y'))}`);
        }
        console.log('\n  anim t=0 段方向 vs 竖直向下:');
        for (const side of ['Left', 'Right'] as const) {
            const S = animT0.get(`mixamorig${side}Shoulder`)!.pos;
            const A = animT0.get(`mixamorig${side}Arm`)!.pos;
            const F = animT0.get(`mixamorig${side}ForeArm`)!.pos;
            const H = animT0.get(`mixamorig${side}Hand`)!.pos;
            console.log(`  ${side}: S→Arm=${segAngleToDown(S, A).toFixed(2)}°  Arm→ForeArm=${segAngleToDown(A, F).toFixed(2)}°  ForeArm→Hand=${segAngleToDown(F, H).toFixed(2)}°`);
        }

        console.log('\n===== clip t=0 首帧 local quat（轨道值）=====');
        for (const bn of ARM) {
            const q = clipLocalQ.get(bn);
            if (!q) { console.log(`${bn}: no track`); continue; }
            console.log(`${bn}: ${fmtQ(q)}`);
        }

        expect(true).toBe(true);
    });
});
