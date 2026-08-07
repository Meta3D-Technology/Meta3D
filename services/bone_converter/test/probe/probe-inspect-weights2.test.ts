/**
 * probe-inspect-weights2 — 精确检查权重退化（Σw、slot→bone 重复度），排除测量假象
 * Run: cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-inspect-weights2" --forceExit
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function analyze(label: string, obj: THREE.Group): string[] {
    const out: string[] = [];
    obj.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
            const m = n as THREE.SkinnedMesh;
            const geo = m.geometry as THREE.BufferGeometry;
            const pos = geo.attributes.position as THREE.BufferAttribute;
            const sw = geo.attributes.skinWeight as THREE.BufferAttribute;
            const si = geo.attributes.skinIndex as THREE.BufferAttribute;
            const vc = pos.count;
            // 分布统计
            let sumNear1 = 0, sumNear4 = 0, sumOther = 0;
            let dupSlot4 = 0, dupSlot2 = 0, distinct = 0;
            let slotNonZero = 0;
            let zeroAll = 0;
            let maxSum = 0, minSum = Infinity;
            const sumHist: Record<string, number> = {};
            for (let i = 0; i < vc; i++) {
                const w = [0, 1, 2, 3].map((k) => sw.getX(i * 4 + k));
                const s = w.reduce((a, b) => a + b, 0);
                if (s < 0.5) zeroAll++;
                if (Math.abs(s - 1) < 0.05) sumNear1++;
                else if (Math.abs(s - 4) < 0.25) sumNear4++;
                else sumOther++;
                if (s > maxSum) maxSum = s;
                if (s < minSum) minSum = s;
                const key = s.toFixed(1);
                sumHist[key] = (sumHist[key] ?? 0) + 1;
                for (let k = 0; k < 4; k++) if (w[k] > 0) slotNonZero++;
                // slot→bone 重复度
                const bones = [0, 1, 2, 3].map((k) => si.getX(i * 4 + k));
                const uniq = new Set(bones.filter((_b, k) => w[k] > 0));
                if (uniq.size === 1 && w.every((x) => x > 0)) dupSlot4++;
                else if (uniq.size >= 2) distinct++;
                else dupSlot2++;
            }
            out.push(`[${label}] mesh=${m.name} 顶点=${vc}`);
            out.push(`  权重和≈0(全零)=${zeroAll} 和≈1=${sumNear1} 和≈4=${sumNear4} 其他和=${sumOther} minSum=${minSum.toFixed(3)} maxSum=${maxSum.toFixed(3)}`);
            out.push(`  槽位非零总数=${slotNonZero}（/${vc * 4}） 4槽同骨=${dupSlot4} 多骨=${distinct} 部分零=${dupSlot2}`);
            out.push(`  权重和直方图(顶5): ${Object.entries(sumHist).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => `${k}=${v}`).join(' ')}`);
            // 采样：手臂附近顶点（L_Upperarm / L_Forearm 影响）
            const armBoneIdx = new Set<number>();
            m.skeleton.bones.forEach((b, bi) => {
                if (/(L_|R_)(Upperarm|Forearm|Hand)/.test(b.name)) armBoneIdx.add(bi);
            });
            const armVerts: Array<{ i: number; w: number[]; s: number }> = [];
            for (let i = 0; i < vc; i++) {
                const w = [0, 1, 2, 3].map((k) => sw.getX(i * 4 + k));
                const bones = [0, 1, 2, 3].map((k) => si.getX(i * 4 + k));
                if (bones.some((b, k) => armBoneIdx.has(b) && w[k] > 0)) {
                    armVerts.push({ i, w, s: w.reduce((a, b) => a + b, 0) });
                }
            }
            out.push(`  手臂骨影响顶点数=${armVerts.length}`);
            if (armVerts.length > 0) {
                const sSums = armVerts.map((v) => v.s);
                const avg = sSums.reduce((a, b) => a + b, 0) / sSums.length;
                out.push(`  手臂顶点权重和均值=${avg.toFixed(3)} 样例: ` + armVerts.slice(0, 6).map((v) => `v${v.i} w=[${v.w.map((x) => x.toFixed(2)).join(',')}]`).join(' | '));
            }
        }
    });
    return out;
}

describe('probe-inspect-weights2', () => {
    test('转换前后 权重退化 精确诊断', () => {
        const out: string[] = [];
        const raw = parseFreshFbx(MODEL_FBX);
        out.push(...analyze('转换前', raw));
        const converted = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(converted);
        out.push(...analyze('转换后', converted));
        const outPath = path.join(__dirname, 'probe-inspect-weights2-RESULT.md');
        fs.writeFileSync(outPath, out.join('\n'), 'utf8');
        console.log(out.join('\n'));
    });
});
