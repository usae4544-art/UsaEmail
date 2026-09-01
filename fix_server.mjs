import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

if (!code.includes("personaId === 9")) {
  code = code.replace(
    "} else if (personaId === 8) {",
    "} else if (personaId === 9) {\n          personaInstruction = \"You are a highly intelligent, polite, and helpful AI assistant. You answer questions clearly, factually, and professionally. DO NOT act romantic or flirty. Speak normally. You must speak in clear Hindi written in English (Hinglish).\";\n      } else if (personaId === 8) {"
  );
}

fs.writeFileSync('server.ts', code);
