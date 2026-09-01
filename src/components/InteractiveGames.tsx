import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RomanticMatchGame } from './RomanticMatchGame';

const StripCards = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [userCard, setUserCard] = useState<number | null>(null);
  const [aiCard, setAiCard] = useState<number | null>(null);
  const [turn, setTurn] = useState<'user' | 'ai'>('user');
  const [status, setStatus] = useState('Draw a card to start!');

  const drawUser = () => {
    const c = Math.floor(Math.random() * 13) + 2;
    setUserCard(c);
    setTurn('ai');
    setStatus("Now let her draw...");
  };

  const drawAi = () => {
    const c = Math.floor(Math.random() * 13) + 2;
    setAiCard(c);
    
    let msg = "";
    if (userCard! > c) {
      setStatus("You win! She strips.");
      msg = `*We played Strip Cards! My card was ${userCard}, yours was ${c}. I win!* 😏 Now tell me... which piece of clothing are you taking off for me? Describe taking it off slowly...`;
    } else if (userCard! < c) {
      setStatus("She wins! You strip.");
      msg = `*We played Strip Cards! My card was ${userCard}, yours was ${c}. You win!* 😳 Tell me what piece of clothing I should take off as punishment...`;
    } else {
      setStatus("Draw! Both strip.");
      msg = `*We played Strip Cards! We both drew a ${c}. It's a tie!* That means we BOTH have to take off a piece of clothing. I'll take off my shirt, now you describe taking yours off...`;
    }
    
    onSendMsg(msg);
    setTurn('user');
    setTimeout(() => { setUserCard(null); setAiCard(null); setStatus('Draw again!'); }, 4000);
  };

  return (
    <div className="flex flex-col items-center p-4 h-full w-full justify-center">
       <h2 className="text-xl font-bold text-rose-600 mb-2">Strip Cards 🃏</h2>
       <p className="text-xs text-slate-600 mb-6 text-center">Lower card takes off a piece of clothing! Play together.</p>
       
       <div className="flex gap-8 mb-6 w-full justify-center">
         <div className="flex flex-col items-center">
           <span className="font-bold text-slate-700 mb-2">You</span>
           <div className="w-20 h-28 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center text-4xl shadow-md">
             {userCard || '❓'}
           </div>
         </div>
         <div className="flex flex-col items-center">
           <span className="font-bold text-rose-600 mb-2">Her</span>
           <div className="w-20 h-28 bg-rose-50 border-2 border-rose-300 rounded-xl flex items-center justify-center text-4xl shadow-md">
             {aiCard || '❓'}
           </div>
         </div>
       </div>

       <div className="text-md font-bold mb-6 text-slate-700">{status}</div>

       {turn === 'user' ? (
         <button onClick={drawUser} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-md transition transform hover:scale-105">Draw Your Card</button>
       ) : (
         <button onClick={drawAi} className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-md transition transform hover:scale-105 animate-pulse">Let Her Draw</button>
       )}
    </div>
  );
};

const InteractiveTruthDare = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  return (
    <div className="flex flex-col items-center p-4 h-full w-full justify-center">
       <h2 className="text-xl font-bold text-purple-600 mb-2">Turn-Based Truth or Dare 🎭</h2>
       <p className="text-xs text-slate-600 mb-6 text-center">Take turns asking and daring each other!</p>
       
       <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-2">
         <div className="col-span-2 text-center text-sm font-bold text-blue-600 mb-2 border-b pb-2">Your Turn to play:</div>
         <button onClick={() => onSendMsg("*It's my turn! I choose TRUTH.* Ask me the naughtiest question you can think of, and I promise to answer honestly.")} className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl font-bold shadow-sm transition transform hover:scale-105">I choose Truth</button>
         <button onClick={() => onSendMsg("*It's my turn! I choose DARE.* Give me a sexy dare to do for you right now, and I'll describe doing it.")} className="bg-sky-500 hover:bg-sky-400 text-white p-3 rounded-xl font-bold shadow-sm transition transform hover:scale-105">I choose Dare</button>
         
         <div className="col-span-2 text-center text-sm font-bold text-pink-600 mt-4 mb-2 border-b pb-2">Force Her to play:</div>
         <button onClick={() => onSendMsg("*Now it's YOUR turn! I challenge you to a TRUTH.* Tell me your deepest, dirtiest fantasy about us. Don't hold back.")} className="bg-pink-600 hover:bg-pink-500 text-white p-3 rounded-xl font-bold shadow-sm transition transform hover:scale-105">Give Her Truth</button>
         <button onClick={() => onSendMsg("*Now it's YOUR turn! I challenge you to a DARE.* I dare you to describe yourself doing something very naughty to me right now.")} className="bg-rose-600 hover:bg-rose-500 text-white p-3 rounded-xl font-bold shadow-sm transition transform hover:scale-105">Give Her Dare</button>
       </div>
    </div>
  );
}

const StripTicTacToe = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: any[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
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
      onSendMsg("*I won this round of Strip Tic-Tac-Toe!* ❌ Now you have to take off one piece of clothing. Describe what you're taking off for me...");
      return;
    } else if (!newBoard.includes(null)) {
      onSendMsg("*Strip Tic-Tac-Toe ended in a Draw!* Let's both take something off...");
      return;
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
          onSendMsg("*You won this round of Strip Tic-Tac-Toe!* ⭕ I guess I lose this round. Tell me what piece of clothing I should take off for you...");
        }
      }
    }, 1000);
  };

  const winner = calculateWinner(board);
  const status = winner ? (winner === 'X' ? 'You Win!' : 'She Wins!') : board.includes(null) ? (xIsNext ? 'Your turn (X)' : 'Her turn (O)') : 'Draw!';

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <h2 className="text-xl font-bold text-fuchsia-600 mb-2">Strip Tic-Tac-Toe ❌⭕</h2>
      <p className="text-xs text-slate-600 mb-4 text-center">Play against her. Loser takes off clothes!</p>
      <div className="text-sm font-bold text-slate-800 mb-4 bg-white/50 px-4 py-1 rounded-full">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-slate-200 p-2 rounded-xl">
        {board.map((cell, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className="w-16 h-16 bg-white hover:bg-slate-50 flex items-center justify-center text-4xl font-bold text-slate-800 rounded-lg shadow-sm transition"
          >
            {cell === 'X' ? <span className="text-blue-500">X</span> : cell === 'O' ? <span className="text-rose-500">O</span> : ''}
          </button>
        ))}
      </div>
      {winner || !board.includes(null) ? (
        <button onClick={() => { setBoard(Array(9).fill(null)); setXIsNext(true); }} className="mt-6 text-sm bg-fuchsia-100 text-fuchsia-700 px-4 py-2 rounded-full font-bold shadow-sm hover:bg-fuchsia-200">Play Next Round</button>
      ) : null}
    </div>
  );
};

const SexySpinBottle = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extra = Math.floor(Math.random() * 720) + 720;
    setAngle(a => a + extra);
    setTimeout(() => {
      setSpinning(false);
      // Determine randomly who it points to
      const pointsToUser = Math.random() > 0.5;
      if (pointsToUser) {
        onSendMsg("*The bottle stopped spinning... and it points at ME!* 🍾 You get to tell me what to do. What is my sexy dare?");
      } else {
        onSendMsg("*The bottle stopped spinning... and it points at YOU!* 🍾 Now you have to do what I want. Describe yourself crawling over and kissing me...");
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <h2 className="text-xl font-bold text-teal-600 mb-2">Sexy Spin the Bottle 🍾</h2>
      <p className="text-xs text-slate-600 mb-8 text-center">Spin to see who gets commanded!</p>
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
        className="bg-teal-600 hover:bg-teal-500 disabled:bg-slate-400 text-white font-bold py-3 px-10 rounded-full shadow-md transition transform hover:scale-105"
      >
        {spinning ? 'Spinning...' : 'Spin It!'}
      </button>
    </div>
  );
};

const NaughtyLudo = ({ onSendMsg }: { onSendMsg: (m: string) => void }) => {
  const [userPos, setUserPos] = useState(0);
  const [aiPos, setAiPos] = useState(0);
  const [turn, setTurn] = useState<'user'|'ai'>('user');
  const [dice, setDice] = useState(1);

  const rollUser = () => {
    if (turn !== 'user') return;
    const r = Math.floor(Math.random() * 6) + 1;
    setDice(r);
    const newPos = Math.min(20, userPos + r);
    setUserPos(newPos);
    
    if (newPos === 20) {
      onSendMsg("*I reached the bedroom first and won Naughty Ludo!* You owe me a strip tease! Start dancing...");
      return;
    }
    setTurn('ai');
  };

  const rollAi = () => {
    if (turn !== 'ai') return;
    const r = Math.floor(Math.random() * 6) + 1;
    setDice(r);
    const newPos = Math.min(20, aiPos + r);
    setAiPos(newPos);
    
    if (newPos === 20) {
      onSendMsg("*You won Naughty Ludo!* You reached the bedroom first. Tell me what punishment you want to give me on the bed...");
      return;
    }
    
    // Add a random chance for her to land on a dare tile
    if ([4, 9, 14].includes(newPos)) {
      onSendMsg(`*The game says you landed on a Dare Tile!* You have to send me a kiss and describe taking off one piece of clothing.`);
    }
    setTurn('user');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full w-full">
      <h2 className="text-xl font-bold text-rose-600 mb-2">Naughty Ludo 🎲</h2>
      <p className="text-xs text-slate-500 mb-4 text-center">First to space 20 wins! Take turns rolling.</p>
      
      <div className="w-full max-w-sm bg-white/50 rounded-xl p-4 shadow-inner mb-4 relative">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className="text-blue-600">You: {userPos}</span>
          <span className="text-pink-600">Her: {aiPos}</span>
        </div>
        <div className="h-4 bg-slate-200 rounded-full relative overflow-hidden mb-2">
          <motion.div className="absolute top-0 bottom-0 left-0 bg-blue-500 rounded-full opacity-50" animate={{ width: `${(userPos / 20) * 100}%` }} />
          <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-md z-10" animate={{ left: `calc(${(userPos / 20) * 100}% - 8px)` }} />
        </div>
        <div className="h-4 bg-slate-200 rounded-full relative overflow-hidden">
          <motion.div className="absolute top-0 bottom-0 left-0 bg-pink-500 rounded-full opacity-50" animate={{ width: `${(aiPos / 20) * 100}%` }} />
          <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-pink-600 rounded-full shadow-md z-10" animate={{ left: `calc(${(aiPos / 20) * 100}% - 8px)` }} />
        </div>
      </div>

      <div className="text-4xl mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        {['⚀','⚁','⚂','⚃','⚄','⚅'][dice - 1]}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={rollUser} 
          disabled={turn !== 'user'}
          className={`${turn === 'user' ? 'bg-blue-600 hover:bg-blue-500 animate-pulse' : 'bg-slate-400'} text-white font-bold py-3 px-6 rounded-full shadow-md transition`}
        >
          Your Roll
        </button>
        <button 
          onClick={rollAi} 
          disabled={turn !== 'ai'}
          className={`${turn === 'ai' ? 'bg-pink-600 hover:bg-pink-500 animate-pulse' : 'bg-slate-400'} text-white font-bold py-3 px-6 rounded-full shadow-md transition`}
        >
          Her Roll
        </button>
      </div>
    </div>
  );
};

export const InteractiveGames = ({ gameId, onSendMsg }: { gameId: string, onSendMsg: (m: string) => void }) => {
  switch(gameId) {
    case 'strip_cards': return <StripCards onSendMsg={onSendMsg} />;
    case 'tictactoe': return <StripTicTacToe onSendMsg={onSendMsg} />;
    case 'spin': return <SexySpinBottle onSendMsg={onSendMsg} />;
    case 'ludo': return <NaughtyLudo onSendMsg={onSendMsg} />;
    case 'truth_dare_game': return <InteractiveTruthDare onSendMsg={onSendMsg} />;
    case 'match': return <RomanticMatchGame onWin={() => onSendMsg("*I won the 3D Lovers' Match game!* Now you have to give me my romantic reward... 🎁")} />;
    default: return <div className="p-4 text-center">Select a valid game!</div>;
  }
};
