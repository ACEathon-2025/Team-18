import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Health is not valued until sickness comes.", author: "Thomas Fuller" },
  { text: "The greatest wealth is health.", author: "Virgil" },
  { text: "To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear.", author: "Buddha" },
  { text: "Your body hears everything your mind says.", author: "Naomi Judd" },
  { text: "A healthy outside starts from the inside.", author: "Robert Urich" },
  { text: "It is health that is real wealth and not pieces of gold and silver.", author: "Mahatma Gandhi" },
  { text: "Healing is a matter of time, but it is sometimes also a matter of opportunity.", author: "Hippocrates" },
  { text: "The groundwork for all happiness is good health.", author: "Leigh Hunt" },
  { text: "Happiness is the highest form of health.", author: "Dalai Lama" },
  { text: "The mind and body are not separate. What affects one, affects the other.", author: "Unknown" },
  { text: "Good health is not something we can buy. However, it can be an extremely valuable savings account.", author: "Anne Wilson Schaef" },
  { text: "Early to bed and early to rise makes a man healthy, wealthy, and wise.", author: "Benjamin Franklin" },
  { text: "Health is a state of complete harmony of the body, mind, and spirit.", author: "B.K.S. Iyengar" },
  { text: "Take care of your body—it’s the only place you have to live in.", author: "Jim Rohn" }
];

const DailyQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, []);

  if (!currentQuote) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            "{currentQuote.text}"
          </p>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            - {currentQuote.author}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DailyQuote;
