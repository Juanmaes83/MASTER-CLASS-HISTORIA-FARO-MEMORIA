(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const ASSETS={
 coast:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104759_d7c4b12e-a448-4d36-b530-1b994cda9cc8.png',
 keeper:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104800_31197b3c-0193-4e90-80fb-ee4344454c76.png',
 machine:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104800_8ef7ab6f-c335-4f3c-98c0-072a07f675c8.png',
 stair:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104759_a0e1485d-38e2-444c-89cf-85de27a8f536.png',
 beam:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104800_3fda0edd-5736-4a06-a5c4-b717dcd30978.png',
 dawn:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104759_55aa4375-d76e-4337-b6d4-fc9a58368d30.png',
 rail:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104812_17c917ce-3fe7-4ae7-8bb0-d95c9e946f2b.png',
 lens:'https://d8j0ntlcm91z4.cloudfront.net/user_32Z72jiRnAYwuEpbVNGYFa3wWSz/hf_20260826_104812_6c0d7345-7331-4921-98c3-8fd5b990aad0.png'
};
Object.values(ASSETS).forEach(src=>{const i=new Image();i.src=src});
$('.fg--rail').style.backgroundImage=`url(${ASSETS.rail})`;$('.fg--lens').style.backgroundImage=`url(${ASSETS.lens})`;

// Editorial word choreography.
$$('.reveal-words').forEach(el=>{const walk=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const frag=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach((w,i)=>{if(/^\s+$/.test(w)){frag.append(w);return}const span=document.createElement('span');span.className='word';const inner=document.createElement('i');inner.style.setProperty('--d',`${i*42}ms`);inner.textContent=w;span.append(inner);frag.append(span)});n.replaceWith(frag)}else if(n.nodeType===1&&n.tagName!=='BR')walk(n)})};walk(el)});
const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.16,rootMargin:'0px 0px -6%'});
$$('.reveal,.reveal-words').forEach(el=>revealIO.observe(el));

const nav=$('.nav'),toggle=$('#navToggle');toggle.addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open))});
addEventListener('scroll',()=>nav.classList.toggle('stuck',scrollY>36),{passive:true});

// Scene state + crossfading plates.
const plateA=$('#plateA'),plateB=$('#plateB'),scenes=$$('[data-scene]'),indexLinks=$$('#chapterIndex a');
let activeScene=0,activeKey='coast',front=plateA,back=plateB,scrollTarget=0,scrollSmooth=0;
function setPlate(key){if(!ASSETS[key]||key===activeKey)return;activeKey=key;back.style.backgroundImage=`url(${ASSETS[key]})`;back.style.opacity='0';back.style.transform='scale(1.05)';requestAnimationFrame(()=>{back.style.transition='opacity 1.15s var(--io),transform 4s var(--out),filter 1.2s';front.style.transition='opacity .9s var(--io)';back.style.opacity=key==='dawn'?'.88':'.82';back.style.transform='scale(1.015)';front.style.opacity='0';[front,back]=[back,front]})}
front.style.backgroundImage=`url(${ASSETS.coast})`;front.style.opacity='.84';
function updateState(){const mid=innerHeight*.5;let best=scenes[0],dist=1e9;scenes.forEach(s=>{const r=s.getBoundingClientRect(),d=Math.abs(r.top+r.height*.45-mid);if(d<dist){dist=d;best=s}});activeScene=parseFloat(best.dataset.scene);setPlate(best.dataset.plate||activeKey);indexLinks.forEach(a=>a.classList.toggle('active',parseInt(a.dataset.index)===Math.round(activeScene)));$$('.fg[data-fg]').forEach(f=>{const k=f.dataset.fg;f.classList.toggle('active',(k==='coast'&&activeScene<=1.1)||(k==='stair'&&activeScene>=2.2&&activeScene<3)||(k==='machine'&&activeScene>=2.85&&activeScene<4))});const max=document.documentElement.scrollHeight-innerHeight;scrollTarget=max>0?scrollY/max:0;$('#indexProgress').style.height=`${Math.min(100,scrollTarget*115)}%`;const bearing=Math.round((312+scrollTarget*408)%360).toString().padStart(3,'0');$('#bearingValue').textContent=`${bearing}°`}
addEventListener('scroll',updateState,{passive:true});updateState();

// Cursor = instrument, not decoration.
const cursor=$('#cursor');if(matchMedia('(hover:hover) and (pointer:fine)').matches){let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const follow=()=>{cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cursor.style.left=`${cx}px`;cursor.style.top=`${cy}px`;requestAnimationFrame(follow)};follow()}

if(!window.THREE)return;
const canvas=$('#gl'),renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.setSize(innerWidth,innerHeight,false);renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.66;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x05090c);scene.fog=new THREE.FogExp2(0x071015,.026);
const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.08,220);camera.position.set(14,4.2,24);

// Lighting: cold environment, practical warmth, narrow authored attention.
scene.add(new THREE.HemisphereLight(0x718995,0x05090b,.25));const moon=new THREE.DirectionalLight(0x8faebb,1.15);moon.position.set(-13,18,9);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);scene.add(moon);const practical=new THREE.PointLight(0xe3a15b,2.6,28,2);practical.position.set(-2.6,3.2,1);scene.add(practical);const lanternLight=new THREE.PointLight(0xf0bc72,4.2,26,2);lanternLight.position.set(0,9.1,0);scene.add(lanternLight);

function canvasTexture(kind,size=512){const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');if(kind==='stone'){x.fillStyle='#aeb3ae';x.fillRect(0,0,size,size);for(let i=0;i<7800;i++){const v=150+Math.random()*75;x.fillStyle=`rgba(${v},${v+3},${v},${Math.random()*.12})`;x.fillRect(Math.random()*size,Math.random()*size,Math.random()*3+1,Math.random()*3+1)}for(let i=0;i<42;i++){x.strokeStyle=`rgba(75,82,78,${.04+Math.random()*.08})`;x.lineWidth=Math.random()*2+.5;x.beginPath();let y=Math.random()*size;x.moveTo(0,y);for(let p=0;p<8;p++)x.lineTo(p/7*size,y+=(Math.random()-.5)*12);x.stroke()}}else if(kind==='rust'){const g=x.createLinearGradient(0,0,size,size);g.addColorStop(0,'#1c2424');g.addColorStop(.5,'#2a2924');g.addColorStop(1,'#161c1c');x.fillStyle=g;x.fillRect(0,0,size,size);for(let i=0;i<1600;i++){x.fillStyle=`rgba(${110+Math.random()*80},${55+Math.random()*50},${28+Math.random()*35},${Math.random()*.18})`;x.beginPath();x.arc(Math.random()*size,Math.random()*size,Math.random()*4+.4,0,Math.PI*2);x.fill()}}else{x.fillStyle='#101719';x.fillRect(0,0,size,size);for(let i=0;i<3000;i++){const q=20+Math.random()*40;x.fillStyle=`rgba(${q},${q+8},${q+8},${Math.random()*.18})`;x.fillRect(Math.random()*size,Math.random()*size,Math.random()*7,Math.random()*3)}}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2.4,2.4);t.encoding=THREE.sRGBEncoding;return t}
const stoneTex=canvasTexture('stone'),rustTex=canvasTexture('rust'),rockTex=canvasTexture('rock');
const stone=new THREE.MeshStandardMaterial({map:stoneTex,color:0xc1c5c0,roughness:.92,metalness:0});const iron=new THREE.MeshStandardMaterial({map:rustTex,color:0x313331,roughness:.63,metalness:.62});const darkIron=new THREE.MeshStandardMaterial({map:rustTex,color:0x151a1b,roughness:.54,metalness:.7});const rockMat=new THREE.MeshStandardMaterial({map:rockTex,color:0x1a2426,roughness:.88,metalness:.04});const glass=new THREE.MeshPhysicalMaterial({color:0xb5d2cc,transparent:true,opacity:.3,roughness:.045,metalness:0,transmission:.65,thickness:.65,ior:1.46});const brass=new THREE.MeshStandardMaterial({color:0x8c6a39,roughness:.34,metalness:.88});

// Sea shader — broad movement + narrow specular bands.
const seaGeo=new THREE.PlaneGeometry(170,170,128,128);const seaMat=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uLight:{value:new THREE.Vector3(-.25,.7,.3)}},vertexShader:`uniform float uTime;varying vec3 vP;varying float vH;void main(){vec3 p=position;float a=sin(p.x*.28+uTime*.32)*.19+sin(p.y*.17-uTime*.23)*.15+sin((p.x+p.y)*.09+uTime*.13)*.12+sin(p.x*.73-p.y*.41+uTime*.47)*.035;p.z+=a;vH=a;vP=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`varying vec3 vP;varying float vH;void main(){vec3 deep=vec3(.012,.038,.052);vec3 lift=vec3(.08,.15,.17);float crest=smoothstep(.12,.42,vH);float line=pow(max(0.,sin(vP.x*.38+vP.y*.16)*.5+.5),18.);vec3 col=mix(deep,lift,crest*.42)+vec3(.12,.16,.16)*line*crest*.26;gl_FragColor=vec4(col,1.);}`});const sea=new THREE.Mesh(seaGeo,seaMat);sea.rotation.x=-Math.PI/2;sea.position.y=-2.7;scene.add(sea);

// Cinematic cliff: multiple non-repeating masses rather than one visible primitive.
const cliff=new THREE.Group();for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.DodecahedronGeometry(3.5+Math.random()*3,2),rockMat);m.position.set((Math.random()-.5)*12,-2+Math.random()*1.7,(Math.random()-.5)*8);m.scale.set(1.2+Math.random()*1.8,.35+Math.random()*.55,.8+Math.random()*1.1);m.rotation.set(Math.random()*.2,Math.random()*Math.PI,Math.random()*.1);m.castShadow=m.receiveShadow=true;cliff.add(m)}cliff.position.set(0,0,-1);scene.add(cliff);

// Modular lighthouse kit.
const world=new THREE.Group();scene.add(world);const tower=new THREE.Group();world.add(tower);
for(let i=0;i<6;i++){const h=1.48,y=-.35+i*1.47,topR=1.63-i*.055,bottomR=topR+.08;const seg=new THREE.Mesh(new THREE.CylinderGeometry(topR,bottomR,h,48,4),stone);seg.position.y=y+3.2;seg.rotation.y=(i%2)*.025;seg.castShadow=seg.receiveShadow=true;tower.add(seg);const seam=new THREE.Mesh(new THREE.TorusGeometry(topR+.01,.018,6,48),new THREE.MeshStandardMaterial({color:0x707771,roughness:.95}));seam.rotation.x=Math.PI/2;seam.position.y=seg.position.y-h*.5+.02;tower.add(seam)}
// Windows, sills, frames create scale and break the cylinder silhouette.
for(let i=0;i<4;i++){const a=(i*.72+.55),y=2.3+i*1.45;const frame=new THREE.Group();const aperture=new THREE.Mesh(new THREE.BoxGeometry(.48,.72,.08),new THREE.MeshStandardMaterial({color:0x0b1011,roughness:.35,metalness:.18}));aperture.position.set(Math.sin(a)*1.49,y,Math.cos(a)*1.49);aperture.lookAt(0,y,0);frame.add(aperture);const sill=new THREE.Mesh(new THREE.BoxGeometry(.65,.08,.22),stone);sill.position.copy(aperture.position);sill.position.y-=.42;sill.lookAt(0,sill.position.y,0);frame.add(sill);tower.add(frame)}
const house=new THREE.Group();const houseBody=new THREE.Mesh(new THREE.BoxGeometry(5.8,2.35,4.2),stone);houseBody.position.set(-3.1,.15,.3);houseBody.castShadow=houseBody.receiveShadow=true;house.add(houseBody);const roof=new THREE.Mesh(new THREE.CylinderGeometry(3.8,3.8,.3,4),darkIron);roof.scale.z=.72;roof.rotation.y=Math.PI/4;roof.position.set(-3.1,1.45,.3);house.add(roof);for(let j=0;j<3;j++){const w=new THREE.Mesh(new THREE.BoxGeometry(.7,.82,.08),new THREE.MeshStandardMaterial({color:j===1?0x8c5d32:0x0b1112,emissive:j===1?0x5c3212:0x000000,emissiveIntensity:j===1?.7:0,roughness:.3}));w.position.set(-4.6+j*1.45,.2,2.42);house.add(w)}world.add(house);
// Gallery + handrail.
const gallery=new THREE.Mesh(new THREE.CylinderGeometry(1.93,1.93,.2,48),iron);gallery.position.y=7.55;tower.add(gallery);for(let i=0;i<32;i++){const a=i/32*Math.PI*2;const p=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.76,6),darkIron);p.position.set(Math.cos(a)*1.82,7.92,Math.sin(a)*1.82);tower.add(p)}for(const r of [1.82]){for(const y of [8.03,8.28]){const rr=new THREE.Mesh(new THREE.TorusGeometry(r,.025,6,64),darkIron);rr.rotation.x=Math.PI/2;rr.position.y=y;tower.add(rr)}}
// Lantern room with mullions.
const lantern=new THREE.Group();const roomGlass=new THREE.Mesh(new THREE.CylinderGeometry(1.42,1.42,1.65,32,1,true),glass);roomGlass.position.y=8.65;lantern.add(roomGlass);for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const mull=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,1.72,6),darkIron);mull.position.set(Math.cos(a)*1.425,8.65,Math.sin(a)*1.425);lantern.add(mull)}const crown=new THREE.Mesh(new THREE.ConeGeometry(1.68,1.05,40),darkIron);crown.position.y=10.03;lantern.add(crown);tower.add(lantern);
// Fresnel: nested prisms, brass cage, clockwork.
const fresnel=new THREE.Group();fresnel.position.y=8.62;for(let i=0;i<12;i++){const rad=.24+i*.083;const ring=new THREE.Mesh(new THREE.TorusGeometry(rad,.022,8,64),glass);ring.rotation.x=Math.PI/2;ring.position.y=(i-5.5)*.036;fresnel.add(ring)}for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const bar=new THREE.Mesh(new THREE.BoxGeometry(.035,1.12,.035),brass);bar.position.set(Math.cos(a)*1.03,0,Math.sin(a)*1.03);fresnel.add(bar)}const source=new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),new THREE.MeshBasicMaterial({color:0xffd18c}));fresnel.add(source);for(let i=0;i<5;i++){const gear=new THREE.Mesh(new THREE.TorusGeometry(.2+i*.075,.035,8,24),brass);gear.rotation.x=Math.PI/2;gear.position.set(.3+i*.08,-.73,.18);fresnel.add(gear)}tower.add(fresnel);
// Spiral stair glimpsed through the lower tower, authored for close camera.
const stairGroup=new THREE.Group();for(let i=0;i<42;i++){const a=i*.41,y=.25+i*.14;const step=new THREE.Mesh(new THREE.BoxGeometry(1.15,.055,.34),iron);step.position.set(Math.cos(a)*.55,y,Math.sin(a)*.55);step.rotation.y=-a;stairGroup.add(step)}tower.add(stairGroup);

// Beam with soft volumetric falloff shader.
const beamGeo=new THREE.ConeGeometry(4.4,31,48,1,true);beamGeo.translate(0,-15.5,0);beamGeo.rotateZ(-Math.PI/2);const beamMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,uniforms:{uOpacity:{value:.02}},vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float uOpacity;varying vec3 vP;void main(){float radial=1.-smoothstep(0.,4.2,abs(vP.z));float fade=smoothstep(-15.5,10.,vP.x)*(1.-smoothstep(9.,15.5,vP.x));gl_FragColor=vec4(vec3(1.,.78,.48),uOpacity*radial*fade);}`});const beam=new THREE.Mesh(beamGeo,beamMat);beam.position.set(0,8.62,0);tower.add(beam);
// Warm glow sprite so the lens reads before geometry does.
const glowTex=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),g=x.createRadialGradient(128,128,0,128,128,128);g.addColorStop(0,'rgba(255,215,150,.95)');g.addColorStop(.18,'rgba(239,180,100,.35)');g.addColorStop(1,'rgba(239,180,100,0)');x.fillStyle=g;x.fillRect(0,0,256,256);return new THREE.CanvasTexture(c)})();const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.set(0,8.62,0);glow.scale.set(3.4,3.4,1);scene.add(glow);

// Salt spray: adapted from falling-leaves Skill — instanced quads tumble, slip is coupled to spin, layers carry depth.
const sprayCount=240,sprayGeo=new THREE.PlaneGeometry(.085,.18);const sprayTex=(()=>{const c=document.createElement('canvas');c.width=64;c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(32,64,2,32,64,52);g.addColorStop(0,'rgba(220,235,232,.82)');g.addColorStop(.35,'rgba(190,215,210,.36)');g.addColorStop(1,'rgba(180,205,202,0)');x.fillStyle=g;x.fillRect(0,0,64,128);return new THREE.CanvasTexture(c)})();const sprayMat=new THREE.MeshBasicMaterial({map:sprayTex,transparent:true,opacity:.38,depthWrite:false,alphaTest:.02,side:THREE.DoubleSide,color:0xb7cfca});const spray=new THREE.InstancedMesh(sprayGeo,sprayMat,sprayCount);spray.frustumCulled=false;scene.add(spray);const motes=Array.from({length:sprayCount},(_,i)=>({x:0,y:0,z:0,spin:Math.random()*6.28,roll:Math.random()*6.28,spinRate:.7+Math.random()*1.8,rollRate:(Math.random()-.5)*.65,fall:.35+Math.random()*.75,slip:.12+Math.random()*.28,scale:.3+Math.random()*1.35,layer:i<45?2:i<145?1:0,life:Math.random()}));const dummy=new THREE.Object3D(),fwd=new THREE.Vector3();function respawn(m,first=false){camera.getWorldDirection(fwd);fwd.y*=.25;fwd.normalize();const ahead=m.layer===2?4.5:m.layer===1?7:10,spread=m.layer===2?4:7;const a=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*spread;m.x=camera.position.x+fwd.x*ahead+Math.cos(a)*r;m.z=camera.position.z+fwd.z*ahead+Math.sin(a)*r;m.y=camera.position.y+(first?Math.random()*10:7+Math.random()*8);m.spin=Math.random()*6.28;m.roll=Math.random()*6.28}motes.forEach(m=>respawn(m,true));

// Continuous camera rail: one journey, never section teleports.
const camPath=new THREE.CatmullRomCurve3([
 new THREE.Vector3(14,3.2,24),new THREE.Vector3(10,2.8,18),new THREE.Vector3(7,3.3,13),new THREE.Vector3(4.4,3.8,9),
 new THREE.Vector3(-5.4,2.8,7.5),new THREE.Vector3(-3.7,3.3,4.2),new THREE.Vector3(-1.8,4.8,3.2),new THREE.Vector3(2.7,6.8,4.5),
 new THREE.Vector3(3.1,8.85,3.8),new THREE.Vector3(1.7,8.82,2.7),new THREE.Vector3(-1.2,8.78,2.45),new THREE.Vector3(-3.9,8.4,5.3),
 new THREE.Vector3(-6.5,6.1,11),new THREE.Vector3(8.5,6.4,18)
],false,'catmullrom',.32);const lookPath=new THREE.CatmullRomCurve3([
 new THREE.Vector3(0,3.3,0),new THREE.Vector3(0,4.0,0),new THREE.Vector3(-1,3.2,.2),new THREE.Vector3(-2.7,2.7,.3),
 new THREE.Vector3(-3.1,2.1,.2),new THREE.Vector3(-1.5,4.2,0),new THREE.Vector3(0,6.2,0),new THREE.Vector3(0,8.3,0),
 new THREE.Vector3(0,8.62,0),new THREE.Vector3(0,8.62,0),new THREE.Vector3(0,8.62,0),new THREE.Vector3(0,8.62,-3),
 new THREE.Vector3(0,6,0),new THREE.Vector3(0,4,0)
],false,'catmullrom',.32);const camPos=new THREE.Vector3(),look=new THREE.Vector3();

let pointerX=0,pointerY=0;if(matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{pointerX=e.clientX/innerWidth-.5;pointerY=e.clientY/innerHeight-.5},{passive:true});
function authoredProgress(p){ // give important scenes more travel time without jumps
 const stops=[[0,.00],[.15,.12],[.32,.29],[.48,.47],[.66,.70],[.82,.84],[1,1]];for(let i=0;i<stops.length-1;i++){const a=stops[i],b=stops[i+1];if(p<=b[0]){const t=(p-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*(t*t*(3-2*t))}}return 1}

const clock=new THREE.Clock();let last=0;function render(){requestAnimationFrame(render);const t=clock.getElapsedTime(),dt=Math.min(1/30,Math.max(.001,t-last));last=t;scrollSmooth+=(scrollTarget-scrollSmooth)*(.045+Math.min(.07,dt*3));const cp=authoredProgress(scrollSmooth);camPath.getPointAt(Math.min(.999,cp),camPos);lookPath.getPointAt(Math.min(.999,cp),look);camera.position.lerp(camPos,.12);camera.position.x+=pointerX*.08;camera.position.y-=pointerY*.045;camera.lookAt(look);camera.fov+=( (activeScene>=3&&activeScene<4?34:activeScene===4?38:41)-camera.fov)*.035;camera.updateProjectionMatrix();seaMat.uniforms.uTime.value=t;
 // authored exposure/light by chapter
 const night=activeScene<5;renderer.toneMappingExposure+=( (night?.64:.82)-renderer.toneMappingExposure)*.025;scene.fog.density+=( (activeScene>=2&&activeScene<4?.018:.028)-scene.fog.density)*.025;practical.intensity+=( (activeScene>=1.7&&activeScene<2.8?3.1:.75)-practical.intensity)*.03;lanternLight.intensity+=( (activeScene>=2.8&&activeScene<4.7?4.8:1.2)-lanternLight.intensity)*.03;
 // Fresnel + beam. Scroll becomes azimuth, but time keeps the machine breathing.
 const az=(scrollSmooth*1160+t*3)%360;$('#azimuthReadout').textContent=`${Math.round(az).toString().padStart(3,'0')}°`;fresnel.rotation.y=-az*Math.PI/180*.22;beam.rotation.y=az*Math.PI/180;beamMat.uniforms.uOpacity.value+=( (activeScene>=3.7&&activeScene<5?.15:activeScene>=2.85?.045:.008)-beamMat.uniforms.uOpacity.value)*.04;glow.material.opacity=activeScene>=2.75&&activeScene<4.8?.75:.26;
 // spray tumble + coupled sideways slip
 motes.forEach((m,i)=>{m.spin+=m.spinRate*dt;m.roll+=m.rollRate*dt;m.x+=Math.sin(m.spin)*m.slip*dt;m.y-=m.fall*dt;camera.getWorldDirection(fwd);const dx=m.x-camera.position.x,dy=m.y-camera.position.y,dz=m.z-camera.position.z;if(m.y<camera.position.y-5||dx*dx+dy*dy+dz*dz>900)respawn(m);dummy.position.set(m.x,m.y,m.z);dummy.rotation.set(m.roll,0,m.spin);const face=Math.max(.04,Math.abs(Math.cos(m.spin))),layerScale=m.layer===2?1.45:m.layer===1?.78:.42;dummy.scale.set(m.scale*layerScale*face,m.scale*layerScale,m.scale);dummy.updateMatrix();spray.setMatrixAt(i,dummy.matrix)});spray.instanceMatrix.needsUpdate=true;
 renderer.render(scene,camera)}render();

// GSAP is used as choreography, not as a bag of effects.
if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);
 gsap.to('.ghost-type',{xPercent:-8,ease:'none',scrollTrigger:{trigger:'#opening',start:'top top',end:'bottom top',scrub:1}});
 gsap.fromTo('.occlusion-door',{xPercent:-18},{xPercent:24,ease:'none',scrollTrigger:{trigger:'#keeper',start:'top 70%',end:'bottom 25%',scrub:1}});
 gsap.fromTo('.log-fragment',{y:80,rotate:-4,autoAlpha:0},{y:0,rotate:-1.2,autoAlpha:1,ease:'none',scrollTrigger:{trigger:'#keeper',start:'top 58%',end:'center 45%',scrub:1}});
 gsap.to('.fg--rail',{yPercent:-18,xPercent:-8,ease:'none',scrollTrigger:{trigger:'#stair',start:'top bottom',end:'bottom top',scrub:1}});
 const machineTL=gsap.timeline({scrollTrigger:{trigger:'#machine',start:'top top',end:'bottom bottom',scrub:1}});machineTL.fromTo('.fresnel-hud',{scale:.8,autoAlpha:.2},{scale:1.08,autoAlpha:1,duration:.45,ease:'none'}).to('.fresnel-hud',{rotation:12,duration:.35,ease:'none'},0).fromTo('.machine-ghost',{xPercent:22,autoAlpha:.1},{xPercent:-8,autoAlpha:.7,duration:.8,ease:'none'},0).to('.fg--lens',{scale:1.18,xPercent:-15,duration:.9,ease:'none'},0);
 ScrollTrigger.create({trigger:'#beam',start:'top 52%',once:true,onEnter:()=>gsap.timeline().to('#transitionFlash',{opacity:.85,duration:.10,ease:'power2.in'}).to('#transitionFlash',{opacity:0,duration:.72,ease:'power2.out'})});
 gsap.fromTo('.ghost-type--dawn',{xPercent:10},{xPercent:-14,ease:'none',scrollTrigger:{trigger:'#afterlight',start:'top bottom',end:'bottom top',scrub:1}});
}

function resize(){renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();if(window.ScrollTrigger)ScrollTrigger.refresh()}addEventListener('resize',resize,{passive:true});
if(matchMedia('(prefers-reduced-motion:reduce)').matches){spray.visible=false;beamMat.uniforms.uOpacity.value=.025}
})();