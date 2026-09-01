import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

const gameToInsert = `
            {/* NEW 3D MATCH GAME */}
            <RomanticMatchGame onWin={() => {
              setActiveTab('chat');
              const msg = "*I won the 3D Lovers' Match game!* Now you have to give me my romantic reward... 🎁";
              setInput(msg);
              handleSend(msg);
            }} />
`;

code = code.replace(
  /<p className="text-slate-600">Choose a game to spice things up with \{activePersonaObj\.name\}!<\/p>\n\s*<\/div>/,
  '<p className="text-slate-600">Choose a game to spice things up with {activePersonaObj.name}!</p>\n            </div>\n' + gameToInsert
);

fs.writeFileSync('src/App.tsx', code);
