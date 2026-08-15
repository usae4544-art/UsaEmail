import { GoogleGenAI } from '@google/genai';
async function test() {
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: 'Please say "I love you" in a very romantic and soft voice.',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Aoede'
            }
          }
        }
      }
    });
    const audioPart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.mimeType?.startsWith('audio/'));
    if (audioPart) {
      console.log('Success! MimeType:', audioPart.inlineData.mimeType);
    } else {
      console.log('No audio found in response');
      console.log(JSON.stringify(response.candidates, null, 2));
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
