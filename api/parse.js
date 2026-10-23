// Resume parser: extracts text (PDF/DOCX), masks identifiers, then pulls skills, experience, qualification, certifications.
const pdf=require('pdf-parse/lib/pdf-parse.js'),mammoth=require('mammoth');
const SK={python:['python'],javascript:['javascript','node.js','nodejs'],typescript:['typescript'],sql:['sql','postgresql','mysql'],
 git:['git'],github:['github'],'rest api':['rest api','restful'],'api development':['api development','api design'],react:['react','react.js'],
 java:['java'],php:['php'],html:['html'],css:['css'],docker:['docker'],excel:['excel'],'data analysis':['data analysis'],
 'machine learning':['machine learning'],nlp:['nlp','natural language processing'],'project management':['project management'],communication:['communication']};
const LV=[[/\b(m\.?sc|master'?s?)\b/i,'MSc',4],[/\b(b\.?sc|bachelor'?s?|b\.?eng|b\.?tech)\b/i,'BSc',3],[/\bhnd\b/i,'HND',3],
 [/\b(ond|nd|nce|diploma)\b/i,'ND',2],[/\b(ssce|waec|neco)\b/i,'SSCE',1]];
const re=s=>new RegExp('(^|[^a-z0-9+#])'+s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'($|[^a-z0-9+#])','i');
async function text(name,buf){
 if(/\.pdf$/i.test(name))return (await pdf(buf)).text;
 return (await mammoth.extractRawText({buffer:buf})).value;
}
function extract(raw){
 const t=raw.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g,' ').replace(/\+?\d[\d\s()-]{8,}\d/g,' '); // mask email and phone
 const skills=Object.keys(SK).filter(k=>SK[k].some(a=>re(a).test(t)));
 const ys=[...t.matchAll(/(\d{1,2}(?:\.\d)?)\+?\s*(?:years?|yrs?)/gi)].map(m=>+m[1]).filter(n=>n<=40);
 const l=LV.find(x=>x[0].test(t));
 const certs=Math.min(5,t.split(/\n/).filter(x=>/certif/i.test(x)).length);
 return{skills,years:ys.length?Math.max(...ys):0,levelName:l?l[1]:'SSCE',level:l?l[2]:1,certs};
}
module.exports=async(req,res)=>{
 if(req.method!=='POST')return res.status(405).json({error:'Use POST'});
 const{filename,data}=req.body||{};
 if(typeof filename!=='string'||typeof data!=='string')return res.status(400).json({error:'Invalid payload'});
 if(!/\.(pdf|docx)$/i.test(filename))return res.status(415).json({error:'Only PDF or DOCX files are accepted'});
 const buf=Buffer.from(data,'base64');
 if(buf.length>3*1024*1024)return res.status(413).json({error:'File is larger than 3 MB'});
 try{const raw=await text(filename,buf);
  if(!raw||raw.trim().length<30)return res.status(422).json({error:'No readable text found (scanned PDFs are not supported)'});
  res.status(200).json(extract(raw));
 }catch(e){res.status(422).json({error:'Could not read this file'})}
};
