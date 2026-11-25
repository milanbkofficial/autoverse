(()=>{
 const cars=Array.isArray(window.CARS)?window.CARS:[];
 const grid=document.getElementById("interior-cars");
 const name=document.getElementById("selected-name");
 const brand=document.getElementById("selected-brand");
 const model=document.getElementById("car-model");
 const empty=document.getElementById("model-empty");
 const modelStatus=document.getElementById("model-status");
 const cabinStatus=document.getElementById("cabin-status");
 const gallery=document.getElementById("cabin-gallery");
 const safe=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 function showCar(car){
  name.textContent=car.name;
  brand.textContent=car.brand+" · "+car.category;
  document.querySelectorAll(".interior-car").forEach(el=>el.classList.toggle("selected",el.dataset.id===car.id));
  const modelUrl=car.model3d||car.model3D||"";
  if(modelUrl){
   model.src=modelUrl;model.style.display="block";empty.style.display="none";
   modelStatus.textContent="3D MODEL LOADED";
  }else{
   model.removeAttribute("src");model.style.display="none";empty.style.display="flex";
   modelStatus.textContent="3D MODEL PENDING";
  }
  const photos=Array.isArray(car.interiorImages)?car.interiorImages:[];
  gallery.replaceChildren();
  if(photos.length){
   photos.forEach((photo,index)=>{
    const figure=document.createElement("figure");
    const image=document.createElement("img");
    image.src=photo.url||photo;image.alt=photo.alt||car.name+" interior view "+(index+1);
    const caption=document.createElement("figcaption");
    caption.textContent=photo.label||("Interior view "+(index+1));
    figure.append(image,caption);gallery.append(figure);
   });
   cabinStatus.textContent=photos.length+" verified interior image(s) available.";
  }else{
   const note=document.createElement("div");note.className="cabin-empty";
   note.textContent="Verified "+car.name+" interior photographs have not been added yet. Dashboard, steering wheel, seats and rear-cabin views will appear here once the correct images are sourced.";
   gallery.append(note);cabinStatus.textContent="No verified model-specific cabin images connected yet.";
  }
 }
 document.getElementById("car-count").textContent=cars.length+" CARS IN CATALOGUE";
 grid.innerHTML=cars.map(car=>'<button class="interior-car" type="button" data-id="'+safe(car.id)+'"><img loading="lazy" src="'+safe(car.image||"")+'" alt="'+safe(car.name)+' exterior"><div><small>'+safe(car.brand).toUpperCase()+'</small><strong>'+safe(car.name)+'</strong><span>Open 3D studio →</span></div></button>').join("");
 grid.addEventListener("click",event=>{
  const card=event.target.closest(".interior-car");if(!card)return;
  const car=cars.find(item=>String(item.id)===card.dataset.id);
  if(car){showCar(car);document.getElementById("interior-viewer").scrollIntoView({behavior:"smooth",block:"start"});}
 });
 if(cars.length)showCar(cars[0]);
})();