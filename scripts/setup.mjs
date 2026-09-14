import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const root = process.cwd();
const has = cmd => { try { execFileSync(cmd,['--version'],{stdio:'ignore',timeout:2500}); return true; } catch { return false; } };
const tools = [
  ['node','Node.js','required'],['npm','npm','required'],['git','Git','recommended'],['docker','Docker','optional'],
  ['python3','Python','optional'],['ollama','Ollama local models','optional'],['codex','Codex CLI','optional'],
  ['claude','Claude Code','optional'],['opencode','OpenCode','optional'],['hermes','Hermes Agent','optional'],
  ['openclaw','OpenClaw','optional'],['antigravity','Antigravity','optional']
];
console.log('\nAegis Personal Autonomous Work OS — first boot\n');
console.log(`Platform: ${os.platform()} ${os.arch()} | Node: ${process.version}`);
if(!has('node')||!has('npm')) { console.error('Node.js and npm are required. Install Node.js 22+ and run setup again.'); process.exit(1); }
mkdirSync(join(root,'.aegis'),{recursive:true});
const report={created_at:new Date().toISOString(),platform:os.platform(),arch:os.arch(),tools:Object.fromEntries(tools.map(([cmd,name,importance])=>[cmd,{name,importance,detected:has(cmd)}]))};
writeFileSync(join(root,'.aegis','system-report.json'),JSON.stringify(report,null,2));
console.log('\nSystem capability report:');
for(const [cmd,info] of Object.entries(report.tools)) console.log(`  ${info.detected?'✓':'·'} ${info.name} (${info.importance})`);
console.log('\nCore runtime is ready. No external tool or credential is installed automatically.');
console.log('Next steps:');
console.log('  1. npm run dev');
console.log('  2. Open http://localhost:5173');
console.log('  3. Use Discover what this system can do');
console.log('  4. Configure optional adapters only after reviewing their permissions');
console.log('\nReport saved to .aegis/system-report.json');
