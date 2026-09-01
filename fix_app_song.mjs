import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const hookInsert = `
  const playBackgroundSong = async (songName: string) => {
    try {
      const res = await fetch(\`https://itunes.apple.com/search?term=\${encodeURIComponent(songName)}&entity=song&limit=1\`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const previewUrl = data.results[0].previewUrl;
        if ((window as any).bgAudio) {
           (window as any).bgAudio.pause();
        }
        (window as any).bgAudio = new Audio(previewUrl);
        (window as any).bgAudio.volume = 0.5;
        (window as any).bgAudio.play();
        showNotification(\`🎵 Playing: \${data.results[0].trackName}\`);
      } else {
        showNotification("Song not found!");
      }
    } catch(e) {
      console.error(e);
    }
  };

  const stopBackgroundSong = () => {
    if ((window as any).bgAudio) {
       (window as any).bgAudio.pause();
       (window as any).bgAudio = null;
    }
  };

  const processTextForMusic = (text: string): string => {
    let cleanText = text;
    const playMatch = text.match(/\\[PLAY_SONG:(.*?)\\]/i);
    if (playMatch) {
       playBackgroundSong(playMatch[1].trim());
       cleanText = cleanText.replace(playMatch[0], '');
    }
    const stopMatch = text.match(/\\[STOP_SONG\\]/i);
    if (stopMatch) {
       stopBackgroundSong();
       cleanText = cleanText.replace(stopMatch[0], '');
    }
    return cleanText;
  };
`;

code = code.replace("const playMessageAudio = async (msgId: string, text: string, isHaremMsg?: boolean) => {", hookInsert + "\n  const playMessageAudio = async (msgId: string, text: string, isHaremMsg?: boolean) => {");

// In handleSend, process data.reply
const botMsgDef1 = `      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,`;
const botMsgDef1New = `      data.reply = processTextForMusic(data.reply);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,`;

code = code.replace(botMsgDef1, botMsgDef1New);

// there's another one at 824 for handleVoice or generic
const botMsgDef2 = `      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,`;
const botMsgDef2New = `      let processedReply = processTextForMusic(replyText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: processedReply,`;

code = code.replace(botMsgDef2, botMsgDef2New);
// And in the second one it uses `replyText` later, so let's just make it replace cleanly
code = code.replace("sendNotification(activePersonaObj?.name || 'AI', replyText, profilePic);", "sendNotification(activePersonaObj?.name || 'AI', processedReply || replyText, profilePic);");
code = code.replace("playMessageAudio(botMsg.id, replyText).catch(console.error);", "playMessageAudio(botMsg.id, processedReply || replyText).catch(console.error);");

fs.writeFileSync('src/App.tsx', code);
