/**
 * Block: assertText（bone_converter 版）
 *
 * 断言页面 body 内包含指定文本
 *
 * 参数：
 *   text    - 要断言的文本（必填）
 *   exists  - true=必须存在, false=必须不存在（默认 true）
 *   timeout - 超时（毫秒，默认 10000）
 *
 * deps: ['browser']
 */

module.exports = {
  name: 'assertText',
  deps: ['browser'],

  async run(ctx, params) {
    const page = ctx.page;
    const text = params.text;
    const exists = params.exists !== false;
    const timeout = params.timeout || 10000;

    if (!text) throw new Error('[assertText] "text" parameter is required');

    if (exists) {
      try {
        await page.waitForFunction(
          (t) => document.body.innerText.includes(t),
          text,
          { timeout },
        );
        console.log(`[assertText] "${text}" exists=true \u2705`);
      } catch {
        throw new Error(`[assertText] "${text}" should exist but not found`);
      }
    } else {
      try {
        await page.waitForFunction(
          (t) => !document.body.innerText.includes(t),
          text,
          { timeout },
        );
        console.log(`[assertText] "${text}" exists=false \u2705`);
      } catch {
        throw new Error(`[assertText] "${text}" should NOT exist but found`);
      }
    }
  },
};
