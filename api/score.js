// Ranking service: S = w1*skill + w2*experience + w3*qualification + w4*certification
// Skill score = mix*keyword + (1-mix)*semantic. Semantic is a lookup stand-in for Sentence-BERT.
const SIM={'git|github':.82,'javascript|typescript':.71,'rest api|api development':.78};
const sim=(a,b)=>a===b?1:(SIM[a+'|'+b]||SIM[b+'|'+a]||0);
function score(c,v){
 const tot=v.skills.reduce((a,s)=>a+s.t,0)||1;let kw=0,sm=0;
 v.skills.forEach(s=>{kw+=c.skills.includes(s.n)?s.t:0;
  const b=Math.max(0,...c.skills.map(x=>sim(s.n,x)));sm+=(b>=v.thr?b:0)*s.t});
 kw/=tot;sm/=tot;const skill=v.mix*kw+(1-v.mix)*sm;
 const exp=Math.min(1,c.years/(v.minExp||1)),qual=Math.min(1,c.level/(v.minLevel||1)),cert=v.certs?Math.min(1,c.certs/v.certs):1;
 const S=v.w.skill*skill+v.w.exp*exp+v.w.qual*qual+v.w.cert*cert;
 return{skill,exp,qual,cert,S:Math.round(S*100)};
}
module.exports=(req,res)=>{
 if(req.method!=='POST')return res.status(405).json({error:'Use POST'});
 const{vacancy:v,candidates:cs}=req.body||{};
 if(!v||!v.w||!Array.isArray(v.skills)||!Array.isArray(cs))return res.status(400).json({error:'Invalid payload'});
 const w=v.w;if(Math.abs(w.skill+w.exp+w.qual+w.cert-1)>0.001)return res.status(400).json({error:'Weights must sum to 1'});
 if(cs.some(c=>!Array.isArray(c.skills)))return res.status(400).json({error:'Invalid candidate'});
 res.status(200).json(cs.map(c=>({id:c.id,...score(c,v)})));
};
