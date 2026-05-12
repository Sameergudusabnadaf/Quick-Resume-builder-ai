import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface BotMessageProps {
  content: string;
}

const BotMessage: React.FC<BotMessageProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-2 mb-4"
    >
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Bot size={18} className="text-slate-600" />
      </div>
      <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm leading-relaxed shadow-sm">
        {content}
      </div>
    </motion.div>
  );
};

export default BotMessage;
