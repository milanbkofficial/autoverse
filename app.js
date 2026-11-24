document.addEventListener("DOMContentLoaded",()=>{
 const path=location.pathname.split("/").pop()||"index.html";
 document.querySelectorAll("nav a").forEach(a=>{if(a.getAttribute("href")===path)a.classList.add("active")});
 const list=document.querySelector("[data-car-list]");
 if(list && window.CARS){
  const render=(items)=>{list.innerHTML=items.map(c=>`<article class="card car-card"><div class="car-visual">🚘</div><div class="car-info"><div class="tag">${c.tag} / ${c.category}</div><h3>${c.name}</h3><p>${c.brand}</p><div class="specs"><span>${c.fuel}</span><span>${c.power}</span></div><a href="compare.html">Compare details →</a></div></article>`).join("")};
  const search=document.querySelector("#car-search"),filter=document.querySelector("#category-filter");
  const update=()=>render(CARS.filter(c=>(!search||c.name.toLowerCase().includes(search.value.toLowerCase())||c.brand.toLowerCase().includes(search.value.toLowerCase()))&&(!filter||filter.value==="all"||c.category.toLowerCase().includes(filter.value))));
  if(search)search.addEventListener("input",update);if(filter)filter.addEventListener("change",update);update();
 }
 const compare=document.querySelector("#compare-form");
 if(compare && window.CARS){
  const a=document.querySelector("#car-one"),b=document.querySelector("#car-two"),out=document.querySelector("#comparison");
  [a,b].forEach(sel=>CARS.forEach(c=>sel.add(new Option(c.name,c.id))));
  b.selectedIndex=1;
  compare.addEventListener("submit",e=>{e.preventDefault();const x=CARS.find(c=>c.id===a.value),y=CARS.find(c=>c.id===b.value);const rows=[["Brand","brand"],["Category","category"],["Fuel","fuel"],["Power","power"],["Transmission","transmission"],["Indicative price range","price"]];out.innerHTML=`<table class="compare-table"><thead><tr><th>Specification</th><th>${x.name}</th><th>${y.name}</th></tr></thead><tbody>${rows.map(([label,key])=>`<tr><th>${label}</th><td>${x[key]}</td><td>${y[key]}</td></tr>`).join("")}</tbody></table><p class="notice">Information is illustrative and may vary by variant, model year and location. Verify current specifications with the manufacturer before making decisions.</p>`});
 }
});
