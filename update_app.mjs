import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add InteractiveGames import
if (!code.includes("import { InteractiveGames }")) {
  code = code.replace(
    "import { RomanticMatchGame } from './components/RomanticMatchGame';",
    "import { RomanticMatchGame } from './components/RomanticMatchGame';\nimport { InteractiveGames } from './components/InteractiveGames';"
  );
}
// wait, the previous code had RomanticMatchGame. Let's make sure:
if (!code.includes("import { InteractiveGames }")) {
  code = code.replace(
    "import { RomanticMatchGame } from \"./components/RomanticMatchGame\";",
    "import { RomanticMatchGame } from \"./components/RomanticMatchGame\";\nimport { InteractiveGames } from \"./components/InteractiveGames\";"
  );
}

// 2. Add activeGameId state
if (!code.includes("const [activeGameId,")) {
  code = code.replace(
    "const [activeTab, setActiveTab] = useState<string>('chat');",
    "const [activeTab, setActiveTab] = useState<string>('chat');\n  const [activeGameId, setActiveGameId] = useState<string | null>(null);"
  );
}

// 3. Define GAMES_LIST array above export default function App()
const gamesListArray = `
const GAMES_LIST = [
  { id: 'ludo', name: 'Naughty Ludo', icon: '🎲', type: 'interactive', desc: 'Race to the bedroom!' },
  { id: 'carrom', name: 'Romantic Carrom', icon: '🎯', type: 'interactive', desc: 'Flick & Strip!' },
  { id: 'tictactoe', name: 'Strip Tic-Tac-Toe', icon: '❌', type: 'interactive', desc: 'Loser takes one off.' },
  { id: 'match', name: "3D Lovers' Match", icon: '💖', type: 'interactive', desc: 'Match pairs to win.' },
  { id: 'spin', name: 'Spin the Bottle', icon: '🍾', type: 'interactive', desc: 'Truth, Dare, Kiss.' },
  { id: 'dice', name: 'Love Dice', icon: '🧊', type: 'interactive', desc: 'Roll for random acts.' },
  { id: 'truth_dare', name: 'Truth or Dare', icon: '🎭', type: 'chat', prompt: "Let's play Truth or Dare! I choose Truth. Ask me a naughty question." },
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
`;

if (!code.includes("const GAMES_LIST =")) {
  code = code.replace(
    "export default function App() {",
    gamesListArray + "\nexport default function App() {"
  );
}

// 4. Inject Split-Screen Game UI above <main>
const splitScreenHTML = `
      {activeGameId && activeTab === 'chat' && (
        <div className="h-[45vh] bg-slate-900/5 backdrop-blur-md border-b border-white/30 relative z-20 flex-shrink-0 shadow-inner overflow-y-auto">
          <button onClick={() => setActiveGameId(null)} className="absolute top-3 right-3 bg-white/80 hover:bg-rose-100 p-2 rounded-full z-50 shadow-sm transition">
            <X className="w-5 h-5 text-rose-600" />
          </button>
          <InteractiveGames gameId={activeGameId} onSendMsg={(msg) => { setInput(msg); handleSend(msg); }} />
        </div>
      )}
`;

if (!code.includes("InteractiveGames gameId={activeGameId}")) {
  code = code.replace(
    '<main onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }} className="flex-1 overflow-y-auto scrollbar-none scroll-smooth p-4 md:p-6 max-w-4xl w-full mx-auto pb-6">',
    splitScreenHTML + '\n      <main onClick={() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); }} className="flex-1 overflow-y-auto scrollbar-none scroll-smooth p-4 md:p-6 max-w-4xl w-full mx-auto pb-6">'
  );
}

// 5. Replace the entire {activeTab === 'game' && (...)} with the new GAMES_LIST UI
const newGamesTab = `{activeTab === 'game' && (
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
      )}`;

// Since matching big blocks of React with regex is error prone, 
// I'll extract everything before {activeTab === 'game' && ( and everything after the end of it.
// The game tab ends exactly before: {/* TAB: HAREM / GLOBAL LOUNGE */} or before </main>
// I can just use string splitting.
const parts = code.split("{activeTab === 'game' && (");
if (parts.length === 2) {
   let afterGame = parts[1];
   // Find the end of the game block. The block ends right before <main ...> wait, no it is inside <main>...
   // Wait, look at the code: Game tab is inside <main>. So it's followed by </main>
   const split2 = afterGame.split("</main>");
   if (split2.length >= 2) {
      // split2[0] is everything inside game and before main closes.
      // But we have other tabs like profile, gallery etc.
      // Actually, let's just find `</main>` and do a more robust approach.
   }
}

// Alternative approach: Find exact indices
const startIndex = code.indexOf("{activeTab === 'game' && (");
if (startIndex !== -1) {
  // Let's find the closing brace of this block.
  let openBraces = 0;
  let endIndex = -1;
  for (let i = startIndex; i < code.length; i++) {
    if (code[i] === '{') openBraces++;
    if (code[i] === '}') {
      openBraces--;
      if (openBraces === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex !== -1) {
    code = code.substring(0, startIndex) + newGamesTab + code.substring(endIndex + 1);
  }
}

// Write it back
fs.writeFileSync('src/App.tsx', code);
