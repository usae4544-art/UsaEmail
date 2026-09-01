import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Revert the wrong replacement
code = code.replace("import {\n  Bell, RomanticMatchGame }", "import {\n  RomanticMatchGame }");

// Add Bell to the lucide-react import correctly
code = code.replace("import { X, Settings, MapPin, Video } from 'lucide-react';", "import { X, Settings, MapPin, Video, Bell } from 'lucide-react';");

fs.writeFileSync('src/App.tsx', code);
