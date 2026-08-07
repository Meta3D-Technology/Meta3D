// 数值探针：读取各时刻骨骼世界旋转/位置，输出精确角度（替代视觉估计）
const pwRoot = require('child_process').execSync('npm root -g', { encoding: 'utf8' }).trim();
const { chromium } = require(pwRoot + '/playwright');

const QUAT = `(function () {
  // 纯矩阵数学：从 matrixWorld.elements 提取 euler/worldPos/faceDir（不依赖 THREE 类）
  function euler(bone) {
    const m = bone.matrixWorld.elements;
    const m11 = m[0], m12 = m[4], m13 = m[8];
    const m21 = m[1], m22 = m[5], m23 = m[9];
    const m31 = m[2], m32 = m[6], m33 = m[10];
    let x, y, z;
    y = Math.asin(Math.max(-1, Math.min(1, m13)));
    if (Math.abs(m13) < 0.9999999) {
      x = Math.atan2(-m23, m33);
      z = Math.atan2(-m12, m11);
    } else {
      x = Math.atan2(m32, m22);
      z = 0;
    }
    return [x, y, z].map(v => +(v * 180 / Math.PI).toFixed(2));
  }
  function worldPos(bone) {
    const m = bone.matrixWorld.elements;
    return [+m[12].toFixed(4), +m[13].toFixed(4), +m[14].toFixed(4)];
  }
  function faceDir(bone) {
    // 骨骼局部 -Z 的世界方向（面部方向候选）
    const m = bone.matrixWorld.elements;
    return [-m[8], -m[9], -m[10]].map(v => +v.toFixed(3));
  }
  function find(root, name) {
    let found = null;
    root.traverse(o => { if (o.name === name && !found) found = o; });
    return found;
  }
  return { euler, worldPos, faceDir, find };
})()`;

async function snapshot(page, tag) {
  const data = await page.evaluate(({ code, tag }) => {
    const api = eval(code);
    const root = window.__ANIM_MIXER__ ? window.__ANIM_MIXER__.getRoot() : null;
    const out = { tag, hasRoot: !!root };
    if (!root) return out;
    const names = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head',
      'LeftArm', 'LeftForeArm', 'LeftHand', 'RightArm', 'RightForeArm', 'RightHand',
      'LeftUpLeg', 'LeftLeg', 'LeftFoot', 'LeftToeBase', 'RightUpLeg', 'RightLeg', 'RightFoot', 'RightToeBase'];
    const fullNames = names.map(n => 'mixamorig' + n);
    out.bones = {};
    for (let i = 0; i < names.length; i++) {
      const n = names[i];
      const b = api.find(root, fullNames[i]);
      if (!b) { out.bones[n] = null; continue; }
      out.bones[n] = { euler: api.euler(b), pos: api.worldPos(b), faceDir: api.faceDir(b) };
    }
    // 脚底 Y：LeftFoot/RightFoot 世界 Y（脚踝）与 ToeBase Y（脚掌）
    out.footY = {};
    for (const n of ['LeftFoot', 'RightFoot', 'LeftToeBase', 'RightToeBase']) {
      if (out.bones[n]) out.footY[n] = out.bones[n].pos[1];
    }
    // 大腿-小腿-脚掌段夹角（膝/踝弯曲）
    function segAngle(p1, p2, p3) {
      // 向量 p1->p2 与 p2->p3 的夹角
      const v1 = [p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2]];
      const v2 = [p3[0]-p2[0], p3[1]-p2[1], p3[2]-p2[2]];
      const dot = v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];
      const m1 = Math.sqrt(v1[0]**2+v1[1]**2+v1[2]**2), m2 = Math.sqrt(v2[0]**2+v2[1]**2+v2[2]**2);
      const ang = Math.acos(Math.max(-1, Math.min(1, dot/(m1*m2)))) * 180 / Math.PI;
      return +ang.toFixed(2);
    }
    out.elbow = {};
    if (out.bones['LeftArm'] && out.bones['LeftForeArm'] && out.bones['LeftHand']) {
      out.elbow.left = segAngle(out.bones['LeftArm'].pos, out.bones['LeftForeArm'].pos, out.bones['LeftHand'].pos);
    }
    if (out.bones['RightArm'] && out.bones['RightForeArm'] && out.bones['RightHand']) {
      out.elbow.right = segAngle(out.bones['RightArm'].pos, out.bones['RightForeArm'].pos, out.bones['RightHand'].pos);
    }
    // 膝/踝弯曲：大腿-小腿-脚掌段夹角
    out.knee = {};
    if (out.bones['LeftUpLeg'] && out.bones['LeftLeg'] && out.bones['LeftFoot']) {
      out.knee.left = segAngle(out.bones['LeftUpLeg'].pos, out.bones['LeftLeg'].pos, out.bones['LeftFoot'].pos);
    }
    if (out.bones['RightUpLeg'] && out.bones['RightLeg'] && out.bones['RightFoot']) {
      out.knee.right = segAngle(out.bones['RightUpLeg'].pos, out.bones['RightLeg'].pos, out.bones['RightFoot'].pos);
    }
    return out;
  }, { code: QUAT, tag });
  return data;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
  await page.goto('http://localhost:8095/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  await page.click('#btn-load-model');
  await page.waitForFunction(() => !document.getElementById('btn-convert').disabled, null, { timeout: 60000 });
  await page.waitForTimeout(1000);
  await page.click('#btn-convert');
  await page.waitForTimeout(3000);
  const converted = await snapshot(page, 'converted');

  await page.click('#btn-load-anim');
  await page.waitForFunction(() => !document.getElementById('btn-play').disabled, null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  const animloaded = await snapshot(page, 'animloaded');

  await page.click('#btn-play');
  await page.waitForTimeout(150);
  const play0 = await snapshot(page, 'play0');
  const fs = require('fs');
  fs.writeFileSync('test/e2e/probe-angles-v11.json', JSON.stringify({ converted, animloaded, play0 }, null, 1));
  console.log('saved probe-angles-v11.json');

  console.log('console errors:', errors.length ? errors.join(' | ').slice(0, 400) : 'none');
  await browser.close();
})();
