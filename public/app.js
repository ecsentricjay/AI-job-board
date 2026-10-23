// Shared helpers. NOTE: this front-end demo keeps data in localStorage. In the full system the
// data lives in PostgreSQL behind the Node/Express API, and scoring runs in the Python AI service.
const DB={get:(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},
 set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const log=a=>{const l=DB.get('audit',[]);l.unshift({t:new Date().toLocaleString(),a});DB.set('audit',l.slice(0,50))};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LEVELS={SSCE:1,OND:2,ND:2,NCE:2,HND:3,BSc:3,MSc:4};
const DEF_VAC={title:'Software Developer',skills:[{n:'python',t:3},{n:'javascript',t:3},{n:'sql',t:3},{n:'git',t:3},{n:'rest api',t:3}],
 minExp:3,minLevel:3,certs:1,w:{skill:.45,exp:.30,qual:.15,cert:.10},mix:.5,thr:.6};
const SEED=[{id:'A',name:'Candidate A',skills:['python','javascript','sql','github','rest api'],years:4,level:4,certs:0,status:'Submitted'},
 {id:'B',name:'Candidate B',skills:['python','sql','git','typescript','api development'],years:3,level:3,certs:1,status:'Submitted'},
 {id:'C',name:'Candidate C',skills:['python','sql'],years:1.5,level:2,certs:0,status:'Submitted'}];
function nav(){document.write('<nav><b>AI Recruitment Platform</b><a href="index.html">Login</a><a href="seeker.html">Job Seeker</a><a href="vacancy.html">Vacancy &amp; Weights</a><a href="ranking.html">Ranking</a><a href="admin.html">Admin</a></nav>')}
