/**
 * Block: click（bone_converter 版）
 *
 * 点击页面元素（按 CSS 选择器，用 evaluate 触发）
 *
 * 参数：
 *   selector - CSS 选择器（如 "#btn-load-model"）
 *   timeout  - 等待元素出现超时（毫秒，默认 10000）
 *
 * deps: ['browser']
 */

module.exports = {
  name: 'click',
  deps: ['browser'],

  async run(ctx, params) {
    const page = ctx.page;
    const selector = params.selector;
    const timeout = params.timeout || 10000;

    if (!selector) throw new Error('click requires "selector" parameter');

    await page.waitForSelector(selector, { timeout, state: 'visible' });

    const clicked = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      el.click();
      return true;
    }, selector);

    if (!clicked) throw new Error(`Element not found: ${selector}`);
    console.log(`[click] Clicked selector "${selector}"`);
  },
};
