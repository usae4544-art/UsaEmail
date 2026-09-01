import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("id: 9,")) {
  code = code.replace(
    "id: 8,\n    name: '7 Girls Harem',",
    "id: 9,\n    name: 'AI Assistant',\n    tagline: 'Helpful & Smart AI 🤖',\n    photos: []\n  },\n  {\n    id: 8,\n    name: '7 Girls Harem',"
  );
}

fs.writeFileSync('src/App.tsx', code);
