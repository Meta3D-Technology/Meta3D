/**
 * diag-arm-leg-bind.steps.ts — V12.2 后续：上臂(Arm)/小腿(Leg) 骨骼数据 + 权重对比
 *
 * 任务 1（骨骼对比）：
 *   - Arm/Leg 骨 bind local pos/quat（转换后 vs 官方 lod2，应为一致——alignRestPoseToOfficial 拷贝）
 *   - Arm/Leg 骨 bind world pos/quat + 段方向（Shoulder→ForeArm / UpLeg→Foot 相对父骨）
 *   - Tripo 源 twist 骨（UpperarmTwist01/02、CalfTwist01/02）local transform 相对父骨：
 *     是否带绕段轴旋转偏移（twist offset），V12.2 删除时是否有补偿
 * 任务 2（权重对比）：
 *   - 上臂/小腿网格顶点的权重分布：转换后 vs 官方（按顶点主导骨分组统计）
 *   - 转换后上臂顶点 skinIndex 是否引用 Arm（不是 Foot/Hand 等错骨）
 *   - 官方同区域顶点权重分布（与转换后对比混合度）
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern diag-arm-leg-bind --forceExit
 * 输出：temp/diag-arm-leg-bind.json + 控制台
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

function firstSkinned(root: THREE.Object3D): THREE.SkinnedMesh {
    let m: THREE.SkinnedMesh | null = null;
    root.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !m) m = n as THREE.SkinnedMesh; });
    if (!m) throw new Error('no skinned mesh');
    return m;
}

function boneMap(root: THREE.Object3D): Map<string, THREE.Bone> {
    const m = new Map<string, THREE.Bone>();
    root.traverse((n) => { if ((n as THREE.Bone).isBone) m.set(n.name, n as THREE.Bone); });
    return m;
}

/** 段方向：a→b 世界单位向量 */
function segDir(world: Map<string, THREE.Vector3>, a: string, b: string): THREE.Vector3 {
    return world.get(b)!.clone().sub(world.get(a)!).normalize();
}

describe('DIAG: Arm/Leg bone bind + weight compare (V12.2 follow-up)', () => {
    it('dumps bind transforms, segment dirs, twist offsets, weight profiles', () => {
        const officialRoot = loadFbx(LOD2_FBX);
        const rawRoot = loadFbx(TRIPO_FBX);        // 转换前（读 Tripo twist 骨原始 local）
        const convRoot = loadFbx(TRIPO_FBX);       // 转换后
        const lod2ForRest = loadFbx(LOD2_FBX);
        convertTripoToMixamo(convRoot, { officialRestPose: lod2ForRest });

        const lines: string[] = [];
        const offBones = boneMap(officialRoot);
        const convBones = boneMap(convRoot);
        const rawBones = boneMap(rawRoot);

        // ── 任务 1A：Arm/Leg bind world pos/quat + 段方向（转换后 vs 官方）──
        officialRoot.updateMatrixWorld(true);
        convRoot.updateMatrixWorld(true);
        const offWPos = new Map<string, THREE.Vector3>();
        const offWQ = new Map<string, THREE.Quaternion>();
        const convWPos = new Map<string, THREE.Vector3>();
        const convWQ = new Map<string, THREE.Quaternion>();
        for (const bn of offBones.keys()) {
            offWPos.set(bn, offBones.get(bn)!.getWorldPosition(new THREE.Vector3()));
            offWQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(offBones.get(bn)!.matrixWorld));
        }
        for (const bn of convBones.keys()) {
            convWPos.set(bn, convBones.get(bn)!.getWorldPosition(new THREE.Vector3()));
            convWQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(convBones.get(bn)!.matrixWorld));
        }

        lines.push('=== 任务 1A. Arm/Leg bind world 变换 + 段方向（转换后 vs 官方 lod2）===');
        const focusBones = ['mixamorigLeftArm', 'mixamorigRightArm', 'mixamorigLeftLeg', 'mixamorigRightLeg'];
        const euler = new THREE.Euler();
        for (const bn of focusBones) {
            const oq = offWQ.get(bn); const cq = convWQ.get(bn);
            const op = offWPos.get(bn); const cp = convWPos.get(bn);
            if (!oq || !cq || !op || !cp) continue;
            const qDiff = oq.angleTo(cq) * 180 / Math.PI;
            const pDiff = op.distanceTo(cp);
            euler.setFromQuaternion(oq);
            const oe = `euler(${euler.x.toFixed(3)},${euler.y.toFixed(3)},${euler.z.toFixed(3)})`;
            euler.setFromQuaternion(cq);
            const ce = `euler(${euler.x.toFixed(3)},${euler.y.toFixed(3)},${euler.z.toFixed(3)})`;
            lines.push(`  ${bn.padEnd(24)} pos off=(${op.x.toFixed(4)},${op.y.toFixed(4)},${op.z.toFixed(4)}) conv=(${cp.x.toFixed(4)},${cp.y.toFixed(4)},${cp.z.toFixed(4)}) |Δp|=${pDiff.toExponential(2)}`);
            lines.push(`  ${''.padEnd(24)} quat off=${oe} conv=${ce} |Δq|=${qDiff.toExponential(2)}°`);
        }
        // 段方向：上臂 = Shoulder→ForeArm；小腿 = UpLeg→Foot（相对父骨段，验证与动画段方向一致性）
        lines.push('');
        lines.push('  段方向（bind 世界系，normalize）：');
        const sideSegs: Array<{ side: string; armA: string; armB: string; legA: string; legB: string }> = [
            { side: 'Left', armA: 'mixamorigLeftShoulder', armB: 'mixamorigLeftForeArm', legA: 'mixamorigLeftUpLeg', legB: 'mixamorigLeftFoot' },
            { side: 'Right', armA: 'mixamorigRightShoulder', armB: 'mixamorigRightForeArm', legA: 'mixamorigRightUpLeg', legB: 'mixamorigRightFoot' },
        ];
        for (const s of sideSegs) {
            const oArm = segDir(offWPos, s.armA, s.armB);
            const cArm = segDir(convWPos, s.armA, s.armB);
            const oLeg = segDir(offWPos, s.legA, s.legB);
            const cLeg = segDir(convWPos, s.legA, s.legB);
            lines.push(`  ${s.side} 上臂 Shoulder→ForeArm: off=(${oArm.x.toFixed(4)},${oArm.y.toFixed(4)},${oArm.z.toFixed(4)}) conv=(${cArm.x.toFixed(4)},${cArm.y.toFixed(4)},${cArm.z.toFixed(4)}) 夹角=${(oArm.angleTo(cArm) * 180 / Math.PI).toExponential(2)}°`);
            lines.push(`  ${s.side} 小腿 UpLeg→Foot:     off=(${oLeg.x.toFixed(4)},${oLeg.y.toFixed(4)},${oLeg.z.toFixed(4)}) conv=(${cLeg.x.toFixed(4)},${cLeg.y.toFixed(4)},${cLeg.z.toFixed(4)}) 夹角=${(oLeg.angleTo(cLeg) * 180 / Math.PI).toExponential(2)}°`);
        }

        // ── 任务 1B：Tripo 源 twist 骨 local transform（相对父骨），检查 twist 旋转偏移 ──
        lines.push('');
        lines.push('=== 任务 1B. Tripo 源 twist 骨（Upperarm/Calf）local transform 相对父骨 ===');
        const rawQ = new THREE.Quaternion();
        const rawE = new THREE.Euler();
        for (const tn of ['L_UpperarmTwist01', 'L_UpperarmTwist02', 'R_UpperarmTwist01', 'R_UpperarmTwist02',
            'L_CalfTwist01', 'L_CalfTwist02', 'R_CalfTwist01', 'R_CalfTwist02']) {
            const b = rawBones.get(tn);
            if (!b) { lines.push(`  ${tn.padEnd(18)} (不存在)`); continue; }
            const parent = b.parent;
            rawE.setFromQuaternion(b.quaternion);
            const pName = parent ? (parent as THREE.Bone).name : 'null';
            lines.push(`  ${tn.padEnd(18)} parent=${(pName as string).padEnd(14)} localPos=(${b.position.x.toFixed(4)},${b.position.y.toFixed(4)},${b.position.z.toFixed(4)}) localQuat euler=(${rawE.x.toFixed(3)},${rawE.y.toFixed(3)},${rawE.z.toFixed(3)}) |q|=${b.quaternion.length().toFixed(4)}`);
            // 绕父骨段轴 twist 角（父骨 localY/Z 是否为段轴方向——见 D8 结论：模型与 anim 手臂骨 localY 均沿手臂段方向）
            if (parent && (parent as THREE.Bone).isBone) {
                // 估算 twist 骨相对父骨的旋转角（整体系）——若 q 大则合并后有姿态偏离风险
                rawQ.copy(parent.quaternion).invert().multiply(b.quaternion);
                const relAngle = 2 * Math.acos(Math.min(1, Math.abs(rawQ.w))) * 180 / Math.PI;
                lines.push(`  ${''.padEnd(18)} 相对父骨旋转角=${relAngle.toFixed(2)}°（0=纯平移对齐，>0 表示 twist 骨自带旋转）`);
            }
        }
        // 父链：L_Upperarm → L_UpperarmTwist01 → L_UpperarmTwist02 → L_Forearm ？（验证层级链）
        lines.push('');
        lines.push('  Tripo 源臂/腿层级链（验证 twist 骨夹在主链中间）：');
        for (const chain of [['L_Upperarm', 'L_UpperarmTwist01', 'L_UpperarmTwist02', 'L_Forearm'],
        ['L_Thigh', 'L_ThighTwist01', 'L_ThighTwist02', 'L_Calf'],
        ['L_Calf', 'L_CalfTwist01', 'L_CalfTwist02', 'L_Foot']] as const) {
            let s = `  ${chain[0]} → `;
            for (let i = 1; i < chain.length; i++) {
                const b = rawBones.get(chain[i] as string);
                const p = b && b.parent ? (b.parent as THREE.Bone).name : null;
                s += `${chain[i]}${p === chain[i - 1] ? '' : `(parent=${p ?? '?'})`} → `;
            }
            lines.push(s.slice(0, -3));
        }

        // ── 任务 2：权重分布对比（上臂/小腿顶点主导骨）──
        lines.push('');
        lines.push('=== 任务 2A. 网格顶点按「主导骨（最大权重骨）」分组统计 ===');
        function dominantBoneGroups(mesh: THREE.SkinnedMesh): Map<string, { count: number; meanW: number }> {
            const idx = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
            const wgt = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
            const iA = idx.array as Uint16Array | Uint32Array;
            const wA = wgt.array as Float32Array;
            const bones = mesh.skeleton.bones;
            const groups = new Map<string, { count: number; meanW: number }>();
            const n = idx.count;
            for (let v = 0; v < n; v++) {
                let bi = -1, bw = -1;
                for (let k = 0; k < 4; k++) {
                    if (wA[v * 4 + k] > bw) { bw = wA[v * 4 + k]; bi = iA[v * 4 + k]; }
                }
                const bn = bones[bi]?.name ?? `?${bi}`;
                const g = groups.get(bn) || { count: 0, meanW: 0 };
                g.count++; g.meanW += bw;
                groups.set(bn, g);
            }
            for (const g of groups.values()) g.meanW /= g.count;
            return groups;
        }
        const offMesh = firstSkinned(officialRoot);
        const convMesh = firstSkinned(convRoot);
        const offG = dominantBoneGroups(offMesh);
        const convG = dominantBoneGroups(convMesh);
        lines.push('  官方 lod2（52 骨，主导骨 → 顶点数/平均权重）：');
        for (const [bn, g] of Array.from(offG.entries()).sort((a, b) => b[1].count - a[1].count)) {
            lines.push(`    ${bn.padEnd(30)} ${String(g.count).padStart(6)}  meanW=${g.meanW.toFixed(3)}`);
        }
        lines.push('  转换后（22 骨，主导骨 → 顶点数/平均权重）：');
        for (const [bn, g] of Array.from(convG.entries()).sort((a, b) => b[1].count - a[1].count)) {
            lines.push(`    ${bn.padEnd(30)} ${String(g.count).padStart(6)}  meanW=${g.meanW.toFixed(3)}`);
        }

        // ── 任务 2B：转换后 Arm/Leg 相关顶点权重槽混合度 ──
        lines.push('');
        lines.push('=== 任务 2B. 转换后 Arm/Leg 主导顶点的权重槽分布（混合度）===');
        function blendProfile(mesh: THREE.SkinnedMesh, dominantBone: string): { verts: number; pure: number; blended: number; slots: Map<string, number> } {
            const idx = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
            const wgt = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
            const iA = idx.array as Uint16Array | Uint32Array;
            const wA = wgt.array as Float32Array;
            const bones = mesh.skeleton.bones;
            const n = idx.count;
            let verts = 0, pure = 0, blended = 0;
            const slots = new Map<string, number>();
            for (let v = 0; v < n; v++) {
                let bi = -1, bw = -1;
                for (let k = 0; k < 4; k++) { if (wA[v * 4 + k] > bw) { bw = wA[v * 4 + k]; bi = iA[v * 4 + k]; } }
                const dbn = bones[bi]?.name ?? '?';
                if (dbn !== dominantBone) continue;
                verts++;
                // 统计该顶点所有非零权重槽指向的骨
                const names: string[] = [];
                for (let k = 0; k < 4; k++) {
                    if (wA[v * 4 + k] > 0.01) names.push(bones[iA[v * 4 + k]]?.name ?? '?');
                }
                if (names.length <= 1) pure++; else blended++;
                for (const nm of names) slots.set(nm, (slots.get(nm) || 0) + 1);
            }
            return { verts, pure, blended, slots };
        }
        for (const bn of ['mixamorigLeftArm', 'mixamorigRightArm', 'mixamorigLeftLeg', 'mixamorigRightLeg']) {
            const off = blendProfile(offMesh, bn);
            const conv = blendProfile(convMesh, bn);
            const slotLine = (s: Map<string, number>) =>
                Array.from(s.entries()).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join(' ');
            lines.push(`  ${bn.padEnd(24)} 官方: verts=${String(off.verts).padStart(5)} 纯单骨=${off.pure} 混合=${off.blended}  槽= ${slotLine(off.slots)}`);
            lines.push(`  ${''.padEnd(24)} 转换后: verts=${String(conv.verts).padStart(5)} 纯单骨=${conv.pure} 混合=${conv.blended}  槽= ${slotLine(conv.slots)}`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');

        const outPath = path.join(__dirname, '..', '..', 'temp', 'diag-arm-leg-bind.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 180000);
});
