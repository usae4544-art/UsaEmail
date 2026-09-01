import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// replace the manual input trigger with handleSend
code = code.replace(
  /setInput\(\`\*I roll the love dice and get: \$\{result\}\* \.\.\. I am doing this to you right now\.\.\.\`\);\n\s*setTimeout\(\(\) => \{\n\s*const evt = new KeyboardEvent\('keydown', \{ key: 'Enter' \}\);\n\s*document\.querySelector\('input\[type="text"\]'\)\?\.dispatchEvent\(evt\);\n\s*\}, 500\);/g,
  `const msg = \`*I roll the love dice and get: \${result}* ... I am doing this to you right now...\`;\n                    setInput(msg);\n                    handleSend(msg);`
);

code = code.replace(
  /setInput\("Let's play Truth or Dare! I choose TRUTH\. Ask me a very naughty or romantic question\."\);/g,
  `const msg = "Let's play Truth or Dare! I choose TRUTH. Ask me a very naughty or romantic question.";\n                    setInput(msg);\n                    handleSend(msg);`
);

code = code.replace(
  /setInput\("Let's play Truth or Dare! I choose DARE\. Give me a romantic or naughty dare to do to you right now\."\);/g,
  `const msg = "Let's play Truth or Dare! I choose DARE. Give me a romantic or naughty dare to do to you right now.";\n                    setInput(msg);\n                    handleSend(msg);`
);

code = code.replace(
  /setInput\(scenario\.prompt\);/g,
  `setInput(scenario.prompt);\n                      handleSend(scenario.prompt);`
);

fs.writeFileSync('src/App.tsx', code);
