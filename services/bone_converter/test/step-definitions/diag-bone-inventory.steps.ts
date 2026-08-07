/**
 * diag-bone-inventory.steps.ts — 骨骼清单对比：Tripo 41 / lod2 65 / 转换后 22
 * 回答兄弟质疑：① 22 骨是不是官方子集且"完全一样"？② 为什么不是 40+ 骨？
 */
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
const TRIPO = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx');
const LOD2 = path.join(REPO_ROOT, 'packages/bone_converter/demo/snapshot_EliteGiantess9/model_EliteGiantess9_lod2.fbx');

function loadFbx(filePath: string): THREE.Object3D {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}
function bones(root: THREE.Object3D): string[] {
    const out: string[] = [];
    root.traverse((n) => { if ((n as THREE.Bone).isBone) out.push(n.name); });
    return out;
}

describe('DIAG: bone inventory', () => {
    it('tripo vs lod2 vs converted', () => {
        const tripo = loadFbx(TRIPO);
        const lod2 = loadFbx(LOD2);
        const tripoBones = bones(tripo);
        const lod2Bones = bones(lod2);

        console.log(`=== Tripo 41 骨完整名单 ===`);
        console.log(JSON.stringify(tripoBones, null, 1));
        console.log(`=== lod2 65 骨完整名单 ===`);
        console.log(JSON.stringify(lod2Bones, null, 1));

        // 分类 lod2：手指骨（Thumb/Index/Middle/Ring/Pinky + 数字结尾）
        const fingerRe = /(Thumb|Index|Middle|Ring|Pinky)\d*$/;
        const lod2Finger = lod2Bones.filter((n) => fingerRe.test(n));
        const lod2NonFinger = lod2Bones.filter((n) => !fingerRe.test(n));
        console.log(`lod2 手指骨 ${lod2Finger.length} 个: ${JSON.stringify(lod2Finger)}`);
        console.log(`lod2 非手指骨 ${lod2NonFinger.length} 个: ${JSON.stringify(lod2NonFinger)}`);

        // 转换
        const report = convertTripoToMixamo(tripo, { officialRestPose: lod2 });
        const convBones = report.boneNamesAfter;
        console.log(`=== 转换后 ${convBones.length} 骨 ===`);
        console.log(JSON.stringify(convBones, null, 1));

        // 对比：转换后 vs lod2 非手指骨（官方应该有但转换没有的）
        const convSet = new Set(convBones);
        const missing = lod2NonFinger.filter((n) => !convSet.has(n));
        console.log(`=== 官方非手指骨 ${lod2NonFinger.length} 个，转换后缺 ${missing.length} 个 ===`);
        console.log(JSON.stringify(missing, null, 1));

        // 转换后有但官方没有的
        const lod2Set = new Set(lod2Bones);
        const extra = convBones.filter((n) => !lod2Set.has(n));
        console.log(`=== 转换后不在官方中的 ${extra.length} 个 ===`);
        console.log(JSON.stringify(extra, null, 1));

        console.log(`report: renamed=${report.renameCount} mergedTwist=${report.mergedTwistCount} restAligned=${report.restPoseAlignedCount} boneCount=${report.boneCountBefore}->${report.boneCountAfter}`);
    }, 120000);
});
