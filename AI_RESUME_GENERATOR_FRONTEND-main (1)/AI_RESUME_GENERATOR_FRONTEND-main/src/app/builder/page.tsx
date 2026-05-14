'use client';

import ChatPane from '@/components/chatbot/ChatPane';
import ResumePreviewPane from '@/components/preview/ResumePreviewPane';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { useChatStore } from '@/store/chatStore';
import { QUESTIONS } from '@/data/questions';

export default function BuilderPage() {
  const { currentQuestionIndex } = useChatStore();
  const progress = (currentQuestionIndex / QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Mini Navbar */}
      <nav className="h-14 border-b flex items-center px-6 justify-between bg-white z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1 rounded text-white">
            <FileText size={16} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Quick Resume</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden border">
              <div 
                className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content - Split View */}
      <main className="flex-1 flex overflow-hidden">
        {/* Chatbot Pane - 45% on desktop */}
        <div className="w-full lg:w-[45%] h-full">
          <ChatPane />
        </div>

        {/* Resume Preview Pane - 55% on desktop, hidden on mobile */}
        <div className="hidden lg:block lg:w-[55%] h-full">
          <ResumePreviewPane />
        </div>
      </main>
    </div>
  );
}
