/**
 * bone_converter 共享工具函数
 *
 * C1（审核修复）：collectBones / collectSkinnedMeshes 原在 index.ts、restructureHierarchy.ts、
 * fixSkinningIndices.ts、mergeBoneWeights.ts 四处重复定义 6 次，提取到本模块统一复用。
 */
import * as THREE from 'three';

/** 收集所有骨骼（遍历序） */
export function collectBones(root: THREE.Object3D): THREE.Bone[] {
    const bones: THREE.Bone[] = [];
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) bones.push(n as THREE.Bone);
    });
    return bones;
}

/** 收集所有 SkinnedMesh */
export function collectSkinnedMeshes(root: THREE.Object3D): THREE.SkinnedMesh[] {
    const meshes: THREE.SkinnedMesh[] = [];
    root.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh) meshes.push(n as THREE.SkinnedMesh);
    });
    return meshes;
}
