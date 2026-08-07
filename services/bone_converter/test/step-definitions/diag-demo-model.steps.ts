/**
 * diag-demo-model-vs-lod2.steps.ts — 临时诊断：demo 实际加载的 Tripo 模型 vs lod2 官方
 *
 * demo/main.ts MODEL_URL=/tripo-model/tripo_convert_09140e64...fbx
 * 验证它和 snapshot_EliteGiantess9/lod2 是否同一网格（决定 officialRestPose 能否直接用于 demo）
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
const DEMO_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);
const LOD2_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

describe('DIAG: demo model vs lod2 official', () => {
    it('same mesh?', () => {
        const demoRoot = loadFbx(DEMO_FBX);
        const lod2Root = loadFbx(LOD2_FBX);

        const meshes: THREE.Mesh[] = [];
        demoRoot.traverse((n) => { if ((n as THREE.Mesh).isMesh) meshes.push(n as THREE.Mesh); });
        const m2: THREE.Mesh[] = [];
        lod2Root.traverse((n) => { if ((n as THREE.Mesh).isMesh) m2.push(n as THREE.Mesh); });
        console.log(`[demo model meshes] ${meshes.length}, [lod2 meshes] ${m2.length}`);
        const g1 = meshes[0]?.geometry as THREE.BufferGeometry | undefined;
        const g2 = m2[0]?.geometry as THREE.BufferGeometry | undefined;
        if (!g1 || !g2) throw new Error('geometry missing');
        const p1 = g1.getAttribute('position');
        const p2 = g2.getAttribute('position');
        console.log(`[demo model pos count] ${p1.count}`);
        console.log(`[lod2 pos count] ${p2.count}`);
        console.log(`相同网格? ${p1.count === p2.count ? '是' : '否(不同模型!)'}`);
    }, 120000);
});
