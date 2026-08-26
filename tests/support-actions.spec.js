const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

const sceneIds = ['hero','coast','keeper','stair','machine','beam','afterlight'];

async function openStory(page){
  await page.goto('/storytelling.html',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(()=>window.__FARO_QA__?.ready===true,null,{timeout:20000});
  await page.waitForSelector('#support-trigger');
}

async function geometry(page){
  return page.evaluate((ids)=>({
    scrollHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    scenes: Object.fromEntries(ids.map(id=>{
      const el=document.getElementById(id);
      const r=el.getBoundingClientRect();
      return [id,{offsetTop:el.offsetTop,offsetHeight:el.offsetHeight,width:r.width,height:r.height}];
    })),
    supportInsidePage: !!document.querySelector('.page #support-trigger, .page #support-deck, .page #answer-light'),
    supportInsideSection: !!document.querySelector('.sec #support-trigger, .sec #support-deck, .sec #answer-light')
  }),sceneIds);
}

test('overlay regression gate: support layer never changes Faro geometry', async ({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await openStory(page);

  const before=await geometry(page);
  expect(before.supportInsidePage).toBeFalsy();
  expect(before.supportInsideSection).toBeFalsy();

  await page.locator('#support-trigger').click();
  await expect(page.locator('#support-deck')).toHaveClass(/open/);
  const open=await geometry(page);
  expect(open).toEqual(before);

  await page.locator('#support-close').click();
  await expect(page.locator('#support-deck')).not.toHaveClass(/open/);
  const closed=await geometry(page);
  expect(closed).toEqual(before);

  await page.evaluate(()=>window.scrollTo(0,document.getElementById('machine').offsetTop+300));
  await page.waitForTimeout(500);
  const scrolled=await geometry(page);
  expect(scrolled.scrollHeight).toBe(before.scrollHeight);
  expect(scrolled.bodyHeight).toBe(before.bodyHeight);
  for(const id of sceneIds){
    expect(scrolled.scenes[id].offsetTop).toBe(before.scenes[id].offsetTop);
    expect(scrolled.scenes[id].offsetHeight).toBe(before.scenes[id].offsetHeight);
  }
});

test('five support actions: EN flow + symbolic light + real stations', async ({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await openStory(page);
  await page.locator('#support-trigger').click();

  await expect(page.locator('#support-content')).toContainText('How is the weather inside?');
  await page.locator('[data-choice="fog"]').click();
  await expect(page.locator('.deck-result')).toContainText('next visible marker');

  await page.locator('[data-tab="1"]').click();
  await expect(page.locator('#support-content')).toContainText('Only the next one');
  await page.locator('[data-choice="tell"]').click();
  await expect(page.locator('.deck-result')).toContainText('I am having a hard time');

  await page.locator('[data-tab="2"]').click();
  await expect(page.locator('#support-content')).toContainText('You do not have to tell the whole story');
  await page.locator('[data-signal="listen"]').click();
  await expect(page.locator('.signal-template')).toContainText('Could you listen for a while?');
  await page.locator('#copy-signal').click();
  await expect(page.locator('#answer-light')).toHaveClass(/on/);

  await page.locator('[data-tab="3"]').click();
  await expect(page.locator('#support-content')).toContainText('The second light is symbolic');

  await page.locator('[data-tab="4"]').click();
  const stations=page.locator('#support-content');
  await expect(stations).toContainText('717 003 717');
  await expect(stations).toContainText('965 131 122');
  await expect(stations).toContainText('965 112 125');
  await expect(stations).toContainText('024');
  await expect(stations).toContainText('112');
});

test('five support actions: mobile ES + no horizontal geometry break', async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  await openStory(page);
  const before=await geometry(page);

  await page.locator('[data-lang="es"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang','es');
  await page.locator('#support-trigger').click();
  await expect(page.locator('#support-content')).toContainText('¿Qué tiempo hace por dentro?');

  await page.locator('[data-tab="1"]').click();
  await expect(page.locator('#support-content')).toContainText('No todo el viaje');
  await page.locator('[data-tab="2"]').click();
  await expect(page.locator('#support-content')).toContainText('No tienes que contar toda la historia');
  await page.locator('[data-tab="4"]').click();
  await expect(page.locator('#support-content')).toContainText('Teléfono de la Esperanza');
  await expect(page.locator('#support-content')).toContainText('Proyecto Hombre');

  const after=await geometry(page);
  expect(after.scrollHeight).toBe(before.scrollHeight);
  expect(after.bodyHeight).toBe(before.bodyHeight);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
  expect(overflow).toBeFalsy();
});
