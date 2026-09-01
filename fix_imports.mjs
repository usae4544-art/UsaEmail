import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import {\n  X, RomanticMatchGame } from \"./components/RomanticMatchGame\";",
  "import { RomanticMatchGame } from \"./components/RomanticMatchGame\";"
);

// Add X to lucide-react import
const idx = code.indexOf("import {  Bot,  Users,");
if (idx !== -1) {
  code = code.substring(0, idx) + "import { X } from 'lucide-react';\n" + code.substring(idx);
}

fs.writeFileSync('src/App.tsx', code);
