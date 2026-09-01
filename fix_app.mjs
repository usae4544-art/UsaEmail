import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/import \{ VirtualKeyboard \} from '.\/components\/VirtualKeyboard';\n?/g, '');
code = code.replace(/<VirtualKeyboard [^>]+ \/>\n?/g, '');
code = code.replace(/const \[isKeyboardOpen, setIsKeyboardOpen\] = useState\(false\);\n?/g, '');
code = code.replace(/const handleVirtualKeyPress = \([^}]+\} else \{[^}]+\}\n  \};\n?/g, '');
code = code.replace(/onFocus=\{\(e\) => \{ e\.target\.blur\(\); setIsKeyboardOpen\(true\); \}\}\n\s*readOnly/g, '');

// Also let's fix the layout structure
// Find <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
// and replace with <div className="fixed inset-0 flex flex-col bg-slate-50 font-sans">
code = code.replace(/className="min-h-screen bg-slate-50 flex flex-col font-sans"/g, 'className="fixed inset-0 flex flex-col bg-slate-50 font-sans"');

// And add onClick dismiss to chat area
// <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-fixed relative">
code = code.replace(/className="flex-1 overflow-y-auto/g, 'onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }} className="flex-1 overflow-y-auto');

fs.writeFileSync('src/App.tsx', code);
