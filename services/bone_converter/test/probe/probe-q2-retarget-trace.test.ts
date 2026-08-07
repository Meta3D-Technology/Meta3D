/**
 * Probe Q2: 追踪 normalizeRootMotion 完整管线，定位「模型横躺」根因
 *
 * 输出：
 * 1. 模型骨架层级（转换前后）：Root 是否 Bone、骨骼数、层级变化
 * 2. T_bind_w 矩阵（Hips + 子骨骼世界变换 euler）
 * 3. copy 骨架 S_w(t) 采样（t=0/2/4）
 * 4. T_w(t) = T_bind_w · S_rest_w⁻¹ · S_w(t) 的逐步分解
 * 5. 最终 local 轨道值（euler）
 * 6. 对比：期望站立姿态 vs 实际输出姿态
 *
 * Run: npx jest using probe test match override (see jest.config.js)
 */
// ── Node polyfill ──
(global as any).self = global;
(global as any).window = global;
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 1; height = 1;
    private _src = '';
    get src() { return this._src; }
    set src(v: string) { this._src = v; if (this.onload) setTimeout(() => this.onload!(), 0); }
    addEventListener(_e: string, _cb: any) {}
    removeEventListener(_e: string, _cb: any) {}
    setAttribute(_n: string, _v: string) {}
    getAttribute(_n: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;
(global as any).document = {
    createElement: (t: string) => (t === 'img' || t === 'image') ? new MockImage() : {},
    createElementNS: (_ns: string, t: string) => (t === 'img' || t === 'image') ? new MockImage() : {},
};

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const ANIM_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(fp: string): THREE.Group {
    const buf = fs.readFileSync(fp);
    return new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
}

function rad2deg(r: number): number { return r * 180 / Math.PI; }

function decomposeM4(m: THREE.Matrix4) {
    const pos = new THREE.Vector3(), quat = new THREE.Quaternion(), scale = new THREE.Vector3();
    m.decompose(pos, quat, scale);
    return { pos, quat, scale };
}

function eulerStr(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return `(${rad2deg(e.x).toFixed(2)}, ${rad2deg(e.y).toFixed(2)}, ${rad2deg(e.z).toFixed(2)})`;
}

// ============================================================
//   Trace normalizeRootMotion pipeline
// ============================================================
function tracePipeline() {
    console.log('\n========== Probe Q2: Retarget 管线追踪 ==========\n');

    // ---- Step 1: Load model + convert ----
    const model = parseFreshFbx(MODEL_FBX);

    // 检查 Root 是否 Bone
    console.log('--- S1: 模型 Root 节点信息 ---');
    model.traverse((n) => {
        if (n.name === 'Root' || n.name.toLowerCase().includes('root')) {
            console.log(`  ${n.name}: type=${n.type}, isBone=${(n as THREE.Bone).isBone || false}, isObject3D=${(n as THREE.Object3D).isObject3D || false}`);
            const d = decomposeM4(n.matrixWorld);
            console.log(`  matrixWorld euler: ${eulerStr(d.quat)}, pos: (${d.pos.x.toFixed(3)}, ${d.pos.y.toFixed(3)}, ${d.pos.z.toFixed(3)})`);
        }
    });

    // 列出所有 Bone
    const bonesBefore = new Map<string, THREE.Bone>();
    model.traverse((n) => { if ((n as THREE.Bone).isBone) bonesBefore.set(n.name, n as THREE.Bone); });
    console.log(`  转换前骨骼数: ${bonesBefore.size}`);
    console.log(`  转换前根骨骼: ${Array.from(bonesBefore.values()).filter(b => !b.parent || !(b.parent as THREE.Bone).isBone).map(b => b.name).join(', ')}`);

    // Convert
    const report = convertTripoToMixamo(model);
    console.log(`\n--- S2: 转换后 ---`);
    console.log(`  骨骼数: ${report.boneCountAfter}`);
    console.log(`  转换根骨骼: ${Array.from(bonesBefore.values()).filter(b => !b.parent || !(b.parent as THREE.Bone).isBone).length}`);

    const bonesAfter = new Map<string, THREE.Bone>();
    model.traverse((n) => { if ((n as THREE.Bone).isBone) bonesAfter.set(n.name, n as THREE.Bone); });
    const afterRootBones = Array.from(bonesAfter.values()).filter(b => !b.parent || !(b.parent as THREE.Bone).isBone);
    console.log(`  转换后根骨骼 (parent 非 Bone): ${afterRootBones.map(b => b.name).join(', ')}`);

    // 找所有非Bone祖先链
    for (const b of afterRootBones) {
        const chain: string[] = [b.name];
        let p = b.parent;
        while (p) {
            chain.unshift(`${p.name}(${p.type}, isBone=${(p as THREE.Bone).isBone || false})`);
            p = p.parent;
        }
        console.log(`  ${b.name} 祖先链: ${chain.join(' → ')}`);
    }

    // ---- Step 2: Load animation ----
    const animObj = parseFreshFbx(ANIM_FBX);
    const clip = animObj.animations[0];

    // ---- Step 3: Run normalizeRootMotion with tracing ----
    console.log(`\n--- S3: normalizeRootMotion 管线追踪 ---`);

    model.updateMatrixWorld(true);

    // 手动复制 normalizeRootMotion 的关键步骤进行追踪
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => { if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone); });
    console.log(`  model 可驱动骨骼数: ${boneByName.size}`);

    // 找 root bone
    let rootBoneName: string | null = null;
    for (const [name, b] of boneByName) {
        const parent = b.parent;
        if (!parent || !(parent as THREE.Bone).isBone) { rootBoneName = name; break; }
    }
    console.log(`  rootBoneName (parent 非 Bone): ${rootBoneName}`);

    // T_bind_w
    const bindWorld = new Map<string, THREE.Matrix4>();
    for (const [name, b] of boneByName) bindWorld.set(name, b.matrixWorld.clone());

    console.log(`\n  --- T_bind_w (Hips) ---`);
    if (rootBoneName) {
        const rootBone = boneByName.get(rootBoneName)!;
        const bw = bindWorld.get(rootBoneName)!;
        const d = decomposeM4(bw);
        console.log(`  ${rootBoneName} T_bind_w: euler=${eulerStr(d.quat)}, pos=(${d.pos.x.toFixed(3)}, ${d.pos.y.toFixed(3)}, ${d.pos.z.toFixed(3)})`);
        // 父矩阵（非Bone祖先）
        let parent = rootBone.parent;
        while (parent) {
            const pd = decomposeM4(parent.matrixWorld);
            console.log(`    parent trail: ${parent.name}(${parent.type}) world euler=${eulerStr(pd.quat)}`);
            parent = parent.parent;
        }
    }

    // ---- S4: Copy skeleton S_w ----
    console.log(`\n  --- Copy skeleton (动画驱动, local identity) ---`);
    const copyRoot = new THREE.Group();
    const copyBone = new Map<string, THREE.Bone>();
    const topBones: THREE.Bone[] = [];
    for (const b of boneByName.values()) {
        if (!b.parent || !(b.parent as THREE.Bone).isBone) topBones.push(b);
    }
    function cloneBone(src: THREE.Bone, parent: THREE.Object3D): void {
        const c = new THREE.Bone(); c.name = src.name; parent.add(c); copyBone.set(src.name, c);
        for (const child of src.children) if ((child as THREE.Bone).isBone) cloneBone(child as THREE.Bone, c);
    }
    for (const tb of topBones) cloneBone(tb, copyRoot);
    copyRoot.updateMatrixWorld(true);

    console.log(`  copy 骨架 rootBone(s): ${topBones.map(b => b.name).join(', ')}`);
    if (topBones.length > 0) {
        console.log(`  copy 骨架祖先链 (${topBones[0].name}):`);
        let p = copyBone.get(topBones[0].name)!.parent;
        while (p) { console.log(`    ${p.name}(${p.type}, isBone=${(p as THREE.Bone).isBone || false})`); p = p.parent; }
    }

    // 驱动动画
    const trackBoneName = (t: string) => t.replace(/\.(position|quaternion|scale)$/, '');
    const drivenBones = new Set<string>();
    for (const t of clip.tracks) drivenBones.add(trackBoneName(t.name));
    const drivenInModel = Array.from(drivenBones).filter(bn => boneByName.has(bn));
    console.log(`  动画驱动骨骼数: ${drivenBones.size}, 模型中存在: ${drivenInModel.length}`);

    const filteredTracks = clip.tracks.filter(t => drivenBones.has(trackBoneName(t.name)) && boneByName.has(trackBoneName(t.name)));
    const filteredClip = new THREE.AnimationClip(clip.name, clip.duration, filteredTracks);
    const mixer = new THREE.AnimationMixer(copyRoot);
    const action = mixer.clipAction(filteredClip);
    action.reset(); action.play();

    const times = [0, 2, 4];
    const S_w = new Map<string, THREE.Matrix4[]>();
    for (const tm of times) {
        mixer.setTime(tm);
        copyRoot.updateMatrixWorld(true);
        for (const bn of drivenInModel) {
            const cb = copyBone.get(bn);
            if (!cb) continue;
            if (!S_w.has(bn)) S_w.set(bn, []);
            S_w.get(bn)!.push(cb.matrixWorld.clone());
        }
    }

    // S_rest_w = S_w at t=0
    const S_rest = new Map<string, THREE.Matrix4>();
    for (const [bn, arr] of S_w) S_rest.set(bn, arr[0].clone());

    // ---- S5: 关键矩阵分解 ----
    console.log(`\n  --- 关键骨骼矩阵对比 (t=0) ---`);
    if (rootBoneName) {
        const bn = rootBoneName;
        console.log(`\n  [${bn}] (root bone, 动画驱动)`);
        const bw = decomposeM4(bindWorld.get(bn)!);
        const sw0 = decomposeM4(S_w.get(bn)![0]);
        const sw2 = S_w.get(bn)!.length > 1 ? decomposeM4(S_w.get(bn)![1]) : null;
        console.log(`    T_bind_w    : euler=${eulerStr(bw.quat)}, pos=(${bw.pos.x.toFixed(3)}, ${bw.pos.y.toFixed(3)}, ${bw.pos.z.toFixed(3)})`);
        console.log(`    S_w(t=0)    : euler=${eulerStr(sw0.quat)}, pos=(${sw0.pos.x.toFixed(3)}, ${sw0.pos.y.toFixed(3)}, ${sw0.pos.z.toFixed(3)})`);
        if (sw2) console.log(`    S_w(t=2)    : euler=${eulerStr(sw2.quat)}, pos=(${sw2.pos.x.toFixed(3)}, ${sw2.pos.y.toFixed(3)}, ${sw2.pos.z.toFixed(3)})`);

        // S_rest_w⁻¹
        const restInv = S_rest.get(bn)!.clone().invert();
        const restInvD = decomposeM4(restInv);
        console.log(`    S_rest_w⁻¹  : euler=${eulerStr(restInvD.quat)}`);

        // T_w = T_bind_w · S_rest_w⁻¹ · S_w
        for (let i = 0; i < S_w.get(bn)!.length; i++) {
            const twM = bindWorld.get(bn)!.clone().multiply(restInv).multiply(S_w.get(bn)![i]);
            const twD = decomposeM4(twM);
            console.log(`    T_w(t=${times[i]}) : euler=${eulerStr(twD.quat)}, pos=(${twD.pos.x.toFixed(3)}, ${twD.pos.y.toFixed(3)}, ${twD.pos.z.toFixed(3)})`);
        }

        // 逐项分解
        console.log(`\n    --- 逐项分解 (t=0) ---`);
        // T_w(t=0) = T_bind_w · S_rest_w⁻¹ · S_rest_w = T_bind_w
        console.log(`    T_w(t=0) = T_bind_w · S_rest_w⁻¹ · S_rest_w = T_bind_w 应为恒等（旋转部分）`);
        const verifyT0 = bindWorld.get(bn)!.clone().multiply(restInv).multiply(S_w.get(bn)![0]);
        const v0 = decomposeM4(verifyT0);
        console.log(`    验证 T_w(t=0) euler: ${eulerStr(v0.quat)} — 应≈T_bind_w euler`);
    }

    // ---- S6: 运行 normalizeRootMotion 并读取输出 ----
    console.log(`\n--- S6: 实际 normalizeRootMotion 输出 ---`);
    const normalized = normalizeRootMotion(clip, model);

    // 读取归一化后 Hips 轨道值
    const rootPosTrack = normalized.tracks.find(t => t.name === rootBoneName + '.position') as THREE.VectorKeyframeTrack | undefined;
    const rootQuatTrack = normalized.tracks.find(t => t.name === rootBoneName + '.quaternion') as THREE.QuaternionKeyframeTrack | undefined;

    if (rootQuatTrack) {
        const qvals = rootQuatTrack.values as Float32Array;
        console.log(`  ${rootBoneName} 归一化后 quaternion (前3帧):`);
        for (let i = 0; i < Math.min(3, qvals.length / 4); i++) {
            const q = new THREE.Quaternion(qvals[i * 4], qvals[i * 4 + 1], qvals[i * 4 + 2], qvals[i * 4 + 3]);
            console.log(`    t=~${rootQuatTrack.times[i]?.toFixed(3) || '?'}: ${eulerStr(q)}`);
        }
    }
    if (rootPosTrack) {
        const pvals = rootPosTrack.values as Float32Array;
        console.log(`  ${rootBoneName} 归一化后 position (前3帧):`);
        for (let i = 0; i < Math.min(3, pvals.length / 3); i++) {
            console.log(`    t=~${rootPosTrack.times[i]?.toFixed(3) || '?'}: (${pvals[i * 3]?.toFixed(3)}, ${pvals[i * 3 + 1]?.toFixed(3)}, ${pvals[i * 3 + 2]?.toFixed(3)})`);
        }
    }

    // ---- S7: 播放归一化动画看实际姿态 ----
    console.log(`\n--- S7: 实际播放姿态 (AnimationMixer on model) ---`);
    const playMixer = new THREE.AnimationMixer(model);
    const playAction = playMixer.clipAction(normalized);
    playAction.reset(); playAction.play();

    for (const tm of [0, 1, 2, 3, 4]) {
        playMixer.setTime(tm);
        model.updateMatrixWorld(true);
        if (rootBoneName) {
            const b = boneByName.get(rootBoneName)!;
            const w = decomposeM4(b.matrixWorld);
            console.log(`  t=${tm}s ${rootBoneName} world: euler=${eulerStr(w.quat)}, pos=(${w.pos.x.toFixed(3)}, ${w.pos.y.toFixed(3)}, ${w.pos.z.toFixed(3)})`);
        }
        // 也看几个关键骨骼
        for (const bn of ['mixamorigHead', 'mixamorigLeftHand', 'mixamorigLeftFoot']) {
            const b = boneByName.get(bn);
            if (b) {
                const w = decomposeM4(b.matrixWorld);
                console.log(`    ${bn} world: euler=${eulerStr(w.quat)}, pos=(${w.pos.x.toFixed(3)}, ${w.pos.y.toFixed(3)}, ${w.pos.z.toFixed(3)})`);
            }
        }
    }

    // Check if root bone has rotation near 90 degrees
    console.log(`\n--- S8: 根因分析 ---`);
    if (rootBoneName) {
        const bw = decomposeM4(bindWorld.get(rootBoneName)!);
        const sw0 = S_w.has(rootBoneName) ? decomposeM4(S_w.get(rootBoneName)![0]) : null;

        console.log(`  T_bind_w(Hips) euler = ${eulerStr(bw.quat)}`);
        if (sw0) console.log(`  S_w(Hips, t=0) euler = ${eulerStr(sw0.quat)}`);

        // Check what contributes the rotation in T_bind_w vs S_w
        const rootBone = boneByName.get(rootBoneName)!;
        const rootLocalQuat = rootBone.quaternion.clone();
        console.log(`  Hips local quat (bind): ${eulerStr(rootLocalQuat)}`);

        // Parent chain contribution
        let parent = rootBone.parent;
        let parentChain = '';
        while (parent) {
            const pd = decomposeM4(parent.matrixWorld);
            parentChain += ` → ${parent.name}(${parent.type}) world euler=${eulerStr(pd.quat)}`;
            parent = parent.parent;
        }
        console.log(`  祖先链世界旋转:${parentChain}`);

        // The difference
        if (sw0) {
            const diffQ = sw0.quat.clone().invert().multiply(bw.quat);
            console.log(`\n  ⚠️ CRITICAL: T_bind_w vs S_rest_w 旋转差异`);
            console.log(`  T_bind_w: ${eulerStr(bw.quat)}`);
            console.log(`  S_rest_w: ${eulerStr(sw0.quat)}`);
            console.log(`  差异 (S_rest⁻¹ · T_bind): ${eulerStr(diffQ)}`);
            console.log(`  差异角度: ${(2 * Math.acos(Math.min(1, Math.abs(diffQ.w))) * 180 / Math.PI).toFixed(1)}°`);
            console.log(`  这项差异会被注入到归一化后的local旋转中，导致模型姿态错误`);
        }
    }
}

describe('Probe Q2: Retarget 管线追踪', () => {
    test('完整管线追踪', () => {
        tracePipeline();
    });
});
