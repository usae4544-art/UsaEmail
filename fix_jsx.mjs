import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<main/g, '</button>\n        </div>\n      </div>\n      <main');
fs.writeFileSync('src/App.tsx', code);
