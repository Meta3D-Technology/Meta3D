/**
 * unzipTripoZip.ts — 用 jszip 解压 tripo 模型压缩包
 *
 * tripo 压缩包结构：
 *   xxx.fbx                     （binary FBX，唯一）
 *   xxx.fbm/<纹理文件名>         （.fbm 目录下的外部纹理，如 动漫女孩3d模型_basecolor.PNG）
 *
 * 返回 UnzippedTripo：
 *   fbxName    原始 fbx 文件名去扩展名
 *   fbxBytes   fbx 字节（Uint8Array）
 *   textures   文件名 → 字节 的 Map（key 含扩展名，如 "动漫女孩3d模型_basecolor.PNG"）
 */
import * as JSZip from 'jszip';

export interface UnzippedTripo {
    fbxName: string;
    fbxBytes: Uint8Array;
    textures: Map<string, Uint8Array>;
}

/** 常见图片扩展名（纹理导出时 FBXLoader parseImage 支持 png/jpg/jpeg/bmp/tif/tiff/tga） */
const TEXTURE_EXT_RE = /\.(png|jpg|jpeg|bmp|tif|tiff|tga)$/i;

/**
 * 解压 tripo zip。zip 内必须至少有一个 .fbx 文件，否则抛错。
 * 纹理收集 .fbm 目录下的图片文件；其他目录的图片也按文件名兜底收集（不要求路径含 .fbm）。
 */
export async function unzipTripoZip(zipBytes: ArrayBuffer): Promise<UnzippedTripo> {
    const zip = await JSZip.loadAsync(zipBytes);
    const entries = Object.values(zip.files);

    const fbxEntries = entries.filter((e) => !e.dir && /\.fbx$/i.test(e.name));
    if (fbxEntries.length === 0) {
        throw new Error('unzipTripoZip: zip 中未找到 .fbx 文件');
    }

    const fbxEntry = fbxEntries[0];
    const fbxBytes = new Uint8Array(await fbxEntry.async('arraybuffer'));
    const fbxName = fbxEntry.name.split(/[\\/]/).pop()!.replace(/\.fbx$/i, '');

    const textures = new Map<string, Uint8Array>();
    for (const e of entries) {
        if (e.dir) continue;
        const lower = e.name.toLowerCase();
        const isFbmTexture = lower.includes('.fbm') && TEXTURE_EXT_RE.test(e.name);
        // B4：standalone 图片排除 .fbm 路径，避免与 .fbm 目录下同名纹理重复收集
        // （Map.set 后者覆盖前者导致纹理字节错配）
        const isStandaloneImage =
            TEXTURE_EXT_RE.test(e.name) && !/\.fbx$/i.test(e.name) && !lower.includes('.fbm');
        if (!isFbmTexture && !isStandaloneImage) continue;
        const fileName = e.name.split(/[\\/]/).pop()!;
        if (!fileName) continue;
        textures.set(fileName, new Uint8Array(await e.async('arraybuffer')));
    }

    return { fbxName, fbxBytes, textures };
}
