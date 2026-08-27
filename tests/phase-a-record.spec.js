const { test, expect } = require('@playwright/test');

test.setTimeout(150000);
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
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{}}});
  });
}

async function ready(page){
  await page.goto(URL,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__FARO_QA__?.ready===true&&window.__FARO_PHASE_A__?.version==='phase-a-2');
}

async function openFromAnotherLight(page){
  await page.locator('#beam').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const trigger=page.locator('#support-trigger');
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(page.locator('#copy-signal')).toBeVisible();
  await page.locator('#copy-signal').click();
  await expect(page.locator('#answer-event')).toHaveClass(/show/);
  await expect(page.locator('#phasea-answer-listen')).toContainText('YOU ARE NOT THE ONLY SIGNAL');
  await page.locator('#phasea-answer-listen').click();
  await expect(page.locator('#phasea-overlay')).toHaveClass(/open/);
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','listen');
}

test('Human route: Beam -> Signal -> Another Light -> Listening Room', async ({page})=>{
  await mockAudio(page);await ready(page);await openFromAnotherLight(page);
  await expect(page.locator('.listen-hero h2')).toContainText('SOMEONE IS SPEAKING');
  await expect(page.locator('#record-hero')).toContainText('RECORD YOUR SIGNAL');
  await expect(page.locator('.listen-orbits')).toContainText('PODCAST WORKSHOP');
  await expect(page.locator('.listen-orbits')).toContainText('LIGHTHOUSE RADIO');
  await expect(page.locator('#support-deck')).not.toHaveClass(/open/);
});

test('Record hero opens differentiated Recording Room and local recorder works', async ({page})=>{
  await mockAudio(page);await ready(page);
  await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await page.locator('#record-hero').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','record');
  await expect(page.locator('[data-mode="free"]')).toBeVisible();
  await page.locator('#phasea-start').click();
  await expect(page.locator('.phasea-status')).toContainText('SIGNAL IN PROGRESS');
  await page.locator('#phasea-pause').click();
  await expect(page.locator('.phasea-status')).toContainText('PAUSED');
  await page.locator('#phasea-pause').click();
  await page.locator('#phasea-finish').click();
  await expect(page.locator('.privacy-compass')).toBeVisible();
  await expect(page.locator('.privacy-compass button.on')).toContainText('PRIVATE');
  await expect(page.locator('#phasea-audio')).toHaveAttribute('src',/blob:/);
});

test('Rooms are visually and structurally distinct', async ({page})=>{
  await ready(page);await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await page.locator('[data-rnav="workshop"]').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','workshop');
  await expect(page.locator('.workshop-modes')).toContainText('CONVERSATION');
  await page.locator('[data-rnav="radio"]').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','radio');
  await expect(page.locator('.broadcast-console')).toBeVisible();
  await page.locator('[data-rnav="learn"]').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','learn');
  await expect(page.locator('.learning-route')).toContainText('LISTEN WITHOUT FIXING');
});

test('Voices room exposes podcast demos and Learn from this signal', async ({page})=>{
  await ready(page);await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await page.locator('[data-go="voices"]').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','voices');
  await expect(page.locator('.voice-sky')).toBeVisible();
  await expect(page.locator('.episode-card')).toHaveCount(3);
  await expect(page.locator('.episode-card').first()).toContainText('SYNTHETIC EDITORIAL DEMO');
  await page.locator('.learn-link').first().click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','learn');
});

test('Spanish copy and written fallback remain available', async ({page})=>{
  await mockAudio(page);await ready(page);
  await page.evaluate(()=>document.documentElement.lang='es');
  await page.waitForTimeout(150);
  await page.evaluate(()=>window.__FARO_PHASE_A__.open());
  await expect(page.locator('.listen-hero h2')).toContainText('ALGUIEN ESTÁ HABLANDO');
  await page.locator('#record-hero').click();
  await expect(page.locator('#phasea-start')).toContainText('EMPEZAR A GRABAR');
  await page.locator('#phasea-write').click();
  await expect(page.locator('#phasea-write-text')).toBeVisible();
  await expect(page.locator('#phasea-write-text')).toHaveAttribute('placeholder',/Escribe sólo/);
});

test('Back stays inside Another Light while X remains a full exit', async ({page})=>{
  await mockAudio(page);await ready(page);await openFromAnotherLight(page);
  const back=page.locator('#phasea-back');
  await expect(back).toBeVisible();
  await expect(back).toContainText('BACK TO ANOTHER STATION');

  await page.locator('#record-hero').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','record');
  await expect(back).toContainText('BACK TO LISTEN');
  await back.click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','listen');

  await page.locator('[data-go="voices"]').click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','voices');
  await page.locator('.learn-link').first().click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','learn');
  await expect(back).toContainText('BACK TO VOICES');
  await back.click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','voices');
  await back.click();
  await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','listen');

  await back.click();
  await expect(page.locator('#phasea-overlay')).not.toHaveClass(/open/);
  await expect(page.locator('#support-deck')).toHaveClass(/open/,{timeout:3000});
  await expect(page.locator('.station-chart-v2')).toBeVisible();

  await page.locator('.hero-doors [data-room="listen"]').click();
  await expect(page.locator('#phasea-overlay')).toHaveClass(/open/);
  await page.locator('#phasea-close').click();
  await expect(page.locator('#phasea-overlay')).not.toHaveClass(/open/);
  await expect(page.locator('#support-deck')).not.toHaveClass(/open/);
});