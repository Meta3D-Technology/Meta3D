/**
 * probe-inspect-weights — 直接检查原始 Tripo 网格的 skinWeight/skinIndex（排除测量假象）
 * Run: cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-inspect-weights" --forceExit
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

describe('probe-inspect-weights', () => {
    test('原始 Tripo 网格 skinWeight/skinIndex 结构', () => {
        const obj = parseFreshFbx(MODEL_FBX);
        const out: string[] = [];
        obj.traverse((n) => {
            if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
                const m = n as THREE.SkinnedMesh;
                const geo = m.geometry as THREE.BufferGeometry;
                for (const key of Object.keys(geo.attributes)) {
                    const a = geo.attributes[key];
                    out.push(`attr ${key}: itemSize=${a.itemSize} count=${a.count} arrayLen=${(a as any).array?.length}`);
                }
                const pos = geo.attributes.position as THREE.BufferAttribute;
                const sw = geo.attributes.skinWeight as THREE.BufferAttribute;
                const si = geo.attributes.skinIndex as THREE.BufferAttribute;
                out.push(`skeleton.bones=${m.skeleton.bones.length} bones=[${m.skeleton.bones.map((b) => b.name).join(',')}]`);
                if (sw && si) {
                    out.push('前5顶点 [w0,w1,w2,w3 | i0,i1,i2,i3]:');
                    for (let i = 0; i < 5; i++) {
                        out.push(`  v${i}: w=[${Array.from({ length: 4 }, (_, k) => sw.getX(i * 4 + k).toFixed(3)).join(',')}] i=[${Array.from({ length: 4 }, (_, k) => si.getX(i * 4 + k)).join(',')}]`);
                    }
                    let zeroAll = 0, one = 0, multi = 0, sum = 0, maxW = 0;
                    for (let i = 0; i < pos.count; i++) {
                        let s = 0;
                        for (let k = 0; k < 4; k++) { const w = sw.getX(i * 4 + k); s += w; if (w > maxW) maxW = w; }
                        sum += s;
                        if (s <= 1e-6) zeroAll++;
                        else if (Math.abs(s - 1) < 0.05) one++;
                        else multi++;
                    }
                    out.push(`顶点=${pos.count} 全零权重=${zeroAll} 权重和≈1=${one} 多骨/非和1=${multi} 最大权重=${maxW.toFixed(3)} 总权重均值=${(sum / pos.count).toFixed(4)}`);
                    // 各骨骼影响顶点数（权重>0）
                    const boneInfluence = new Map<number, number>();
                    for (let i = 0; i < pos.count; i++) {
                        for (let k = 0; k < 4; k++) {
                            const w = sw.getX(i * 4 + k);
                            if (w > 0) {
                                const bi = si.getX(i * 4 + k);
                                boneInfluence.set(bi, (boneInfluence.get(bi) ?? 0) + 1);
                            }
                        }
                    }
                    out.push('各骨骼索引影响顶点数(权重>0): ' + Array.from(boneInfluence.entries()).sort((a, b) => b[1] - a[1]).map(([bi, c]) => `${m.skeleton.bones[bi] ? m.skeleton.bones[bi].name : '#' + bi}=${c}`).join(' '));
                }
            }
        });
        // 写盘 + 打印
        const outPath = path.join(__dirname, 'probe-inspect-weights-RESULT.md');
        fs.writeFileSync(outPath, out.join('\n'), 'utf8');
        console.log(out.join('\n'));
    });
});
