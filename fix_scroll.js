const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.scrollbar-none')) {
  css += `\n\n/* Hide scrollbar for Chrome, Safari and Opera */\n.scrollbar-none::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\n.scrollbar-none {\n  -ms-overflow-style: none;  /* IE and Edge */\n  scrollbar-width: none;  /* Firefox */\n}\n`;
  fs.writeFileSync('src/index.css', css);
}
