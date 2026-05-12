import { create } from 'zustand';
import { ChatMessage, ChatState, ResumeSection } from '@/types/chat.types';

interface ChatStore extends ChatState {
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setTyping: (isTyping: boolean) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setCurrentSection: (section: ResumeSection) => void;
  setComplete: (isComplete: boolean) => void;
  resetChat: () => void;
}

const initialState: ChatState = {
  messages: [],
  currentQuestionIndex: 0,
  currentSection: 'personal',
  isTyping: false,
  isComplete: false,
};

export const useChatStore = create<ChatStore>((set) => ({
  ...initialState,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date(),
        },
      ],
    })),
  setTyping: (isTyping) => set({ isTyping }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setComplete: (isComplete) => set({ isComplete }),
  resetChat: () => set(initialState),
}));
