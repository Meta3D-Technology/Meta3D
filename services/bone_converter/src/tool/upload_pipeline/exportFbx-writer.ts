/**
 * exportFbx-writer.ts — ASCII FBX 输出写入器与格式化工具
 *
 * 从 exportFbx.ts 拆出的公共层（B10 超长文件拆分）：
 *   - FbxWriter：行缓存 + 缩进写入器（begin/end/prop/arrayProp/p70）
 *   - fmt/nums/numsOf/str/fbxFileName：数字与字符串格式化
 *   - ExportFbxOptions / textureFileNameOf / resolveTexture：材质→纹理解析与兜底
 *
 * 对外 API（exportFbx / countEmbeddedTextures）仍由 exportFbx.ts 提供，index.ts 引用不变。
 */
import * as THREE from 'three';

export interface ExportFbxOptions {
    /** 纹理文件名 → 字节。非空时嵌入 Video/Texture 节点；为空则导出无纹理 FBX */
    textures?: Map<string, Uint8Array>;
}

/** 单个输出节点写入器（行缓存 + 缩进） */
export class FbxWriter {
    lines: string[] = [];
    private indent = 0;

    begin(name: string, header = ''): void {
        this.lines.push('\t'.repeat(this.indent) + `${name}:${header ? ' ' + header : ''} {`);
        this.indent++;
    }

    end(): void {
        this.indent--;
        this.lines.push('\t'.repeat(this.indent) + '}');
    }

    prop(name: string, value: string): void {
        this.lines.push('\t'.repeat(this.indent) + `${name}: ${value}`);
    }

    /** 数字数组属性：`a: v1,v2,...`（单行，无尾逗号，TextParser 直接 parseNumberArray） */
    arrayProp(name: string, values: number[]): void {
        this.lines.push('\t'.repeat(this.indent) + `${name}: *${values.length} {`);
        this.indent++;
        this.lines.push('\t'.repeat(this.indent) + `a: ${values.map((n) => fmt(n)).join(',')}`);
        this.indent--;
        this.lines.push('\t'.repeat(this.indent) + '}');
    }

    /** P 属性（Properties70 专用，对齐 parseNodeSpecialProperty 的解析） */
    p70(name: string, type1: string, type2: string, flag: string, value: string): void {
        this.lines.push(`\t`.repeat(this.indent) + `P: "${name}", "${type1}", "${type2}", "${flag}",${value}`);
    }

    toString(): string {
        return this.lines.join('\n') + '\n';
    }
}

/**
 * 数字格式：整数原样；浮点保留最多 7 位小数并去尾零（对齐 parseFloat 解析）。
 * 微小非零值（|n| < 1e-6）走科学计数法兜底（toExponential(7)，parseFloat 兼容），
 * 避免 toFixed(7) 把如 1e-8 输出成 "0.0000000" → 去零后 "0" 而丢符号丢精度
 * （骨骼变换近 0 的位置/旋转值不能归零，否则影响蒙皮精度）。
 */
export function fmt(n: number): string {
    if (!Number.isFinite(n)) return '0';
    if (Number.isInteger(n)) return String(n);
    if (Math.abs(n) < 1e-6 && n !== 0) return n.toExponential(7);
    let s = n.toFixed(7);
    s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s;
}

/** 数字数组 → 逗号分隔字符串（同时用于 Properties70 的 Vector/Color 值） */
export function nums(arr: number[]): string {
    return arr.map((n) => fmt(n)).join(',');
}

/** 属性数组 → 逗号分隔字符串（layer element 数值） */
export function numsOf(arr: ArrayLike<number>, start: number, end: number): number[] {
    const out: number[] = [];
    for (let i = start; i < end; i++) out.push(arr[i]);
    return out;
}

/** 安全字符串：转义 `\` 与 `"`，中文字符保留 UTF-8（节点名/attrName 用） */
export function str(s: string): string {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * 文件名字段（FileName/RelativeFilename）专用转义：只转义双引号，不转义反斜杠。
 * FBXLoader TextParser 的 parseNodeProperty 只剥首尾引号、不做任何反转义
 * （FBXLoader.js:3297 `propValue = property[2].replace(/^"/,'').replace(/"$/,'')`），
 * 若套用 str() 会把路径中的 `\` 转成 `\\` 再读回，文件名多出一个反斜杠（双重转义，
 * parseImages 以 RelativeFilename 为 key 关联 blob 时失真）。
 */
export function fbxFileName(s: string): string {
    return s.replace(/"/g, '\\"');
}

/** 从材质取纹理文件名（优先 material.map 名/路径；失败返回 null 走兜底） */
export function textureFileNameOf(mat: THREE.Material): string | null {
    const map = (mat as THREE.MeshStandardMaterial).map;
    if (!map) return null;
    const img = (map as { image?: { src?: string } }).image;
    const src = img?.src;
    if (src) {
        const base = src.split(/[\\/]/).pop();
        if (base) return base;
    }
    const name = (map as { name?: string }).name;
    return name && name.includes('.') ? name : null;
}

/** 收集一个材质要嵌入的纹理：优先 map 命中；否则取 textures 第一个（兜底，保证模型有贴图） */
export function resolveTexture(
    mat: THREE.Material,
    textures: Map<string, Uint8Array>,
    fallbackUsed: boolean,
): { name: string; bytes: Uint8Array; usedFallback: boolean } | null {
    if (!textures || textures.size === 0) return null;
    const want = textureFileNameOf(mat);
    if (want) {
        for (const [name, bytes] of textures) {
            if (name.toLowerCase() === want.toLowerCase() || want.toLowerCase().endsWith(name.toLowerCase())) {
                return { name, bytes, usedFallback: false };
            }
        }
    }
    if (!fallbackUsed) {
        const first = textures.entries().next().value as [string, Uint8Array] | undefined;
        if (first) return { name: first[0], bytes: first[1], usedFallback: true };
    }
    return null;
}
