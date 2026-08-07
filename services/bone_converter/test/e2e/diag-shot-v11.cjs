// 实机复测截图 v3：捕获「转换后未播放」+「播放起始瞬间」状态
const pwRoot = require('child_process').execSync('npm root -g', { encoding: 'utf8' }).trim();
const { chromium } = require(pwRoot + '/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));

  await page.goto('http://localhost:8095/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // 1. 加载模型
  await page.click('#btn-load-model');
  await page.waitForFunction(() => !document.getElementById('btn-convert').disabled, null, { timeout: 60000 });
  await page.waitForTimeout(1000);

  // 2. 转换
  await page.click('#btn-convert');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'test/e2e/screenshots/v11-t-converted.png' });
  console.log('shot: 转换后未播放 (v11-t-converted)');

  // 3. 加载动画（内部 normalizeRootMotion → re-pose！此时骨骼被 re-pose 到动画帧，但未播放）
  await page.click('#btn-load-anim');
  await page.waitForFunction(() => !document.getElementById('btn-play').disabled, null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test/e2e/screenshots/v11-t-animloaded.png' });
  console.log('shot: 加载动画后未播放 (v11-t-animloaded)');

  // 4. 播放 + 起始瞬间连拍
  await page.click('#btn-play');
  for (const [tag, waitMs] of [['0', 100], ['1', 400], ['2', 800], ['3', 1500]]) {
    await page.waitForTimeout(waitMs);
    await page.screenshot({ path: `test/e2e/screenshots/v11-t-play${tag}.png` });
    console.log(`shot: 播放后 t≈${tag} (v11-t-play${tag})`);
  }

  console.log('console errors:', errors.length ? errors.join(' | ').slice(0, 600) : 'none');
  await browser.close();
})();
