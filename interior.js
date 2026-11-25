(()=>{
 const cars=Array.isArray(window.CARS)?window.CARS:[];
 const grid=document.getElementById("interior-cars");
 const status=document.getElementById("access-status");
 const viewer=document.getElementById("interior-viewer");
 const name=document.getElementById("selected-name");
 const brand=document.getElementById("selected-brand");
 const img=document.getElementById("cabin-image");
 const caption=document.getElementById("viewer-caption");
 const visitKey="vyroxInteriorTrialUsed";
 const sessionKey="vyroxInteriorSession";
 const isNewSession=!sessionStorage.getItem(sessionKey);
 sessionStorage.setItem(sessionKey,"active");
 let freeTrial=false;
 if(!localStorage.getItem(visitKey)){localStorage.setItem(visitKey,"yes");freeTrial=true;}
 else if(isNewSession){freeTrial=false;}
 else{freeTrial=sessionStorage.getItem("vyroxInteriorFreeSession")==="yes";}
 if(freeTrial)sessionStorage.setItem("vyroxInteriorFreeSession","yes");
 const unlocked=freeTrial;
 status.innerHTML=unlocked
  ?'<strong>FIRST VISIT · FREE ACCESS</strong> — You can browse the full catalogue during this visit.'
  :'<strong>WELCOME BACK</strong> — Choose a ₹100 visit pass or ₹500 permanent access. Checkout is not connected yet.';
 const allowed=unlocked;
 const photoBMW="https://images.pexels.com/photos/4141873/pexels-photo-4141873.jpeg?auto=compress&cs=tinysrgb&w=1800";
 const photoMercedes="https://images.pexels.com/photos/6969036/pexels-photo-6969036.jpeg?auto=compress&cs=tinysrgb&w=1800";
 let selected=null;
 function showCar(car){
  selected=car;
  name.textContent=car.name;
  brand.textContent=car.brand+" · Interior media status: sample preview only";
  document.querySelectorAll(".interior-car").forEach(el=>el.classList.toggle("selected",el.dataset.id===car.id));
  if(/mercedes/i.test(car.brand)){img.src=photoMercedes;caption.textContent="GENERIC MERCEDES CABIN SAMPLE";}
  else{img.src=photoBMW;caption.textContent="GENERIC BMW CABIN SAMPLE";}
  img.alt="Generic real-life cabin sample. Not confirmed as the interior of "+car.name;
  if(!allowed){
   status.innerHTML='<strong>PREVIEW LOCKED</strong> — This demo visit has ended. Secure checkout is not available yet; no payment can be made here.';
  }
 }
 document.getElementById("car-count").textContent=cars.length+" CARS IN CATALOGUE";
 grid.innerHTML=cars.map(c=>'<button class="interior-car" type="button" data-id="'+String(c.id).replace(/["&<>]/g,"")+'"><img loading="lazy" src="'+String(c.image||"").replace(/"/g,"&quot;")+'" alt="'+String(c.name).replace(/"/g,"&quot;")+' exterior"><div><small>'+String(c.brand).toUpperCase()+'</small><strong>'+c.name+'</strong><span>View cabin preview →</span></div></button>').join("");
 grid.addEventListener("click",e=>{
  const card=e.target.closest(".interior-car");if(!card)return;
  if(!allowed){document.getElementById("pricing").scrollIntoView({behavior:"smooth"});return;}
  const car=cars.find(c=>c.id===card.dataset.id);if(car)showCar(car);
 });
 document.getElementById("sample-bmw").addEventListener("click",()=>{img.src=photoBMW;caption.textContent="GENERIC BMW CABIN SAMPLE";});
 document.getElementById("sample-mercedes").addEventListener("click",()=>{img.src=photoMercedes;caption.textContent="GENERIC MERCEDES CABIN SAMPLE";});
 document.querySelectorAll("[data-plan]").forEach(button=>button.addEventListener("click",()=>{
  document.getElementById("payment-notice").textContent="Checkout is not connected yet. This is a pricing preview only; no payment will be collected. A secure payment provider and account-based access system must be configured before launch.";
 }));
 if(cars.length&&allowed)showCar(cars[0]);
 else if(!allowed){name.textContent="Access required";brand.textContent="Choose an access option below to continue.";}
})();