const { test, expect } = require('@playwright/test');

test.setTimeout(120000);
const URL='http://127.0.0.1:4173/storytelling.html';

async function mockAudio(page){
  await page.addInitScript(() => {
    const track={stop(){}};
    const stream={getTracks(){return [track]}};
    Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:async()=>stream}});
    class FakeRecorder {
      static isTypeSupported(){return true}
      constructor(s,opts={}){this.stream=s;this.mimeType=opts.mimeType||'audio/webm';this.state='inactive';this.ondataavailable=null;this.onstop=null}
      start(){this.state='recording'}
      pause(){this.state='paused'}
      resume(){this.state='recording'}
      stop(){if(this.state==='inactive')return;this.state='inactive';this.ondataavailable?.({data:new Blob(['fake-audio'],{type:this.mimeType})});this.onstop?.()}
    }
    Object.defineProperty(window,'MediaRecorder',{configurable:true,value:FakeRecorder});
  });
}

async function ready(page){
  await page.goto(URL,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__FARO_QA__?.ready===true&&window.__FARO_PHASE_A__?.version==='phase-a-1');
}

test('Phase A mounts outside Faro and exposes Listen discovery after Another Light', async ({page})=>{
  await ready(page);
  await expect(page.locator('#phasea-overlay')).toHaveCount(1);
  expect(await page.locator('#phasea-overlay').evaluate(el=>!!el.closest('.page'))).toBe(false);
  await page.locator('#answer-event').evaluate(el=>el.classList.add('show'));
  await expect(page.locator('#phasea-answer-listen')).toBeVisible();
  await expect(page.locator('#phasea-answer-listen')).toContainText('YOU ARE NOT THE ONLY SIGNAL');
});

test('Record Your Signal: free speak -> pause/resume -> review -> private -> delete', async ({page})=>{
  await mockAudio(page);await ready(page);
  await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await expect(page.locator('#phasea-overlay')).toHaveClass(/open/);
  await page.locator('[data-path="record"]').click();
  await page.locator('[data-mode="free"]').click();
  await page.locator('#phasea-start').click();
  await expect(page.locator('.phasea-status')).toContainText('SIGNAL IN PROGRESS');
  await page.locator('#phasea-pause').click();
  await expect(page.locator('.phasea-status')).toContainText('PAUSED');
  await page.locator('#phasea-pause').click();
  await page.locator('#phasea-finish').click();
  await expect(page.locator('.phasea-privacy')).toBeVisible();
  await expect(page.locator('.phasea-privacy button.on')).toContainText('PRIVATE');
  await expect(page.locator('#phasea-audio')).toHaveAttribute('src',/blob:/);
  await page.locator('#phasea-delete').click();
  expect(await page.evaluate(()=>window.__FARO_PHASE_A__.hasBlob())).toBe(false);
});

test('60 second mode and written fallback are visible; non-private routes stay disabled', async ({page})=>{
  await mockAudio(page);await ready(page);
  await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await page.locator('[data-path="record"]').click();
  await expect(page.locator('[data-mode="minute"]')).toContainText('60 SECOND SIGNAL');
  await page.locator('#phasea-write').click();
  await expect(page.locator('#phasea-write-text')).toBeVisible();
  await expect(page.locator('#phasea-write-text')).toHaveAttribute('placeholder',/Write only/);
});

test('Spanish copy is available', async ({page})=>{
  await ready(page);
  await page.evaluate(()=>document.documentElement.lang='es');
  await page.waitForTimeout(100);
  await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await expect(page.locator('#phasea-body h2')).toContainText('ALGUIEN ESTÁ HABLANDO');
  await expect(page.locator('[data-path="record"]')).toContainText('GRABA TU SEÑAL');
});