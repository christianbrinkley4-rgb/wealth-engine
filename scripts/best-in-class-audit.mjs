import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { JSDOM } from 'jsdom';

const output = process.argv[2] || 'docs/best-in-class/route-audit.json';
const root = '.next/server/app';
const manifest = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));
const rows = [];
for (const route of Object.keys(manifest.routes)) {
  const file = path.join(root, route === '/' ? 'index.html' : `${route}.html`);
  if (!fs.existsSync(file)) continue;
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
  const d = dom.window.document;
  const main = d.querySelector('main');
  const meta = (name) => d.querySelector(`meta[name="${name}"],meta[property="${name}"]`)?.content || null;
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent));
  const scripts = [...new Set([...d.querySelectorAll('script[src]')].map(s => s.getAttribute('src')))];
  const jsGzipBytes = scripts.reduce((sum, src) => {
    const local = path.join('.next', src.replace('/_next/', ''));
    return sum + (fs.existsSync(local) ? gzipSync(fs.readFileSync(local)).length : 0);
  }, 0);
  const headings = [...(main?.querySelectorAll('h1,h2,h3,h4,h5,h6') || [])].map(h=>({level:Number(h.tagName[1]), text:h.textContent}));
  const substance = [...(main?.querySelectorAll('.w-prose, .measure-prose, .w-answer') || [])].filter(e=> !e.parentElement.closest('.w-prose, .measure-prose, .w-answer')).map(e=>e.textContent).join(' ');
  const links = [...new Set([...(main?.querySelectorAll('a[href]') || [])].map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/')&&!h.startsWith('//')).map(h=>h.split(/[?#]/)[0]))];
  rows.push({route,title:d.title,description:meta('description'),canonical:d.querySelector('link[rel="canonical"]')?.href,ogTitle:meta('og:title'),ogDescription:meta('og:description'),ogImage:meta('og:image'),robots:meta('robots'),h1:headings.filter(h=>h.level===1).length,headingSkips:headings.filter((h,i)=>i&&h.level>headings[i-1].level+1),missingAlt:[...d.querySelectorAll('img:not([alt])')].length,substanceWords:substance.trim().split(/\s+/).length,figures:[...new Set(substance.match(/\$[\d,.]+|\b\d+(?:\.\d+)?%|\b\d{4}\b/g)||[])],sources:[...new Set([...(main?.querySelectorAll('a[href^="http"]')||[])].map(a=>a.href))],schemaTypes:schemas.flatMap(s=>s['@graph']||[s]).map(s=>s['@type']),speakable:schemas.some(s=>s.speakable),jsGzipBytes,overBudget:jsGzipBytes>230*1024,links});
  dom.window.close();
}
const depths = new Map([['/',0]]);
for(let pass=0;pass<rows.length;pass++) {
  let changed=false;
  for(const row of rows) if(depths.has(row.route)) for(const link of row.links) if(!depths.has(link)){depths.set(link,depths.get(row.route)+1);changed=true;}
  if(!changed) break;
}
for(const row of rows) row.mainLinkDepth=depths.get(row.route)??null;
fs.mkdirSync(path.dirname(output),{recursive:true});
fs.writeFileSync(output, JSON.stringify({method:'Production prerendered HTML. Main-content links only. Gzip initial script budget: 230 KiB, an audit target, not field CWV.',routes:rows},null,2)+'\n');
console.log(JSON.stringify({routes:rows.length,missingMetadata:rows.filter(r=>!r.title||!r.description||!r.ogTitle||!r.ogDescription||!r.ogImage).map(r=>r.route),headingIssues:rows.filter(r=>r.h1!==1||r.headingSkips.length).map(r=>r.route),missingAlt:rows.filter(r=>r.missingAlt).map(r=>r.route),overBudget:rows.filter(r=>r.overBudget).map(r=>[r.route,r.jsGzipBytes]),maxGzip:Math.max(...rows.map(r=>r.jsGzipBytes))},null,2));
