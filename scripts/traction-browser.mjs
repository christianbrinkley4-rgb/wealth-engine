// GET-only browser verification. Never submits a live form; blocks external requests.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const load = createRequire(import.meta.url);
const { chromium } = load(process.env.PLAYWRIGHT_MODULE || 'C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1007-641-0_26.1007.641.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const base = process.argv[2] || 'http://localhost:3101';
const dir = process.argv[3] || '.cache/traction/screens';
const full = new Set(['/', '/turning-65', '/learn', '/guides', '/wealth', '/about', '/service-area', '/annual-enrollment', '/tools/compound-interest', '/tools/medigap-or-advantage-quiz', '/guides/roth-ira-five-year-rule', '/answers/working-past-65', '/medicare-in/greensboro', '/medicare-in/high-point', '/medicare-in/burlington', '/medicare-liberty-nc', '/medicare-plan-checklist']);
const records = [], flows = [];
let browserHandle;
(async()=>{
 fs.mkdirSync(dir,{recursive:true});
 const pages = JSON.parse(fs.readFileSync('.cache/traction/release-crawl.json','utf8')).filter(page=>!process.env.TRACTION_FLOW_ONLY && (!process.env.TRACTION_QUICK || full.has(page.path)));
 const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 browserHandle=browser;
 const page = await browser.newPage({viewport:{width:390,height:844}, reducedMotion:'reduce'});
 async function guard(page){await page.route('**/*',route=>{
  const req=route.request();
  if(req.method()!=='GET' || new URL(req.url()).origin!==new URL(base).origin) return route.abort();
  return route.continue();
 });}
 await guard(page);
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  const queue=[...pages];
  async function worker(){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});await guard(page);
   while(queue.length){const entry=queue.shift();
   const name=(entry.path.replaceAll('/','_')||'home')+'-'+width;
   const response=await page.goto(base+entry.path,{waitUntil:'networkidle'});
   await page.screenshot({path:path.join(dir,name+'.png'),animations:'disabled'});
   const info=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),height:document.documentElement.scrollHeight,navHeight:document.querySelector('.w-nav')?.getBoundingClientRect().height,firstControlY:document.querySelector('main input,main select,main [role="progressbar"]')?.getBoundingClientRect().top}));
   let violations=[];
   if(width===390){
    await page.addScriptTag({path:path.resolve('node_modules/axe-core/axe.min.js')});
    violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,8)})));
   }
   records.push({path:entry.path,width,status:response.status(),...info,violations});
   if(records.length%30===0){fs.writeFileSync('.cache/traction/browser-progress.json',JSON.stringify({screens:records.length,last:entry.path,width}));console.log('Screens',records.length,'width',width);}
   if(full.has(entry.path)){
    await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight){scrollTo(0,y);await new Promise(r=>setTimeout(r,45));}scrollTo(0,0);});
    await page.screenshot({path:path.join(dir,name+'-full.png'),fullPage:true,animations:'disabled'});
   }
   }
   await page.close();
  }
  await Promise.all(Array.from({length:process.env.TRACTION_QUICK?2:4},()=>worker()));
  await page.goto(base+'/medicare-plan-checklist',{waitUntil:'networkidle'});
  const network=[]; const listener=req=>{ if(req.postData())network.push(req.postData()); };page.on('request',listener);
  await page.getByLabel('ZIP code',{exact:true}).fill('99999');await page.getByLabel('County',{exact:true}).selectOption('Another county');
  await page.screenshot({path:path.join(dir,'checklist-step-1-'+width+'.png')});
  await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByLabel('Doctors',{exact:true}).fill(Array.from({length:5},(_,i)=>'Synthetic Doctor '+i+', Practice '+i).join('\n'));
  await page.getByLabel('Hospitals',{exact:true}).fill('Synthetic Hospital');
  await page.screenshot({path:path.join(dir,'checklist-step-2-'+width+'.png')});await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByLabel('Prescriptions',{exact:true}).fill(Array.from({length:10},(_,i)=>'Synthetic Drug '+i+', 10 mg tablet, monthly refill').join('\n'));
  await page.getByLabel('Pharmacies',{exact:true}).fill('Synthetic Pharmacy');
  await page.screenshot({path:path.join(dir,'checklist-step-3-'+width+'.png')});await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByRole('textbox',{name:'Travel',exact:true}).fill('Synthetic travel');await page.getByRole('textbox',{name:'Monthly budget',exact:true}).fill('Synthetic cost range');
  await page.screenshot({path:path.join(dir,'checklist-step-4-'+width+'.png')});await page.getByRole('button',{name:'Make my sheet',exact:true}).click();
  await page.screenshot({path:path.join(dir,'checklist-summary-'+width+'.png'),fullPage:true});
  await page.addScriptTag({path:path.resolve('node_modules/axe-core/axe.min.js')});
  const a11y=await page.evaluate(async()=> (await axe.run()).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})));
  if(width===1440) await page.pdf({path:path.join(dir,'checklist-letter.pdf'),format:'Letter',preferCSSPageSize:true,printBackground:true});
  const storage=await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}));
  flows.push({flow:'checklist',width,networkWithBody:network,storage,a11y}); page.off('request',listener);
  await page.getByRole('button',{name:'Clear all entries',exact:true}).click();
  flows.push({flow:'clear',width,zip:await page.getByLabel('ZIP code',{exact:true}).inputValue()});
 }
 await page.setViewportSize({width:390,height:844});
 for(const route of ['/','/learn','/wealth','/guides']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  const menu=page.getByRole('button',{name:'Open menu',exact:true});await menu.focus();await page.keyboard.press('Enter');
  const focused=await page.evaluate(()=>document.activeElement?.textContent);
  await page.screenshot({path:path.join(dir,'menu'+route.replaceAll('/','_')+'-390.png')});
  await page.keyboard.press('Escape');flows.push({flow:'keyboard-menu',path:route,focused,expanded:await menu.getAttribute('aria-expanded'),focusReturned:await menu.evaluate(x=>x===document.activeElement)});
 }
 fs.writeFileSync('.cache/traction/browser-evidence.json',JSON.stringify({records,flows},null,2));
 await browser.close();console.log(JSON.stringify({screens:records.length,overflows:records.filter(x=>x.overflow).map(x=>({path:x.path,width:x.width})),a11yFailures:records.filter(x=>x.violations.length).map(x=>({path:x.path,violations:x.violations})),flows},null,2));
})().catch(async e=>{fs.writeFileSync('.cache/traction/browser-evidence-partial.json',JSON.stringify({records,flows},null,2));console.error(e);await browserHandle?.close();process.exitCode=1;});
