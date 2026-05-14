import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ResumeData } from '@/types/resume.types';

interface ResumeStore {
  resumeData: ResumeData;
  setResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
}

const initialResumeData: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  skills: '',
  projects: [],
  experience: [],
  education: [],
  certifications: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      setResumeData: (data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, ...data },
        })),
      resetResumeData: () => set({ resumeData: initialResumeData }),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
