import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat.types';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import TypingIndicator from './TypingIndicator';
import { useAutoScroll } from '@/hooks/useAutoScroll';

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isTyping: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isTyping }) => {
  const scrollRef = useAutoScroll(messages.length + (isTyping ? 1 : 0));

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
      {messages.map((msg) => (
        msg.role === 'bot' ? (
          <BotMessage key={msg.id} content={msg.content} />
        ) : (
          <UserMessage key={msg.id} content={msg.content} />
        )
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessageList;
