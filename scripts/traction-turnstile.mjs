// Run against a local preview built with Cloudflare's PUBLIC always-pass test sitekey.
// All submission requests terminate in this browser's synthetic receiver, never the server.
import {createRequire} from 'node:module';
import fs from 'node:fs';
const load=createRequire(import.meta.url);
const {chromium}=load(process.env.PLAYWRIGHT_MODULE || 'C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1007-641-0_26.1007.641.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const base=process.argv[2] || 'http://localhost:3102';
if(!['localhost','127.0.0.1'].includes(new URL(base).hostname))throw new Error('Local preview required');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
 const page=await browser.newPage({viewport:{width:390,height:844}});const received=[],challenge=[];
 await page.route('**/*', async route=>{
  const req=route.request(),url=new URL(req.url());
  if(url.origin===new URL(base).origin && url.pathname==='/api/wealth-drops' && req.method()==='POST') {
   const payload=req.postDataJSON();
   if(payload.email!=='synthetic@example.invalid'||!String(payload.turnstileToken).includes('DUMMY'))throw new Error('Receiver requires synthetic email and a dummy token');
   received.push({list:payload.list,hasDummyToken:true});return route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});
  }
  if(url.hostname==='challenges.cloudflare.com'){challenge.push(url.pathname);return route.continue();}
  if(req.method()==='GET' && url.origin===new URL(base).origin)return route.continue();
  return route.abort();
 });
 await page.addInitScript(()=>{window.__syntheticEvents=[];window.gtag=(...args)=>window.__syntheticEvents.push(args);});
 await page.goto(base+'/guides/roth-ira-five-year-rule',{waitUntil:'networkidle',timeout:90000});
 const initialChallenges=challenge.length;
 if(initialChallenges!==0)throw new Error('Turnstile loaded before focus/visibility');
 await page.getByLabel('Your email',{exact:true}).fill('synthetic@example.invalid');
 await page.waitForFunction(()=>document.querySelector('[name="cf-turnstile-response"]')?.value.includes('DUMMY'),{},{timeout:60000});
 await page.getByRole('button',{name:'Notify me',exact:true}).click();
 await page.getByRole('heading',{name:"You're on the list."}).waitFor();
 const events=await page.evaluate(()=>window.__syntheticEvents.filter(args=>args[0]==='event'&&args[1]==='guide_signup'));
 if(received.length!==1||events.length!==1)throw new Error('Signup receiver/event count mismatch');
 const result={initialChallenges,afterFocusChallenges:challenge.length,received,events};fs.writeFileSync('.cache/traction/turnstile-evidence.json',JSON.stringify(result,null,2));
 await page.screenshot({path:'.cache/traction/screens/guide-signup-test-key-390.png'});console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
