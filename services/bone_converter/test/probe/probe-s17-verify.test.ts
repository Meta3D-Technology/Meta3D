/**
 * probe-s17-verify — 验证 skinWithBoneMatrices 的 getX(i*4+k) 读法是否损坏蒙皮，
 * 以及正确的 .array 直读在 bind 姿态能否复现原始顶点（判定 S17 必须用正确读法）。
 * Run: cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern "probe-s17-verify" --forceExit
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
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** S15 现用的 getX(i*4+k) 读法 */
function skinBuggy(mesh: THREE.SkinnedMesh, boneMatrices: Map<string, THREE.Matrix4>): THREE.Vector3[] {
    mesh.updateMatrixWorld(true);
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const n = posAttr.count;
    const out: THREE.Vector3[] = new Array(n);
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const bi = idxAttr.getX(i * 4 + k);
            const w = wgtAttr.getX(i * 4 + k);
            if (w === 0) continue;
            const bone = sk.bones[bi];
            if (!bone) continue;
            const m = boneMatrices.get(bone.name);
            if (!m) continue;
            boneMat.copy(m).multiply(sk.boneInverses[bi]);
            const c = new THREE.Vector3().copy(vBind).applyMatrix4(boneMat).multiplyScalar(w);
            acc.add(c);
        }
        acc.applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

/** 正确读法：直接读 .array[i*4+k] */
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
            const c = new THREE.Vector3().copy(vBind).applyMatrix4(boneMat).multiplyScalar(w);
            acc.add(c);
        }
        acc.applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

test('probe-s17-verify: getX(i*4+k) 读法 vs .array 直读', () => {
    const model = parseFreshFbx(MODEL_FBX);
    convertTripoToMixamo(model);
    let mesh: THREE.SkinnedMesh | null = null;
    model.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh;
    });
    expect(mesh).toBeTruthy();
    model.updateMatrixWorld(true);
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const restMat = new Map<string, THREE.Matrix4>();
    for (const [bn, b] of boneByName) restMat.set(bn, b.matrixWorld.clone());

    const correct = skinCorrect(mesh!, restMat);
    const buggy = skinBuggy(mesh!, restMat);
    const posAttr = mesh!.geometry.attributes.position as THREE.BufferAttribute;
    const n = posAttr.count;
    const posBind = new THREE.Vector3();
    let maxC = 0, sumC = 0, maxB = 0, sumB = 0;
    for (let i = 0; i < n; i++) {
        posBind.fromBufferAttribute(posAttr as any, i).applyMatrix4(mesh!.matrixWorld);
        const dC = correct[i].distanceTo(posBind);
        const dB = buggy[i].distanceTo(posBind);
        if (dC > maxC) maxC = dC;
        sumC += dC;
        if (dB > maxB) maxB = dB;
        sumB += dB;
    }
    console.log(`[verify] 正确读法 bind 蒙皮 vs 原始顶点: avg=${(sumC / n).toFixed(4)} max=${maxC.toFixed(4)}`);
    console.log(`[verify] buggy getX(i*4+k) bind 蒙皮 vs 原始顶点: avg=${(sumB / n).toFixed(4)} max=${maxB.toFixed(4)}`);
});
