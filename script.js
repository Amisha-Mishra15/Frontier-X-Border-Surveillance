const cameras=[
  ["C01","North Gate","ONLINE","Person detected"],["C04","River Crossing","ONLINE","Vehicle detected"],
  ["C07","Sector A Fence","ONLINE","Intrusion risk"],["C09","Hill Checkpoint","OFFLINE","Signal lost"],
  ["C12","Patrol Route","ONLINE","Normal"],["C15","East Perimeter","OFFLINE","Camera tamper"]
];
let alerts=[
 {type:"INTRUSION",cam:"C07 • Sector A Fence",time:"09:42:18",risk:"HIGH",desc:"Person entered restricted virtual fence."},
 {type:"LOITERING",cam:"C04 • River Crossing",time:"09:39:51",risk:"HIGH",desc:"Unusual stationary movement for 11 minutes."},
 {type:"VEHICLE",cam:"C01 • North Gate",time:"09:36:27",risk:"MEDIUM",desc:"Unidentified vehicle movement detected."},
 {type:"CAMERA TAMPER",cam:"C15 • East Perimeter",time:"09:31:04",risk:"MEDIUM",desc:"Camera angle changed / feed quality degraded."}
];
const events=[
 ["09:42:18","Restricted-zone intrusion","C07","82 / High","Pending review"],
 ["09:39:51","Loitering behaviour","C04","78 / High","Pending review"],
 ["09:36:27","Vehicle detected","C01","54 / Medium","Verified"],
 ["09:31:04","Camera tampering","C15","67 / Medium","Investigating"],
 ["09:24:10","Night activity","C12","41 / Low","Verified"],
 ["09:18:42","Person detected","C03","23 / Low","Normal"]
];
const evidence=[
 ["EV-2409-071","C07 • Intrusion snapshot","09:42:18","a7f3c1d90e6b2f8a4c77...92de"],
 ["EV-2409-068","C04 • Loitering clip","09:39:51","c1b84a7e2d9044bca912...4f10"],
 ["EV-2409-061","C15 • Tamper record","09:31:04","6e02af13bc447d8e90aa...c3b2"]
];

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function go(page){
  $$(".page").forEach(p=>p.classList.remove("active"));
  $(`#page-${page}`).classList.add("active");
  $$(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===page));
  const titles={overview:"Command Center",cameras:"Live Camera Network",alerts:"Alert Center",events:"Event History",evidence:"Evidence Vault",analytics:"Risk & Behaviour Analytics",map:"Digital Border Map",assistant:"Frontier AI",health:"System Health"};
  $("#pageTitle").textContent=titles[page]||"Command Center";
  window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
$$("[data-page-link]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.pageLink)));

function camMarkup(c,large=false){
 return large?`<div class="big-cam"><div class="scan"></div><div class="cam-info"><b>${c[0]} • ${c[1]}</b><span>${c[2]==="ONLINE"?"● LIVE":"● OFFLINE"}</span></div>${c[2]==="ONLINE"?'<div class="bbox"></div>':''}</div>`
 :`<div class="cam"><div class="camtop"><span>${c[0]} • ${c[1]}</span><span class="${c[2]==="ONLINE"?"":"rec"}">● ${c[2]}</span></div>${c[2]==="ONLINE"?'<div class="bbox"></div>':''}</div>`;
}
$("#miniCameras").innerHTML=cameras.slice(0,4).map(c=>camMarkup(c)).join("");
$("#cameraGrid").innerHTML=cameras.map(c=>camMarkup(c,true)).join("");

function alertMarkup(a){return `<div class="alert-item"><strong>${a.type}</strong><span class="tag ${a.risk.toLowerCase()}">${a.risk}</span><small>${a.cam} • ${a.time}</small><div style="font-size:10px;color:#b3c4cf;margin-top:8px">${a.desc}</div></div>`}
function renderAlerts(){
 $("#miniAlerts").innerHTML=alerts.slice(0,3).map(alertMarkup).join("");
 $("#alertsFull").innerHTML=alerts.length?alerts.map(alertMarkup).join(""):`<div class="panel"><h3>No active alerts</h3><p class="muted">All alerts have been acknowledged.</p></div>`;
 $("#activeAlerts").textContent=alerts.length;
 $("#alertBadge").textContent=alerts.length;
 $("#notifyCount").textContent=alerts.length;
}
renderAlerts();
$("#eventTable").innerHTML=events.map(e=>`<tr><td>${e[0]}</td><td>${e[1]}</td><td>${e[2]}</td><td><span class="tag ${e[3].toLowerCase().includes("high")?"high":e[3].toLowerCase().includes("medium")?"medium":"low"}">${e[3]}</span></td><td>${e[4]}</td></tr>`).join("");
$("#evidenceGrid").innerHTML=evidence.map(e=>`<div class="evidence-card"><span class="eyebrow">${e[0]}</span><h3 style="margin:9px 0">${e[1]}</h3><p class="muted">Captured ${e[2]} • Evidence record</p><div class="hash">SHA-256<br>${e[3]}</div><button class="text-btn verify-one" style="padding-left:0;margin-top:10px">Verify integrity →</button></div>`).join("");

$("#clearAlerts").onclick=()=>{alerts=[];renderAlerts();toast("All alerts acknowledged")};
$("#refreshCams").onclick=()=>{toast("Camera feeds refreshed • 12/15 online")};
$("#verifyEvidence").onclick=()=>toast("All displayed evidence hashes verified");
document.addEventListener("click",e=>{if(e.target.classList.contains("verify-one"))toast("Evidence integrity verified • SHA-256 match")});
$("#exportEvents").onclick=()=>toast("Demo incident report prepared");
$("#notifyBtn").onclick=()=>{go("alerts");toast("Showing active alerts")};
$("#demoBtn").onclick=()=>toast("Demo mode active • simulated surveillance events enabled");

function answer(q){
 q=q.toLowerCase();
 if(q.includes("offline")) return "3 cameras need attention: C09 Hill Checkpoint, C15 East Perimeter and one additional feed in the network summary.";
 if(q.includes("high")||q.includes("risk")) return "Current high-risk events: C07 restricted-zone intrusion (82) and C04 loitering behaviour (78). Officer verification is pending.";
 if(q.includes("incident")||q.includes("happened")) return "Latest incident: at 09:42:18, C07 detected a person entering the restricted virtual fence in Sector A. Risk score 82/100. Evidence EV-2409-071 was recorded and integrity-hashed.";
 if(q.includes("evidence")||q.includes("protected")||q.includes("hash")) return "Evidence is represented with SHA-256 integrity hashes and an audit record. The PPT architecture describes the next integration step as Event/Evidence → Hash → Blockchain for tamper-evident evidence.";
 if(q.includes("camera")) return "12 of 15 cameras are online. The system dashboard monitors feed status and can flag camera tampering or signal loss.";
 return "I can search the demo dataset for cameras, alerts, events, evidence, risk scores and system health. Try: 'Show high risk events'.";
}
function send(q){
 if(!q.trim())return;
 $("#chat").insertAdjacentHTML("beforeend",`<div class="user msg"><b>You</b><p>${q.replace(/[<>]/g,"")}</p></div>`);
 setTimeout(()=>$("#chat").insertAdjacentHTML("beforeend",`<div class="bot msg"><b>Frontier AI</b><p>${answer(q)}</p></div>`),220);
 $("#chat").scrollTop=$("#chat").scrollHeight;
}
$("#chatForm").onsubmit=e=>{e.preventDefault();const i=$("#chatInput");send(i.value);i.value=""};
$$(".suggestions button").forEach(b=>b.onclick=()=>send(b.textContent));
