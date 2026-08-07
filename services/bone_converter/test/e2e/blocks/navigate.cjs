/**
 * Block: navigate（bone_converter 版）
 *
 * 导航到 demo 页面（http://localhost:8094）
 *
 * 参数：
 *   path  - 路径（如 "/"）
 *   url   - 完整 URL（可选，覆盖 resolveUrl）
 *
 * deps: ['browser']
 */

const helpers = require('../e2e-helpers.cjs');

module.exports = {
  name: 'navigate',
  deps: ['browser'],

  async run(ctx, params) {
    const page = ctx.page;
    const baseUrl = helpers.resolveUrl(ctx, params.url);
    const url = params.path ? baseUrl + params.path : baseUrl;
    console.log(`[navigate] Going to ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await helpers.sleep(2000);
  },
};
