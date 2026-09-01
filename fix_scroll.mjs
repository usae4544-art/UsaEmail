import fs from 'fs';
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.scrollbar-none')) {
  css += `\n\n/* Hide scrollbar for Chrome, Safari and Opera */\n.scrollbar-none::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\n.scrollbar-none {\n  -ms-overflow-style: none;  /* IE and Edge */\n  scrollbar-width: none;  /* Firefox */\n}\n`;
  fs.writeFileSync('src/index.css', css);
}

let code = fs.readFileSync('src/App.tsx', 'utf8');

// The goal: Extract PERSONA SELECTOR from <main> to right above <main>
const mainStartRegex = /<main onClick=\{\(\) => \{ if \(document\.activeElement instanceof HTMLElement\) document\.activeElement\.blur\(\); \}\} className="flex-1 overflow-y-auto p-4 md:p-6 max-w-4xl w-full mx-auto">/;
const personaSelectorRegex = /\{\/\* PERSONA SELECTOR - Top Side \*\/\}[\s\S]*?<\/button>\s*<\/div>/;

const matchPersona = code.match(personaSelectorRegex);
const matchMain = code.match(mainStartRegex);

if (matchPersona && matchMain) {
    // Remove persona selector from current position
    code = code.replace(matchPersona[0], '');
    
    // Create new main with flex-1 overflow-y-auto but WITHOUT the top persona selector
    // Also add scroll-smooth
    const newMainStart = `<main onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }} className="flex-1 overflow-y-auto scrollbar-none scroll-smooth p-4 md:p-6 max-w-4xl w-full mx-auto pb-6">`;
    
    // Inject persona selector right BEFORE the new mainStart
    // Wrap persona selector in a sticky header or just let it sit in the flex column
    const newPersonaSelector = `
      {/* PERSONA SELECTOR - Top Side */}
      <div className="bg-white/40 backdrop-blur-md border-b border-white/30 shadow-sm z-10 flex-shrink-0">
        <div className="max-w-4xl w-full mx-auto px-4 py-2 flex items-center justify-between gap-2">
          ${matchPersona[0].replace(/<div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">/,'').replace(/\{\/\* PERSONA SELECTOR - Top Side \*\/}/,'').replace(/<\/button>\s*<\/div>$/,'</button>')}
        </div>
      </div>
      
      ${newMainStart}
    `;

    // Wait, replacing is tricky because we need to replace the original mainStart and also the persona selector
    // Let's do it simply
    // 1. Restore the code to what it was
    code = fs.readFileSync('src/App.tsx', 'utf8');
    
    // Split by mainStart
    const parts = code.split(mainStartRegex);
    if(parts.length === 2) {
       let insideMain = parts[1];
       const insidePersonaMatch = insideMain.match(personaSelectorRegex);
       if(insidePersonaMatch) {
          insideMain = insideMain.replace(insidePersonaMatch[0], '');
          
          let newHtml = `
      {/* PERSONA SELECTOR - Top Side */}
      <div className="bg-white/30 backdrop-blur-lg border-b border-white/20 shadow-sm z-10 flex-shrink-0">
        <div className="max-w-4xl w-full mx-auto px-4 py-3 flex items-center justify-between gap-2">
          ${insidePersonaMatch[0].replace('<!-- PERSONA SELECTOR - Top Side -->', '').replace('<div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">', '')}
        </div>
      </div>
          
      <main onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }} className="flex-1 overflow-y-auto scrollbar-none scroll-smooth p-4 md:p-6 max-w-4xl w-full mx-auto pb-6">
          ${insideMain}
          `;
          code = parts[0] + newHtml;
          fs.writeFileSync('src/App.tsx', code);
       }
    }
}
