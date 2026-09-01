const fs = require('fs');

let code = fs.readFileSync('src/components/VirtualKeyboard.tsx', 'utf8');

// 1. Smooth animation
code = code.replace(
  "transition={{ type: 'spring', damping: 25, stiffness: 200 }}",
  "transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}"
);

// 2. Reduce key height and container height
code = code.replace(/h-12/g, "h-[42px]");
code = code.replace(/h-\[280px\]/g, "h-auto py-1");

// 3. Improve the header / top bar to include inline quick toggles
const oldHeader = `<div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10">`;
const newHeader = `<div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10 bg-black/20">
            <div className="flex items-center space-x-2">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={\`p-1.5 rounded-full transition \${soundEnabled ? 'text-rose-400 bg-rose-400/10' : 'text-white/50'}\`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setHapticsEnabled(!hapticsEnabled)}
                className={\`p-1.5 rounded-full transition \${hapticsEnabled ? 'text-blue-400 bg-blue-400/10' : 'text-white/50'}\`}
              >
                <Vibrate className="w-4 h-4" />
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const themes: ThemeType[] = ['dark-glass', 'carbon', 'midnight'];
                  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
                  setTheme(nextTheme);
                }}
                className="p-1.5 rounded-full text-emerald-400 bg-emerald-400/10"
              >
                <Palette className="w-4 h-4" />
              </motion.button>
              
              {soundEnabled && (
                <select 
                  value={soundStyle} 
                  onChange={(e) => setSoundStyle(e.target.value as SoundStyle)} 
                  className="bg-transparent text-xs text-white/70 outline-none cursor-pointer"
                >
                  <option value="Mechanical" className="text-black">Mech</option>
                  <option value="Soft Click" className="text-black">Soft</option>
                  <option value="Pop" className="text-black">Pop</option>
                </select>
              )}
            </div>`;

code = code.replace(oldHeader, newHeader);

// We need to import Palette and VolumeX from lucide-react
code = code.replace(
  "Delete, X, ArrowUp, Globe, Mic, Smile, Volume2, Vibrate, Search, Settings, \n  ChevronLeft",
  "Delete, X, ArrowUp, Globe, Mic, Smile, Volume2, VolumeX, Vibrate, Search, Settings, \n  ChevronLeft, Palette"
);

// Get rid of the old settings button
code = code.replace(
  `            <motion.button \n              whileTap={{ scale: 0.9 }}\n              onClick={() => setView(view === 'settings' ? 'keyboard' : 'settings')}\n              className="p-2 text-white/70 hover:text-white transition"\n            >\n              {view === 'settings' ? <ChevronLeft className="w-5 h-5" /> : <Settings className="w-5 h-5" />}\n            </motion.button>`,
  ""
);


fs.writeFileSync('src/components/VirtualKeyboard.tsx', code);
console.log("Updated keyboard successfully");
