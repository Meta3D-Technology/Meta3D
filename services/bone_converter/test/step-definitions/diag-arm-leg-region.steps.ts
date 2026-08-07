/**
 * diag-arm-leg-region.steps.ts — V12.2 后续：物理区域 → 绑定骨 对照表
 *
 * 思路（规避坐标空间/顶点顺序问题）：
 *   - 用**官方 lod2 骨骼 bind 世界位置**给每个物理顶点分桶（最近骨 = 区域）
 *     —— 两模型骨骼 bind world 位置相同（probe-arm-leg-bind 实测 Δ<0.05°），
 *       所以同一物理顶点在两模型里归到同一区域。
 *   - 每个区域统计：该区域顶点的「主导骨」（最大权重槽）是什么。
 *     → 得到「物理区域 → 转换后绑定骨 vs 官方绑定骨」对照表。
 *   - 若转换后某区域主导骨与官方一致 → 绑定正确；不一致 → 权重映射错位。
 *
 * 重点区域：上臂(LeftArm/RightArm)、前臂、小腿(LeftLeg/RightLeg)、
 *   大腿(UpLeg)、脚(Foot)、躯干(Spine)、头(Head)。
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern diag-arm-leg-region --forceExit
 * 输出：temp/diag-arm-leg-region.json + 控制台
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
const TRIPO_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const LOD2_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx');

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
function dominantBone(mesh: THREE.SkinnedMesh, vIdx: number): string {
    const idx = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgt = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
    const iA = idx.array as Uint16Array | Uint32Array;
    const wA = wgt.array as Float32Array;
    let bi = -1, bw = -1;
    for (let k = 0; k < 4; k++) {
        if (wA[vIdx * 4 + k] > bw) { bw = wA[vIdx * 4 + k]; bi = iA[vIdx * 4 + k]; }
    }
    return mesh.skeleton.bones[bi]?.name ?? `?${bi}`;
}

/** 区域骨名清单（Mixamo 基础身骨，不含手指） */
const REGION_BONES = [
    'mixamorigHead', 'mixamorigNeck', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigHips',
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
    'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
    'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
];

describe('DIAG: physical region -> dominant bone table (V12.2 follow-up)', () => {
    it('buckets vertices by nearest bind bone, compares dominant bone per region', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const convRoot = loadFbx(TRIPO_FBX);
        const lod2ForRest = loadFbx(LOD2_FBX);
        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });

        // bind 骨骼世界位置（官方骨架 = 转换后对齐目标，同一坐标系）
        officialRoot.updateMatrixWorld(true);
        const offBoneWorld = new Map<string, THREE.Vector3>();
        officialRoot.traverse((n) => {
            if ((n as THREE.Bone).isBone) offBoneWorld.set(n.name, (n as THREE.Bone).getWorldPosition(new THREE.Vector3()));
        });

        const offMesh = firstSkinned(officialRoot);
        const convMesh = firstSkinned(convRoot);

        // 每顶点最近区域骨（用官方骨骼 bind 位置分桶；官方 raw position 即该坐标系）
        const regionOf = (p: THREE.Vector3): string => {
            let best = 'mixamorigHips', bestD = Infinity;
            for (const rn of REGION_BONES) {
                const wp = offBoneWorld.get(rn);
                if (!wp) continue;
                const d = p.distanceTo(wp);
                if (d < bestD) { bestD = d; best = rn; }
            }
            return best;
        };

        const offAttr = offMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const convAttr = convMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const nVerts = offAttr.count;
        const vTmp = new THREE.Vector3();

        // 官方顶点 → 区域 → 主导骨 计数
        const offRegionDom = new Map<string, Map<string, number>>();
        const convRegionDom = new Map<string, Map<string, number>>();
        // 转换后顶点用官方最近邻顶点归区域（顶点顺序不同）
        // 简化：转换后顶点位置 = 官方 raw 坐标（probe-rest-coord 证明同一坐标系），
        // 直接按转换后 position attribute 归区域
        for (let v = 0; v < nVerts; v++) {
            vTmp.set(offAttr.getX(v), offAttr.getY(v), offAttr.getZ(v));
            const r = regionOf(vTmp);
            const od = dominantBone(offMesh, v);
            if (!offRegionDom.has(r)) offRegionDom.set(r, new Map());
            const m = offRegionDom.get(r)!;
            m.set(od, (m.get(od) || 0) + 1);
        }
        for (let v = 0; v < nVerts; v++) {
            vTmp.set(convAttr.getX(v), convAttr.getY(v), convAttr.getZ(v));
            const r = regionOf(vTmp);
            const cd = dominantBone(convMesh, v);
            if (!convRegionDom.has(r)) convRegionDom.set(r, new Map());
            const m = convRegionDom.get(r)!;
            m.set(cd, (m.get(cd) || 0) + 1);
        }

        const lines: string[] = [];
        lines.push(`顶点 ${nVerts}，区域骨 ${REGION_BONES.length}`);
        lines.push('');
        lines.push('=== 物理区域 → 主导骨（前 3）对照表 ===');
        lines.push('| 区域(bind最近骨) | 官方主导骨(顶点数) | 转换后主导骨(顶点数) |');
        lines.push('|------------------|-------------------|---------------------|');
        const focusRegions = [
            'mixamorigHead', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigHips',
            'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
            'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
            'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
            'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
        ];
        for (const r of focusRegions) {
            const o = offRegionDom.get(r);
            const c = convRegionDom.get(r);
            const fmt = (m: Map<string, number> | undefined) => {
                if (!m) return '(无顶点)';
                const s = Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3);
                return s.map(([bn, cnt]) => `${bn.replace('mixamorig', '')}:${cnt}`).join('  ');
            };
            const flag = o && c ? (Array.from(o.entries())[0]?.[0] !== Array.from(c.entries())[0]?.[0] ? ' ⚠️ 主导骨不一致' : '') : '';
            lines.push(`| ${r.replace('mixamorig', '').padEnd(18)} | ${fmt(o).padEnd(17)} | ${fmt(c).padEnd(19)} |${flag}`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');
        const outPath = path.join(__dirname, '..', '..', 'temp', 'diag-arm-leg-region.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text, offRegionDom: Object.fromEntries(offRegionDom), convRegionDom: Object.fromEntries(convRegionDom) }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 240000);
});
