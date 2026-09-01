import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const playAudioLine = `const playMessageAudio = async (msgId: string, text: string, isHaremMsg?: boolean) => {`;
const notifyHelper = `
  const sendNotification = (title: string, body: string, icon?: string) => {
    if (permissions.notifications && 'Notification' in window && Notification.permission === 'granted') {
      try {
        if (document.hidden) {
          new Notification(title, { body, icon });
        }
      } catch (e) {
        console.warn('Notification failed', e);
      }
    }
  };

  const playMessageAudio = async (msgId: string, text: string, isHaremMsg?: boolean) => {`;

if (!code.includes('sendNotification(')) {
  code = code.replace(playAudioLine, notifyHelper);
}

const haremBlock = `if (isHarem) {
        setHaremMessages(prev => [...prev, botMsg]);
      } else {
        setMessages(prev => [...prev, botMsg]);
      }`;

const haremBlockNew = `if (isHarem) {
        setHaremMessages(prev => [...prev, botMsg]);
        sendNotification('New Message', data.reply);
      } else {
        setMessages(prev => [...prev, botMsg]);
        sendNotification(activePersonaObj?.name || 'AI', data.reply, profilePic);
      }`;

code = code.replace(haremBlock, haremBlockNew);

const singleBlock = `setMessages(prev => [...prev, botMsg]);
      
      // Trigger haptic feedback if supported`;

const singleBlockNew = `setMessages(prev => [...prev, botMsg]);
      sendNotification(activePersonaObj?.name || 'AI', replyText, profilePic);
      
      // Trigger haptic feedback if supported`;

code = code.replace(singleBlock, singleBlockNew);

fs.writeFileSync('src/App.tsx', code);
