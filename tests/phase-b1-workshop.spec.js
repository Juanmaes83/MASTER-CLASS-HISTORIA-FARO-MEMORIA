const {test,expect}=require('@playwright/test');
test.setTimeout(180000);
const URL='http://127.0.0.1:4173/storytelling.html';

async function mockAudio(page){
 await page.addInitScript(()=>{
  const track={stop(){}};const stream={getTracks(){return[track]}};
  Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:async()=>stream}});
  class FakeRecorder{
   static isTypeSupported(){return true}
   constructor(s,o={}){this.stream=s;this.mimeType=o.mimeType||'audio/webm';this.state='inactive';this.ondataavailable=null;this.onstop=null}
   start(){this.state='recording'} pause(){this.state='paused'} resume(){this.state='recording'}
   stop(){if(this.state==='inactive')return;this.state='inactive';this.ondataavailable?.({data:new Blob(['b1-audio'],{type:this.mimeType})});this.onstop?.()}
  }
  Object.defineProperty(window,'MediaRecorder',{configurable:true,value:FakeRecorder});
 });
}
async function ready(page){await page.goto(URL,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.__FARO_QA__?.ready===true&&window.__FARO_PHASE_A__?.version==='phase-a-2'&&window.__FARO_PHASE_B1__?.version==='phase-b1-1',{timeout:60000})}
async function workshop(page){await page.evaluate(()=>window.__FARO_PHASE_A__.open());await page.locator('[data-rnav="workshop"]').click();await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','workshop');await expect(page.locator('.b1-home')).toBeVisible()}
async function recordGuidedLight(page){await page.locator('#b1-record-guided').click();await expect(page.locator('#b1-stop-guided')).toBeVisible();await page.locator('#b1-stop-guided').click();await expect(page.locator('.b1-clip-ready')).toBeVisible()}

test('B1 workshop home clearly exposes Solo Guided Conversation Group',async({page})=>{await mockAudio(page);await ready(page);await workshop(page);await expect(page.locator('.b1-modes button')).toHaveCount(4);await expect(page.locator('.b1-modes')).toContainText('SOLO');await expect(page.locator('.b1-modes')).toContainText('GUIDED');await expect(page.locator('.b1-modes')).toContainText('CONVERSATION');await expect(page.locator('.b1-modes')).toContainText('GROUP')});

test('Solo reuses the approved local Recording Room',async({page})=>{await mockAudio(page);await ready(page);await workshop(page);await page.locator('[data-b1="solo"]').click();await expect(page.locator('#phasea-overlay')).toHaveAttribute('data-room','record');await expect(page.locator('.record-room')).toBeVisible();await expect(page.locator('#phasea-start')).toBeVisible()});

test('Guided records four local lights and reaches story review',async({page})=>{await mockAudio(page);await ready(page);await workshop(page);await page.locator('[data-b1="guided"]').click();for(let i=0;i<4;i++){await expect(page.locator('.b1-prompt-stage')).toContainText(`LIGHT 0${i+1} / 04`);await recordGuidedLight(page);if(i<3)await page.locator('#b1-next').click();}await page.locator('#b1-next').click();await expect(page.locator('.b1-review')).toBeVisible();await expect(page.locator('.four-lights article')).toHaveCount(4);await expect(page.locator('.four-lights audio')).toHaveCount(4);await expect(page.locator('.b1-review h2')).toContainText('YOUR STORY HAS FOUR LIGHTS')});

test('Conversation uses two lights, turn cues and creates one local shared review',async({page})=>{await mockAudio(page);await ready(page);await workshop(page);await page.locator('[data-b1="conversation"]').click();await expect(page.locator('.two-lights .person')).toHaveCount(2);await page.locator('#b1-start-conversation').click();await expect(page.locator('.b1-session-top')).toContainText('RECORDING LOCALLY');await expect(page.locator('.turn-card')).toContainText('VOICE A');await page.locator('#b1-next-turn').click();await expect(page.locator('.turn-card')).toContainText('VOICE B');await page.locator('#b1-finish-shared').click();await expect(page.locator('.b1-review.shared')).toBeVisible();await expect(page.locator('.shared-player audio')).toHaveAttribute('src',/blob:/);await expect(page.locator('.b1-review h2')).toContainText('THE CONVERSATION STAYS HERE')});

test('Group configures 4-8 participants, theme, prompts and local shared recording',async({page})=>{await mockAudio(page);await ready(page);await workshop(page);await page.locator('[data-b1="group"]').click();await page.locator('[data-size="4"]').click();await page.locator('[data-theme="listen"]').click();await expect(page.locator('.group-constellation .g')).toHaveCount(4);await page.locator('#b1-start-group').click();await expect(page.locator('.group-prompt')).toContainText('LISTEN');await expect(page.locator('.group-prompt')).toContainText('1/4');await page.locator('#b1-next-group').click();await expect(page.locator('.group-prompt')).toContainText('2/4');await page.locator('#b1-finish-shared').click();await expect(page.locator('.b1-review.shared')).toBeVisible();await expect(page.locator('.b1-review h2')).toContainText('THE ROOM HAS SPOKEN');await expect(page.locator('.shared-player audio')).toHaveAttribute('src',/blob:/)});

test('Spanish B1 copy and internal back to workshop remain available',async({page})=>{await mockAudio(page);await ready(page);await page.evaluate(()=>document.documentElement.lang='es');await page.waitForTimeout(100);await workshop(page);await expect(page.locator('.b1-home h2')).toContainText('UN LUGAR PARA HABLAR');await page.locator('[data-b1="guided"]').click();await expect(page.locator('.b1-guided h2')).toContainText('CUATRO LUCES');await page.locator('#b1-back').click();await expect(page.locator('.b1-home')).toBeVisible();await expect(page.locator('.b1-modes')).toContainText('CONVERSACIÓN')});