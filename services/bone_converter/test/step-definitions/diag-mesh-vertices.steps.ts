/**
 * diag-mesh-vertices.steps.ts — 临时诊断：Tripo 网格 vs Mixamo 官方网格顶点一致性
 *
 * 验证兄弟判断：Mixamo 上传的就是 Tripo 模型只绑骨，网格顶点应完全一致。
 * 跑法：cd services/bone_converter && npx jest --config jest.config.js --testPathPattern diag-mesh-vertices --forceExit
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
const TRIPO_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const MIXAMO_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function collectMeshes(root: THREE.Object3D): THREE.Mesh[] {
    const meshes: THREE.Mesh[] = [];
    root.traverse((n) => { if ((n as THREE.Mesh).isMesh) meshes.push(n as THREE.Mesh); });
    return meshes;
}

describe('DIAG: mesh vertices Tripo vs Mixamo official', () => {
    it('same vertex count + same positions (or global scale)', () => {
        const tripoRoot = loadFbx(TRIPO_FBX);
        const mixamoRoot = loadFbx(MIXAMO_FBX);

        const tripoMeshes = collectMeshes(tripoRoot);
        const mixamoMeshes = collectMeshes(mixamoRoot);
        console.log(`\n[Tripo meshes] ${tripoMeshes.length}个`);
        console.log(`[Mixamo meshes] ${mixamoMeshes.length}个`);

        const tripoGeom = tripoMeshes[0]?.geometry as THREE.BufferGeometry | undefined;
        const mixamoGeom = mixamoMeshes[0]?.geometry as THREE.BufferGeometry | undefined;
        if (!tripoGeom || !mixamoGeom) throw new Error('mesh geometry missing');

        const tp = tripoGeom.getAttribute('position');
        const mp = mixamoGeom.getAttribute('position');
        console.log(`[Tripo position count] ${tp.count}`);
        console.log(`[Mixamo position count] ${mp.count}`);
        expect(tp.count).toBe(mp.count);

        // 计算包围盒
        const tBox = new THREE.Box3().setFromBufferAttribute(tp as THREE.BufferAttribute);
        const mBox = new THREE.Box3().setFromBufferAttribute(mp as THREE.BufferAttribute);
        console.log(`[Tripo bbox] min=${tBox.min.toArray().map(v=>+v.toFixed(4))} max=${tBox.max.toArray().map(v=>+v.toFixed(4))}`);
        console.log(`[Mixamo bbox] min=${mBox.min.toArray().map(v=>+v.toFixed(4))} max=${mBox.max.toArray().map(v=>+v.toFixed(4))}`);
        const tSize = tBox.getSize(new THREE.Vector3());
        const mSize = mBox.getSize(new THREE.Vector3());
        console.log(`[Tripo size] ${tSize.toArray().map(v=>+v.toFixed(4))}`);
        console.log(`[Mixamo size] ${mSize.toArray().map(v=>+v.toFixed(4))}`);
        const scale = mSize.x / tSize.x;
        console.log(`[scale x ratio (mixamo/tripo)] ${scale.toFixed(6)}`);

        // 采样 20 个顶点对比：Mixamo 顶点 ≈ Tripo 顶点 × s + offset（可能单位不同）
        const s = scale;
        let maxErr = 0;
        let errCount = 0;
        const N = Math.min(tp.count, mp.count);
        for (let i = 0; i < N; i += Math.max(1, Math.floor(N / 20))) {
            const tx = tp.getX(i), ty = tp.getY(i), tz = tp.getZ(i);
            const mx = mp.getX(i), my = mp.getY(i), mz = mp.getZ(i);
            // 尝试：mixamo = tripo*s（无平移）
            const e = Math.hypot(mx - tx * s, my - ty * s, mz - tz * s);
            if (e > maxErr) maxErr = e;
            if (e > 0.01) errCount++;
        }
        console.log(`\n[采样20点: mixamo ≈ tripo×s 最大误差] ${maxErr.toFixed(6)} (0.01 内=纯缩放)`);
        console.log(`[超差点数] ${errCount}/20`);

        // 也测平移：计算质心差
        let cx = 0, cy = 0, cz = 0;
        for (let i = 0; i < 2000; i++) {
            cx += tp.getX(i) * s; cy += tp.getY(i) * s; cz += tp.getZ(i) * s;
        }
        const cxs = cx / 2000, cys = cy / 2000, czs = cz / 2000;
        let mx2 = 0, my2 = 0, mz2 = 0;
        for (let i = 0; i < 2000; i++) {
            mx2 += mp.getX(i); my2 += mp.getY(i); mz2 += mp.getZ(i);
        }
        const mxm = mx2 / 2000, mym = my2 / 2000, mzm = mz2 / 2000;
        console.log(`[Tripo质心×s] (${cxs.toFixed(4)},${cys.toFixed(4)},${czs.toFixed(4)})`);
        console.log(`[Mixamo质心] (${mxm.toFixed(4)},${mym.toFixed(4)},${mzm.toFixed(4)})`);
        console.log(`[质心差] (${(mxm-cxs).toFixed(4)},${(mym-cys).toFixed(4)},${(mzm-czs).toFixed(4)})`);

        console.log(`\n结论: ${maxErr < 0.01 ? '纯缩放（顶点一致，仅单位/尺度不同）' : errCount <= 5 ? '基本一致（采样点小误差）' : '顶点不一致！'}`);
    }, 120000);
});
