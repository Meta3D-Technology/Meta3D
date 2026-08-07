/**
 * probe-inspect-weights3 — 直接 dump 原始 skinWeight/skinIndex 数组（确认 NaN 是否真实）
 * Run: cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-inspect-weights3" --forceExit
 */
(global as any).self = global;
(global as any).window = global;
(global as any).document = {
    createElement: () => new (global as any).Image(),
    createElementNS: () => new (global as any).Image(),
};
class MockImage { onload: (() => void) | null = null; width = 1; height = 1; private _src = ''; set src(v: string) { this._src = v; if (this.onload) setTimeout(() => this.onload!(), 0); } get src() { return this._src; } addEventListener(){} removeEventListener(){} setAttribute(){} getAttribute(){ return null; } }
(global as any).Image = MockImage; (global as any).MockImage = MockImage;

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

describe('probe-inspect-weights3', () => {
    test('原始 skinWeight 数组原始值 dump', () => {
        const obj = parseFreshFbx(MODEL_FBX);
        const out: string[] = [];
        obj.traverse((n) => {
            if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
                const m = n as THREE.SkinnedMesh;
                const geo = m.geometry as THREE.BufferGeometry;
                const sw = geo.getAttribute('skinWeight') as THREE.BufferAttribute;
                const si = geo.getAttribute('skinIndex') as THREE.BufferAttribute;
                out.push(`skinWeight array 类型=${(sw.array as any).constructor.name} len=${(sw.array as any).length} itemSize=${sw.itemSize}`);
                out.push(`skinIndex array 类型=${(si.array as any).constructor.name} len=${(si.array as any).length} itemSize=${si.itemSize}`);
                const wa = sw.array as Float32Array;
                const ia = si.array as Uint16Array;
                // 前 20 个 float 值原始
                out.push('前20个 float 原值: ' + Array.from({ length: 20 }, (_, i) => wa[i].toFixed(4)).join(','));
                // NaN 计数
                let nan = 0;
                for (let i = 0; i < wa.length; i++) if (Number.isNaN(wa[i])) nan++;
                out.push(`NaN float 数=${nan}（/${wa.length}）`);
                // 全 0 计数
                let zero = 0;
                for (let i = 0; i < wa.length; i++) if (wa[i] === 0) zero++;
                out.push(`=0 float 数=${zero}（/${wa.length}）`);
                // skeleton bones
                out.push(`skeleton.bones=${m.skeleton.bones.length} [${m.skeleton.bones.map((b) => b.name).join(',')}]`);
                // 采样：索引 500-520 顶点的 4 槽
                for (let v = 500; v < 512; v++) {
                    const w = Array.from({ length: 4 }, (_, k) => wa[v * 4 + k]).map((x) => (Number.isNaN(x) ? 'NaN' : x.toFixed(3)));
                    const idx = Array.from({ length: 4 }, (_, k) => ia[v * 4 + k]);
                    out.push(`v${v}: w=[${w.join(',')}] i=[${idx.join(',')}]`);
                }
            }
        });
        const outPath = path.join(__dirname, 'probe-inspect-weights3-RESULT.md');
        fs.writeFileSync(outPath, out.join('\n'), 'utf8');
        console.log(out.join('\n'));
    });
});
