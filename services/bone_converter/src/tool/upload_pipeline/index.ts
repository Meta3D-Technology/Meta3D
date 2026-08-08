/**
 * upload_pipeline 主入口 —— processTripoZip
 *
 * 流程：
 *   unzipTripoZip(zipBytes)      jszip 解压 → fbx + 纹理
 *   loadFbx(fbxBytes)            FBXLoader 加载 → THREE.Object3D
 *   convertToMixamo(obj, official)  骨骼 → Mixamo + 官方 lod2 rest pose 对齐
 *   exportFbx(obj, { textures })     ASCII FBX + 纹理 base64 嵌入
 *   → UploadPipelineResult { fbxName, fbxData, report, warnings, textureCount, fbxByteLength }
 *
 * 供 meta3d-action-mod-unit-upload-model-file 调用（后续单元，不在本轮）。
 */
import * as THREE from 'three';
import type { UnzippedTripo } from './unzipTripoZip';
import { unzipTripoZip } from './unzipTripoZip';
import { loadFbx } from './loadFbx';
import { convertToMixamo } from './convertToMixamo';
import { exportFbx, countEmbeddedTextures } from './exportFbx';
import { loadOfficialRestPose } from './officialRestPose';
import type { ConvertReport } from '../bone_converter';

export type { UnzippedTripo } from './unzipTripoZip';
export { unzipTripoZip } from './unzipTripoZip';
export { loadFbx } from './loadFbx';
export { convertToMixamo } from './convertToMixamo';
export { exportFbx, countEmbeddedTextures } from './exportFbx';
export { loadOfficialRestPose } from './officialRestPose';
export { uint8ArrayToBase64, base64ToUint8Array } from './base64';

export interface UploadPipelineOptions {
    /** 官方骨架参考（默认用内置 lod2，传 null 可关闭 rest pose 对齐） */
    officialRestPose?: THREE.Object3D | null;
    /** 是否嵌入纹理（默认 true） */
    embedTextures?: boolean;
}

export interface UploadPipelineResult {
    /** 原始 fbx 文件名去扩展名 */
    fbxName: string;
    /** 最终产物：mixamo 骨骼 + 嵌入纹理的 ASCII FBX */
    fbxData: ArrayBuffer;
    /** convertTripoToMixamo 的转换报告 */
    report: ConvertReport;
    /** 汇总警告（报告 warnings + 管线自身警告） */
    warnings: string[];
    /** 嵌入的纹理数 */
    textureCount: number;
    /** 转换后 fbx 字节数（lod 大小校验用） */
    fbxByteLength: number;
}

export async function processTripoZip(
    zipBytes: ArrayBuffer,
    options: UploadPipelineOptions = {},
): Promise<UploadPipelineResult> {
    const warnings: string[] = [];

    // 1. 解压
    const unzipped: UnzippedTripo = await unzipTripoZip(zipBytes);

    // 2. 加载
    const obj = loadFbx(unzipped.fbxBytes);

    // 3. 转换（默认用内置官方 lod2 rest pose）
    const official =
        options.officialRestPose === null ? undefined : (options.officialRestPose ?? loadOfficialRestPose());
    const report = convertToMixamo(obj, official);
    warnings.push(...report.warnings);

    // 4. 导出 + 纹理嵌入
    const embedTextures = options.embedTextures ?? true;
    const textures = embedTextures ? unzipped.textures : new Map<string, Uint8Array>();
    const fbxData = exportFbx(obj, { textures });
    const textureCount = countEmbeddedTextures(obj, textures);

    if (textureCount === 0 && unzipped.textures.size > 0) {
        warnings.push(`纹理嵌入失败: 解压出 ${unzipped.textures.size} 个纹理但未能挂到材质`);
    }

    return {
        fbxName: unzipped.fbxName,
        fbxData,
        report,
        warnings,
        textureCount,
        fbxByteLength: fbxData.byteLength,
    };
}
