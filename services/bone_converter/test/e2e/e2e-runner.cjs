/**
 * E2E 积木式组合测试 Runner（bone_converter 版 — 薄封装）
 *
 * 委托给共享 e2e-runner-lib.cjs，注入 bone_converter 专属配置。
 *
 * 用法：
 *   node e2e-runner.cjs <scenario.json>
 *   （默认 scenarios/d1-demo-load.json）
 *
 * 退出码：0（通过） / 1（失败）
 */

const path = require('path');
const { runScenario } = require('../../../../packages/meta3d-commonlib-ts/src/e2e/e2e-runner-lib.cjs');
const helpers = require('./e2e-helpers.cjs');

const args = process.argv.slice(2);
const scenarioArg = args.find((a) => !a.startsWith('--')) || 'scenarios/d1-demo-load.json';
const env = 'local';

runScenario({
  scenarioPath: path.resolve(__dirname, scenarioArg),
  env,
  projectBlocksDir: path.join(__dirname, 'blocks'),
  resolveUrl: (ctx, url) => helpers.resolveUrl(ctx, url),
  screenshotsDir: path.join(__dirname, 'screenshots'),
  userDataPrefix: 'pw-boneconverter-',
}).then((code) => process.exit(code)).catch((e) => { console.error(e); process.exit(1); });
