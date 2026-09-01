import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';

const EMOJIS = ['💋', '🌹', '🍓', '🍑', '🎀', '💍', '🍾', '🧸'];

interface CardData {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const RomanticMatchGame = ({ onWin }: { onWin: () => void }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    setIsLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setMatches((m) => m + 1);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  if (matches === EMOJIS.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-rose-200 text-center shadow-xl relative overflow-hidden my-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1),transparent_70%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <Heart className="w-20 h-20 text-rose-500 mx-auto mb-4 animate-bounce drop-shadow-lg" fill="currentColor" />
        <h2 className="text-3xl font-bold text-rose-900 mb-2">You Won My Heart! 💖</h2>
        <p className="text-rose-700 mb-6 font-medium text-lg">Completed in {moves} moves!</p>
        <button 
          onClick={onWin}
          className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto w-full z-10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Gift className="w-5 h-5 relative z-10" />
          <span className="relative z-10 text-lg">Claim Your Reward</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto my-6">
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-rose-600 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6" fill="currentColor" /> 3D Lovers' Match
        </h2>
        <p className="text-sm text-slate-600 mt-1">Match all pairs to win a special reward!</p>
      </div>

      <div className="flex justify-between w-full mb-6 px-5 bg-white/50 backdrop-blur-md py-3 rounded-2xl border border-rose-200 shadow-sm">
        <div className="text-rose-900 font-bold flex items-center space-x-2">
          <Heart className="w-5 h-5 text-rose-500 animate-pulse" fill="currentColor" />
          <span>{matches} / {EMOJIS.length}</span>
        </div>
        <div className="text-slate-700 font-bold bg-white/50 px-3 py-1 rounded-lg">
          Moves: {moves}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-3 w-full px-2" style={{ perspective: 1000 }}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="aspect-square relative cursor-pointer"
            onClick={() => handleCardClick(index)}
            whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
            whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
          >
            <motion.div
              className="w-full h-full relative"
              initial={false}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card (Hidden when flipped) */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-rose-400 to-fuchsia-500 rounded-2xl shadow-md border border-white/40 flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Sparkles className="w-6 h-6 text-white/60" />
              </div>
              
              {/* Back of card (Revealed when flipped) */}
              <div 
                className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-inner border-2 border-rose-300 flex items-center justify-center text-3xl md:text-4xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {card.emoji}
                {card.isMatched && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0] }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-rose-500/30"
                  >
                    <Heart className="w-16 h-16" fill="currentColor" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <button onClick={startNewGame} className="mt-8 text-sm font-semibold text-slate-500 hover:text-rose-500 transition px-4 py-2 rounded-full hover:bg-rose-50">
        Restart Game
      </button>
    </div>
  );
};
