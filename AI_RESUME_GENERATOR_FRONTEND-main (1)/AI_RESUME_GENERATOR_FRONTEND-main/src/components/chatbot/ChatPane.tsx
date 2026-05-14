'use client';

import React, { useState } from 'react';
import ChatMessageList from './ChatMessageList';
import ChatInputBar from './ChatInputBar';
import { useChatFlow } from '@/hooks/useChatFlow';
import { useChatStore } from '@/store/chatStore';
import { useResumeStore } from '@/store/resumeStore';
import { parseMagicPrompt } from '@/utils/promptParser';
import { Wand2, ListChecks } from 'lucide-react';

const ChatPane: React.FC = () => {
  const { messages, currentQuestion, isComplete, processInput } = useChatFlow();
  const { isTyping, setComplete, addMessage } = useChatStore();
  const { setResumeData } = useResumeStore();
  const [isMagicMode, setIsMagicMode] = useState(false);
  const [magicPrompt, setMagicPrompt] = useState('');

  const handleMagicSubmit = () => {
    if (!magicPrompt.trim()) return;

    // Show processing message
    addMessage({ role: 'user', content: magicPrompt });
    
    // Process heuristic parsing
    const parsedData = parseMagicPrompt(magicPrompt);
    setResumeData(parsedData);
    
    // Complete the flow
    setComplete(true);
    addMessage({
      role: 'bot',
      content: '✨ I have magically extracted your details! Please review your generated resume on the right.'
    });
    setMagicPrompt('');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Resume Assistant</h2>
        
        {/* Mode Toggle */}
        <div className="flex bg-white border rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setIsMagicMode(false)}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              !isMagicMode ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ListChecks size={14} /> Wizard
          </button>
          <button
            onClick={() => setIsMagicMode(true)}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              isMagicMode ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Wand2 size={14} /> Magic Prompt
          </button>
        </div>
      </div>
      
      {!isMagicMode ? (
        <>
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
        </>
      ) : (
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-indigo-800 mb-2">
              <Wand2 size={18} /> ChatGPT-Style Resume Builder
            </h3>
            <p className="text-sm text-indigo-700">
              Paste your entire resume details below in a single paragraph. I will use smart rules to extract your Name, Email, Phone, Skills, Experience, Projects, and Education instantly!
            </p>
          </div>
          
          <textarea
            className="flex-1 w-full border border-slate-300 rounded-lg p-4 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none font-sans text-sm mb-4 shadow-sm"
            placeholder="E.g., My name is John Doe. My email is john@example.com. Skills: React, Node.js, Python. Experience: Worked as a Software Engineer at Tech Corp..."
            value={magicPrompt}
            onChange={(e) => setMagicPrompt(e.target.value)}
          />
          
          <button
            onClick={handleMagicSubmit}
            disabled={!magicPrompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Wand2 size={18} /> Generate Resume
          </button>
        </div>
      )}
      
      {isComplete && !isMagicMode && (
        <div className="p-4 border-t bg-green-50 text-center">
          <p className="text-sm font-medium text-green-700">All questions answered!</p>
        </div>
      )}
    </div>
  );
};

export default ChatPane;
