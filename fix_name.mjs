import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<h1 className="font-bold text-lg text-slate-900">{activePersonaObj.name}</h1>',
  '<h1 className="font-bold text-lg text-slate-900">AI</h1>'
);

code = code.replace(
  'content: "Hello, I am your helpful AI assistant. How can I assist you today?"',
  'content: "Hello, how can I assist you today?"'
);

fs.writeFileSync('src/App.tsx', code);
