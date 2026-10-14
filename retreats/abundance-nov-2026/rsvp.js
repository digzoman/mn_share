(function(){
"use strict";
const groups=[
 {day:"Friday, November 6",subtitle:"Arrive and settle in",items:[
  ["friday-arrival","Welcome and reconnect","Unpack, snacks and easy introductions"],
  ["friday-dinner","Shared welcome dinner","Cook and eat together at the house"],
  ["friday-fireplace","Fireside conversations","Music, games and relaxed connections"]
 ]},
 {day:"Saturday, November 7",subtitle:"Restore, wander and explore",items:[
  ["saturday-yoga","Indoor yoga, meditation and breathwork","A gentle start to the day"],
  ["saturday-brunch","Nourishing group brunch","Enjoy a slow shared meal"],
  ["saturday-workshop","Abundance and vision board workshop","Personal growth and reflection, about one hour"],
  ["saturday-walk","Macaulay Mountain nature walk","Fresh air and Birdhouse City in Picton"],
  ["saturday-tasting","Black Prince wine or vinegar tasting","Choice of nonalcoholic vinegars or wine"],
  ["saturday-food","Optional winery pizza and salads","Shared food while exploring Picton"],
  ["saturday-spa","Hot tub, sauna and rest","Unstructured downtime at the property"],
  ["saturday-cozy","Cozy house evening","Dinner, music and fireside conversations"],
  ["saturday-lanterns","Firelight Lantern Festival","Optional Saturday night outing in Picton"]
 ]},
 {day:"Sunday, November 8",subtitle:"Take the feeling home",items:[
  ["sunday-stretch","Gentle morning stretch","Relaxed movement before breakfast"],
  ["sunday-brunch","Slow group brunch","Share food, coffee and company"],
  ["sunday-reflect","Closing appreciation circle","A short gratitude and reflection session"],
  ["sunday-walk","Optional short outdoor walk and photos","Weather permitting, before departures"]
 ]}
];
const all=groups.flatMap(g=>g.items);
const section=document.createElement("section");section.className="rsvp";section.id="preferences";section.setAttribute("aria-labelledby","pref-title");
section.innerHTML=`<div class="wrap"><div class="rsvp-head"><div><div class="kicker eyebrow">08 / Let's shape the weekend</div><h2 id="pref-title">Your weekend,<br>your vote.</h2></div><p>Tell us which activities sound good to you. This is a preference check to help Muneer and Daryna adjust the itinerary, not a confirmed reservation.</p></div><div class="rsvp-panel"><div class="rsvp-top"><div class="rsvp-field"><label for="rsvp-name">Your name</label><input id="rsvp-name" maxlength="70" autocomplete="name" placeholder="Enter your name"><small>Tip: Add <code>?name=Daryna</code> to the page URL to fill your name automatically.</small></div><div class="rsvp-attendance"><span>Are you planning to attend the weekend?</span><div id="rsvp-attend-controls" class="rsvp-buttons" role="group" aria-label="Overall attendance"></div></div></div><div class="rsvp-progress"><span>Choose Yes, Maybe or No for the ideas that interest you</span><span id="rsvp-progress-text" aria-live="polite">0 of ${all.length} answered</span></div><div class="rsvp-bar" aria-hidden="true"><span id="rsvp-progress-fill"></span></div><form id="rsvp-form"><div id="rsvp-days" class="rsvp-days"></div><div class="rsvp-actions"><button type="button" class="rsvp-action rsvp-action--main" id="rsvp-whatsapp">Share choices via WhatsApp ↗</button><button type="button" class="rsvp-action rsvp-action--alt" id="rsvp-copy">Copy response</button></div><p id="rsvp-status" class="rsvp-status" aria-live="polite"></p><div class="rsvp-privacy"><strong>About saving:</strong> Your choices are saved on this device as you select them. This page does not yet have a shared response database, so the hosts will only receive them if you tap <strong>Share choices via WhatsApp</strong> and send the prepared message, or copy and send it yourself. Please send your reply to Muneer. Do not enter private information.</div></form></div></div>`;
const footer=document.querySelector("footer"); if(!footer)return;footer.before(section);
const nameInput=section.querySelector("#rsvp-name");
const attendControls=section.querySelector("#rsvp-attend-controls");
const days=section.querySelector("#rsvp-days");
const status=section.querySelector("#rsvp-status");
const opts=["Yes","Maybe","No"];
function choice(label,id,value){let lbl=document.createElement("label");lbl.className="rsvp-choice";let input=document.createElement("input");input.type="radio";input.name=id;input.value=value;let span=document.createElement("span");span.textContent=value;lbl.append(input,span);return lbl}
opts.forEach(o=>attendControls.append(choice(o,"attend",o)));
for(const g of groups){
const el=document.createElement("div");el.className="rsvp-day";
const hd=document.createElement("div");hd.className="rsvp-day__head";
const h=document.createElement("h3");h.textContent=g.day;const sub=document.createElement("p");sub.textContent=g.subtitle;hd.append(h,sub);el.append(hd);
for(const [id,title,detail] of g.items){
const row=document.createElement("div");row.className="rsvp-row";
const info=document.createElement("div");const t=document.createElement("div");t.className="rsvp-row__title";t.textContent=title;const d=document.createElement("div");d.className="rsvp-row__detail";d.textContent=detail;info.append(t,d);
const select=document.createElement("div");select.className="rsvp-buttons";select.setAttribute("role","group");select.setAttribute("aria-label",title);
opts.forEach(o=>select.append(choice(o,id,o)));
row.append(info,select);el.append(row);
}days.append(el);
}
const rawName=new URLSearchParams(location.search).get("name")||"";
nameInput.value=rawName.slice(0,70);
function key(){return "abundanceNov2026:rsvp:"+nameInput.value.trim().toLocaleLowerCase()}
function inputs(){return [...section.querySelectorAll('input[type="radio"]:checked')]}
function read(){const ans={};for(const input of inputs())ans[input.name]=input.value;return {name:nameInput.value.trim(),answers:ans,updated:new Date().toISOString()}}
function progress(){const data=read();const n=all.filter(([id])=>data.answers[id]).length;section.querySelector("#rsvp-progress-text").textContent=n+" of "+all.length+" answered";section.querySelector("#rsvp-progress-fill").style.width=(n/all.length*100)+"%"}
function persist(){progress();try{if(read().name)localStorage.setItem(key(),JSON.stringify(read()));status.removeAttribute("role");status.textContent="Saved on this device. To share with the hosts, use one of the buttons below."}catch(e){status.textContent="Saving on this device is unavailable. You can still share your selections by WhatsApp or copy them."}}
function restore(){section.querySelectorAll('input[type="radio"]').forEach(i=>i.checked=false);let data=null;try{data=JSON.parse(localStorage.getItem(key())||"null")}catch(e){};if(data&&data.answers){for(const [id,v] of Object.entries(data.answers)){const i=[...section.querySelectorAll('input[type="radio"]')].find(i=>i.name===id&&i.value===v);if(i)i.checked=true}}progress()}
let prevKey=key();
nameInput.addEventListener("change",()=>{const next=key();if(next!==prevKey){prevKey=next;restore();status.textContent="Name updated. You can now make or review your choices."}});
nameInput.addEventListener("input",()=>{status.textContent="Name updated. Your activity selections will be saved when you choose another option."});
section.querySelectorAll('input[type="radio"]').forEach(i=>i.addEventListener("change",persist));
function message(){const d=read();if(!d.name){nameInput.focus();status.setAttribute("role","alert");status.textContent="Please enter your name before sharing.";return null}
const lines=["ABUNDANCE RETREAT 2.0 | NOV 6 TO 8","Preferences from: "+d.name,"Planning to attend: "+(d.answers.attend||"Not decided yet"),""];
for(const g of groups){lines.push(g.day+":");for(const [id,title] of g.items)lines.push("  "+(d.answers[id]||"Not answered")+" | "+title);lines.push("")}
lines.push("These are my preferences, not a final booking. Please consider them when setting the itinerary.");return lines.join("\n")}
section.querySelector("#rsvp-whatsapp").addEventListener("click",()=>{const msg=message();if(!msg)return;persist();const url="https://api.whatsapp.com/send?text="+encodeURIComponent(msg);window.open(url,"_blank","noopener,noreferrer");status.textContent="WhatsApp has opened. Please choose Muneer and tap Send. Responses are not automatically delivered from this page."});
section.querySelector("#rsvp-copy").addEventListener("click",async()=>{const msg=message();if(!msg)return;try{await navigator.clipboard.writeText(msg);persist();status.textContent="Copied. Paste the response into your WhatsApp chat with Muneer."}catch(e){const ta=document.createElement("textarea");ta.value=msg;ta.style.position="fixed";ta.style.opacity="0";document.body.append(ta);ta.select();const ok=document.execCommand("copy");ta.remove();status.textContent=ok?"Copied. Paste it into WhatsApp.":"Copy not available here. Use the WhatsApp button instead."}});
restore();
})();
