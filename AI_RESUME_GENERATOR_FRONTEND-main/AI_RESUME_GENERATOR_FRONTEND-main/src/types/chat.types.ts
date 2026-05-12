import { ResumeData } from "./resume.types";

export type ResumeSection = 
  | "personal" 
  | "summary" 
  | "skills" 
  | "projects" 
  | "experience" 
  | "education" 
  | "certifications";

export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export interface Question {
  id: string;
  section: ResumeSection;
  botMessage: string;
  placeholder: string;
  inputType: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'multiline' | 'confirm';
  required: boolean;
  validationKey?: string;
  skipLabel?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  currentQuestionIndex: number;
  currentSection: ResumeSection;
  isTyping: boolean;
  isComplete: boolean;
}
