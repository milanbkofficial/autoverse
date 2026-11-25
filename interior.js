(()=>{
 const cars=Array.isArray(window.CARS)?window.CARS:[];
 const grid=document.getElementById("interior-cars");
 const frame=document.getElementById("real-car-viewer");
 const empty=document.getElementById("model-empty");
 const name=document.getElementById("selected-name");
 const brand=document.getElementById("selected-brand");
 const status=document.getElementById("model-status");
 const gallery=document.getElementById("cabin-gallery");
 const cabinStatus=document.getElementById("cabin-status");
 const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const models={
  "porsche-911":{
   uid:"d01b254483794de3819786d93e0e1ebf",
   title:"Porsche 911 Carrera 4S",
   source:"https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf",
   creator:"Lionsharp Studios",
   license:"Creative Commons Attribution-ShareAlike",
   note:"Community 3D model of a Porsche 911 Carrera 4S. The model page says it was made for a WebGL car configurator."
  },
  "lamborghini-revuelto":{
   uid:"cf52245eb68f48daa909c7ad2a8deaa3",
   title:"Lamborghini Revuelto",
   source:"https://sketchfab.com/3d-models/free-lamborghini-revuelto-cf52245eb68f48daa909c7ad2a8deaa3",
   creator:"ALIEEEN",
   license:"Creative Commons Attribution",
   note:"The creator describes this as a Lamborghini Revuelto model. Attribution is required."
  },
  "ferrari-296-gtb":{
   uid:"9a596b9d09414adfad64fc1f5fd019f9",
   title:"Ferrari 296 GTS · open-top variant",
   source:"https://sketchfab.com/3d-models/2023-ferrari-296-gts-9a596b9d09414adfad64fc1f5fd019f9",
   creator:"Ddiaz Design",
   license:"Creative Commons Attribution",
   note:"This is the 296 GTS roadster, not the 296 GTB coupe. It is the closest openly downloadable 296-family model found for this studio."
  }
 };
 function showCar(car){
  if(!car)return;
  const asset=models[car.id];
  name.textContent=asset?asset.title:car.name;
  brand.textContent=car.brand+" · "+(asset?"3D asset available":"3D asset not yet connected");
  document.querySelectorAll(".interior-car").forEach(e=>e.classList.toggle("selected",e.dataset.id===car.id));
  if(asset){
   frame.src="https://sketchfab.com/models/"+asset.uid+"/embed?autostart=1&ui_theme=dark&ui_infos=0";
   frame.style.display="block";empty.style.display="none";
   status.textContent="INTERACTIVE 3D · "+asset.license.toUpperCase();
   cabinStatus.textContent=asset.note;
   gallery.innerHTML='<div class="cabin-empty"><strong>'+safe(asset.creator)+'</strong><br>'+safe(asset.license)+'<br><a href="'+safe(asset.source)+'" target="_blank" rel="noopener">Open original model & licence details ↗</a></div>';
  }else{
   frame.removeAttribute("src");frame.style.display="none";empty.style.display="flex";
   empty.innerHTML="<strong>3D MODEL NOT YET AVAILABLE</strong><span>We have not connected a verified model for "+safe(car.name)+". VYROX will not substitute a generic shape and pretend it is the real car.</span>";
   status.textContent="AWAITING VERIFIED ASSET";
   cabinStatus.textContent="No verified 3D asset is connected for this car yet.";
   gallery.innerHTML='<div class="cabin-empty">No creator asset is connected for this model yet.</div>';
  }
 }
 document.getElementById("car-count").textContent=cars.length+" CARS IN CATALOGUE";
 grid.innerHTML=cars.map(c=>'<button class="interior-car" type="button" data-id="'+safe(c.id)+'"><img loading="lazy" src="'+safe(c.image||"")+'" alt="'+safe(c.name)+' exterior"><div><small>'+safe(c.brand).toUpperCase()+'</small><strong>'+safe(c.name)+'</strong><span>'+(models[c.id]?"Open real 3D viewer →":"3D model coming soon")+'</span></div></button>').join("");
 grid.addEventListener("click",e=>{const card=e.target.closest(".interior-car");if(!card)return;const car=cars.find(c=>String(c.id)===card.dataset.id);if(car){showCar(car);document.getElementById("interior-viewer").scrollIntoView({behavior:"smooth",block:"start"})}});
 showCar(cars.find(c=>c.id==="porsche-911")||cars.find(c=>models[c.id])||cars[0]);
})();