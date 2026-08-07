/**
 * Probe Q1: 解析 1.fbx 动画数据 + Tripo 模型绑定姿态
 *
 * 输出：
 * 1. 轨道清单（骨骼名 + 属性 + 关键帧数）
 * 2. 动画骨架层级树
 * 3. 每骨骼 t=0 局部姿态（position / quaternion->euler）
 * 4. 每骨骼动画运动幅度（局部旋转最大变化 deg）
 * 5. Mixamo 动画坐标系 vs Tripo 模型坐标系的差异
 *
 * Run: npx jest using probe test match override (see jest.config.js)
 */
// ── Node 环境 polyfill（同 d5 steps，含 MockImage 支持模型 FBX 纹理加载）──
(global as any).self = global;
(global as any).window = global;
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
(global as any).document = {
    createElement: (_tag: string) => {
        if (_tag === 'img' || _tag === 'image') return new MockImage();
        return {};
    },
    createElementNS: (_ns: string, _tag: string) => {
        if (_tag === 'img' || _tag === 'image') return new MockImage();
        return {};
    },
};

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const ANIM_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

/** Euler deg 友好输出 */
function eulerDeg(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return `(${rad2deg(e.x).toFixed(1)}, ${rad2deg(e.y).toFixed(1)}, ${rad2deg(e.z).toFixed(1)})`;
}

function rad2deg(r: number): number { return r * 180 / Math.PI; }

/** 提取轨道名中的骨骼名 */
function trackBoneName(trackName: string): string {
    return trackName.replace(/\.(position|quaternion|scale|rotation)$/, '');
}

function decomposeM4(m: THREE.Matrix4): { pos: THREE.Vector3; quat: THREE.Quaternion; scale: THREE.Vector3 } {
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    m.decompose(pos, quat, scale);
    return { pos, quat, scale };
}

// ============================================================
//   Part A: 动画 FBX 分析
// ============================================================
function analyzeAnimFbx() {
    console.log('\n========== Part A: 动画 FBX (1.fbx) 分析 ==========\n');

    const animObj = parseFreshFbx(ANIM_FBX);
    const clip = animObj.animations[0];

    console.log(`AnimationClip: ${clip.name}, duration: ${clip.duration}s, tracks: ${clip.tracks.length}`);

    // ---- A1: 轨道清单 ----
    console.log('\n--- A1: 轨道清单 ---');
    const trackMap = new Map<string, { posKf?: number; quatKf?: number; scaleKf?: number; times: number[] }>();
    const allTimes = new Set<number>();

    for (const t of clip.tracks) {
        const bn = trackBoneName(t.name);
        if (!trackMap.has(bn)) trackMap.set(bn, { times: [] });
        const entry = trackMap.get(bn)!;
        if (t.name.endsWith('.position')) entry.posKf = t.times.length;
        else if (t.name.endsWith('.quaternion')) entry.quatKf = t.times.length;
        else if (t.name.endsWith('.scale')) entry.scaleKf = t.times.length;
        for (const tm of t.times) { entry.times.push(tm); allTimes.add(tm); }
    }

    let trackIdx = 0;
    for (const [bn, entry] of trackMap) {
        const uniTimes = Array.from(new Set(entry.times)).sort((a, b) => a - b);
        const parts: string[] = [];
        if (entry.posKf !== undefined) parts.push(`pos:${entry.posKf}`);
        if (entry.quatKf !== undefined) parts.push(`quat:${entry.quatKf}`);
        if (entry.scaleKf !== undefined) parts.push(`scale:${entry.scaleKf}`);
        console.log(`  [${trackIdx}] ${bn}: ${parts.join(', ')} | unique times: ${uniTimes.length} | range: ${uniTimes[0]}~${uniTimes.length > 1 ? uniTimes[uniTimes.length - 1] : uniTimes[0]}`);
        trackIdx++;
    }
    console.log(`Total unique times: ${allTimes.size}`);

    // ---- A2: 动画骨架层级 ----
    console.log('\n--- A2: 动画骨架层级树 ---');
    const animBones = new Map<string, THREE.Bone>();
    animObj.traverse((node) => {
        if ((node as THREE.Bone).isBone) animBones.set(node.name, node as THREE.Bone);
    });
    console.log(`动画骨架骨骼数: ${animBones.size}`);

    // 找根骨骼
    const rootBones: string[] = [];
    for (const [name, b] of animBones) {
        const p = b.parent;
        if (!p || !(p as THREE.Bone).isBone) rootBones.push(name);
    }
    console.log(`根骨骼: ${rootBones.join(', ')}`);

    function printBoneHierarchy(bone: THREE.Bone, indent: number) {
        const children: THREE.Bone[] = [];
        for (const child of bone.children) {
            if ((child as THREE.Bone).isBone) children.push(child as THREE.Bone);
        }
        const prefix = '  '.repeat(indent);
        console.log(`${prefix}${bone.name}`);
        for (const c of children) printBoneHierarchy(c, indent + 1);
    }

    for (const rn of rootBones) {
        const rb = animBones.get(rn)!;
        printBoneHierarchy(rb, 0);
    }

    // ---- A3: 每骨骼 t=0 局部姿态 + 全程运动幅度 ----
    console.log('\n--- A3: 每骨骼 t=0 局部姿态 & 动画幅度 ---');

    // 用动画对象自身的骨架建 mixer
    const mixer = new THREE.AnimationMixer(animObj);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();

    // 先采样 t=0
    mixer.setTime(0);
    animObj.updateMatrixWorld(true);
    const pos0 = new Map<string, THREE.Vector3>();
    const quat0 = new Map<string, THREE.Quaternion>();
    const boneData = new Map<string, { pos0: THREE.Vector3; euler0: THREE.Euler; maxQuatDeltaDeg: number; maxPosDelta: number }>();
    for (const [name, b] of animBones) {
        pos0.set(name, b.position.clone());
        quat0.set(name, b.quaternion.clone());
        boneData.set(name, { pos0: new THREE.Vector3(), euler0: new THREE.Euler(), maxQuatDeltaDeg: 0, maxPosDelta: 0 });
    }

    // 采样所有 unique times
    const times = Array.from(allTimes).sort((a, b) => a - b);
    for (const tm of times) {
        mixer.setTime(tm);
        animObj.updateMatrixWorld(true);
        for (const [bn, b] of animBones) {
            const d = boneData.get(bn)!;
            const qDelta = quat0.get(bn)!.angleTo(b.quaternion) * 180 / Math.PI;
            if (qDelta > d.maxQuatDeltaDeg) d.maxQuatDeltaDeg = qDelta;
            const pDelta = pos0.get(bn)!.distanceTo(b.position);
            if (pDelta > d.maxPosDelta) d.maxPosDelta = pDelta;
        }
    }

    // 收集最终数据
    for (const [bn, d] of boneData) {
        d.pos0.copy(pos0.get(bn)!);
        d.euler0.setFromQuaternion(quat0.get(bn)!, 'YXZ');
    }

    // 按骨骼层级排序输出
    const orderedBones: string[] = [];
    function collectBonesFlat(bone: THREE.Bone) {
        orderedBones.push(bone.name);
        for (const c of bone.children) {
            if ((c as THREE.Bone).isBone) collectBonesFlat(c as THREE.Bone);
        }
    }
    for (const rn of rootBones) collectBonesFlat(animBones.get(rn)!);

    console.log('  Bone                      | t=0 local quat (euler X,Y,Z deg)        | maxQuatΔ(deg) | maxPosΔ');
    console.log('  ------------------------- | ---------------------------------------- | -------------- | --------');
    for (const bn of orderedBones) {
        const d = boneData.get(bn);
        if (!d) continue;
        const e = d.euler0;
        console.log(
            `  ${bn.padEnd(25)} | (${rad2deg(e.x).toFixed(1).padStart(7)}, ${rad2deg(e.y).toFixed(1).padStart(7)}, ${rad2deg(e.z).toFixed(1).padStart(7)}) | ${d.maxQuatDeltaDeg.toFixed(3).padStart(10)} | ${d.maxPosDelta.toFixed(5)}`,
        );
    }

    // ---- A4: Hips t=0 世界旋转 ----
    console.log('\n--- A4: Hips t=0 世界旋转（Mixamo 动画坐标系）---');
    const hipsAnim = animBones.get('mixamorigHips');
    if (hipsAnim) {
        const d = decomposeM4(hipsAnim.matrixWorld);
        console.log(`  Hips world position: (${d.pos.x.toFixed(4)}, ${d.pos.y.toFixed(4)}, ${d.pos.z.toFixed(4)})`);
        console.log(`  Hips world quat euler: ${eulerDeg(d.quat)}`);
        console.log(`  Hips local position: (${hipsAnim.position.x.toFixed(4)}, ${hipsAnim.position.y.toFixed(4)}, ${hipsAnim.position.z.toFixed(4)})`);
    }

    // ---- A5: 关键骨骼动画幅度（分类汇总）----
    console.log('\n--- A5: 关键骨骼动画幅度（分类汇总）---');
    const keyBones: Record<string, RegExp> = {
        'Hips': /^mixamorigHips$/,
        'Spine': /^mixamorigSpine$/,
        'Spine1': /^mixamorigSpine1$/,
        'Spine2': /^mixamorigSpine2$/,
        'Neck': /^mixamorigNeck$/,
        'Head': /^mixamorigHead$/,
        'LeftShoulder': /^mixamorigLeftShoulder$/,
        'LeftArm': /^mixamorigLeftArm$/,
        'LeftForeArm': /^mixamorigLeftForeArm$/,
        'LeftHand': /^mixamorigLeftHand$/,
        'RightArm': /^mixamorigRightArm$/,
        'RightForeArm': /^mixamorigRightForeArm$/,
        'RightHand': /^mixamorigRightHand$/,
        'LeftUpLeg': /^mixamorigLeftUpLeg$/,
        'LeftLeg': /^mixamorigLeftLeg$/,
        'LeftFoot': /^mixamorigLeftFoot$/,
        'RightUpLeg': /^mixamorigRightUpLeg$/,
        'RightLeg': /^mixamorigRightLeg$/,
        'RightFoot': /^mixamorigRightFoot$/,
    };
    for (const [label, re] of Object.entries(keyBones)) {
        const match = orderedBones.find((n) => re.test(n));
        if (match) {
            const d = boneData.get(match)!;
            const posStr = d.maxPosDelta > 0.00001 ? ` posΔ=${d.maxPosDelta.toFixed(5)}` : '';
            console.log(`  ${label.padEnd(15)}: rotΔ=${d.maxQuatDeltaDeg.toFixed(3)}°${posStr}  (t=0 euler: ${eulerDeg(quat0.get(match)!)})`);
        } else {
            console.log(`  ${label.padEnd(15)}: NOT FOUND`);
        }
    }

    return { clip, animBones, rootBones, boneData, quat0, pos0, times };
}

// ============================================================
//   Part B: Tripo 模型绑定姿态分析
// ============================================================
function analyzeModelBindPose() {
    console.log('\n========== Part B: Tripo 模型绑定姿态分析 ==========\n');

    const model = parseFreshFbx(MODEL_FBX);

    const modelBones = new Map<string, THREE.Bone>();
    model.traverse((node) => {
        if ((node as THREE.Bone).isBone) modelBones.set(node.name, node as THREE.Bone);
    });
    console.log(`模型骨骼数: ${modelBones.size}`);

    // 找根骨骼
    const rootBones: string[] = [];
    for (const [name, b] of modelBones) {
        const p = b.parent;
        if (!p || !(p as THREE.Bone).isBone) rootBones.push(name);
    }
    console.log(`根骨骼: ${rootBones.join(', ')}`);

    // 层级树
    console.log('\n模型骨骼层级树:');
    function printHierarchy(bone: THREE.Bone, indent: number) {
        const children: THREE.Bone[] = [];
        for (const c of bone.children) {
            if ((c as THREE.Bone).isBone) children.push(c as THREE.Bone);
        }
        const prefix = '  '.repeat(indent);
        console.log(`  ${prefix}${bone.name}`);
        for (const c of children) printHierarchy(c, indent + 1);
    }
    for (const rn of rootBones) {
        printHierarchy(modelBones.get(rn)!, 1);
    }

    // T_bind_w: 各骨骼世界矩阵
    console.log('\n--- 模型 T_bind_w（matrixWorld）---');
    model.updateMatrixWorld(true);

    const orderedModel: string[] = [];
    function collectFlat(b: THREE.Bone) { orderedModel.push(b.name); for (const c of b.children) if ((c as THREE.Bone).isBone) collectFlat(c as THREE.Bone); }
    for (const rn of rootBones) collectFlat(modelBones.get(rn)!);

    console.log('  Bone                      | bind world euler (X,Y,Z deg)             | bind world position');
    console.log('  ------------------------- | ---------------------------------------- | --------------------');
    for (const bn of orderedModel) {
        const b = modelBones.get(bn)!;
        const d = decomposeM4(b.matrixWorld);
        const e = new THREE.Euler().setFromQuaternion(d.quat, 'YXZ');
        console.log(
            `  ${bn.padEnd(25)} | (${rad2deg(e.x).toFixed(1).padStart(7)}, ${rad2deg(e.y).toFixed(1).padStart(7)}, ${rad2deg(e.z).toFixed(1).padStart(7)}) | (${d.pos.x.toFixed(3)}, ${d.pos.y.toFixed(3)}, ${d.pos.z.toFixed(3)})`,
        );
    }

    // 模型根骨骼 Hips 世界旋转
    const hipsModel = modelBones.get('Hips') || modelBones.get(rootBones[0]);
    if (hipsModel) {
        const d = decomposeM4(hipsModel.matrixWorld);
        console.log(`\n  模型根骨骼 "${hipsModel.name}" 世界旋转: ${eulerDeg(d.quat)}`);
        console.log(`  世界位置: (${d.pos.x.toFixed(4)}, ${d.pos.y.toFixed(4)}, ${d.pos.z.toFixed(4)})`);
    }

    return { model, modelBones, orderedModel };
}

// ============================================================
//   Part C: 坐标系差异对比
// ============================================================
function compareCoordinateSystems() {
    console.log('\n========== Part C: 坐标系差异对比 ==========\n');

    const animObj = parseFreshFbx(ANIM_FBX);
    const animBones = new Map<string, THREE.Bone>();
    animObj.traverse((n) => { if ((n as THREE.Bone).isBone) animBones.set(n.name, n as THREE.Bone); });
    const clip = animObj.animations[0];
    const mixer = new THREE.AnimationMixer(animObj);
    mixer.clipAction(clip).reset().play();
    mixer.setTime(0);
    animObj.updateMatrixWorld(true);

    const model = parseFreshFbx(MODEL_FBX);
    const modelBones = new Map<string, THREE.Bone>();
    model.traverse((n) => { if ((n as THREE.Bone).isBone) modelBones.set(n.name, n as THREE.Bone); });
    model.updateMatrixWorld(true);

    // Mixamo Hips t=0 世界旋转
    const animHips = animBones.get('mixamorigHips');
    const aD = animHips ? decomposeM4(animHips.matrixWorld) : null;
    if (aD) {
        console.log(`Mixamo Hips (t=0) 世界旋转: ${eulerDeg(aD.quat)}`);
        console.log(`  世界位置: (${aD.pos.x.toFixed(4)}, ${aD.pos.y.toFixed(4)}, ${aD.pos.z.toFixed(4)})`);
    }

    // Tripo Hips bind 世界旋转
    const modelHips = modelBones.get('Hips');
    const mD = modelHips ? decomposeM4(modelHips.matrixWorld) : null;
    if (mD) {
        console.log(`Tripo Hips (bind) 世界旋转: ${eulerDeg(mD.quat)}`);
        console.log(`  世界位置: (${mD.pos.x.toFixed(4)}, ${mD.pos.y.toFixed(4)}, ${mD.pos.z.toFixed(4)})`);
    }

    if (aD && mD) {
        // Mixamo -> Tripo 差异
        const diffMQ = aD.quat.clone().invert().multiply(mD.quat);
        const diffAngle = 2 * Math.acos(Math.min(1, Math.abs(diffMQ.w))) * 180 / Math.PI;
        const diffMEuler = new THREE.Euler().setFromQuaternion(diffMQ, 'YXZ');
        console.log(`\n  Mixamo→Tripo 旋转差: ${diffAngle.toFixed(1)}°`);
        console.log(`  Euler (Mixamo→Tripo): (${rad2deg(diffMEuler.x).toFixed(1)}, ${rad2deg(diffMEuler.y).toFixed(1)}, ${rad2deg(diffMEuler.z).toFixed(1)})`);

        // Tripo -> Mixamo 差异
        const diffTQ = mD.quat.clone().invert().multiply(aD.quat);
        const diffTEuler = new THREE.Euler().setFromQuaternion(diffTQ, 'YXZ');
        const diffTAngle = 2 * Math.acos(Math.min(1, Math.abs(diffTQ.w))) * 180 / Math.PI;
        console.log(`  Tripo→Mixamo 旋转差: ${diffTAngle.toFixed(1)}°`);
        console.log(`  Euler (Tripo→Mixamo): (${rad2deg(diffTEuler.x).toFixed(1)}, ${rad2deg(diffTEuler.y).toFixed(1)}, ${rad2deg(diffTEuler.z).toFixed(1)})`);
    }
}

// ============================================================
//   Test entry
// ============================================================
describe('Probe Q1: 1.fbx 动画数据分析', () => {
    test('Part A: 动画 FBX 分析', () => {
        const animData = analyzeAnimFbx();
        expect(animData.clip).toBeDefined();
        expect(animData.animBones.size).toBeGreaterThan(0);
    });

    test('Part B: Tripo 模型绑定姿态分析', () => {
        const modelData = analyzeModelBindPose();
        expect(modelData.modelBones.size).toBeGreaterThan(0);
    });

    test('Part C: 坐标系差异对比', () => {
        compareCoordinateSystems();
    });
});
