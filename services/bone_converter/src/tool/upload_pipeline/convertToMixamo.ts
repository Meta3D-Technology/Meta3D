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
 *
 * 注意：这是一个纯透传封装，仅做参数适配（把可选 officialRestPose 包装成
 * ConvertOptions 再转发），本身不含任何业务逻辑——骨骼命名/层级/蒙皮转换、
 * rest pose 对齐、网格坐标变换、关节重绑、boneInverse 对齐等全部实现在
 * bone_converter 的 convertTripoToMixamo（src/tool/bone_converter/index.ts）。
 * 后续若调整转换策略（如换映射表 / 关闭 handleTwist），应改被透传的转换器，
 * 而不是这里。
 *
 * @param obj                已 loadFbx 的 tripo 模型根节点
 * @param officialRestPose   官方 lod2 骨架（可省略；不传则只做命名/层级/蒙皮转换）
 */
export function convertToMixamo(
    obj: THREE.Object3D,
    officialRestPose?: THREE.Object3D,
): ConvertReport {
    return convertTripoToMixamo(obj, officialRestPose ? { officialRestPose } : {});
}
