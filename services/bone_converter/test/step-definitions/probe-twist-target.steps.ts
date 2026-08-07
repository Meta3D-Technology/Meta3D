/**
 * probe-twist-target.steps.ts — V12.2 后续：twist 骨正确绑定目标判定
 *
 * 背景：diag-arm-leg-region + fixsim 实锤 ——
 *   - Foot 区域顶点被绑到 Leg（CalfTwist01/02 合并 → semanticParent=L_Calf=Leg），
 *     官方绑 Foot。脚踝不弯折 → 兄弟反馈「小腿 Leg 有问题」。
 *   - Arm 区域顶点全绑 Arm（UpperarmTwist 合并 → Arm），官方混合 Shoulder/Spine1/Arm。
 *     上臂僵硬 → 兄弟反馈「上臂 Arm 有问题」。
 *
 * semanticParent 只往上找第一个非 twist 祖先骨，忽略 twist 骨下方（远端）的
 * 非 twist 子骨。真实 rig 中 twist 骨夹在两个主链骨之间：
 *   L_Thigh → TTwist01 → TTwist02 → L_Calf → CTwist01 → CTwist02 → L_Foot
 * 远端 twist（CTwist02，靠近踝关节）的权重应绑 Foot，而不是 Leg。
 *
 * 本探针：对每个 twist 骨，打印
 *   - world 位置
 *   - semanticParent（当前 target）
 *   - 该骨附近的其他非 twist 骨（父侧/子侧）world 位置与距离
 * 判定「按最近非 twist 骨」是否能给出正确 target（Foot/Shoulder 而非 Leg/Arm）。
 *
 * 跑法：cd packages/bone_converter && npx jest --config jest.config.js --testPathPattern probe-twist-target --forceExit
 * 输出：temp/probe-twist-target.json + 控制台
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

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const TRIPO_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

describe('PROBE: twist bone -> correct bind target determination', () => {
    it('dumps twist bone world pos vs nearby non-twist bones', () => {
        const rawRoot = loadFbx(TRIPO_FBX);
        rawRoot.updateMatrixWorld(true);
        const bones = new Map<string, THREE.Bone>();
        rawRoot.traverse((n) => { if ((n as THREE.Bone).isBone) bones.set(n.name, n as THREE.Bone); });

        // 非 twist 主链骨集合（Tripo 命名）
        const isTwist = (n: string) => /(Twist|twist)\d+$/.test(n);
        const mainBones = Array.from(bones.keys()).filter((n) => !isTwist(n));

        const lines: string[] = [];
        lines.push(`Tripo 源骨骼 ${bones.size} 个，主链骨 ${mainBones.length} 个`);
        lines.push('');
        lines.push('=== twist 骨 world 位置 vs 候选目标（最近的 3 个非 twist 骨）===');
        const twistBones = Array.from(bones.keys()).filter(isTwist);
        for (const tn of twistBones.sort()) {
            const b = bones.get(tn)!;
            const wp = b.getWorldPosition(new THREE.Vector3());
            // 找最近的非 twist 骨
            const candidates = mainBones.map((mb) => {
                const m = bones.get(mb)!;
                return { name: mb, d: wp.distanceTo(m.getWorldPosition(new THREE.Vector3())) };
            }).sort((a, b) => a.d - b.d).slice(0, 4);
            const parent = b.parent;
            const pName = parent && (parent as THREE.Bone).isBone ? (parent as THREE.Bone).name : 'null';
            lines.push(`  ${tn.padEnd(20)} parent=${(pName as string).padEnd(14)} pos=(${wp.x.toFixed(3)},${wp.y.toFixed(3)},${wp.z.toFixed(3)})`);
            lines.push(`    最近主链骨: ${candidates.map((c) => `${c.name}(${c.d.toFixed(4)})`).join('  ')}`);
        }

        // 直接打印脚踝/肩关节附近 twist 的最近骨（验证 CTwist02→Foot、UTwist01→Shoulder 假说）
        lines.push('');
        lines.push('=== 关键判断：远端 twist 的最近主链骨 ===');
        const keyTwists = ['L_CalfTwist01', 'L_CalfTwist02', 'R_CalfTwist01', 'R_CalfTwist02',
            'L_UpperarmTwist01', 'L_UpperarmTwist02', 'R_UpperarmTwist01', 'R_UpperarmTwist02',
            'L_ThighTwist01', 'L_ThighTwist02', 'R_ThighTwist01', 'R_ThighTwist02',
            'L_ForearmTwist01', 'L_ForearmTwist02', 'R_ForearmTwist01', 'R_ForearmTwist02'];
        for (const tn of keyTwists) {
            const b = bones.get(tn);
            if (!b) continue;
            const wp = b.getWorldPosition(new THREE.Vector3());
            const nearest = mainBones.map((mb) => {
                const m = bones.get(mb)!;
                return { name: mb, d: wp.distanceTo(m.getWorldPosition(new THREE.Vector3())) };
            }).sort((a, b) => a.d - b.d)[0];
            lines.push(`  ${tn.padEnd(20)} → 最近=${(nearest?.name ?? '?').padEnd(14)} d=${nearest?.d.toFixed(4)}`);
        }

        const text = lines.join('\n');
        console.log('\n' + text + '\n');
        const outPath = path.join(__dirname, '..', '..', 'temp', 'probe-twist-target.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify({ lines: text }, null, 1));
        console.log(`=== 输出保存至 ${outPath} ===`);
    }, 120000);
});
