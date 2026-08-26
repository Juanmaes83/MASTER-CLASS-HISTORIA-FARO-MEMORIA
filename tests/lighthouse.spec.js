const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.setTimeout(240000);

const scenes = [
  ['opening', 'hero'],
  ['coast', 'coast'],
  ['keeper', 'keeper'],
  ['stair', 'stair'],
  ['machine', 'machine'],
  ['beam', 'beam'],
  ['afterlight', 'afterlight']
];

async function collectErrors(page) {
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  return errors;
}

async function openSite(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(() => window.__FARO_QA__?.ready === true, null, { timeout: 20000 });
  await page.waitForTimeout(1200);
}

async function captureViewport(cdp, path) {
  const shot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false
  });
  fs.writeFileSync(path, Buffer.from(shot.data, 'base64'));
}

async function jumpToScene(page, id, offsetFactor = .22) {
  const result = await page.evaluate(({ id, offsetFactor }) => {
    const el = document.getElementById(id);
    if (!el) return { ok: false, id };
    const y = el.offsetTop + Math.min(el.offsetHeight * offsetFactor, 500);
    window.scrollTo(0, y);
    return { ok: true, id, y };
  }, { id, offsetFactor });
  expect(result.ok, `Missing scene #${id}`).toBeTruthy();
}

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
]) {
  test(`${viewport.name}: Kage-architecture smoke + visual evidence`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const errors = await collectErrors(page);
    await openSite(page);

    await expect(page.locator('body')).toContainText(/THE LAST LIGHTHOUSE/i);
    await expect(page.locator('#gl')).toBeVisible();

    const architecture = await page.evaluate(() => ({
      plateA: !!document.querySelector('#plateA'),
      plateB: !!document.querySelector('#plateB'),
      depthGrade: !!document.querySelector('#depthGrade'),
      fgSky: !!document.querySelector('#fg-sky'),
      webgl: !!(document.querySelector('#gl')?.getContext('webgl2') || document.querySelector('#gl')?.getContext('webgl')),
      runtime: window.__FARO_QA__,
      pageHeight: document.documentElement.scrollHeight,
      viewportHeight: innerHeight
    }));

    expect(architecture.plateA).toBeFalsy();
    expect(architecture.plateB).toBeFalsy();
    expect(architecture.depthGrade).toBeFalsy();
    expect(architecture.fgSky).toBeTruthy();
    expect(architecture.webgl).toBeTruthy();
    expect(String(architecture.runtime?.world || '')).toMatch(/^single-webgl/);
    expect(architecture.runtime?.plates).toBe(false);
    expect(architecture.runtime?.registered).toBe(true);
    expect(architecture.pageHeight).toBeGreaterThan(architecture.viewportHeight * 4);

    fs.mkdirSync('qa-artifacts', { recursive: true });
    const cdp = await page.context().newCDPSession(page);
    try {
      for (const [name, id] of scenes) {
        await jumpToScene(page, id);
        await page.waitForTimeout(800);
        await captureViewport(cdp, `qa-artifacts/${viewport.name}-${name}.png`);
      }
    } finally {
      await cdp.detach().catch(() => {});
    }

    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('desktop: foreground lifecycle and Machine live viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openSite(page);

  await jumpToScene(page, 'machine', .65);
  await page.waitForTimeout(1400);

  const machineState = await page.evaluate(() => ({
    activeGlobalForegrounds: document.querySelectorAll('#fg-sky .fg-active, #fg-sky [data-fg].fg-active').length,
    noFullScreenPlates: !document.querySelector('#plateA, #plateB, #depthGrade'),
    text: document.querySelector('#machine')?.innerText || '',
    runtime: window.__FARO_QA__,
    webgl: !!(document.querySelector('#gl')?.getContext('webgl2') || document.querySelector('#gl')?.getContext('webgl'))
  }));

  expect(machineState.text.toLowerCase()).toContain('machine');
  expect(machineState.noFullScreenPlates).toBeTruthy();
  expect(machineState.webgl).toBeTruthy();
  expect(machineState.runtime?.ready).toBeTruthy();

  fs.mkdirSync('qa-artifacts', { recursive: true });
  const cdp = await page.context().newCDPSession(page);
  try {
    await captureViewport(cdp, 'qa-artifacts/desktop-machine-close.png');
  } finally {
    await cdp.detach().catch(() => {});
  }
});
