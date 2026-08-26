const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

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

async function openSite(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);
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
      await target.evaluate(el => window.scrollTo({ top: el.offsetTop + Math.min(el.offsetHeight * .22, 500), behavior: 'instant' }));
      await page.waitForTimeout(700);
      await page.screenshot({ path: `qa-artifacts/${viewport.name}-${name}.png`, fullPage: false, animations: 'disabled' });
    }

    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('desktop: foreground lifecycle and Machine live viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openSite(page);

  await page.locator('#machine').evaluate(el => window.scrollTo({ top: el.offsetTop + innerHeight * .65, behavior: 'instant' }));
  await page.waitForTimeout(1500);

  const machineState = await page.evaluate(() => ({
    activeGlobalForegrounds: document.querySelectorAll('#fg-sky .fg-active, #fg-sky [data-fg].fg-active').length,
    noFullScreenPlates: !document.querySelector('#plateA, #plateB, #depthGrade'),
    text: document.querySelector('#machine')?.innerText || '',
    webgl: !!(document.querySelector('#gl')?.getContext('webgl2') || document.querySelector('#gl')?.getContext('webgl'))
  }));

  expect(machineState.text.toLowerCase()).toContain('machine');
  expect(machineState.noFullScreenPlates).toBeTruthy();
  expect(machineState.webgl).toBeTruthy();

  await page.screenshot({ path: 'qa-artifacts/desktop-machine-close.png', fullPage: false, animations: 'disabled' });
});
