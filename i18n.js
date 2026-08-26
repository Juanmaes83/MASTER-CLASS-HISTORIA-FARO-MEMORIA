(()=>{
  const STORAGE_KEY='faro-language';
  const translations={
    en:{
      title:'The Last Lighthouse — Kage Architecture Study',
      description:'A continuous cinematic WebGL ascent through the final night of an Atlantic lighthouse.',
      nav:['Coast','Keeper','Ascent','Machine','Beam','Afterlight'],
      brandSub:'ATLANTIC MEMORY ARCHIVE',
      burger:'Open navigation',
      rail:'Chapter navigation',
      heroEyebrow:'Atlantic field study · 43°28′ N',
      heroTitle:'THE LAST<br>LIGHTHOUSE',
      heroSub:'One final rotation. One climb through salt, iron and glass. Then the coast learns how to remember a light that no longer turns.',
      begin:'Begin the ascent',
      chips:[['Coast','Approach'],['Keeper','Absence'],['Machine','Optics'],['Beam','Signal']],
      coastHead:['THE COAST','WINDWARD APPROACH'],
      coastTitle:'Before a lighthouse is a tower, it is a promise across distance.',
      coastLead:'The sea does not know the building is obsolete.',
      coastBody:'Salt keeps arriving. Iron keeps oxidising. The tower remains a coordinate long after electronics make its labour unnecessary. Tonight it will turn for the last time.',
      coastStats:['Commissioned','Optical range','Wind','Bearing'],
      keeperHead:'THE KEEPER',
      keeperLabel:'ARCHIVE RECONSTRUCTION · NO PORTRAIT REQUIRED',
      keeperTitle:'A room can remember a person without showing their face.',
      keeperLead:'Oilskin. Brass. A cup gone cold. One final line in the log.',
      keeperBody:'This is the one chapter where generated imagery owns the midground. Three.js does not duplicate the room; it supplies rain, exterior light and continuity around it.',
      stairEyebrow:'02.5 · ASCENT',
      stairTitle:'The wall closes in.<br>The light moves above.',
      stairBody:'No dissolve. The stair itself hides the cut.',
      machineHead:['THE MACHINE','FRESNEL / CLOCKWORK'],
      machineTitle:'The lens does not make light. It teaches light where to go.',
      machineLead:'Glass becomes architecture. Rotation becomes time.',
      machineBody:'This chapter is now owned by WebGL. The Fresnel, clockwork, gallery and lantern room share one camera and one depth system.',
      live:['LIVE OPTICAL VIEW','CAMERA B · 65 MM'],
      beamEyebrow:'04 · THE BEAM',
      beamTitle:'For six seconds, the whole coast knows exactly where it is.',
      beamBody:'Now the signal owns the frame. Glass, railing, fog and spray prove the distance it crosses.',
      afterEyebrow:'05 · AFTERLIGHT',
      afterTitle:'A lighthouse can stop shining before it stops guiding.',
      afterBody:'At dawn the lens is only glass again. What remains is a coordinate, a building, and the memory of every person who once looked for that pulse in bad weather.',
      again:'Begin again',
      phase:'Phase 3 · Kage architecture reconstruction',
      motto:"DON'T SHOW THE THREE.JS. SHOW THE WORLD."
    },
    es:{
      title:'El Último Faro — Estudio de Arquitectura Kage',
      description:'Un ascenso cinematográfico continuo en WebGL durante la última noche de un faro atlántico.',
      nav:['Costa','Faroero','Ascenso','Máquina','Haz','Posluz'],
      brandSub:'ARCHIVO DE MEMORIA ATLÁNTICA',
      burger:'Abrir navegación',
      rail:'Navegación por capítulos',
      heroEyebrow:'Estudio de campo atlántico · 43°28′ N',
      heroTitle:'EL ÚLTIMO<br>FARO',
      heroSub:'Una última rotación. Un ascenso entre sal, hierro y vidrio. Después, la costa aprende a recordar una luz que ya no gira.',
      begin:'Comenzar el ascenso',
      chips:[['Costa','Aproximación'],['Faroero','Ausencia'],['Máquina','Óptica'],['Haz','Señal']],
      coastHead:['LA COSTA','APROXIMACIÓN A BARLOVENTO'],
      coastTitle:'Antes de ser una torre, un faro es una promesa a través de la distancia.',
      coastLead:'El mar no sabe que el edificio ha quedado obsoleto.',
      coastBody:'La sal sigue llegando. El hierro sigue oxidándose. La torre continúa siendo una coordenada mucho después de que la electrónica haga innecesario su trabajo. Esta noche girará por última vez.',
      coastStats:['Inaugurado','Alcance óptico','Viento','Rumbo'],
      keeperHead:'EL FAROERO',
      keeperLabel:'RECONSTRUCCIÓN DE ARCHIVO · NO SE REQUIERE RETRATO',
      keeperTitle:'Una habitación puede recordar a una persona sin mostrar su rostro.',
      keeperLead:'Hule. Latón. Una taza ya fría. Una última línea en el cuaderno de guardia.',
      keeperBody:'Este es el único capítulo donde la imagen generada ocupa el plano medio. Three.js no duplica la habitación; aporta lluvia, luz exterior y continuidad a su alrededor.',
      stairEyebrow:'02.5 · ASCENSO',
      stairTitle:'El muro se cierra.<br>La luz se mueve arriba.',
      stairBody:'Sin fundido. La propia escalera oculta el corte.',
      machineHead:['LA MÁQUINA','FRESNEL / MECANISMO'],
      machineTitle:'La lente no crea luz. Le enseña a la luz adónde ir.',
      machineLead:'El vidrio se convierte en arquitectura. La rotación se convierte en tiempo.',
      machineBody:'Este capítulo pertenece ahora a WebGL. La Fresnel, el mecanismo, la galería y la linterna comparten una sola cámara y un único sistema de profundidad.',
      live:['VISTA ÓPTICA EN DIRECTO','CÁMARA B · 65 MM'],
      beamEyebrow:'04 · EL HAZ',
      beamTitle:'Durante seis segundos, toda la costa sabe exactamente dónde está.',
      beamBody:'Ahora la señal domina el encuadre. Vidrio, barandilla, niebla y rocío demuestran la distancia que atraviesa.',
      afterEyebrow:'05 · POSLUZ',
      afterTitle:'Un faro puede dejar de brillar antes de dejar de guiar.',
      afterBody:'Al amanecer, la lente vuelve a ser sólo vidrio. Lo que queda es una coordenada, un edificio y la memoria de todas las personas que alguna vez buscaron ese pulso con mal tiempo.',
      again:'Volver a empezar',
      phase:'Fase 3 · Reconstrucción con arquitectura Kage',
      motto:'NO ENSEÑES THREE.JS. ENSEÑA EL MUNDO.'
    }
  };

  const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
  const set=(s,v,html=false)=>{const el=q(s);if(el) html?el.innerHTML=v:el.textContent=v;};
  const setMany=(s,vals)=>qa(s).forEach((el,i)=>{if(vals[i]!=null)el.textContent=vals[i]});
  const numberedHead=(el,num,label)=>{if(el)el.innerHTML=`<b>${num}</b> — ${label}`;};

  function applyLanguage(lang){
    const t=translations[lang]||translations.en;
    document.documentElement.lang=lang;
    document.title=t.title;
    const meta=q('meta[name="description"]'); if(meta) meta.content=t.description;
    setMany('#navlinks a',t.nav);
    set('.brand small',t.brandSub);
    const burger=q('#burger'); if(burger) burger.setAttribute('aria-label',t.burger);
    const rail=q('#rail'); if(rail) rail.setAttribute('aria-label',t.rail);
    set('#hero .eyebrow',`<span class="dot"></span>${t.heroEyebrow}`,true);
    set('#hero h1',t.heroTitle,true);
    set('#hero .hero-sub',t.heroSub);
    set('#hero .hero-cue span:first-child',t.begin);
    qa('#hero .chip').forEach((chip,i)=>{const pair=t.chips[i]; if(!pair)return; const b=chip.querySelector('b'),small=chip.querySelector('small'); if(b)b.textContent=pair[0]; if(small)small.textContent=pair[1];});
    const coastKs=qa('#coast .sec-head .k'); numberedHead(coastKs[0],'01',t.coastHead[0]); if(coastKs[1])coastKs[1].textContent=t.coastHead[1];
    set('#coast h2',t.coastTitle); set('#coast .lead',t.coastLead); set('#coast .body',t.coastBody); setMany('#coast .stats span',t.coastStats);
    const keeperKs=qa('#keeper .sec-head .k'); numberedHead(keeperKs[0],'02',t.keeperHead);
    set('#keeper .window-label',t.keeperLabel); set('#keeper h2',t.keeperTitle); set('#keeper .lead',t.keeperLead); set('#keeper .body',t.keeperBody);
    set('#stair .eyebrow',t.stairEyebrow); set('#stair h2',t.stairTitle,true); set('#stair .body-lg',t.stairBody);
    const machineKs=qa('#machine .sec-head .k'); numberedHead(machineKs[0],'03',t.machineHead[0]); if(machineKs[1])machineKs[1].textContent=t.machineHead[1];
    set('#machine h2',t.machineTitle); set('#machine .lead',t.machineLead); set('#machine .body',t.machineBody); setMany('#machine .live-meta span',t.live);
    set('#beam .eyebrow',t.beamEyebrow); set('#beam h2',t.beamTitle); set('#beam .body-lg',t.beamBody);
    set('#afterlight .eyebrow',t.afterEyebrow); set('#afterlight h2',t.afterTitle); set('#afterlight .body-lg',t.afterBody); set('#afterlight .cta span',t.again);
    const footSpans=qa('.foot span'); if(footSpans[0])footSpans[0].textContent=t.phase;
    const footDivs=qa('.foot > div'); if(footDivs[1])footDivs[1].textContent=t.motto;
    qa('[data-lang]').forEach(btn=>{const active=btn.dataset.lang===lang;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
    localStorage.setItem(STORAGE_KEY,lang);
  }

  document.addEventListener('DOMContentLoaded',()=>{
    qa('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>applyLanguage(btn.dataset.lang)));
    applyLanguage(localStorage.getItem(STORAGE_KEY)||'en');
  });
})();
