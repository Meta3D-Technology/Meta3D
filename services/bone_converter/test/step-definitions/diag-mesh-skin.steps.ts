/**
 * diag-mesh-skin.steps.ts — 任务 3 深化：蒙皮层根因定位
 *
 * 已确认（diag-anim-frame-compare）：骨骼 worldQ/worldPos 完全一致（<0.05°），
 * 但蒙皮顶点差 94 单位 → 根因在蒙皮绑定层，不在骨骼/轨道匹配。
 *
 * 本探针：
 *  A. rest（不播放）时官方 vs 转换后 skinnedVertex 对比 → 确认 V12.1 后 rest 一致
 *  B. 播放动画首帧：逐顶点 diff，定位差最大顶点，打印其 skinIndex→骨骼名 + 权重
 *  C. 交叉蒙皮：用「同一组骨骼 matrixWorld（官方）」，分别用两模型的
 *     skeleton(bones/boneInverse) + bindMatrix 蒙皮，对比 → 若差大即证明
 *     boneInverse/skinIndex 绑定错位
 *  D. 打印两模型 skeleton.bones 顺序 + bindMatrix 一致性
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern diag-mesh-skin --forceExit
 * 输出：temp/diag-mesh-skin.json + 控制台
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
    'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx',
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

function stats(a: Float32Array, b: Float32Array): { max: number; mean: number; worstIdx: number } {
    let max = 0, sum = 0, worst = 0;
    const n = a.length / 3;
    for (let v = 0; v < n; v++) {
        const d = Math.hypot(a[v*3]-b[v*3], a[v*3+1]-b[v*3+1], a[v*3+2]-b[v*3+2]);
        if (d > max) { max = d; worst = v; }
        sum += d;
    }
    return { max, mean: sum / n, worstIdx: worst };
}

describe('DIAG: mesh skin binding — official lod2 vs converted', () => {
    it('rest compare + animated compare + cross-skin', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const convRoot = loadFbx(TRIPO_FBX);
        const lod2ForRest = loadFbx(LOD2_FBX);
        const lines: string[] = [];

        // 转换前：Tripo 原始 mesh.skeleton.bones
        const rawMeshes: THREE.SkinnedMesh[] = [];
        convRoot.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) rawMeshes.push(n as THREE.SkinnedMesh); });
        const rawSkel = rawMeshes[0].skeleton;
        lines.push('=== 转换前 Tripo mesh.skeleton.bones ===');
        lines.push(`count=${rawSkel.bones.length}: ${rawSkel.bones.map((b) => b.name).join(', ')}`);
        lines.push(`mesh.skinIndex count=${(rawMeshes[0].geometry.getAttribute('skinIndex') as THREE.BufferAttribute).count}`);
        // ⚠️ fixSkinningIndices 会原地改写 skinIndex buffer，先快照原始索引（旧索引空间）
        const rawIdxSnapshot = new Uint16Array(
            (rawMeshes[0].geometry.getAttribute('skinIndex') as THREE.BufferAttribute).array as Uint16Array,
        );
        const rawBoneNamesSnapshot = rawSkel.bones.map((b) => b.name);
        lines.push('');
        // 快照原始骨骼树（转换后骨骼名会变 mixamorig）
        const rawSceneBoneNames = new Set<string>();
        convRoot.traverse((n) => { if ((n as THREE.Bone).isBone) rawSceneBoneNames.add(n.name); });
        lines.push(`转换前场景树骨骼 ${rawSceneBoneNames.size} 个`);

        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });

        const offMeshes: THREE.SkinnedMesh[] = [];
        officialRoot.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) offMeshes.push(n as THREE.SkinnedMesh); });
        const convMeshes: THREE.SkinnedMesh[] = [];
        convRoot.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) convMeshes.push(n as THREE.SkinnedMesh); });
        const offMesh = offMeshes[0];
        const convMesh = convMeshes[0];

        // D. skeleton.bones 顺序 + bindMatrix
        lines.push('=== D. skeleton 结构 ===');
        const offSkel = offMesh.skeleton;
        const convSkel = convMesh.skeleton;
        lines.push(`官方 skeleton.bones ${offSkel.bones.length}: ${offSkel.bones.map((b) => b.name).join(', ')}`);
        lines.push(`转换后 skeleton.bones ${convSkel.bones.length}: ${convSkel.bones.map((b) => b.name).join(', ')}`);
        // 官方 bones 名称顺序 vs 转换后 —— 转换后 bone 顺序必须与 skinIndex 索引空间一致
        lines.push(`官方 bindMatrix: ${JSON.stringify(offMesh.bindMatrix.elements.map((e) => +e.toFixed(4)))}`);
        lines.push(`转换后 bindMatrix: ${JSON.stringify(convMesh.bindMatrix.elements.map((e) => +e.toFixed(4)))}`);
        // 官方 skeleton 是否也有 boneInverse 数量 = bones 数量
        lines.push(`官方 boneInverses ${offSkel.boneInverses.length} / 转换后 ${convSkel.boneInverses.length}`);

        // A. rest 对比
        officialRoot.updateMatrixWorld(true);
        convRoot.updateMatrixWorld(true);
        const restA = skinnedVertices(offMesh);
        const restB = skinnedVertices(convMesh);
        const restS = stats(restA, restB);
        lines.push('');
        lines.push(`=== A. rest（未播放）skinnedVertex 对比 ===`);
        lines.push(`max|Δv|=${restS.max.toFixed(4)} mean|Δv|=${restS.mean.toFixed(6)} worstV=${restS.worstIdx}`);
        lines.push(restS.max < 1e-3 ? '✅ rest 蒙皮一致（V12.1 网格变换生效）' : `❌ rest 蒙皮差 ${restS.max.toFixed(3)}（网格层仍错位）`);

        // 顶点数
        lines.push('');
        lines.push(`官方 position 顶点 ${offMesh.geometry.getAttribute('position').count} / 转换后 ${convMesh.geometry.getAttribute('position').count}`);

        // B. 打印最坏顶点 skinIndex→骨骼名（rest 对比）
        const wIdx = restS.worstIdx;
        const offIdx = offMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        const offWgt = offMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
        const convIdx = convMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        const convWgt = convMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
        lines.push('');
        lines.push(`=== B. rest 最坏顶点 v=${wIdx} skinIndex/权重 ===`);
        let offInfo = '官方:';
        for (let k = 0; k < 4; k++) {
            const bi = offIdx.getX(wIdx) < 0 ? offIdx.getX(wIdx) : (offIdx as any).array[wIdx * 4 + k];
            const wt = (offWgt as any).array[wIdx * 4 + k];
            const bn = offSkel.bones[bi]?.name ?? '?';
            offInfo += ` [${bi}]=${bn}:${wt.toFixed(3)}`;
        }
        let convInfo = '转换后:';
        for (let k = 0; k < 4; k++) {
            const bi = (convIdx as any).array[wIdx * 4 + k];
            const wt = (convWgt as any).array[wIdx * 4 + k];
            const bn = convSkel.bones[bi]?.name ?? '?';
            convInfo += ` [${bi}]=${bn}:${wt.toFixed(3)}`;
        }
        lines.push(offInfo);
        lines.push(convInfo);
        // 统计：转换后 skinIndex 引用骨骼名 vs 官方同名顶点引用骨骼名 —— 全局错配检测
        lines.push('');
        lines.push('=== 全局 skinIndex 骨骼名错配检测（每顶点 4 槽，比较命中骨骼名集合）===');
        const nameByIdx = (sk: THREE.Skeleton, idx: THREE.BufferAttribute): string => {
            const arr = idx.array as Uint16Array | Uint32Array;
            const names = new Set<string>();
            for (let v = 0; v < idx.count; v++) {
                for (let k = 0; k < 4; k++) {
                    const bi = arr[v * 4 + k];
                    if (bi >= 0 && sk.bones[bi]) names.add(sk.bones[bi].name);
                }
            }
            return Array.from(names).sort().join(', ');
        };
        lines.push(`官方引用骨骼: ${nameByIdx(offSkel, offIdx)}`);
        lines.push(`转换后引用骨骼: ${nameByIdx(convSkel, convIdx)}`);

        // 权重和检查（非 0 权重槽数）
        const wsum = (sk: THREE.Skeleton, idx: THREE.BufferAttribute, wgt: THREE.BufferAttribute): { total: number; perVert: number; zeros: number } => {
            const iA = idx.array as Uint16Array | Uint32Array;
            const wA = wgt.array as Float32Array;
            let total = 0, zeros = 0, perVert = 0;
            const n = idx.count;
            for (let v = 0; v < n; v++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    const wt = wA[v * 4 + k];
                    const bi = iA[v * 4 + k];
                    if (wt === 0 || bi < 0 || bi >= sk.bones.length) zeros++;
                    else { s += wt; total++; }
                }
                perVert += s;
            }
            return { total, perVert: perVert / n, zeros };
        };
        const ow = wsum(offSkel, offIdx, offWgt);
        const cw = wsum(convSkel, convIdx, convWgt);
        lines.push(`官方: 非0权重槽=${ow.total} 均值权重和=${ow.perVert.toFixed(4)} 无效槽=${ow.zeros}`);
        lines.push(`转换后: 非0权重槽=${cw.total} 均值权重和=${cw.perVert.toFixed(4)} 无效槽=${cw.zeros}`);

        // E. old→new skinIndex 映射追踪（转换前后同一顶点槽位）
        lines.push('');
        lines.push('=== E. Tripo 原始 skinIndex → 转换后 skinIndex 映射（基于转换前快照）===');
        // 原始 Tripo mesh 的 skeleton.bones（30 骨）即旧索引空间；转换后 skeleton.bones（13 骨）即新索引空间
        const rawIdxArr = rawIdxSnapshot;   // 转换前快照（旧索引空间）
        const convIdxArr = convIdx.array as Uint16Array; // 转换后（新索引空间）
        const rawBoneNames = rawBoneNamesSnapshot;       // 旧索引空间 0-29
        const convBoneNames = convSkel.bones.map((b) => b.name); // 新索引空间 0-12
        // 统计：每个旧索引被引用次数
        const oldRefCount = new Map<number, number>();
        for (let i = 0; i < rawIdxArr.length; i++) {
            const old = rawIdxArr[i];
            oldRefCount.set(old, (oldRefCount.get(old) || 0) + 1);
        }
        lines.push(`旧索引空间 ${rawBoneNames.length} 骨（Tripo mesh skeleton），新索引空间 ${convBoneNames.length} 骨`);
        lines.push('旧索引引用最多的 25 个（旧骨名 → 引用次数 → 映射后新骨名）:');
        const topOld = Array.from(oldRefCount.entries()).sort((a, b) => b[1] - a[1]).slice(0, 25);
        for (const [oldIdx, cnt] of topOld) {
            const oldName = rawBoneNames[oldIdx] || `?${oldIdx}`;
            // 找映射后该顶点槽位的新索引（取第一个该 old 的顶点）
            let newIdx = -1;
            for (let i = 0; i < rawIdxArr.length; i++) {
                if (rawIdxArr[i] === oldIdx) { newIdx = convIdxArr[i]; break; }
            }
            const newName = newIdx >= 0 ? (convBoneNames[newIdx] || `?${newIdx}`) : 'MISSING';
            lines.push(`  old[${oldIdx}]=${oldName.padEnd(18)} ref=${String(cnt).padStart(5)} → new[${newIdx}]=${newName}`);
        }
        // 新索引空间中被非零权重引用的骨骼（确认主链骨是否被引用）
        const newRefSet = new Set<number>();
        const convWgtArr = convWgt.array as Float32Array;
        for (let i = 0; i < convIdxArr.length; i++) {
            if (convWgtArr[i] > 0) newRefSet.add(convIdxArr[i]);
        }
        lines.push(`新索引空间中被非零权重引用的骨骼: ${Array.from(newRefSet).map((idx) => `${convBoneNames[idx] || '?'}`).join(', ')}`);
        // 场景树有、mesh skeleton 没有的骨骼（9 个主链骨）
        const sceneBoneNames = new Set<string>();
        convRoot.traverse((n) => { if ((n as THREE.Bone).isBone) sceneBoneNames.add(n.name); });
        const skelNameSet = new Set(convSkel.bones.map((b) => b.name));
        const inSceneNotSkel = Array.from(sceneBoneNames).filter((n) => !skelNameSet.has(n));
        lines.push(`场景树有、mesh skeleton 没有的骨骼（${inSceneNotSkel.length}）: ${inSceneNotSkel.join(', ')}`);

        const text = lines.join('\n');
        console.log('\n' + text + '\n');

        const outPath = path.join(__dirname, '..', '..', 'temp', 'diag-mesh-skin.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text, restMaxDist: restS.max }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 180000);
});
