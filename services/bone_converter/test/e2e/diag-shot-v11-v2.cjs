// 实机复测截图 v2：只截 #viewport 渲染区（人物更大）+ 3 相机角度（正面/右侧/左前特写）+ 原图 PNG 不降质
const pwRoot = require('child_process').execSync('npm root -g', { encoding: 'utf8' }).trim();
const { chromium } = require(pwRoot + '/playwright');

const CAMERAS = {
  front: { pos: [0, 1.5, 2.7], target: [0, 0.95, 0] },   // 正面拉近
  side: { pos: [2.9, 1.5, 0], target: [0, 0.95, 0] },     // 右侧拉近
  arm: { pos: [-2.2, 1.3, 1.9], target: [0, 0.9, 0] },   // 左前特写拉近（看肘部/前臂）
};

async function getCameras(page) {
  // 动态取模型中心（bbox），距离固定 2
  const c = await page.evaluate(() => {
    const b = window.__MODEL_BBOX__ && window.__MODEL_BBOX__();
    return b ? b.center : null;
  });
  const t = c ? [c[0], c[1], c[2]] : [0, 0.95, 0];
  return {
    front: { pos: [t[0], t[1], t[2] + 2], target: t },
    side: { pos: [t[0] + 2, t[1], t[2]], target: t },
    arm: { pos: [t[0] - 1.5, t[1] + 0.3, t[2] + 1.3], target: t },
  };
}

async function shot(page, name) {
  await page.waitForTimeout(500); // 等相机/渲染稳定
  const vp = page.locator('#viewport');
  await vp.screenshot({ path: `test/e2e/screenshots/v11-v2-${name}.png` });
  console.log(`shot: ${name}`);
}

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
  let CAMERAS = await getCameras(page);
  for (const [tag, cam] of Object.entries(CAMERAS)) {
    await page.evaluate(([p, t]) => window.__SET_CAMERA__(p, t), [cam.pos, cam.target]);
    await shot(page, `converted-${tag}`);
  }

  // 3. 加载动画（animloaded：re-pose 生效、mixer 未驱动）
  await page.click('#btn-load-anim');
  await page.waitForFunction(() => !document.getElementById('btn-play').disabled, null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  CAMERAS = await getCameras(page);
  for (const [tag, cam] of Object.entries(CAMERAS)) {
    await page.evaluate(([p, t]) => window.__SET_CAMERA__(p, t), [cam.pos, cam.target]);
    await shot(page, `animloaded-${tag}`);
  }

  // 4. 播放 + 起始瞬间（play0 ~0.1s）
  await page.click('#btn-play');
  await page.waitForTimeout(100);
  CAMERAS = await getCameras(page);
  for (const [tag, cam] of Object.entries(CAMERAS)) {
    await page.evaluate(([p, t]) => window.__SET_CAMERA__(p, t), [cam.pos, cam.target]);
    await shot(page, `play0-${tag}`);
  }

  console.log('console errors:', errors.length ? errors.join(' | ').slice(0, 600) : 'none');
  await browser.close();
})();
