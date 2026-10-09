import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const out = process.argv[2] || 'docs/best-in-class/browser';
const urls = process.argv.slice(3);
fs.mkdirSync(out,{recursive:true});
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'wealth-audit-'));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--remote-debugging-port=9324',`--user-data-dir=${profile}`,'--no-first-run','--disable-default-apps','about:blank'],{windowsHide:true,stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
let targets;
for(let i=0;i<40;i++){try{targets=await fetch('http://127.0.0.1:9324/json').then(r=>r.json());break;}catch{await pause(250);}}
if(!targets) throw new Error('Browser did not start');
const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();
ws.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(m.error):p?.resolve(m.result);}});
function cdp(method,params={}){return new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});}
const results=[];
try {
 await cdp("Page.enable"); await cdp("Accessibility.enable");
 await cdp("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
 for(const [index,url] of urls.entries()){
  await cdp("Emulation.setDeviceMetricsOverride",{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await cdp("Page.navigate",{url});await pause(2500);
  const details={url,views:[]};
  for(const [kind,selector] of [["discovery","section[aria-labelledby=money-library-heading]"],["contents",".article-contents"],["provenance",".editorial-note"],["calculator",".t-calc"]]) {
   const found=await cdp("Runtime.evaluate",{expression:"!!document.querySelector("+JSON.stringify(selector)+")",returnByValue:true});
   if(!found.result.value) continue;
   for(const mobile of [false,true]) {
    await cdp("Emulation.setDeviceMetricsOverride",{width:mobile?390:1440,height:mobile?844:1000,deviceScaleFactor:1,mobile});
    await cdp("Runtime.evaluate",{expression:"document.querySelector("+JSON.stringify(selector)+").scrollIntoView({block:'start'})"});await pause(150);
    const shot=await cdp("Page.captureScreenshot",{format:"png"});
    fs.writeFileSync(path.join(out,index+"-"+kind+(mobile?"-mobile":"-desktop")+".png"),Buffer.from(shot.data,"base64"));
    const state=await cdp("Runtime.evaluate",{expression:"JSON.stringify({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,color:getComputedStyle(document.querySelector("+JSON.stringify(selector)+")).color,background:getComputedStyle(document.querySelector("+JSON.stringify(selector)+")).backgroundColor})",returnByValue:true});
    details.views.push({kind,mobile,...JSON.parse(state.result.value)});
   }
  }
  const anchor=await cdp("Runtime.evaluate",{expression:"(()=>{const a=document.querySelector('.article-contents a');if(!a)return null;a.click();return a.hash;})()",returnByValue:true});
  if(anchor.result.value){
   await pause(250);
   const position=await cdp("Runtime.evaluate",{expression:"document.getElementById("+JSON.stringify(anchor.result.value.slice(1))+").getBoundingClientRect().top",returnByValue:true});
   const header=await cdp("Runtime.evaluate",{expression:"document.querySelector('.w-nav,header')?.getBoundingClientRect().bottom || 0",returnByValue:true});
   details.anchor={hash:anchor.result.value,top:position.result.value,headerBottom:header.result.value};
  }
  const hero=await cdp("Runtime.evaluate",{expression:"(()=>{const e=document.querySelector('.t-stat-hero');return e?{className:e.className,background:getComputedStyle(e).backgroundColor}:null})()",returnByValue:true});
  details.hero=hero.result.value;
  const input=await cdp("Runtime.evaluate",{expression:"(()=>{const input=document.querySelector('.t-calc input[type=number]');if(!input)return null;input.focus();return {before:input.value,label:input.labels[0]?.textContent};})()",returnByValue:true});
  if(input.result.value){
   await cdp("Input.dispatchKeyEvent",{type:"keyDown",key:"ArrowUp",code:"ArrowUp",windowsVirtualKeyCode:38});
   await cdp("Input.dispatchKeyEvent",{type:"keyUp",key:"ArrowUp",code:"ArrowUp",windowsVirtualKeyCode:38});
   const after=await cdp("Runtime.evaluate",{expression:"({value:document.activeElement.value,outline:getComputedStyle(document.activeElement).outline})",returnByValue:true});
   details.keyboard={...input.result.value,after:after.result.value};
  }
  const tree=await cdp("Accessibility.getFullAXTree");
  details.accessibleControls=tree.nodes.filter(node=>!node.ignored&&["spinbutton","slider","combobox","button","navigation"].includes(node.role?.value)).map(node=>({role:node.role.value,name:node.name?.value}));
  results.push(details);fs.writeFileSync(path.join(out,"results.json"),JSON.stringify(results,null,2));
  if(details.views.some(view=>view.overflow)) process.exitCode=1;
  if(details.keyboard && details.keyboard.before===details.keyboard.after.value) process.exitCode=1;
  if(details.anchor && details.anchor.top<details.anchor.headerBottom) process.exitCode=1;
  console.log(url);
 }
} finally {ws.close();chrome.kill();}
