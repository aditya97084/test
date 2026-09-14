import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const root = process.cwd();
const allowed = p => { const absolute = path.resolve(root, p || '.'); if (!absolute.startsWith(root)) throw new Error('path_outside_workspace'); return absolute; };
export async function inspectRepository(relativePath='.') {
  const cwd = allowed(relativePath);
  const [entries, manifest, git] = await Promise.all([
    fs.readdir(cwd,{withFileTypes:true}).then(xs=>xs.filter(x=>!x.name.startsWith('.')&&x.name!=='node_modules').slice(0,100).map(x=>({name:x.name,type:x.isDirectory()?'directory':'file'}))),
    fs.readFile(path.join(cwd,'package.json'),'utf8').then(x=>JSON.parse(x)).catch(()=>null),
    exec('git',['status','--short','--branch'],{cwd,timeout:3000}).then(x=>x.stdout.trim()).catch(()=>null)
  ]);
  return {path:path.relative(root,cwd)||'.',root,entries,manifest:manifest?{name:manifest.name,version:manifest.version,scripts:manifest.scripts||{},dependencies:Object.keys(manifest.dependencies||{}),devDependencies:Object.keys(manifest.devDependencies||{})}:null,git:git?{status:git,branch:(git.split('\n')[0]||'').replace('## ','')}:null,inspected_at:new Date().toISOString()};
}
