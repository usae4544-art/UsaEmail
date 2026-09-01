import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/stroke-width="2"/g, 'strokeWidth="2"');
code = code.replace(/stroke-linecap="round"/g, 'strokeLinecap="round"');
code = code.replace(/stroke-linejoin="round"/g, 'strokeLinejoin="round"');

fs.writeFileSync('src/App.tsx', code);
