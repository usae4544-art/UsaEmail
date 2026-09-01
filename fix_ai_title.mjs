import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  '<h1 className="font-bold text-lg text-slate-900">AI</h1>',
  '<h1 className="font-bold text-lg text-slate-900">{activePersonaObj.name}</h1>'
);
fs.writeFileSync('src/App.tsx', code);
