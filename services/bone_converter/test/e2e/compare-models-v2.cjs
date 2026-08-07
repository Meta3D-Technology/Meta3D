/**
 * compare-models-v2.cjs — 对比两模型骨骼（含 BoneMapping 交叉映射）
 *
 * 加载 tripo FBX（Tripo 命名，41 骨）和 mixamo 官方 FBX（Mixamo 命名，65 骨），
 * 通过 BoneMapping 表映射后对比 rest pose 变换。
 *
 * 用法：node test/e2e/compare-models-v2.cjs
 * 输出：test/e2e/compare-models-v2.json
 */
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
    onload = null; onerror = null; width = 1; height = 1; _src = '';
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

// BoneMapping (from BoneMapping.ts)
const BONE_MAP = [
    { tripo: 'Hip', mixamo: 'mixamorigHips', action: 'rename' },
    { tripo: 'Pelvis', mixamo: 'mixamorigHips', action: 'merge' },
    { tripo: 'Waist', mixamo: 'mixamorigSpine', action: 'rename' },
    { tripo: 'Spine01', mixamo: 'mixamorigSpine1', action: 'rename' },
    { tripo: 'Spine02', mixamo: 'mixamorigSpine2', action: 'rename' },
    { tripo: 'NeckTwist01', mixamo: 'mixamorigNeck', action: 'rename' },
    { tripo: 'NeckTwist02', mixamo: 'mixamorigNeck', action: 'merge' },
    { tripo: 'Head', mixamo: 'mixamorigHead', action: 'rename' },
    { tripo: 'R_Clavicle', mixamo: 'mixamorigRightShoulder', action: 'rename' },
    { tripo: 'R_Upperarm', mixamo: 'mixamorigRightArm', action: 'rename' },
    { tripo: 'R_Forearm', mixamo: 'mixamorigRightForeArm', action: 'rename' },
    { tripo: 'R_Hand', mixamo: 'mixamorigRightHand', action: 'rename' },
    { tripo: 'L_Clavicle', mixamo: 'mixamorigLeftShoulder', action: 'rename' },
    { tripo: 'L_Upperarm', mixamo: 'mixamorigLeftArm', action: 'rename' },
    { tripo: 'L_Forearm', mixamo: 'mixamorigLeftForeArm', action: 'rename' },
    { tripo: 'L_Hand', mixamo: 'mixamorigLeftHand', action: 'rename' },
    { tripo: 'R_Thigh', mixamo: 'mixamorigRightUpLeg', action: 'rename' },
    { tripo: 'R_Calf', mixamo: 'mixamorigRightLeg', action: 'rename' },
    { tripo: 'R_Foot', mixamo: 'mixamorigRightFoot', action: 'rename' },
    { tripo: 'R_ToeBase', mixamo: 'mixamorigRightToeBase', action: 'rename' },
    { tripo: 'L_Thigh', mixamo: 'mixamorigLeftUpLeg', action: 'rename' },
    { tripo: 'L_Calf', mixamo: 'mixamorigLeftLeg', action: 'rename' },
    { tripo: 'L_Foot', mixamo: 'mixamorigLeftFoot', action: 'rename' },
    { tripo: 'L_ToeBase', mixamo: 'mixamorigLeftToeBase', action: 'rename' },
];

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const MIXAMO_FBX = path.join(REPO_ROOT,
    'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod1.fbx');

async function main() {
    const THREE = await import('three');
    const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');

    function loadFbx(filePath) {
        const buf = fs.readFileSync(filePath);
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return new FBXLoader().parse(ab, '');
    }

    function collectBones(root) {
        const bones = [];
        root.traverse(n => { if (n.isBone) bones.push(n); });
        return bones;
    }

    function extractBoneData(root) {
        root.updateMatrixWorld(true);
        const bones = collectBones(root);
        const data = {};
        for (const b of bones) {
            const parent = b.parent && b.parent.isBone ? b.parent.name : null;
            const wpos = new THREE.Vector3();
            const wquat = new THREE.Quaternion();
            b.matrixWorld.decompose(wpos, wquat, new THREE.Vector3());
            const leuler = new THREE.Euler().setFromQuaternion(b.quaternion, 'YXZ');
            const weuler = new THREE.Euler().setFromQuaternion(wquat, 'YXZ');
            // 骨骼局部轴（X/Y/Z）在世界空间的方向
            const axisX = new THREE.Vector3(1, 0, 0).applyQuaternion(wquat).normalize();
            const axisY = new THREE.Vector3(0, 1, 0).applyQuaternion(wquat).normalize();
            const axisZ = new THREE.Vector3(0, 0, 1).applyQuaternion(wquat).normalize();
            data[b.name] = {
                parentName: parent || null,
                localPos: [b.position.x, b.position.y, b.position.z].map(v => +v.toFixed(4)),
                localQuat: [b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w].map(v => +v.toFixed(6)),
                localEulerYXZ: [leuler.x, leuler.y, leuler.z].map(v => +(v * 180 / Math.PI).toFixed(2)),
                worldPos: [wpos.x, wpos.y, wpos.z].map(v => +v.toFixed(4)),
                worldQuat: [wquat.x, wquat.y, wquat.z, wquat.w].map(v => +v.toFixed(6)),
                worldEulerYXZ: [weuler.x, weuler.y, weuler.z].map(v => +(v * 180 / Math.PI).toFixed(2)),
                axisX: [axisX.x, axisX.y, axisX.z].map(v => +v.toFixed(4)),
                axisY: [axisY.x, axisY.y, axisY.z].map(v => +v.toFixed(4)),
                axisZ: [axisZ.x, axisZ.y, axisZ.z].map(v => +v.toFixed(4)),
                children: b.children.filter(c => c.isBone).map(c => c.name),
            };
        }
        return { boneCount: bones.length, boneNames: bones.map(b => b.name).sort(), boneData: data };
    }

    function qdist(a, b) {
        return 1 - Math.abs(a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3]);
    }

    console.log('=== Loading Tripo FBX ===');
    const tripoRoot = loadFbx(TRIPO_FBX);
    const tripoData = extractBoneData(tripoRoot);
    console.log(`  bones: ${tripoData.boneCount} (${tripoData.boneNames.join(', ')})`);

    console.log('\n=== Loading Mixamo Official FBX ===');
    const mixamoRoot = loadFbx(MIXAMO_FBX);
    const mixamoData = extractBoneData(mixamoRoot);
    console.log(`  bones: ${mixamoData.boneCount}`);

    // ---- Cross-compare via BoneMapping ----
    console.log('\n=== Cross-Compare via BoneMapping ===');
    console.log('| TripoBone | MixamoBone | wY_euler(Tripo) | wY_euler(Mixamo) | wY_diff | wQ_dist | lQ_dist | Action |');
    console.log('|-----------|-----------|-----------------|------------------|---------|---------|---------|--------|');

    const crossDiffs = [];
    for (const entry of BONE_MAP) {
        const td = tripoData.boneData[entry.tripo];
        const md = mixamoData.boneData[entry.mixamo];
        if (!td || !md) {
            console.log(`| ${entry.tripo} | ${entry.mixamo} | MISSING(${!td?'T':'M'}) | | | | | ${entry.action} |`);
            continue;
        }
        const wqDist = qdist(td.worldQuat, md.worldQuat);
        const lqDist = qdist(td.localQuat, md.localQuat);
        const wYd = Math.abs(td.worldEulerYXZ[1] - md.worldEulerYXZ[1]);
        // Normalize Y diff to [0, 180)
        const yDiffNorm = Math.min(wYd % 360, 360 - (wYd % 360));
        const flag = yDiffNorm > 150 ? ' *** 180° ***' : yDiffNorm > 30 ? ' RED' : yDiffNorm > 10 ? ' yellow' : '';
        console.log(`| ${entry.tripo.padEnd(13)}| ${entry.mixamo.padEnd(25)}| ${String(td.worldEulerYXZ[1]).padStart(15)}| ${String(md.worldEulerYXZ[1]).padStart(16)}| ${String(yDiffNorm.toFixed(1)).padStart(7)}| ${wqDist.toFixed(4).padStart(7)}| ${lqDist.toFixed(4).padStart(7)}| ${entry.action.padEnd(6)}|${flag}`);

        crossDiffs.push({
            tripoName: entry.tripo,
            mixamoName: entry.mixamo,
            action: entry.action,
            ...(yDiffNorm > 10 || wqDist > 0.1 ? {
                tripoLocalQuat: td.localQuat,
                mixamoLocalQuat: md.localQuat,
                tripoWorldEuler: td.worldEulerYXZ,
                mixamoWorldEuler: md.worldEulerYXZ,
                tripoWorldQuat: td.worldQuat,
                mixamoWorldQuat: md.worldQuat,
                worldQDist: +wqDist.toFixed(6),
                localQDist: +lqDist.toFixed(6),
                worldEulerYDiffNorm: +yDiffNorm.toFixed(2),
            } : { worldEulerYDiffNorm: +yDiffNorm.toFixed(2) }),
        });
    }

    // ---- Detail: local quaternion comparison for each mapped bone ----
    console.log('\n=== Local Quaternion Detail (per mapped bone) ===');
    for (const entry of BONE_MAP) {
        const td = tripoData.boneData[entry.tripo];
        const md = mixamoData.boneData[entry.mixamo];
        if (!td || !md) continue;
        console.log(`\n${entry.tripo} -> ${entry.mixamo} (${entry.action}):`);
        console.log(`  Tripo  localPos: [${td.localPos}]`);
        console.log(`  Mixamo localPos: [${md.localPos}]`);
        console.log(`  Tripo  localQuat (xyzw): [${td.localQuat}]`);
        console.log(`  Mixamo localQuat (xyzw): [${md.localQuat}]`);
        console.log(`  Tripo  worldEulerYXZ: [${td.worldEulerYXZ}]`);
        console.log(`  Mixamo worldEulerYXZ: [${md.worldEulerYXZ}]`);
        console.log(`  Tripo  axisY(world): [${td.axisY}]`);
        console.log(`  Mixamo axisY(world): [${md.axisY}]`);
    }

    // ---- Additional: Compare Tripo Root (non-mapped, but important) ----
    console.log('\n=== Tripo Root/Skeleton Container ===');
    const rootBones = ['Root'];
    for (const name of rootBones) {
        const td = tripoData.boneData[name];
        if (td) {
            console.log(`  ${name}: worldEuler=[${td.worldEulerYXZ}] localQuat=[${td.localQuat}] worldPos=[${td.worldPos}]`);
            console.log(`    axisY(world)=[${td.axisY}]`);
        }
    }

    // ---- Write JSON ----
    const output = {
        tripoMeta: { boneCount: tripoData.boneCount },
        mixamoMeta: { boneCount: mixamoData.boneCount },
        crossDiffs,
        tripoBones: Object.keys(tripoData.boneData).sort(),
        mixamoBones: Object.keys(mixamoData.boneData).sort(),
    };
    const outPath = path.join(__dirname, 'compare-models-v2.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 1));
    console.log(`\n=== Output saved to ${outPath} ===`);
}

main().catch(err => { console.error(err); process.exit(1); });
