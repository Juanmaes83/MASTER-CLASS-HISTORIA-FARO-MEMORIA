(()=>{
'use strict';
if(!window.THREE)return;
const THREE=window.THREE;
const state={installed:false,alignedFrames:0,lastSection:'hero',scene:null,mainCamera:null};
window.__FARO_VISUAL_PREMIUM__=state;

function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function smooth(a,b,t){t=clamp((t-a)/(b-a),0,1);return t*t*(3-2*t)}
function rng(seed=1){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function canvasTexture(draw,w=512,h=512){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t}

function injectWorldOverlay(){
 if(document.getElementById('premium-world'))return;
 const node=document.createElement('div');node.id='premium-world';node.setAttribute('aria-hidden','true');
 node.innerHTML='<div class="premium-horizon"></div><div class="premium-sea-breath"></div><div class="premium-rock-bank"></div><div class="premium-mist"></div>';
 const gl=document.getElementById('gl');gl?.insertAdjacentElement('afterend',node);
}

function rockTexture(){return canvasTexture((x,w,h)=>{
 const r=rng(811);x.fillStyle='#172126';x.fillRect(0,0,w,h);
 for(let i=0;i<5200;i++){const g=20+r()*34,a=.018+r()*.07;x.fillStyle=`rgba(${g},${g+8},${g+9},${a})`;x.fillRect(r()*w,r()*h,.5+r()*2.2,.5+r()*2.2)}
 for(let i=0;i<95;i++){x.strokeStyle=`rgba(111,131,128,${.018+r()*.04})`;x.lineWidth=.4+r()*1.5;x.beginPath();let y=r()*h;x.moveTo(0,y);for(let k=1;k<8;k++){y+=(r()-.5)*18;x.lineTo(k*w/7,y)}x.stroke()}
 },512,512)}

function buildPremiumCoast(scene){
 const tex=rockTexture();tex.repeat.set(1.8,1.8);
 const rockMat=new THREE.MeshStandardMaterial({map:tex,color:0x172126,roughness:.96,metalness:.015});
 const wetMat=new THREE.MeshStandardMaterial({map:tex,color:0x1f2c2f,roughness:.74,metalness:.055});
 const g=new THREE.Group();g.name='premium-coast-depth';
 const r=rng(921);
 for(let i=0;i<24;i++){
  const geo=new THREE.DodecahedronGeometry(1.25+r()*3.1,1),p=geo.attributes.position;
  for(let j=0;j<p.count;j++){
   const x=p.getX(j),y=p.getY(j),z=p.getZ(j);
   const n=1+Math.sin(x*2.2+z*1.55+i)*.095+Math.sin(y*3.7+i*.8)*.055;
   p.setXYZ(j,x*n,y*n*(.48+r()*.18),z*n*(.82+r()*.22));
  }
  geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,i%5===0?wetMat:rockMat);
  const band=i<9?0:i<17?1:2;
  m.position.set((r()-.5)*(band===0?25:band===1?20:14),-2.28+r()*.72,(r()-.5)*(band===2?11:18)+(band===0?-6:band===1?1:6));
  m.scale.set(.9+r()*1.9,.58+r()*.48,.75+r()*1.1);m.rotation.set((r()-.5)*.16,r()*Math.PI,(r()-.5)*.14);
  m.castShadow=m.receiveShadow=true;g.add(m);
 }
 scene.add(g);
 return g;
}

function buildSeaSkin(scene){
 const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{uTime:{value:0}},vertexShader:`uniform float uTime;varying float vW;varying vec2 vUv2;void main(){vec3 p=position;float w1=sin(p.x*.31+uTime*.34)+sin(p.y*.19-uTime*.22);float w2=sin((p.x+p.y)*.11+uTime*.17)+sin(p.x*.83-p.y*.46+uTime*.51);float w=w1*.055+w2*.022;p.z+=w;vW=w;vUv2=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`varying float vW;varying vec2 vUv2;void main(){float line=pow(max(0.,sin((vUv2.x*13.+vUv2.y*4.)*3.14159)*.5+.5),18.);float crest=smoothstep(.028,.105,vW);vec3 c=mix(vec3(.02,.055,.068),vec3(.16,.23,.235),crest*.58);c+=vec3(.18,.22,.21)*line*crest*.28;float a=.10+crest*.15+line*crest*.055;gl_FragColor=vec4(c,a);}`});
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(205,205,92,92),mat);sea.name='premium-sea-skin';sea.rotation.x=-Math.PI/2;sea.position.y=-2.82;sea.renderOrder=2;scene.add(sea);
 return {mesh:sea,mat};
}

function buildHaze(scene){
 const tex=canvasTexture((x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(105,145,151,0)');g.addColorStop(.35,'rgba(105,145,151,.12)');g.addColorStop(.62,'rgba(48,78,84,.16)');g.addColorStop(1,'rgba(5,14,18,0)');x.fillStyle=g;x.fillRect(0,0,w,h)},256,256);
 tex.wrapS=tex.wrapT=THREE.ClampToEdgeWrapping;
 const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,opacity:.72,fog:false,side:THREE.DoubleSide});
 const plane=new THREE.Mesh(new THREE.PlaneGeometry(120,22),mat);plane.name='premium-atmospheric-haze';plane.position.set(0,3.6,-43);plane.renderOrder=1;scene.add(plane);return plane;
}

let premiumSea=null,premiumRocks=null,premiumHaze=null;
function install(scene){
 if(state.installed)return;state.installed=true;state.scene=scene;document.body.classList.add('premium-visual-pass');injectWorldOverlay();
 premiumRocks=buildPremiumCoast(scene);premiumSea=buildSeaSkin(scene);premiumHaze=buildHaze(scene);
}

function sectionProgress(id){const el=document.getElementById(id);if(!el)return 0;const r=el.getBoundingClientRect();const span=Math.max(1,r.height+innerHeight);return clamp((innerHeight-r.top)/span,0,1)}
function updateEditorialBlend(){
 const ids=['hero','coast','keeper','stair','machine','beam','afterlight'];let best='hero',bd=1e9;for(const id of ids){const e=document.getElementById(id);if(!e)continue;const r=e.getBoundingClientRect(),d=Math.abs(r.top+r.height*.45-innerHeight*.48);if(d<bd){bd=d;best=id}}
 state.lastSection=best;document.body.dataset.premiumSection=best;
 const kp=smooth(.10,.52,sectionProgress('keeper'));const mp=smooth(.06,.43,sectionProgress('machine'));
 document.documentElement.style.setProperty('--keeper-reveal',String(kp));document.documentElement.style.setProperty('--machine-reveal',String(mp));
 document.documentElement.style.setProperty('--premium-ground',best==='hero'||best==='coast'||best==='keeper'?'.82':best==='afterlight'?'.52':'.24');
 document.documentElement.style.setProperty('--premium-haze',best==='machine'?'.40':best==='afterlight'?'.48':'.72');
 if(premiumRocks)premiumRocks.visible=!['machine'].includes(best);
 if(premiumHaze)premiumHaze.material.opacity=best==='machine'?.28:best==='afterlight'?.46:.72;
}

/* True Kage-like "hole punched in the page": render the frame as a sub-frustum of the main camera. */
const originalRender=THREE.WebGLRenderer.prototype.render;const vp=new THREE.Vector4();let mainCamera=null;
THREE.WebGLRenderer.prototype.render=function(scene,camera){
 if(!state.installed)install(scene);
 this.getViewport(vp);const full=Math.abs(vp.z-innerWidth)<3&&Math.abs(vp.w-innerHeight)<3;
 if(full){mainCamera=camera;state.mainCamera=camera}
 else if(mainCamera&&camera!==mainCamera&&vp.z>8&&vp.w>8){
  const x=Math.max(0,vp.x),bottom=Math.max(0,vp.y),w=Math.min(innerWidth-x,vp.z),h=Math.min(innerHeight-bottom,vp.w);const top=Math.max(0,innerHeight-(bottom+h));
  camera.position.copy(mainCamera.position);camera.quaternion.copy(mainCamera.quaternion);camera.up.copy(mainCamera.up);camera.near=mainCamera.near;camera.far=mainCamera.far;camera.fov=mainCamera.fov;camera.zoom=mainCamera.zoom;camera.aspect=innerWidth/innerHeight;
  camera.setViewOffset(innerWidth,innerHeight,x,top,w,h);camera.updateProjectionMatrix();state.alignedFrames++;
 }
 const out=originalRender.call(this,scene,camera);
 if(premiumSea?.mat)premiumSea.mat.uniforms.uTime.value=performance.now()/1000;
 return out;
};

let ticking=false;function visualTick(){ticking=false;updateEditorialBlend();requestAnimationFrame(visualTick)}
function requestTick(){if(ticking)return;ticking=true;requestAnimationFrame(visualTick)}
addEventListener('scroll',requestTick,{passive:true});addEventListener('resize',requestTick,{passive:true});requestAnimationFrame(visualTick);
})();
