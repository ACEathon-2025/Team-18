import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getVariants = (index: number) => {
    const initialOffset = 20;
    let x = 0, y = 0;

    if (direction === 'top') y = -initialOffset;
    if (direction === 'bottom') y = initialOffset;
    if (direction === 'left') x = -initialOffset;
    if (direction === 'right') x = initialOffset;

    return {
      hidden: { opacity: 0, filter: 'blur(8px)', x, y },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
        transition: {
          delay: index * (delay / 1000),
          duration: 0.6,
          ease: [0.17, 0.67, 0.83, 0.67],
        },
      },
    };
  };

  const renderContent = () => {
    if (animateBy === 'words') {
      return text.split(' ').map((word, i) => (
        <motion.span
          key={word + i}
          variants={getVariants(i)}
          className="inline-block mr-1"
          onAnimationComplete={i === text.split(' ').length - 1 ? onAnimationComplete : undefined}
        >
          {word}
        </motion.span>
      ));
    } else {
      return text.split('').map((char, i) => (
        <motion.span
          key={char + i}
          variants={getVariants(i)}
          className="inline-block"
          onAnimationComplete={i === text.split('').length - 1 ? onAnimationComplete : undefined}
        >
          {char}
        </motion.span>
      ));
    }
  };

  return (
    <div className={className}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-wrap"
          >
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlurText;
