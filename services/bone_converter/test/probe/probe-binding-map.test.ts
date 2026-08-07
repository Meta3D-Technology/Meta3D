/**
 * probe-binding-map — 验证 convertTripoToMixamo 的 skinIndex 重映射是否与 skeleton 重建一致
 *
 * 背景（第九轮探针结论）：swing3 骨级输出匹配 raw anim（方向/twist 全对），但蒙皮网格
 * 不跟随自身骨骼（LeftHand=0、RightShoulder=0 零绑定），怀疑 fixSkinningIndices 的
 * oldToNewIndexMap 与步骤 7 的 Skeleton(finalBones) 重建顺序错位。
 *
 * 本探针：对同一顶点，读取转换前 skinIndex→rawSkeleton.bones[idx].name 与转换后
 * skinIndex→convertedSkeleton.bones[idx].name，打印不一致样本。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-binding-map" --forceExit
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

describe('probe-binding-map', () => {
    test('转换前后同一顶点 skinIndex→bone.name 对照', () => {
        const raw = parseFreshFbx(MODEL_FBX);
        const conv = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(conv);

        const rawMesh = (() => { let m: THREE.SkinnedMesh | null = null; raw.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !m) m = n as THREE.SkinnedMesh; }); return m!; })();
        const convMesh = (() => { let m: THREE.SkinnedMesh | null = null; conv.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !m) m = n as THREE.SkinnedMesh; }); return m!; })();

        const out: string[] = [];
        out.push(`raw skeleton.bones=${rawMesh.skeleton.bones.length}  conv skeleton.bones=${convMesh.skeleton.bones.length}`);
        out.push(`raw bones: ${rawMesh.skeleton.bones.map((b) => b.name).join(',')}`);
        out.push(`conv bones: ${convMesh.skeleton.bones.map((b) => b.name).join(',')}`);
        out.push('');

        const siRaw = rawMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        const swRaw = rawMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
        const siConv = convMesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        const swConv = convMesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute;
        const vc = rawMesh.geometry.attributes.position.count;
        out.push(`顶点数=${vc}  rawSkinIndex array len=${(siRaw.array as any).length}  convSkinIndex array len=${(siConv.array as any).length}`);

        const rawArr = siRaw.array as Uint16Array;
        const convArr = siConv.array as Uint16Array;
        const rawW = swRaw.array as Float32Array;
        const convW = swConv.array as Float32Array;

        // dominant bone per vertex (最高权重槽)
        const dominantName = (si: ArrayLike<number>, sw: ArrayLike<number>, bones: THREE.Bone[], i: number): { name: string; w: number } => {
            let best = -1, bestW = -1;
            for (let k = 0; k < 4; k++) {
                const w = sw[i * 4 + k];
                if (w > bestW) { bestW = w; best = si[i * 4 + k]; }
            }
            return { name: (best >= 0 && best < bones.length) ? bones[best].name : `#${best}`, w: bestW };
        };

        // 抽样：全顶点中找「转换前 dominant 是手臂相关骨」的顶点
        const armKey = /(Upperarm|Forearm|Hand|Clavicle|Thigh|Calf)/;
        let mismatch = 0;
        let sample = 0;
        const examples: string[] = [];
        for (let i = 0; i < vc; i++) {
            const r = dominantName(rawArr, rawW, rawMesh.skeleton.bones, i);
            const c = dominantName(convArr, convW, convMesh.skeleton.bones, i);
            if (armKey.test(r.name) && sample < 1) {
                // 打印一段连续顶点，观察规律
                for (let j = i; j < Math.min(vc, i + 30); j++) {
                    const rj = dominantName(rawArr, rawW, rawMesh.skeleton.bones, j);
                    const cj = dominantName(convArr, convW, convMesh.skeleton.bones, j);
                    examples.push(`v${j} raw=${rj.name}(${rj.w.toFixed(2)})  conv=${cj.name}(${cj.w.toFixed(2)})`);
                }
                sample++;
            }
            // 全模型统计：转换前 arm 顶点 → 转换后是否还映射到对应语义骨（L_Upperarm→mixamorigLeftArm 等）
            const map = (rawName: string): string => {
                const t = {
                    'R_Clavicle': 'mixamorigRightShoulder',
                    'R_Upperarm': 'mixamorigRightArm',
                    'R_Forearm': 'mixamorigRightForeArm',
                    'R_Hand': 'mixamorigRightHand',
                    'L_Clavicle': 'mixamorigLeftShoulder',
                    'L_Upperarm': 'mixamorigLeftArm',
                    'L_Forearm': 'mixamorigLeftForeArm',
                    'L_Hand': 'mixamorigLeftHand',
                } as Record<string, string>;
                return t[rawName] ?? '';
            };
            const expected = map(r.name);
            if (expected && c.name !== expected) mismatch++;
        }
        out.push(`arm 顶点转换后绑定错位数（dominant）= ${mismatch}`);
        out.push('');
        out.push('样本 30 连续顶点（转换前 arm 区域起点）:');
        out.push(examples.join('\n'));

        // 直接检查 skinIndex 数组内容差异
        out.push('');
        out.push(`raw skinIndex 前40: ${Array.from({ length: 40 }, (_, i) => rawArr[i]).join(',')}`);
        out.push(`conv skinIndex 前40: ${Array.from({ length: 40 }, (_, i) => convArr[i]).join(',')}`);
        out.push(`raw skinWeight 前40: ${Array.from({ length: 40 }, (_, i) => rawW[i].toFixed(2)).join(',')}`);
        out.push(`conv skinWeight 前40: ${Array.from({ length: 40 }, (_, i) => convW[i].toFixed(2)).join(',')}`);

        const outPath = path.join(__dirname, 'probe-binding-map-RESULT.md');
        fs.writeFileSync(outPath, out.join('\n'), 'utf8');
        console.log(out.join('\n'));
    });
});
