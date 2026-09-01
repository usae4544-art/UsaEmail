import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  'PERSONAS.filter(p => p.id !== 8).map(p => (',
  'PERSONAS.filter(p => p.id !== 8 && p.id !== 9).map(p => ('
);
fs.writeFileSync('src/App.tsx', code);
