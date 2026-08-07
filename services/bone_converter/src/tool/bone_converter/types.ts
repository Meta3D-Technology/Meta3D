/**
 * bone_converter 共享类型定义
 *
 * 来源：`笔记/项目文档/changes/2026-08-01-tripo-bone-converter/solution.md` §5.2
 * 已含审核修正：deleteUnmapped 默认 false（P0-3）、幂等守卫字段 alreadyConverted（P0-2）
 */
import type * as THREE from 'three';

/** 单条骨骼映射 */
export interface BoneMappingEntry {
    /** Tripo 骨骼名（FBXLoader 解析后的 bone.name） */
    tripoName: string;
    /** Mixamo 骨骼名（目标名） */
    mixamoName: string;
    /** 动作类型 */
    action: 'rename' | 'merge' | 'delete';
    /** action='merge' 时，权重合并到哪个 mixamoName 的骨骼 */
    mergeTarget?: string;
}

/** 转换配置 */
export interface ConvertOptions {
    /** 自定义映射表（为空则用内置默认表） */
    mapping?: BoneMappingEntry[];
    /** 是否删除未映射的骨骼（默认 false：保留未映射骨骼，走白名单制） */
    deleteUnmapped?: boolean;
    /** 未映射骨骼白名单模式（默认保留发骨/手指/脚趾） */
    unmappedKeepPatterns?: RegExp[];
    /** 是否处理 Twist 骨（默认 true：全合并到父骨） */
    handleTwistBones?: boolean;
    /** 官方 Mixamo 骨架参考（如 model_EliteGiantess9_lod2.fbx 解析后的根对象）。
     * 提供时转换完成后把同名骨骼的 rest pose（local pos/quat）对齐官方（D6）。 */
    officialRestPose?: THREE.Object3D;
    /** 是否输出详细日志 */
    verbose?: boolean;
}

/** 转换报告 */
export interface ConvertReport {
    /** 是否已是 Mixamo 命名（幂等守卫 early-return，见方案 §5.4.0） */
    alreadyConverted: boolean;
    /** 转换前骨骼数 */
    boneCountBefore: number;
    /** 转换后骨骼数 */
    boneCountAfter: number;
    /** 重命名数 */
    renameCount: number;
    /** 删除/合并的骨骼清单 */
    removedBones: string[];
    /** 修复的蒙皮顶点数
     * @deprecated B3：与 fixedVertexCount 语义重复，值恒相同。use fixedVertexCount instead。
     */
    skinIndexFixCount: number;
    /** 修复的 skinIndex 槽位数量（与 skinIndexFixCount 一致，D4 补充） */
    fixedVertexCount: number;
    /** 合并掉的 Twist 骨数量（D4 补充） */
    mergedTwistCount: number;
    /** 是否已重建 Skeleton 并让所有 SkinnedMesh 共享（B2，D4 补充） */
    skeletonRebuilt: boolean;
    /** rest pose 对齐官方骨架的骨骼数（D6：传 officialRestPose 时 >0） */
    restPoseAlignedCount: number;
    /** 网格顶点变换到 lod2 坐标系的顶点数（D7/V12.1：传 officialRestPose 时 >0） */
    meshAlignedVertexCount: number;
    /** 脚踝区 Leg→Foot 重绑顶点数（V12.3 rebindJointVerts：传 officialRestPose 时生效） */
    reboundFootCount: number;
    /** 上臂区 Arm→Shoulder 重绑顶点数（V12.3 rebindJointVerts：传 officialRestPose 时生效） */
    reboundArmCount: number;
    /** 肩区 Head→Shoulder 重绑顶点数（V12.3 rebindJointVerts：传 officialRestPose 时生效） */
    reboundHeadCount: number;
    /** boneInverse 参考系统一为官方 lod2 TransformLink 帧的骨骼数（V12.4：传 officialRestPose 时生效） */
    boneInverseAlignedCount: number;
    /** 未匹配的骨骼名（按白名单保留，需人工检查） */
    unmatchedBones: string[];
    /** 转换耗时 ms */
    durationMs: number;
    /** 转换后的骨骼名列表 */
    boneNamesAfter: string[];
    /** 警告（槽挤占/mergeTarget 缺失/unmatched 等） */
    warnings: string[];
}

/** 工具函数的入参/出参类型约束（供 renameBones 等内部函数使用，不属于对外 API） */
export interface BoneMapEntry {
    /** 新名称（rename 时生效） */
    newName: string;
    /** 动作：rename | merge | delete */
    action: string;
    /** merge 的目标骨名 */
    mergeTarget?: string;
}
