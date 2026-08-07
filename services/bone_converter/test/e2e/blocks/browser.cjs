/**
 * Block: browser（bone_converter 版 — 覆盖共享版）
 *
 * 在共享 browser 基础上追加 console.error 捕获（共享版只监听 pageerror + HTTP>=400）。
 * 供 assertNoErrors 断言「无 console 错误」。
 *
 * 参数：
 *   headless  - 是否无头模式（默认 false）
 *   viewport  - 视口尺寸 { width, height }
 *
 * ctx 注入：
 *   ctx.errors - 错误监控数组（pageerror + HTTP>=400 + console.error）
 */

const path = require('path');
const os = require('os');
const pwRoot = require('child_process').execSync('npm root -g', { encoding: 'utf8' }).trim();
const { chromium } = require(pwRoot + '/playwright');
const helpers = require('../e2e-helpers.cjs');

function tempUserDataDir(prefix) {
  return path.join(os.tmpdir(), (prefix || 'pw-e2e-') + Date.now() + '-' + Math.random().toString(36).slice(2, 8));
}

module.exports = {
  name: 'browser',
  deps: [],

  async run(ctx, params) {
    const headless = params.headless !== undefined ? params.headless : false;
    const viewport = params.viewport || { width: 1280, height: 900 };
    const prefix = ctx.userDataPrefix || 'pw-e2e-';

    helpers.killPlaywrightChrome();

    const udDir = tempUserDataDir(prefix);
    const context = await chromium.launchPersistentContext(udDir, {
      headless,
      viewport,
      args: ['--no-sandbox', ...helpers.CHROME_ARGS],
    });

    const page = context.pages()[0] || await context.newPage();
    helpers.setupErrorMonitor(page, 'E2E');

    const errors = [];
    page.on('pageerror', err => {
      errors.push(err.message);
      console.error(`[browser] ❌ pageerror: ${err.message}`);
    });
    page.on('response', response => {
      if (response.status() >= 400) {
        errors.push(`HTTP ${response.status()}: ${response.url().substring(0, 120)}`);
      }
    });
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // 过滤浏览器自带的 favicon 404 噪声（demo 无 favicon 引用时不触发，防误报）
        if (text.includes('favicon')) return;
        errors.push(`CONSOLE: ${text.substring(0, 200)}`);
        console.error(`[browser] ❌ console.error: ${text.substring(0, 200)}`);
      }
    });

    ctx.page = page;
    ctx.context = context;
    ctx.errors = errors;
    ctx.browser = true;

    console.log(`[browser] Launched chromium (headless=${headless}, ${viewport.width}x${viewport.height})`);
  },
};
