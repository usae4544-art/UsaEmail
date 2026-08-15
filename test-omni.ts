import { GoogleGenAI } from '@google/genai';
async function test() {
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  try {
    const interaction = await ai.interactions.create({
      model: 'gemini-omni-flash-preview',
      input: 'Please say "I love you" in a very romantic, loving, and soft voice. Keep it short.',
      response_modalities: ['audio'],
    });
    for (const step of interaction.steps) {
      if (step.type === 'model_output') {
        const audioContent = step.content?.find(c => c.type === 'audio');
        if (audioContent && audioContent.data) {
          console.log('Success! MimeType:', audioContent.mime_type);
          break;
        }
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
