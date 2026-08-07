/**
 * probe-binding-fix — 验证 mergeBoneWeights 二次重映射 bug 修复方案
 *
 * 背景（probe-binding-map 实锤）：
 *   mergeBoneWeights 在 fixSkinningIndices 之后运行，读已被重映射为「新索引 0-21」的
 *   skinIndex，却用旧 41 骨 skeleton.bones 数组按新索引取值查 Twist —— 新索引 7/8/9/10/12/13/17/18
 *   恰好命中旧数组中的 Twist 骨位（如新 8→旧 8=L_CalfTwist02），被误判为 Twist 槽再二次
 *   重映射到错误父骨 → 左手/右肩/脊柱/脚趾等顶点被绑到腿部。
 *
 * 修复方案：convertTripoToMixamo 步骤 6 不再调用 mergeBoneWeights（fixSkinningIndices 的
 *   全量 oldToNewIndexMap 已把 Twist 骨 oldIdx → 语义父骨新索引，mergeBoneWeights 冗余且有害）。
 *
 * 本探针：直接对比「含 mergeBoneWeights」vs「去掉 mergeBoneWeights」的 skinIndex 绑定，
 *   证明去掉后 R_ToeBase→RightToeBase、LeftHand→mixamorigLeftHand、RightShoulder→
 *   mixamorigRightShoulder。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-binding-fix" --forceExit
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
import { restructureHierarchy, fixSkinningIndices, renameBones, DEFAULT_TRIPO_TO_MIXAMO_MAP, TWIST_BONE_PATTERNS } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** 复刻 convertTripoToMixamo 但跳过 mergeBoneWeights（修复方案） */
function convertWithoutMerge(obj: THREE.Object3D): void {
    const meshes: THREE.SkinnedMesh[] = [];
    obj.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh) meshes.push(n as THREE.SkinnedMesh); });
    const mapping = DEFAULT_TRIPO_TO_MIXAMO_MAP;
    const bones0: THREE.Bone[] = [];
    obj.traverse((n) => { if ((n as THREE.Bone).isBone) bones0.push(n as THREE.Bone); });
    const twistBoneNames = new Set<string>();
    for (const b of bones0) {
        const inMap = mapping.some((e) => e.tripoName === b.name);
        if (!inMap && TWIST_BONE_PATTERNS.some((p) => p.test(b.name))) twistBoneNames.add(b.name);
    }
    const { oldToNewIndexMap, deletedBoneNames } = restructureHierarchy(obj, mapping, true, []);
    fixSkinningIndices(obj, oldToNewIndexMap);
    const renameMap = new Map<string, { newName: string; action: string; mergeTarget: string }>();
    for (const e of mapping) {
        if (e.action === 'rename' && e.mixamoName) renameMap.set(e.tripoName, { newName: e.mixamoName, action: 'rename', mergeTarget: '' });
        if (e.action === 'merge') renameMap.set(e.tripoName, { newName: '', action: 'merge', mergeTarget: e.mergeTarget ?? '' });
        if (e.action === 'delete') renameMap.set(e.tripoName, { newName: '', action: 'delete', mergeTarget: '' });
    }
    twistBoneNames.forEach((n) => renameMap.set(n, { newName: '', action: 'merge', mergeTarget: '' }));
    renameBones(obj, renameMap, []);
    // 跳过 mergeBoneWeights
    const deletedSet = new Set(deletedBoneNames);
    const indexBones = meshes[0].skeleton.bones ?? [];
    const finalBones = indexBones.filter((b) => !deletedSet.has(b.name));
    obj.updateMatrixWorld(true);
    const skeleton = new THREE.Skeleton(finalBones);
    for (const m of meshes) m.bind(skeleton);
    const toRemove: THREE.Bone[] = [];
    obj.traverse((n) => { if ((n as THREE.Bone).isBone && deletedSet.has(n.name)) toRemove.push(n as THREE.Bone); });
    for (const b of toRemove) { const p = b.parent; if (p) { b.children.slice().forEach((c) => p.attach(c)); p.remove(b); } }
}

describe('probe-binding-fix', () => {
    test('去掉 mergeBoneWeights 后 skinIndex 绑定正确', () => {
        const out: string[] = [];
        const conv = parseFreshFbx(MODEL_FBX);
        convertWithoutMerge(conv);
        const convMesh = (() => { let m: THREE.SkinnedMesh | null = null; conv.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !m) m = n as THREE.SkinnedMesh; }); return m!; })();
        const siConv = convMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        const swConv = convMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
        const vc = convMesh.geometry.attributes.position.count;
        const convArr = siConv.array as Uint16Array;
        const convW = swConv.array as Float32Array;
        out.push(`conv bones(${convMesh.skeleton.bones.length}): ${convMesh.skeleton.bones.map((b) => b.name).join(',')}`);

        // dominant per vertex
        const dominantName = (si: ArrayLike<number>, sw: ArrayLike<number>, bones: THREE.Bone[], i: number): { name: string; w: number } => {
            let best = -1, bestW = -1;
            for (let k = 0; k < 4; k++) {
                const w = sw[i * 4 + k];
                if (w > bestW) { bestW = w; best = si[i * 4 + k]; }
            }
            return { name: (best >= 0 && best < bones.length) ? bones[best].name : `#${best}`, w: bestW };
        };

        // 8 根手臂骨 + 4 根关键腿骨 的影响顶点数（权重>0）
        const bones = convMesh.skeleton.bones;
        const targets = [
            'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
            'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
            'mixamorigRightToeBase', 'mixamorigLeftToeBase',
        ];
        const infl = new Map<string, number>();
        const dom = new Map<string, number>();
        targets.forEach((t) => { infl.set(t, 0); dom.set(t, 0); });
        for (let i = 0; i < vc; i++) {
            const d = dominantName(convArr, convW, bones, i);
            if (dom.has(d.name)) dom.set(d.name, dom.get(d.name)! + 1);
            for (let k = 0; k < 4; k++) {
                const w = convW[i * 4 + k];
                if (w <= 0) continue;
                const bi = convArr[i * 4 + k];
                const bn = (bi >= 0 && bi < bones.length) ? bones[bi].name : '';
                if (infl.has(bn)) infl.set(bn, infl.get(bn)! + 1);
            }
        }
        out.push('各关键骨 权重>0影响顶点数 / dominant顶点数:');
        for (const t of targets) {
            out.push(`  ${t}: infl=${infl.get(t)} dom=${dom.get(t)}`);
        }
        out.push('');
        out.push(`conv skinIndex 前40: ${Array.from({ length: 40 }, (_, i) => convArr[i]).join(',')}`);

        const outPath = path.join(__dirname, 'probe-binding-fix-RESULT.md');
        fs.writeFileSync(outPath, out.join('\n'), 'utf8');
        console.log(out.join('\n'));
    });
});
