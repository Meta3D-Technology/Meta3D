/**
 * renameBones — 遍历所有骨骼，按映射表重命名
 *
 * 实现（D3）：
 *  - obj.traverse + isBone 遍历所有骨骼
 *  - 记录 node.userData.originalName（保留原始名用于调试）
 *  - 命名应用 PropertyBinding.sanitizeNodeName，确保与 FBXLoader 的命名规则一致
 *  - 映射表动作：
 *    - action='rename' → 改名为 mixamoName
 *    - action='merge' → 本次不合并权重（D4 做），改名时跳过（保持原名）
 *    - action='delete' → 本次不删除（D4 做），跳过改名
 *  - 未命中映射表：命中白名单 → 保留原名记入 keptByWhitelist；否则记入 unmatched
 */
import * as THREE from 'three';
import { BoneMapEntry } from './types';
import { DEFAULT_UNMAPPED_KEEP_PATTERNS } from './BoneMapping';

/**
 * 遍历所有骨骼，按映射表重命名；未命中映射表的骨骼按白名单保留（P0-3）
 * @param obj 含骨骼树的 Object3D
 * @param mapping 骨名 → { newName, action, mergeTarget } 映射（key 为 tripoName）
 * @param keepPatterns 未映射骨白名单模式（默认 DEFAULT_UNMAPPED_KEEP_PATTERNS）
 * @returns 重命名统计：renamed 为改名数；unmatched / keptByWhitelist 为未映射骨骼名清单
 */
export function renameBones(
    obj: THREE.Object3D,
    mapping: Map<string, BoneMapEntry>,
    keepPatterns: RegExp[] = DEFAULT_UNMAPPED_KEEP_PATTERNS,
): { renamed: number; unmatched: string[]; keptByWhitelist: string[] } {
    const renamed: string[] = [];
    const unmatched: string[] = [];
    const keptByWhitelist: string[] = [];

    obj.traverse((node) => {
        if (!(node as THREE.Bone).isBone) return;
        const originalName = node.name;
        // 记录原始名，便于 D4 合并权重时回查 / 调试
        node.userData.originalName = originalName;

        const entry = mapping.get(originalName);
        if (entry) {
            // merge / delete：D3 不处理（保持原名），D4 做合并/删除
            if (entry.action === 'rename' && entry.newName) {
                node.name = THREE.PropertyBinding.sanitizeNodeName(entry.newName);
                renamed.push(originalName);
            }
            return;
        }

        // 未命中映射表：命中白名单 → 保留原名；否则记入 unmatched
        if (keepPatterns.some((p) => p.test(originalName))) {
            keptByWhitelist.push(originalName);
        } else {
            unmatched.push(originalName);
        }
    });

    return { renamed: renamed.length, unmatched, keptByWhitelist };
}
