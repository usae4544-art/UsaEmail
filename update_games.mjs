import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the old game tab
const gameTabStart = "{activeTab === 'game' && (";

const newGameTab = `{activeTab === 'game' && (
          <div className="space-y-6 pb-20 max-w-2xl mx-auto animate-fadeIn">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                <Flame className="w-8 h-8 text-rose-500" /> Naughty & Romantic Games
              </h2>
              <p className="text-slate-600">Choose a game to spice things up with {activePersonaObj.name}!</p>
            </div>

            {/* Game 1: Romantic Dice */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/50 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Gamepad2 className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Love Dice 🎲</h3>
              </div>
              <p className="text-sm text-slate-600">Roll the dice to see what you must do to her right now.</p>
              
              <div className="bg-rose-50 p-6 rounded-2xl border border-white/50 text-center">
                {/* Dice Logic will be triggered via a new state and button */}
                <button 
                  onClick={() => {
                    const actions = ['Kiss', 'Massage', 'Nibble', 'Lick', 'Whisper to', 'Caress'];
                    const bodyParts = ['the Neck', 'the Lips', 'the Ear', 'the Thighs', 'the Collarbone', 'the Hands'];
                    const action = actions[Math.floor(Math.random() * actions.length)];
                    const part = bodyParts[Math.floor(Math.random() * bodyParts.length)];
                    const result = \`\${action} \${part}\`;
                    alert("Love Dice Result: \\n\\n" + result + "\\n\\nNow tell her you're doing it in the chat!");
                    setActiveTab('chat');
                    setInput(\`*I roll the love dice and get: \${result}* ... I am doing this to you right now...\`);
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-8 rounded-xl shadow-md transition transform hover:scale-105 w-full"
                >
                  Roll The Dice 🎲
                </button>
              </div>
            </div>

            {/* Game 2: Truth or Dare */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/50 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Truth or Dare 🎭</h3>
              </div>
              <p className="text-sm text-slate-600">Let her ask you a naughty truth or give you a romantic dare.</p>
              
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => {
                    setActiveTab('chat');
                    const msg = "Let's play Truth or Dare! I choose TRUTH. Ask me a very naughty or romantic question.";
                    setInput(msg);
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform hover:scale-105"
                >
                  Truth
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('chat');
                    const msg = "Let's play Truth or Dare! I choose DARE. Give me a romantic or naughty dare to do to you right now.";
                    setInput(msg);
                  }}
                  className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform hover:scale-105"
                >
                  Dare
                </button>
              </div>
            </div>

            {/* Game 3: Roleplay Scenarios */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/50 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Roleplay Fantasy 🎬</h3>
              </div>
              <p className="text-sm text-slate-600">Pick a scenario to start a hot roleplay with {activePersonaObj.name}.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {[
                  { title: 'Strangers at Bar', prompt: "Let's roleplay. We are strangers at a dim-lit bar. You are sitting alone, and I just walked up to buy you a drink. Start the scene." },
                  { title: 'Boss & Secretary', prompt: "Let's roleplay. You are my strict but secretly attracted boss, and I am your secretary staying late in the empty office. Start the scene." },
                  { title: 'Doctor & Patient', prompt: "Let's roleplay. You are a very caring and flirty doctor, and I am a patient who came for a 'special' checkup. Start the scene." },
                  { title: 'Caught in Rain', prompt: "Let's roleplay. We got caught in a heavy rainstorm and took shelter in a tiny, dark cabin. We are both shivering and wet. Start the scene." }
                ].map((scenario, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setActiveTab('chat');
                      setInput(scenario.prompt);
                    }}
                    className="bg-white hover:bg-amber-50 text-slate-700 border border-amber-200 font-medium py-3 px-4 rounded-xl shadow-sm transition transform hover:-translate-y-1 text-sm flex items-center justify-between"
                  >
                    <span>{scenario.title}</span>
                    <Flame className="w-4 h-4 text-amber-500" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}`;

// We need to carefully replace the old {activeTab === 'game' && (...)} with the newGameTab
// Let's use a regex to match the block.
// It starts with `{activeTab === 'game' && (` and ends with `)}` before `<footer` or similar.
// Since matching nested blocks with regex is hard, let's look at the actual code around it.

