import * as THREE from "https://esm.sh/three@0.160.0";
import { OrbitControls } from "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js";
(()=>{
 const cars=Array.isArray(window.CARS)?window.CARS:[];
 const grid=document.getElementById("interior-cars"),stage=document.querySelector(".model-stage"),canvas=document.getElementById("car-canvas");
 const name=document.getElementById("selected-name"),brand=document.getElementById("selected-brand"),status=document.getElementById("model-status"),gallery=document.getElementById("cabin-gallery"),cabinStatus=document.getElementById("cabin-status");
 const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x101720);scene.fog=new THREE.Fog(0x101720,14,28);
 const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(6.7,3.2,7.5);
 const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.target.set(0,1,0);controls.minDistance=4;controls.maxDistance=13;controls.maxPolarAngle=Math.PI*.48;
 scene.add(new THREE.HemisphereLight(0xd8e7ff,0x25202a,2));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(4,8,5);key.castShadow=true;scene.add(key);const rim=new THREE.DirectionalLight(0xff7138,2.4);rim.position.set(-5,4,-4);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.CircleGeometry(9,64),new THREE.MeshStandardMaterial({color:0x151c26,roughness:.8}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);const gh=new THREE.GridHelper(18,36,0x374353,0x202b38);gh.position.y=.005;scene.add(gh);
 const material=(c,m=.4,r=.3)=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r});
 const rubber=material(0x080a0d,.05,.9),chrome=material(0xb8c4d1,.85,.2),glass=new THREE.MeshPhysicalMaterial({color:0x101d2a,metalness:.5,roughness:.12,transparent:true,opacity:.86}),black=material(0x090d13,.5,.3),lamp=new THREE.MeshStandardMaterial({color:0xdceeff,emissive:0x8abfff,emissiveIntensity:1.6});
 function block(p,w,h,d,m,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o}
 function wheel(p,x,z,r){const g=new THREE.Group();g.position.set(x,.62,z);g.rotation.z=Math.PI/2;p.add(g);g.add(new THREE.Mesh(new THREE.CylinderGeometry(r,r,.34,40),rubber));g.add(new THREE.Mesh(new THREE.CylinderGeometry(r*.62,r*.62,.355,12),chrome));g.add(new THREE.Mesh(new THREE.CylinderGeometry(r*.15,r*.15,.36,24),black));for(let i=0;i<10;i++){const a=i*Math.PI/5,s=block(g,.04,r*.95,.045,chrome,Math.sin(a)*r*.3,Math.cos(a)*r*.3,0);s.rotation.z=-a}}
 function build(car){
  const id=car.id||"",l=id.includes("lamborghini"),f=id.includes("ferrari"),p=id.includes("porsche");
  const paint=material(l?0xc8d316:f?0xc91420:p?0xbac4ce:0xe34b25,.78,.22),g=new THREE.Group();
  block(g,2.12,.58,4.55,paint,0,.91,0);block(g,2.03,.23,1.35,paint,0,1.18,1.48);block(g,2.02,.23,1.18,paint,0,1.17,-1.62);
  const cw=l?1.43:1.62,cd=p?1.8:1.65;
  block(g,cw,.68,cd,paint,0,1.59,-.18);
  const wind=block(g,cw*.94,.035,.84,glass,0,1.53,.65);wind.rotation.x=-.55;
  const rear=block(g,cw*.92,.035,.7,glass,0,1.54,-.97);rear.rotation.x=.55;
  block(g,.035,.43,1.28,glass,-.82,1.55,-.12);block(g,.035,.43,1.28,glass,.82,1.55,-.12);
  block(g,1.5,.15,.12,black,0,.76,2.29);block(g,1.5,.13,.12,black,0,.76,-2.29);
  for(const s of [-1,1]){block(g,.44,.08,.12,lamp,s*.67,1.04,2.22);block(g,.4,.08,.12,material(0xff2525,.2,.3),s*.67,1.02,-2.22);block(g,.14,.12,.3,paint,s*1.02,1.25,.5);block(g,.18,.1,.22,paint,s*1.02,1.5,.53);block(g,.018,.26,1,black,s*1.067,.98,-.12);wheel(g,s*1.04,1.47,l?.52:.56);wheel(g,s*1.04,-1.48,l?.52:.56);block(g,.44,.17,.42,black,s*.46,1.24,-.12);block(g,.4,.42,.4,material(0x303b48,.2,.6),s*.46,1.02,-.2)}
  block(g,1.45,.12,.22,black,0,1.25,.62);block(g,1.28,.11,.34,black,0,1.22,.68);
  const steering=new THREE.Mesh(new THREE.TorusGeometry(.2,.03,10,32),chrome);steering.position.set(-.45,1.37,.6);g.add(steering);
  if(l){block(g,1.7,.11,.4,black,0,.67,2.12);block(g,1.8,.12,.2,paint,0,1.34,-2.18);for(let i=-2;i<=2;i++)block(g,.035,.12,.12,chrome,i*.25,.78,-2.3)}
  if(f){block(g,1.1,.08,.25,black,0,.72,2.25);block(g,1.65,.08,.12,paint,0,1.1,-2.22)}
  if(p){block(g,1.85,.11,.2,paint,0,1.34,-2.12);block(g,1.65,.06,.1,lamp,0,1.02,-2.28)}
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(2.65,48),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.2}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;g.add(shadow);return g;
 }
 let current=null,spin=true,cabin=false;
 function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(stage);resize();
 function showCar(car){current=car;name.textContent=car.name;brand.textContent=car.brand+" · "+car.category;document.querySelectorAll(".interior-car").forEach(e=>e.classList.toggle("selected",e.dataset.id===car.id));if(current) {if(scene.getObjectByName("active-car"))scene.remove(scene.getObjectByName("active-car"));}const g=build(car);g.name="active-car";scene.add(g);status.textContent="INTERACTIVE 3D CONCEPT";camera.position.set(6.7,3.2,7.5);controls.target.set(0,1,0);controls.update();cabin=false;document.getElementById("interior-toggle").textContent="VIEW CABIN";
  gallery.replaceChildren();const photos=Array.isArray(car.interiorImages)?car.interiorImages:[];if(photos.length){photos.forEach((ph,i)=>{const fig=document.createElement("figure"),img=document.createElement("img"),cap=document.createElement("figcaption");img.src=ph.url||ph;img.alt=ph.alt||car.name+" interior";cap.textContent=ph.label||"Interior view "+(i+1);fig.append(img,cap);gallery.append(fig)});cabinStatus.textContent=photos.length+" verified interior image(s) available."}else{const n=document.createElement("div");n.className="cabin-empty";n.textContent="Factory photographs are not connected. Use VIEW CABIN for a stylised cockpit concept; it is not an exact factory interior.";gallery.append(n);cabinStatus.textContent="Factory interior photographs not yet connected."}}
 document.getElementById("rotate-toggle").addEventListener("click",e=>{spin=!spin;e.currentTarget.textContent=spin?"PAUSE ROTATION":"RESUME ROTATION";e.currentTarget.classList.toggle("active",!spin)});
 document.getElementById("reset-view").addEventListener("click",()=>{camera.position.set(6.7,3.2,7.5);controls.target.set(0,1,0);controls.update()});
 document.getElementById("interior-toggle").addEventListener("click",e=>{cabin=!cabin;if(cabin){camera.position.set(0,2.1,.1);controls.target.set(0,1.25,-.2);e.currentTarget.textContent="VIEW EXTERIOR"}else{camera.position.set(6.7,3.2,7.5);controls.target.set(0,1,0);e.currentTarget.textContent="VIEW CABIN"}controls.update()});
 document.getElementById("car-count").textContent=cars.length+" CARS IN CATALOGUE";
 grid.innerHTML=cars.map(c=>'<button class="interior-car" type="button" data-id="'+safe(c.id)+'"><img loading="lazy" src="'+safe(c.image||"")+'" alt="'+safe(c.name)+' exterior"><div><small>'+safe(c.brand).toUpperCase()+'</small><strong>'+safe(c.name)+'</strong><span>Open 3D studio →</span></div></button>').join("");
 grid.addEventListener("click",e=>{const card=e.target.closest(".interior-car");if(!card)return;const car=cars.find(c=>String(c.id)===card.dataset.id);if(car){showCar(car);document.getElementById("interior-viewer").scrollIntoView({behavior:"smooth",block:"start"})}});
 showCar(cars.find(c=>c.id==="porsche-911")||cars[0]);
 function animate(){requestAnimationFrame(animate);const active=scene.getObjectByName("active-car");if(spin&&!cabin&&active)active.rotation.y+=.003;controls.update();renderer.render(scene,camera)}animate();
})();