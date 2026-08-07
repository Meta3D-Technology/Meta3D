/**
 * fixSkinningIndices — 修复所有 SkinnedMesh 的 skinIndex
 *
 * 实现（D4）：
 *  - 对每个 SkinnedMesh：读 skinIndex buffer，遍历 vertexCount × 4
 *  - 用 oldToNewIndexMap.get(oldIdx) 替换（全量映射，每个旧索引都有解）
 *  - 旧索引不在映射表中（mergeTarget 缺失）→ index=0 + weight=0（P0-4）
 *  - 写回 buffer + needsUpdate = true
 *  - 运行时断言：max(skinIndex) < bones.length 且 min >= 0（V8）
 *
 * ⚠️ 严禁写 -1（P0-4）：skinIndex 是 Uint16BufferAttribute，写入 -1 会被截断为 65535。
 */
import * as THREE from 'three';
import { collectSkinnedMeshes } from './utils';

/**
 * 根据全量 oldToNewIndexMap 修复所有 SkinnedMesh 的 skinIndex
 * @param obj 含 SkinnedMesh 的 Object3D
 * @param oldToNewIndexMap 全量旧索引 → 新索引映射（restructureHierarchy 产出）
 * @param targetBonesLen 重建后 Skeleton 骨数（V12.2：含主链骨，22）。缺省时回退
 *        mesh.skeleton.bones.length（旧 30 骨索引空间，会漏检越界，仅兼容旧调用方）
 * @returns { fixedVertexCount } 被修复的 skinIndex 槽位数量
 */
export function fixSkinningIndices(
    obj: THREE.Object3D,
    oldToNewIndexMap: Map<number, number>,
    targetBonesLen?: number,
): { fixedVertexCount: number } {
    let fixedVertexCount = 0;

    for (const mesh of collectSkinnedMeshes(obj)) {
        const siRaw = mesh.geometry.getAttribute('skinIndex');
        const swRaw = mesh.geometry.getAttribute('skinWeight');
        // G3：类型守卫，非 BufferAttribute（如 InterleavedBufferAttribute）时 skip + warn
        if (!(siRaw instanceof THREE.BufferAttribute)) {
            console.warn(
                `[bone_converter] fixSkinningIndices 跳过 mesh ${mesh.name}: skinIndex 不是 BufferAttribute` +
                    `（实际类型 ${(siRaw as object)?.constructor?.name ?? 'undefined'}），无法修复`,
            );
            continue;
        }
        const si = siRaw as THREE.BufferAttribute;
        const sw = swRaw instanceof THREE.BufferAttribute ? (swRaw as THREE.BufferAttribute) : undefined;
        if (swRaw !== undefined && !sw) {
            console.warn(`[bone_converter] fixSkinningIndices 跳过 mesh ${mesh.name} 的 skinWeight: 不是 BufferAttribute`);
        }

        const siArray = si.array as Uint16Array;
        const swArray = sw ? (sw.array as Float32Array) : null;

        for (let i = 0; i < siArray.length; i++) {
            const oldIdx = siArray[i];
            const newIdx = oldToNewIndexMap.get(oldIdx);
            if (newIdx === undefined) {
                // mergeTarget 缺失（映射表漏配）→ index=0 + weight=0
                siArray[i] = 0;
                if (swArray) swArray[i] = 0;
                fixedVertexCount++;
            } else if (newIdx !== oldIdx) {
                siArray[i] = newIdx;
                fixedVertexCount++;
            }
        }

        si.needsUpdate = true;
        if (sw) sw.needsUpdate = true;

        // 运行时断言（V8）：max < 重建后 Skeleton 长度 且 min >= 0
        // V12.2：bonesLen 取重建后 Skeleton 长度（targetBonesLen，含主链骨=22），
        // 确认改写后索引都落在新骨架体内；缺省时回退旧 mesh.skeleton 长度（仅兼容旧调用方）。
        const bonesLen = targetBonesLen ?? (mesh.skeleton ? mesh.skeleton.bones.length : 0);
        let min = Infinity;
        let max = -1;
        for (let i = 0; i < siArray.length; i++) {
            if (siArray[i] < min) min = siArray[i];
            if (siArray[i] > max) max = siArray[i];
        }
        // B2：siArray 为 Uint16Array（值域 [0,65535]），min<0 永假。
        // 改判 max >= 65535 覆盖「写入 -1 被截断为 65535」的截断场景（见文件头 P0-4 警告）。
        if (max >= bonesLen) {
            throw new Error(
                `[bone_converter] fixSkinningIndices 断言失败: max(skinIndex)=${max} >= bones.length=${bonesLen}`,
            );
        }
        if (min < 0 || max >= 65535) {
            throw new Error(
                `[bone_converter] fixSkinningIndices 断言失败: min(skinIndex)=${min} < 0` +
                    ` 或 max(skinIndex)=${max} >= 65535（Uint16 截断，可能写入了 -1）`,
            );
        }
    }

    return { fixedVertexCount };
}
