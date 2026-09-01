import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'setActivePersona(9); \n            setSelectedPhotoIndex(0); \n            setMessages([]);',
  'setActivePersona(9); \n            setActiveTab("chat");\n            setSelectedPhotoIndex(0); \n            setMessages([]);'
);

fs.writeFileSync('src/App.tsx', code);
