/**
 * embed-asset.cjs — 把官方 lod2 骨架 FBX 转成 base64 内联 TS 文件
 *
 * 产物：src/tool/upload_pipeline/assets/lod2-base64.ts
 *   export const LOD2_FBX_BASE64 = "...";   // model_EliteGiantess10_lod2.fbx 的 base64
 *
 * 用途：webpack 打包兼容（无 fetch），运行时 decode + FBXLoader.parse 成 Object3D。
 * 运行：node scripts/embed-asset.cjs
 */
const fs = require('fs');
const path = require('path');

const SRC_FBX = path.join(
    __dirname,
    '..',
    'demo',
    'snapshot_EliteGiantess10',
    'model_EliteGiantess10_lod2.fbx',
);
const OUT_TS = path.join(__dirname, '..', 'src', 'tool', 'upload_pipeline', 'assets', 'lod2-base64.ts');

if (!fs.existsSync(SRC_FBX)) {
    console.error('embed-asset: 源 FBX 不存在: ' + SRC_FBX);
    process.exit(1);
}

const buf = fs.readFileSync(SRC_FBX);
const base64 = buf.toString('base64');

const header = [
    '/**',
    ' * lod2-base64.ts — 官方 lod2 骨架 model_EliteGiantess10_lod2.fbx 的 base64 内联资产',
    ' *',
    ' * 由 scripts/embed-asset.cjs 自动生成，禁止手改。运行时 decode + FBXLoader.parse 使用。',
    ' */',
    'export const LOD2_FBX_BASE64 =',
].join('\n');

// 把长 base64 拆成多行字符串数组 + join('')。
// ⚠️ 不能用连续 `"chunk" + "chunk" + ...`：数千次字符串拼接会生成深度嵌套的
// 二进制表达式 AST，ts-jest hoist-jest 转换时递归爆栈（Maximum call stack）。
// 数组字面量 + join 是平铺节点，安全。
const CHUNK = 200;
let chunks = [];
for (let i = 0; i < base64.length; i += CHUNK) {
    chunks.push('    "' + base64.slice(i, i + CHUNK) + '"');
}
const content = header + '\n[' + chunks.join(',\n') + '\n].join("");\n';

fs.mkdirSync(path.dirname(OUT_TS), { recursive: true });
fs.writeFileSync(OUT_TS, content, 'utf8');

console.log('embed-asset: 已生成 ' + OUT_TS);
console.log('  src bytes: ' + buf.length + '  base64 length: ' + base64.length);
