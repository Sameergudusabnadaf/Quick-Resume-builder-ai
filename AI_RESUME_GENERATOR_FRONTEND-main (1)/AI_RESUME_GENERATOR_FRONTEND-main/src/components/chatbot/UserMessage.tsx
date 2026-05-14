import React from 'react';
import { motion } from 'framer-motion';

interface UserMessageProps {
  content: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex justify-end mb-4"
    >
      <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm leading-relaxed shadow-sm">
        {content}
      </div>
    </motion.div>
  );
};

export default UserMessage;
