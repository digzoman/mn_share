(function(){
"use strict";
const groups=[
 {day:"Friday, November 6",subtitle:"Come when you can. All activities are optional.",items:[
  ["friday-arrival","Flexible welcome and settling in","Arrive anytime Friday evening and get comfortable."],
  ["friday-spa","Hot tub and sauna","Open through the evening, including before and after dinner, once ready."],
  ["friday-dinner","Late shared dinner","A relaxed dinner around 8:30 PM. Flexible for late arrivals."],
  ["friday-fireplace","Fireside music and conversation","Relax before the 1:00 AM quiet time."]
 ]},
 {day:"Saturday, November 7",subtitle:"Mindful morning, County outing, sunset at home.",items:[
  ["saturday-yoga","40 minute morning yoga","8:30 AM. Bring a notebook and pen to your mat."],
  ["saturday-vision","30 minute meditation and vision notes","9:10 AM. Combine meditation, intention setting and writing."],
  ["saturday-brunch","Brunch and notebook time","10:00 to 11:00 AM. Continue reflections during brunch."],
  ["saturday-walk","Macaulay Mountain and Birdhouse City","A short woodland walk following the 11:30 AM departure."],
  ["saturday-town","Picton town and harbour stroll","Short optional waterfront and boardwalk walk if timing allows."],
  ["saturday-tasting","Black Prince wine or vinegar tasting","Aim for about 2:00 PM. Nonalcoholic vinegars available."],
  ["saturday-food","Optional winery pizza and salads","Only if time and service allow before the 3:00 PM departure."],
  ["saturday-sunset","Sunset together at the house","Home around 4:00 PM to enjoy the 4:51 PM sunset."],
  ["saturday-spa","Hot tub, sauna and relaxation","Unwind after the outing."],
  ["saturday-cozy","Shared dinner and fireplace evening","Dinner, music and good company."],
  ["saturday-lanterns","Optional Firelight Lantern Festival","Saturday evening alternative in Picton after the house sunset."]
 ]},
 {day:"Sunday, November 8",subtitle:"A slow goodbye.",items:[
  ["sunday-stretch","Optional gentle morning stretch","Relaxed movement or an unhurried sleep in."],
  ["sunday-brunch","Slow shared brunch","Final group meal and time to connect."],
  ["sunday-reflect","Brief appreciation circle","A short closing group reflection."],
  ["sunday-walk","Optional short walk and photos","Fresh air before departure, weather and transport permitting."]
 ]}
];
const all=groups.flatMap(g=>g.items);
const params=new URLSearchParams(location.search);
const requestedAttendance=(params.get("attend")||"").trim().toLowerCase();
const recipient="14163339671";
const section=document.createElement("section");section.className="rsvp";section.id="preferences";section.setAttribute("aria-labelledby","pref-title");
section.innerHTML='<div class="wrap"><div class="rsvp-head"><div><div class="kicker eyebrow">08 / Shape the weekend</div><h2 id="pref-title">Your weekend,<br>your vote.</h2></div><p>Tell us which parts of the weekend appeal to you. Vote Yes, Maybe or No on each idea and use Add note for optional thoughts. This is a preference check, not a reservation.</p></div><div class="rsvp-panel"><div class="rsvp-top"><div class="rsvp-field"><label for="rsvp-name">Your name</label><input id="rsvp-name" maxlength="70" autocomplete="name" placeholder="Enter your name"><small>Personalized links support <code>?name=Daryna&amp;attend=Yes</code> to fill your name and default attendance.</small></div><div class="rsvp-attendance"><span>Are you planning to attend the retreat?</span><div id="rsvp-attend-controls" class="rsvp-buttons" role="group" aria-label="Overall attendance"></div></div></div><div class="rsvp-progress"><span>Make your selections or leave some unanswered.</span><span id="rsvp-progress-text" aria-live="polite">0 of '+all.length+' answered</span></div><div class="rsvp-bar" aria-hidden="true"><span id="rsvp-progress-fill"></span></div><form id="rsvp-form"><div id="rsvp-days" class="rsvp-days"></div><div class="rsvp-actions"><button type="button" class="rsvp-action rsvp-action--main" id="rsvp-whatsapp">Send preferences to Muneer on WhatsApp ↗</button><button type="button" class="rsvp-action rsvp-action--alt" id="rsvp-copy">Copy my responses</button></div><p id="rsvp-status" class="rsvp-status" aria-live="polite"></p><div class="rsvp-privacy"><strong>How saving works:</strong> Your votes and notes are saved in this browser as you make them. This site does not have a shared response database yet. The WhatsApp button prepares a message addressed to Muneer at +1 416 333 9671. Tap Send in WhatsApp to deliver it. Nothing is sent automatically.</div></form></div></div>';
const footer=document.querySelector("footer");if(!footer)return;footer.before(section);
const nameInput=section.querySelector("#rsvp-name"),days=section.querySelector("#rsvp-days"),status=section.querySelector("#rsvp-status"),attend=section.querySelector("#rsvp-attend-controls");
const options=["Yes","Maybe","No"];
function choice(id,value){const label=document.createElement("label");label.className="rsvp-choice";const input=document.createElement("input");input.type="radio";input.name=id;input.value=value;const text=document.createElement("span");text.textContent=value;label.append(input,text);return label}
for(const value of options)attend.append(choice("attend",value));
for(const group of groups){
 const day=document.createElement("div");day.className="rsvp-day";
 const header=document.createElement("div");header.className="rsvp-day__head";
 const heading=document.createElement("h3");heading.textContent=group.day;
 const subtitle=document.createElement("p");subtitle.textContent=group.subtitle;header.append(heading,subtitle);day.append(header);
 for(const item of group.items){
  const id=item[0],title=item[1],detail=item[2];
  const row=document.createElement("div");row.className="rsvp-row";row.dataset.question=id;
  const info=document.createElement("div");const t=document.createElement("div");t.className="rsvp-row__title";t.textContent=title;
  const d=document.createElement("div");d.className="rsvp-row__detail";d.textContent=detail;info.append(t,d);
  const radios=document.createElement("div");radios.className="rsvp-buttons";radios.setAttribute("role","group");radios.setAttribute("aria-label",title);
  for(const value of options)radios.append(choice(id,value));
  const note=document.createElement("div");note.className="rsvp-note";
  const button=document.createElement("button");button.type="button";button.className="rsvp-note__toggle";button.textContent="+ Add note";button.setAttribute("aria-expanded","false");button.setAttribute("aria-controls","note-"+id);
  const area=document.createElement("textarea");area.id="note-"+id;area.dataset.note=id;area.className="rsvp-note__text";area.rows=3;area.maxLength=350;area.hidden=true;area.setAttribute("aria-label","Optional note for "+title);area.placeholder="Optional suggestion, question or timing idea";
  button.addEventListener("click",function(){const show=area.hidden;area.hidden=!show;button.setAttribute("aria-expanded",String(show));button.textContent=show?"Hide note":(area.value.trim()?"Edit note":"+ Add note");if(show)area.focus()});
  note.append(button,area);row.append(info,radios,note);day.append(row);
 }
 days.append(day);
}
nameInput.value=(params.get("name")||"").slice(0,70);
function key(){return "abundanceNov2026:rsvp:"+nameInput.value.trim().toLocaleLowerCase()}
function read(){
 const answers={},notes={};
 for(const i of section.querySelectorAll('input[type="radio"]:checked'))answers[i.name]=i.value;
 for(const i of section.querySelectorAll('textarea[data-note]')){const text=i.value.trim();if(text)notes[i.dataset.note]=text}
 return {name:nameInput.value.trim(),answers,notes,updated:new Date().toISOString()};
}
function progress(){const state=read(),count=all.filter(item=>state.answers[item[0]]).length;section.querySelector("#rsvp-progress-text").textContent=count+" of "+all.length+" answered";section.querySelector("#rsvp-progress-fill").style.width=(count/all.length*100)+"%"}
function persist(){progress();try{if(read().name)localStorage.setItem(key(),JSON.stringify(read()));status.removeAttribute("role");status.textContent="Saved on this device. Use WhatsApp or Copy to share with the hosts."}catch(e){status.textContent="Local saving is unavailable. You can still share your responses."}}
function restore(){
 for(const i of section.querySelectorAll('input[type="radio"]'))i.checked=false;
 for(const area of section.querySelectorAll('textarea[data-note]')){area.value="";area.hidden=true}
 for(const btn of section.querySelectorAll(".rsvp-note__toggle")){btn.textContent="+ Add note";btn.setAttribute("aria-expanded","false")}
 let saved=null;try{saved=JSON.parse(localStorage.getItem(key())||"null")}catch(e){}
 if(saved&&saved.answers){for(const [id,value] of Object.entries(saved.answers)){const input=[...section.querySelectorAll('input[type="radio"]')].find(i=>i.name===id&&i.value===value);if(input)input.checked=true}}
 if(saved&&saved.notes){for(const [id,value] of Object.entries(saved.notes)){const area=[...section.querySelectorAll('textarea[data-note]')].find(i=>i.dataset.note===id);if(area){area.value=String(value).slice(0,350);area.hidden=false;const btn=area.parentElement.querySelector("button");btn.textContent="Hide note";btn.setAttribute("aria-expanded","true")}}}
 if(!saved?.answers?.attend&&options.some(v=>v.toLowerCase()===requestedAttendance)){const radio=[...section.querySelectorAll('input[name="attend"]')].find(i=>i.value.toLowerCase()===requestedAttendance);if(radio)radio.checked=true}
 progress();
}
let previous=key();
nameInput.addEventListener("change",()=>{const now=key();if(now!==previous){previous=now;restore();status.textContent="Name changed. Review the responses for this name."}});
nameInput.addEventListener("input",()=>{status.textContent="Name updated. Responses are saved under your name when you choose an option."});
for(const i of section.querySelectorAll('input[type="radio"]'))i.addEventListener("change",persist);
for(const area of section.querySelectorAll('textarea[data-note]'))area.addEventListener("input",persist);
function message(){
 const state=read();if(!state.name){nameInput.focus();status.setAttribute("role","alert");status.textContent="Please enter your name before sharing.";return null}
 const lines=["ABUNDANCE RETREAT 2.0 | NOVEMBER 6 TO 8","Name: "+state.name,"Planning to attend: "+(state.answers.attend||"Not decided"),""];
 for(const group of groups){lines.push(group.day+":");for(const item of group.items){const id=item[0],title=item[1];lines.push("  "+(state.answers[id]||"Not answered")+" | "+title);if(state.notes[id])lines.push("    Note: "+state.notes[id])}lines.push("")}
 lines.push("These are preferences to help plan the weekend, not a confirmed booking.");return lines.join("\n");
}
section.querySelector("#rsvp-whatsapp").addEventListener("click",()=>{
 const msg=message();if(!msg)return;persist();window.open("https://wa.me/"+recipient+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");
 status.textContent="Your WhatsApp chat with Muneer should open with the prepared message. Tap Send to deliver your responses.";
});
section.querySelector("#rsvp-copy").addEventListener("click",async()=>{
 const msg=message();if(!msg)return;
 try{await navigator.clipboard.writeText(msg);persist();status.textContent="Copied. Paste the response into WhatsApp."}
 catch(e){const tmp=document.createElement("textarea");tmp.value=msg;tmp.style.position="fixed";tmp.style.opacity="0";document.body.append(tmp);tmp.select();const ok=document.execCommand("copy");tmp.remove();status.textContent=ok?"Copied. Paste the response into WhatsApp.":"Copy unavailable. Try the WhatsApp button instead."}
});
restore();
})();