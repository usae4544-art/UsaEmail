import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  "const [activeTab, setActiveTab] = useState<'chat' | 'gallery' | 'gifts' | 'profile' | 'harem' | 'game'>('chat');",
  "const [activeTab, setActiveTab] = useState<'chat' | 'gallery' | 'gifts' | 'profile' | 'harem' | 'game'>('chat');\n  const [activeGameId, setActiveGameId] = useState<string | null>(null);"
);
fs.writeFileSync('src/App.tsx', code);
