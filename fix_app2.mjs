import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove VirtualKeyboard completely
code = code.replace(/<VirtualKeyboard[\s\S]*?\/>/g, '');

fs.writeFileSync('src/App.tsx', code);
