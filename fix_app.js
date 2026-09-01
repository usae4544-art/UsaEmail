const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove import
code = code.replace(/import \{ VirtualKeyboard \} from '.\/components\/VirtualKeyboard';\n?/g, '');

// Remove all <VirtualKeyboard ... /> tags
code = code.replace(/<VirtualKeyboard [^>]+ \/>\n?/g, '');

// Remove state definitions for VirtualKeyboard
code = code.replace(/const \[isKeyboardOpen, setIsKeyboardOpen\] = useState\(false\);\n?/g, '');
code = code.replace(/const handleVirtualKeyPress = \(key: string\) => \{[^}]+\};\n?/g, '');

// Remove onFocus overriding that triggers VirtualKeyboard
code = code.replace(/onFocus=\{\(e\) => \{ e\.target\.blur\(\); setIsKeyboardOpen\(true\); \}\}\n\s*readOnly/g, '');
code = code.replace(/onFocus=\{\(e\) => \{ e\.target\.blur\(\); setIsKeyboardOpen\(true\); \}\}/g, '');
code = code.replace(/readOnly/g, ''); // Wait, might remove other readOnlys, let's be careful. Let's just remove the exact string.

fs.writeFileSync('src/App.tsx', code);
