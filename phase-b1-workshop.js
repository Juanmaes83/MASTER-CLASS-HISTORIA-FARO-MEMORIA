(()=>{
'use strict';

const COPY={
 en:{
  k:'PHASE B1 · PODCAST WORKSHOP',title:'A PLACE TO SPEAK.',intro:'The goal is not audience. The goal is to make speaking easier, safer and more structured.',
  solo:'SOLO',soloS:'One person · one signal · private by default',guided:'GUIDED',guidedS:'Four prompts turn a difficult subject into a route.',conversation:'CONVERSATION',conversationS:'Two people · one device · a structured local conversation.',group:'GROUP',groupS:'4–8 people · moderator · shared topic · local demo.',
  enter:'ENTER WORKSHOP',back:'← BACK TO WORKSHOP',local:'LOCAL SESSION · NO AUDIO UPLOAD',start:'START',stop:'FINISH',record:'RECORD THIS LIGHT',rerecord:'RE-RECORD',next:'NEXT LIGHT →',skip:'SKIP FOR NOW',playAll:'PLAY THE FOUR LIGHTS',stopPlay:'STOP PLAYBACK',download:'DOWNLOAD',done:'YOUR STORY HAS FOUR LIGHTS.',doneI:'Four separate moments. One story. Nothing has been sent anywhere.',
  permission:'REQUESTING MICROPHONE…',denied:'Microphone access was not granted. Nothing has been recorded.',unsupported:'This browser cannot record audio here.',tryAgain:'TRY AGAIN',
  before:'BEFORE THE STORM',beforeQ:'What was happening before things became difficult?',signal:'THE SIGNAL',signalQ:'When did you first notice something had changed?',silence:'THE SILENCE',silenceQ:'What has been difficult to say out loud?',light:'ANOTHER LIGHT',lightQ:'What would you like someone to understand or hear now?',
  guidedH:'FOUR LIGHTS. ONE STORY.',guidedI:'Speak one piece at a time. You can replay or re-record each part before moving on.',
  convH:'A CONVERSATION NEEDS TWO LIGHTS.',convI:'A local same-device prototype. One shared recording, with prompts and turn cues. No remote connection.',voiceA:'VOICE A',voiceB:'VOICE B',beginConversation:'START SHARED RECORDING',nextTurn:'NEXT TURN →',finishConversation:'FINISH CONVERSATION',conversationDone:'THE CONVERSATION STAYS HERE.',conversationDoneI:'This shared recording exists only in this browser session until you download or delete it.',
  prompt1:'What feels important to say first?',prompt2:'What did you notice that the other person might not have seen?',prompt3:'What would help you feel heard right now?',prompt4:'What should happen after this conversation?',
  groupH:'A ROOM CAN HOLD MORE THAN ONE SIGNAL.',groupI:'A moderator-led local workshop prototype. Choose a group size and a theme, then use one shared microphone.',groupSize:'GROUP SIZE',theme:'THEME',startGroup:'START LOCAL WORKSHOP',nextPrompt:'NEXT PROMPT →',finishGroup:'FINISH WORKSHOP',groupDone:'THE ROOM HAS SPOKEN.',groupDoneI:'This workshop recording is local. Publishing, remote rooms and institutional delivery are not part of B1.',
  themeHelp:'THE FIRST TIME I ASKED FOR HELP',themeListen:'WHAT LISTENING LOOKED LIKE FOR ME',themeAgain:'STARTING AGAIN',
  groupP1:'One sentence each: what brings you into this room today?',groupP2:'What is something you found difficult to say before?',groupP3:'What helped you feel listened to — or what was missing?',groupP4:'What is one small next step you want to leave with?',
  timer:'SESSION TIME',moderator:'MODERATOR',participant:'PARTICIPANT',private:'PRIVATE BY DEFAULT',delete:'DELETE SESSION',returnListen:'RETURN TO LISTEN'
 },
 es:{
  k:'FASE B1 · TALLER DE PODCAST',title:'UN LUGAR PARA HABLAR.',intro:'El objetivo no es la audiencia. El objetivo es hacer que hablar sea más fácil, seguro y estructurado.',
  solo:'SOLO',soloS:'Una persona · una señal · privado por defecto',guided:'GUIADO',guidedS:'Cuatro preguntas convierten un tema difícil en un recorrido.',conversation:'CONVERSACIÓN',conversationS:'Dos personas · un dispositivo · una conversación local estructurada.',group:'GRUPO',groupS:'4–8 personas · moderador · tema compartido · demo local.',
  enter:'ENTRAR AL TALLER',back:'← VOLVER AL TALLER',local:'SESIÓN LOCAL · SIN SUBIDA DE AUDIO',start:'EMPEZAR',stop:'TERMINAR',record:'GRABAR ESTA LUZ',rerecord:'VOLVER A GRABAR',next:'SIGUIENTE LUZ →',skip:'SALTAR POR AHORA',playAll:'ESCUCHAR LAS CUATRO LUCES',stopPlay:'DETENER REPRODUCCIÓN',download:'DESCARGAR',done:'TU HISTORIA TIENE CUATRO LUCES.',doneI:'Cuatro momentos separados. Una historia. No se ha enviado nada a ningún sitio.',
  permission:'SOLICITANDO MICRÓFONO…',denied:'No se concedió acceso al micrófono. No se ha grabado nada.',unsupported:'Este navegador no puede grabar audio aquí.',tryAgain:'INTENTAR DE NUEVO',
  before:'ANTES DE LA TORMENTA',beforeQ:'¿Qué estaba ocurriendo antes de que las cosas se volvieran difíciles?',signal:'LA SEÑAL',signalQ:'¿Cuándo notaste por primera vez que algo había cambiado?',silence:'EL SILENCIO',silenceQ:'¿Qué ha sido difícil decir en voz alta?',light:'OTRA LUZ',lightQ:'¿Qué te gustaría que alguien entendiera o escuchara ahora?',
  guidedH:'CUATRO LUCES. UNA HISTORIA.',guidedI:'Habla una parte cada vez. Puedes escucharla o volver a grabarla antes de seguir.',
  convH:'UNA CONVERSACIÓN NECESITA DOS LUCES.',convI:'Prototipo local en un mismo dispositivo. Una grabación compartida, con preguntas y turnos. Sin conexión remota.',voiceA:'VOZ A',voiceB:'VOZ B',beginConversation:'EMPEZAR GRABACIÓN COMPARTIDA',nextTurn:'SIGUIENTE TURNO →',finishConversation:'TERMINAR CONVERSACIÓN',conversationDone:'LA CONVERSACIÓN SE QUEDA AQUÍ.',conversationDoneI:'Esta grabación compartida sólo existe en esta sesión del navegador hasta que la descargues o borres.',
  prompt1:'¿Qué es importante decir primero?',prompt2:'¿Qué notaste que la otra persona quizá no vio?',prompt3:'¿Qué te ayudaría a sentirte escuchado ahora?',prompt4:'¿Qué debería ocurrir después de esta conversación?',
  groupH:'UNA HABITACIÓN PUEDE CONTENER MÁS DE UNA SEÑAL.',groupI:'Prototipo local de taller moderado. Elige tamaño y tema y utiliza un único micrófono compartido.',groupSize:'TAMAÑO DEL GRUPO',theme:'TEMA',startGroup:'EMPEZAR TALLER LOCAL',nextPrompt:'SIGUIENTE PREGUNTA →',finishGroup:'TERMINAR TALLER',groupDone:'LA HABITACIÓN HA HABLADO.',groupDoneI:'Esta grabación de taller es local. Publicación, salas remotas y envío institucional no forman parte de B1.',
  themeHelp:'LA PRIMERA VEZ QUE PEDÍ AYUDA',themeListen:'CÓMO FUE SENTIRME ESCUCHADO',themeAgain:'EMPEZAR DE NUEVO',
  groupP1:'Una frase cada uno: ¿qué te trae hoy a esta habitación?',groupP2:'¿Qué te resultó difícil decir antes?',groupP3:'¿Qué te ayudó a sentirte escuchado — o qué faltó?',groupP4:'¿Con qué pequeño siguiente paso quieres salir de aquí?',
  timer:'TIEMPO DE SESIÓN',moderator:'MODERADOR',participant:'PARTICIPANTE',private:'PRIVADO POR DEFECTO',delete:'BORRAR SESIÓN',returnListen:'VOLVER A LISTEN'
 }
};

const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const lang=()=>document.documentElement.lang==='es'?'es':'en',c=()=>COPY[lang()];
let overlay=null,body=null,rendering=false,currentView='home';
let stream=null,recorder=null,chunks=[],activeUrl=null,activeBlob=null,timerId=null,started=0,elapsed=0;
let guidedIndex=0,guidedClips=[null,null,null,null],guidedPlaying=false;
let sharedKind=null,sharedStep=0,sharedSpeaker=0,sharedBlob=null,sharedUrl=null,groupSize=6,groupTheme='help';

const guidedSteps=()=>[
 {k:c().before,q:c().beforeQ},{k:c().signal,q:c().signalQ},{k:c().silence,q:c().silenceQ},{k:c().light,q:c().lightQ}
];
const convPrompts=()=>[c().prompt1,c().prompt2,c().prompt3,c().prompt4];
const groupPrompts=()=>[c().groupP1,c().groupP2,c().groupP3,c().groupP4];

function init(){
 overlay=q('#phasea-overlay');body=q('#phasea-body');
 if(!overlay||!body){setTimeout(init,100);return}
 document.addEventListener('click',captureWorkshopEntry,true);
 new MutationObserver(onOverlayChange).observe(overlay,{attributes:true,attributeFilter:['data-room','class']});
 new MutationObserver(()=>{if(overlay.classList.contains('open')&&overlay.dataset.room==='workshop')renderCurrent()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 q('#phasea-close')?.addEventListener('click',()=>stopAll(true),true);
 window.__FARO_PHASE_B1__={version:'phase-b1-1',open:()=>openHomeSoon(),view:()=>currentView,guidedIndex:()=>guidedIndex,hasGuidedClip:i=>!!guidedClips[i],sharedKind:()=>sharedKind};
 onOverlayChange();
}

function captureWorkshopEntry(e){
 const hit=e.target.closest('[data-go="workshop"],[data-rnav="workshop"]');
 if(!hit)return;
 currentView='home';
 setTimeout(()=>{if(overlay?.classList.contains('open')&&overlay.dataset.room==='workshop')renderHome()},60);
}
function onOverlayChange(){
 if(!overlay.classList.contains('open')){stopAll(false);return}
 if(overlay.dataset.room==='workshop')openHomeSoon();
 else if(currentView!=='home')stopAll(false);
}
function openHomeSoon(){setTimeout(()=>{if(overlay.classList.contains('open')&&overlay.dataset.room==='workshop')renderHome()},40)}
function renderCurrent(){
 if(rendering)return;
 ({home:renderHome,guided:renderGuided,conversation:renderConversationSetup,group:renderGroupSetup}[currentView]||renderHome)();
}
function guard(fn){if(rendering)return;rendering=true;try{fn()}finally{requestAnimationFrame(()=>rendering=false)}}

function renderHome(){guard(()=>{
 currentView='home';stopCapture();stopPlayback();
 body.innerHTML=`<section class="b1-room b1-home"><div class="b1-k">${c().k}</div><h2>${c().title}</h2><p class="b1-lead">${c().intro}</p><div class="b1-map" aria-hidden="true"><i class="route a"></i><i class="route b"></i><span class="beacon center"></span><span class="beacon p1"></span><span class="beacon p2"></span><span class="beacon p3"></span></div><div class="b1-modes"><button data-b1="solo"><span class="mode solo"><i></i></span><small>01</small><b>${c().solo}</b><em>${c().soloS}</em></button><button data-b1="guided"><span class="mode guided"><i></i><i></i><i></i><i></i></span><small>02</small><b>${c().guided}</b><em>${c().guidedS}</em></button><button data-b1="conversation"><span class="mode conversation"><i></i><i></i></span><small>03</small><b>${c().conversation}</b><em>${c().conversationS}</em></button><button data-b1="group"><span class="mode group">${'<i></i>'.repeat(6)}</span><small>04</small><b>${c().group}</b><em>${c().groupS}</em></button></div><footer class="b1-foot"><span>FL W 6s</span><i></i><b>${c().local}</b></footer></section>`;
 qa('[data-b1="solo"]',body).forEach(b=>b.onclick=openSolo);
 q('[data-b1="guided"]',body).onclick=()=>{currentView='guided';guidedIndex=0;renderGuided()};
 q('[data-b1="conversation"]',body).onclick=()=>{currentView='conversation';renderConversationSetup()};
 q('[data-b1="group"]',body).onclick=()=>{currentView='group';renderGroupSetup()};
 })}

function openSolo(){
 const nav=q('[data-rnav="record"]');
 if(nav)nav.click();else window.__FARO_PHASE_A__?.openRecord?.();
}

function renderGuided(){guard(()=>{
 currentView='guided';stopCapture();
 const steps=guidedSteps(),s=steps[guidedIndex],clip=guidedClips[guidedIndex];
 body.innerHTML=`<section class="b1-room b1-guided"><button class="b1-back" id="b1-back">${c().back}</button><header class="b1-guided-head"><div><div class="b1-k">02 · ${c().guided}</div><h2>${c().guidedH}</h2><p>${c().guidedI}</p></div><div class="b1-progress">${steps.map((x,i)=>`<button data-step="${i}" class="${i===guidedIndex?'on':''} ${guidedClips[i]?'done':''}"><i></i><span>0${i+1}</span><b>${x.k}</b></button>`).join('')}</div></header><div class="b1-prompt-stage"><div class="b1-prompt-orbit"><span></span><i></i><b></b></div><small>LIGHT ${String(guidedIndex+1).padStart(2,'0')} / 04</small><h3>${s.k}</h3><blockquote>${s.q}</blockquote><div id="b1-guided-action">${clip?guidedClipControls(clip):`<button class="b1-primary" id="b1-record-guided">${c().record}</button><span>${c().local}</span>`}</div></div><div class="b1-step-nav"><button id="b1-prev" ${guidedIndex===0?'disabled':''}>← ${guidedIndex?steps[guidedIndex-1].k:''}</button><button id="b1-next" ${!clip&&guidedIndex<3?'disabled':''}>${guidedIndex===3&&clip?'REVIEW STORY →':c().next}</button></div></section>`;
 q('#b1-back').onclick=renderHome;
 qa('[data-step]',body).forEach(b=>b.onclick=()=>{guidedIndex=Number(b.dataset.step);renderGuided()});
 q('#b1-prev').onclick=()=>{if(guidedIndex>0){guidedIndex--;renderGuided()}};
 q('#b1-next').onclick=()=>{if(guidedIndex<3){guidedIndex++;renderGuided()}else if(guidedClips[3])renderGuidedReview()};
 q('#b1-record-guided')?.addEventListener('click',()=>startClipRecording('guided'));
 wireClipControls();
 })}
function guidedClipControls(clip){return `<div class="b1-clip-ready"><span class="b1-recorded-dot"></span><audio id="b1-current-audio" controls src="${clip.url}"></audio><button id="b1-retake">${c().rerecord}</button><button id="b1-download-current">${c().download}</button></div>`}
function wireClipControls(){
 q('#b1-retake')?.addEventListener('click',()=>{clearGuidedClip(guidedIndex);renderGuided()});
 q('#b1-download-current')?.addEventListener('click',()=>downloadBlob(guidedClips[guidedIndex]?.blob,`last-lighthouse-guided-light-${guidedIndex+1}`));
}

async function startClipRecording(kind){
 if(!canRecord()){renderRecorderError(()=>renderGuided());return}
 const action=q('#b1-guided-action');
 if(action)action.innerHTML=`<div class="b1-requesting"><i></i><b>${c().permission}</b></div>`;
 try{
  await beginRecorder();
  if(kind==='guided')renderGuidedRecording();
 }catch(e){renderRecorderError(()=>renderGuided(),e)}
}
function renderGuidedRecording(){
 const action=q('#b1-guided-action');if(!action)return;
 action.innerHTML=`<div class="b1-live"><div><span class="live-dot"></span><b>SIGNAL IN PROGRESS</b></div><strong id="b1-live-time">00:00</strong><div class="b1-wave">${'<i></i>'.repeat(28)}</div><button id="b1-stop-guided">${c().stop}</button></div>`;
 q('#b1-stop-guided').onclick=()=>finishRecorder(blob=>{guidedClips[guidedIndex]={blob,url:URL.createObjectURL(blob)};renderGuided()});
}

function renderGuidedReview(){guard(()=>{
 currentView='guided';stopCapture();
 const steps=guidedSteps();
 body.innerHTML=`<section class="b1-room b1-review"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-k">GUIDED · COMPLETE</div><h2>${c().done}</h2><p class="b1-lead">${c().doneI}</p><div class="four-lights">${steps.map((s,i)=>`<article><span><i></i><b>0${i+1}</b></span><div><small>${s.k}</small><h3>${s.q}</h3><audio controls src="${guidedClips[i]?.url||''}"></audio><button data-dl="${i}">${c().download}</button></div></article>`).join('')}</div><div class="b1-review-actions"><button class="b1-primary" id="b1-play-all">${c().playAll}</button><button id="b1-edit-guided">${c().rerecord}</button><button id="b1-delete-guided">${c().delete}</button></div><p>${c().private} · ${c().local}</p></section>`;
 q('#b1-back').onclick=renderHome;
 qa('[data-dl]',body).forEach(b=>b.onclick=()=>{const i=Number(b.dataset.dl);downloadBlob(guidedClips[i]?.blob,`last-lighthouse-guided-light-${i+1}`)});
 q('#b1-play-all').onclick=playGuidedSequence;
 q('#b1-edit-guided').onclick=()=>{guidedIndex=0;renderGuided()};
 q('#b1-delete-guided').onclick=()=>{clearGuidedAll();renderHome()};
 })}
async function playGuidedSequence(){
 if(guidedPlaying){stopPlayback();return}
 guidedPlaying=true;q('#b1-play-all').textContent=c().stopPlay;
 for(const clip of guidedClips){if(!guidedPlaying||!clip)break;await playUrl(clip.url)}
 guidedPlaying=false;q('#b1-play-all')&&(q('#b1-play-all').textContent=c().playAll)
}
function playUrl(url){return new Promise(resolve=>{const a=new Audio(url);activeUrl=a;a.onended=resolve;a.onerror=resolve;a.play().catch(resolve)})}
function stopPlayback(){guidedPlaying=false;if(activeUrl&&typeof activeUrl.pause==='function')activeUrl.pause();activeUrl=null}
function clearGuidedClip(i){const x=guidedClips[i];if(x?.url)URL.revokeObjectURL(x.url);guidedClips[i]=null}
function clearGuidedAll(){guidedClips.forEach((_,i)=>clearGuidedClip(i));guidedClips=[null,null,null,null];guidedIndex=0}

function renderConversationSetup(){guard(()=>{
 currentView='conversation';stopShared();
 body.innerHTML=`<section class="b1-room b1-conversation"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-k">03 · ${c().conversation}</div><h2>${c().convH}</h2><p class="b1-lead">${c().convI}</p><div class="two-lights"><div class="person a"><span><i></i></span><b>${c().voiceA}</b><small>${c().participant} 01</small></div><div class="conversation-line"><i></i><b></b></div><div class="person b"><span><i></i></span><b>${c().voiceB}</b><small>${c().participant} 02</small></div></div><div class="conv-route">${convPrompts().map((p,i)=>`<article><span>0${i+1}</span><p>${p}</p></article>`).join('')}</div><button class="b1-primary" id="b1-start-conversation">${c().beginConversation}</button><footer class="b1-foot"><span>${c().private}</span><i></i><b>${c().local}</b></footer></section>`;
 q('#b1-back').onclick=renderHome;q('#b1-start-conversation').onclick=()=>startShared('conversation');
 })}

async function startShared(kind){
 if(!canRecord()){renderRecorderError(kind==='conversation'?renderConversationSetup:renderGroupSetup);return}
 sharedKind=kind;sharedStep=0;sharedSpeaker=0;
 try{await beginRecorder();kind==='conversation'?renderConversationLive():renderGroupLive()}catch(e){renderRecorderError(kind==='conversation'?renderConversationSetup:renderGroupSetup,e)}
}
function renderConversationLive(){guard(()=>{
 currentView='conversation';const prompts=convPrompts();
 body.innerHTML=`<section class="b1-room b1-conversation live"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-session-top"><span><i></i> RECORDING LOCALLY</span><b id="b1-session-time">00:00</b></div><div class="two-lights active-${sharedSpeaker?'b':'a'}"><div class="person a"><span><i></i></span><b>${c().voiceA}</b></div><div class="conversation-line"><i></i><b></b></div><div class="person b"><span><i></i></span><b>${c().voiceB}</b></div></div><div class="turn-card"><small>PROMPT ${sharedStep+1}/4 · ${sharedSpeaker?c().voiceB:c().voiceA}</small><blockquote>${prompts[sharedStep]}</blockquote></div><div class="b1-live-actions"><button id="b1-next-turn">${c().nextTurn}</button><button id="b1-finish-shared">${c().finishConversation}</button></div><div class="b1-wave">${'<i></i>'.repeat(34)}</div></section>`;
 q('#b1-back').onclick=()=>finishSharedThen(renderConversationSetup);
 q('#b1-next-turn').onclick=()=>{if(sharedSpeaker===0)sharedSpeaker=1;else{sharedSpeaker=0;sharedStep=Math.min(3,sharedStep+1)};renderConversationLive()};
 q('#b1-finish-shared').onclick=()=>finishSharedThen(()=>renderSharedReview('conversation'));
 })}

function renderGroupSetup(){guard(()=>{
 currentView='group';stopShared();
 body.innerHTML=`<section class="b1-room b1-group"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-k">04 · ${c().group}</div><h2>${c().groupH}</h2><p class="b1-lead">${c().groupI}</p><div class="group-constellation" id="group-constellation">${groupDots(groupSize)}</div><div class="group-config"><fieldset><legend>${c().groupSize}</legend>${[4,6,8].map(n=>`<button data-size="${n}" class="${n===groupSize?'on':''}">${n}</button>`).join('')}</fieldset><fieldset><legend>${c().theme}</legend><button data-theme="help" class="${groupTheme==='help'?'on':''}">${c().themeHelp}</button><button data-theme="listen" class="${groupTheme==='listen'?'on':''}">${c().themeListen}</button><button data-theme="again" class="${groupTheme==='again'?'on':''}">${c().themeAgain}</button></fieldset></div><button class="b1-primary" id="b1-start-group">${c().startGroup}</button><footer class="b1-foot"><span>${c().moderator}</span><i></i><b>${c().local}</b></footer></section>`;
 q('#b1-back').onclick=renderHome;
 qa('[data-size]',body).forEach(b=>b.onclick=()=>{groupSize=Number(b.dataset.size);renderGroupSetup()});
 qa('[data-theme]',body).forEach(b=>b.onclick=()=>{groupTheme=b.dataset.theme;renderGroupSetup()});
 q('#b1-start-group').onclick=()=>startShared('group');
 })}
function groupDots(n){return `<span class="moderator"><i></i><b>M</b></span>`+Array.from({length:n},(_,i)=>`<span class="g g${i+1}"><i></i><b>${i+1}</b></span>`).join('')}
function renderGroupLive(){guard(()=>{
 currentView='group';const prompts=groupPrompts();
 body.innerHTML=`<section class="b1-room b1-group live"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-session-top"><span><i></i> ${c().moderator} · RECORDING LOCALLY</span><b id="b1-session-time">00:00</b></div><div class="group-live-grid"><div class="group-constellation active">${groupDots(groupSize)}</div><div class="group-prompt"><small>${groupTheme.toUpperCase()} · ${sharedStep+1}/4</small><blockquote>${prompts[sharedStep]}</blockquote><p>${groupSize} ${c().participant.toLowerCase()}s · ${c().moderator}</p></div></div><div class="b1-live-actions"><button id="b1-next-group" ${sharedStep===3?'disabled':''}>${c().nextPrompt}</button><button id="b1-finish-shared">${c().finishGroup}</button></div><div class="b1-wave">${'<i></i>'.repeat(34)}</div></section>`;
 q('#b1-back').onclick=()=>finishSharedThen(renderGroupSetup);
 q('#b1-next-group').onclick=()=>{sharedStep=Math.min(3,sharedStep+1);renderGroupLive()};
 q('#b1-finish-shared').onclick=()=>finishSharedThen(()=>renderSharedReview('group'));
 })}

function renderSharedReview(kind){guard(()=>{
 currentView=kind==='conversation'?'conversation':'group';const isConv=kind==='conversation';
 body.innerHTML=`<section class="b1-room b1-review shared"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-k">${isConv?'CONVERSATION':'GROUP'} · LOCAL REVIEW</div><h2>${isConv?c().conversationDone:c().groupDone}</h2><p class="b1-lead">${isConv?c().conversationDoneI:c().groupDoneI}</p><div class="shared-player"><span class="b1-recorded-dot"></span><audio controls src="${sharedUrl||''}"></audio><strong>${formatTime(elapsed)}</strong></div><div class="b1-review-actions"><button class="b1-primary" id="b1-download-shared">${c().download}</button><button id="b1-delete-shared">${c().delete}</button><button id="b1-return-listen">${c().returnListen}</button></div><p>${c().private} · ${c().local}</p></section>`;
 q('#b1-back').onclick=isConv?renderConversationSetup:renderGroupSetup;
 q('#b1-download-shared').onclick=()=>downloadBlob(sharedBlob,`last-lighthouse-${kind}-session`);
 q('#b1-delete-shared').onclick=()=>{clearSharedBlob();isConv?renderConversationSetup():renderGroupSetup()};
 q('#b1-return-listen').onclick=()=>q('[data-rnav="listen"]')?.click();
 })}

function canRecord(){return !!(navigator.mediaDevices?.getUserMedia&&window.MediaRecorder)}
function mime(){return ['audio/webm;codecs=opus','audio/webm','audio/mp4'].find(x=>window.MediaRecorder?.isTypeSupported?.(x))||''}
async function beginRecorder(){
 stopCapture();stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});chunks=[];const type=mime();recorder=new MediaRecorder(stream,type?{mimeType:type}:undefined);recorder.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};recorder.start(250);started=Date.now();elapsed=0;startTimer();return recorder
}
function finishRecorder(done){
 if(!recorder||recorder.state==='inactive')return;
 clearInterval(timerId);elapsed+=Date.now()-started;const r=recorder;r.onstop=()=>{const blob=new Blob(chunks,{type:r.mimeType||mime()||'audio/webm'});stream?.getTracks().forEach(t=>t.stop());stream=null;recorder=null;chunks=[];done(blob)};r.stop()
}
function stopCapture(){clearInterval(timerId);if(recorder&&recorder.state!=='inactive'){try{recorder.onstop=null;recorder.stop()}catch{}}recorder=null;stream?.getTracks().forEach(t=>t.stop());stream=null;chunks=[]}
function startTimer(){clearInterval(timerId);timerId=setInterval(()=>{const ms=elapsed+(recorder?Date.now()-started:0);q('#b1-live-time')&&(q('#b1-live-time').textContent=formatTime(ms));q('#b1-session-time')&&(q('#b1-session-time').textContent=formatTime(ms))},250)}
function formatTime(ms){const sec=Math.floor(ms/1000),m=String(Math.floor(sec/60)).padStart(2,'0'),s=String(sec%60).padStart(2,'0');return `${m}:${s}`}
function finishSharedThen(next){
 if(!recorder){next();return}
 finishRecorder(blob=>{clearSharedBlob();sharedBlob=blob;sharedUrl=URL.createObjectURL(blob);next()})
}
function stopShared(){if(recorder)stopCapture()}
function clearSharedBlob(){if(sharedUrl)URL.revokeObjectURL(sharedUrl);sharedUrl=null;sharedBlob=null}
function stopAll(clear){stopCapture();stopPlayback();if(clear){clearGuidedAll();clearSharedBlob()}}
function downloadBlob(blob,name){if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${name}-${new Date().toISOString().slice(0,10)}.${blob.type.includes('mp4')?'m4a':'webm'}`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function renderRecorderError(retry,e){guard(()=>{stopCapture();body.innerHTML=`<section class="b1-room b1-error"><button class="b1-back" id="b1-back">${c().back}</button><div class="b1-k">MICROPHONE</div><h2>${e?.name==='NotAllowedError'?c().denied:c().unsupported}</h2><p class="b1-lead">${c().local}</p><button class="b1-primary" id="b1-retry">${c().tryAgain}</button></section>`;q('#b1-back').onclick=renderHome;q('#b1-retry').onclick=retry})}

document.addEventListener('DOMContentLoaded',init);
})();