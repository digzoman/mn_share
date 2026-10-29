(function(){
"use strict";
const groups=[
 {day:"Friday, November 13",subtitle:"Come whenever you can, with dinner the only Friday anchor.",items:[
 ["friday-arrival","5:00 PM to 10:00 PM: Flexible arrivals","Join whenever your travel allows."],
 ["friday-spa","6:00 PM to 8:15 PM and 9:45 PM to 12:15 AM: Optional sauna and hot tub","Use before or after dinner."],
 ["friday-dinner","8:30 PM to 9:45 PM: Shared welcome dinner","Food can be saved for later arrivals."],
 ["friday-fireplace","9:45 PM to 12:15 AM: Games and fireside","Optional social time. Quiet hours begin at 1 AM."]
 ]},
 {day:"Saturday, November 14",subtitle:"One morning together, then one of three alternative afternoon routes.",items:[
 ["saturday-yoga","9:00 AM to 9:40 AM: Indoor yoga","Bring a notebook and pen. Setup starts at 8:40 AM."],
 ["saturday-vision","9:40 AM to 10:10 AM: Meditation and vision notes","30 minutes of journaling and intentions."],
 ["saturday-brunch","10:10 AM to 11:00 AM: Group brunch","Getting ready from 11:00 to 11:30 AM."],
 ["saturday-outing","11:30 AM to 3:40 PM: Choose one County route","Wellington and Drake, Macaulay plus Picton and Drake, or Black Prince and home sunset."],
 ["saturday-sunset","3:40 PM to 4:55 PM: Sunset by the lake or at home","Drake in Wellington around 4:44 PM or the house around 4:43 PM."],
 ["saturday-spa","Evening: Optional hot tub and sauna","Timing depends on whether we eat at Drake or return home."]
 ]},
 {day:"Sunday, November 15",subtitle:"Relaxed brunch and flexible departures.",items:[
 ["sunday-stretch","9:00 AM to 9:30 AM: Optional stretching","Relax or sleep in."],
 ["sunday-brunch","10:15 AM to 11:15 AM: Shared brunch","The final group meal."],
 ["sunday-reflect","11:15 AM to 11:40 AM: Brief appreciation circle","Optional short reflection."],
 ["sunday-market","After 12:15 PM: Optional GIFTED market","Independent Sunday outing in Bloomfield."]
 ]}
];
const all=groups.flatMap(g=>g.items);
const totalQuestions=all.length+2;
const params=new URLSearchParams(location.search);
const requestedAttendance=(params.get("attend")||"").trim().toLowerCase();
const recipient="14163339671";
const section=document.createElement("section");section.className="rsvp";section.id="preferences";section.setAttribute("aria-labelledby","pref-title");
section.innerHTML='<div class="wrap"><div class="rsvp-head"><div><div class="kicker eyebrow">09 / Shape the weekend</div><h2 id="pref-title">Your weekend,<br>your vote.</h2></div><div><p>Vote on the core activities, then choose one Saturday afternoon route and whether we should enjoy a short Drake stop, have a reserved dinner there, or eat at home. Add a note to anything. Nothing is booked.</p><p class="rsvp-return"><a href="#schedule">↑ View the full timetable and travel windows</a></p></div></div><div class="rsvp-panel"><div class="rsvp-top"><div class="rsvp-field"><label for="rsvp-name">Your name</label><input id="rsvp-name" maxlength="70" autocomplete="name" placeholder="Enter your name"><small>Personalized links support <code>?name=Daryna&amp;attend=Yes</code>. The dates are November 13 to 15. All route and restaurant choices are optional.</small></div><div class="rsvp-attendance"><span>Are you planning to attend the retreat?</span><div id="rsvp-attend-controls" class="rsvp-buttons" role="group" aria-label="Overall attendance"></div></div></div><div class="rsvp-progress"><span>Updated to compare Wellington and Picton routes, sunset at Drake or at the house, and optional meals. Please review your choices.</span><span id="rsvp-progress-text" aria-live="polite">0 of '+all.length+' answered</span></div><div class="rsvp-bar" aria-hidden="true"><span id="rsvp-progress-fill"></span></div><form id="rsvp-form"><div id="rsvp-days" class="rsvp-days"></div><div class="rsvp-actions"><button type="button" class="rsvp-action rsvp-action--main" id="rsvp-whatsapp">Send preferences to Muneer on WhatsApp ↗</button><button type="button" class="rsvp-action rsvp-action--alt" id="rsvp-copy">Copy my responses</button></div><p id="rsvp-status" class="rsvp-status" aria-live="polite"></p><div class="rsvp-privacy"><strong>How saving works:</strong> Your votes and notes are saved in this browser as you make them. This page does not have a shared response database. Earlier itinerary selections are not automatically reused for these new routes. The WhatsApp button prepares a message addressed to Muneer at +1 416 333 9671. Tap Send in WhatsApp to deliver it. Nothing is sent automatically.</div></form></div></div>';
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
 if(group.day.startsWith("Saturday")){
  const specials=[
 ["route_choice","Which Saturday afternoon route do you prefer?",["A: Wellington beach then Drake","B: Macaulay and Picton then Drake","C: Black Prince then sunset at home","Stay at the house","Happy with any route"],"These are separate itinerary possibilities. Route B requires a Picton to Wellington transfer. Route C stays in Picton and returns home for sunset."],
 ["evening_choice","What should happen after sunset?",["Drake snack then dinner at home","Drake sunset and Countylicious dinner","Sunset and dinner at the house","The Royal dinner if available","Any option works"],"The Drake's snack service is published for 3 PM to 5 PM, while dinner begins at 5 PM. A group of approximately 15 must arrange space in advance. Everything is optional."]
 ];
 for(const [id,title,values,detail] of specials){
   const wrap=document.createElement("div");wrap.className="rsvp-special";wrap.dataset.question=id;
   const h=document.createElement("div");h.className="rsvp-special__title";h.textContent=title;
   const description=document.createElement("p");description.className="rsvp-special__detail";description.textContent=detail;
   const opts=document.createElement("div");opts.className="rsvp-special__choices";opts.setAttribute("role","group");opts.setAttribute("aria-label",title);
   for(const value of values)opts.append(choice(id,value));
   const noteWrap=document.createElement("div");noteWrap.className="rsvp-note";
   const button=document.createElement("button");button.type="button";button.className="rsvp-note__toggle";button.setAttribute("aria-expanded","false");button.setAttribute("aria-controls","note-"+id);button.textContent="+ Add note";
   const area=document.createElement("textarea");area.id="note-"+id;area.dataset.note=id;area.className="rsvp-note__text";area.rows=3;area.maxLength=350;area.hidden=true;area.setAttribute("aria-label","Optional note for "+title);area.placeholder="Tell us what you would change";
   button.addEventListener("click",()=>{const show=area.hidden;area.hidden=!show;button.setAttribute("aria-expanded",String(show));button.textContent=show?"Hide note":(area.value.trim()?"Edit note":"+ Add note");if(show)area.focus()});
   noteWrap.append(button,area);wrap.append(h,description,opts,noteWrap);day.append(wrap);
  }
 }
 days.append(day);
}
nameInput.value=(params.get("name")||"").slice(0,70);
function key(){return "abundanceNov2026:rsvp:v5:"+nameInput.value.trim().toLocaleLowerCase()}
function read(){
 const answers={},notes={};
 for(const i of section.querySelectorAll('input[type="radio"]:checked'))answers[i.name]=i.value;
 for(const i of section.querySelectorAll('textarea[data-note]')){const text=i.value.trim();if(text)notes[i.dataset.note]=text}
 return {name:nameInput.value.trim(),answers,notes,updated:new Date().toISOString()};
}
function progress(){const state=read(),count=all.filter(item=>state.answers[item[0]]).length+(state.answers.route_choice?1:0)+(state.answers.evening_choice?1:0);section.querySelector("#rsvp-progress-text").textContent=count+" of "+totalQuestions+" answered";section.querySelector("#rsvp-progress-fill").style.width=(count/totalQuestions*100)+"%"}
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
 const lines=["ABUNDANCE RETREAT 2.0 | NOVEMBER 13 TO 15 | ROUTES AND SUNSET OPTIONS","Name: "+state.name,"Planning to attend: "+(state.answers.attend||"Not decided"),""];
 for(const group of groups){lines.push(group.day+":");for(const item of group.items){const id=item[0],title=item[1];lines.push("  "+(state.answers[id]||"Not answered")+" | "+title);if(state.notes[id])lines.push("    Note: "+state.notes[id])}lines.push("")}
 lines.push("Preferred Saturday route: "+(state.answers.route_choice||"Not selected"));if(state.notes.route_choice)lines.push("  Note: "+state.notes.route_choice);
 lines.push("Saturday evening preference: "+(state.answers.evening_choice||"Not selected"));if(state.notes.evening_choice)lines.push("  Note: "+state.notes.evening_choice);
 lines.push("");
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