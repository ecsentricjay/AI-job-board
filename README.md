# AI Recruitment Platform (Vercel)

- `public/` : the 5 pages (login, job seeker, vacancy and weights, ranking, admin)
- `api/parse.js` : resume parser (PDF/DOCX text extraction, identifier masking, skills/experience/qualification/certification)
- `api/score.js` : ranking service (weighted composite score, criterion-level breakdown)

## Deploy
1. Push this folder to a GitHub repo, then Vercel > Add New Project > import it (Framework Preset: Other). No build command needed.
   Or run `npm i -g vercel` then `vercel --prod` inside this folder.
2. Open the Vercel URL. Test it once before the defense.

## Demo script
1. Register as a Job Seeker, upload a PDF/DOCX CV, click Parse resume, check the fields, Save, then Apply.
2. Log in as a recruiter (or open Vacancy & Weights), set weights, Save.
3. Open Ranking: show scores and breakdown, then change weights (try Skills-emphasised) and watch the order change.
4. Shortlist/Accept/Reject, then log in as admin@jugo.demo to show the audit log.

## Limits
Data is stored in each browser's localStorage (one browser = one demo; use the same browser for all roles).
Max CV size is 3 MB (Vercel's request limit). Scanned PDFs are not supported. Semantic matching uses a small lookup table, not Sentence-BERT.
