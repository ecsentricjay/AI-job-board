// Shared helpers. Data is kept in localStorage for this demo build.
const DB={get:(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},
 set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const log=a=>{const l=DB.get('audit',[]);l.unshift({t:new Date().toLocaleString(),a});DB.set('audit',l.slice(0,50))};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LEVELS={SSCE:1,OND:2,ND:2,NCE:2,HND:3,BSc:3,MSc:4};
const DEF_VAC={title:'Software Developer',skills:[{n:'python',t:3},{n:'javascript',t:3},{n:'sql',t:3},{n:'git',t:3},{n:'rest api',t:3}],
 minExp:3,minLevel:3,certs:1,w:{skill:.45,exp:.30,qual:.15,cert:.10},mix:.5,thr:.6};
const SEED=[
 {id:'A',name:'Candidate A',skills:['python','javascript','sql','github','rest api'],years:4,level:4,certs:0,status:'Submitted'},
 {id:'B',name:'Candidate B',skills:['python','sql','git','typescript','api development'],years:3,level:3,certs:1,status:'Submitted'},
 {id:'C',name:'Candidate C',skills:['python','sql'],years:1.5,level:2,certs:0,status:'Submitted'},
 {id:'chinedu.okafor@mail.com',name:'Chinedu Okafor',skills:['python','javascript','sql','git','rest api'],years:5,level:3,certs:2,status:'Shortlisted'},
 {id:'amaka.eze@mail.com',name:'Amaka Eze',skills:['python','sql','github','react'],years:2.5,level:3,certs:1,status:'Submitted'},
 {id:'tunde.bakare@mail.com',name:'Tunde Bakare',skills:['javascript','typescript','react','git','api development'],years:3.5,level:3,certs:0,status:'Submitted'},
 {id:'ngozi.adeyemi@mail.com',name:'Ngozi Adeyemi',skills:['python','sql','machine learning','excel'],years:6,level:4,certs:2,status:'Submitted'},
 {id:'ibrahim.musa@mail.com',name:'Ibrahim Musa',skills:['java','sql','git','docker'],years:4,level:3,certs:1,status:'Submitted'},
 {id:'blessing.etim@mail.com',name:'Blessing Etim',skills:['html','css','javascript','git'],years:1,level:2,certs:0,status:'Rejected'},
 {id:'emeka.nwosu@mail.com',name:'Emeka Nwosu',skills:['python','javascript','sql','git','rest api','docker'],years:3,level:3,certs:1,status:'Accepted'},
 {id:'fatima.bello@mail.com',name:'Fatima Bello',skills:['communication','excel','project management'],years:7,level:3,certs:2,status:'Submitted'}
].map(c=>c.id.includes('@')?{...c,email:c.id,applied:true}:c);
const SEED_USERS=[{name:'System Admin',email:'admin@jugo.demo',role:'admin',status:'active',org:'Jugo Tech'},
 {name:'Grace Okon',email:'grace.okon@ndtechhub.ng',role:'recruiter',status:'active',org:'Niger Delta Tech Hub'},
 {name:'David Amadi',email:'david.amadi@phdigital.ng',role:'recruiter',status:'active',org:'PH Digital Labs'},
 {name:'Sandra Ikpe',email:'sandra.ikpe@riversfintech.ng',role:'recruiter',status:'active',org:'Rivers Fintech'},
 {name:'Peter Wariboko',email:'peter.wariboko@greenfield.ng',role:'recruiter',status:'suspended',org:'GreenField Energy Services'},
 ...SEED.filter(c=>c.email).map(c=>({name:c.name,email:c.email,role:'seeker',status:'active',org:'-'}))];
if(DB.get('seed',0)<2){ // first run: load demo accounts and candidates, keep anything the user already created
 DB.set('users',[...SEED_USERS,...DB.get('users',[]).filter(u=>!SEED_USERS.some(s=>s.email===u.email))]);
 DB.set('cands',[...SEED,...DB.get('cands',[]).filter(c=>!SEED.some(s=>s.id===c.id))]);DB.set('seed',2)}
function nav(){const p=location.pathname.split('/').pop()||'index.html',u=DB.get('session',null);
 const L=[['index.html','Login'],['seeker.html','Job Seeker'],['vacancy.html','Vacancy &amp; Weights'],['ranking.html','Ranking'],['admin.html','Admin']];
 document.write('<nav><div class="brand"><span class="logo">AI</span>Recruit</div><div class="links">'+
  L.map(([h,t])=>`<a href="${h}"${p===h?' class="on"':''}>${t}</a>`).join('')+'</div>'+
  (u?`<div class="who"><span class="av">${esc(u.name[0])}</span>${esc(u.name)}<a href="#" onclick="DB.set('session',null);location.href='index.html';return false">Logout</a></div>`:'')+'</nav>')}
