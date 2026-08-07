/**
 * Block: assertNoErrors（bone_converter 版）
 *
 * 断言浏览器监控未捕获到任何错误（pageerror / HTTP>=400 / console.error）
 *
 * 参数：
 *   ignorePatterns - 字符串数组，匹配到的错误行不报错（默认无）
 *
 * deps: ['browser']
 */

module.exports = {
  name: 'assertNoErrors',
  deps: ['browser'],

  async run(ctx, params) {
    const ignorePatterns = params.ignorePatterns || [];
    const errors = ctx.errors || [];

    const filtered = errors.filter((err) => !ignorePatterns.some((p) => err.includes(p)));

    if (filtered.length > 0) {
      console.error(`[assertNoErrors] 检测到 ${filtered.length} 个页面错误:`);
      for (const err of filtered) {
        console.error(`  ${err}`);
      }
      throw new Error(`[assertNoErrors] 页面存在错误（${filtered.length} 个）`);
    }

    console.log(`[assertNoErrors] ✅ 无页面错误（共监控 ${errors.length} 条，全部通过）`);
  },
};
