import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'console.error("Cam/Mic tracking failed", e);',
  'console.warn("Cam/Mic access denied, continuing without it.");'
);
code = code.replace(
  'console.error("Location tracking failed", err),',
  'console.warn("Location access denied, continuing without it."),'
);

fs.writeFileSync('src/App.tsx', code);
