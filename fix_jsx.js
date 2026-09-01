const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The issue is an extra </div> closing the parent before <main>
// Let's count divs from the start of PERSONA SELECTOR to <main>
const text = `
      {/* PERSONA SELECTOR - Top Side */}
      <div className="bg-white/30 backdrop-blur-lg border-b border-white/20 shadow-sm z-10 flex-shrink-0">
        <div className="max-w-4xl w-full mx-auto px-4 py-3 flex items-center justify-between gap-2">
`;

// Looking at the code:
//           <button ... >
//             <Trash2 ... />
//             <span>Clear</span>
//           </button>
//         </div>
//         </div>
//       </div>
//       
//       <main ... >

// We need to remove one </div> so it doesn't close the parent.
code = code.replace(/<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<main/g, '</button>\n        </div>\n      </div>\n      <main');
fs.writeFileSync('src/App.tsx', code);
