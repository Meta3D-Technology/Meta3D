/**
 * restructureHierarchy — 处理 Root/Pelvis/NeckTwist 层级重组
 *
 * 实现（D4）：
 *  - 统一用 `Object3D.attach()` 处理 reparent（P0-1，禁止手写逆矩阵），保持世界变换
 *  - Root 删除：rootParent.attach(hip) → 其余 Root 子骨挂到 hip → rootParent.remove(root)
 *  - Pelvis 合并到 Hip：hip.attach(pelvis 的所有 child) → 物理移除 pelvis
 *  - NeckTwist02 等映射表 merge 骨：child 挂到 mergeTarget → 物理移除
 *  - 返回全量 oldToNewIndexMap（P1-3 ①）+ deletedBoneNames
 *
 * @note oldToNewIndexMap 为【全量映射】：覆盖旧骨架（mesh.skeleton.bones）所有原下标——
 *       保留骨 oldIdx→新下标、删除/合并骨 oldIdx→mergeTarget 新下标、Twist 骨 oldIdx→语义父骨新下标、
 *       Root（无 mergeTarget）→ 0。确保 fixSkinningIndices 对每个旧索引都有解。
 *
 * @note V12.2 修复：旧索引空间（key）仍用 mesh.skeleton.bones（FBXLoader 按权重生成），
 *       但新索引空间（value + finalBones）改用**全场景树骨骼**（collectBones，含主链骨
 *       UpLeg/Leg/Arm/ForeArm/Hips）。根因：Tripo mesh skeleton 只有 30 个 twist/叶骨，
 *       twist 骨的语义父骨（如 L_Thigh）不在旧索引空间 → 全部 `?? 0` 落到 RightFoot → 动画拉丝。
 *       finalBones 随返回值透出，index.ts step 7 直接用同一顺序重建 Skeleton。
 */
import * as THREE from 'three';
import { BoneMappingEntry } from './types';
import { TWIST_BONE_PATTERNS } from './BoneMapping';
import { collectBones, collectSkinnedMeshes } from './utils';

/** 判断骨骼是否为 Twist 骨（排除映射表中已有的骨，如 NeckTwist01/02 由映射表处理） */
export function isTwistBone(bone: THREE.Bone, mapping: BoneMappingEntry[]): boolean {
    if (mapping.some((e) => e.tripoName === bone.name)) return false;
    return TWIST_BONE_PATTERNS.some((p) => p.test(bone.name));
}

/**
 * 重组骨骼层级：
 * 1. 删除 Root（容器），将 Hip 提升为根骨骼
 * 2. 删除 Pelvis（子骨挂到 Hip）
 * 3. 处理映射表 merge 骨（如 NeckTwist02 合并到 NeckTwist01）
 * @param obj 含骨骼树的 Object3D
 * @param mapping 映射表
 * @param handleTwist 是否处理 Twist 骨（S1：handleTwistBones=false 时保留 Twist 骨，走白名单）
 * @param warnings 警告数组（G2：mergeTarget 缺失时写入，由调用方收集进报告）
 * @returns { oldToNewIndexMap, deletedBoneNames }
 */
export function restructureHierarchy(
    obj: THREE.Object3D,
    mapping: BoneMappingEntry[],
    handleTwist: boolean = true,
    warnings: string[] = [],
): {
    oldToNewIndexMap: Map<number, number>;
    deletedBoneNames: string[];
    finalBones: THREE.Bone[];
} {
    const bones = collectBones(obj);
    const meshes = collectSkinnedMeshes(obj);
    // 旧索引空间 = mesh.skeleton.bones（skinIndex 引用的是它，FBXLoader 按权重生成；
    // Tripo mesh skeleton 只有 twist/叶骨，无主链骨）；无 mesh 时用遍历序
    const oldIndexBones: THREE.Bone[] = meshes.length > 0 ? meshes[0].skeleton.bones : bones;
    // 新索引空间 = 全场景树骨骼（含主链骨 UpLeg/Leg/Arm/ForeArm/Hips），
    // 使 twist 骨 semanticParent（如 L_Thigh）在新索引空间有解（V12.2 根因修复）
    const indexBones: THREE.Bone[] = bones;

    const boneByName = new Map<string, THREE.Bone>();
    bones.forEach((b) => boneByName.set(b.name, b));

    // 待删除骨名：映射表 delete/merge + Twist 骨（仅统计实际存在的骨，B3）
    // handleTwist=false 时 Twist 骨不删除（保留，走白名单；S1）
    const deletedNames = new Set<string>();
    bones.forEach((b) => {
        const entry = mapping.find((e) => e.tripoName === b.name);
        if (entry && (entry.action === 'delete' || entry.action === 'merge')) deletedNames.add(b.name);
        else if (handleTwist && isTwistBone(b, mapping)) deletedNames.add(b.name);
    });

    // 语义父骨：Twist 骨向上找第一个非 Twist 祖先骨
    const semanticParent = (b: THREE.Bone): THREE.Bone | null => {
        let p = b.parent as THREE.Bone | null;
        while (p && p.isBone && isTwistBone(p, mapping)) p = p.parent as THREE.Bone | null;
        return p && p.isBone ? p : null;
    };

    // mergeTarget(mixamoName) → 目标骨：找映射表中 action=rename 且 mixamoName 相等的骨
    const targetByMixamo = new Map<string, THREE.Bone>();
    mapping.forEach((e) => {
        if (e.action === 'rename' && e.mixamoName) {
            const b = boneByName.get(e.tripoName);
            if (b) targetByMixamo.set(e.mixamoName, b);
        }
    });
    const targetFor = (name: string): THREE.Bone | null => {
        const e = mapping.find((m) => m.tripoName === name);
        if (e && e.action === 'merge' && e.mergeTarget) return targetByMixamo.get(e.mergeTarget) || null;
        return null;
    };

    // === Root 删除 + Hip 提升 ===
    const root = boneByName.get('Root');
    const hip = boneByName.get('Hip');
    if (root) {
        const rootParent = root.parent;
        if (hip) {
            if (rootParent) rootParent.attach(hip); // Hip 提升为根（保持世界变换）
            root.children.slice().forEach((c) => {
                if (c !== hip && (c as THREE.Bone).isBone) hip.attach(c as THREE.Bone);
            });
        } else if (rootParent) {
            root.children.slice().forEach((c) => rootParent.attach(c));
        }
        if (root.parent) root.parent.remove(root);
    }

    // === Pelvis 合并到 Hip ===
    const pelvis = boneByName.get('Pelvis');
    if (pelvis) {
        const target = targetFor('Pelvis') || hip;
        const reparentTarget: THREE.Object3D = target || (pelvis.parent as THREE.Object3D);
        pelvis.children.slice().forEach((c) => {
            if ((c as THREE.Bone).isBone) reparentTarget.attach(c as THREE.Bone);
        });
        if (pelvis.parent) pelvis.parent.remove(pelvis);
    }

    // === 其余映射表 merge 骨（如 NeckTwist02）===
    mapping.forEach((e) => {
        if (e.action !== 'merge') return;
        const bone = boneByName.get(e.tripoName);
        if (!bone || bone === pelvis || bone === root) return;
        const target = targetFor(e.tripoName);
        if (target) {
            bone.children.slice().forEach((c) => {
                if ((c as THREE.Bone).isBone) target.attach(c as THREE.Bone);
            });
        } else {
            // G2：mergeTarget 未找到，子骨会因物理移除骨而丢到父级，记录警告
            warnings.push(`merge 骨 ${e.tripoName} 的 mergeTarget 未找到，子骨可能丢失`);
        }
        if (bone.parent) bone.parent.remove(bone);
    });

    // === 构建全量 oldToNewIndexMap ===
    // 新索引空间 = 全场景树骨骼（含主链骨）按序过滤掉删除骨（终末 Skeleton 重建用同一顺序，
    // index.ts step 7 直接消费本函数返回的 finalBones，保证顺序一致）
    const finalBones = indexBones.filter((b) => !deletedNames.has(b.name));
    const newIndex = new Map<THREE.Bone, number>();
    finalBones.forEach((b, i) => newIndex.set(b, i));

    // oldToNewIndexMap 的 key 仍是旧 mesh skeleton 下标（FBXLoader 按权重生成的索引空间，
    // skinIndex 引用的是它）；value 是新索引空间下标（含主链骨）
    const oldToNewIndexMap = new Map<number, number>();
    oldIndexBones.forEach((b, i) => {
        if (!deletedNames.has(b.name)) {
            oldToNewIndexMap.set(i, newIndex.get(b)!);
        } else {
            let target: THREE.Bone | null = null;
            if (isTwistBone(b, mapping)) target = semanticParent(b);
            if (!target) target = targetFor(b.name);
            oldToNewIndexMap.set(i, target ? (newIndex.get(target) ?? 0) : 0);
        }
    });

    return { oldToNewIndexMap, deletedBoneNames: [...deletedNames], finalBones };
}
