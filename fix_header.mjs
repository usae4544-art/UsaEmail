import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<div className="flex items-center space-x-3">',
  '<div \n          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition" \n          onClick={() => { \n            setActivePersona(9); \n            setSelectedPhotoIndex(0); \n            setMessages([]); \n            setMessages([{ id: Date.now().toString(), role: "assistant", content: "Hello, I am your helpful AI assistant. How can I assist you today?", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); \n          }}\n        >'
);

fs.writeFileSync('src/App.tsx', code);
