/**
 * probe-stage2-hips — V11 阶段 2 定位探针：Hips 根骨骼 32° 歪转是哪一步引入的
 *
 * 五步打印 Hips 世界四元数（euler YXZ）：
 *   ① animSkeleton 驱动到 clip t=0（re-pose 目标，期望近直立）
 *   ② rePoseModelBindToAnimRest 之后（模型 Hips 世界旋转）
 *   ③ bindWorld 采样时（模型 Hips bind 世界旋转，normalizeRootMotion 内部逻辑）
 *   ④ 模拟 worldQ(Hips,0) = bindWorldQ(Hips)·deltaLocalQ(Hips,0)（当前实现预测）
 *   ⑤ 播放 t=0（实测）
 * 目标：证明 32° 来自「worldQ(Hips) 叠加 bind 帧」而非动画数据。
 */
(global as any).self = global;
(global as any).window = global;
(global as any).document = {
    createElement: (tag: string) => (tag === 'img' || tag === 'image' ? new (global as any).MockImage() : {}),
    createElementNS: (_ns: string, tag: string) => (tag === 'img' || tag === 'image' ? new (global as any).MockImage() : {}),
};
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 1; height = 1;
    private _src = '';
    get src() { return this._src; }
    set src(v: string) { this._src = v; if (this.onload) setTimeout(() => this.onload!(), 0); }
    addEventListener(_e: string, _cb: any) { }
    removeEventListener(_e: string, _cb: any) { }
    setAttribute(_n: string, _v: string) { }
    getAttribute(_n: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');
const ANIM_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}
function worldQuat(root: THREE.Object3D, name: string): THREE.Quaternion {
    let q = new THREE.Quaternion();
    root.traverse((n) => { if ((n as THREE.Bone).isBone && n.name === name) q = (n as THREE.Bone).getWorldQuaternion(new THREE.Quaternion()); });
    return q;
}
function eulerStr(q: THREE.Quaternion): string {
    const e = new THREE.Euler().setFromQuaternion(q, 'YXZ');
    return `(${e.x.toFixed(2)},${e.y.toFixed(2)},${e.z.toFixed(2)})`;
}

describe('probe-stage2-hips', () => {
    test('五步定位 Hips 32° 歪转引入点', () => {
        const out: string[] = [];
        out.push('# PROBE-V11-STAGE2-HIPS 定位探针');
        out.push('');
        const hips = 'mixamorigHips';

        // ── ① animSkeleton 驱动到 clip t=0 ──
        const animObj = parseFreshFbx(ANIM_FBX);
        const rawClip = animObj.animations[0];
        const poseMixer = new THREE.AnimationMixer(animObj);
        const poseAction = poseMixer.clipAction(rawClip);
        poseAction.reset(); poseAction.play();
        poseMixer.setTime(0);
        animObj.updateMatrixWorld(true);
        const qAnim0 = worldQuat(animObj, hips);
        out.push(`① animSkeleton 驱动到 clip t=0: Hips euler=${eulerStr(qAnim0)}（re-pose 目标）`);
        out.push('');

        // ── ② 模型转换后（re-pose 前）Hips bind 世界旋转 ──
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        model.updateMatrixWorld(true);
        const qBind = worldQuat(model, hips);
        out.push(`② 模型转换后 Hips bind 世界旋转: euler=${eulerStr(qBind)}（bind 帧，正常应被 re-pose 修正）`);
        out.push('');

        // ── ③ bindWorld 采样值（re-pose 后，normalizeRootMotion 内部）──
        // 走完整 normalizeRootMotion，但只测「未播放」的模型 bind 帧
        const model2 = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model2);
        const animObj2 = parseFreshFbx(ANIM_FBX);
        normalizeRootMotion(animObj2.animations[0], model2, animObj2);
        model2.updateMatrixWorld(true);
        const qBindAfterRepose = worldQuat(model2, hips);
        out.push(`③ normalizeRootMotion 后模型 Hips bind 世界旋转: euler=${eulerStr(qBindAfterRepose)}（未播放静态帧）`);
        out.push('');

        // ── ④ 当前实现预测：worldQ(Hips,0) = bindWorldQ·deltaLocalQ(Hips,0) ──
        // deltaLocalQ(Hips,0) = quat(animRestLocal(Hips)⁻¹ · S_local(Hips,0))
        const animBone = new Map<string, THREE.Bone>();
        animObj2.traverse((n) => { if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone); });
        // 还原 animObj2 到静态 rest（normalizeRootMotion 内部会还原）
        // 这里用 fresh animObj3：捕获 rest local
        const animObj3 = parseFreshFbx(ANIM_FBX);
        const animBone3 = new Map<string, THREE.Bone>();
        animObj3.traverse((n) => { if ((n as THREE.Bone).isBone) animBone3.set(n.name, n as THREE.Bone); });
        animObj3.updateMatrixWorld(true);
        const hipsBone3 = animBone3.get(hips)!;
        const animRestLocalHips = hipsBone3.matrix.clone(); // 静态 rest local（未驱动）
        // S_local(Hips,0)：mixer 驱动 animObj3 到 t=0 后的 local
        const m3 = new THREE.AnimationMixer(animObj3);
        const a3 = m3.clipAction(rawClip);
        a3.reset(); a3.play();
        m3.setTime(0);
        animObj3.updateMatrixWorld(true);
        const sLocalHips0 = hipsBone3.matrix.clone();
        // animRestLocal⁻¹ · S_local
        const tmp = animRestLocalHips.clone().invert().multiply(sLocalHips0);
        const deltaQ = new THREE.Quaternion().setFromRotationMatrix(tmp);
        // 当前实现：worldQ(Hips,0) = bindWorldQ(②的值) · deltaQ
        const qPredCurrent = qBind.clone().multiply(deltaQ);
        out.push(`deltaLocalQ(Hips,0) = quat(animRestLocal⁻¹·S_local0): euler=${eulerStr(deltaQ)}（动画 rest→t=0 的相对旋转）`);
        out.push(`④ 当前实现预测 worldQ(Hips,0)=bindWorldQ·deltaLocalQ: euler=${eulerStr(qPredCurrent)}（若 ≈ ⑤ 则实锤 32° 来自 bind 帧叠加）`);
        out.push('');

        // ── ⑤ 播放 t=0（实测）──
        const model3 = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model3);
        const animObj4 = parseFreshFbx(ANIM_FBX);
        const clip4 = normalizeRootMotion(animObj4.animations[0], model3, animObj4);
        const mixer5 = new THREE.AnimationMixer(model3);
        const action5 = mixer5.clipAction(clip4);
        action5.reset(); action5.play();
        mixer5.setTime(0);
        model3.updateMatrixWorld(true);
        const qPlay0 = worldQuat(model3, hips);
        out.push(`⑤ 播放 t=0 实测 Hips 世界旋转: euler=${eulerStr(qPlay0)}`);
        out.push('');
        out.push(`预期修复目标：Hips 世界旋转 ≈ ① ${eulerStr(qAnim0)}（动画首帧，近直立）`);
        out.push(`修复方案：root 骨 worldQ(bn,t) 直接用 S_w(bn,t) 旋转（动画世界旋转），不叠加 bind 帧；`);
        out.push(`           re-pose 时把 Hips bind 世界旋转也对齐动画首帧（未播放静态帧同步直立）。`);
        out.push('');

        console.log(out.join('\n'));
        fs.writeFileSync(path.join(__dirname, 'probe-stage2-hips.log'), out.join('\n'), 'utf8');

        // ── 固化断言（V11 阶段 2 RED→GREEN）──
        // 修复目标：Hips 世界旋转 ≈ ①（动画首帧，近直立）。
        // 修复前：④⑤ = (-0.39,0.48,0.54) vs ① = (-0.01,-0.08,-0.05)，dev≈55°（RED 真实失败）；
        // 修复后：play t=0 Hips ≈ ①（<5°），静态帧（normalize 后未播放）Hips ≈ ①（<5°）。
        const devCurrent = qPredCurrent.angleTo(qAnim0) * 180 / Math.PI;
        const devPlay0 = qPlay0.angleTo(qAnim0) * 180 / Math.PI;
        const devStatic = qBindAfterRepose.angleTo(qAnim0) * 180 / Math.PI;
        // ①播放 t=0：Hips worldQ ≈ 动画首帧（四元数角度差 < 5°）
        expect(devPlay0).toBeLessThan(5);
        // ②静态帧（normalizeRootMotion 后未播放）：Hips worldQ ≈ 动画首帧（< 5°）
        expect(devStatic).toBeLessThan(5);
        // ③每轴 euler 容差 ~0.09 rad（5°），防四元数夹角通过但单轴歪转的盲区
        const ePlay = new THREE.Euler().setFromQuaternion(qPlay0, 'YXZ');
        const eTgt = new THREE.Euler().setFromQuaternion(qAnim0, 'YXZ');
        expect(Math.abs(ePlay.x - eTgt.x)).toBeLessThan(0.09);
        expect(Math.abs(ePlay.y - eTgt.y)).toBeLessThan(0.09);
        expect(Math.abs(ePlay.z - eTgt.z)).toBeLessThan(0.09);
        console.log(`[STAGE2] ④预测 vs ①=${devCurrent.toFixed(1)}° ⑤播放t0 vs ①=${devPlay0.toFixed(1)}° ③静态 vs ①=${devStatic.toFixed(1)}°`);
    });
});
