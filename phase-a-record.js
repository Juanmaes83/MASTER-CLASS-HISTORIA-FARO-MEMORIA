(()=>{
'use strict';

const COPY={
 en:{
  discoveryK:'02 · LISTEN',discoveryH:'YOU ARE NOT THE ONLY SIGNAL.',discoveryC:'LISTEN TO ANOTHER LIGHT →',
  listenK:'02 · LISTEN',listenH:'SOMEONE IS SPEAKING.',listenI:'Listen to another signal — or use this room to say something out loud yourself.',
  story:'LISTEN TO A STORY',storyS:'Voices, perspectives and future authorised testimonies.',record:'RECORD YOUR SIGNAL',recordS:'A private first recording. Nothing is sent.',session:'JOIN A SESSION',sessionS:'Podcast workshops and conversations.',radio:'LIGHTHOUSE RADIO',radioS:'Live / voices / sessions.',
  recK:'RECORD YOUR SIGNAL',recH:"You don't have to know what to call it.",recI:'Start by telling the story. Nothing is being sent.',
  free:'FREE SPEAK',freeS:'Take your time. Finish when you are ready.',minute:'60 SECOND SIGNAL',minuteS:'One minute. One thought. A first signal.',guided:'GUIDED',guidedS:'Prompts to help you begin — next phase.',long:'LONG FORM',longS:'A longer structured story — next phase.',
  start:'START RECORDING',micReady:'MICROPHONE READY',requesting:'REQUESTING MICROPHONE…',recording:'SIGNAL IN PROGRESS',paused:'PAUSED',pause:'PAUSE',resume:'RESUME',finish:'FINISH',remaining:'seconds remain',
  denied:'Microphone access was not granted. Nothing has been recorded.',unsupported:'This browser cannot record audio here.',device:'The microphone could not be started.',retry:'TRY AGAIN',write:'I’D RATHER WRITE',return:'RETURN',
  reviewK:'YOUR SIGNAL IS HERE.',reviewI:'This recording has not been sent anywhere.',play:'PLAY',again:'RECORD AGAIN',del:'DELETE',keep:'KEEP THIS SIGNAL',download:'DOWNLOAD SIGNAL',
  privacyH:'WHO SHOULD HEAR THIS SIGNAL?',private:'PRIVATE — ONLY ME',privateS:'The recording stays in this browser session unless you download it.',association:'ASSOCIATION ONLY',associationS:'Coming with institutional partnership.',anonymous:'ANONYMOUS PUBLIC',anonymousS:'Not active in this prototype.',public:'PUBLIC',publicS:'Not active in this prototype.',
  said:'You said it out loud. That can be a first step.',downloaded:'Signal downloaded. Faro still has not sent it anywhere.',
  writeH:'START WITH ONE SENTENCE.',writeI:'If speaking does not feel right, writing can still be a signal.',placeholder:'Write only what you want to say…',copy:'COPY TEXT',copied:'COPIED',
  leaveH:'YOUR SIGNAL ONLY EXISTS HERE.',leaveI:'Leaving this room will remove the recording from memory unless you download it.',stay:'STAY',leaveDownload:'DOWNLOAD',deleteLeave:'DELETE & LEAVE',
  storyH:'VOICES FROM THE LIGHTHOUSE',storyI:'The editorial library will contain authorised stories from people, relatives, professionals and people still finding their way. No invented testimony is published.',
  sessionH:'LIGHTHOUSE PODCAST WORKSHOP',sessionI:'The purpose is not audience. The purpose is conversation: Solo, Guided, Conversation and Group.',
  radioH:'LIGHTHOUSE RADIO',radioI:'A technical demo proves that live audio can work here. Final editorial streams and programmes will be selected with partners.',
  back:'← BACK TO LISTEN'
 },
 es:{
  discoveryK:'02 · LISTEN',discoveryH:'NO ERES LA ÚNICA SEÑAL.',discoveryC:'ESCUCHAR OTRA LUZ →',
  listenK:'02 · LISTEN',listenH:'ALGUIEN ESTÁ HABLANDO.',listenI:'Escucha otra señal — o utiliza esta sala para decir algo en voz alta tú mismo.',
  story:'ESCUCHAR UNA HISTORIA',storyS:'Voces, perspectivas y futuros testimonios autorizados.',record:'GRABA TU SEÑAL',recordS:'Una primera grabación privada. No se envía nada.',session:'ÚNETE A UNA SESIÓN',sessionS:'Talleres de podcast y conversaciones.',radio:'LIGHTHOUSE RADIO',radioS:'Directo / voces / sesiones.',
  recK:'GRABA TU SEÑAL',recH:'No tienes que saber cómo llamarlo.',recI:'Empieza contando la historia. No se está enviando nada.',
  free:'HABLAR LIBREMENTE',freeS:'Tómate tu tiempo. Termina cuando estés preparado.',minute:'SEÑAL DE 60 SEGUNDOS',minuteS:'Un minuto. Una idea. Una primera señal.',guided:'GUIADO',guidedS:'Preguntas que ayudan a empezar — siguiente fase.',long:'FORMATO LARGO',longS:'Una historia estructurada más larga — siguiente fase.',
  start:'EMPEZAR A GRABAR',micReady:'MICRÓFONO PREPARADO',requesting:'SOLICITANDO MICRÓFONO…',recording:'SEÑAL EN CURSO',paused:'PAUSA',pause:'PAUSAR',resume:'CONTINUAR',finish:'TERMINAR',remaining:'segundos restantes',
  denied:'No se concedió acceso al micrófono. No se ha grabado nada.',unsupported:'Este navegador no puede grabar audio aquí.',device:'No se pudo iniciar el micrófono.',retry:'INTENTAR DE NUEVO',write:'PREFIERO ESCRIBIR',return:'VOLVER',
  reviewK:'TU SEÑAL ESTÁ AQUÍ.',reviewI:'Esta grabación no se ha enviado a ningún sitio.',play:'REPRODUCIR',again:'VOLVER A GRABAR',del:'BORRAR',keep:'CONSERVAR ESTA SEÑAL',download:'DESCARGAR SEÑAL',
  privacyH:'¿QUIÉN DEBE ESCUCHAR ESTA SEÑAL?',private:'PRIVADO — SÓLO YO',privateS:'La grabación permanece en esta sesión del navegador salvo que la descargues.',association:'SÓLO ASOCIACIÓN',associationS:'Disponible cuando exista colaboración institucional.',anonymous:'PÚBLICO ANÓNIMO',anonymousS:'No activo en este prototipo.',public:'PÚBLICO',publicS:'No activo en este prototipo.',
  said:'Lo has dicho en voz alta. Eso puede ser un primer paso.',downloaded:'Señal descargada. Faro sigue sin haberla enviado a ningún sitio.',
  writeH:'EMPIEZA CON UNA FRASE.',writeI:'Si hablar no te encaja ahora, escribir también puede ser una señal.',placeholder:'Escribe sólo lo que quieras decir…',copy:'COPIAR TEXTO',copied:'COPIADO',
  leaveH:'TU SEÑAL SÓLO EXISTE AQUÍ.',leaveI:'Salir de esta sala eliminará la grabación de la memoria salvo que la descargues.',stay:'QUEDARME',leaveDownload:'DESCARGAR',deleteLeave:'BORRAR Y SALIR',
  storyH:'VOCES DESDE EL FARO',storyI:'La biblioteca editorial contendrá historias autorizadas de personas, familiares, profesionales y personas todavía en proceso. No se publican testimonios inventados.',
  sessionH:'LIGHTHOUSE PODCAST WORKSHOP',sessionI:'El objetivo no es la audiencia. El objetivo es la conversación: Solo, Guided, Conversation y Group.',
  radioH:'LIGHTHOUSE RADIO',radioI:'Una demo técnica demuestra que el audio en directo puede funcionar aquí. Los streams y programas editoriales finales se elegirán con los colaboradores.',
  back:'← VOLVER A LISTEN'
 }
};

let overlay,body,discovery,stream=null,recorder=null,chunks=[],blob=null,blobUrl=null,mode='free',startedAt=0,timerId=null,elapsedBeforePause=0,downloaded=false,pendingClose=false;
const q=(s,r=document)=>r.querySelector(s);
const lang=()=>document.documentElement.lang==='es'?'es':'en';
const c=()=>COPY[lang()];

function init(){
 injectShell();
 observeAnswer();
 observeSupport();
 setInterval(updateDiscovery,700);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))requestClose()});
 window.addEventListener('beforeunload',e=>{if(blob&&!downloaded){e.preventDefault();e.returnValue=''}});
 window.__FARO_PHASE_A__={version:'phase-a-1',open:openListen,hasBlob:()=>!!blob,recording:()=>recorder?.state==='recording'||recorder?.state==='paused',mode:()=>mode};
}

function injectShell(){
 document.body.insertAdjacentHTML('beforeend',`
 <button id="phasea-discovery" class="phasea-discovery" type="button" hidden><span></span><b></b><i></i></button>
 <aside id="phasea-overlay" class="phasea-overlay" aria-hidden="true">
   <div class="phasea-head"><span>THE LAST LIGHTHOUSE · LISTEN</span><button type="button" id="phasea-close" aria-label="Close">×</button></div>
   <div id="phasea-body" class="phasea-body"></div>
 </aside>`);
 overlay=q('#phasea-overlay');body=q('#phasea-body');discovery=q('#phasea-discovery');
 discovery.onclick=openListen;q('#phasea-close').onclick=requestClose;
}

function observeAnswer(){
 const ans=q('#answer-event');if(!ans)return;
 new MutationObserver(()=>{
  if(!ans.classList.contains('show'))return;
  const copy=q('#answer-copy');if(!copy||q('#phasea-answer-listen',copy))return;
  const btn=document.createElement('button');btn.id='phasea-answer-listen';btn.className='phasea-answer-listen';btn.type='button';btn.innerHTML=`<small>${c().discoveryK}</small><b>${c().discoveryH}</b><span>${c().discoveryC}</span>`;
  btn.onclick=()=>{q('#answer-return')?.click();setTimeout(openListen,120)};
  copy.appendChild(btn);
 }).observe(ans,{attributes:true,attributeFilter:['class']});
}

function observeSupport(){
 const root=q('#support-content');if(!root)return;
 new MutationObserver(()=>{
  if(window.__FARO_SUPPORT_QA__?.activeAction?.()!=='listen')return;
  if(q('.phasea-listen-gateway',root))return;
  const gateway=document.createElement('section');gateway.className='phasea-listen-gateway';gateway.innerHTML=`<span>${c().discoveryH}</span><h4>${c().listenH}</h4><div><button type="button" data-pa="story"><b>${c().story}</b><small>${c().storyS}</small></button><button type="button" data-pa="record" class="primary"><b>${c().record}</b><small>${c().recordS}</small></button><button type="button" data-pa="session"><b>${c().session}</b><small>${c().sessionS}</small></button><button type="button" data-pa="radio"><b>${c().radio}</b><small>${c().radioS}</small></button></div>`;
  root.prepend(gateway);
  gateway.querySelector('[data-pa="record"]').onclick=openRecord;
  gateway.querySelector('[data-pa="story"]').onclick=()=>openInfo('story');
  gateway.querySelector('[data-pa="session"]').onclick=()=>openInfo('session');
  gateway.querySelector('[data-pa="radio"]').onclick=()=>{q('.radio-console',root)?.scrollIntoView({behavior:'smooth',block:'center'})};
 }).observe(root,{childList:true,subtree:false});
}

function updateDiscovery(){
 if(!discovery)return;
 const qa=window.__FARO_SUPPORT_QA__;
 const seen=qa?.answerSeen?.()===true;
 const section=qa?.currentSection?.();
 const blocked=q('#support-deck')?.classList.contains('open')||q('#answer-event')?.classList.contains('show')||overlay.classList.contains('open');
 const show=seen&&section==='afterlight'&&!blocked;
 discovery.hidden=!show;
 if(show){discovery.querySelector('span').textContent=c().discoveryK;discovery.querySelector('b').textContent=c().discoveryH;discovery.querySelector('i').textContent=c().discoveryC}
}

function openOverlay(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.documentElement.classList.add('phasea-locked');discovery.hidden=true}
function closeOverlay(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.documentElement.classList.remove('phasea-locked');pendingClose=false;updateDiscovery()}

function openListen(){stopCapture(false);openOverlay();body.innerHTML=`<div class="phasea-k">${c().listenK}</div><h2>${c().listenH}</h2><p class="phasea-lead">${c().listenI}</p><div class="phasea-paths"><button data-path="story"><i></i><b>${c().story}</b><small>${c().storyS}</small><span>01</span></button><button data-path="record" class="hero"><i></i><b>${c().record}</b><small>${c().recordS}</small><span>02</span></button><button data-path="session"><i></i><b>${c().session}</b><small>${c().sessionS}</small><span>03</span></button><button data-path="radio"><i></i><b>${c().radio}</b><small>${c().radioS}</small><span>04</span></button></div><p class="phasea-privacy-line">PRIVATE BY DEFAULT · NO AUDIO UPLOAD IN PHASE A</p>`;
 body.querySelector('[data-path="record"]').onclick=openRecord;body.querySelector('[data-path="story"]').onclick=()=>openInfo('story');body.querySelector('[data-path="session"]').onclick=()=>openInfo('session');body.querySelector('[data-path="radio"]').onclick=()=>openInfo('radio')}

function openInfo(type){openOverlay();const map={story:[c().storyH,c().storyI],session:[c().sessionH,c().sessionI],radio:[c().radioH,c().radioI]},x=map[type];body.innerHTML=`<div class="phasea-k">02 · LISTEN</div><h2>${x[0]}</h2><p class="phasea-lead">${x[1]}</p>${type==='session'?'<div class="phasea-workshop-map"><span>SOLO</span><span>GUIDED</span><span>CONVERSATION</span><span>GROUP</span></div>':''}${type==='story'?'<div class="phasea-voice-map"><span>I’VE BEEN THE LIGHTHOUSE</span><span>I’VE SEEN THE SIGNAL</span><span>I ANSWER SIGNALS</span><span>I’M STILL FINDING MY WAY</span></div>':''}${type==='radio'?'<div class="phasea-radio-map"><span>LIVE</span><span>VOICES</span><span>SESSIONS</span><b>ADD YOUR SIGNAL →</b></div>':''}<button class="phasea-back" type="button">${c().back}</button>`;q('.phasea-back',body).onclick=openListen}

function openRecord(){stopCapture(false);openOverlay();mode='free';renderModeSelect()}
function renderModeSelect(){body.innerHTML=`<div class="phasea-k">${c().recK}</div><h2>${c().recH}</h2><p class="phasea-lead">${c().recI}</p><div class="phasea-record-modes"><button data-mode="free" class="on"><b>${c().free}</b><small>${c().freeS}</small></button><button data-mode="minute"><b>${c().minute}</b><small>${c().minuteS}</small></button><button disabled><b>${c().guided}</b><small>${c().guidedS}</small></button><button disabled><b>${c().long}</b><small>${c().longS}</small></button></div><div class="phasea-record-start"><div class="mic-orbit"><i></i><b></b></div><button id="phasea-start" type="button">${c().start}</button><button id="phasea-write" type="button">${c().write}</button><small>LOCAL SESSION · NO SERVER STORAGE</small></div><button class="phasea-back" type="button">${c().back}</button>`;
 body.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;body.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('on',x===b))});q('#phasea-start').onclick=startRecording;q('#phasea-write').onclick=renderWrite;q('.phasea-back',body).onclick=openListen}

function supportedMime(){const list=['audio/webm;codecs=opus','audio/webm','audio/mp4'];return list.find(x=>window.MediaRecorder?.isTypeSupported?.(x))||''}
async function startRecording(){
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){renderError('unsupported');return}
 body.innerHTML=`<div class="phasea-k">${c().recK}</div><h2>${c().requesting}</h2><div class="phasea-wait"><i></i></div><p>${c().recI}</p>`;
 try{
  stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
  chunks=[];downloaded=false;const mime=supportedMime();recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);recorder.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};recorder.onstop=finalizeRecording;recorder.start(250);startedAt=Date.now();elapsedBeforePause=0;renderRecording();startTimer();
 }catch(e){renderError(e?.name==='NotAllowedError'||e?.name==='PermissionDeniedError'?'denied':'device')}
}

function renderRecording(){body.innerHTML=`<div class="phasea-k">${c().recK}</div><div class="phasea-recording"><div class="phasea-status"><i></i><span>${c().recording}</span></div><div class="phasea-timer" id="phasea-timer">00:00</div><div class="phasea-wave" aria-hidden="true">${'<i></i>'.repeat(28)}</div><p>${mode==='minute'?c().minuteS:c().freeS}</p><div class="phasea-rec-controls"><button id="phasea-pause" type="button">${c().pause}</button><button id="phasea-finish" type="button">${c().finish}</button></div><small id="phasea-remaining"></small></div>`;q('#phasea-pause').onclick=togglePause;q('#phasea-finish').onclick=finishRecording}
function startTimer(){clearInterval(timerId);timerId=setInterval(()=>{if(!recorder)return;const elapsed=recorder.state==='paused'?elapsedBeforePause:elapsedBeforePause+(Date.now()-startedAt);const sec=Math.floor(elapsed/1000);const m=String(Math.floor(sec/60)).padStart(2,'0'),s=String(sec%60).padStart(2,'0');const t=q('#phasea-timer');if(t)t.textContent=`${m}:${s}`;if(mode==='minute'){const left=Math.max(0,60-sec),r=q('#phasea-remaining');if(r&&left<=15)r.textContent=`${left} ${c().remaining}`;if(sec>=60)finishRecording()}},250)}
function togglePause(){if(!recorder)return;const b=q('#phasea-pause'),status=q('.phasea-status span');if(recorder.state==='recording'){elapsedBeforePause+=Date.now()-startedAt;recorder.pause();b.textContent=c().resume;if(status)status.textContent=c().paused}else if(recorder.state==='paused'){recorder.resume();startedAt=Date.now();b.textContent=c().pause;if(status)status.textContent=c().recording}}
function finishRecording(){if(!recorder||recorder.state==='inactive')return;clearInterval(timerId);recorder.stop();stream?.getTracks().forEach(t=>t.stop());stream=null}
function finalizeRecording(){const type=recorder?.mimeType||supportedMime()||'audio/webm';blob=new Blob(chunks,{type});if(blobUrl)URL.revokeObjectURL(blobUrl);blobUrl=URL.createObjectURL(blob);recorder=null;renderReview()}

function renderReview(){body.innerHTML=`<div class="phasea-k">${c().reviewK}</div><h2>${c().said}</h2><p class="phasea-lead">${c().reviewI}</p><div class="phasea-review"><audio id="phasea-audio" controls src="${blobUrl}"></audio><div class="phasea-review-actions"><button id="phasea-again">${c().again}</button><button id="phasea-delete">${c().del}</button></div></div><section class="phasea-privacy"><h3>${c().privacyH}</h3><button class="on"><i></i><b>${c().private}</b><small>${c().privateS}</small></button><button disabled><i></i><b>${c().association}</b><small>${c().associationS}</small></button><button disabled><i></i><b>${c().anonymous}</b><small>${c().anonymousS}</small></button><button disabled><i></i><b>${c().public}</b><small>${c().publicS}</small></button></section><button class="phasea-download" id="phasea-download">${c().download}</button><div class="phasea-download-status" aria-live="polite"></div>`;q('#phasea-again').onclick=()=>{deleteBlob();renderModeSelect()};q('#phasea-delete').onclick=()=>{deleteBlob();renderModeSelect()};q('#phasea-download').onclick=downloadSignal}
function extension(){const t=blob?.type||'';return t.includes('mp4')?'m4a':t.includes('ogg')?'ogg':'webm'}
function downloadSignal(){if(!blobUrl)return;const a=document.createElement('a');a.href=blobUrl;a.download=`last-lighthouse-signal-${new Date().toISOString().slice(0,10)}.${extension()}`;document.body.appendChild(a);a.click();a.remove();downloaded=true;const s=q('.phasea-download-status');if(s)s.textContent=c().downloaded}
function deleteBlob(){if(blobUrl)URL.revokeObjectURL(blobUrl);blobUrl=null;blob=null;chunks=[];downloaded=false}
function stopCapture(clearBlob=false){clearInterval(timerId);if(recorder&&recorder.state!=='inactive'){try{recorder.onstop=null;recorder.stop()}catch{}}recorder=null;stream?.getTracks().forEach(t=>t.stop());stream=null;if(clearBlob)deleteBlob()}

function renderWrite(){stopCapture(false);body.innerHTML=`<div class="phasea-k">${c().recK}</div><h2>${c().writeH}</h2><p class="phasea-lead">${c().writeI}</p><textarea class="phasea-write" id="phasea-write-text" placeholder="${c().placeholder}"></textarea><button id="phasea-copy-text" class="phasea-download" type="button">${c().copy}</button><button class="phasea-back" type="button">${c().back}</button>`;q('#phasea-copy-text').onclick=async()=>{const t=q('#phasea-write-text').value;try{await navigator.clipboard.writeText(t);q('#phasea-copy-text').textContent=c().copied}catch{}};q('.phasea-back',body).onclick=openListen}
function renderError(kind){stopCapture(false);const msg=c()[kind]||c().device;body.innerHTML=`<div class="phasea-k">${c().recK}</div><h2>${msg}</h2><p class="phasea-lead">${c().recI}</p><div class="phasea-error-actions"><button id="phasea-retry">${c().retry}</button><button id="phasea-write">${c().write}</button><button id="phasea-return">${c().return}</button></div>`;q('#phasea-retry').onclick=renderModeSelect;q('#phasea-write').onclick=renderWrite;q('#phasea-return').onclick=openListen}

function requestClose(){if(recorder&&recorder.state!=='inactive'){finishRecording();setTimeout(requestClose,200);return}if(blob&&!downloaded){renderLeaveWarning();return}stopCapture(true);closeOverlay()}
function renderLeaveWarning(){pendingClose=true;body.innerHTML=`<div class="phasea-k">PRIVATE SIGNAL</div><h2>${c().leaveH}</h2><p class="phasea-lead">${c().leaveI}</p><div class="phasea-leave-actions"><button id="phasea-stay">${c().stay}</button><button id="phasea-save">${c().leaveDownload}</button><button id="phasea-delete-leave">${c().deleteLeave}</button></div>`;q('#phasea-stay').onclick=renderReview;q('#phasea-save').onclick=()=>{downloadSignal();renderReview()};q('#phasea-delete-leave').onclick=()=>{stopCapture(true);closeOverlay()}}

new MutationObserver(()=>{if(overlay?.classList.contains('open')){if(blob)renderReview();else openListen()}const ans=q('#answer-event');if(ans?.classList.contains('show')){const old=q('#phasea-answer-listen');if(old)old.remove();observeAnswer()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
document.addEventListener('DOMContentLoaded',init);
})();