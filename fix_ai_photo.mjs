import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "id: 9,\n    name: 'AI Assistant',\n    tagline: 'Helpful & Smart AI 🤖',\n    photos: []",
  "id: 9,\n    name: 'AI Assistant',\n    tagline: 'Helpful & Smart AI 🤖',\n    photos: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=300']"
);

fs.writeFileSync('src/App.tsx', code);
