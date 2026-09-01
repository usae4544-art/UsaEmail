import fs from 'fs';

const gamesCode = `import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RomanticMatchGame } from './RomanticMatchGame';

const NaughtyLudo = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [userPos, setUserPos] = useState(0);
  const [aiPos, setAiPos] = useState(0);
  const [turn, setTurn] = useState('user');
  const [dice, setDice] = useState(1);

  const roll = () => {
    if (turn !== 'user') return;
    const r = Math.floor(Math.random() * 6) + 1;
    setDice(r);
    const newPos = Math.min(20, userPos + r);
    setUserPos(newPos);
    
    if (newPos === 20) {
      onSendMsg("*I reached the bedroom first and won Naughty Ludo!* You owe me a strip tease!");
      return;
    }
    if ([5, 10, 15].includes(newPos)) {
      onSendMsg(\`*I landed on a Dare Tile (space \${newPos}) in Ludo!*\`);
    }

    setTurn('ai');
    setTimeout(() => {
      const ar = Math.floor(Math.random() * 6) + 1;
      setDice(ar);
      const aiNewPos = Math.min(20, aiPos + ar);
      setAiPos(aiNewPos);
      if (aiNewPos === 20) {
        onSendMsg("*You won Naughty Ludo!* Tell me what punishment you want to give me...");
      }
      setTurn('user');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full w-full">
      <h2 className="text-xl font-bold text-rose-600 mb-2">Naughty Ludo 🎲</h2>
      <p className="text-xs text-slate-500 mb-4">First to space 20 wins! Watch out for Dare tiles (5, 10, 15).</p>
      
      <div className="w-full max-w-sm bg-white/50 rounded-xl p-4 shadow-inner mb-4 relative">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className="text-blue-600">You: {userPos}</span>
          <span className="text-pink-600">Her: {aiPos}</span>
        </div>
        <div className="h-4 bg-slate-200 rounded-full relative overflow-hidden mb-2">
          <motion.div className="absolute top-0 bottom-0 left-0 bg-blue-500 rounded-full opacity-50" animate={{ width: \`\${(userPos / 20) * 100}%\` }} />
          <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-md z-10" animate={{ left: \`calc(\${(userPos / 20) * 100}% - 8px)\` }} />
        </div>
        <div className="h-4 bg-slate-200 rounded-full relative overflow-hidden">
          <motion.div className="absolute top-0 bottom-0 left-0 bg-pink-500 rounded-full opacity-50" animate={{ width: \`\${(aiPos / 20) * 100}%\` }} />
          <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-pink-600 rounded-full shadow-md z-10" animate={{ left: \`calc(\${(aiPos / 20) * 100}% - 8px)\` }} />
        </div>
      </div>

      <div className="text-4xl mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        {['⚀','⚁','⚂','⚃','⚄','⚅'][dice - 1]}
      </div>

      <button 
        onClick={roll} 
        disabled={turn !== 'user'}
        className="bg-rose-600 hover:bg-rose-500 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
      >
        {turn === 'user' ? 'Roll Dice' : 'Her Turn...'}
      </button>
    </div>
  );
};

const RomanticCarrom = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [score, setScore] = useState(0);
  const [isStriking, setIsStriking] = useState(false);
  const [lastShot, setLastShot] = useState('Flick to play!');

  const strike = () => {
    setIsStriking(true);
    setLastShot('Striking...');
    setTimeout(() => {
      setIsStriking(false);
      const outcomes = [
        { msg: "Black Coin (+10)", pts: 10, chat: null },
        { msg: "Black Coin (+10)", pts: 10, chat: null },
        { msg: "White Coin (+20)", pts: 20, chat: null },
        { msg: "White Coin (+20)", pts: 20, chat: null },
        { msg: "Queen (+50)", pts: 50, chat: "*I pocketed the Queen in Carrom!* I demand a romantic reward!" },
        { msg: "Foul (-10)", pts: -10, chat: "*Oops, Foul!* You can spank me as punishment!" }
      ];
      const res = outcomes[Math.floor(Math.random() * outcomes.length)];
      setScore(s => s + res.pts);
      setLastShot(res.msg);
      if (res.chat) {
        onSendMsg(res.chat);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <h2 className="text-xl font-bold text-amber-700 mb-2">Romantic Carrom 🎯</h2>
      <div className="text-lg font-bold text-slate-700 mb-4">Score: {score}</div>
      
      <div className="w-48 h-48 bg-amber-100 border-8 border-amber-800 rounded-lg relative shadow-xl mb-6 flex items-center justify-center overflow-hidden">
        <div className="absolute w-8 h-8 rounded-full border-2 border-red-500 opacity-20" />
        <motion.div 
          animate={isStriking ? { y: [50, -100, 0], scale: [1, 0.8, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="w-6 h-6 bg-blue-600 rounded-full absolute bottom-4 shadow-sm border-2 border-white"
        />
        <div className="text-amber-900 font-bold opacity-50">{lastShot}</div>
      </div>

      <button 
        onClick={strike} 
        disabled={isStriking}
        className="bg-amber-600 hover:bg-amber-500 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
      >
        Flick Striker
      </button>
    </div>
  );
};

const StripTicTacToe = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: any[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i] || !xIsNext) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setXIsNext(false);

    if (calculateWinner(newBoard) === 'X') {
      onSendMsg("*I won Strip Tic-Tac-Toe!* Take one piece of clothing off right now! 😏");
      return;
    } else if (!newBoard.includes(null)) {
      return; // Draw
    }

    // AI Move
    setTimeout(() => {
      const aiBoard = [...newBoard];
      const emptyIndices = aiBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      if (emptyIndices.length > 0) {
        const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        aiBoard[randomIdx as number] = 'O';
        setBoard(aiBoard);
        setXIsNext(true);
        if (calculateWinner(aiBoard) === 'O') {
          onSendMsg("*You won Strip Tic-Tac-Toe!* I guess I have to take something off... 😳");
        }
      }
    }, 1000);
  };

  const winner = calculateWinner(board);
  const status = winner ? \`Winner: \${winner}\` : board.includes(null) ? (xIsNext ? 'Your turn (X)' : 'Her turn (O)') : 'Draw!';

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <h2 className="text-xl font-bold text-fuchsia-600 mb-2">Strip Tic-Tac-Toe ❌</h2>
      <div className="text-sm font-bold text-slate-600 mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-slate-200 p-2 rounded-xl">
        {board.map((cell, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className="w-16 h-16 bg-white flex items-center justify-center text-3xl font-bold text-slate-800 rounded-lg shadow-sm"
          >
            {cell}
          </button>
        ))}
      </div>
      {winner || !board.includes(null) ? (
        <button onClick={() => { setBoard(Array(9).fill(null)); setXIsNext(true); }} className="mt-6 text-sm text-fuchsia-600 underline">Play Again</button>
      ) : null}
    </div>
  );
};

const SpinBottle = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extra = Math.floor(Math.random() * 720) + 720;
    setAngle(a => a + extra);
    setTimeout(() => {
      setSpinning(false);
      onSendMsg("*The bottle stopped spinning and points at YOU!* Truth, Dare, or Kiss? 🍾");
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <h2 className="text-xl font-bold text-teal-600 mb-8">Spin the Bottle 🍾</h2>
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-teal-200 animate-[spin_10s_linear_infinite]" />
        <motion.div
          animate={{ rotate: angle }}
          transition={{ duration: 3, type: "spring", stiffness: 50, damping: 20 }}
          className="text-6xl drop-shadow-lg origin-center"
        >
          🍾
        </motion.div>
      </div>
      <button 
        onClick={spin}
        disabled={spinning}
        className="bg-teal-600 hover:bg-teal-500 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
      >
        Spin It!
      </button>
    </div>
  );
};

const LoveDice = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [result, setResult] = useState('Roll to find out!');
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      const actions = ['Kiss', 'Massage', 'Nibble on', 'Lick', 'Whisper to', 'Caress', 'Bite'];
      const bodyParts = ['the Neck', 'the Lips', 'the Ear', 'the Thighs', 'the Collarbone', 'the Hands'];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const part = bodyParts[Math.floor(Math.random() * bodyParts.length)];
      const r = \`\${action} \${part}\`;
      setResult(r);
      onSendMsg(\`*I roll the love dice and get: \${r}* ... I am doing this to you right now...\`);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <h2 className="text-xl font-bold text-rose-600 mb-8">Love Dice 🧊</h2>
      <motion.div 
        animate={rolling ? { rotate: [0, 180, 360], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: rolling ? Infinity : 0 }}
        className="text-6xl mb-6 flex gap-2"
      >
        <span>🎲</span><span>🎲</span>
      </motion.div>
      <div className="text-lg font-bold text-rose-800 mb-8 h-8 text-center">{!rolling && result !== 'Roll to find out!' ? result : ''}</div>
      <button 
        onClick={roll}
        disabled={rolling}
        className="bg-rose-600 hover:bg-rose-500 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:scale-105"
      >
        Roll Dice
      </button>
    </div>
  );
};

export const InteractiveGames = ({ gameId, onSendMsg }: { gameId: string, onSendMsg: (m: string) => void }) => {
  switch(gameId) {
    case 'ludo': return <NaughtyLudo onSendMsg={onSendMsg} />;
    case 'carrom': return <RomanticCarrom onSendMsg={onSendMsg} />;
    case 'tictactoe': return <StripTicTacToe onSendMsg={onSendMsg} />;
    case 'spin': return <SpinBottle onSendMsg={onSendMsg} />;
    case 'dice': return <LoveDice onSendMsg={onSendMsg} />;
    case 'match': return <RomanticMatchGame onWin={() => onSendMsg("*I won the 3D Lovers' Match game!* Now you have to give me my romantic reward... 🎁")} />;
    default: return <div className="p-4 text-center">Select a valid game!</div>;
  }
};
`
fs.writeFileSync('src/components/InteractiveGames.tsx', gamesCode);
