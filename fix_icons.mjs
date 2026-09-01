import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import { X } from 'lucide-react';",
  "import { X, Settings, MapPin, Video } from 'lucide-react';"
);

fs.writeFileSync('src/App.tsx', code);
