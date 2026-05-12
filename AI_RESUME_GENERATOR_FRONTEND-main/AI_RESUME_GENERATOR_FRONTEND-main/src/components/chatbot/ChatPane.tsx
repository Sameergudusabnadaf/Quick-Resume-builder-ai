'use client';

import React from 'react';
import ChatMessageList from './ChatMessageList';
import ChatInputBar from './ChatInputBar';
import { useChatFlow } from '@/hooks/useChatFlow';
import { useChatStore } from '@/store/chatStore';

const ChatPane: React.FC = () => {
  const { messages, currentQuestion, isComplete, processInput } = useChatFlow();
  const { isTyping } = useChatStore();

  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Resume Assistant</h2>
        <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
          {currentQuestion?.section.replace('_', ' ')}
        </div>
      </div>
      
      <ChatMessageList messages={messages} isTyping={isTyping} />
      
      {!isComplete && (
        <ChatInputBar
          placeholder={currentQuestion?.placeholder || "Type your answer..."}
          inputType={currentQuestion?.inputType || "text"}
          onSend={processInput}
          onSkip={() => processInput('skip')}
          showSkip={!currentQuestion?.required}
        />
      )}
      
      {isComplete && (
        <div className="p-4 border-t bg-green-50 text-center">
          <p className="text-sm font-medium text-green-700">All questions answered!</p>
        </div>
      )}
    </div>
  );
};

export default ChatPane;
