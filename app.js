(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,smooth=(a,b,t)=>{t=clamp((t-a)/(b-a),0,1);return t*t*(3-2*t)};
const REDUCE=matchMedia('(prefers-reduced-motion:reduce)').matches,COARSE=matchMedia('(pointer:coarse)').matches;
const nav=$('#nav'),burger=$('#burger'),sections=$$('.sec'),links=$$('.nav-links a');

/* ---------- editorial / navigation ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('rv-in')),{threshold:.14,rootMargin:'0px 0px -7%'});$$('[data-rv]').forEach(el=>io.observe(el));
burger?.addEventListener('click',()=>{const o=document.body.classList.toggle('nav-open');burger.setAttribute('aria-expanded',String(o))});
links.forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('nav-open')));
sections.forEach((s,i)=>{const b=document.createElement('button');b.innerHTML='<i></i>';b.title=s.id;b.setAttribute('aria-label',s.id);b.addEventListener('click',()=>scrollTo({top:s.offsetTop-24,behavior:REDUCE?'auto':'smooth'}));$('#rail')?.appendChild(b)});
const dots=$$('#rail button');let active=0;
function sectionState(){const mid=innerHeight*.47;let best=0,bd=1e9;sections.forEach((s,i)=>{const r=s.getBoundingClientRect(),d=Math.abs(r.top+r.height*.44-mid);if(d<bd){bd=d;best=i}});active=best;dots.forEach((d,i)=>d.classList.toggle('on',i===active));links.forEach(a=>a.classList.toggle('on',a.hash==='#'+sections[active].id));nav?.classList.toggle('stuck',scrollY>40)}
addEventListener('scroll',sectionState,{passive:true});sectionState();

/* Kage foreground lifecycle: section -> global stage -> retire -> home. */
function wireForegroundStages(){const pairs=$$('.sec .fg').map(stage=>({section:stage.closest('.sec'),stage})).filter(p=>p.section);if(!pairs.length)return;const sky=$('#fg-sky'),ratios=new Map(pairs.map(p=>[p.section,0])),homes=new WeakMap(pairs.map(p=>[p.stage,p.section])),timers=new WeakMap();let current=null;
 const lift=stage=>{if(!sky||stage.parentNode===sky)return;sky.appendChild(stage);void stage.offsetWidth};
 const park=stage=>{const h=homes.get(stage);if(h&&stage.parentNode!==h)h.insertBefore(stage,h.firstChild)};
 const retire=stage=>{if(!stage||stage===current)return;clearTimeout(timers.get(stage));stage.classList.remove('fg-active');if(REDUCE){park(stage);return}stage.classList.add('fg-retiring');timers.set(stage,setTimeout(()=>{stage.classList.remove('fg-retiring');park(stage)},820))};
 const activate=stage=>{if(!stage||stage===current)return;clearTimeout(timers.get(stage));stage.classList.remove('fg-retiring');lift(stage);stage.classList.add('fg-active');const old=current;current=stage;retire(old)};
 const ob=new IntersectionObserver(es=>{es.forEach(e=>ratios.set(e.target,e.isIntersecting?e.intersectionRatio:0));let next=pairs[0];pairs.forEach(p=>{if((ratios.get(p.section)||0)>(ratios.get(next.section)||0))next=p});if((ratios.get(next.section)||0)>0)activate(next.stage)},{rootMargin:'-12% 0px -12% 0px',threshold:[0,.12,.32,.55]});pairs.forEach(p=>ob.observe(p.section));}
wireForegroundStages();

const cursor=$('#cursor');if(cursor&&!COARSE&&matchMedia('(hover:hover)').matches){let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});(function follow(){x=lerp(x,tx,.18);y=lerp(y,ty,.18);cursor.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(follow)})()}

if(!window.THREE){document.body.classList.add('no-webgl');return}

/* ---------- renderer ---------- */
const renderer=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.55));renderer.setSize(innerWidth,innerHeight,false);renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.88;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x04090c);scene.fog=new THREE.FogExp2(0x081319,.017);
const camera=new THREE.PerspectiveCamera(40,innerWidth/innerHeight,.08,260);
const WORLD={uT:{value:0},fg:[],spray:[],machine:new THREE.Group(),lighthouse:new THREE.Group()};
window.__FARO_QA__={ready:false,world:'single-webgl',plates:false};

/* ---------- deterministic textures ---------- */
function rng(seed=1){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function cvs(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function tx(c,repeat=[1,1]){const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...repeat);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t}
function weatherMap(seed,base,stains){const S=512,c=cvs(S,S),x=c.getContext('2d'),r=rng(seed);x.fillStyle=base;x.fillRect(0,0,S,S);for(let i=0;i<8500;i++){const v=130+r()*100;x.fillStyle=`rgba(${v},${v+4},${v+2},${.012+r()*.09})`;const q=.5+r()*2.4;x.fillRect(r()*S,r()*S,q,q)}for(let i=0;i<220;i++){x.fillStyle=stains(r());x.beginPath();x.ellipse(r()*S,r()*S,2+r()*20,1+r()*7,r()*Math.PI,0,Math.PI*2);x.fill()}for(let i=0;i<50;i++){x.strokeStyle=`rgba(40,50,49,${.025+r()*.06})`;x.lineWidth=.5+r()*1.3;x.beginPath();let y=r()*S;x.moveTo(0,y);for(let k=1;k<10;k++){y+=(r()-.5)*11;x.lineTo(k*S/9,y)}x.stroke()}return tx(c,[2.2,2.2])}
const stoneMap=weatherMap(21,'#a9aea8',r=>r>.55?`rgba(225,229,218,${r*.08})`:`rgba(50,66,64,${r*.055})`);
const rustMap=weatherMap(44,'#242727',r=>r>.45?`rgba(151,77,38,${r*.15})`:`rgba(10,15,16,${r*.12})`);
const rockMap=weatherMap(77,'#11191c',r=>`rgba(${20+r*30},${30+r*25},${32+r*28},${r*.12})`);
const stone=new THREE.MeshStandardMaterial({map:stoneMap,color:0xb7bcb6,roughness:.94,metalness:0});
const stoneDark=new THREE.MeshStandardMaterial({map:stoneMap,color:0x777e79,roughness:.97,metalness:0});
const iron=new THREE.MeshStandardMaterial({map:rustMap,color:0x30302d,roughness:.66,metalness:.72});
const ironDark=new THREE.MeshStandardMaterial({map:rustMap,color:0x111718,roughness:.58,metalness:.8});
const rockMat=new THREE.MeshStandardMaterial({map:rockMap,color:0x172126,roughness:.93,metalness:.02});
const brass=new THREE.MeshStandardMaterial({color:0x7d5b31,roughness:.4,metalness:.9});
const brassHi=new THREE.MeshStandardMaterial({color:0xb28a4d,roughness:.28,metalness:.94});
const glass=new THREE.MeshPhysicalMaterial({color:0xa9c4c0,transparent:true,opacity:.23,transmission:.82,thickness:.46,ior:1.46,roughness:.055,metalness:0,depthWrite:false});
const prismGlass=new THREE.MeshPhysicalMaterial({color:0xbdd9d4,transparent:true,opacity:.39,transmission:.76,thickness:.7,ior:1.48,roughness:.025,metalness:0,depthWrite:false});

/* ---------- sky + sea ---------- */
const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{uDawn:{value:0}},vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float uDawn;varying vec3 vP;void main(){float h=clamp(normalize(vP).y*.5+.5,0.,1.);vec3 top=vec3(.010,.024,.036),hor=vec3(.055,.10,.12);vec3 nt=mix(hor,top,smoothstep(.25,1.,h));vec3 dt=mix(vec3(.48,.44,.38),vec3(.19,.29,.33),h);gl_FragColor=vec4(mix(nt,dt,uDawn),1.);}`});scene.add(new THREE.Mesh(new THREE.SphereGeometry(170,32,20),skyMat));
const seaMat=new THREE.ShaderMaterial({uniforms:{uTime:WORLD.uT,uDawn:{value:0}},vertexShader:`uniform float uTime;varying float vH;varying vec3 vP;void main(){vec3 p=position;float a=sin(p.x*.24+uTime*.30)*.17+sin(p.y*.16-uTime*.22)*.13+sin((p.x+p.y)*.08+uTime*.13)*.10+sin(p.x*.75-p.y*.42+uTime*.5)*.028;p.z+=a;vH=a;vP=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`uniform float uDawn;varying float vH;varying vec3 vP;void main(){vec3 deep=vec3(.008,.030,.043),lift=vec3(.055,.115,.135);float c=smoothstep(.08,.34,vH);float streak=pow(max(0.,sin(vP.x*.34+vP.y*.12)*.5+.5),22.);vec3 n=mix(deep,lift,c*.48)+vec3(.13,.17,.17)*streak*c*.22;vec3 d=mix(vec3(.08,.15,.17),vec3(.28,.30,.27),c);gl_FragColor=vec4(mix(n,d,uDawn),1.);}`});
const sea=new THREE.Mesh(new THREE.PlaneGeometry(200,200,112,112),seaMat);sea.rotation.x=-Math.PI/2;sea.position.y=-2.9;scene.add(sea);

/* ---------- lights ---------- */
const hemi=new THREE.HemisphereLight(0x6f8994,0x030709,.38);scene.add(hemi);
const moon=new THREE.DirectionalLight(0x9ebcc8,1.35);moon.position.set(-13,18,9);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);scene.add(moon);
const warmHouse=new THREE.PointLight(0xd88c48,2.6,20,2);warmHouse.position.set(-3.8,1.5,1.5);scene.add(warmHouse);
const lanternWarm=new THREE.PointLight(0xf0b76d,5.2,19,2);lanternWarm.position.set(.2,9.15,-1.0);scene.add(lanternWarm);
const machineRim=new THREE.SpotLight(0x9cc3cf,5.2,22,Math.PI/7,.45,1.2);machineRim.position.set(5.2,11.2,4.8);machineRim.target.position.set(0,9.1,-1.1);scene.add(machineRim,machineRim.target);
const machineBack=new THREE.PointLight(0xf0a75f,3.8,12,2);machineBack.position.set(-.4,9.25,-2.15);scene.add(machineBack);

/* ---------- terrain ---------- */
const cliff=new THREE.Group(),rr=rng(404);for(let i=0;i<15;i++){const geo=new THREE.IcosahedronGeometry(2.4+rr()*4.0,2),p=geo.attributes.position;for(let j=0;j<p.count;j++){const x=p.getX(j),y=p.getY(j),z=p.getZ(j),n=1+Math.sin(x*1.9+z*1.4+i)*.07+Math.sin(y*2.9+i)*.045;p.setXYZ(j,x*n,y*n*.63,z*n)}geo.computeVertexNormals();const m=new THREE.Mesh(geo,rockMat);m.position.set((rr()-.5)*16,-2.2+rr()*1.35,(rr()-.5)*12-1);m.scale.set(1+rr()*1.5,.52+rr()*.5,.8+rr()*.9);m.rotation.set(rr()*.12,rr()*Math.PI,rr()*.08);m.castShadow=m.receiveShadow=true;cliff.add(m)}scene.add(cliff);

/* ---------- lighthouse exterior ---------- */
const world=WORLD.lighthouse;world.position.z=-1.2;scene.add(world);const tower=new THREE.Group();world.add(tower);
for(let i=0;i<7;i++){const h=1.25,y=.16+i*1.22,r=1.72-i*.058;const seg=new THREE.Mesh(new THREE.CylinderGeometry(r-.055,r,h,64,4),i===6?stoneDark:stone);seg.position.y=y+2.5;seg.rotation.y=(i%2?1:-1)*.016;seg.castShadow=seg.receiveShadow=true;tower.add(seg);const seam=new THREE.Mesh(new THREE.TorusGeometry(r,.014,5,64),stoneDark);seam.rotation.x=Math.PI/2;seam.position.y=seg.position.y-h*.5;tower.add(seam)}
for(let i=0;i<5;i++){const a=.55+i*.83,y=2.15+i*1.26;const frame=new THREE.Group();const ap=new THREE.Mesh(new THREE.BoxGeometry(.44,.72,.08),ironDark);ap.position.set(Math.sin(a)*1.49,y,Math.cos(a)*1.49);ap.lookAt(0,y,0);frame.add(ap);const sill=new THREE.Mesh(new THREE.BoxGeometry(.62,.075,.2),stoneDark);sill.position.copy(ap.position);sill.position.y-=.41;sill.lookAt(0,sill.position.y,0);frame.add(sill);tower.add(frame)}
const house=new THREE.Group();const hb=new THREE.Mesh(new THREE.BoxGeometry(6.1,2.35,4.3),stoneDark);hb.position.set(-3.35,.15,.3);hb.castShadow=hb.receiveShadow=true;house.add(hb);const roof=new THREE.Mesh(new THREE.CylinderGeometry(3.95,3.95,.32,4),ironDark);roof.rotation.y=Math.PI/4;roof.scale.z=.72;roof.position.set(-3.35,1.47,.3);house.add(roof);for(let i=0;i<3;i++){const lit=i===1,w=new THREE.Mesh(new THREE.BoxGeometry(.68,.84,.08),new THREE.MeshStandardMaterial({color:lit?0x6f4628:0x071012,emissive:lit?0x6b3515:0,emissiveIntensity:lit?.75:0,roughness:.35}));w.position.set(-4.85+i*1.5,.18,2.48);house.add(w)}world.add(house);
const gallery=new THREE.Mesh(new THREE.CylinderGeometry(2.12,2.12,.16,64),ironDark);gallery.position.y=8.23;tower.add(gallery);for(let i=0;i<36;i++){const a=i/36*Math.PI*2,p=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.78,6),ironDark);p.position.set(Math.cos(a)*1.98,8.62,Math.sin(a)*1.98);tower.add(p)}for(const y of [8.49,8.82]){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.98,.022,6,72),ironDark);ring.rotation.x=Math.PI/2;ring.position.y=y;tower.add(ring)}

/* lantern shell kept dark/translucent so the optic, not the tower, is hero */
const lantern=new THREE.Group();const lanternGlass=new THREE.Mesh(new THREE.CylinderGeometry(1.68,1.68,1.82,30,1,true),glass);lanternGlass.position.y=9.17;lantern.add(lanternGlass);for(let i=0;i<15;i++){const a=i/15*Math.PI*2,p=new THREE.Mesh(new THREE.BoxGeometry(.028,1.86,.045),ironDark);p.position.set(Math.cos(a)*1.69,9.17,Math.sin(a)*1.69);p.rotation.y=-a;lantern.add(p)}const crown=new THREE.Mesh(new THREE.CylinderGeometry(1.77,1.77,.11,48),ironDark);crown.position.y=10.08;lantern.add(crown);const cap=new THREE.Mesh(new THREE.ConeGeometry(1.82,.86,42),ironDark);cap.position.y=10.55;lantern.add(cap);tower.add(lantern);

/* ---------- spiral ascent ---------- */
const stair=new THREE.Group();for(let i=0;i<50;i++){const a=i*.34,y=1.15+i*.135,r=1.00;const step=new THREE.Mesh(new THREE.BoxGeometry(1.12,.05,.32),ironDark);step.position.set(Math.cos(a)*r,y,Math.sin(a)*r);step.rotation.y=-a+.17;stair.add(step);if(i%2===0){const post=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,.58,6),iron);post.position.set(Math.cos(a)*1.45,y+.29,Math.sin(a)*1.45);stair.add(post)}}tower.add(stair);

/* ---------- Fresnel / machine set ---------- */
const machine=WORLD.machine;machine.position.set(0,9.15,-1.15);world.add(machine);
const lensGroup=new THREE.Group();machine.add(lensGroup);
// vertical concentric prism rings: the optic reads from the camera as a lens, not stacked hoops.
for(let i=0;i<14;i++){const r=.22+i*.082;const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.022,10,80),prismGlass);ring.position.z=.02+i*.002;lensGroup.add(ring)}
// central glass drum and inner warm source.
const drum=new THREE.Mesh(new THREE.CylinderGeometry(.88,.88,1.72,48,1,true),prismGlass);drum.rotation.z=Math.PI/2;drum.scale.z=.28;lensGroup.add(drum);
const core=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.75,24),new THREE.MeshBasicMaterial({color:0xffc77d,toneMapped:false}));core.rotation.z=Math.PI/2;core.position.z=-.12;lensGroup.add(core);
// brass vertical frame + horizontal cradle.
for(const x of [-1.18,1.18]){const p=new THREE.Mesh(new THREE.BoxGeometry(.055,2.25,.08),brassHi);p.position.set(x,0,0);machine.add(p)}
for(const y of [-1.08,1.08]){const p=new THREE.Mesh(new THREE.BoxGeometry(2.42,.055,.08),brass);p.position.set(0,y,0);machine.add(p)}
for(let i=0;i<8;i++){const a=i*Math.PI/4,p=new THREE.Mesh(new THREE.BoxGeometry(.035,2.04,.04),brass);p.rotation.z=a;machine.add(p)}
// clockwork sits to the side, not across the optic face.
for(let g=0;g<5;g++){const teeth=20+g*3,gear=new THREE.Group(),radius=.24+g*.075;const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.035,6,teeth),g%2?brass:brassHi);gear.add(ring);for(let i=0;i<teeth;i++){const a=i/teeth*Math.PI*2,t=new THREE.Mesh(new THREE.BoxGeometry(.05,.072,.04),brass);t.position.set(Math.cos(a)*(radius+.04),Math.sin(a)*(radius+.04),0);t.rotation.z=a;gear.add(t)}gear.position.set(1.55+(g%2)*.34,-.62+g*.31,.18);gear.scale.setScalar(.72);gear.userData.speed=(g%2?1:-1)*(.18+g*.035);machine.add(gear)}
const basePlate=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.45,.10,48),brass);basePlate.rotation.z=Math.PI/2;basePlate.scale.z=.18;basePlate.position.y=-1.33;machine.add(basePlate);

/* beam */
const beamGeo=new THREE.ConeGeometry(3.8,30,40,1,true);beamGeo.translate(0,-15,0);beamGeo.rotateZ(-Math.PI/2);const beamMat=new THREE.MeshBasicMaterial({color:0xf1d09a,transparent:true,opacity:.02,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false});const beam=new THREE.Mesh(beamGeo,beamMat);beam.position.set(0,9.15,-1.15);tower.add(beam);

/* ---------- Kage-style world cutouts ---------- */
function grassCutout(seed=1){const W=1024,H=512,c=cvs(W,H),x=c.getContext('2d'),r=rng(seed);x.clearRect(0,0,W,H);for(let i=0;i<6200;i++){const px=r()*W,base=H*(.82+r()*.18),len=20+r()*105,lean=(r()-.5)*44;x.strokeStyle=`rgba(${43+r()*42},${62+r()*48},${55+r()*30},${.13+r()*.48})`;x.lineWidth=.4+r()*1.5;x.beginPath();x.moveTo(px,base);x.quadraticCurveTo(px+lean*.55,base-len*.54,px+lean,base-len);x.stroke()}return c}
function rockCutout(seed=4){const W=1024,H=600,c=cvs(W,H),x=c.getContext('2d'),r=rng(seed);x.clearRect(0,0,W,H);x.fillStyle='rgba(11,18,20,.98)';x.beginPath();x.moveTo(0,H);for(let i=0;i<=18;i++){const px=i/18*W,py=H*(.58-r()*.25);x.lineTo(px,py)}x.lineTo(W,H);x.closePath();x.fill();return c}
function cutoutMaterial(canvas,sway=.05){const mat=new THREE.MeshBasicMaterial({map:tx(canvas),transparent:true,depthWrite:true,alphaTest:.012,side:THREE.DoubleSide,fog:true,color:0xffffff});mat.onBeforeCompile=sh=>{sh.uniforms.uT=WORLD.uT;sh.uniforms.uSway={value:sway};sh.vertexShader='uniform float uT;\nuniform float uSway;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nfloat h=uv.y; transformed.x += sin(uT*.78 + position.x*.28)*uSway*h*h;');sh.fragmentShader=sh.fragmentShader.replace('#include <alphatest_fragment>','float ex=smoothstep(0.,.10,vUv.x)*(1.-smoothstep(.90,1.,vUv.x)); float ey=smoothstep(0.,.055,vUv.y); diffuseColor.a*=ex*ey;\n#include <alphatest_fragment>')};return mat}
function buildForeground(){const defs=[['grassFar',grassCutout(11),-5,2.7,-.5,24,12,.03],['rockLeft',rockCutout(31),-7.5,1.8,1.7,16,9,.003],['grassMid',grassCutout(22),4,2.75,3.2,15,7.5,.055],['grassNear',grassCutout(33),-2,2.8,5.3,12,6,.085],['rockNear',rockCutout(47),-6.7,1.3,6.0,9,5.5,.004]];defs.forEach(d=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(d[5],d[6],10,10),cutoutMaterial(d[1],d[7]));m.position.set(d[2],d[3],d[4]);m.renderOrder=20+WORLD.fg.length;m.frustumCulled=false;scene.add(m);WORLD.fg.push(m)})}buildForeground();

/* spray / airborne salt */
const sprayGeo=new THREE.PlaneGeometry(.065,.022),sprayMat=new THREE.MeshBasicMaterial({color:0xb9cac7,transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide});const sprayCount=220,spray=new THREE.InstancedMesh(sprayGeo,sprayMat,sprayCount),dummy=new THREE.Object3D(),sprayData=[],sr=rng(818);for(let i=0;i<sprayCount;i++){const layer=i<70?0:i<170?1:2;sprayData.push({x:(sr()-.5)*(layer===2?12:28),y:sr()*12-1,z:(sr()-.5)*(layer===2?10:30)+4,sp:.12+sr()*.34,phase:sr()*10,layer})}spray.frustumCulled=false;scene.add(spray);

/* ---------- authored camera states, same world ---------- */
const poses=[
 {p:[13.8,4.7,24],t:[0,4.6,-1.1],f:40},
 {p:[8.1,3.0,14.1],t:[0,4.2,-1.1],f:39},
 {p:[-6.8,2.65,8.1],t:[-3.0,1.4,.4],f:46},
 {p:[2.0,5.4,3.8],t:[0,5.7,-1.1],f:50},
 // Machine enters the lantern room and points at Fresnel, not at the tower shell.
 {p:[3.25,9.55,3.15],t:[0,9.18,-1.15],f:48},
 {p:[-.55,9.35,5.15],t:[0,9.18,-1.15],f:32},
 {p:[10.4,6.0,18.5],t:[0,5.0,-1.2],f:42}
];
const anchors=[];function measure(){anchors.length=0;sections.forEach(s=>anchors.push(s.offsetTop));anchors.push(document.documentElement.scrollHeight-innerHeight)}measure();addEventListener('resize',measure,{passive:true});
function cameraProgress(y){let i=0;for(let k=0;k<sections.length-1;k++)if(y>=anchors[k])i=k;const a=anchors[i]||0,b=anchors[i+1]||a+1;return{i,t:smooth(.05,.95,(y-a)/(b-a))}}
const cp=new THREE.Vector3(),ct=new THREE.Vector3(),pp=new THREE.Vector3(),pt=new THREE.Vector3();let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});

/* live machine viewport = second camera into same world */
const machineCam=new THREE.PerspectiveCamera(44,1,.08,80);machineCam.position.set(2.25,9.45,2.3);machineCam.lookAt(0,9.18,-1.15);const live=$('[data-view="machine"] [data-frame]');
function renderLive(){if(!live)return;const r=live.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||r.width<8||r.height<8)return;const x=Math.max(0,r.left),y=Math.max(0,innerHeight-r.bottom),w=Math.min(innerWidth-x,r.width),h=Math.min(innerHeight-y,r.height);if(w<=0||h<=0)return;renderer.setScissorTest(true);renderer.setViewport(x,y,w,h);renderer.setScissor(x,y,w,h);machineCam.aspect=w/h;machineCam.updateProjectionMatrix();renderer.render(scene,machineCam);renderer.setScissorTest(false);renderer.setViewport(0,0,innerWidth,innerHeight)}

/* runtime grain */
(function(){const S=180,c=cvs(S,S),x=c.getContext('2d'),im=x.createImageData(S,S),d=im.data,r=rng(9);for(let i=0;i<S*S;i++){const v=105+r()*100;d[i*4]=d[i*4+1]=d[i*4+2]=v;d[i*4+3]=255}x.putImageData(im,0,0);if($('#grain'))$('#grain').style.backgroundImage=`url(${c.toDataURL('image/png')})`})();

const clock=new THREE.Clock();let smoothScroll=scrollY;
function tick(){requestAnimationFrame(tick);const dt=Math.min(clock.getDelta(),.033),time=clock.elapsedTime;WORLD.uT.value=time;smoothScroll=lerp(smoothScroll,scrollY,REDUCE?1:.085);const pr=cameraProgress(smoothScroll),a=poses[pr.i],b=poses[Math.min(pr.i+1,poses.length-1)];pp.set(...a.p).lerp(cp.set(...b.p),pr.t);pt.set(...a.t).lerp(ct.set(...b.t),pr.t);camera.position.lerp(pp,.12);camera.position.x+=mx*.08;camera.position.y+=-my*.04;camera.fov=lerp(a.f,b.f,pr.t);camera.updateProjectionMatrix();camera.lookAt(pt);
 const sec=pr.i;const targetExposure=sec===4?1.02:sec===5?.96:sec===2?.78:sec===6?.93:.84;renderer.toneMappingExposure=lerp(renderer.toneMappingExposure,targetExposure,.045);scene.fog.density=lerp(scene.fog.density,sec===5?.026:sec===3?.021:sec===4?.010:.016,.04);hemi.intensity=lerp(hemi.intensity,sec===4?.20:sec===2?.25:.38,.05);moon.intensity=lerp(moon.intensity,sec===4?.60:sec===2?.45:1.35,.05);warmHouse.intensity=lerp(warmHouse.intensity,sec===2?3.8:.8,.05);lanternWarm.intensity=lerp(lanternWarm.intensity,sec===4?6.5:sec===5?5.8:1.4,.055);machineRim.intensity=lerp(machineRim.intensity,sec===4?6.6:sec===5?3.0:.45,.055);machineBack.intensity=lerp(machineBack.intensity,sec===4?5.1:sec===5?3.8:.35,.055);beamMat.opacity=lerp(beamMat.opacity,sec===5?.13:sec===4?.035:.008,.055);skyMat.uniforms.uDawn.value=lerp(skyMat.uniforms.uDawn.value,sec===6?1:0,.025);seaMat.uniforms.uDawn.value=skyMat.uniforms.uDawn.value;
 beam.rotation.y=time*.12+smoothScroll*.0015;lensGroup.rotation.y=Math.sin(time*.18)*.025;machine.children.forEach(o=>{if(o.userData.speed)o.rotation.z+=o.userData.speed*dt});
 const msec=$('#machine'),mr=msec?.getBoundingClientRect(),mt=mr?clamp(-mr.top/Math.max(1,msec.offsetHeight-innerHeight),0,1):0;if($('#azimuthBar'))$('#azimuthBar').style.width=`${mt*100}%`;beam.rotation.y+=mt*Math.PI*2.15;
 sprayData.forEach((d,i)=>{d.x+=d.sp*dt*(d.layer===2?1.7:1);d.y+=Math.sin(time*.7+d.phase)*dt*.04;if(d.x>18)d.x=-18;dummy.position.set(d.x,d.y,d.z);dummy.rotation.set(time*(.23+d.sp)+d.phase,time*(.17+d.sp*.4),time*(.29+d.sp*.5));const s=d.layer===2?1.6:d.layer===1?1:.64;dummy.scale.setScalar(s);dummy.updateMatrix();spray.setMatrixAt(i,dummy.matrix)});spray.instanceMatrix.needsUpdate=true;
 renderer.setScissorTest(false);renderer.setViewport(0,0,innerWidth,innerHeight);renderer.render(scene,camera);renderLive();window.__FARO_QA__.ready=true;}
tick();
function resize(){renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.55));camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();measure()}addEventListener('resize',resize,{passive:true});resize();
})();
