import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const baseCheck = `
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:' || window.location.protocol.includes('capacitor') 
  ? 'https://ais-pre-ruuecxbfumn6b7wtcj5urs-68482813493.asia-southeast1.run.app' 
  : '';
`;

if (!code.includes('const API_BASE')) {
  code = code.replace('const App = () => {', 'const App = () => {\n' + baseCheck);
}

code = code.replace(/fetch\('\/api\/chat'/g, "fetch(API_BASE + '/api/chat'");
code = code.replace(/fetch\('\/api\/tts'/g, "fetch(API_BASE + '/api/tts'");

fs.writeFileSync('src/App.tsx', code);
