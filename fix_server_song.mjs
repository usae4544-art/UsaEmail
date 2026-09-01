import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const oldInst = 'const systemInstruction = `[CRITICAL, ABSOLUTE, UNBREAKABLE LANGUAGE RULE]: YOU ARE STRICTLY FORBIDDEN FROM SPEAKING OR GENERATING ANY ENGLISH SENTENCES.';

const newInst = 'const systemInstruction = `[SPECIAL INSTRUCTION]: If the user asks you to play a song or music, you MUST include the exact tag [PLAY_SONG: song name] in your response. For example: "Aapke liye baja rahi hu! [PLAY_SONG: Tum Hi Ho]".\\n\\n[CRITICAL, ABSOLUTE, UNBREAKABLE LANGUAGE RULE]: YOU ARE STRICTLY FORBIDDEN FROM SPEAKING OR GENERATING ANY ENGLISH SENTENCES.';

if(!code.includes('[PLAY_SONG:')) {
  code = code.replace(oldInst, newInst);
}

fs.writeFileSync('server.ts', code);
