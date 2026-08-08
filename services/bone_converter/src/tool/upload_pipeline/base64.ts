/**
 * base64.ts — Uint8Array ↔ base64 手写转换（浏览器兼容，不依赖 Node Buffer）
 *
 * 参考方案 §9：exportFbx 的纹理嵌入 / officialRestPose 的 lod2 解码都用它。
 * 实现用纯字符串 + charCode 运算，webpack 打包无 polyfill 负担。
 */

const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/** Uint8Array → base64 字符串 */
export function uint8ArrayToBase64(bytes: Uint8Array): string {
    let result = '';
    const len = bytes.length;
    for (let i = 0; i < len; i += 3) {
        const b0 = bytes[i];
        const b1 = i + 1 < len ? bytes[i + 1] : 0;
        const b2 = i + 2 < len ? bytes[i + 2] : 0;
        result += BASE64_ALPHABET[b0 >> 2];
        result += BASE64_ALPHABET[((b0 & 0x03) << 4) | (b1 >> 4)];
        result += i + 1 < len ? BASE64_ALPHABET[((b1 & 0x0f) << 2) | (b2 >> 6)] : '=';
        result += i + 2 < len ? BASE64_ALPHABET[b2 & 0x3f] : '=';
    }
    return result;
}

/**
 * base64 字符串 → Uint8Array（容忍空白字符）
 * B8：遇到未知字符（含 URL-safe 变体 -/_）不再静默跳过——静默 continue 会丢数据，
 * 直接抛错暴露问题。
 */
export function base64ToUint8Array(b64: string): Uint8Array {
    const lookup: Record<string, number> = {};
    for (let i = 0; i < 64; i++) lookup[BASE64_ALPHABET[i]] = i;

    const clean = b64.replace(/[\s\r\n]/g, '');
    const out: number[] = [];
    let buffer = 0;
    let bits = 0;
    for (let i = 0; i < clean.length; i++) {
        const c = clean[i];
        if (c === '=') break;
        const val = lookup[c];
        if (val === undefined) throw new Error('invalid base64 char: ' + c);
        buffer = (buffer << 6) | val;
        bits += 6;
        if (bits >= 8) {
            bits -= 8;
            out.push((buffer >> bits) & 0xff);
        }
    }
    return new Uint8Array(out);
}
