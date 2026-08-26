const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

async function openStory(page){
  await page.goto('/storytelling.html',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(()=>window.__FARO_QA__?.ready===true,null,{timeout:20000});
  await page.waitForSelector('#weather-inside');
}

test('storytelling support actions: EN flow, symbolic answer, real stations', async ({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await openStory(page);
  await expect(page.locator('#weather-inside')).toContainText('How is the weather inside?');
  await page.locator('#weather-inside [data-value="fog"]').click();
  await expect(page.locator('#weather-inside .sa-result')).toContainText('next visible marker');
  await page.locator('#one-step [data-value="tell"]').click();
  await expect(page.locator('#one-step .sa-result')).toContainText('one sentence');
  await page.locator('#send-signal [data-value="listen"]').click();
  await expect(page.locator('#send-signal .signal-template')).toContainText('Could you listen for a while?');
  await page.locator('#send-signal [data-copy]').click();
  await expect(page.locator('#answer-light')).toHaveClass(/on/);
  await expect(page.locator('#answer-symbolic')).toHaveClass(/show/);
  await expect(page.locator('#another-station')).toContainText('717 003 717');
  await expect(page.locator('#another-station')).toContainText('965 112 125');
  await expect(page.locator('#another-station')).toContainText('024');
  await expect(page.locator('#another-station')).toContainText('112');
});

test('storytelling support actions: ES switch translates actions', async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  await openStory(page);
  await page.locator('[data-lang="es"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang','es');
  await expect(page.locator('#weather-inside')).toContainText('¿Qué tiempo hace por dentro?');
  await expect(page.locator('#one-step')).toContainText('No todo el viaje. Sólo el siguiente.');
  await expect(page.locator('#send-signal')).toContainText('ENVIAR UNA SEÑAL');
  await expect(page.locator('#another-station')).toContainText('No tienes que navegar a solas.');
  await expect(page.locator('#another-station')).toContainText('Teléfono de la Esperanza');
  await expect(page.locator('#another-station')).toContainText('Proyecto Hombre');
});
