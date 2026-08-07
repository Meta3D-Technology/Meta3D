/**
 * mergeBoneWeights — 合并 Twist 骨蒙皮权重到父骨
 *
 * 实现（D4，P1-2 简化算法）：
 *  - 对每个 SkinnedMesh：遍历 vertexCount × 4 槽
 *  - 若槽的 skinIndex 指向 Twist 骨 → 改为语义父骨的新索引（oldToNewIndexMap 给出），权重不动
 *  - 写回 + needsUpdate = true
 *  - ⚠️ 不在此步骤重建 Skeleton（终末步骤独立执行，P1-3）
 *
 * 为什么权重不动：GPU 对同一顶点上指向同一骨骼的多个槽自动求和，
 * M·pos·w1 + M·pos·w2 = M·pos·(w1+w2)，数学等价于「加到父槽」。
 */
import * as THREE from 'three';
import { BoneMappingEntry } from './types';
import { isTwistBone } from './restructureHierarchy';
import { collectSkinnedMeshes } from './utils';

/**
 * 将 Twist 骨槽的 skinIndex 重定向到语义父骨的新索引
 *
 * ⚠️ R4：本函数是**安全网**，通常为 no-op。在 fixSkinningIndices 全量 oldToNewIndexMap
 * 覆盖 Twist 骨槽后，主流程已将所有 Twist 槽重定向到父骨新索引；此处仅兜底
 * oldToNewIndexMap 漏配 Twist 骨的极端情况（此时本函数将其重定向到父骨）。
 *
 * @param obj 含 SkinnedMesh 的 Object3D
 * @param twistBoneNames Twist 骨名集合
 * @param oldToNewIndexMap 全量旧索引 → 新索引映射（Twist 骨 → 父骨新索引）
 * @param mapping 映射表（用于 isTwistBone 排除映射表已覆盖的骨，可选，默认空表）
 */
export function mergeBoneWeights(
    obj: THREE.Object3D,
    twistBoneNames: Set<string>,
    oldToNewIndexMap: Map<number, number>,
    mapping: BoneMappingEntry[] = [],
): void {
    for (const mesh of collectSkinnedMeshes(obj)) {
        const si = mesh.geometry.getAttribute('skinIndex') as THREE.BufferAttribute;
        if (!si) continue;
        const siArray = si.array as Uint16Array;
        const bones = mesh.skeleton ? mesh.skeleton.bones : [];

        for (let i = 0; i < siArray.length; i++) {
            const oldIdx = siArray[i];
            const bone = bones[oldIdx];
            if (!bone) continue;
            const isTwist = twistBoneNames.has(bone.name) || isTwistBone(bone, mapping);
            if (!isTwist) continue;

            const newIdx = oldToNewIndexMap.get(oldIdx);
            if (newIdx !== undefined) {
                siArray[i] = newIdx; // 权重不动
            }
        }

        si.needsUpdate = true;
    }
}
