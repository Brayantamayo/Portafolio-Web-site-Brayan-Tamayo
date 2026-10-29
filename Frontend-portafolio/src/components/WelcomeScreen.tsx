import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    onComplete?.();
  };

  useEffect(() => {
    // Keyboard dismiss (Enter, Space, Escape)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Let the short text reveal finish before automatically showing the page.
    const timer = setTimeout(() => {
      handleDismiss();
    }, 1250);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  // Words structured to keep responsive wrapping clean
  const words = [
    { word: 'Bienvenido', isGradient: false },
    { word: 'a', isGradient: false },
    { word: 'mi', isGradient: false },
    { word: 'portafolio', isGradient: true },
    { word: 'web', isGradient: true },
  ];

  // Calculate global character index for a smooth, continuous typewriter-like stagger
  let globalCharIndex = 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-slow-reveal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black select-none cursor-pointer overflow-hidden px-6"
        >
          {/* Subtle soft ambient center glow on pure black */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 65%)',
            }}
          />

          {/* Typography container: smaller, elegant, slow reveal */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-light tracking-wider leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              {words.map((item, wordIdx) => {
                return (
                  <span key={wordIdx} className="inline-flex whitespace-nowrap">
                    {item.word.split('').map((char, charIdx) => {
                      const currentDelay = 0.1 + globalCharIndex * 0.025;
                      globalCharIndex++;

                      return (
                        <motion.span
                          key={charIdx}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: currentDelay,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`inline-block ${
                            item.isGradient
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 font-normal drop-shadow-[0_0_18px_rgba(59,130,246,0.45)]'
                              : 'text-slate-200'
                          }`}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>

            {/* Slow, delicate hairline progress line that reveals once the text finishes appearing */}
            <div className="relative w-36 sm:w-56 h-[1px] bg-slate-900 rounded-full overflow-hidden mt-6">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-blue-500 shadow-[0_0_10px_#38bdf8]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
