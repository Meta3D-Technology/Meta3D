/**
 * compare-models.cjs — 对比两模型骨骼结构（Node.js 脚本）
 *
 * 加载 tripo_convert FBX 和 mixamo 官方 FBX，输出骨骼层级树、rest pose 变换、
 * 世界系关键差异，以及动画（Idle/Walk）在两模型上的骨骼轨迹对比。
 *
 * 用法：node test/e2e/compare-models.cjs
 * 输出：test/e2e/compare-models.json
 */

// ── 环境 polyfill（three FBXLoader 需要 browser globals）──
global.self = global;
global.window = global;
global.document = {
    createElement: (tag) => {
        if (tag === 'img' || tag === 'image') return new global.MockImage();
        return {};
    },
    createElementNS: (_ns, tag) => {
        if (tag === 'img' || tag === 'image') return new global.MockImage();
        return {};
    },
};
class MockImage {
    onload = null;
    onerror = null;
    width = 1;
    height = 1;
    _src = '';
    get src() { return this._src; }
    set src(v) { this._src = v; if (this.onload) setTimeout(() => this.onload(), 0); }
    addEventListener() {}
    removeEventListener() {}
    setAttribute() {}
    getAttribute() { return null; }
}
global.MockImage = MockImage;
global.Image = MockImage;

const fs = require('fs');
const path = require('path');

// 异步加载 ESM 模块
let THREE, FBXLoader;
(async () => {
    THREE = await import('three');
    FBXLoader = (await import('three/examples/jsm/loaders/FBXLoader.js')).FBXLoader;
    // 后续主流程在此调用
    await main();
})().catch(err => { console.error(err); process.exit(1); });

async function main() {

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

const TRIPO_FBX = path.join(REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const MIXAMO_FBX = path.join(REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod1.fbx');
const ANIM_IDLE_FBX = path.join(REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');
const ANIM_WALK_FBX = path.join(REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Walk/1.fbx');

// ===== 工具函数 =====

/** 加载 FBX 文件 */
function loadFbx(filePath) {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    const group = new FBXLoader().parse(ab, '');
    return group;
}

/** 收集所有骨骼（traverse + isBone） */
function collectBones(root) {
    const bones = [];
    root.traverse((n) => { if (n.isBone) bones.push(n); });
    return bones;
}

/** 提取骨骼数据 */
function extractBoneData(root) {
    root.updateMatrixWorld(true);
    const bones = collectBones(root);
    const data = {};
    for (const b of bones) {
        const parent = b.parent && b.parent.isBone ? b.parent : null;
        // 世界矩阵分解
        const wpos = new THREE.Vector3();
        const wquat = new THREE.Quaternion();
        const wscale = new THREE.Vector3();
        b.matrixWorld.decompose(wpos, wquat, wscale);
        // 局部四元数转欧拉（YXZ，度）
        const leuler = new THREE.Euler().setFromQuaternion(b.quaternion, 'YXZ');
        const weuler = new THREE.Euler().setFromQuaternion(wquat, 'YXZ');
        // 面部方向：局部 -Z 在世界空间的方向
        const faceDir = new THREE.Vector3(0, 0, -1).applyQuaternion(wquat).normalize();
        data[b.name] = {
            parentName: parent ? parent.name : null,
            localPos: [b.position.x, b.position.y, b.position.z].map(v => +v.toFixed(4)),
            localQuat: [b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w].map(v => +v.toFixed(6)),
            localEulerYXZ: [leuler.x, leuler.y, leuler.z].map(v => +(v * 180 / Math.PI).toFixed(2)),
            worldPos: [wpos.x, wpos.y, wpos.z].map(v => +v.toFixed(4)),
            worldQuat: [wquat.x, wquat.y, wquat.z, wquat.w].map(v => +v.toFixed(6)),
            worldEulerYXZ: [weuler.x, weuler.y, weuler.z].map(v => +(v * 180 / Math.PI).toFixed(2)),
            faceDir: [faceDir.x, faceDir.y, faceDir.z].map(v => +v.toFixed(4)),
            children: b.children.filter(c => c.isBone).map(c => c.name),
        };
    }
    return {
        boneCount: bones.length,
        boneNames: bones.map(b => b.name).sort(),
        boneData: data,
    };
}

/** cos 距离：值越小越接近 */
function qdist(a, b) {
    return 1 - Math.abs(a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3]);
}

/** 按骨骼名对比两模型的关键差异 */
function compareBones(dataA, dataB) {
    const aNames = new Set(dataA.boneNames);
    const bNames = new Set(dataB.boneNames);
    const onlyA = [...aNames].filter(n => !bNames.has(n));
    const onlyB = [...bNames].filter(n => !aNames.has(n));
    const common = [...aNames].filter(n => bNames.has(n));

    const diffs = [];
    for (const name of common) {
        const a = dataA.boneData[name];
        const b = dataB.boneData[name];
        if (!a || !b) continue;

        const wqDist = qdist(a.worldQuat, b.worldQuat);
        const lqDist = qdist(a.localQuat, b.localQuat);
        const wpDist = Math.sqrt(
            (a.worldPos[0] - b.worldPos[0])**2 +
            (a.worldPos[1] - b.worldPos[1])**2 +
            (a.worldPos[2] - b.worldPos[2])**2
        );
        const yDiff = Math.abs(a.worldEulerYXZ[1] - b.worldEulerYXZ[1]);

        // 标记 RED 项
        const isRed = wqDist > 0.01 || yDiff > 10 || wpDist > 0.1;
        diffs.push({
            name,
            worldQDist: +wqDist.toFixed(6),
            localQDist: +lqDist.toFixed(6),
            worldPosDist: +wpDist.toFixed(4),
            worldEulerYDiff: +yDiff.toFixed(2),
            aWorldEulerY: a.worldEulerYXZ[1],
            bWorldEulerY: b.worldEulerYXZ[1],
            aWorldEulerX: a.worldEulerYXZ[0],
            bWorldEulerX: b.worldEulerYXZ[0],
            aWorldEulerZ: a.worldEulerYXZ[2],
            bWorldEulerZ: b.worldEulerYXZ[2],
            aFaceDir: a.faceDir,
            bFaceDir: b.faceDir,
            aWorldPos: a.worldPos,
            bWorldPos: b.worldPos,
            flag: isRed ? 'RED' : '',
        });
    }
    diffs.sort((a, b) => b.worldQDist - a.worldQDist);
    return { onlyInA: onlyA, onlyInB: onlyB, commonCount: common.length, diffs };
}

// ===== 主流程 =====
console.log('=== Loading Tripo Convert FBX ===');
const tripoRoot = loadFbx(TRIPO_FBX);
console.log(`  loaded: ${TRIPO_FBX}`);
const tripoData = extractBoneData(tripoRoot);
console.log(`  boneCount: ${tripoData.boneCount}`);
console.log(`  bones: ${tripoData.boneNames.join(', ')}`);

console.log('\n=== Loading Mixamo Official FBX ===');
const mixamoRoot = loadFbx(MIXAMO_FBX);
console.log(`  loaded: ${MIXAMO_FBX}`);
const mixamoData = extractBoneData(mixamoRoot);
console.log(`  boneCount: ${mixamoData.boneCount}`);
console.log(`  bones: ${mixamoData.boneNames.join(', ')}`);

console.log('\n=== Bone Structure Comparison ===');
const comparison = compareBones(tripoData, mixamoData);
console.log(`  Only in Tripo: ${comparison.onlyInA.join(', ') || '(none)'}`);
console.log(`  Only in Mixamo: ${comparison.onlyInB.join(', ') || '(none)'}`);
console.log(`  Common bones: ${comparison.commonCount}`);
console.log(`  RED diffs: ${comparison.diffs.filter(d => d.flag).length}`);
console.log('\n  Top diffs (by worldQ distance):');
for (const d of comparison.diffs.slice(0, 15)) {
    console.log(`    ${d.name}: wQdist=${d.worldQDist} lQdist=${d.localQDist} wYdiff=${d.worldEulerYDiff}° (A=${d.aWorldEulerY}° B=${d.bWorldEulerY}°) ${d.flag}`);
}

// ===== 打印关键骨骼的上半身链详细对比 =====
console.log('\n=== Upper Body Chain Details ===');
const UPPER_CHAIN = [
    'mixamorigHips', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2',
    'mixamorigNeck', 'mixamorigHead',
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
];
for (const name of UPPER_CHAIN) {
    const a = tripoData.boneData[name];
    const b = mixamoData.boneData[name];
    if (!a || !b) {
        console.log(`  ${name}: MISSING in ${!a ? 'Tripo' : 'Mixamo'}`);
        continue;
    }
    console.log(`  ${name}:`);
    console.log(`    Tripo  localQuat=[${a.localQuat.join(',')}] localEulerYXZ=[${a.localEulerYXZ}]`);
    console.log(`    Mixamo localQuat=[${b.localQuat.join(',')}] localEulerYXZ=[${b.localEulerYXZ}]`);
    console.log(`    Tripo  worldEulerYXZ=[${a.worldEulerYXZ}] faceDir=[${a.faceDir}]`);
    console.log(`    Mixamo worldEulerYXZ=[${b.worldEulerYXZ}] faceDir=[${b.faceDir}]`);
}

const output = { tripoData, mixamoData, comparison };

// ===== 写入 JSON =====
const outPath = path.join(__dirname, 'compare-models.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 1));
console.log(`\n=== Output saved to ${outPath} ===`);

// ===== 加载动画并对比骨骼轨迹 =====
console.log('\n=== Animation Comparison ===');

function loadFbxAnim(filePath) {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

// 这个函数在指定时刻采样模型骨骼 world transform
function sampleModelAtTime(root, clip, times) {
    // 建立骨骼索引
    const boneByName = new Map();
    root.traverse(n => { if (n.isBone) boneByName.set(n.name, n); });

    // 建 mixer，应用 clip
    const mixer = new THREE.AnimationMixer(root);
    const action = mixer.clipAction(clip);
    action.reset();
    action.play();

    const samples = {};
    for (const t of times) {
        mixer.setTime(t);
        root.updateMatrixWorld(true);
        const frame = {};
        for (const [name, bone] of boneByName) {
            const wpos = new THREE.Vector3();
            const wquat = new THREE.Quaternion();
            bone.matrixWorld.decompose(wpos, wquat, new THREE.Vector3());
            const weuler = new THREE.Euler().setFromQuaternion(wquat, 'YXZ');
            frame[name] = {
                wpos: [wpos.x, wpos.y, wpos.z].map(v => +v.toFixed(4)),
                weulerYXZ: [weuler.x, weuler.y, weuler.z].map(v => +(v*180/Math.PI).toFixed(2)),
                wquat: [wquat.x, wquat.y, wquat.z, wquat.w].map(v => +v.toFixed(6)),
            };
        }
        samples[t.toFixed(3)] = frame;
    }
    return samples;
}

// 加载 Idle 和 Walk 动画 FBX
console.log('Loading Idle animation...');
const idleGroup = loadFbxAnim(ANIM_IDLE_FBX);
const idleClip = idleGroup.animations[0];
console.log(`  Idle clip: "${idleClip.name}" duration=${idleClip.duration.toFixed(3)}s, tracks=${idleClip.tracks.length}`);

console.log('Loading Walk animation...');
const walkGroup = loadFbxAnim(ANIM_WALK_FBX);
const walkClip = walkGroup.animations[0];
console.log(`  Walk clip: "${walkClip.name}" duration=${walkClip.duration.toFixed(3)}s, tracks=${walkClip.tracks.length}`);

// 对两模型分别采样（只在共有骨骼上）
const animCompare = {};
for (const [label, clip] of [['idle', idleClip], ['walk', walkClip]]) {
    console.log(`\nSampling ${label} animation on Tripo model...`);
    const times = [0, 0.1, 0.3, 0.5].filter(t => t <= clip.duration);
    const tripoSamples = sampleModelAtTime(tripoRoot, clip, times);

    console.log(`Sampling ${label} animation on Mixamo model...`);
    const mixamoSamples = sampleModelAtTime(mixamoRoot, clip, times);

    // 对比同骨骼同时刻的世界 Y euler
    const animDiffs = {};
    for (const tStr of Object.keys(tripoSamples)) {
        const tf = tripoSamples[tStr];
        const mf = mixamoSamples[tStr];
        const td = {};
        for (const name of comparison.diffs.map(d => d.name)) {
            const tq = tf[name];
            const mq = mf[name];
            if (!tq || !mq) continue;
            const yDiff = Math.abs(tq.weulerYXZ[1] - mq.weulerYXZ[1]);
            td[name] = {
                tripoEulerY: tq.weulerYXZ[1],
                mixamoEulerY: mq.weulerYXZ[1],
                yDiff: +yDiff.toFixed(2),
                tripoEulerX: tq.weulerYXZ[0],
                mixamoEulerX: mq.weulerYXZ[0],
            };
        }
        animDiffs[tStr] = td;
    }
    animCompare[label] = animDiffs;

    // 汇总输出
    const RED_NAMES = UPPER_CHAIN;
    console.log(`\n  Key upper body animation diffs (${label}, Y euler):`);
    for (const tStr of Object.keys(animDiffs)) {
        console.log(`    t=${tStr}s:`);
        for (const name of RED_NAMES) {
            const d = animDiffs[tStr][name];
            if (d) {
                const flag = Math.abs(d.yDiff) > 150 ? ' *** 180° SUSPECT ***' : d.yDiff > 30 ? ' RED' : '';
                console.log(`      ${name}: tripoY=${d.tripoEulerY}° mixamoY=${d.mixamoEulerY}° diff=${d.yDiff}°${flag}`);
            }
        }
    }
}

output.animationComparison = animCompare;
fs.writeFileSync(outPath, JSON.stringify(output, null, 1));
console.log(`\n=== Final output saved to ${outPath} ===`);
}
