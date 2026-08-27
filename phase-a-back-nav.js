(()=>{
'use strict';

let overlay=null;
let backButton=null;
let previousRoom=null;
let roomStack=[];
let suppressTracking=false;
let wasOpen=false;

const q=(s,r=document)=>r.querySelector(s);
const isEs=()=>document.documentElement.lang==='es';
const roomName=room=>({
  listen:isEs()?'LISTEN':'LISTEN',
  record:isEs()?'GRABACIÓN':'RECORD',
  workshop:isEs()?'TALLER':'WORKSHOP',
  voices:isEs()?'VOCES':'VOICES',
  radio:'RADIO',
  learn:isEs()?'APRENDER':'LEARN'
}[room]||String(room||'').toUpperCase());

function init(){
  overlay=q('#phasea-overlay');
  if(!overlay){setTimeout(init,80);return;}
  injectBackButton();
  injectStyles();
  new MutationObserver(syncNavigation).observe(overlay,{attributes:true,attributeFilter:['class','data-room']});
  new MutationObserver(updateLabel).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('keydown',e=>{
    if(e.altKey&&e.key==='ArrowLeft'&&overlay.classList.contains('open')){
      e.preventDefault();
      goBack();
    }
  });
  syncNavigation();
}

function injectBackButton(){
  const head=q('.phasea-head',overlay);
  if(!head||q('#phasea-back',head))return;
  backButton=document.createElement('button');
  backButton.id='phasea-back';
  backButton.className='phasea-back-nav';
  backButton.type='button';
  backButton.setAttribute('aria-label','Back');
  backButton.innerHTML='<span>←</span><b>BACK</b>';
  const nav=q('#phasea-nav',head);
  head.insertBefore(backButton,nav||q('#phasea-close',head));
  backButton.addEventListener('click',goBack);
}

function injectStyles(){
  if(q('#phasea-back-nav-style'))return;
  const style=document.createElement('style');
  style.id='phasea-back-nav-style';
  style.textContent=`
    .phasea-back-nav{display:inline-flex;align-items:center;gap:9px;min-height:36px;padding:0 13px;border:1px solid rgba(222,196,139,.26);background:rgba(5,9,12,.42);color:rgba(238,234,220,.78);font:600 9px/1 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:border-color .22s ease,background .22s ease,color .22s ease,transform .22s ease}
    .phasea-back-nav span{font-size:15px;line-height:1;color:#dec48b;transition:transform .22s ease}
    .phasea-back-nav:hover,.phasea-back-nav:focus-visible{outline:none;border-color:rgba(222,196,139,.72);background:rgba(222,196,139,.08);color:#f3eee2}
    .phasea-back-nav:hover span{transform:translateX(-3px)}
    .phasea-back-nav[hidden]{display:none!important}
    @media(max-width:760px){.phasea-back-nav{order:-1;min-height:34px;padding:0 10px;gap:7px;letter-spacing:.11em}.phasea-back-nav b{max-width:132px;overflow:hidden;text-overflow:ellipsis}}
  `;
  document.head.appendChild(style);
}

function syncNavigation(){
  const open=overlay.classList.contains('open');
  const room=overlay.dataset.room||'listen';

  if(open&&!wasOpen){
    roomStack=[];
    previousRoom=room;
  }else if(open&&room!==previousRoom){
    if(!suppressTracking&&previousRoom)roomStack.push(previousRoom);
    previousRoom=room;
  }else if(!open&&wasOpen){
    roomStack=[];
    previousRoom=null;
  }
  wasOpen=open;
  updateLabel();
}

function updateLabel(){
  if(!backButton||!overlay)return;
  const open=overlay.classList.contains('open');
  backButton.hidden=!open;
  if(!open)return;
  const target=roomStack[roomStack.length-1];
  if(target){
    backButton.querySelector('b').textContent=isEs()?`VOLVER A ${roomName(target)}`:`BACK TO ${roomName(target)}`;
    backButton.setAttribute('aria-label',isEs()?`Volver a ${roomName(target)}`:`Back to ${roomName(target)}`);
  }else{
    backButton.querySelector('b').textContent=isEs()?'VOLVER A OTRA ESTACIÓN':'BACK TO ANOTHER STATION';
    backButton.setAttribute('aria-label',isEs()?'Volver a Otra Estación':'Back to Another Station');
  }
}

function goBack(){
  if(!overlay?.classList.contains('open'))return;
  if(roomStack.length){
    const target=roomStack.pop();
    navigateTo(target);
    return;
  }
  returnToStations();
}

function navigateTo(target){
  const api=window.__FARO_PHASE_A__;
  if(!api)return;
  suppressTracking=true;

  if(target==='listen')api.open();
  else if(target==='record')api.openRecord();
  else if(target==='voices'){
    api.open();
    setTimeout(()=>q('#phasea-body [data-go="voices"]')?.click(),30);
  }else{
    q(`#phasea-nav [data-rnav="${target}"]`)?.click();
  }

  setTimeout(()=>{
    previousRoom=overlay.dataset.room||target;
    suppressTracking=false;
    updateLabel();
  },120);
}

function returnToStations(){
  suppressTracking=true;
  q('#phasea-close')?.click();
  setTimeout(()=>{
    suppressTracking=false;
    if(overlay.classList.contains('open')){
      // An unsaved local recording may intentionally keep the room open.
      previousRoom=overlay.dataset.room||previousRoom;
      updateLabel();
      return;
    }
    const support=q('#support-trigger');
    if(support){support.click();}
  },180);
}

document.addEventListener('DOMContentLoaded',init);
})();
