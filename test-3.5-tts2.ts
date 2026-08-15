import { GoogleGenAI } from '@google/genai';
async function test() {
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  try {
    const interaction = await ai.interactions.create({
      model: 'gemini-3.5-flash',
      input: 'Please say "I love you" in a very romantic, loving, and soft voice. Keep it short.',
      response_modalities: ['audio'],
    });
    console.log(JSON.stringify(interaction.steps, null, 2));
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
