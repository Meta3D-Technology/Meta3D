/**
 * probe-rest-coord.steps.ts — V12.2 验证轮：restMaxDist=83.9 性质判定
 *
 * 疑点：diag-mesh-skin 用「同 index」比较 rest 蒙皮顶点 → max|Δv|=83.9。
 *   但 D7 已实锤：Tripo 与 lod2 两次 FBX 导出的顶点顺序不一致（同一网格 15075
 *   顶点，顺序不同），同 index 比较不同物理点 → 83.9 是「顶点顺序错配」假象，
 *   而非坐标差异或蒙皮回归。
 *
 * 本探针（D7 同款最近邻哈希法，规避顺序问题）：
 *   A. rest 蒙皮顶点：转换后 vs 官方 lod2 → 最近邻 maxErr（应 < 0.1）
 *   B. 同 A 但把转换后整体再平移 -49.9（验证任务假设的「坐标差异」）→
 *      若 A 已小，则 B 必然变大 → 证明 -49.9 是错误修正（alignMeshToLod2
 *      已把网格变换到 lod2 坐标系，无需再平移）
 *   C. 自洽性：rest 蒙皮输出 ≈ 原始 position（rest 时骨骼处于 bind pose，
 *      matrixWorld·boneInverse=identity，skinnedVertex 应还原 position）
 *   D. 转换后 vs 官方 position bbox 对比（应为同一坐标系，min/max 差 < 0.1）
 *
 * 跑法：cd services/bone_converter && npx jest --config jest.config.js --testPathPattern probe-rest-coord --forceExit
 * 输出：temp/probe-rest-coord.json + 控制台
 */
// ── Node 环境 polyfill（three FBXLoader 需要 browser globals）──
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
);
const LOD2_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx',
);

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function firstSkinned(root: THREE.Object3D): THREE.SkinnedMesh {
    let m: THREE.SkinnedMesh | null = null;
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !m) m = n as THREE.SkinnedMesh; });
    if (!m) throw new Error('no skinned mesh');
    return m;
}

/** CPU 蒙皮：vOut = bindMatrix⁻¹ · Σ w_i · matrixWorld(bone_i) · boneInverse_i · bindMatrix · v */
function skinnedVertices(mesh: THREE.SkinnedMesh): Float32Array {
    const geom = mesh.geometry;
    const pos = geom.getAttribute('position') as THREE.BufferAttribute;
    const idx = geom.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgt = geom.getAttribute('skinWeight') as THREE.BufferAttribute;
    const sk = mesh.skeleton;
    const out = new Float32Array(pos.count * 3);
    const bmFwd = mesh.bindMatrix;
    const bmInv = mesh.bindMatrix.clone().invert();
    const p = pos.array as Float32Array;
    const i = idx.array as Uint16Array | Uint32Array;
    const w = wgt.array as Float32Array;
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let v = 0; v < pos.count; v++) {
        vBind.fromArray(p, v * 3).applyMatrix4(bmFwd);
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const wt = w[v * 4 + k];
            if (wt === 0) continue;
            const bi = i[v * 4 + k];
            const bone = sk.bones[bi];
            const inv = sk.boneInverses[bi];
            if (!bone || !inv) continue;
            boneMat.copy(bone.matrixWorld).multiply(inv);
            tmp.copy(vBind).applyMatrix4(boneMat);
            acc.addScaledVector(tmp, wt);
        }
        acc.applyMatrix4(bmInv);
        out[v * 3] = acc.x; out[v * 3 + 1] = acc.y; out[v * 3 + 2] = acc.z;
    }
    return out;
}

/** 空间哈希最近邻：采样点找目标集最近距离，返回 maxErr */
function nearestMaxErr(pts: Float32Array, target: Float32Array, cell: number, sampleCap: number): { max: number; errCount: number; checked: number } {
    const map = new Map<string, number[]>();
    const key = (x: number, y: number, z: number) =>
        `${Math.round(x / cell)},${Math.round(y / cell)},${Math.round(z / cell)}`;
    const tgtCount = target.length / 3;
    for (let v = 0; v < tgtCount; v++) {
        const k = key(target[v * 3], target[v * 3 + 1], target[v * 3 + 2]);
        let arr = map.get(k);
        if (!arr) { arr = []; map.set(k, arr); }
        arr.push(v);
    }
    const n = pts.length / 3;
    const step = Math.max(1, Math.floor(n / sampleCap));
    let max = 0, errCount = 0, checked = 0;
    for (let v = 0; v < n; v += step) {
        const x = pts[v * 3], y = pts[v * 3 + 1], z = pts[v * 3 + 2];
        const cx = Math.round(x / cell), cy = Math.round(y / cell), cz = Math.round(z / cell);
        let best = Infinity;
        for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) {
            const arr = map.get(`${cx + dx},${cy + dy},${cz + dz}`);
            if (!arr) continue;
            for (const j of arr) {
                const d = Math.hypot(x - target[j * 3], y - target[j * 3 + 1], z - target[j * 3 + 2]);
                if (d < best) best = d;
            }
        }
        checked++;
        if (best > max) max = best;
        if (best > 0.1) errCount++;
    }
    return { max, errCount, checked };
}

describe('PROBE: restMaxDist=83.9 性质判定（最近邻法，规避顶点顺序差异）', () => {
    it('统一坐标系 rest 蒙皮最近邻对比 + 平移假设验证 + 自洽性', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const convRoot = loadFbx(TRIPO_FBX);
        const lod2ForRest = loadFbx(LOD2_FBX);

        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });

        const offMesh = firstSkinned(officialRoot);
        const convMesh = firstSkinned(convRoot);
        officialRoot.updateMatrixWorld(true);
        convRoot.updateMatrixWorld(true);

        const restOff = skinnedVertices(offMesh);   // 官方 rest 蒙皮（lod2 坐标系）
        const restConv = skinnedVertices(convMesh); // 转换后 rest 蒙皮

        // C. 自洽性：rest 蒙皮输出应 ≈ 原始 position（骨骼处于 bind pose）
        const rawConv = convMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        let selfMax = 0;
        for (let v = 0; v < rawConv.count; v++) {
            const d = Math.hypot(
                restConv[v * 3] - rawConv.getX(v),
                restConv[v * 3 + 1] - rawConv.getY(v),
                restConv[v * 3 + 2] - rawConv.getZ(v),
            );
            if (d > selfMax) selfMax = d;
        }

        // A. 转换后 rest 蒙皮 vs 官方 rest 蒙皮 —— 正确的参照系（V12.4 修正）
        //    V12.4 boneInverse 参考系统一后，conv 使用官方 TransformLink 帧（非自洽），
        //    conv rest 蒙皮 == off rest 蒙皮（官方实际渲染输出），不再等于 raw position。
        const rawOffAttr = offMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const a = nearestMaxErr(restConv, restOff, 0.02, 6000);

        // B. 转换后 rest 蒙皮再平移 -49.9（任务假设的「坐标差异」修正）→ 应显著变差
        const shifted = new Float32Array(restConv.length);
        for (let v = 0; v < restConv.length / 3; v++) {
            shifted[v * 3] = restConv[v * 3];
            shifted[v * 3 + 1] = restConv[v * 3 + 1] - 49.9;
            shifted[v * 3 + 2] = restConv[v * 3 + 2];
        }
        const b = nearestMaxErr(shifted, restOff, 0.02, 6000);

        // D. 转换后 position bbox vs 官方 position bbox（确认同一坐标系）
        const box = (attr: THREE.BufferAttribute) => new THREE.Box3().setFromBufferAttribute(attr);
        const cBox = box(rawConv);
        const oBox = box(offMesh.geometry.getAttribute('position') as THREE.BufferAttribute);
        const minD = cBox.min.distanceTo(oBox.min);
        const maxD = cBox.max.distanceTo(oBox.max);

        const lines: string[] = [];
        // 调试：打印两 rest 蒙皮的 bbox + 原始 position bbox（官方）
        const restBox = (a: Float32Array) => {
            let min = new THREE.Vector3(Infinity, Infinity, Infinity);
            let max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
            for (let v = 0; v < a.length / 3; v++) {
                for (let k = 0; k < 3; k++) {
                    const c = a[v * 3 + k];
                    if (c < min.getComponent(k)) min.setComponent(k, c);
                    if (c > max.getComponent(k)) max.setComponent(k, c);
                }
            }
            return { min, max };
        };
        const rcBox = restBox(restConv);
        const roBox = restBox(restOff);
        const rawOffBox = box(offMesh.geometry.getAttribute('position') as THREE.BufferAttribute);
        lines.push('=== 调试：rest 蒙皮 bbox + mesh 节点矩阵 ===');
        lines.push(`conv rest min=(${rcBox.min.x.toFixed(4)},${rcBox.min.y.toFixed(4)},${rcBox.min.z.toFixed(4)}) max=(${rcBox.max.x.toFixed(4)},${rcBox.max.y.toFixed(4)},${rcBox.max.z.toFixed(4)})`);
        lines.push(`off  rest min=(${roBox.min.x.toFixed(4)},${roBox.min.y.toFixed(4)},${roBox.min.z.toFixed(4)}) max=(${roBox.max.x.toFixed(4)},${roBox.max.y.toFixed(4)},${roBox.max.z.toFixed(4)})`);
        lines.push(`off  raw  min=(${rawOffBox.min.x.toFixed(4)},${rawOffBox.min.y.toFixed(4)},${rawOffBox.min.z.toFixed(4)}) max=(${rawOffBox.max.x.toFixed(4)},${rawOffBox.max.y.toFixed(4)},${rawOffBox.max.z.toFixed(4)})`);
        lines.push(`offMesh.matrixWorld=${JSON.stringify(offMesh.matrixWorld.elements.map((e) => +e.toFixed(4)))}`);
        lines.push(`convMesh.matrixWorld=${JSON.stringify(convMesh.matrixWorld.elements.map((e) => +e.toFixed(4)))}`);
        lines.push('');
        // 官方自身：全管线 rest 蒙皮 vs 全管线 raw（同一节点变换下）
        const vTmp = new THREE.Vector3();
        let offSelfMax = 0;
        for (let v = 0; v < restOff.length / 3; v++) {
            vTmp.fromArray(restOff, v * 3).applyMatrix4(offMesh.matrixWorld);
            const rx = vTmp.x, ry = vTmp.y, rz = vTmp.z;
            vTmp.set(rawOffAttr.getX(v), rawOffAttr.getY(v), rawOffAttr.getZ(v)).applyMatrix4(offMesh.matrixWorld);
            const d = Math.hypot(rx - vTmp.x, ry - vTmp.y, rz - vTmp.z);
            if (d > offSelfMax) offSelfMax = d;
        }
        lines.push(`官方自身全管线 rest 蒙皮 vs 全管线 raw：maxDiff=${offSelfMax.toFixed(6)}（若官方模型自洽应 ~0）`);
        lines.push('');
        lines.push('=== A. 转换后 rest 蒙皮 vs 官方几何（raw position，最近邻 maxErr，采样 6000）===');
        lines.push(`maxErr=${a.max.toFixed(5)}  超差(>0.1)=${a.errCount}/${a.checked}`);
        lines.push(a.max < 0.1
            ? '✅ 同一坐标系下 rest 蒙皮一致（<0.1）→ 83.9 是「同 index 比较顶点顺序错配」假象，非坐标差异、非蒙皮回归'
            : `❌ rest 蒙皮仍差 ${a.max.toFixed(3)}（>1 则是蒙皮问题）`);
        lines.push('');
        lines.push('=== B. 转换后 rest 蒙皮再平移 -49.9 后对比（验证任务假设）===');
        lines.push(`maxErr=${b.max.toFixed(5)}  超差=${b.errCount}/${b.checked}`);
        lines.push(b.max > a.max * 10
            ? '✅ 平移 -49.9 显著变差 → 该假设不成立，alignMeshToLod2 已把网格置于 lod2 坐标系，无需再平移'
            : `⚠️ 平移前后差异不大（A=${a.max.toFixed(3)} B=${b.max.toFixed(3)}）`);
        lines.push('');
        lines.push('=== C. 自洽性：rest 蒙皮输出 vs 原始 position（应为 ~0）===');
        lines.push(`maxDiff=${selfMax.toFixed(6)}`);
        lines.push(selfMax < 0.01 ? '✅ rest 时骨骼处于 bind pose，蒙皮还原 position，自洽' : '⚠️ rest 蒙皮未还原 position');
        lines.push('');
        lines.push('=== D. position bbox（转换后 vs 官方，同一坐标系验证）===');
        lines.push(`conv min=(${cBox.min.x.toFixed(4)},${cBox.min.y.toFixed(4)},${cBox.min.z.toFixed(4)}) max=(${cBox.max.x.toFixed(4)},${cBox.max.y.toFixed(4)},${cBox.max.z.toFixed(4)})`);
        lines.push(`off  min=(${oBox.min.x.toFixed(4)},${oBox.min.y.toFixed(4)},${oBox.min.z.toFixed(4)}) max=(${oBox.max.x.toFixed(4)},${oBox.max.y.toFixed(4)},${oBox.max.z.toFixed(4)})`);
        lines.push(`minDist=${minD.toFixed(5)} maxDist=${maxD.toFixed(5)}`);
        lines.push(minD < 0.1 && maxD < 0.1 ? '✅ 两网格同一坐标系（alignMeshToLod2 生效）' : '⚠️ bbox 不一致');

        const text = lines.join('\n');
        console.log('\n' + text + '\n');

        const outPath = path.join(__dirname, '..', '..', 'temp', 'probe-rest-coord.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({
            lines: text,
            nearestMaxErr: a.max,
            shiftedMaxErr: b.max,
            selfMaxDiff: selfMax,
            bboxMinDist: minD,
            bboxMaxDist: maxD,
            conclusion: a.max < 0.1 ? 'coordinate-consistent (index-order artifact)' : 'skinning-issue',
        }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);

        // 断言：同坐标系下 rest 蒙皮最近邻 maxErr < 0.1（核心结论）
        expect(a.max).toBeLessThan(0.1);
    }, 180000);
});
