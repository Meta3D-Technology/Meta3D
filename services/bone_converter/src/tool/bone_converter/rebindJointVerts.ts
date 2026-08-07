/**
 * rebindJointVerts — V12.3：关节区权重重绑（上臂/小腿权重异常修复）
 *
 * 背景（`temp/v12.2-arm-leg-diagnosis.md` 实锤，根因在权重绑定层）：
 *   restructureHierarchy.semanticParent 把 Tripo twist 骨权重错误合并到「第一个非 twist 祖先」：
 *     - CalfTwist01/02 → L_Calf → mixamorigLeftLeg：脚踝区顶点被绑到 Leg（官方应绑 Foot）
 *       → 脚踝不弯折、脚与小腿刚性联动（fixsim 探针验证：Leg→Foot 重绑 424 顶点后分布与官方一致）。
 *     - UpperarmTwist01/02 → L_Upperarm → mixamorigLeftArm：上臂/肩帽顶点全绑 Arm
 *       （615 vs 官方 149，官方在 Shoulder/Spine1/Arm 间过渡）→ 上臂刚性杆
 *       （fixsim2 探针：全量改绑 Shoulder 过冲 642>305，需参数化按段位置分配）。
 *     - 肩区 Head 泄漏：肩颈过渡区顶点带 Head 权重残留（RightShoulder 区 Head:149）。
 *
 * 本步骤作用在「转换后模型」上（骨骼已 alignRestPose 到官方、网格已 alignMeshToLod2
 * 到 lod2 坐标系），重绑三类顶点：
 *   1. 脚踝区：物理区域∈Foot && 主导骨=Leg → 主导槽改指同侧 Foot（权重不动）
 *   2. 上臂区：物理区域∈Arm && 主导骨=Arm → 按顶点在 Shoulder→ForeArm 段上的参数
 *      t∈[0,1]（0=Shoulder 端）阈值：t<armShoulderT 重绑到同侧 Shoulder，否则保持 Arm
 *   3. 肩区 Head 泄漏：物理区域∈Shoulder && 主导骨=Head → 主导槽改指同侧 Shoulder
 *
 * 只动上述三类顶点，其他顶点不动；改 skinIndex 指向目标骨，权重不变
 * （与 mergeBoneWeights 数学等价：GPU 对同一顶点指向同一骨骼的多槽自动求和）。
 *
 * ⚠️ 依赖转换后骨架里存在同名骨（LeftFoot/RightFoot/LeftShoulder/RightShoulder，
 *    22 骨都有）；找不到目标骨索引时跳过该顶点（不报错）。
 */
import * as THREE from 'three';
import { collectSkinnedMeshes } from './utils';

/** 重绑结果统计 */
export interface RebindJointResult {
    /** 脚踝区 Leg→Foot 重绑顶点数 */
    footReboundCount: number;
    /** 上臂区 Arm→Shoulder 重绑顶点数 */
    armShoulderCount: number;
    /** 肩区 Head→Shoulder 重绑顶点数 */
    headLeakCount: number;
}

/** 重绑配置 */
export interface RebindJointOptions {
    /** 上臂分段阈值：顶点在 Shoulder→ForeArm 段参数 t<该值 时重绑到 Shoulder（默认 0.35） */
    armShoulderT?: number;
}

/**
 * 上臂分段阈值默认值。t=0 为 Shoulder 端，t=1 为 ForeArm 端。
 * fixsim2 实测：t<0.5（肩半区）全量改绑会过冲（642>官方305）；t 取 0.35 只重绑
 * 靠近肩关节的一小部分顶点，使重绑后 Shoulder 成为主导但不独占（见 V12.3 验证摘要）。
 */
export const DEFAULT_ARM_SHOULDER_T = 0.35;

/** 区域分桶骨名清单（Mixamo 基础身骨，与 diag-arm-leg-region 一致，不含手指） */
const REGION_BONES = [
    'mixamorigHead', 'mixamorigNeck', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2', 'mixamorigHips',
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
    'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
    'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
];

/** 顶点在 A→B 段上的归一化投影 t∈[0,1]（0=A 端，1=B 端；A/B 重合时返回 0.5） */
function segmentT(p: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3): number {
    const ab = new THREE.Vector3().subVectors(b, a);
    const len2 = ab.lengthSq();
    if (len2 === 0) return 0.5;
    const t = new THREE.Vector3().subVectors(p, a).dot(ab) / len2;
    return Math.min(1, Math.max(0, t));
}

/**
 * 重绑关节区顶点权重（V12.3，方案 1）
 *
 * 作用在转换后模型上（骨骼已对齐官方 rest pose、网格已变换到 lod2 坐标系），
 * 用官方 lod2 骨骼 bind 世界位置做「物理区域 → 最近骨」分桶（复用 diag-arm-leg-region 方法）。
 *
 * @param obj 转换后含 SkinnedMesh 的 Object3D（mixamorig 命名）
 * @param officialRoot 官方 lod2 骨架根对象（用于取骨骼世界位置做区域分桶）
 * @returns 三类顶点重绑数量统计
 */
export function rebindJointVerts(
    obj: THREE.Object3D,
    officialRoot: THREE.Object3D,
    options: RebindJointOptions = {},
): RebindJointResult {
    const armT = options.armShoulderT ?? DEFAULT_ARM_SHOULDER_T;

    // 官方骨骼世界位置（lod2 rest pose；同一坐标系下转换后网格已对齐到 lod2）
    officialRoot.updateMatrixWorld(true);
    const boneWorld = new Map<string, THREE.Vector3>();
    officialRoot.traverse((n) => {
        if ((n as THREE.Bone).isBone) {
            boneWorld.set(n.name, (n as THREE.Bone).getWorldPosition(new THREE.Vector3()));
        }
    });

    // 物理区域 → 最近区域骨（用官方骨骼 bind 位置分桶，与 diag-arm-leg-region 一致）
    const regionOf = (p: THREE.Vector3): string => {
        let best = 'mixamorigHips';
        let bestD = Infinity;
        for (const rn of REGION_BONES) {
            const wp = boneWorld.get(rn);
            if (!wp) continue;
            const d = p.distanceTo(wp);
            if (d < bestD) {
                bestD = d;
                best = rn;
            }
        }
        return best;
    };

    let footReboundCount = 0;
    let armShoulderCount = 0;
    let headLeakCount = 0;

    for (const mesh of collectSkinnedMeshes(obj)) {
        const posAttr = mesh.geometry.getAttribute('position') as THREE.BufferAttribute | null;
        const siAttr = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute | null;
        const swAttr = mesh.geometry.getAttribute('skinWeight') as THREE.BufferAttribute | null;
        if (!posAttr || !siAttr) continue;
        if (!(siAttr instanceof THREE.BufferAttribute)) continue;
        const si = (siAttr as THREE.BufferAttribute).array as Uint16Array;
        const sw = swAttr instanceof THREE.BufferAttribute ? (swAttr.array as Float32Array) : null;
        const bones = mesh.skeleton ? mesh.skeleton.bones : [];
        if (bones.length === 0) continue;

        const boneIndexByName = new Map<string, number>();
        bones.forEach((b, i) => boneIndexByName.set(b.name, i));
        const boneNameAt = (i: number): string | undefined => bones[i]?.name;

        const vTmp = new THREE.Vector3();
        for (let v = 0; v < posAttr.count; v++) {
            vTmp.set(posAttr.getX(v), posAttr.getY(v), posAttr.getZ(v));
            const region = regionOf(vTmp);

            // 主导槽（最大权重槽）
            let domSlot = -1;
            let domW = -1;
            for (let k = 0; k < 4; k++) {
                const w = sw ? sw[v * 4 + k] : 0;
                if (w > domW) {
                    domW = w;
                    domSlot = k;
                }
            }
            if (domSlot < 0) continue;
            const domName = boneNameAt(si[v * 4 + domSlot]);
            if (!domName) continue;

            // ── 1. 脚踝区：区域∈Foot && 主导=同侧Leg → 主导槽改指同侧 Foot ──
            if (region === 'mixamorigLeftFoot' || region === 'mixamorigRightFoot') {
                const side = region === 'mixamorigLeftFoot' ? 'Left' : 'Right';
                const targetLeg = `mixamorig${side}Leg`;
                if (domName === targetLeg) {
                    const footIdx = boneIndexByName.get(region);
                    if (footIdx !== undefined) {
                        si[v * 4 + domSlot] = footIdx;
                        footReboundCount++;
                        continue;
                    }
                }
            }

            // ── 2. 上臂区：区域∈Arm && 主导=Arm → 参数化重绑 Shoulder ──
            if (region === 'mixamorigLeftArm' || region === 'mixamorigRightArm') {
                const side = region === 'mixamorigLeftArm' ? 'Left' : 'Right';
                const targetArm = `mixamorig${side}Arm`;
                if (domName === targetArm) {
                    const shoulderIdx = boneIndexByName.get(`mixamorig${side}Shoulder`);
                    const shPos = boneWorld.get(`mixamorig${side}Shoulder`);
                    const faPos = boneWorld.get(`mixamorig${side}ForeArm`);
                    if (shoulderIdx !== undefined && shPos && faPos) {
                        const t = segmentT(vTmp, shPos, faPos);
                        if (t < armT) {
                            si[v * 4 + domSlot] = shoulderIdx;
                            armShoulderCount++;
                            continue;
                        }
                    }
                }
            }

            // ── 3. 肩区 Head 泄漏：区域∈Shoulder && 主导=Head → 改指同侧 Shoulder ──
            if (region === 'mixamorigLeftShoulder' || region === 'mixamorigRightShoulder') {
                if (domName === 'mixamorigHead') {
                    const shIdx = boneIndexByName.get(region);
                    if (shIdx !== undefined) {
                        si[v * 4 + domSlot] = shIdx;
                        headLeakCount++;
                    }
                }
            }
        }

        (siAttr as THREE.BufferAttribute).needsUpdate = true;
        if (swAttr instanceof THREE.BufferAttribute) swAttr.needsUpdate = true;
    }

    return { footReboundCount, armShoulderCount, headLeakCount };
}
