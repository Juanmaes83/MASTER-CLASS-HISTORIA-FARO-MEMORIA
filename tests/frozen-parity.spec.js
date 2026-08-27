const { test, expect } = require('@playwright/test');
const fs=require('fs');

test.setTimeout(180000);
const BASE='http://127.0.0.1:4174/storytelling.html';
const SUPPORT='http://127.0.0.1:4173/storytelling.html';
const ids=['hero','coast','keeper','stair','machine','beam','afterlight'];
const positions=[0,.2,.4,.6,.8,1];

async function ready(page,url){await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForFunction(()=>window.__FARO_QA__?.ready===true,null,{timeout:20000});await page.waitForTimeout(700)}
async function metrics(page){return page.evaluate(ids=>({scrollHeight:document.documentElement.scrollHeight,bodyHeight:document.body.scrollHeight,clientWidth:document.documentElement.clientWidth,canvas:{w:document.querySelector('#gl').clientWidth,h:document.querySelector('#gl').clientHeight},scenes:Object.fromEntries(ids.map(id=>{const e=document.getElementById(id),r=e.getBoundingClientRect();return[id,{offsetTop:e.offsetTop,offsetHeight:e.offsetHeight,width:r.width,height:r.height}]})),runtime:window.__FARO_QA__}),ids)}
async function gotoPct(page,p){await page.evaluate(p=>{const max=document.documentElement.scrollHeight-innerHeight;scrollTo(0,Math.round(max*p))},p);await page.waitForTimeout(850)}

for(const viewport of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
 test(`${viewport.name}: frozen main geometry equals Support and capture 0/20/40/60/80/100`,async({browser})=>{
  fs.mkdirSync('qa-artifacts/frozen-parity',{recursive:true});
  const a=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}}),b=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  await ready(a,BASE);await ready(b,SUPPORT);
  const ma=await metrics(a),mb=await metrics(b);
  expect(mb.scrollHeight).toBe(ma.scrollHeight);expect(mb.bodyHeight).toBe(ma.bodyHeight);expect(mb.canvas).toEqual(ma.canvas);
  for(const id of ids){expect(mb.scenes[id].offsetTop).toBe(ma.scenes[id].offsetTop);expect(mb.scenes[id].offsetHeight).toBe(ma.scenes[id].offsetHeight);expect(mb.scenes[id].width).toBe(ma.scenes[id].width);expect(mb.scenes[id].height).toBe(ma.scenes[id].height)}
  expect(mb.runtime.world).toBe(ma.runtime.world);expect(mb.runtime.plates).toBe(ma.runtime.plates);expect(mb.runtime.registered).toBe(ma.runtime.registered);
  for(const p of positions){await gotoPct(a,p);await gotoPct(b,p);const tag=String(Math.round(p*100)).padStart(3,'0');await a.screenshot({path:`qa-artifacts/frozen-parity/${viewport.name}-${tag}-FROZEN.png`});await b.screenshot({path:`qa-artifacts/frozen-parity/${viewport.name}-${tag}-SUPPORT.png`});const sa=await a.evaluate(()=>({y:scrollY,active:[...document.querySelectorAll('#rail button')].findIndex(x=>x.classList.contains('on'))}));const sb=await b.evaluate(()=>({y:scrollY,active:[...document.querySelectorAll('#rail button')].findIndex(x=>x.classList.contains('on'))}));expect(sb.y).toBe(sa.y);expect(sb.active).toBe(sa.active)}
  await a.close();await b.close();
 })
}
