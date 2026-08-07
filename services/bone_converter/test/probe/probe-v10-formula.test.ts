/**
 * probe-v10-formula — V10 候选公式评估探针
 *
 * 目标：在改 src 之前量化候选手臂 retarget 公式，验证哪个能同时满足：
 *   A) 蒙皮网格方向跟随动画（S16 口径 |meshFromDown − animFromDown| < 20°）
 *   B) 骨骼链位置正确（poseQ 走 raw animQ，不受影响）
 *   C) S13/S14/S15 不回归（各自对比目标是否仍成立）
 *
 * 背景：V9 帧校正 worldQ = animQ·animBindQ⁻¹·bindQ 只保「相对自身 bind 的旋转」，
 * 不保绝对朝向 —— 模型 bind（A-pose）与 anim rest（T-pose）世界朝向差 ~154°，
 * 网格停在 ~70~110° 而动画 ~34°（外展过度）。
 *
 * 候选：
 *   V9:      outQ = animQ·animBindQ⁻¹·bindQ
 *   C-fix:   outQ = animQ·animBindQ⁻¹·C·bindQ，C = 最短旋转(bindSegDir → animRestSegDir)
 *   joint:   outQ = bindQ·deltaLocalQ（deltaLocalQ = animRestLocal⁻¹·S_local，躯干/腿路径）
 *   swing:   outQ = swing(animDir) 方向修正 + 保留 anim twist
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v10-formula" --forceExit
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);
const ANIM_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx',
);

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

const ARM_BONES = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;

const DOWN = new THREE.Vector3(0, -1, 0);

function angleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const dot = Math.max(-1, Math.min(1, a.clone().normalize().dot(b.clone().normalize())));
    return Math.acos(dot) * 180 / Math.PI;
}
function quatAngleDeg(qa: THREE.Quaternion, qb: THREE.Quaternion): number {
    const w = Math.min(1, Math.abs(qa.clone().normalize().dot(qb.clone().normalize())));
    return 2 * Math.acos(w) * 180 / Math.PI;
}
/** 世界四元数绕世界单位轴 axis 的 twist（滚动）角（Shoemake swing-twist 分解） */
function worldTwistAngle(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(axis);
    const twistVec = axis.clone().multiplyScalar(dot);
    // Shoemake：twist 角 = 2·atan2(|p|, q.w)，用原始 q.w。
    // ⚠️ 不能 renormalize tw（旧实现 tw=(q.w,p).normalize() 后取 tw.w）——主导 swing 的
    // 四元数（q.w 远小于 |q_imag|）会被压缩角度（probe-v10 实锤：LHand 真值 135° 误测 53°）。
    const ang = 2 * Math.atan2(twistVec.length(), Math.abs(q.w)) * 180 / Math.PI;
    return ang * (q.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
}
function circularDelta(a: number, b: number): number {
    return Math.abs((a - b + 540) % 360 - 180);
}

describe('probe-v10-formula', () => {
    test('evaluate candidate retarget formulas at t=0', () => {
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        model.updateMatrixWorld(true);
        const bindQ = new Map<string, THREE.Quaternion>();
        const bindPos = new Map<string, THREE.Vector3>();
        const boneByName = new Map<string, THREE.Bone>();
        model.traverse((n) => {
            if ((n as THREE.Bone).isBone) {
                boneByName.set(n.name, n as THREE.Bone);
                bindQ.set(n.name, n.getWorldQuaternion(new THREE.Quaternion()));
                bindPos.set(n.name, n.getWorldPosition(new THREE.Vector3()));
            }
        });

        const animObj = parseFreshFbx(ANIM_FBX);
        const clip = animObj.animations[0];
        // anim rest（播放前）世界朝向/位置
        const animRestQ = new Map<string, THREE.Quaternion>();
        const animRestPos = new Map<string, THREE.Vector3>();
        const animRestLocal = new Map<string, THREE.Matrix4>();
        animObj.updateMatrixWorld(true);
        const animBone = new Map<string, THREE.Bone>();
        animObj.traverse((n) => {
            if ((n as THREE.Bone).isBone) {
                animBone.set(n.name, n as THREE.Bone);
                animRestQ.set(n.name, n.getWorldQuaternion(new THREE.Quaternion()));
                animRestPos.set(n.name, n.getWorldPosition(new THREE.Vector3()));
                animRestLocal.set(n.name, n.matrix.clone());
            }
        });
        // 播放到 t=0
        const mixer = new THREE.AnimationMixer(animObj);
        const action = mixer.clipAction(clip);
        action.reset();
        action.play();
        mixer.setTime(0);
        animObj.updateMatrixWorld(true);
        const animQ0 = new Map<string, THREE.Quaternion>();
        const animPos0 = new Map<string, THREE.Vector3>();
        const animLocal0 = new Map<string, THREE.Matrix4>();
        for (const [bn, ab] of animBone) {
            animQ0.set(bn, ab.getWorldQuaternion(new THREE.Quaternion()));
            animPos0.set(bn, ab.getWorldPosition(new THREE.Vector3()));
            animLocal0.set(bn, ab.matrix.clone());
        }

        // deltaLocalQ（joint-space 用）
        const deltaLocalQ = new Map<string, THREE.Quaternion>();
        for (const [bn, ml] of animLocal0) {
            const m = animRestLocal.get(bn)!.clone().invert().multiply(ml);
            deltaLocalQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(m));
        }

        // 段方向（世界）
        const segDir = (map: Map<string, THREE.Vector3>, side: 'Left' | 'Right', seg: 'up' | 'fo'): THREE.Vector3 => {
            if (seg === 'up') {
                return map.get(`mixamorig${side}ForeArm`)!.clone().sub(map.get(`mixamorig${side}Shoulder`)!);
            }
            return map.get(`mixamorig${side}Hand`)!.clone().sub(map.get(`mixamorig${side}ForeArm`)!);
        };
        const bindSeg = (side: 'Left' | 'Right', seg: 'up' | 'fo') => segDir(bindPos, side, seg);
        const restSeg = (side: 'Left' | 'Right', seg: 'up' | 'fo') => segDir(animRestPos, side, seg);
        const animSeg = (side: 'Left' | 'Right', seg: 'up' | 'fo') => segDir(animPos0, side, seg);

        // C = 最短旋转 bindSegDir → animRestSegDir（按驱动骨：上臂=Arm，前臂=ForeArm）
        const C = new Map<string, THREE.Quaternion>();
        for (const side of ['Left', 'Right'] as const) {
            const cUp = new THREE.Quaternion().setFromUnitVectors(
                bindSeg(side, 'up').clone().normalize(), restSeg(side, 'up').clone().normalize());
            C.set(`mixamorig${side}Arm`, cUp);
            const cFo = new THREE.Quaternion().setFromUnitVectors(
                bindSeg(side, 'fo').clone().normalize(), restSeg(side, 'fo').clone().normalize());
            C.set(`mixamorig${side}ForeArm`, cFo);
            // Shoulder 沿用 Arm 的补偿（同一段），Hand 沿用 ForeArm 的
            C.set(`mixamorig${side}Shoulder`, cUp);
            C.set(`mixamorig${side}Hand`, cFo);
        }

        // 候选公式 outQ
        const formulas: Record<string, (b: string) => THREE.Quaternion> = {
            V8: (b) => animQ0.get(b)!.clone(),
            V9: (b) => animQ0.get(b)!.clone().multiply(animRestQ.get(b)!.clone().invert()).multiply(bindQ.get(b)!),
            Cf: (b) => animQ0.get(b)!.clone().multiply(animRestQ.get(b)!.clone().invert()).multiply(C.get(b)!.clone()).multiply(bindQ.get(b)!),
            joint: (b) => bindQ.get(b)!.clone().multiply(deltaLocalQ.get(b) || new THREE.Quaternion()),
            recon: (b) => {
                // W(b,t) = animQ(b,t) · R_fixed(b)
                // R_fixed(b) = 最短旋转(bindQ(b)⁻¹·bindSegDir → animBindQ(b)⁻¹·animRestSegDir)
                //   —— 模型 bind 局部段方向 vs 动画 rest 局部段方向的**固定**调和（方向差异，
                //      ~21°，无 near-180° 不稳定）。乘在 animQ 右侧：方向修正，滚动与 animQ
                //      一致（V8 滚动完美 0°）。
                const side = (b.includes('Left') ? 'Left' : 'Right') as 'Left' | 'Right';
                const seg: 'up' | 'fo' = (b.includes('ForeArm') || b.includes('Hand')) ? 'fo' : 'up';
                const bindLocal = bindSeg(side, seg).clone().applyQuaternion(bindQ.get(b)!.clone().invert()).normalize();
                const restLocal = restSeg(side, seg).clone().applyQuaternion(animRestQ.get(b)!.clone().invert()).normalize();
                const rf = new THREE.Quaternion().setFromUnitVectors(bindLocal, restLocal);
                return animQ0.get(b)!.clone().multiply(rf);
            },
            swing3: (b) => {
                // worldQ_out(b,t) = Twist · Swing
                //   v(b)      = bindQ(b)⁻¹·bindSegDir （bind 局部段方向）
                //   Swing     = 最短旋转(v → animSegDir(t))：方向修正
                //   roll      = twist(animQ(b,t), animSegDir(t))：动画真实滚动
                //   Twist     = 绕 animSegDir(t) 转 roll
                // 方向 dev=0（Swing·v=animDir），滚动=动画滚动（代数推导 2·atan2(cos(β/2)sin(α/2),cos(α/2)cos(β/2))=α）
                const side = (b.includes('Left') ? 'Left' : 'Right') as 'Left' | 'Right';
                const seg: 'up' | 'fo' = (b.includes('ForeArm') || b.includes('Hand')) ? 'fo' : 'up';
                const v = bindSeg(side, seg).clone().applyQuaternion(bindQ.get(b)!.clone().invert()).normalize();
                const animDir = animSeg(side, seg).clone().normalize();
                const swing = new THREE.Quaternion().setFromUnitVectors(v, animDir);
                const roll = worldTwistAngle(animQ0.get(b)!, animDir);
                const twist = new THREE.Quaternion().setFromAxisAngle(animDir, roll * Math.PI / 180);
                return twist.clone().multiply(swing);
            },
        };

        const out: Record<string, any> = { geometry: {}, metrics: {} };
        // 几何量
        for (const side of ['Left', 'Right'] as const) {
            out.geometry[side] = {
                bindQuat_vs_animRestQuat: {
                    Shoulder: quatAngleDeg(bindQ.get(`mixamorig${side}Shoulder`)!, animRestQ.get(`mixamorig${side}Shoulder`)!),
                    Arm: quatAngleDeg(bindQ.get(`mixamorig${side}Arm`)!, animRestQ.get(`mixamorig${side}Arm`)!),
                    ForeArm: quatAngleDeg(bindQ.get(`mixamorig${side}ForeArm`)!, animRestQ.get(`mixamorig${side}ForeArm`)!),
                },
                bindSeg_vs_restSeg_angle: {
                    up: angleDeg(bindSeg(side, 'up'), restSeg(side, 'up')),
                    fo: angleDeg(bindSeg(side, 'fo'), restSeg(side, 'fo')),
                },
                C_angle: {
                    Arm: quatAngleDeg(C.get(`mixamorig${side}Arm`)!, new THREE.Quaternion()),
                    ForeArm: quatAngleDeg(C.get(`mixamorig${side}ForeArm`)!, new THREE.Quaternion()),
                },
            };
        }

        for (const [name, fn] of Object.entries(formulas)) {
            const m: Record<string, any> = {};
            for (const side of ['Left', 'Right'] as const) {
                const row: Record<string, any> = {};
                for (const seg of ['up', 'fo'] as const) {
                    const driver = seg === 'up' ? `mixamorig${side}Arm` : `mixamorig${side}ForeArm`;
                    const outQ = fn(driver);
                    const rel = outQ.clone().multiply(bindQ.get(driver)!.clone().invert());
                    const meshDir = bindSeg(side, seg).clone().applyQuaternion(rel);
                    const meshFromDown = angleDeg(meshDir, DOWN);
                    const animFromDown = angleDeg(animSeg(side, seg), DOWN);
                    // S14 gap（相对帧校正目标 animQ·animBindQ⁻¹）
                    const s14gap = quatAngleDeg(outQ.clone().multiply(bindQ.get(driver)!.clone().invert()),
                        animQ0.get(driver)!.clone().multiply(animRestQ.get(driver)!.clone().invert()));
                    row[seg] = {
                        meshFromDown: r1(meshFromDown), animFromDown: r1(animFromDown),
                        dev: r1(Math.abs(meshFromDown - animFromDown)),
                        s14gapDeg: r1(s14gap),
                    };
                }
                m[side] = row;
            }
            // S13 滚动 vs 帧校正目标（按 8 骨，绕输出段轴）
            const rolls: Record<string, number> = {};
            // 滚动 vs 动画真实滚动（绕动画段轴）：更有意义的 roll 正确性检查
            const rollsVsAnim: Record<string, number> = {};
            for (const b of ARM_BONES) {
                const outQ = fn(b);
                const side = (b.includes('Left') ? 'Left' : 'Right') as 'Left' | 'Right';
                const seg: 'up' | 'fo' = (b.includes('ForeArm') || b.includes('Hand')) ? 'fo' : 'up';
                const axis = animSeg(side, seg).clone().normalize();
                const thOut = worldTwistAngle(outQ, axis);
                const targetQ = animQ0.get(b)!.clone().multiply(animRestQ.get(b)!.clone().invert()).multiply(bindQ.get(b)!);
                const thTarget = worldTwistAngle(targetQ, axis);
                rolls[b] = r1(circularDelta(thOut, thTarget));
                // 与动画世界朝向 animQ 的滚动对比（真正的「掌心朝哪」）
                const thAnim = worldTwistAngle(animQ0.get(b)!, axis);
                rollsVsAnim[b] = r1(circularDelta(thOut, thAnim));
            }
            m.s13rollGapDeg = rolls;
            m.rollVsAnimDeg = rollsVsAnim;
            out.metrics[name] = m;
        }

        // 位置方向对比（poseQ 不随公式变化：验证骨骼链位置不受影响）
        out.poseQ = { LeftUpArm_posFromDown: r1(angleDeg(animSeg('Left', 'up'), DOWN)), RightUpArm: r1(angleDeg(animSeg('Right', 'up'), DOWN)) };

        // swing3 滚动静默调试（L Hand / R Arm）：验证 twist(W, axis) == roll 的推导
        const dbg: Record<string, any> = {};
        for (const [b, label] of [['mixamorigLeftHand', 'LHand'], ['mixamorigRightArm', 'RArm']] as const) {
            const side = (b.includes('Left') ? 'Left' : 'Right') as 'Left' | 'Right';
            const seg: 'up' | 'fo' = (b.includes('ForeArm') || b.includes('Hand')) ? 'fo' : 'up';
            const bindDirW = seg === 'up' ? segDir(bindPos, side, 'up') : segDir(bindPos, side, 'fo');
            const v = bindDirW.clone().applyQuaternion(bindQ.get(b)!.clone().invert()).normalize();
            const animDir = (seg === 'up' ? segDir(animPos0, side, 'up') : segDir(animPos0, side, 'fo')).normalize();
            const swing = new THREE.Quaternion().setFromUnitVectors(v, animDir);
            const swingAxis = new THREE.Vector3(swing.x, swing.y, swing.z).normalize();
            const roll = worldTwistAngle(animQ0.get(b)!, animDir);
            const twist = new THREE.Quaternion().setFromAxisAngle(animDir, roll * Math.PI / 180);
            const W = twist.clone().multiply(swing);
            const qw = W.w;
            const dot = (W.x * animDir.x + W.y * animDir.y + W.z * animDir.z);
            const twistLen = Math.sqrt(dot ** 2);
            dbg[label] = {
                v: [r1(v.x), r1(v.y), r1(v.z)],
                animDir: [r1(animDir.x), r1(animDir.y), r1(animDir.z)],
                swingAngleDeg: r1(angleDeg(v, animDir)),
                swingAxis: [r1(swingAxis.x), r1(swingAxis.y), r1(swingAxis.z)],
                swingAxis_dot_animDir: r1(swingAxis.dot(animDir)),
                rollDeg: r1(roll),
                twistW: r1(qw), twistLen: r1(twistLen), qImagDotAxis: r1(dot),
                thOut: r1(worldTwistAngle(W, animDir)),
                thAnim: r1(worldTwistAngle(animQ0.get(b)!, animDir)),
            };
        }
        out.swing3Debug = dbg;

        console.log('\n===== probe-v10-formula (t=0) =====');
        console.log(JSON.stringify(out, null, 2));
        expect(true).toBe(true);
    });
});

function r1(x: number): number {
    return Math.round(x * 10) / 10;
}
