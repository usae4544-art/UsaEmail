import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the GAMES_LIST to have the correct IDs mapping to the new interactive ones
code = code.replace(
  "{ id: 'truth_dare', name: 'Truth or Dare', icon: '🎭', type: 'chat', prompt: \"Let's play Truth or Dare! I choose Truth. Ask me a naughty question.\" },",
  "{ id: 'truth_dare_game', name: 'Truth or Dare', icon: '🎭', type: 'interactive', desc: 'Turn-based sexy game.' },\n  { id: 'strip_cards', name: 'Strip Cards', icon: '🃏', type: 'interactive', desc: 'Draw higher to win.' },"
);

fs.writeFileSync('src/App.tsx', code);
