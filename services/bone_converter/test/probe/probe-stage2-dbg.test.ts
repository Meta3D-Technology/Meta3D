/**
 * probe-stage2-dbg — 调试：getWorldQuaternion vs matrixWorld 差异根因
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}
function findObj(root: THREE.Object3D, name: string): THREE.Object3D {
    let hit: THREE.Object3D | null = null;
    root.traverse((n) => { if (n.name === name) hit = n; });
    if (!hit) throw new Error('obj not found: ' + name);
    return hit;
}
function eStr(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return `(${(e.x * 180 / Math.PI).toFixed(2)},${(e.y * 180 / Math.PI).toFixed(2)},${(e.z * 180 / Math.PI).toFixed(2)})`;
}

describe('probe-stage2-dbg', () => {
    test('dump all Hips measurement paths', () => {
        const out: string[] = [];
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const hips = findObj(model, 'mixamorigHips') as THREE.Bone;
        const arm = findObj(model, 'Armature') as THREE.Object3D;
        out.push(`hips.matrixAutoUpdate=${hips.matrixAutoUpdate} arm.matrixAutoUpdate=${arm.matrixAutoUpdate} model.matrixAutoUpdate=${(model as any).matrixAutoUpdate}`);
        // bone.matrix (raw local) vs compose(position,quaternion,scale)
        {
            const m1 = hips.matrix.clone();
            const c = new THREE.Matrix4().compose(hips.position, hips.quaternion, hips.scale);
            const d1 = m1.elements.map((v, i) => (v - c.elements[i]).toExponential(2)).join(',');
            out.push(`hips.matrix   = [${m1.elements.map((v) => v.toFixed(4)).join(',')}]`);
            out.push(`hips.compose  = [${c.elements.map((v) => v.toFixed(4)).join(',')}]`);
            out.push(`hips matrix vs compose diff = ${d1}`);
        }
        // Armature local matrix
        {
            const m1 = arm.matrix.clone();
            const c = new THREE.Matrix4().compose(arm.position, arm.quaternion, arm.scale);
            out.push(`arm.matrix   = [${m1.elements.map((v) => v.toFixed(4)).join(',')}]`);
            out.push(`arm.compose  = [${c.elements.map((v) => v.toFixed(4)).join(',')}]`);
            out.push(`arm matrix vs compose diff = ${m1.elements.map((v, i) => (v - c.elements[i]).toExponential(2)).join(',')}`);
        }
        // 测量路径 A：updateMatrixWorld(true) 后读 matrixWorld
        model.updateMatrixWorld(true);
        out.push(`A) after updateMatrixWorld(true): matrixWorld quat euler=${eStr(new THREE.Quaternion().setFromRotationMatrix(hips.matrixWorld))}`);
        // 测量路径 B：getWorldQuaternion
        const qB = hips.getWorldQuaternion(new THREE.Quaternion());
        out.push(`B) getWorldQuaternion euler=${eStr(qB)}`);
        // 测量路径 C：updateWorldMatrix(true,false) 后读 matrixWorld
        hips.updateWorldMatrix(true, false);
        out.push(`C) after updateWorldMatrix(true,false): matrixWorld quat euler=${eStr(new THREE.Quaternion().setFromRotationMatrix(hips.matrixWorld))}`);
        // 测量路径 D：先 A 再 B（确认是否互相污染）
        model.updateMatrixWorld(true);
        const qD = hips.getWorldQuaternion(new THREE.Quaternion());
        out.push(`D) updateMatrixWorld(true) then getWorldQuaternion euler=${eStr(qD)}`);
        const qE = new THREE.Quaternion().setFromRotationMatrix(hips.matrixWorld);
        out.push(`E) after D: matrixWorld euler=${eStr(qE)}`);
        // 全部子骨骼 world quat 快照（用两种方法）对比 32° 来源
        const bones: THREE.Bone[] = [];
        model.traverse((n) => { if ((n as THREE.Bone).isBone) bones.push(n as THREE.Bone); });
        for (const b of bones) {
            const qw = b.getWorldQuaternion(new THREE.Quaternion());
            const qm = new THREE.Quaternion().setFromRotationMatrix(b.matrixWorld);
            const same = qw.angleTo(qm) * 180 / Math.PI < 0.01;
            out.push(`${b.name}: getWorldQuat=${eStr(qw)} matrixWorld=${eStr(qm)} ${same ? 'SAME' : 'DIFF'}`);
        }
        console.log(out.join('\n'));
        fs.writeFileSync(path.join(__dirname, 'probe-stage2-dbg.log'), out.join('\n'), 'utf8');
        expect(1).toBe(1);
    });
});
