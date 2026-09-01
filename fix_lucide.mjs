import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');
if (!code.includes(" X,")) {
  code = code.replace("import {", "import {\n  X,");
}
fs.writeFileSync('src/App.tsx', code);
