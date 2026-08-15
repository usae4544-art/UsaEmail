import { GoogleGenAI } from '@google/genai';
async function test() {
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  try {
    const start = Date.now();
    const interaction = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: 'Say hi',
    });
    console.log('Success! Took', Date.now() - start, 'ms');
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
