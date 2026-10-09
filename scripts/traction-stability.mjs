// Three full suites, each alongside a production build in a separate output directory.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
fs.mkdirSync('.cache/traction',{recursive:true});
const env={...process.env,WEALTH_PREVIEW:'1',NEXT_PUBLIC_SITE_URL:'https://christianbrinkleync.com',COMMAND_CENTER_INGEST_URL:'http://127.0.0.1:9/synthetic-never-submit',COMMAND_CENTER_INGEST_KEY:'0'.repeat(64)};
function run(args,file){return new Promise((resolve,reject)=>{const log=fs.createWriteStream(file);const child=spawn(process.execPath,args,{env,windowsHide:true,stdio:['ignore','pipe','pipe']});child.stdout.pipe(log,{end:false});child.stderr.pipe(log,{end:false});child.on('error',reject);child.on('close',code=>{log.end();resolve(code);});});}
(async()=>{
 const results=[];
 for(let i=1;i<=3;i++){
  const [tests,build]=await Promise.all([run(['node_modules/vitest/vitest.mjs','run'],`.cache/traction/stable-test-${i}.log`),run(['node_modules/next/dist/bin/next','build','--webpack'],`.cache/traction/stable-build-${i}.log`)]);
  results.push({run:i,tests,build});
  fs.writeFileSync('.cache/traction/stable-results.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.at(-1)));
  if(tests!==0||build!==0){process.exitCode=1;return;}
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
