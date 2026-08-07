/**
 * diag-lod2-orientation.steps.ts — 诊断 lod2 官方模型为何「横着」显示
 * 对比：399df0b7（Tripo）vs lod2（官方）的 root 旋转 / bbox / 朝向
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

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const LOD2 = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx');

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

describe('DIAG: lod2 orientation', () => {
    it('root/quat/bbox compare', () => {
        const t = loadFbx(TRIPO);
        const l = loadFbx(LOD2);
        for (const [name, root] of [['Tripo', t], ['lod2', l]] as const) {
            const box = new THREE.Box3().setFromObject(root);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const q = root.quaternion;
            console.log(`[${name}] root.name=${root.name} quat=(${q.x.toFixed(4)},${q.y.toFixed(4)},${q.z.toFixed(4)},${q.w.toFixed(4)})`);
            console.log(`[${name}] bbox min=(${box.min.x.toFixed(2)},${box.min.y.toFixed(2)},${box.min.z.toFixed(2)}) max=(${box.max.x.toFixed(2)},${box.max.y.toFixed(2)},${box.max.z.toFixed(2)})`);
            console.log(`[${name}] center=(${center.x.toFixed(2)},${center.y.toFixed(2)},${center.z.toFixed(2)}) size=(${size.x.toFixed(2)},${size.y.toFixed(2)},${size.z.toFixed(2)})`);
            // 最高骨骼（Y 最大）判断站立方向
            let tallest: THREE.Bone | null = null;
            let tallY = -Infinity;
            root.traverse((n) => {
                if ((n as THREE.Bone).isBone) {
                    n.updateWorldMatrix(true, false);
                    const y = n.matrixWorld.elements[13];
                    if (y > tallY) { tallY = y; tallest = n as THREE.Bone; }
                }
            });
            console.log(`[${name}] tallest bone=${tallest?.name} worldY=${tallY.toFixed(2)}`);
        }
    }, 120000);
});
