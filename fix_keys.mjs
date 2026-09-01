import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const getApiKeyFunc = `function getCurrentApiKey() {
  return apiKeys[currentKeyIndex];
}`;

const newGetApiKeyFunc = `function getCurrentApiKey() {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  return apiKeys[currentKeyIndex];
}`;

code = code.replace(getApiKeyFunc, newGetApiKeyFunc);

fs.writeFileSync('server.ts', code);
