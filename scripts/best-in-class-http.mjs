import fs from "node:fs";
import { JSDOM } from "jsdom";
const base=process.argv[2] || "http://localhost:3108";
const output=process.argv[3] || "docs/best-in-class/final-http.json";
const xml=await fetch(base+"/sitemap.xml").then(r=>r.text());
const routes=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
const pages=[];
for(let start=0;start<routes.length;start+=8) {
 pages.push(...await Promise.all(routes.slice(start,start+8).map(async path=>{
  const response=await fetch(base+path);
  return {path,status:response.status,contentType:response.headers.get("content-type")};
 })));
}
const indexes=[];
for(const path of ["/llms.txt","/llms-full.txt"]) {
 const response=await fetch(base+path);const text=await response.text();
 indexes.push({path,status:response.status,missing:routes.filter(route=>!text.includes("https://christianbrinkleync.com"+route))});
}
const rpc=async(method,params={})=>{const r=await fetch(base+"/mcp",{method:"POST",headers:{"content-type":"application/json",accept:"application/json, text/event-stream"},body:JSON.stringify({jsonrpc:"2.0",id:1,method,params})});return {status:r.status,body:await r.json()};};
const initialized=await rpc("initialize",{protocolVersion:"2025-11-25",capabilities:{},clientInfo:{name:"audit",version:"1"}});
const resources=await rpc("resources/list");
const definition=await rpc("resources/read",{uri:"https://christianbrinkleync.com/wealth/roth-ira-explained#definition"});
const production=[];
for(const path of ["/robots.txt","/"]) {
 try {
  const response=await fetch("https://christianbrinkleync.com"+path);const text=await response.text();
  const dom=path==="/"?new JSDOM(text):null;
  production.push({path,status:response.status,url:response.url,robots:dom?dom.window.document.querySelector("meta[name=robots]")?.content:text});
  dom?.window.close();
 } catch(error) {production.push({path,error:String(error)});}
}
const result={pages,indexes,mcp:{initialized,resources,definition},production};
fs.writeFileSync(output,JSON.stringify(result,null,2)+"\n");
const failures=pages.filter(page=>page.status!==200);
console.log(JSON.stringify({pages:pages.length,failures,indexes,mcp:initialized.status,production},null,2));
if(failures.length || indexes.some(index=>index.missing.length) || initialized.status!==200) process.exitCode=1;
