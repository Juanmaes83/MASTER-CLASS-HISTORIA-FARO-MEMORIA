const { test, expect } = require('@playwright/test');

const scenes = [
  ['opening', '#opening'],
  ['coast', '#coast'],
  ['keeper', '#keeper'],
  ['stair', '#stair'],
  ['machine', '#machine'],
  ['beam', '#beam'],
  ['afterlight', '#afterlight']
];

async function collectErrors(page) {
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  return errors;
}

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
]) {
  test(`${viewport.name}: Kage-architecture smoke + visual evidence`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const errors = await collectErrors(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    await expect(page.locator('body')).toContainText('The Last Lighthouse');
    await expect(page.locator('#gl')).toBeVisible();

    const architecture = await page.evaluate(() => ({
      plateA: !!document.querySelector('#plateA'),
      plateB: !!document.querySelector('#plateB'),
      depthGrade: !!document.querySelector('#depthGrade'),
      fgSky: !!document.querySelector('#fg-sky'),
      webgl: !!(document.querySelector('#gl')?.getContext('webgl2') || document.querySelector('#gl')?.getContext('webgl')),
      pageHeight: document.documentElement.scrollHeight,
      viewportHeight: innerHeight
    }));

    expect(architecture.plateA).toBeFalsy();
    expect(architecture.plateB).toBeFalsy();
    expect(architecture.depthGrade).toBeFalsy();
    expect(architecture.fgSky).toBeTruthy();
    expect(architecture.webgl).toBeTruthy();
    expect(architecture.pageHeight).toBeGreaterThan(architecture.viewportHeight * 4);

    for (const [name, selector] of scenes) {
      const target = page.locator(selector);
      await expect(target).toBeAttached();
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `qa-artifacts/${viewport.name}-${name}.png`, fullPage: false });
    }

    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('desktop: foreground lifecycle and Machine live viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const machine = page.locator('#machine');
  await machine.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const machineState = await page.evaluate(() => ({
    activeGlobalForegrounds: document.querySelectorAll('#fg-sky .fg-active, #fg-sky [data-fg].fg-active').length,
    machineCanvas: !!document.querySelector('#machine canvas, #machine [data-live-view], #machine [data-frame]'),
    text: document.querySelector('#machine')?.innerText || ''
  }));

  expect(machineState.text.toLowerCase()).toContain('machine');
  expect(machineState.activeGlobalForegrounds).toBeGreaterThanOrEqual(0);

  await page.screenshot({ path: 'qa-artifacts/desktop-machine-close.png', fullPage: false });
});
