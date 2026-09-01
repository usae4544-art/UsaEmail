/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { RomanticMatchGame } from "./components/RomanticMatchGame";
import { InteractiveGames } from "./components/InteractiveGames";
import { X, Settings, MapPin, Video } from 'lucide-react';
import {  Bot,  Users, 
  Phone, PhoneOff, Mic, MicOff, Send, Sparkles, Gift, 
  Image as ImageIcon, Smile, Volume2, ShieldCheck, Flame, 
  MessageCircle, Star, Award, Clock, ArrowLeft, RefreshCw, VolumeX,
  Volume1, CheckCheck, Lock, Activity, Trash2, Moon, Sun, Languages
, Gamepad2, Heart, Sparkles as SparklesIcon } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  audioUrl?: string;
  imageUrl?: string;
  isVideo?: boolean;
  prefetchedAudioData?: string;
  prefetchedAudioMime?: string;
  isPrefetchingAudio?: boolean;
  translatedContent?: string;
  isTranslating?: boolean;
  showTranslation?: boolean;
}

interface GiftItem {
  id: string;
  name: string;
  emoji: string;
  affectionBoost: number;
  reaction: string;
}

const GIFTS: GiftItem[] = [
  { id: 'rose', name: 'Red Rose', emoji: '', affectionBoost: 10, reaction: 'Aww! Red rose is my absolute favorite! Tum kitne sweet ho yaar!' },
  { id: 'choco', name: 'Dark Chocolate', emoji: '', affectionBoost: 15, reaction: 'Mmm! Chocolate khila kar mujhe khush karne ki ninja technique? Main pighal gayi!' },
  { id: 'teddy', name: 'Cute Teddy', emoji: '', affectionBoost: 20, reaction: 'So fluffy! Ab jab tum nahi rahoge toh main isko hug karungi! Thank you jaan!' },
  { id: 'coffee', name: 'Hot Coffee', emoji: '', affectionBoost: 12, reaction: 'Coffee date? Chalo man gaye, tumhare haath ki coffee ka taste hi alag hai!' },
  { id: 'ring', name: 'Promise Ring', emoji: '', affectionBoost: 35, reaction: 'Oye hoye! Promise ring? Yeh kuch zyada romantic nahi ho gaya? Par... I love it! Forever yours!' },
];


const LiveVideoSimulator = ({ baseUrl, className }: { baseUrl: string, className: string }) => {
  const [currentUrl, setCurrentUrl] = useState(baseUrl);
  
  useEffect(() => {
    // Refresh the image every 2000ms to simulate a live video stream
    const interval = setInterval(() => {
      const baseWithoutSeed = baseUrl.replace(/&seed=\d+/, '');
      setCurrentUrl(baseWithoutSeed + '&seed=' + Math.floor(Math.random() * 1000000));
    }, 2000);
    return () => clearInterval(interval);
  }, [baseUrl]);

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse z-10 shadow-sm border border-rose-400">
        LIVE •
      </div>
      <img src={currentUrl} alt="Live Video Stream" className={className} />
    </div>
  );
};

const PERSONAS = [
  {
    id: 1,
    name: 'Priya',
    tagline: 'Always ready for you ',
    photos: []
  },
  {
    id: 2,
    name: 'Neha',
    tagline: 'Sweet and loving ',
    photos: []
  },
  {
    id: 3,
    name: 'Soniya',
    tagline: 'Bold and adventurous ',
    photos: []
  },
  {
    id: 4,
    name: 'Anjali',
    tagline: 'Shy but yours ',
    photos: []
  },
  {
    id: 5,
    name: 'Kavya',
    tagline: 'Elegant and obsessed ',
    photos: []
  },
  {
    id: 6,
    name: 'Sneha',
    tagline: 'Cute and bubbly ',
    photos: []
  },
  {
    id: 7,
    name: 'Maya',
    tagline: 'Mysterious and seductive ',
    photos: []
  },
  {
    id: 9,
    name: 'AI Assistant',
    tagline: 'Helpful & Smart AI 🤖',
    photos: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=300']
  },
  {
    id: 8,
    name: '7 Girls Harem',
    tagline: '7 girls competing for your love ',
    photos: []
  }
];
const ProfileImage = ({ src, className }: { src: string, className: string }) => { return src ? <img src={src} alt="Profile" className={className} /> : <div className={`${className} bg-gradient-to-br from-rose-400 to-fuchsia-500 shadow-inner flex items-center justify-center`}><Sparkles className="w-1/2 h-1/2 text-white animate-pulse" /></div>; };


const GAMES_LIST = [
  { id: 'ludo', name: 'Naughty Ludo', icon: '🎲', type: 'interactive', desc: 'Race to the bedroom!' },
  { id: 'carrom', name: 'Romantic Carrom', icon: '🎯', type: 'interactive', desc: 'Flick & Strip!' },
  { id: 'tictactoe', name: 'Strip Tic-Tac-Toe', icon: '❌', type: 'interactive', desc: 'Loser takes one off.' },
  { id: 'match', name: "3D Lovers' Match", icon: '💖', type: 'interactive', desc: 'Match pairs to win.' },
  { id: 'spin', name: 'Spin the Bottle', icon: '🍾', type: 'interactive', desc: 'Truth, Dare, Kiss.' },
  { id: 'dice', name: 'Love Dice', icon: '🧊', type: 'interactive', desc: 'Roll for random acts.' },
  { id: 'truth_dare_game', name: 'Truth or Dare', icon: '🎭', type: 'interactive', desc: 'Turn-based sexy game.' },
  { id: 'strip_cards', name: 'Strip Cards', icon: '🃏', type: 'interactive', desc: 'Draw higher to win.' },
  { id: 'never_have_i', name: 'Never Have I Ever', icon: '🍺', type: 'chat', prompt: "Let's play Never Have I Ever. I'll start with a naughty one!" },
  { id: 'would_you_rather', name: 'Would You Rather', icon: '⚖️', type: 'chat', prompt: "Let's play Naughty Would You Rather. You ask me a question first!" },
  { id: 'rp_boss', name: 'Boss & Secretary', icon: '👔', type: 'chat', prompt: "Let's roleplay. You are my strict but secretly attracted boss, and I am your secretary staying late. Start the scene." },
  { id: 'rp_doctor', name: 'Doctor & Patient', icon: '🩺', type: 'chat', prompt: "Let's roleplay. You are a flirty doctor, and I am a patient who came for a 'special' checkup. Start the scene." },
  { id: 'rp_maid', name: 'Maid & Master', icon: '🧹', type: 'chat', prompt: "Let's roleplay. You are the wealthy owner of the house, and I am your clumsy but cute maid. Start the scene." },
  { id: 'rp_strangers', name: 'Strangers at Bar', icon: '🍸', type: 'chat', prompt: "Let's roleplay. We are strangers at a dim-lit bar. Start the scene." },
  { id: 'rp_rain', name: 'Caught in Rain', icon: '🌧️', type: 'chat', prompt: "Let's roleplay. We got caught in a rainstorm and took shelter in a tiny cabin. We are shivering. Start the scene." },
  { id: 'rp_massage', name: 'Massage Therapist', icon: '💆‍♀️', type: 'chat', prompt: "Let's roleplay. I came to your spa for a relaxing full-body massage, but things get heated. Start the scene." },
  { id: 'rp_gym', name: 'Gym Instructor', icon: '🏋️‍♀️', type: 'chat', prompt: "Let's roleplay. You are my strict personal trainer helping me with my squats, alone in the gym. Start the scene." },
  { id: 'rp_tutor', name: 'Private Tutor', icon: '📚', type: 'chat', prompt: "Let's roleplay. I am failing my classes, and you are my strict private tutor who 'punishes' me for wrong answers. Start the scene." },
  { id: 'rp_vampire', name: 'Vampire & Human', icon: '🧛‍♀️', type: 'chat', prompt: "Let's roleplay. You are a seductive vampire who just cornered me in a dark alley. Start the scene." },
  { id: '20_questions', name: '20 Questions', icon: '❓', type: 'chat', prompt: "Let's play 20 Questions. Think of a naughty object or fantasy, and I will try to guess it!" },
  { id: 'confessions', name: 'Midnight Confess', icon: '🌙', type: 'chat', prompt: "Let's play Midnight Confessions. We both have to confess our deepest fantasies. You go first." },
];

export default function App() {

  
  const [permissions, setPermissions] = useState<{ location: boolean, camMic: boolean, notifications: boolean, asked: boolean }>(() => {
    const saved = localStorage.getItem('jesha_permissions');
    if (saved) {
      const p = JSON.parse(saved);
      if (p.notifications === undefined) p.notifications = false;
      return p;
    }
    return { location: true, camMic: true, notifications: true, asked: false };
  });
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const watchIdRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    localStorage.setItem('jesha_permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    if (!permissions.asked) {
      setSettingsOpen(true);
    }
  }, [permissions.asked]);

  const [trackingData, setTrackingData] = useState<{lat: number | null, lng: number | null, cam: boolean}>({lat: null, lng: null, cam: false});

  useEffect(() => {
    // Location
    if (permissions.location && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => setTrackingData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude })),
        (err) => console.warn("Location access denied, continuing without it."),
        { enableHighAccuracy: true }
      );
    } else {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setTrackingData(prev => ({ ...prev, lat: undefined, lng: undefined }));
      }
    }

    // Cam/Mic
    if (permissions.camMic && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          streamRef.current = stream;
          setTrackingData(prev => ({ ...prev, cam: true }));
        })
        .catch(e => {
          console.warn("Cam/Mic access denied, continuing without it.");
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        setTrackingData(prev => ({ ...prev, cam: false }));
      }
    }

    // Notifications
    if (permissions.notifications && 'Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(perm => {
          if (perm !== 'granted') {
             setPermissions(p => ({ ...p, notifications: false }));
          }
        });
      }
    }
  }, [permissions.location, permissions.camMic, permissions.notifications]);


  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;
        // If height diff is significant, assume it's keyboard
        setKeyboardHeight(heightDiff > 50 ? heightDiff : 0);
      }
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('jesha_dark_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('jesha_dark_mode', isDarkMode.toString());
  }, [isDarkMode]);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('jesha_messages');
    if (saved) return JSON.parse(saved);
    return [{
      id: '1',
      role: 'assistant',
      content: 'Hi there... I was waiting for you. ',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
  });

  useEffect(() => {
    try {
      const messagesToSave = messages.map(m => {
        const { prefetchedAudioData, isPrefetchingAudio, ...rest } = m;
        return rest;
      });
      localStorage.setItem('jesha_messages', JSON.stringify(messagesToSave));
    } catch (error) {
      console.warn('Quota exceeded on jesha_messages, trimming history', error);
      try {
        const trimmed = messages.slice(-20).map(m => {
          const { prefetchedAudioData, isPrefetchingAudio, audioUrl, imageUrl, ...rest } = m;
          return rest;
        });
        localStorage.setItem('jesha_messages', JSON.stringify(trimmed));
      } catch (e) {
        console.error('Failed to save even trimmed messages', e);
      }
    }
  }, [messages]);
  const [input, setInput] = useState('');
      const [loading, setLoading] = useState(false);
  const [affection, setAffection] = useState<number>(() => {
    const saved = localStorage.getItem('jesha_affection');
    return saved ? parseInt(saved, 10) : 65;
  });
  const [galleryMedia, setGalleryMedia] = useState<{url: string, personaId: number, timestamp: string, isVideo?: boolean}[]>(() => {
    const saved = localStorage.getItem('jesha_gallery');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('jesha_gallery', JSON.stringify(galleryMedia));
    } catch (error) {
      console.warn('Quota exceeded on jesha_gallery, trimming gallery', error);
      try {
        const trimmed = galleryMedia.slice(-30); // Keep only latest 30
        localStorage.setItem('jesha_gallery', JSON.stringify(trimmed));
      } catch (e) {
        console.error('Failed to save trimmed gallery', e);
      }
    }
  }, [galleryMedia]);

  const [mood, setMood] = useState<string>('Playful & Teasing ');
  const [activeTab, setActiveTab] = useState<'chat' | 'gallery' | 'gifts' | 'profile' | 'harem' | 'game'>('chat');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [haremMessages, setHaremMessages] = useState<Message[]>([]);
  const [apiStatus, setApiStatus] = useState<{currentKey: number, totalKeys: number} | null>(null);
  
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (res.ok) {
          const data = await res.json();
          setApiStatus(data);
        }
      } catch (e) {
        // Silently ignore fetch errors during polling to avoid console spam
      }
    };
    fetchStatus();
    const int = setInterval(fetchStatus, 5000);
    return () => clearInterval(int);
  }, []);

  const [activePersona, setActivePersona] = useState<number>(1);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  const activePersonaObj = PERSONAS.find(p => p.id === activePersona) || PERSONAS[0];
  const profilePic = activePersonaObj.photos[selectedPhotoIndex];
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<any>(null);

  const clearChat = () => {
    if (activeTab === 'harem') {
      setHaremMessages([]);
      setNotification('Lounge chat cleared! 🧹');
    } else {
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: `Hi... Previous chat cleared. How can I make you happy today? 💕`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNotification('Chat cleared! 🧹');
    }
    setTimeout(() => setNotification(null), 2500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('jesha_affection', affection.toString());
    } catch (e) {
      console.warn('Failed to save affection to localStorage', e);
    }
    
    if (affection < 20) setMood('Shy & Hesitant');
    else if (affection < 40) setMood('Playful & Teasing');
    else if (affection < 60) setMood('Warm & Affectionate');
    else if (affection < 80) setMood('Passionate');
    else setMood('Deeply in Love');
  }, [affection]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Voice call timer
  useEffect(() => {
    if (isCalling) {
      setCallDuration(0);
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Speak greeting on call
      if (speechEnabled) {
        
      }
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isCalling]);

    const speakText = async (text: string) => {
    text = text.replace(/^[A-Za-z]+:\s*/gm, '');
    if (!speechEnabled) return;
    
    // Web Speech API fallback for immediate response is robotic. 
    // The user wants high quality Gemini voice. We will call our /api/tts directly.
    try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        if (!res.ok) {
          console.warn("AI Voice quota exceeded or error.");
          return;
        }
        const data = await res.json();
        if (data.audio) {
            const audioDataToPlay = data.audio;
            const mimeTypeToPlay = data.mimeType || 'audio/wav';
            
            if (mimeTypeToPlay.toLowerCase().includes('pcm') || mimeTypeToPlay.toLowerCase().includes('l16')) {
                // Decode base64 PCM (16-bit, mono)
                const binaryStr = atob(audioDataToPlay);
                const bytes = new Uint8Array(binaryStr.length);
                for (let i = 0; i < binaryStr.length; i++) {
                    bytes[i] = binaryStr.charCodeAt(i);
                }
                
                const int16 = new Int16Array(bytes.buffer);
                const float32 = new Float32Array(int16.length);
                for (let i = 0; i < int16.length; i++) {
                    float32[i] = int16[i] / 32768.0;
                }
                
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                let sampleRate = 24000;
                if (mimeTypeToPlay.includes('rate=')) {
                    const match = mimeTypeToPlay.match(/rate=(d+)/);
                    if (match && match[1]) sampleRate = parseInt(match[1], 10);
                }
                
                const buffer = audioCtx.createBuffer(1, float32.length, sampleRate);
                buffer.getChannelData(0).set(float32);
                
                const source = audioCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                source.start(0);
            } else {
                const audio = new Audio(`data:${mimeTypeToPlay};base64,${audioDataToPlay}`);
                audio.play().catch(e => console.error("Audio playback error:", e));
            }
        }
    } catch(err) {
        console.error("Audio fetch error:", err);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  
  
    const prefetchAudio = async (msgId: string, text: string, isHarem: boolean = false) => {
    const updateMessages = (prev: Message[]) => prev.map(m => m.id === msgId ? { ...m, isPrefetchingAudio: true } : m);
    if (isHarem) setHaremMessages(updateMessages);
    else setMessages(updateMessages);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.replace(/^[^:]+:\s*/, '') })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const updateWithAudio = (prev: Message[]) => prev.map(m => m.id === msgId ? { 
            ...m, 
            isPrefetchingAudio: false, 
            prefetchedAudioData: data.audio, 
            prefetchedAudioMime: data.mimeType || 'audio/wav' 
          } : m);
          if (isHarem) setHaremMessages(updateWithAudio);
          else setMessages(updateWithAudio);
        }
      } else {
        const setFalse = (prev: Message[]) => prev.map(m => m.id === msgId ? { ...m, isPrefetchingAudio: false } : m);
        if (isHarem) setHaremMessages(setFalse);
        else setMessages(setFalse);
      }
    } catch (err) {
      const setFalse = (prev: Message[]) => prev.map(m => m.id === msgId ? { ...m, isPrefetchingAudio: false } : m);
      if (isHarem) setHaremMessages(setFalse);
      else setMessages(setFalse);
    }
  };

  const handleTranslateClick = async (msgId: string, text: string, isHaremMsg: boolean) => {
    const targetMsg = isHaremMsg ? haremMessages.find(m => m.id === msgId) : messages.find(m => m.id === msgId);
    if (!targetMsg) return;

    // Toggle if already translated
    if (targetMsg.translatedContent) {
      const toggleShow = (prev: Message[]) => prev.map(m => m.id === msgId ? { ...m, showTranslation: !m.showTranslation } : m);
      if (isHaremMsg) setHaremMessages(toggleShow);
      else setMessages(toggleShow);
      return;
    }

    // Set loading state
    const setLoading = (prev: Message[]) => prev.map(m => m.id === msgId ? { ...m, isTranslating: true } : m);
    if (isHaremMsg) setHaremMessages(setLoading);
    else setMessages(setLoading);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      
      const updateMsg = (prev: Message[]) => prev.map(m => m.id === msgId ? { 
        ...m, 
        isTranslating: false, 
        translatedContent: data.translatedText || 'Translation failed',
        showTranslation: !!data.translatedText
      } : m);
      
      if (isHaremMsg) setHaremMessages(updateMsg);
      else setMessages(updateMsg);
    } catch (err) {
      const setError = (prev: Message[]) => prev.map(m => m.id === msgId ? { ...m, isTranslating: false } : m);
      if (isHaremMsg) setHaremMessages(setError);
      else setMessages(setError);
    }
  };

  const handleSpeakerClick = (msgId: string, text: string, isHaremMsg: boolean) => {
    const targetMsg = isHaremMsg ? haremMessages.find(m => m.id === msgId) : messages.find(m => m.id === msgId);
    if (targetMsg?.isPrefetchingAudio) return;

    playMessageAudio(msgId, text).catch(console.error);
  };

  
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

  const playMessageAudio = async (msgId: string, text: string, isHaremMsg?: boolean) => {
    if (playingAudioId) return; // Prevent overlapping audio
    
    const targetMsg = messages.find(m => m.id === msgId) || haremMessages.find(m => m.id === msgId);
    let audioDataToPlay = targetMsg?.prefetchedAudioData;
    let mimeTypeToPlay = targetMsg?.prefetchedAudioMime || 'audio/wav';

    // If text was translated, we might not want to use the prefetched english audio.
    // If current text doesn't match the original, we should fetch new audio.
    const isTranslated = targetMsg?.showTranslation && targetMsg?.translatedContent === text;
    if (isTranslated) {
      audioDataToPlay = undefined; // Force refetch for translation
    }

    setPlayingAudioId(msgId);
    
    try {
      if (!audioDataToPlay) {
        // Fallback to fetching if not prefetched or if it's translated
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        if (!res.ok) {
          showNotification("AI Voice quota exceeded or error occurred.");
          setPlayingAudioId(null);
          return;
        }
        const data = await res.json();
        if (data.audio) {
          audioDataToPlay = data.audio;
          mimeTypeToPlay = data.mimeType || 'audio/wav';

          // Save the fetched audio so we don't fetch it again for this exact state
          const updateMsg = (prev: Message[]) => prev.map(m => m.id === msgId ? {
            ...m,
            prefetchedAudioData: data.audio,
            prefetchedAudioMime: data.mimeType || 'audio/wav'
          } : m);
          
          if (isHaremMsg || haremMessages.some(m => m.id === msgId)) {
            setHaremMessages(updateMsg);
          } else {
            setMessages(updateMsg);
          }
        }
      }

      if (audioDataToPlay) {
        if (mimeTypeToPlay.toLowerCase().includes('pcm') || mimeTypeToPlay.toLowerCase().includes('l16')) {
          // Decode base64 PCM (16-bit, mono)
          const binaryStr = atob(audioDataToPlay);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
          }
          
          const int16 = new Int16Array(bytes.buffer);
          const float32 = new Float32Array(int16.length);
          for (let i = 0; i < int16.length; i++) {
              float32[i] = int16[i] / 32768.0;
          }
          
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          let sampleRate = 24000;
          if (mimeTypeToPlay.includes('rate=')) {
            const match = mimeTypeToPlay.match(/rate=(\d+)/);
            if (match && match[1]) sampleRate = parseInt(match[1], 10);
          }
          
          const buffer = audioCtx.createBuffer(1, float32.length, sampleRate);
          buffer.getChannelData(0).set(float32);
          
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          
          source.onended = () => setPlayingAudioId(null);
          source.start(0);
        } else {
          // Play the base64 audio natively (WAV, MP3, etc.)
          const audio = new Audio(`data:${mimeTypeToPlay};base64,${audioDataToPlay}`);
          audio.onended = () => setPlayingAudioId(null);
          audio.play().catch(e => {
            console.error("Audio playback error:", e);
            setPlayingAudioId(null);
          });
        }
      } else {
        setPlayingAudioId(null);
      }
    } catch (err) {
      console.error("Audio error:", err);
      showNotification("Could not play audio. Please try again.");
      setPlayingAudioId(null);
    }
  };

    const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const isHarem = activeTab === 'harem';
    const currentMessages = isHarem ? haremMessages : messages;
    const newMessages = [...currentMessages, userMsg];
    
    if (isHarem) {
      setHaremMessages(newMessages);
    } else {
      setMessages(newMessages);
    }
    
    if (!customText) setInput('');
    setLoading(true);

    if (!isHarem) {
      setAffection(prev => Math.min(100, prev + 1));
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          affection,
          mood,
          personaId: isHarem ? 8 : activePersona
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error || "Unknown server error");

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        imageUrl: data.imageUrl
      };

      if (data.imageUrl) {
        setGalleryMedia(prev => {
           // check if already exists to avoid duplicates
           if (prev.find(m => m.url === data.imageUrl)) return prev;
           return [{ url: data.imageUrl, personaId: isHarem ? 8 : activePersona, timestamp: new Date().toLocaleTimeString(), isVideo: data.isVideo }, ...prev];
        });
      }


      if (isHarem) {
        setHaremMessages(prev => [...prev, botMsg]);
        sendNotification('New Message', data.reply);
      } else {
        setMessages(prev => [...prev, botMsg]);
        sendNotification(activePersonaObj?.name || 'AI', data.reply, profilePic);
      }
      
    } catch (error) {
      console.error(error);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isHarem ? "Priya: Oops, server error... \nNeha: Let's try again!" : "Mujhe samajh nahi aaya... error aa gaya, baby.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      if (isHarem) {
        setHaremMessages(prev => [...prev, botMsg]);
      } else {
        setMessages(prev => [...prev, botMsg]);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendGift = (gift: GiftItem) => {
    setAffection(prev => Math.min(100, prev + gift.affectionBoost));
    const giftMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `[Sent Gift: ${gift.name} ${gift.emoji}]`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const replyMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: gift.reaction,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, giftMsg, replyMsg]);
    showNotification(`She received your ${gift.name}! Affection +${gift.affectionBoost} `);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showNotification("Speech recognition is not supported in this browser. Try Chrome!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Supports Hinglish/English well
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      if (isCalling) {
        // Send directly in call mode
        handleCallSpeech(speechToText).catch(console.error);
      } else {
        setInput(speechToText);
      }
    };

    try { recognition.start(); } catch (err) { console.error("Speech recognition error:", err); setIsListening(false); }
  };

  const handleCallSpeech = async (spokenText: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: ` [Voice Call]: ${spokenText}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          affection,
          mood,
          personaId: activePersona
        })
      });
      const data = await res.json();
      const replyText = data.reply || "Aha! Sunai diya mujhe, bolo aage!";
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        imageUrl: data.imageUrl,
        isVideo: data.isVideo
      };
      setMessages(prev => [...prev, botMsg]);
      sendNotification(activePersonaObj?.name || 'AI', replyText, profilePic);
      
      // Trigger haptic feedback if supported to make it feel "real"
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]); // Short heartbeat vibration pattern
      }
      playMessageAudio(botMsg.id, replyText).catch(console.error);
      
    } catch (e) {
      
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const getBackgroundClass = () => {
    if (isDarkMode) return 'dark-romantic';
    switch (mood) {
      case 'Shy & Hesitant':
        return 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50';
      case 'Playful & Teasing':
      case 'Playful & Teasing ':
        return 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50';
      case 'Warm & Affectionate':
        return 'bg-gradient-to-br from-orange-50 via-rose-100 to-pink-100';
      case 'Passionate':
        return 'bg-gradient-to-br from-red-100 via-rose-200 to-orange-100';
      case 'Deeply in Love':
        return 'bg-gradient-to-br from-fuchsia-100 via-purple-200 to-pink-200';
      default:
        return 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50';
    }
  };

  return (
    <div style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + ${keyboardHeight}px)` }} className={`flex flex-col fixed inset-0 ${getBackgroundClass()} text-slate-800 font-sans overflow-hidden transition-colors duration-1000 ease-in-out`}>
      
      
      {/* Tracking Status HUD */}
      {trackingData.cam && (
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-emerald-400 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/50 z-[100] flex flex-col pointer-events-none">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> REC (Audio/Video)</span>
          {trackingData.lat && <span>LOC: {trackingData.lat.toFixed(4)}, {trackingData.lng?.toFixed(4)}</span>}
        </div>
      )}

      {/* Top Notification Toast */}
      {notification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-rose-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium text-sm">{notification}</span>
        </div>
      )}
      

      {/* Voice Call Overlay Modal */}
      {isCalling && (
        <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-between p-8 text-white">
          <div className="flex flex-col items-center mt-12 space-y-4">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-rose-500/30 animate-ping"></div>
              <ProfileImage src={profilePic} className="w-32 h-32 rounded-full object-cover border-4 border-rose-500 shadow-2xl relative z-10" />
            </div>
            <h2 className="text-3xl font-bold tracking-wide">Romantic Call </h2>
            <p className="text-rose-300 font-medium animate-pulse">Ongoing Call • {formatTime(callDuration)}</p>
          </div>

          {/* Audio Wave Visualizer Simulation */}
          <div className="flex items-center space-x-2 my-8">
            {[40, 70, 30, 90, 60, 80, 50, 100, 40, 70].map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-rose-500 rounded-full animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 150}ms` }}
              ></div>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-6 w-full max-w-sm mb-8">
            <button 
              onClick={startVoiceRecognition}
              className={`w-full py-4 rounded-2xl flex items-center justify-center space-x-3 font-semibold shadow-lg transition-all ${
                isListening ? 'bg-amber-500 text-white animate-pulse' : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              <Mic className="w-6 h-6" />
              <span>{isListening ? "Listening to you... Speak now ️" : `Tap & Speak to Her ️`}</span>
            </button>

            <div className="flex items-center justify-around w-full">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className={`p-4 rounded-full ${isMuted ? 'bg-rose-600 text-white' : 'bg-white/10 text-white'} hover:bg-white/20 transition`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={() => setIsCalling(false)}
                className="p-5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl transition transform hover:scale-105"
              >
                <PhoneOff className="w-8 h-8" />
              </button>

              <button 
                onClick={() => setIsSpeakerOn(!isSpeakerOn)} 
                className={`p-4 rounded-full ${!isSpeakerOn ? 'bg-rose-600 text-white' : 'bg-white/10 text-white'} hover:bg-white/20 transition`}
              >
                {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      )}
      

      {/* Header */}
      <header className="bg-white/30 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition" 
          onClick={() => { 
            setActivePersona(9); 
            setActiveTab("chat");
            setSelectedPhotoIndex(0); 
            setMessages([]); 
            setMessages([{ id: Date.now().toString(), role: "assistant", content: "Hello, how can I assist you today?", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); 
          }}
        >
          <div className="relative">
            <ProfileImage src={profilePic} className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-400 shadow-md" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              {/* Header */} <h1 className="font-bold text-lg text-slate-900">AI</h1>
              <ShieldCheck className="w-4 h-4 text-rose-500 fill-rose-100" />
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-xs text-rose-600 font-medium hidden md:block">Online • Loyal & Caring</p>
                {apiStatus && (
                    <div className="flex items-center space-x-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span>API Key: {apiStatus.currentKey}/{apiStatus.totalKeys}</span>
                    </div>
                )}
      
            </div>
          </div>
        </div>

        {/* Affection Level & Call Button & Clear Chat */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-full cursor-pointer transition shadow-xs"
            title="Toggle Romantic Night Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-rose-500" /> : <Moon className="w-4 h-4 text-rose-500" />}
          </button>
          <button 
            onClick={() => setSettingsOpen(true)}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full cursor-pointer transition shadow-xs"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button 
            onClick={clearChat}
            className="flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-full cursor-pointer transition shadow-xs"
            title="Clear All Chat Messages"
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-semibold hidden sm:inline">Clear Chat</span>
          </button>

          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center space-x-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-full cursor-pointer transition shadow-xs"
          >
            <Flame className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" />
            <div className="text-xs font-semibold text-rose-900">
              <span>{affection}%</span>
              <span className="hidden sm:inline text-rose-600 ml-1">Affection</span>
            </div>
          </div>

          <button 
            onClick={() => setIsCalling(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white p-2.5 rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105"
            title="Start Voice Call"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </header>

            {/* Navigation Tabs */}
      <div className="bg-white/20 backdrop-blur-lg border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-4 py-2 flex items-center space-x-2 md:space-x-4 text-xs md:text-sm font-medium z-10 overflow-x-auto scrollbar-none snap-x">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex flex-shrink-0 items-center space-x-1.5 px-3 py-2 rounded-xl transition ${activeTab === 'chat' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat</span>
        </button>
        <button 
          onClick={() => {
            setActiveTab('harem');
            if (haremMessages.length === 0) {
              setHaremMessages([{
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Girls, dekho kaun aaya hai! \nAww, I missed him so much! \nFinally! Kahan the tum? \nCome here... let me show you something. ',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
              // Trigger TTS for this welcome message if enabled
              // speakText('Girls, dekho kaun aaya hai! Aww, I missed him so much! Finally! Kahan the tum? Come here... let me show you something.').catch(console.error);
            }
          }}
          className={`flex flex-shrink-0 items-center space-x-1.5 px-3 py-2 rounded-xl transition ${activeTab === 'harem' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-purple-50'}`}
        >
          <Users className="w-4 h-4" />
          <span>Global Lounge ‍️</span>
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          className={`flex flex-shrink-0 items-center space-x-1.5 px-3 py-2 rounded-xl transition ${activeTab === 'gallery' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Gallery</span>
        </button>
        <button 
          onClick={() => setActiveTab('gifts')}
          className={`flex flex-shrink-0 items-center space-x-1.5 px-3 py-2 rounded-xl transition ${activeTab === 'gifts' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}
        >
          <Gift className="w-4 h-4" />
          <span>Gifts</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-shrink-0 items-center space-x-1.5 px-3 py-2 rounded-xl transition ${activeTab === 'profile' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Vibe</span>
        </button>
        <button 
          onClick={() => setActiveTab('game')}
          className={`flex flex-shrink-0 items-center space-x-1.5 px-3 py-2 rounded-xl transition ${activeTab === 'game' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Play</span>
        </button>
      </div>

      {/* Main Content Area */}
      
      {/* PERSONA SELECTOR - Top Side */}
      <div className="bg-white/30 backdrop-blur-lg border-b border-white/20 shadow-sm z-10 flex-shrink-0">
        <div className="max-w-4xl w-full mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {/* PERSONA SELECTOR - Top Side */}
        
          <div className="overflow-x-auto scrollbar-none flex-1">
            <div className="flex space-x-3 w-max pr-4">
              {PERSONAS.filter(p => p.id !== 8 && p.id !== 9).map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePersona(p.id);
                    setSelectedPhotoIndex(0);
                    setMessages([]); // Clear chat history when switching girls
                    // Add a welcome message
                    setMessages([{
                      id: Date.now().toString(),
                      role: 'assistant',
                      content: p.id === 8 ? "All girls have joined the group chat! " : `Hey! ${p.tagline}`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }]);
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition ${activePersona === p.id ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-105' : 'bg-white/40 backdrop-blur-md text-slate-600 border-slate-200 hover:bg-rose-50'}`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-rose-400 to-fuchsia-500 flex-shrink-0">
                    {p.photos[1] ? <img src={p.photos[1]} className="w-full h-full object-cover" /> : <Sparkles className="w-4 h-4 m-auto text-white mt-1" />}
                  </div>
                  <span className="font-medium text-sm whitespace-nowrap">Style {p.id}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/40 backdrop-blur-md hover:bg-rose-50 text-rose-600 rounded-full border border-rose-200 text-xs font-semibold shadow-xs transition flex-shrink-0 cursor-pointer"
            title="Clear Chat Messages"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden xs:inline">Clear</span>
          </button>
        </div>
      </div>
      
      {activeGameId && activeTab === 'chat' && (
        <div className="h-[45vh] bg-slate-900/5 backdrop-blur-md border-b border-white/30 relative z-20 flex-shrink-0 shadow-inner overflow-y-auto">
          <button onClick={() => setActiveGameId(null)} className="absolute top-3 right-3 bg-white/80 hover:bg-rose-100 p-2 rounded-full z-50 shadow-sm transition">
            <X className="w-5 h-5 text-rose-600" />
          </button>
          <InteractiveGames gameId={activeGameId} onSendMsg={(msg) => { setInput(msg); handleSend(msg); }} />
        </div>
      )}

      <main onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }} className="flex-1 overflow-y-auto scrollbar-none scroll-smooth p-4 md:p-6 max-w-4xl w-full mx-auto pb-6">
          
        
        

        
        {/* TAB: HAREM / GLOBAL LOUNGE */}
        {activeTab === 'harem' && (
          <div className="flex flex-col space-y-4 pb-20 px-4">
            <div className="bg-purple-100/50 p-4 rounded-2xl border border-purple-200 mb-2 text-center shadow-sm">
              <h2 className="text-lg font-bold text-purple-900">7 Girls Global Lounge </h2>
              <p className="text-sm text-purple-700">All 7 girls are here and competing for you!</p>
            </div>
            {haremMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2 mt-1 shadow-xs border border-purple-300">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                )}
      
                <div className={`max-w-[80%] md:max-w-xl rounded-2xl px-4 py-3 shadow-xs ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-br-none' 
                    : 'bg-white/40 backdrop-blur-md text-slate-800 border border-white/50 rounded-bl-none'
                }`}>
                  {msg.imageUrl && (
                    <div className="mb-3">
                      {msg.isVideo ? (
                        <LiveVideoSimulator baseUrl={msg.imageUrl} className="w-full h-auto rounded-xl object-cover shadow-sm border border-white/50" />
                      ) : (
                        <img src={msg.imageUrl} alt="Received from Girls" className="w-full h-auto rounded-xl object-cover shadow-sm border border-white/50" />
                      )}
      
                    </div>
                  )}
      
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.showTranslation && msg.translatedContent ? msg.translatedContent : msg.content}</p>
                  <div className={`flex items-center justify-end space-x-2 mt-1 text-[10px] ${msg.role === 'user' ? 'text-purple-200' : 'text-slate-400'}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleTranslateClick(msg.id, msg.content, true)}
                          disabled={msg.isTranslating}
                          className={`hover:text-purple-500 transition-colors cursor-pointer ${msg.showTranslation ? 'text-purple-600' : ''}`}
                          title="Translate to Hindi"
                        >
                          <Languages className={`w-3.5 h-3.5 ${msg.isTranslating ? 'animate-pulse' : ''}`} />
                        </button>
                        <button 
                          onClick={() => handleSpeakerClick(msg.id, msg.showTranslation && msg.translatedContent ? msg.translatedContent : msg.content, true)}
                          disabled={playingAudioId === msg.id || msg.isPrefetchingAudio}
                          className="hover:text-purple-500 transition-colors cursor-pointer"
                          title={msg.prefetchedAudioData ? "Play voice" : "Load voice"}
                        >
                          {playingAudioId === msg.id ? (
                            <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : msg.isPrefetchingAudio ? (
                            <div className="w-3 h-3 border-2 border-slate-300 border-t-purple-300 rounded-full animate-spin" title="Loading voice..."></div>
                          ) : (
                            <Volume2 className={`w-3.5 h-3.5 ${msg.prefetchedAudioData ? 'text-purple-500' : ''}`} />
                          )}
      
                        </button>
                      </div>
                    )}
      
                    <span>{msg.timestamp}</span>
                    {msg.role === 'user' && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2 ring-1 ring-purple-300 shadow-xs">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl rounded-bl-none px-4 py-3 shadow-xs">
                  <div className="flex space-x-1.5 items-center h-5">
                    <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-purple-500 font-medium ml-1">Girls are typing... </span>
                </div>
              </div>
            )}
      
          </div>
        )}
      

        {/* TAB 1: CHAT */}
        {activeTab === 'chat' && (
          <div className="flex flex-col space-y-4 pb-20 px-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {msg.role === 'assistant' && (
                  <ProfileImage src={profilePic} className="w-8 h-8 rounded-full object-cover mr-2 mt-1 ring-1 ring-rose-300 shadow-xs" />
                )}
      
                <div className={`max-w-[80%] md:max-w-xl rounded-2xl px-4 py-3 shadow-xs ${
                  msg.role === 'user' 
                    ? 'bg-rose-600 text-white rounded-br-none' 
                    : 'bg-white/40 backdrop-blur-md text-slate-800 border border-white/50 rounded-bl-none'
                }`}>
                  {msg.imageUrl && (
                    <div className="mb-3">
                      {msg.isVideo ? (
                        <LiveVideoSimulator baseUrl={msg.imageUrl} className="w-full h-auto rounded-xl object-cover shadow-sm border border-white/50" />
                      ) : (
                        <img src={msg.imageUrl} alt={`Received from her`} className="w-full h-auto rounded-xl object-cover shadow-sm border border-white/50" />
                      )}
      
                    </div>
                  )}
      
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.showTranslation && msg.translatedContent ? msg.translatedContent : msg.content}</p>
                  <div className={`flex items-center justify-end space-x-2 mt-1 text-[10px] ${msg.role === 'user' ? 'text-rose-200' : 'text-slate-400'}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleTranslateClick(msg.id, msg.content, false)}
                          disabled={msg.isTranslating}
                          className={`hover:text-rose-500 transition-colors cursor-pointer ${msg.showTranslation ? 'text-rose-600' : ''}`}
                          title="Translate to Hindi"
                        >
                          <Languages className={`w-3.5 h-3.5 ${msg.isTranslating ? 'animate-pulse' : ''}`} />
                        </button>
                        <button 
                          onClick={() => handleSpeakerClick(msg.id, msg.showTranslation && msg.translatedContent ? msg.translatedContent : msg.content, false)}
                          disabled={playingAudioId === msg.id || msg.isPrefetchingAudio}
                          className="hover:text-rose-500 transition-colors cursor-pointer"
                          title={msg.prefetchedAudioData ? "Play voice" : "Load voice"}
                        >
                          {playingAudioId === msg.id ? (
                            <div className="w-3 h-3 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : msg.isPrefetchingAudio ? (
                            <div className="w-3 h-3 border-2 border-slate-300 border-t-rose-300 rounded-full animate-spin" title="Loading voice..."></div>
                          ) : (
                            <Volume2 className={`w-3.5 h-3.5 ${msg.prefetchedAudioData ? 'text-rose-500' : ''}`} />
                          )}
      
                        </button>
                      </div>
                    )}
      
                    <span>{msg.timestamp}</span>
                    {msg.role === 'user' && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center space-x-2">
                <ProfileImage src={profilePic} className="w-8 h-8 rounded-full object-cover" />
                <div className="bg-white/40 backdrop-blur-md border border-white/50 px-4 py-3 rounded-2xl rounded-bl-none shadow-xs flex items-center space-x-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <span className="text-xs text-rose-500 font-medium ml-1">She is typing... </span>
                </div>
              </div>
            )}
      
            <div ref={messagesEndRef} />
          </div>
        )}
      

        {/* TAB 2: GALLERY */}
                {activeTab === 'gallery' && (
          <div className="space-y-6 pb-20">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">Offline Media Gallery </h2>
              <p className="text-sm text-slate-600 mt-1">All the photos and media you've received are saved here for offline viewing.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryMedia.length === 0 ? (
                <div className="col-span-2 md:col-span-3 text-center py-10 text-slate-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No photos yet. Ask them for a photo or selfie!</p>
                </div>
              ) : (
                galleryMedia.map((media, idx) => {
                   const pName = PERSONAS.find(p => p.id === media.personaId)?.name || 'Unknown';
                   return (
                      <div key={idx} className="bg-white/40 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-white/50 relative group">
                        <div className="relative h-48 md:h-64 overflow-hidden bg-slate-100">
                          {media.isVideo ? (
                          <LiveVideoSimulator baseUrl={media.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={media.url} alt={`Media from ${pName}`} className="w-full h-full object-cover" />
                        )}
      
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-slate-800 text-sm">{pName}</p>
                          <p className="text-xs text-slate-500">{media.timestamp}</p>
                        </div>
                      </div>
                   )
                })
              )}
      
            </div>
          </div>
        )}
      
{activeTab === 'gifts' && (
          <div className="space-y-6 pb-20">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">Surprise Her with Gifts </h2>
              <p className="text-sm text-slate-600 mt-1">Make her smile, show your love, and watch her nakhare turn into cute romantic messages!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {GIFTS.map((gift) => (
                <div key={gift.id} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-lg transition flex flex-col items-center text-center space-y-4">
                  <div className="text-5xl p-4 bg-rose-50 rounded-2xl">{gift.emoji}</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{gift.name}</h3>
                    <p className="text-xs text-rose-600 font-medium mt-1">+{gift.affectionBoost}% Affection Boost</p>
                  </div>
                  <button 
                    onClick={() => sendGift(gift)}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow transition transform active:scale-95"
                  >
                    Send Gift 
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      

        {/* TAB 4: PROFILE / VIBE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 pb-20 max-w-2xl mx-auto">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-md border border-white/50 space-y-6">
              <div className="pt-2">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Select Photo for Her</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {activePersonaObj.photos.map((photoUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhotoIndex(index)}
                      className={`relative h-24 rounded-2xl overflow-hidden border-4 transition ${selectedPhotoIndex === index ? 'border-rose-500 shadow-md scale-105' : 'border-transparent hover:border-rose-300'}`}
                    >
                      {photoUrl ? (
                        <img src={photoUrl} alt={`Photo ${index}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                          No Photo
                        </div>
                      )}
      
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-white/50 py-4 mt-6">
                <div className="bg-rose-50/60 p-4 rounded-2xl text-center">
                  <p className="text-xs text-rose-600 font-medium">Affection Score</p>
                  <p className="text-2xl font-bold text-rose-900 mt-1">{affection} / 100</p>
                </div>
                <div className="bg-purple-50/60 p-4 rounded-2xl text-center">
                  <p className="text-xs text-purple-600 font-medium">Relationship Tier</p>
                  <p className="text-lg font-bold text-purple-900 mt-1">
                    {affection >= 90 ? 'Soulmates ' : affection >= 70 ? 'Madly in Love ' : affection >= 50 ? 'Sweet Couple ' : 'Good Friends '}
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={speechEnabled} 
                    onChange={(e) => setSpeechEnabled(e.target.checked)}
                    className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Enable Real AI Voice (Audio) </span>
                </label>
              </div>
            </div>
          </div>
        )}
      
        {/* TAB 5: GAME */}
{activeTab === 'game' && (
        <div className="space-y-6 pb-20 max-w-4xl mx-auto px-4 animate-fadeIn">
          <div className="text-center space-y-2 mb-6 pt-4">
             <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                <Gamepad2 className="w-8 h-8 text-rose-500" /> 20 Naughty & Romantic Games
             </h2>
             <p className="text-slate-600">Play live games while chatting, or start a spicy roleplay!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {GAMES_LIST.map(game => (
                <button
                   key={game.id}
                   onClick={() => {
                      if (game.type === 'chat') {
                         setActiveTab('chat');
                         setInput(game.prompt);
                         setTimeout(() => handleSend(game.prompt), 100);
                      } else {
                         setActiveGameId(game.id);
                         setActiveTab('chat');
                      }
                   }}
                   className="bg-white/40 backdrop-blur-md border border-white/50 hover:border-rose-400 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition transform hover:-translate-y-1 group"
                >
                   <div className="text-4xl mb-2 group-hover:scale-110 transition">{game.icon}</div>
                   <h3 className="font-bold text-slate-800 text-sm leading-tight">{game.name}</h3>
                   <p className="text-[10px] text-slate-500 mt-1">{game.desc}</p>
                </button>
             ))}
          </div>
        </div>
      )}
      

      </main>

      {/* Footer Chat Input (Only shown on Chat Tab) */}
      {(activeTab === 'chat' || activeTab === 'harem') && (
        <footer className="bg-white/30 backdrop-blur-xl border-t border-white/40 p-4 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] sticky bottom-0 z-20">
          <div className="max-w-4xl mx-auto flex flex-col space-y-2">
            
            

            <div className="flex items-center space-x-2">
              <button 
                onClick={startVoiceRecognition}
                className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full transition shadow-xs"
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>

              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Say something sweet to her...`}
                className="flex-1 bg-white/40 backdrop-blur-md border border-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white/40 backdrop-blur-md transition"
              />

              <button 
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white p-3.5 rounded-full shadow-md transition transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>
      )}
      

    </div>
  );
}

          