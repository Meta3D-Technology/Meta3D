/**
 * Block: screenshot（bone_converter 本地覆盖版）
 *
 * 截取当前页面截图，保存到 ctx.screenshotsDir
 *
 * 参数（按优先级）：
 *   name         - 截图文件名（不含扩展名）
 *   element      - 可选，CSS 选择器，只截该元素（如 "#viewport"，最可靠）
 *   clipViewport - 可选，true 时用 page.evaluate 读 #viewport 的 getBoundingClientRect() 动态计算 clip，不写死
 *   clip         - 可选，{ x, y, width, height }，直接指定截图区域（viewport 偏移）
 *   fullPage     - 可选，是否全页截图（默认 false）
 *
 * deps: ['browser']
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'screenshot',
  deps: ['browser'],

  async run(ctx, params) {
    const page = ctx.page;
    const name = params.name || `screenshot-${Date.now()}`;
    const fullPage = params.fullPage || false;
    const element = params.element;
    const clipViewport = params.clipViewport;
    const clip = params.clip;
    const dir = ctx.screenshotsDir || path.join(__dirname, '..', 'screenshots');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${name}.png`);

    if (element) {
      // 只截指定元素（优先，最可靠）
      await page.locator(element).screenshot({ path: filePath });
    } else if (clipViewport) {
      // 动态读 #viewport 的 getBoundingClientRect 计算 clip，不写死
      const rect = await page.evaluate(() => {
        const el = document.querySelector('#viewport');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      });
      if (!rect) {
        throw new Error('[screenshot] #viewport not found for clipViewport');
      }
      await page.screenshot({ path: filePath, clip: rect });
    } else if (clip) {
      await page.screenshot({ path: filePath, clip });
    } else {
      await page.screenshot({ path: filePath, fullPage });
    }
    console.log(`[screenshot] Saved ${filePath}`);
  },
};
