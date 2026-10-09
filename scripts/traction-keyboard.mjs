// Local browser checks; synthetic input only, external traffic and non-GETs blocked.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const load = createRequire(import.meta.url);
const { chromium } = load(process.env.PLAYWRIGHT_MODULE || 'C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1007-641-0_26.1007.641.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const base = process.argv[2] || 'http://localhost:3101';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local production build required');
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
 const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.route('**/*', route => route.request().method() === 'GET' && new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
 await page.goto(base+'/medicare-plan-checklist',{waitUntil:'networkidle'});
 const steps=[];
 for (let step=0;step<4;step++) {
  let activated=false;
  for(let tab=0;tab<30;tab++) {
   await page.keyboard.press('Tab');
   const active=await page.evaluate(()=>({tag:document.activeElement?.tagName,text:document.activeElement?.textContent,id:document.activeElement?.id}));
   if(step===0 && active.id==='checklist-zip') await page.keyboard.type('99999');
   if(active.tag==='BUTTON' && active.text===(step===3?'Make my sheet':'Continue')) {await page.keyboard.press('Enter');activated=true;break;}
  }
  if(!activated) throw new Error('Keyboard could not continue step '+step);
  await page.waitForFunction(()=>document.activeElement?.tagName==='H2');
  steps.push(await page.evaluate(()=>document.activeElement.textContent));
 }
 if(!await page.getByRole('article',{name:'Printable research sheet'}).isVisible()) throw new Error('Missing keyboard summary');
 const navigation=[];
 await page.setViewportSize({width:1024,height:900});
 for(const route of ['/','/learn','/wealth','/guides']) {
  await page.goto(base+route,{waitUntil:'networkidle'});
  navigation.push({path:route,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,navHeight:document.querySelector('.w-nav')?.getBoundingClientRect().height}))});
  await page.screenshot({path:'.cache/traction/screens/nav'+route.replaceAll('/','_')+'-1024.png'});
 }
 const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await noJs.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
 await noJs.goto(base+'/',{waitUntil:'networkidle'});
 const progressive=await noJs.locator('h1').evaluate(el=>({opacity:getComputedStyle(el).opacity,text:el.textContent}));
 await noJs.screenshot({path:'.cache/traction/screens/home-no-js-390.png'});
 fs.writeFileSync('.cache/traction/keyboard-evidence.json',JSON.stringify({steps,navigation,progressive},null,2));
 console.log(JSON.stringify({steps,navigation,progressive}));
 if(navigation.some(x=>x.overflow)||progressive.opacity==='0') throw new Error('Navigation/progressive rendering failed');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
