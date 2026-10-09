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
  await cdp('Page.enable');
  for(const [index,url] of urls.entries()){
    await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await cdp('Page.navigate',{url});await pause(3500);
    const inspect=await cdp('Runtime.evaluate',{expression:`JSON.stringify({title:document.title,url:location.href,h1:document.querySelector('h1')?.innerText,fonts:[...document.querySelectorAll('h1,main p')].slice(0,5).map(e=>({text:e.innerText.slice(0,80),font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize,line:getComputedStyle(e).lineHeight})),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,links:document.querySelectorAll('a').length})`,returnByValue:true});
    const shot=await cdp('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(out,`${index}-desktop.png`),Buffer.from(shot.data,'base64'));
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await pause(250);
    const mobile=await cdp('Runtime.evaluate',{expression:'document.documentElement.scrollWidth>document.documentElement.clientWidth',returnByValue:true});
    const shot2=await cdp('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(out,`${index}-mobile.png`),Buffer.from(shot2.data,'base64'));
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
    const focus=await cdp('Runtime.evaluate',{expression:`JSON.stringify({tag:document.activeElement.tagName,text:document.activeElement.textContent?.slice(0,100),outline:getComputedStyle(document.activeElement).outline})`,returnByValue:true});
    results.push({url,...JSON.parse(inspect.result.value),mobileOverflow:mobile.result.value,firstTab:JSON.parse(focus.result.value)});
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
    console.log(url,results.at(-1).title);
  }
} finally {ws.close();chrome.kill();}
