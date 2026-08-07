/**
 * alignRestPose.ts — D6：转换后骨骼 rest pose 对齐 Mixamo 官方骨架
 *                      D7：转换后网格顶点变换到 lod2 坐标系（V12.1 扭曲修复）
 *
 * 背景（V12 根因修复）：
 *   convertTripoToMixamo 只做 rename + restructure + skinIndex 修复 + twist 合并，
 *   骨骼 local pos/quat 保持 Tripo 原始值 → 转换后骨骼的 rest pose 与 Mixamo 官方
 *   骨架严重不一致（实测 LeftShoulder/RightShoulder 差 179°、Spine 差 132°），
 *   导致动画重定向（normalizeRootMotion）基于错误的 bind 姿态计算 → 上半身 180° 旋转。
 *
 * 修复原理（探针实锤，见 test/step-definitions/probe-rest-align.steps.ts）：
 *   1. Tripo 模型与官方 lod2 是同一网格（15075 顶点一致），仅坐标系差一个纯平移
 *      T=(0.0013, -49.9073, 0.0595)（bbox min 差），无旋转、无缩放（尺寸比 0.999969）。
 *   2. 骨骼 local transform 是相对父级的 → 坐标系平移在 local 空间抵消：
 *      直接把官方 lod2 同名骨骼的 local pos/quat 拷贝给转换后骨骼即可，
 *      世界位置自动落在 Tripo 网格上（网格几何不动，蒙皮相对骨骼，无错位）。
 *   3. 拷贝后必须 updateMatrixWorld + 重建 Skeleton + 重新 bind，
 *      使 bindMatrix / boneInverse 与新的 rest pose 联动。
 *
 * V12.1 补充（D7，兄弟实测转换后模型扭曲）：
 *   alignRestPose 只把骨骼 local pos/quat 对齐到 lod2（竖立坐标系），网格顶点仍在
 *   Tripo 原始坐标系 → 骨骼与网格错位 → 蒙皮拉扯扭曲。修复：alignMeshToLod2 把
 *   SkinnedMesh 的 geometry position attribute 原地乘 M（scale + translate，由两边
 *   bbox 求刚体变换），使网格顶点与已对齐的 lod2 骨骼坐标系一致 → 蒙皮正确、不扭曲。
 *   注意：Tripo 与 lod2 两次 FBX 导出的顶点顺序不同，M 不能按 index 对应求，必须用
 *   bbox（中心/尺寸）求。网格节点自身的旋转（横/竖）不在 attribute 空间，无需处理。
 *
 * ⚠️ 本文件是 rest pose（数据层）对齐；动画层 normalizeRootMotion 不动。
 */
import * as THREE from 'three';
import { collectBones, collectSkinnedMeshes } from './utils';

/** rest pose 对齐结果 */
export interface AlignRestPoseResult {
    /** 对齐的骨骼数（转换后与官方同名） */
    alignedCount: number;
    /** 转换后有、官方没有的骨骼（子集检查，正常应为空） */
    notInOfficial: string[];
    /** 官方有、转换后没有的骨骼（手指/End 等，允许缺失） */
    officialOnly: string[];
    /** 是否重建了 Skeleton 并重新 bind */
    skeletonRebuilt: boolean;
}

/**
 * V12.4：把官方 lod2 同名骨的 boneInverse（FBX TransformLink 原生绑定矩阵，不自洽 boneMat≠I）
 * 按骨名映射覆盖到转换后骨架的 skeleton.boneInverses。
 *
 * 背景（v11 定位轮实锤）：conv 的 boneInverse 来自 convert 重建骨架 calculateInverses()
 * （自洽，boneMat=I）；off 的来自 FBX TransformLink 原生绑定矩阵（不自洽，boneMat≠I），
 * 两套参考系同名骨 maxDiff=6.031 → 经 rePoseModelBindToAnimRest 的 rebindSkinVertices +
 * calculateInverses 放大为 geometry 77 分歧。把官方帧注入后：
 *   - convert 输出直接播放（不走 normalize）的路径：蒙皮公式与官方一致（P0 indexed 77→~0）
 *   - rePoseModelBindToAnimRest 的 oldBoneInverses 捕获点（reposeModelBind.ts:117）捕获
 *     到的就是官方帧，官方帧模式下不 rebind geometry、不 calculateInverses，蒙皮跟随骨骼
 *     的行为与 off 完全一致。
 *
 * @param obj 已转换（convertTripoToMixamo + alignRestPoseToOfficial）的模型根节点
 * @param officialRoot 官方 lod2 骨架根节点（FBXLoader parse 后）
 * @returns 成功覆盖的骨骼数
 */
export function applyOfficialBoneInverses(
    obj: THREE.Object3D,
    officialRoot: THREE.Object3D,
): number {
    const officialMeshes = collectSkinnedMeshes(officialRoot);
    if (officialMeshes.length === 0) return 0;
    const offSk = officialMeshes[0].skeleton;
    if (!offSk) return 0;
    // 官方骨架 boneInverse 按骨名索引（与 skeleton.bones 同序）
    const offInvByName = new Map<string, THREE.Matrix4>();
    for (let i = 0; i < offSk.bones.length; i++) {
        const b = offSk.bones[i];
        if (b) offInvByName.set(b.name, offSk.boneInverses[i]);
    }
    let mapped = 0;
    for (const m of collectSkinnedMeshes(obj)) {
        const sk = m.skeleton;
        if (!sk) continue;
        for (let i = 0; i < sk.bones.length; i++) {
            const b = sk.bones[i];
            if (!b) continue;
            const inv = offInvByName.get(b.name);
            if (inv && sk.boneInverses[i]) {
                sk.boneInverses[i].copy(inv);
                mapped++;
            }
        }
    }
    return mapped;
}

/**
 * 把 obj（已转换为 mixamorig 命名）中所有「与官方骨架同名」骨骼的
 * local position/quaternion 对齐为官方的值（含 root），然后重建 Skeleton +
 * 重新 bind 所有 SkinnedMesh，使 bindMatrix 与新的 rest pose 联动。
 *
 * 副作用：原地修改 obj 的骨骼 local transform / skeleton / bindMatrix。
 */
export function alignRestPoseToOfficial(
    obj: THREE.Object3D,
    officialRoot: THREE.Object3D,
): AlignRestPoseResult {
    const convBones = collectBones(obj);
    const officialBones = collectBones(officialRoot);
    const officialByName = new Map<string, THREE.Bone>();
    for (const b of officialBones) officialByName.set(b.name, b);
    const officialNameSet = new Set(officialBones.map((b) => b.name));

    const notInOfficial: string[] = [];
    let alignedCount = 0;
    for (const b of convBones) {
        const ob = officialByName.get(b.name);
        if (!ob) {
            notInOfficial.push(b.name);
            continue;
        }
        b.position.copy(ob.position);
        b.quaternion.copy(ob.quaternion);
        alignedCount++;
    }

    // 重建 Skeleton + 所有 SkinnedMesh 重新 bind（bindMatrix 联动新 rest pose）
    const meshes = collectSkinnedMeshes(obj);
    let skeletonRebuilt = false;
    if (meshes.length > 0 && meshes[0].skeleton) {
        // 复用现有 skeleton.bones（保持 skinIndex 索引空间顺序），bind 会重算 boneInverse/bindMatrix
        const skeleton = meshes[0].skeleton;
        obj.updateMatrixWorld(true);
        for (const m of meshes) {
            m.bind(skeleton);
        }
        skeletonRebuilt = true;
    }

    return {
        alignedCount,
        notInOfficial,
        officialOnly: [...officialNameSet].filter((n) => !convBones.some((b) => b.name === n)),
        skeletonRebuilt,
    };
}

/** 网格对齐结果 */
export interface AlignMeshResult {
    /** 变换的顶点数（所有 SkinnedMesh 的 position 顶点总和） */
    transformedVertexCount: number;
    /** 缩放（逐轴，lod2Size / tripoSize） */
    scale: THREE.Vector3;
    /** 平移（lod2 bbox 中心 - scale * tripo bbox 中心） */
    translation: THREE.Vector3;
    /** 是否完成了变换（能找到 SkinnedMesh + position attribute） */
    applied: boolean;
}

/**
 * 把 obj 中所有 SkinnedMesh 的网格顶点变换到官方 lod2 坐标系（D7）。
 *
 * 原理：Tripo 与 lod2 是同一网格（15075 顶点），仅差一个刚体变换 M
 * （scale + translate）。M 由两边 bbox 求：逐轴 scale = lod2 size / tripo size，
 * translate = lod2 bbox 中心 - scale ⊙ tripo bbox 中心。得到 M 后对每个
 * SkinnedMesh 的 geometry position attribute 原地乘 M。
 *
 * ⚠️ 顶点顺序在两次 FBX 导出间不一致，不能用 index 对应求 M，必须用 bbox。
 * ⚠️ 只改 attribute 数据，不动网格节点 transform（横/竖由节点旋转决定）。
 */
export function alignMeshToLod2(
    obj: THREE.Object3D,
    officialRoot: THREE.Object3D,
): AlignMeshResult {
    const meshes = collectSkinnedMeshes(obj);
    const officialMeshes = collectSkinnedMeshes(officialRoot);
    const notApplied: AlignMeshResult = {
        transformedVertexCount: 0,
        scale: new THREE.Vector3(1, 1, 1),
        translation: new THREE.Vector3(0, 0, 0),
        applied: false,
    };
    if (meshes.length === 0 || officialMeshes.length === 0) return notApplied;

    const tripoAttr = meshes[0].geometry.getAttribute('position') as THREE.BufferAttribute | null;
    const lod2Attr = officialMeshes[0].geometry.getAttribute('position') as THREE.BufferAttribute | null;
    if (!tripoAttr || !lod2Attr) return notApplied;

    // 逐轴 bbox → scale + translation
    const tripoBox = new THREE.Box3().setFromBufferAttribute(tripoAttr);
    const lod2Box = new THREE.Box3().setFromBufferAttribute(lod2Attr);
    const tripoSize = tripoBox.getSize(new THREE.Vector3());
    const lod2Size = lod2Box.getSize(new THREE.Vector3());
    const scale = new THREE.Vector3(
        tripoSize.x === 0 ? 1 : lod2Size.x / tripoSize.x,
        tripoSize.y === 0 ? 1 : lod2Size.y / tripoSize.y,
        tripoSize.z === 0 ? 1 : lod2Size.z / tripoSize.z,
    );
    const tripoCenter = tripoBox.getCenter(new THREE.Vector3());
    const lod2Center = lod2Box.getCenter(new THREE.Vector3());
    const translation = new THREE.Vector3().subVectors(
        lod2Center,
        tripoCenter.clone().multiply(scale),
    );

    // 原地变换所有 SkinnedMesh 的 position
    let transformedVertexCount = 0;
    for (const m of meshes) {
        const attr = m.geometry.getAttribute('position') as THREE.BufferAttribute | null;
        if (!attr) continue;
        for (let i = 0; i < attr.count; i++) {
            attr.setXYZ(
                i,
                attr.getX(i) * scale.x + translation.x,
                attr.getY(i) * scale.y + translation.y,
                attr.getZ(i) * scale.z + translation.z,
            );
        }
        attr.needsUpdate = true;
        transformedVertexCount += attr.count;
    }

    return { transformedVertexCount, scale, translation, applied: true };
}
