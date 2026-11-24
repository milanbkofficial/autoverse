document.addEventListener("DOMContentLoaded",()=>{
 const cars=window.CARS||[],esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const modal=document.createElement("div");modal.className="av-modal";modal.innerHTML='<div class="av-shade" data-close></div><section class="av-box"><button class="av-close" data-close aria-label="Close">×</button><div id="av-content"></div></section>';document.body.append(modal);
 const close=()=>modal.classList.remove("open");modal.addEventListener("click",e=>{if(e.target.hasAttribute("data-close"))close()});document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 const open=h=>{document.querySelector("#av-content").innerHTML=h;modal.classList.add("open")};
 const details=c=>'<div class="av-detail"><img src="'+esc(c.image||"")+'" alt="'+esc(c.name)+'"><div><div class="eyebrow">'+esc(c.brand)+' / '+esc(c.category)+'</div><h2>'+esc(c.name)+'</h2><p>'+esc(c.description||"Explore this model in AUTOVERSE.")+'</p><div class="av-specs">'+[['Power',c.power],['Engine / motor',c.engine],['Transmission',c.transmission],['Fuel',c.fuel],['Acceleration',c.acceleration],['Top speed',c.topSpeed],['Indicative price',c.price]].map(([k,v])=>'<p><small>'+k+'</small><strong>'+esc(v||"Varies by variant")+'</strong></p>').join("")+'</div><p>'+esc((c.highlights||[]).join(" · "))+'</p><a class="btn primary" href="compare.html">Compare cars</a></div></div>';
 const list=document.querySelector("[data-car-list]");
 if(list){const draw=arr=>list.innerHTML=arr.map(c=>'<article class="card av-card" data-car="'+esc(c.id)+'"><img src="'+esc(c.image)+'" alt="'+esc(c.name)+'" loading="lazy"><div class="car-info"><div class="tag">'+esc(c.tag||c.category)+'</div><h3>'+esc(c.name)+'</h3><p>'+esc(c.brand)+' · '+esc(c.power)+'</p><b>View details ↗</b></div></article>').join("");const q=document.querySelector("#car-search"),f=document.querySelector("#category-filter");const filter=()=>draw(cars.filter(c=>(!q||c.name.toLowerCase().includes(q.value.toLowerCase())||c.brand.toLowerCase().includes(q.value.toLowerCase()))&&(!f||f.value==="all"||c.category.toLowerCase().includes(f.value))));q?.addEventListener("input",filter);f?.addEventListener("change",filter);filter()}
 document.addEventListener("click",e=>{const card=e.target.closest("[data-car]");if(card){const c=cars.find(x=>x.id===card.dataset.car);if(c)open(details(c));return}const el=e.target.closest("main article.card,.f1-card");if(!el||e.target.closest("a,button"))return;const h=el.querySelector("h3,h2");if(!h)return;const c=cars.find(x=>x.name.toLowerCase()===h.textContent.trim().toLowerCase());const p=el.querySelector("p");open(c?details(c):'<div class="eyebrow">AUTOVERSE DISCOVERY</div><h2>'+esc(h.textContent)+'</h2><p>'+esc(p?.textContent||"Explore this topic in AUTOVERSE.")+'</p><a class="btn primary" href="explore.html">Explore cars</a>')});
 document.querySelectorAll("main article.card,.f1-card").forEach(x=>{x.classList.add("av-clickable");x.tabIndex=0});
 const ai=document.createElement("aside");ai.className="av-ai";ai.innerHTML='<button class="av-ai-open">◈ AGENT</button><section class="av-ai-panel"><header><b>◈ AGENT</b><button class="av-ai-close">×</button></header><div class="av-chat"><p>Hello! Ask me about cars, specifications, brands, comparisons or Formula 1.</p></div><form><input placeholder="Ask about a car..." aria-label="Ask AGENT"><button>SEND</button></form><small>Built-in demo assistant · Not live AI</small></section>';document.body.append(ai);
 const panel=ai.querySelector(".av-ai-panel"),chat=ai.querySelector(".av-chat"),input=ai.querySelector("input");ai.querySelector(".av-ai-open").onclick=()=>panel.classList.toggle("show");ai.querySelector(".av-ai-close").onclick=()=>panel.classList.remove("show");
 ai.querySelector("form").onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(!q)return;chat.innerHTML+='<p class="user">'+esc(q)+'</p>';const s=q.toLowerCase(),c=cars.find(x=>s.includes(x.name.toLowerCase())||s.includes(x.brand.toLowerCase()));let a="";
 if(c){
   a=c.name+"\n"+c.description+"\n\nKEY SPECIFICATIONS\n• Category: "+c.category+"\n• Brand: "+c.brand+"\n• Engine / motor: "+(c.engine||"Not listed") +"\n• Power: "+(c.power||"Not listed")+"\n• Fuel / energy: "+c.fuel+"\n• Transmission: "+c.transmission+"\n• Acceleration: "+(c.acceleration||"Not listed")+"\n• Top speed: "+(c.topSpeed||"Not listed")+"\n• Indicative price: "+c.price+"\n\nWHAT MAKES IT INTERESTING\n"+(c.highlights||[]).map(v=>"• "+v).join("\n")+"\n\nFigures can vary by model year, market and variant. Treat price and performance figures as guidance, not a live quotation.";
 }else if(/hello|hi|hey|good morning|good evening/.test(s)){
   a="Welcome to AUTOVERSE! I’m your automotive guide. I can explain car technology, share details about models in our collection, help you compare vehicles, explore sports cars and supercars, and introduce Formula 1.\n\nTry asking: \n• Tell me about the Porsche 911\n• Which sports cars are on AUTOVERSE?\n• Explain horsepower and torque\n• How do electric cars work?\n• How can I compare two cars?";
 }else if(/sports car|supercar|hypercar/.test(s)){
   const list=cars.filter(x=>/sports car/i.test(x.category));
   a="SPORTS CARS & SUPERCARS\n\nA sports car is designed with a strong focus on driving response, handling and performance. A supercar is generally an especially high-performance, exotic sports car with advanced engineering and distinctive design.\n\nMODELS IN THE AUTOVERSE COLLECTION\n"+list.map(x=>"• "+x.name+" — "+x.brand+"; "+x.power+"; "+x.engine).join("\n")+"\n\nOpen the Sports Cars page to view photographs and detailed specification cards. Performance and price figures depend on the exact version and market.";
 }else if(/formula.?1|\\bf1\\b|grand prix|pit stop|downforce|aerodynamic/.test(s)){
   a="FORMULA 1 — THE BASICS\n\nFormula 1 is an international single-seater motor racing championship. It combines driver skill, engineering, teamwork and race strategy.\n\nWHAT MAKES AN F1 CAR SPECIAL?\n• Aerodynamics: wings and bodywork manage airflow and generate downforce.\n• Power unit: a highly developed hybrid system combines an internal-combustion engine and electrical energy systems.\n• Tyres: teams manage grip, temperature and wear.\n• Strategy: teams make decisions about tyre choice, pit-stop timing and changing conditions.\n• Safety: the survival cell, halo, barriers and safety procedures help protect drivers.\n\nExplore the F1 Edition page for more topics. Technical rules change between seasons, so current regulations should be checked with official F1 sources.";
 }else if(/compare|difference|versus|\\bvs\\b/.test(s)){
   const mentioned=cars.filter(x=>s.includes(x.name.toLowerCase()));
   if(mentioned.length>=2){const [x,y]=mentioned; a="COMPARISON OVERVIEW\n\n"+x.name+" vs "+y.name+"\n\n"+x.name+": "+x.category+", "+x.power+", "+x.fuel+", "+x.transmission+".\n"+y.name+": "+y.category+", "+y.power+", "+y.fuel+", "+y.transmission+".\n\nThe best choice depends on your priorities, such as body style, fuel type, performance, comfort and budget. Open Compare Cars and select both models to see the available details side by side."}
   else a="CAR COMPARISON GUIDE\n\nTo compare two models fairly, look at:\n• Engine or motor and power output\n• Fuel type or electric range\n• Transmission and driving layout\n• Acceleration and top speed (where published)\n• Safety equipment and comfort features\n• Price, running costs and warranty\n\nOpen the Compare page, choose two cars from the selectors and press Compare now. Tell me the two model names if you want a written overview.";
 }else if(/electric|battery|ev|charging|range/.test(s)){
   a="HOW ELECTRIC CARS WORK\n\nAn electric vehicle uses energy stored in a rechargeable battery to power an electric motor. The motor turns the wheels, while regenerative braking can recover some energy as the vehicle slows.\n\nWHAT TO CHECK\n• Driving range and the test cycle used to measure it\n• Battery warranty and charging options\n• AC home charging and DC fast-charging compatibility\n• Charging time, which depends on charger power, battery state and conditions\n• Service support and battery-care guidance\n\nAUTOVERSE includes the MG ZS EV and electric powertrain information for the Tata Nexon family. Actual range varies with conditions and version.";
 }else if(/horsepower|\\bbhp\\b|power|torque/.test(s)){
   a="POWER AND TORQUE EXPLAINED\n\nPower describes how quickly an engine or motor can do work. It is commonly shown in bhp, PS or kW. Torque is the turning force produced by the engine or motor and is commonly shown in Nm.\n\nIn simple terms, torque contributes to the force available to turn the wheels, while power describes the rate at which work is done. Acceleration also depends on vehicle weight, gearing, traction and many other factors. A higher horsepower number alone does not tell the whole story.";
 }else if(/brand|manufacturer|company/.test(s)){
   a="BRANDS IN AUTOVERSE\n\nThe current collection includes:\n• Tata Motors — passenger vehicles and electric models\n• Mahindra — SUVs and utility vehicles\n• Maruti Suzuki — compact and family vehicles\n• Hyundai — hatchbacks, sedans and SUVs\n• Kia — passenger vehicles with a technology-focused range\n• MG — connected vehicles and electric models\n• Porsche, Ferrari, Lamborghini and McLaren — represented in the sports-car collection\n\nOpen Brands or Sports Cars to explore the available cards. This is a starter collection, not a complete catalogue.";
 }else if(/price|cost|budget|expensive/.test(s)){
   a="ABOUT VEHICLE PRICES\n\nPrices can change with model year, variant, location, taxes, optional equipment and dealer offers. AUTOVERSE currently displays indicative starter ranges for selected models, not live showroom quotations.\n\nFor an accurate current price, check the manufacturer's official website or an authorised dealer in your area. For imported sports cars and supercars, final on-road costs can vary significantly.";
 }else if(/recommend|best car|which car|suggest/.test(s)){
   a="CHOOSING A CAR\n\nThere is no single best car for everyone. Start by deciding what matters most:\n• Everyday city use: consider size, visibility, efficiency and parking ease.\n• Family use: check cabin space, luggage room, comfort and safety equipment.\n• Electric driving: compare real-world range, charging access and battery warranty.\n• Driving performance: look at handling, braking, power delivery and tyres, not just top speed.\n• Sports-car interest: explore the Porsche, Ferrari, Lamborghini and McLaren models in our Sports Cars section.\n\nTell me the models you are considering and I can explain their listed differences. Always verify current specifications before making a purchase decision.";
 }else if(/help|what can you do|features/.test(s)){
   a="HERE IS WHAT I CAN HELP WITH\n\n1. CAR DETAILS — ask for a model name to see its category, engine, power, fuel, transmission and listed highlights.\n2. SPORTS CARS — explore the Porsche 911, Ferrari 296 GTB, Lamborghini Revuelto and McLaren 750S collection.\n3. COMPARISONS — ask about two models or use the Compare page.\n4. TECHNOLOGY — learn about engines, torque, electric motors, batteries, aerodynamics and braking.\n5. FORMULA 1 — learn about cars, teams, circuits, tyres, pit stops and race strategy.\n\nI use the information built into this website, so I do not have live prices, live race results or unrestricted internet answers.";
 }else{
   a="I can give more detailed answers about the vehicles and topics included in AUTOVERSE. Try asking me about a specific car, sports cars, supercars, car brands, electric vehicles, horsepower, torque, comparisons or Formula 1.\n\nFor example: \n• Explain the Lamborghini Revuelto in detail\n• Compare Porsche 911 and McLaren 750S\n• What is the difference between horsepower and torque?\n• How does F1 downforce work?";
 };chat.innerHTML+='<p>'+esc(a)+'</p>';input.value=""};
 const form=document.querySelector("#compare-form");if(form&&cars.length){const a=document.querySelector("#car-one"),b=document.querySelector("#car-two");[a,b].forEach(s=>cars.forEach(c=>s.add(new Option(c.name,c.id))));if(b.options.length>1)b.selectedIndex=1;form.onsubmit=e=>{e.preventDefault();const x=cars.find(c=>c.id===a.value),y=cars.find(c=>c.id===b.value);const rows=["brand","category","fuel","power","engine","transmission","price"];document.querySelector("#comparison").innerHTML='<table class="compare-table"><tr><th>Specification</th><th>'+esc(x.name)+'</th><th>'+esc(y.name)+'</th></tr>'+rows.map(k=>'<tr><th>'+k+'</th><td>'+esc(x[k])+'</td><td>'+esc(y[k])+'</td></tr>').join("")+'</table>'}}
});

// AUTOVERSE F1 INTERACTIVE EXPERIENCE
document.addEventListener("DOMContentLoaded",()=>{
  const page=document.querySelector(".f1-page");
  if(!page)return;
  const teams=[...document.querySelectorAll(".f1-team")];
  const circuits=[...document.querySelectorAll(".f1-circuit")];
  const safe=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const addTools=(section,items,label)=>{
    if(!section||!items.length)return;
    const tools=document.createElement("div");
    tools.className="av-f1-tools";
    tools.innerHTML='<label class="av-f1-search-label">'+label+' <input type="search" placeholder="Search '+label.toLowerCase()+'..." aria-label="Search '+label+'"></label><span class="av-f1-count" aria-live="polite"></span>';
    const grid=items[0].parentElement;
    section.insertBefore(tools,grid);
    const input=tools.querySelector("input"),count=tools.querySelector(".av-f1-count");
    const update=()=>{
      const q=input.value.trim().toLowerCase();let shown=0;
      items.forEach(card=>{
        const match=card.textContent.toLowerCase().includes(q);
        card.hidden=!match;if(match)shown++;
      });
      count.textContent=shown+" of "+items.length+" shown";
    };
    input.addEventListener("input",update);update();
  };
  addTools(document.querySelector("#teams"),teams,"Teams");
  addTools(document.querySelector("#circuits"),circuits,"Circuits");
  const modal=document.createElement("div");
  modal.className="av-f1-modal";
  modal.hidden=true;
  modal.innerHTML='<div class="av-f1-modal-shade" data-f1-close></div><section role="dialog" aria-modal="true" aria-labelledby="av-f1-modal-title"><button type="button" data-f1-close aria-label="Close">×</button><div class="av-f1-modal-content"></div></section>';
  document.body.append(modal);
  const close=()=>{modal.hidden=true;};
  modal.addEventListener("click",e=>{if(e.target.closest("[data-f1-close]"))close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  const openCard=(card,type)=>{
    const title=card.querySelector("h3")?.textContent?.trim()||"F1 information";
    const sub=card.querySelector("p")?.textContent?.trim()||"";
    const label=card.querySelector("span")?.textContent?.trim()||"FORMULA 1";
    const art=card.querySelector(".team-art");
    const img=card.querySelector("img");
    const content=modal.querySelector(".av-f1-modal-content");
    content.innerHTML=(img?'<img class="av-f1-modal-image" src="'+safe(img.currentSrc||img.src)+'" alt="'+safe(title)+'">':art?'<div class="av-f1-modal-art">'+safe(art.textContent)+'</div>':'')+
      '<div class="f1-kicker">'+safe(label)+'</div><h2 id="av-f1-modal-title">'+safe(title)+'</h2><p>'+safe(sub)+'</p><p class="av-f1-modal-note">'+(type==="team"?"Team details shown here are based on the AUTOVERSE F1 page. Driver line-ups can change during a season.":"Circuit descriptions are introductory. Check the official championship calendar for current event status.")+'</p>';
    modal.hidden=false;
    modal.querySelector("button").focus();
  };
  teams.forEach(card=>{
    card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-label","View "+(card.querySelector("h3")?.textContent||"team")+" details");
    card.addEventListener("click",()=>openCard(card,"team"));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCard(card,"team");}});
  });
  circuits.forEach(card=>{
    card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-label","View "+(card.querySelector("h3")?.textContent||"circuit")+" details");
    card.addEventListener("click",()=>openCard(card,"circuit"));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCard(card,"circuit");}});
  });
  const chatForm=document.querySelector(".av-ai form");
  const chatInput=document.querySelector(".av-ai input");
  const chat= document.querySelector(".av-ai .av-chat");
  if(chatForm&&chatInput&&chat){
    const previous=chatForm.onsubmit;
    chatForm.onsubmit=e=>{
      const q=chatInput.value.trim(),s=q.toLowerCase();
      if(!/(formula.?1|\\bf1\\b|grand prix|ferrari|mclaren|mercedes|red bull|williams|haas|aston martin|racing bulls|alpine|audi|cadillac|circuit|pit stop|downforce|f1 car|f1 team)/i.test(s)){
        if(previous)return previous.call(chatForm,e);
        return;
      }
      e.preventDefault();
      if(!q)return;
      const teamCards=[...document.querySelectorAll(".f1-team")];
      const circuitCards=[...document.querySelectorAll(".f1-circuit")];
      let answer="";
      const matchedTeam=teamCards.find(c=>s.includes(c.querySelector("h3")?.textContent.toLowerCase()||"~~~"));
      const matchedCircuit=circuitCards.find(c=>s.includes(c.querySelector("h3")?.textContent.toLowerCase()||"~~~"));
      if(matchedTeam){
        answer=matchedTeam.querySelector("h3")?.textContent+" — "+matchedTeam.querySelector("p")?.textContent+". Open the team card on the F1 Edition page for its details.";
      }else if(matchedCircuit){
        answer=matchedCircuit.querySelector("h3")?.textContent+" — "+matchedCircuit.querySelector("p")?.textContent+". Open the circuit card to read its introduction.";
      }else if(/team|driver|grid|line.?up/.test(s)){
        answer="The AUTOVERSE F1 page lists the 11 teams and their driver pairings shown for the 2026 grid. Use the Teams search box to filter the grid, then select a team card for details. Driver line-ups may change, so verify the latest information with Formula 1.";
      }else if(/circuit|track|calendar|grand prix|race/.test(s)){
        answer="Explore the global circuit gallery on the AUTOVERSE F1 Edition page. Use its search box to find a circuit by name or country. The gallery includes current and historic venues; it is not a live race calendar.";
      }else if(/car|machine|2026|power unit|engine|aero|downforce/.test(s)){
        answer="A Formula 1 car combines advanced aerodynamics, a hybrid power unit, specialised tyres, powerful brakes and driver-safety systems. The 2026 regulations introduce a new generation of power-unit and aerodynamic rules. The F1 Edition page explains these technologies.";
      }else{
        answer="I can help you explore F1 teams, drivers, cars, circuits, Grand Prix venues, pit stops, tyres and racing technology. Try asking about a team or circuit listed on this page.";
      }
      const user=document.createElement("p");user.className="user";user.textContent=q;
      const reply=document.createElement("p");reply.textContent=answer;
      chat.append(user,reply);chatInput.value="";chat.scrollTop=chat.scrollHeight;
    };
  }
});
