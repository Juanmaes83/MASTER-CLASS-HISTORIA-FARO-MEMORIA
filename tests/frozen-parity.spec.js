const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.setTimeout(240000);

const BASE = 'http://127.0.0.1:4174/storytelling.html';
const SUPPORT = 'http://127.0.0.1:4173/storytelling.html';
const ids = ['hero', 'coast', 'keeper', 'stair', 'machine', 'beam', 'afterlight'];
const positions = [0, 0.2, 0.4, 0.6, 0.8, 1];

async function ready(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForFunction(() => window.__FARO_QA__?.ready === true, null, { timeout: 60000 });
  await page.waitForTimeout(500);
}

async function metrics(page) {
  return page.evaluate((sceneIds) => ({
    scrollHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    clientWidth: document.documentElement.clientWidth,
    canvas: {
      w: document.querySelector('#gl').clientWidth,
      h: document.querySelector('#gl').clientHeight,
    },
    scenes: Object.fromEntries(sceneIds.map((id) => {
      const el = document.getElementById(id);
      const rect = el.getBoundingClientRect();
      return [id, {
        offsetTop: el.offsetTop,
        offsetHeight: el.offsetHeight,
        width: rect.width,
        height: rect.height,
      }];
    })),
    runtime: window.__FARO_QA__,
  }), ids);
}

async function captureRun(browser, url, viewport, label) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  await ready(page, url);
  const m = await metrics(page);
  const states = [];

  for (const p of positions) {
    await page.evaluate((pct) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollTo(0, Math.round(max * pct));
    }, p);
    await page.waitForTimeout(650);

    const tag = String(Math.round(p * 100)).padStart(3, '0');
    await page.screenshot({ path: `qa-artifacts/frozen-parity/${viewport.name}-${tag}-${label}.png` });

    states.push(await page.evaluate(() => ({
      y: scrollY,
      active: [...document.querySelectorAll('#rail button')].findIndex((x) => x.classList.contains('on')),
    })));
  }

  await page.close();
  return { m, states };
}

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`${viewport.name}: frozen main geometry equals Support and capture 0/20/40/60/80/100`, async ({ browser }) => {
    fs.mkdirSync('qa-artifacts/frozen-parity', { recursive: true });

    const frozen = await captureRun(browser, BASE, viewport, 'FROZEN');
    const support = await captureRun(browser, SUPPORT, viewport, 'SUPPORT');
    const ma = frozen.m;
    const mb = support.m;

    expect(mb.scrollHeight).toBe(ma.scrollHeight);
    expect(mb.bodyHeight).toBe(ma.bodyHeight);
    expect(mb.canvas).toEqual(ma.canvas);

    for (const id of ids) {
      expect(mb.scenes[id].offsetTop).toBe(ma.scenes[id].offsetTop);
      expect(mb.scenes[id].offsetHeight).toBe(ma.scenes[id].offsetHeight);
      expect(mb.scenes[id].width).toBe(ma.scenes[id].width);
      expect(mb.scenes[id].height).toBe(ma.scenes[id].height);
    }

    expect(mb.runtime.world).toBe(ma.runtime.world);
    expect(mb.runtime.plates).toBe(ma.runtime.plates);

    for (let i = 0; i < positions.length; i += 1) {
      expect(support.states[i].y).toBe(frozen.states[i].y);
      expect(support.states[i].active).toBe(frozen.states[i].active);
    }
  });
}
