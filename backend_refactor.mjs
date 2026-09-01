import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const getKeysLogic = `
      let keysToUse = [];
      const customKeysHeader = req.headers['x-custom-api-keys'];
      if (customKeysHeader) {
          keysToUse = customKeysHeader.split(',').map(k => k.trim()).filter(Boolean);
      }
      if (keysToUse.length === 0) {
          keysToUse = [];
          if (process.env.GEMINI_API_KEY) keysToUse.push(process.env.GEMINI_API_KEY);
          keysToUse = keysToUse.concat(apiKeys);
      }
`;

// Replace in chat route
code = code.replace("app.post('/api/chat', async (req, res) => {\n    try {", "app.post('/api/chat', async (req, res) => {\n    try {" + getKeysLogic);

// Replace fetchGeminiResponse in chat route
const oldChatFetch = `const fetchGeminiResponse = async (retries = 0): Promise<string | null> => {
        const ai = new GoogleGenAI({ apiKey: getCurrentApiKey() });`;
const newChatFetch = `const fetchGeminiResponse = async (retries = 0): Promise<string | null> => {
        const currentKey = keysToUse[retries % keysToUse.length];
        const ai = new GoogleGenAI({ apiKey: currentKey });`;
code = code.replace(oldChatFetch, newChatFetch);

const oldChatCatch = `          if (retries < apiKeys.length - 1) {
              getNextApiKey();
              return await fetchGeminiResponse(retries + 1);
          } else {
              return await fetchGroqFallback();
          }`;
const newChatCatch = `          if (retries < keysToUse.length - 1) {
              return await fetchGeminiResponse(retries + 1);
          } else {
              return await fetchGroqFallback();
          }`;
code = code.replace(oldChatCatch, newChatCatch);

// Replace in TTS route
code = code.replace("app.post('/api/tts', async (req, res) => {\n    try {", "app.post('/api/tts', async (req, res) => {\n    try {" + getKeysLogic);

const oldTTSFetch = `const fetchTTS = async (retries = 0): Promise<any> => {
        const ai = new GoogleGenAI({ apiKey: getCurrentApiKey() });`;
const newTTSFetch = `const fetchTTS = async (retries = 0): Promise<any> => {
        const currentKey = keysToUse[retries % keysToUse.length];
        const ai = new GoogleGenAI({ apiKey: currentKey });`;
code = code.replace(oldTTSFetch, newTTSFetch);

const oldTTSCatch = `          if (retries < apiKeys.length - 1) {
              getNextApiKey();
              return await fetchTTS(retries + 1);
          }`;
const newTTSCatch = `          if (retries < keysToUse.length - 1) {
              return await fetchTTS(retries + 1);
          }`;
code = code.replace(oldTTSCatch, newTTSCatch);

// also for image generation in chat route (using ai.models.generateContent for prompt generation)
const oldImgGen = `const ai = new GoogleGenAI({ apiKey: getCurrentApiKey() });`;
const newImgGen = `const ai = new GoogleGenAI({ apiKey: keysToUse[0] });`;
// replace only the first occurrence after image prompt (to avoid messing up anything else)
// Wait, I will just replace `getCurrentApiKey()` with `keysToUse[0]` inside generateImagePrompt
code = code.replace(`const ai = new GoogleGenAI({ apiKey: getCurrentApiKey() });`, `const ai = new GoogleGenAI({ apiKey: keysToUse[0] });`);

fs.writeFileSync('server.ts', code);
