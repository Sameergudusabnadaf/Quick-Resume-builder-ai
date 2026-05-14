import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1 p-3 bg-slate-100 rounded-2xl rounded-tl-none w-14 mb-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
