/**
 * bone_converter 入口 —— convertTripoToMixamo 主流程
 *
 * 实现（D4，方案 §5.5 9 步）：
 *   0. 幂等守卫（P0-2）
 *   1. 收集信息（boneCountBefore / 全部 bone.name / skinnedMesh）
 *   2. 构建映射（DEFAULT_TRIPO_TO_MIXAMO_MAP + 自动检测 Twist 骨）
 *   3. restructureHierarchy（Root/Pelvis 处理 + 全量 oldToNewIndexMap）
 *   4. fixSkinningIndices（按全量映射重映射）
 *   5. renameBones（在 fix 之后改名，旧名是修复参照系）
 *   6. mergeBoneWeights（Twist 骨槽 → 父骨新索引，权重不动）
 *   7. 独立终末步骤：重建一份 Skeleton + 所有 SkinnedMesh 共享 bind（B2）
 *   8. 删除标记为 delete/merge 的骨骼
 *   9. 生成 ConvertReport
 *
 * ⚠️ 顺序敏感：rename 必须在 fixSkinningIndices 之后；mergeBoneWeights 在 rename 之后用新索引。
 *   实现顺序：步骤 6（mergeBoneWeights）在步骤 7（Skeleton 重建）之前执行——此时
 *   mesh.skeleton.bones 仍是旧索引空间，Twist 骨仍在其中，安全网遍历有效。Twist 骨槽的
 *   最终重定向由全量映射在 fixSkinningIndices 中完成，mergeBoneWeights 作为 P1-2 简化算法的
 *   独立安全网保留（通常为 no-op，见 mergeBoneWeights.ts R4 说明）。
 */
import * as THREE from 'three';
import { ConvertOptions, ConvertReport, BoneMapEntry, BoneMappingEntry } from './types';
import { DEFAULT_TRIPO_TO_MIXAMO_MAP, TWIST_BONE_PATTERNS, DEFAULT_UNMAPPED_KEEP_PATTERNS } from './BoneMapping';
import { renameBones } from './renameBones';
import { restructureHierarchy } from './restructureHierarchy';
import { fixSkinningIndices } from './fixSkinningIndices';
import { alignRestPoseToOfficial, alignMeshToLod2, applyOfficialBoneInverses } from './alignRestPose';
import { rebindJointVerts, RebindJointResult } from './rebindJointVerts';
import { collectBones, collectSkinnedMeshes } from './utils';

export * from './types';
export * from './BoneMapping';
export * from './renameBones';
export * from './restructureHierarchy';
export * from './fixSkinningIndices';
export * from './mergeBoneWeights';
export * from './normalizeRootMotion';
export * from './reposeModelBind';
export * from './alignRestPose';
export * from './rebindJointVerts';
export * from './utils';

/** 映射表数组 → renameBones 需要的 Map<string, BoneMapEntry> */
function buildRenameMap(mapping: BoneMappingEntry[]): Map<string, BoneMapEntry> {
    const map = new Map<string, BoneMapEntry>();
    for (const e of mapping) {
        map.set(e.tripoName, {
            newName: e.mixamoName,
            action: e.action,
            mergeTarget: e.mergeTarget,
        });
    }
    return map;
}

/** 从场景树中物理移除指定骨骼（先 reparent 其子骨到原父级，保持世界变换） */
function removeBonesFromTree(root: THREE.Object3D, names: string[]): void {
    const nameSet = new Set(names);
    const toRemove = collectBones(root).filter((b) => nameSet.has(b.name));
    for (const b of toRemove) {
        const parent = b.parent;
        if (!parent) continue;
        b.children.slice().forEach((c) => parent.attach(c));
        parent.remove(b);
    }
}

/**
 * 将 Tripo 模型的骨骼转换为 Mixamo 命名体系
 * 副作用：原地修改 obj 的骨骼名/层级/skinIndex/skeleton
 */
export function convertTripoToMixamo(
    obj: THREE.Object3D,
    options: ConvertOptions = {},
): ConvertReport {
    const startTime = Date.now();
    const mapping = options.mapping ?? DEFAULT_TRIPO_TO_MIXAMO_MAP;
    const keepPatterns = options.unmappedKeepPatterns ?? DEFAULT_UNMAPPED_KEEP_PATTERNS;
    const handleTwist = options.handleTwistBones ?? true;
    const warnings: string[] = [];

    // ── 0. 幂等守卫（P0-2）──
    const bones0 = collectBones(obj);
    const boneCountBefore = bones0.length;
    if (boneCountBefore > 0 && bones0.every((b) => b.name.startsWith('mixamorig'))) {
        return {
            alreadyConverted: true,
            boneCountBefore,
            boneCountAfter: boneCountBefore,
            renameCount: 0,
            removedBones: [],
            skinIndexFixCount: 0,
            fixedVertexCount: 0,
            mergedTwistCount: 0,
            skeletonRebuilt: false,
            restPoseAlignedCount: 0,
            meshAlignedVertexCount: 0,
            reboundFootCount: 0,
            reboundArmCount: 0,
            reboundHeadCount: 0,
            boneInverseAlignedCount: 0,
            unmatchedBones: [],
            durationMs: Date.now() - startTime,
            boneNamesAfter: bones0.map((b) => b.name),
            warnings,
        };
    }

    // ── 1. 收集信息 ──
    const meshes = collectSkinnedMeshes(obj);

    // ── 2. 构建映射 + 自动检测 Twist 骨 ──
    const twistBoneNames = new Set<string>();
    if (handleTwist) {
        for (const b of bones0) {
            const inMap = mapping.some((e) => e.tripoName === b.name);
            if (!inMap && TWIST_BONE_PATTERNS.some((p) => p.test(b.name))) twistBoneNames.add(b.name);
        }
    }

    // ── 3. 重组层级 ──
    const { oldToNewIndexMap, deletedBoneNames, finalBones } = restructureHierarchy(obj, mapping, handleTwist, warnings);

    // ── 4. 修复 skinIndex（全量映射重映射，含 Twist 骨 → 父骨新索引）──
    // V12.2：断言按重建后 Skeleton 长度（finalBones.length，含主链骨），确认改写后索引落在其内
    const { fixedVertexCount } = fixSkinningIndices(obj, oldToNewIndexMap, finalBones.length);

    // ── 5. 重命名（fix 之后，旧名是修复参照系）──
    const renameMap = buildRenameMap(mapping);
    // Twist 骨以 merge 条目进入 renameMap，避免计入 unmatched
    twistBoneNames.forEach((n) => renameMap.set(n, { newName: '', action: 'merge', mergeTarget: '' }));
    const renameResult = renameBones(obj, renameMap, keepPatterns);

    // ── 6. mergeBoneWeights 已移除（D10.1 修复）──
    // ⚠️ 根因（probe-binding-map/fix 实锤）：mergeBoneWeights 在 fixSkinningIndices 之后运行，
    // 但此时 skinIndex 已是「新索引空间 0-21」，而 mergeBoneWeights 用旧 41 骨 skeleton.bones
    // 数组按新索引取值查 Twist —— 新索引 7/8/9/10/12/13/17/18 恰好命中旧数组中 Twist 骨位
    // （如新 8→旧 8=L_CalfTwist02），被误判为 Twist 槽再二次重映射到错误父骨 → 左手/右肩/
    // 脚趾等顶点被绑到腿部（LeftHand=0、RightShoulder=0），蒙皮网格不跟随骨骼 → 实机渲染
    // 手臂扭曲（V8/V9/V9.1 三轮回合全绿但视觉仍错，根因在此）。
    // fixSkinningIndices 的全量 oldToNewIndexMap 已把 Twist 骨 oldIdx → 语义父骨新索引
    // （restructureHierarchy lines 139-143），mergeBoneWeights 冗余且有害，删除即可。

    // ── 7. 独立终末步骤：重建一份 Skeleton + 所有 SkinnedMesh 共享 bind（B2）──
    // V12.2：finalBones 改用 restructureHierarchy 返回的全场景树骨骼（含全部 22 骨含 9 主链骨），
    // 使 Hips/UpLeg/Leg/Arm/ForeArm 恢复可寻址，Skeleton 含完整链
    let skeletonRebuilt = false;
    if (meshes.length > 0 && finalBones.length > 0) {
        obj.updateMatrixWorld(true);
        const skeleton = new THREE.Skeleton(finalBones);
        for (const m of meshes) {
            m.bind(skeleton); // 所有 SkinnedMesh 共享同一份 skeleton
        }
        skeletonRebuilt = true;
    }

    // ── 8. 删除标记为 delete/merge 的骨骼 ──
    removeBonesFromTree(obj, deletedBoneNames);

    // ── 8.5 rest pose 对齐官方骨架（D6）+ 网格顶点变换到 lod2 坐标系（D7，V12.1）──
    // 传入官方 lod2 骨架时：
    //  D7 先做：把 SkinnedMesh 网格顶点原地乘 M（scale+translate，bbox 求）变换到 lod2
    //   坐标系，修复「骨骼已对齐但网格仍在 Tripo 坐标系 → 骨骼与网格错位 → 蒙皮扭曲」。
    //  D6 后做：把转换后骨骼（含 root）的 local pos/quat 对齐官方同名骨骼，
    //   并重建 skeleton/bindMatrix 联动。修复根因：转换后 rest pose 与官方不一致
    //   （Shoulder 差 179°）导致动画重定向错乱。
    let restPoseAlignedCount = 0;
    let meshAlignedVertexCount = 0;
    if (options.officialRestPose) {
        const meshResult = alignMeshToLod2(obj, options.officialRestPose);
        meshAlignedVertexCount = meshResult.transformedVertexCount;
        if (meshResult.applied) {
            warnings.push(
                `网格顶点变换到 lod2 坐标系: ${meshResult.transformedVertexCount} 顶点, ` +
                `scale=(${meshResult.scale.x.toFixed(6)},${meshResult.scale.y.toFixed(6)},${meshResult.scale.z.toFixed(6)}), ` +
                `translate=(${meshResult.translation.x.toFixed(5)},${meshResult.translation.y.toFixed(5)},${meshResult.translation.z.toFixed(5)})`,
            );
        }
        const alignResult = alignRestPoseToOfficial(obj, options.officialRestPose);
        restPoseAlignedCount = alignResult.alignedCount;
        if (alignResult.notInOfficial.length) {
            warnings.push(`rest pose 对齐: 转换后骨骼不在官方骨架中: ${alignResult.notInOfficial.join(', ')}`);
        }
    }

    // ── 8.6 关节区权重重绑（V12.3，方案 1：rebindJointVerts）──
    // 修复 twist 骨合并到语义父骨的权重错位：脚踝区 Leg→Foot、上臂区参数化 Shoulder、
    // 肩区 Head 泄漏。依赖官方 rest pose（骨骼已对齐 + 网格已变换到 lod2 坐标系）。
    // 需要 officialRestPose；未提供时跳过（不改变行为）。
    let rebindCounts: RebindJointResult | null = null;
    if (options.officialRestPose) {
        rebindCounts = rebindJointVerts(obj, options.officialRestPose);
        if (rebindCounts.footReboundCount > 0 || rebindCounts.armShoulderCount > 0 || rebindCounts.headLeakCount > 0) {
            warnings.push(
                `关节区权重重绑(V12.3): 脚踝Leg→Foot ${rebindCounts.footReboundCount} 顶点, ` +
                    `上臂Arm→Shoulder ${rebindCounts.armShoulderCount} 顶点, 肩区Head→Shoulder ${rebindCounts.headLeakCount} 顶点`,
            );
        }
    }

    // ── 8.7 boneInverse 参考系统一（V12.4，方案 A）──
    // 根因（v11 定位轮实锤）：conv 重建骨架 calculateInverses() 生成自洽帧（boneMat=I），
    // 与官方 lod2 的 FBX TransformLink 原生绑定矩阵（boneMat≠I）参考系不一致（同名骨 maxDiff=6.031），
    // 经 rePoseModelBindToAnimRest 的 rebindSkinVertices 放大为 geometry 77 分歧 → 动画帧对比 un≈15000。
    // 修复：把官方 lod2 同名骨 boneInverse 按名映射覆盖到 conv skeleton，使：
    //   ① convert 输出直接播放（不走 normalize）的路径蒙皮公式与官方一致；
    //   ② rePoseModelBindToAnimRest 的 oldBoneInverses 捕获点（reposeModelBind.ts:117）捕获到官方帧，
    //      官方帧模式下不 rebind geometry、不 calculateInverses（reposeModelBind.ts 内处理）。
    // 必须在 step 7（Skeleton 重建 + bind，会重算 boneInverse）之后执行。
    let boneInverseAlignedCount = 0;
    if (options.officialRestPose) {
        boneInverseAlignedCount = applyOfficialBoneInverses(obj, options.officialRestPose);
        if (boneInverseAlignedCount > 0) {
            warnings.push(
                `boneInverse 参考系统一(V12.4): ${boneInverseAlignedCount} 骨对齐官方 lod2 TransformLink 帧`,
            );
        }
    }

    // ── 9. 生成报告 ──
    const boneNamesAfter = collectBones(obj).map((b) => b.name);
    return {
        alreadyConverted: false,
        boneCountBefore,
        boneCountAfter: boneNamesAfter.length,
        renameCount: renameResult.renamed,
        removedBones: deletedBoneNames,
        skinIndexFixCount: fixedVertexCount,
        fixedVertexCount,
        mergedTwistCount: twistBoneNames.size,
        skeletonRebuilt,
        restPoseAlignedCount,
        meshAlignedVertexCount,
        reboundFootCount: rebindCounts?.footReboundCount ?? 0,
        reboundArmCount: rebindCounts?.armShoulderCount ?? 0,
        reboundHeadCount: rebindCounts?.headLeakCount ?? 0,
        boneInverseAlignedCount,
        unmatchedBones: renameResult.unmatched,
        durationMs: Date.now() - startTime,
        boneNamesAfter,
        warnings,
    };
}
