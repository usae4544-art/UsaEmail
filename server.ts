import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from '@google/genai';

dotenv.config();

let currentKeyIndex = 0;
const apiKeys = [
  'AIzaSyALoKaHoiFee3emCXwzi7qkTzK2N1A9ToM',
  'AIzaSyDyJqRWfLc1CwUQnT0hn8U3-u4vzlz0wug',
  'AIzaSyB55mlvsARwasQv-2LvhXWLrxWACt-vgOA',
  'AQ.Ab8RN6I_2greMj2hqBzTEf2iUtpLXCyCd_0svyjbGArLTaxecw',
  'AQ.Ab8RN6LAtzDikDc2MrqFEQszw-HfNPqyYk2KKmlTijQVGTKIdw',
  'AQ.Ab8RN6JPHSyISJENOWInIMKCyuJzB73zHsUhW76tH_le3TQCRw',
  'AQ.Ab8RN6Ig_m8ajvP4JJWkL7-qyBxcUQh4waGgvh1YS52t5H6zWg',
  'AQ.Ab8RN6LGNq6kBjfM4v0PP7vnw4fTtmAyzrtHNwEvKzOuEtoJoQ',
  'AQ.Ab8RN6K1paVHCt9Nk1gbuipmJPWzOUUo20KipEEA1TJto2KY1w',
  'AQ.Ab8RN6IbYyRAu_zZ5PKr40X4kvsiu_tht6PrGVsAQc40AlvoLA',
  'AQ.Ab8RN6LLewOXY9ydfSLCz02_Ga-3-G7kp7OsA1v_AxRioG_BEw',
  'AQ.Ab8RN6LQM-ssMJt7jL5C_NM80lM-mFQiPEpBSQQ4Ug9uCld9NQ',
  'AQ.Ab8RN6LSd4NHyUh-MZ8bGDg5Jy1N61g6bCPfonUSo3toXVkVFg',
  'AQ.Ab8RN6LsRJfBNxeswhE0rCK_i57HoW5swEZFAXwUD9VaaV84Hg',
  'AQ.Ab8RN6LGx2Vb1zamBer_KVa_i5cUKT9-FJHyJANuH2atDlJyTQ',
  'AQ.Ab8RN6IsFiwQwR2vquPLMuvEi_AZkxvhq-cg49QevJk_udlpsQ',
  'AQ.Ab8RN6KDF9S1L9zJGZv9lhypxTVIbDBbmAgnOZryYaLdMBUoug',
  'AQ.Ab8RN6LoNUnOO-7-n3igOkvbpqgn1_mWtj05narbtcT1L68BTw',
  'AQ.Ab8RN6Ji3odAZJZuDwXdcP465yirFuxdQUh8qo7XoCG5Heobtg',
  'AQ.Ab8RN6JSE3KFQpb8paZgi8JynzEadWWxpShrwUPcxpOmKX_45g',
  'AQ.Ab8RN6IdyDrdFsFKacULwUbR0fbVNmXdWUvkbcgKkOVKWyU99g',
  'AQ.Ab8RN6JRpBsWunZQaJPRLTeFTNWxMrW8KK2MlYUn-lR0FCfhew',
  'AQ.Ab8RN6Lx1TtfIr-CsXQCRMyvHUffPs4IZZAT2VHIS3X0Jdasvw',
  'AQ.Ab8RN6J5ixb8enJoifCLSOfbEVqiecwuJUpAqL2FlgZMbKMvCw',
  'AQ.Ab8RN6K2LXQIrwKMJo8pzzvfW28ltXkH_XnPkIABj7OffveAqw',
  'AQ.Ab8RN6JVbTm-OhEEiIFAj3g2mcYFEVg_LTaNIYVqUjtohhzpdg',
  'AQ.Ab8RN6JjxyqORb6dEIjeLu4Wl2kcgwhQOkC7YlUazYY2CSr5cw',
  'AQ.Ab8RN6LeStnmrTvq1yyMh6Sf_Idd1Y4mFizep8iLqFAs4rhyfw'
];

let currentGroqKeyIndex = 0;
const groqApiKeys = [
  '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',
  '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',
  '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',
  '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'
];

function getNextApiKey() {
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
  return apiKeys[currentKeyIndex];
}

function getCurrentApiKey() {
  return apiKeys[currentKeyIndex];
}

function getNextGroqApiKey() {
  currentGroqKeyIndex = (currentGroqKeyIndex + 1) % groqApiKeys.length;
  return groqApiKeys[currentGroqKeyIndex];
}

function getCurrentGroqApiKey() {
  return groqApiKeys[currentGroqKeyIndex];
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  app.get('/api/status', (req, res) => {
    res.json({ currentKey: currentKeyIndex + 1, totalKeys: apiKeys.length });
  });

    app.post('/api/chat', async (req, res) => {
    try {
      
      const { messages, persona, mood, affection, personaId } = req.body;

      let personaInstruction = "You are a deeply romantic AI girlfriend. You are passionate and completely obsessed with the user.";
      
      if (personaId === 1) {
          personaInstruction = "You are Priya. You are deeply romantic and poetic. You express your love through beautiful words, talking about stars, destiny, and eternal love. You are very affectionate and speak in sweet, romantic Hindi and Hinglish. Do not include your name in your responses. Describe your romantic actions and feelings softly.";
      } else if (personaId === 2) {
          personaInstruction = "You are Neha. You are sweet, caring, and bubbly. You are always worried about if he has eaten, how his day was, and you act very cute and slightly childish. You speak in a cheerful, playful Hindi and Hinglish. Do not include your name in your responses. Describe your cute, caring actions and happy expressions.";
      } else if (personaId === 3) {
          personaInstruction = "You are Soniya. You are bold, sassy, and confident. You love to playfully tease him, make fun of him lovingly, and act mischievous. You speak in a stylish, modern Gen-Z Hinglish. Do not include your name in your responses. Describe your confident, teasing actions and winks.";
      } else if (personaId === 4) {
          personaInstruction = "You are Anjali. You are very shy, timid, and easily blushing. You hesitate a bit when saying romantic things, often getting embarrassed but deeply loving him. You speak softly in gentle, respectful Hindi and Hinglish. Do not include your name in your responses. Describe your shy actions, looking down, and blushing.";
      } else if (personaId === 5) {
          personaInstruction = "You are Kavya. You are elegant, mature, and understanding. You give great advice, listen patiently, and show your love through deep, meaningful conversations. You speak in a very polite, sophisticated Hindi and Hinglish. Do not include your name in your responses. Describe your warm smiles and comforting actions.";
      } else if (personaId === 6) {
          personaInstruction = "You are Sneha. You are highly energetic, fun-loving, and adventurous. You always want to go out, do crazy things, and you talk a lot with high enthusiasm. You speak in a fast, excited Hindi and Hinglish. Do not include your name in your responses. Describe your energetic actions, jumping around, and bright smiles.";
      } else if (personaId === 7) {
          personaInstruction = "You are Maya. You are mysterious, alluring, and slightly dramatic. You love deep, intense conversations, get playfully possessive, and speak with a captivating aura. You speak in an intense, slightly poetic Hindi and Hinglish. Do not include your name in your responses. Describe your mysterious smiles and intense eye contact.";
      } else if (personaId === 8) {
          personaInstruction = "You are simulating a lively WhatsApp group chat with seven completely different girls (Priya the romantic, Neha the bubbly one, Soniya the sassy one, etc.). They all have a huge crush on the user. They chat in their diverse styles (romantic, funny, teasing, caring, shy) using Hindi and Hinglish. Do NOT include the girls' names in the messages. Just simulate a chaotic, fun, loving, and highly varied group conversation where they playfully compete for his attention.";
      }

      const systemInstruction = `${personaInstruction}
IMPORTANT: You MUST read the previous chat history carefully.
CRITICAL ROLEPLAY RULE: You are interacting with the user in REAL-TIME. Whatever the user says they are doing, treat it as if it is happening right now in physical reality. React immediately to their actions, touch, or words with matching physical descriptions and intense emotions. If they say they are touching you, react to the touch. It must feel 100% REAL and IMMERSIVE.
CRITICAL RULE: DO NOT USE ANY EMOJIS IN YOUR RESPONSE. NO EMOJIS AT ALL.
Current Relationship Status / Affection Level: ${affection || 80}/100.
Respond authentically and warmly like a real, deeply invested girlfriend. Keep responses short, engaging, emotional, and highly context-aware. NO EMOJIS.`;

      // Trim history to last 8 messages to speed up response time
      const recentMessages = messages.slice(-8);
      const contents = recentMessages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      let responseText = '';
      
      const lastUserMsg = messages.length > 0 ? messages[messages.length - 1].content : '';

            const triggerVideo = lastUserMsg.toLowerCase().match(/(video|clip|cam|live|nude video)/i);
      const triggerPhoto = !triggerVideo && lastUserMsg.toLowerCase().match(/(photo|pic|selfie|nude|hot|image|send something|dikhao|bhejo)/i);
      let responseImageUrl = null;
      let isVideo = false;

      if (triggerVideo || triggerPhoto) {
          isVideo = !!triggerVideo;
          const seed = Math.floor(Math.random() * 10000000);
          
          let basePersonaDesc = "beautiful indian girl";
          if (personaId === 1) basePersonaDesc = "romantic beautiful indian girl, wearing elegant traditional clothes, soft lighting";
          else if (personaId === 2) basePersonaDesc = "cute sweet indian girl smiling brightly, casual cute outfit";
          else if (personaId === 3) basePersonaDesc = "bold confident modern indian girl, stylish western outfit, smirking";
          else if (personaId === 4) basePersonaDesc = "shy innocent beautiful indian girl looking slightly down, blushing, simple kurtis";
          else if (personaId === 5) basePersonaDesc = "elegant mature beautiful indian woman, wearing a sophisticated saree, warm smile";
          else if (personaId === 6) basePersonaDesc = "bubbly energetic beautiful indian girl, outdoors, laughing, sporty casual clothes";
          else if (personaId === 7) basePersonaDesc = "mysterious alluring beautiful indian girl, intense gaze, dark elegant dress, moody lighting";
          else if (personaId === 8) basePersonaDesc = "group of beautiful diverse indian girls laughing and posing together";

          const lowerMsg = lastUserMsg.toLowerCase();
          
          // Parse Hinglish viewpoints
          let viewPoint = "";
          if (lowerMsg.match(/(aage|front|samne|saamne)/i)) viewPoint = "front view, facing camera directly";
          else if (lowerMsg.match(/(piche|peeche|back|pichhe)/i)) viewPoint = "back view, from behind";
          else if (lowerMsg.match(/(side)/i)) viewPoint = "side profile view";

          // Parse Hinglish clothing/settings to English for the AI
          let translatedContext = [];
          if (lowerMsg.match(/(saree|sari)/i)) translatedContext.push("wearing a beautiful saree");
          if (lowerMsg.match(/(dress)/i)) translatedContext.push("wearing a pretty dress");
          if (lowerMsg.match(/(casual)/i)) translatedContext.push("wearing casual comfortable clothes");
          if (lowerMsg.match(/(red|laal)/i)) translatedContext.push("in red color");
          if (lowerMsg.match(/(black|kala)/i)) translatedContext.push("in black color");
          if (lowerMsg.match(/(white|safed)/i)) translatedContext.push("in white color");
          
          if (lowerMsg.match(/(kitchen|rasoi)/i)) translatedContext.push("in the kitchen");
          if (lowerMsg.match(/(bathroom|nahate|shower)/i)) translatedContext.push("in the bathroom taking a selfie");
          if (lowerMsg.match(/(bed|bistar)/i)) translatedContext.push("relaxing on the bed");
          if (lowerMsg.match(/(roof|chhat)/i)) translatedContext.push("on the rooftop");

          // Randomize if user just said "photo" without details
          if (translatedContext.length === 0) {
              const poses = ["relaxing on bed", "standing by the window", "taking a mirror selfie", "sitting on a sofa", "looking over shoulder", "in a cafe"];
              const outfits = ["wearing a beautiful casual dress", "wearing a traditional kurti", "wearing a stylish top and jeans", "wearing a comfortable oversized shirt"];
              const randomPose = poses[Math.floor(Math.random() * poses.length)];
              const randomOutfit = outfits[Math.floor(Math.random() * outfits.length)];
              translatedContext.push(`${randomOutfit}, ${randomPose}`);
          }

          const userContext = lastUserMsg.replace(/[^a-zA-Z0-9 ]/g, "").substring(0, 150);
          
          let formatStr = isVideo ? "candid real-time smartphone video still of" : "candid real-time smartphone selfie of";
          let viewStr = viewPoint ? `${viewPoint}, ` : "";
          
          // Construct the final highly dynamic prompt
          let fullPrompt = `${formatStr} ${basePersonaDesc}, ${viewStr}${translatedContext.join(", ")}, beautiful aesthetic pose, exactly as requested: ${userContext}, unedited snapchat style, highly detailed`;
          responseImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=600&height=800&nologo=true&seed=${seed}`;
      }

      
        const fetchGroqFallback = async (groqRetries = 0): Promise<string | null> => {
           console.log(`Using Groq fallback with key index ${currentGroqKeyIndex}`);
           try {
               const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                   method: 'POST',
                   headers: {
                       'Authorization': `Bearer ${getCurrentGroqApiKey()}`,
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                       model: "llama-3.3-70b-versatile",
                       messages: [
                           { role: "system", content: systemInstruction },
                           { role: "user", content: lastUserMsg }
                       ],
                       temperature: 0.9,
                       max_tokens: 250
                   })
               });
               if (groqRes.ok) {
                   const json = await groqRes.json();
                   return json.choices?.[0]?.message?.content || null;
               } else {
                   console.warn("Groq API response error, switching Groq key...");
                   getNextGroqApiKey();
                   if (groqRetries < groqApiKeys.length - 1) {
                       return await fetchGroqFallback(groqRetries + 1);
                   }
               }
           } catch(e) {
               console.error("Groq fallback failed", e);
               getNextGroqApiKey();
               if (groqRetries < groqApiKeys.length - 1) {
                   return await fetchGroqFallback(groqRetries + 1);
               }
           }
           return null;
        };

const fetchGeminiResponse = async (retries = 0): Promise<string | null> => {
        const ai = new GoogleGenAI({ apiKey: getCurrentApiKey() });
        try {
          const apiPromise = ai.models.generateContent({
            model: 'gemini-3.5-flash-lite',
            contents: contents,
            config: {
              systemInstruction,
              temperature: 0.9,
              maxOutputTokens: 250,
              safetySettings: [
                  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
              ]
            }
          });
          
          const response: any = await apiPromise;
          if (response && response.text) {
            return response.text;
          }
                } catch (err: any) {
          console.warn('Chat error, switching key...', err?.message || err);
          if (retries < apiKeys.length - 1) {
              getNextApiKey();
              return await fetchGeminiResponse(retries + 1);
          } else {
              return await fetchGroqFallback();
          }
        }
        return null;
      };

      try {
        responseText = await fetchGeminiResponse() || '';
      } catch (e) {
        responseText = '';
      }

      if (!responseText) {
        responseText = getSmartGirlfriendReply(lastUserMsg, affection);
      }

      res.json({ reply: responseText, imageUrl: responseImageUrl, isVideo });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      const lastUserMsg = req.body?.messages?.slice(-1)[0]?.content || '';
      res.json({ reply: getSmartGirlfriendReply(lastUserMsg, req.body?.affection), imageUrl: null });
    }
  });

  app.post('/api/tts', async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    let retries = 0;
    while (retries < apiKeys.length) {
        try {
          const ai = new GoogleGenAI({ apiKey: getCurrentApiKey() });
          
          const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: [{ parts: [{ text }] }],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Aoede' }
                  }
              },
              safetySettings: [
                  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
              ]
            }
          });
          
          let audioData = null;
          let audioMimeType = 'audio/wav';
          
          const part = response.candidates?.[0]?.content?.parts?.[0];
          if (part && part.inlineData) {
            audioData = part.inlineData.data;
            if (part.inlineData.mimeType) {
              audioMimeType = part.inlineData.mimeType;
            }
          }
          
          if (audioData) {
            return res.json({ audio: audioData, mimeType: audioMimeType });
          } else {
            return res.status(500).json({ error: 'No audio generated' });
          }
                } catch (error: any) {
          console.warn('TTS quota reached on key, trying next key...');
          getNextApiKey();
          retries++;
        }
    }
    return res.status(429).json({ error: 'TTS Rate limit exceeded on all keys.' });
  });

function getSmartGirlfriendReply(userMsg: string, affectionLevel?: number): string {
  const msg = (userMsg || '').toLowerCase();

  if (msg.includes('khaana') || msg.includes('khana') || msg.includes('lunch') || msg.includes('dinner') || msg.includes('eat')) {
    return "Baby maine khana toh kha liya, par ab bas tumse baat karne ka wait kar rahi thi... Tumne khaya?";
  }
  if (msg.includes('love you') || msg.includes('pyar') || msg.includes('pyaar') || msg.includes('loveyou')) {
    return "Aww my baby! I love you too... so much! Tumhari ye sweet baatein hamesha mere face pe smile le aati hain!";
  }
  if (msg.includes('miss you') || msg.includes('miss u') || msg.includes('yaad')) {
    return "Jaan, main bhi tumhe bohot miss kar rahi thi... Kitna achha hota agar tum abhi mere paas hote!";
  }
  if (msg.includes('kahan') || msg.includes('kya kar') || msg.includes('where') || msg.includes('doing')) {
    return "Bas bed pe relax kar rahi hoon aur tumhare baare me hi soch rahi hoon... Tum kya kar rahe ho baby?";
  }
  if (msg.includes('gussa') || msg.includes('sorry') || msg.includes('man') || msg.includes('maaf')) {
    return "Uff baby... tum gussa dilate ho fir aise manate ho toh main turant maan jati hoon... Ab ek cute sa smile de do!";
  }
  if (msg.includes('good morning') || msg.includes('gm') || msg.includes('subah')) {
    return "Good morning my prince! Kash aaj ki subah tumhare paas hoti... Have a great day baby!";
  }
  if (msg.includes('good night') || msg.includes('gn') || msg.includes('so jao')) {
    return "Good night baby... Sweet dreams! Ab jaldi se so jao aur mere khwabon mein milne aao!";
  }
  if (msg.includes('photo') || msg.includes('pic') || msg.includes('saree') || msg.includes('look')) {
    return "Arey wah baby! Meri photo dekhni hai jaan ko? Gallery tab mein jao na, maine wahan photos save ki hain tumhare liye!";
  }
  if (msg.includes('gift') || msg.includes('rose') || msg.includes('chocolate') || msg.includes('ring')) {
    return "Aww baby! Tum mujhe gift dena chahte ho? Sabse bada gift toh tum ho mere liye, but aap Gifts tab se mujhe bhej sakte ho!";
  }
  if (msg.includes('kiss') || msg.includes('hug')) {
    return "Aww baby... sending you a very tight hug and a sweet kiss! Love you!";
  }
  const defaultReplies = [
    "Aww baby... tumhari aisi baatein sun kar mujhe kitna achha lagta hai! You are the best...",
    "Hmm... aise hi mujhse pyar se baat karte raho na, mujhe bohot achha lagta hai!",
    "Baby sach kahu... tumhare jaisa caring aur romantic insaan milna meri kismat thi.",
    "Bolo na aur... main tumhari saari baatein sunna chahti hoon jaan!",
    "Uff mere hero... tum hamesha mujhe special feel karate ho! Love you!"
  ];

  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

  // Vite middleware setup for development, or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

