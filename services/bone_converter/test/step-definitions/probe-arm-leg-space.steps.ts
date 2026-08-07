/**
 * probe-arm-leg-space.steps.ts — 调试：转换后 vs 官方 蒙皮顶点空间关系
 *
 * 背景：diag-arm-leg-anim 最近邻全 Infinity。本探针在 mesh-local 空间直接量化：
 *   A. 两 mesh 的 bindMatrix / matrixWorld / skeleton 骨数 / 顶点数
 *   B. t=0（动画首帧）两 skinned 点云 bbox 对比 —— 是否同一空间
 *   C. 用「同 index」（虽顺序不同，但看量级）前 200 个顶点的距离分布
 *   D. 两 mesh 首 5 个 position 顶点原始坐标（判断顶点顺序/坐标系）
 *
 * 跑法：cd services/bone_converter && npx jest --config jest.config.js --testPathPattern probe-arm-leg-space --forceExit
 */
// ── Node 环境 polyfill ──
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
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const LOD2_FBX = path.join(REPO_ROOT, 'services/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx');
const ANIM_WALK_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Walk/1.fbx');

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
function bboxOf(arr: Float32Array): { min: number[]; max: number[] } {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    const n = arr.length / 3;
    for (let v = 0; v < n; v++) {
        for (let k = 0; k < 3; k++) {
            const c = arr[v * 3 + k];
            if (c < min[k]) min[k] = c;
            if (c > max[k]) max[k] = c;
        }
    }
    return { min, max };
}

describe('PROBE: conv vs official skinned space relationship', () => {
    it('dumps bindMatrix/matrixWorld/bbox/index-distance at t=0', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const officialAnim = loadFbx(ANIM_WALK_FBX);
        const officialClip = officialAnim.animations[0];
        normalizeRootMotion(officialClip, officialRoot, officialAnim);
        officialRoot.rotateY(Math.PI);
        const officialMixer = new THREE.AnimationMixer(officialRoot);
        const officialAction = officialMixer.clipAction(officialClip);
        officialAction.reset(); officialAction.play();
        officialMixer.setTime(0); officialRoot.updateMatrixWorld(true);

        const convRoot = loadFbx(TRIPO_FBX);
        const convAnim = loadFbx(ANIM_WALK_FBX);
        const convClipRaw = convAnim.animations[0];
        const lod2ForRest = loadFbx(LOD2_FBX);
        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });
        normalizeRootMotion(convClipRaw, convRoot, convAnim);
        convRoot.rotateY(Math.PI);
        const convMixer = new THREE.AnimationMixer(convRoot);
        const convAction = convMixer.clipAction(convClipRaw);
        convAction.reset(); convAction.play();
        convMixer.setTime(0); convRoot.updateMatrixWorld(true);

        const offMesh = firstSkinned(officialRoot);
        const convMesh = firstSkinned(convRoot);
        const lines: string[] = [];
        lines.push('=== A. mesh 结构 ===');
        lines.push(`官方: bones=${offMesh.skeleton.bones.length} boneInverses=${offMesh.skeleton.boneInverses.length} 顶点=${(offMesh.geometry.getAttribute('position') as THREE.BufferAttribute).count}`);
        lines.push(`转换后: bones=${convMesh.skeleton.bones.length} boneInverses=${convMesh.skeleton.boneInverses.length} 顶点=${(convMesh.geometry.getAttribute('position') as THREE.BufferAttribute).count}`);
        lines.push(`官方 bindMatrix=${JSON.stringify(offMesh.bindMatrix.elements.map((e) => +e.toFixed(3)))}`);
        lines.push(`转换后 bindMatrix=${JSON.stringify(convMesh.bindMatrix.elements.map((e) => +e.toFixed(3)))}`);
        lines.push(`官方 mesh.matrixWorld=${JSON.stringify(offMesh.matrixWorld.elements.map((e) => +e.toFixed(3)))}`);
        lines.push(`转换后 mesh.matrixWorld=${JSON.stringify(convMesh.matrixWorld.elements.map((e) => +e.toFixed(3)))}`);
        lines.push(`官方 mesh parent=${offMesh.parent?.name ?? 'null'} type=${(offMesh.parent as any)?.type}`);
        lines.push(`转换后 mesh parent=${convMesh.parent?.name ?? 'null'} type=${(convMesh.parent as any)?.type}`);

        lines.push('');
        lines.push('=== B. t=0 skinned bbox ===');
        const a = skinnedVertices(offMesh);
        const b = skinnedVertices(convMesh);
        const oBox = bboxOf(a);
        const cBox = bboxOf(b);
        lines.push(`官方 skinned min=(${oBox.min.map((x) => x.toFixed(3)).join(',')}) max=(${oBox.max.map((x) => x.toFixed(3)).join(',')})`);
        lines.push(`转换后 skinned min=(${cBox.min.map((x) => x.toFixed(3)).join(',')}) max=(${cBox.max.map((x) => x.toFixed(3)).join(',')})`);

        lines.push('');
        lines.push('=== C. 原始 position 前 5 顶点 ===');
        const op = offMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const cp = convMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        for (let v = 0; v < 5; v++) {
            lines.push(`官方 v${v}=(${op.getX(v).toFixed(3)},${op.getY(v).toFixed(3)},${op.getZ(v).toFixed(3)})  conv v${v}=(${cp.getX(v).toFixed(3)},${cp.getY(v).toFixed(3)},${cp.getZ(v).toFixed(3)})`);
        }

        lines.push('');
        lines.push('=== D. 同 index 距离（前 300 顶点，量级参考）===');
        let sum = 0, maxD = 0, n = 0;
        const hist: number[] = [0, 0, 0, 0, 0, 0];
        for (let v = 0; v < 300; v++) {
            const d = Math.hypot(a[v*3]-b[v*3], a[v*3+1]-b[v*3+1], a[v*3+2]-b[v*3+2]);
            sum += d; maxD = Math.max(maxD, d); n++;
            const bucket = d < 0.01 ? 0 : d < 0.1 ? 1 : d < 1 ? 2 : d < 10 ? 3 : d < 100 ? 4 : 5;
            hist[bucket]++;
        }
        lines.push(`mean=${(sum / n).toFixed(3)} max=${maxD.toFixed(3)} 分布(<0.01,<0.1,<1,<10,<100,>=100): [${hist.join(',')}]`);

        // E. 骨骼首帧 world 位置对比（Hips/LeftArm/LeftLeg）
        lines.push('');
        lines.push('=== E. t=0 骨骼 world 位置（转换后 vs 官方）===');
        const offBones = new Map<string, THREE.Bone>();
        officialRoot.traverse((n) => { if ((n as THREE.Bone).isBone) offBones.set(n.name, n as THREE.Bone); });
        const convBones = new Map<string, THREE.Bone>();
        convRoot.traverse((n) => { if ((n as THREE.Bone).isBone) convBones.set(n.name, n as THREE.Bone); });
        for (const bn of ['mixamorigHips', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftLeg', 'mixamorigLeftFoot']) {
            const ob = offBones.get(bn);
            const cb = convBones.get(bn);
            if (!ob || !cb) continue;
            const opw = ob.getWorldPosition(new THREE.Vector3());
            const cpw = cb.getWorldPosition(new THREE.Vector3());
            lines.push(`  ${bn.padEnd(22)} off=(${opw.x.toFixed(3)},${opw.y.toFixed(3)},${opw.z.toFixed(3)}) conv=(${cpw.x.toFixed(3)},${cpw.y.toFixed(3)},${cpw.z.toFixed(3)}) Δ=${opw.distanceTo(cpw).toFixed(4)}`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');
        const outPath = path.join(__dirname, '..', '..', 'temp', 'probe-arm-leg-space.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 240000);
});
