import fs from 'node:fs/promises';
import path from 'node:path';
const file=path.join(process.cwd(),'.aegis','learning.json');
let state={lessons:[],updated_at:null};
async function save(){await fs.mkdir(path.dirname(file),{recursive:true});state.updated_at=new Date().toISOString();await fs.writeFile(file,JSON.stringify(state,null,2))}
export async function loadLearning(){try{state=JSON.parse(await fs.readFile(file,'utf8'))}catch{await save()}return state}
export function learningState(){return state}
export async function addLesson(input){const lesson={id:crypto.randomUUID(),title:input.title,trigger:input.trigger||'runtime',evidence:input.evidence||[],correction:input.correction||'',test:input.test||'',status:'candidate',created_at:new Date().toISOString()};state.lessons.unshift(lesson);await save();return lesson}
export async function evaluateLesson(id,passed){const lesson=state.lessons.find(x=>x.id===id);if(!lesson)throw new Error('lesson_not_found');lesson.status=passed?'promoted':'rejected';lesson.evaluated_at=new Date().toISOString();await save();return lesson}
