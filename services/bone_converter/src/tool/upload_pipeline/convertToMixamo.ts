/**
 * convertToMixamo.ts — 把已加载的 tripo Object3D 骨骼转换为 Mixamo 命名体系
 *
 * 复用 bone_converter 的 convertTripoToMixamo；可传入官方 lod2 骨架做
 * rest pose 对齐（D6）+ 网格坐标变换（D7）+ 关节重绑（V12.3）+ boneInverse（V12.4）。
 */
import * as THREE from 'three';
import { convertTripoToMixamo, ConvertReport } from '../bone_converter';

/**
 * 转换骨骼。原地修改 obj。
 * @param obj                已 loadFbx 的 tripo 模型根节点
 * @param officialRestPose   官方 lod2 骨架（可省略；不传则只做命名/层级/蒙皮转换）
 */
export function convertToMixamo(
    obj: THREE.Object3D,
    officialRestPose?: THREE.Object3D,
): ConvertReport {
    return convertTripoToMixamo(obj, officialRestPose ? { officialRestPose } : {});
}
