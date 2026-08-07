/**
 * probe-s17-red — 预演 S17 断言：蒙皮顶点质心段方向 vs 骨位置段方向（帧内自洽）。
 * cluster = 该骨累计权重 ≥ 0.3 的顶点；质心 = Σ w·vSkin / Σ w（vSkin = 正确 CPU 蒙皮世界顶点）。
 * segSkin = unit(质心(下骨) − 质心(上骨))；segBone = unit(下骨.worldPos − 上骨.worldPos)。
 * 目标：拿到当前版本 6 时间点 × 左右 × 上下臂的 angle(segBone, segSkin) 数值，确认 101~165° RED。
 * Run: cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-s17-red" --forceExit
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

/** 正确 CPU 蒙皮：v = Σ w·(boneMat·boneInv)·vBind + mesh.matrixWorld（.array 直读） */
function skinCorrect(mesh: THREE.SkinnedMesh, boneMatrices: Map<string, THREE.Matrix4>): THREE.Vector3[] {
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

/** cluster = 骨 b 上累计权重 ≥ 0.3 的顶点；质心 = Σ w·vSkin / Σ w */
function clusterCentroids(
    mesh: THREE.SkinnedMesh,
    vSkin: THREE.Vector3[],
    bones: string[],
): Map<string, THREE.Vector3> {
    const sk = mesh.skeleton;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const W_THRESHOLD = 0.3;
    const sumW = new Map<string, number>();
    const sumV = new Map<string, THREE.Vector3>();
    for (const bn of bones) { sumW.set(bn, 0); sumV.set(bn, new THREE.Vector3()); }
    const n = (mesh.geometry.attributes.position as THREE.BufferAttribute).count;
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < 4; k++) {
            const w = wa[i * 4 + k];
            if (w < W_THRESHOLD) continue;
            const bi = ia[i * 4 + k];
            const bone = sk.bones[bi];
            if (!bone || !sumW.has(bone.name)) continue;
            sumW.set(bone.name, sumW.get(bone.name)! + w);
            sumV.get(bone.name)!.addScaledVector(vSkin[i], w);
        }
    }
    const out = new Map<string, THREE.Vector3>();
    for (const bn of bones) {
        const s = sumW.get(bn)!;
        out.set(bn, s > 0 ? sumV.get(bn)!.multiplyScalar(1 / s) : new THREE.Vector3());
    }
    return out;
}

test('probe-s17-red: 蒙皮质心段方向 vs 骨位置段方向（帧内）', () => {
    const model = parseFreshFbx(MODEL_FBX);
    convertTripoToMixamo(model);
    const animObj = parseFreshFbx(ANIM_FBX);
    const rawClip = animObj.animations[0];
    const normalizedClip = normalizeRootMotion(rawClip, model, animObj);
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(normalizedClip);
    action.reset();
    action.play();

    let mesh: THREE.SkinnedMesh | null = null;
    model.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh;
    });
    expect(mesh).toBeTruthy();

    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const ARM_BONES = [
        'mixamorigLeftShoulder', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
        'mixamorigRightShoulder', 'mixamorigRightForeArm', 'mixamorigRightHand',
    ];

    console.log('t | 侧 | 段 | segBone | segSkin | angle(segBone,segSkin)');
    const rows: string[] = [];
    let worst = 0;
    let worstDesc = '';
    for (const t of TIMES) {
        mixer.setTime(t);
        model.updateMatrixWorld(true);
        const boneMat = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) boneMat.set(bn, b.matrixWorld.clone());
        const skinned = skinCorrect(mesh!, boneMat);
        const c = clusterCentroids(mesh!, skinned, ARM_BONES);
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const bSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
            const bFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const bHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            // 上臂段
            const segBoneUp = bFo.clone().sub(bSh).normalize();
            const segSkinUp = c.get(fo)!.clone().sub(c.get(sh)!).normalize();
            const devUp = angleDeg(segBoneUp, segSkinUp);
            // 前臂段
            const segBoneFo = bHa.clone().sub(bFo).normalize();
            const segSkinFo = c.get(ha)!.clone().sub(c.get(fo)!).normalize();
            const devFo = angleDeg(segBoneFo, segSkinFo);
            const fmt = (v: THREE.Vector3) => `(${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)})`;
            const rUp = `${t} | ${side} | 上臂 | ${fmt(segBoneUp)} | ${fmt(segSkinUp)} | ${devUp.toFixed(1)}°`;
            const rFo = `${t} | ${side} | 前臂 | ${fmt(segBoneFo)} | ${fmt(segSkinFo)} | ${devFo.toFixed(1)}°`;
            rows.push(rUp);
            rows.push(rFo);
            if (devUp > worst) { worst = devUp; worstDesc = `t=${t} ${side} 上臂`; }
            if (devFo > worst) { worst = devFo; worstDesc = `t=${t} ${side} 前臂`; }
        }
    }
    console.log(rows.join('\n'));
    console.log(`worst=${worst.toFixed(1)}° @ ${worstDesc}`);
});
