import { useEffect, useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useResumeStore } from '@/store/resumeStore';
import { QUESTIONS } from '@/data/questions';
import { schemas, ValidationKey } from '@/utils/validation';
import { sleep } from '@/utils/sleep';
import { Project, Experience, Education, Certification } from '@/types/resume.types';

export const useChatFlow = () => {
  const {
    messages,
    currentQuestionIndex,
    isComplete,
    addMessage,
    setTyping,
    setCurrentQuestionIndex,
    setCurrentSection,
    setComplete,
  } = useChatStore();

  const { resumeData, setResumeData } = useResumeStore();

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Initialize chat with the first question
  useEffect(() => {
    if (messages.length === 0) {
      const startChat = async () => {
        setTyping(true);
        await sleep(1000);
        addMessage({
          role: 'bot',
          content: QUESTIONS[0].botMessage,
        });
        setTyping(false);
      };
      startChat();
    }
  }, [messages.length, addMessage, setTyping]);

  const handleNextQuestion = useCallback(async (nextIndex: number) => {
    if (nextIndex >= QUESTIONS.length) {
      setTyping(true);
      await sleep(1000);
      addMessage({
        role: 'bot',
        content: "🎉 Your resume is ready! You can review it on the right and click **Download PDF** to save it.",
      });
      setTyping(false);
      setComplete(true);
      return;
    }

    const nextQ = QUESTIONS[nextIndex];
    setCurrentQuestionIndex(nextIndex);
    setCurrentSection(nextQ.section);

    setTyping(true);
    await sleep(800);
    addMessage({
      role: 'bot',
      content: nextQ.botMessage,
    });
    setTyping(false);
  }, [addMessage, setCurrentQuestionIndex, setCurrentSection, setComplete, setTyping]);

  const processInput = useCallback(async (input: string) => {
    const trimmedInput = input.trim();
    const isSkip = trimmedInput.toLowerCase() === 'skip' && !currentQuestion.required;

    // 1. Add user message
    addMessage({
      role: 'user',
      content: trimmedInput,
    });

    // 2. Validate (if not skipping)
    if (!isSkip && currentQuestion.validationKey) {
      const schema = schemas[currentQuestion.validationKey as ValidationKey];
      if (schema) {
        const result = schema.safeParse(trimmedInput);
        if (!result.success) {
          setTyping(true);
          await sleep(600);
          addMessage({
            role: 'bot',
            content: `Hmm, that doesn't look right. ${result.error.issues[0].message}. Please try again.`,
          });
          setTyping(false);
          return;
        }
      }
    }

    // 3. Update Resume Data
    if (isSkip) {
      // Logic for skip (if needed, usually just moving to next)
    } else {
      updateResumeData(currentQuestion.id, trimmedInput);
    }

    // 4. Determine next question (handling loops)
    let nextIndex = currentQuestionIndex + 1;

    // Handle Repeat Logic
    if (currentQuestion.inputType === 'confirm') {
      const answer = trimmedInput.toLowerCase();
      const isYes = answer === 'yes' || answer === 'y';

      if (currentQuestion.id === 'project_repeat') {
        if (isYes) nextIndex = QUESTIONS.findIndex(q => q.id === 'project_name');
      } else if (currentQuestion.id === 'has_experience') {
        if (!isYes) nextIndex = QUESTIONS.findIndex(q => q.id === 'edu_degree');
      } else if (currentQuestion.id === 'exp_repeat') {
        if (isYes) nextIndex = QUESTIONS.findIndex(q => q.id === 'exp_title');
      } else if (currentQuestion.id === 'edu_repeat') {
        if (isYes) nextIndex = QUESTIONS.findIndex(q => q.id === 'edu_degree');
      } else if (currentQuestion.id === 'has_certs') {
        if (!isYes) nextIndex = QUESTIONS.length; // End of questions
      } else if (currentQuestion.id === 'cert_repeat') {
        if (isYes) nextIndex = QUESTIONS.findIndex(q => q.id === 'cert_name');
        else nextIndex = QUESTIONS.length; // End
      }
    }

    await handleNextQuestion(nextIndex);
  }, [addMessage, currentQuestion, currentQuestionIndex, handleNextQuestion, setTyping]);

  const updateResumeData = (id: string, value: string) => {
    switch (id) {
      case 'full_name': setResumeData({ fullName: value }); break;
      case 'email': setResumeData({ email: value }); break;
      case 'phone': setResumeData({ phone: value }); break;
      case 'linkedin': setResumeData({ linkedIn: value }); break;
      case 'github': setResumeData({ github: value }); break;
      case 'portfolio': setResumeData({ portfolio: value }); break;
      case 'summary': setResumeData({ summary: value }); break;
      case 'skills': setResumeData({ skills: value }); break;
      
      // Projects
      case 'project_name': 
        const newProject: Project = { name: value, description: '', tech: '' };
        setResumeData({ projects: [...resumeData.projects, newProject] });
        break;
      case 'project_description':
        const lastProjDesc = [...resumeData.projects];
        lastProjDesc[lastProjDesc.length - 1].description = value;
        setResumeData({ projects: lastProjDesc });
        break;
      case 'project_tech':
        const lastProjTech = [...resumeData.projects];
        lastProjTech[lastProjTech.length - 1].tech = value;
        setResumeData({ projects: lastProjTech });
        break;
      case 'project_github':
        const lastProjGit = [...resumeData.projects];
        lastProjGit[lastProjGit.length - 1].githubUrl = value;
        setResumeData({ projects: lastProjGit });
        break;
      case 'project_live':
        const lastProjLive = [...resumeData.projects];
        lastProjLive[lastProjLive.length - 1].liveUrl = value;
        setResumeData({ projects: lastProjLive });
        break;

      // Experience
      case 'exp_title':
        const newExp: Experience = { jobTitle: value, company: '', startDate: '', endDate: '', responsibilities: '' };
        setResumeData({ experience: [...resumeData.experience, newExp] });
        break;
      case 'exp_company':
        const lastExpComp = [...resumeData.experience];
        lastExpComp[lastExpComp.length - 1].company = value;
        setResumeData({ experience: lastExpComp });
        break;
      case 'exp_start_date':
        const lastExpStart = [...resumeData.experience];
        lastExpStart[lastExpStart.length - 1].startDate = value;
        setResumeData({ experience: lastExpStart });
        break;
      case 'exp_end_date':
        const lastExpEnd = [...resumeData.experience];
        lastExpEnd[lastExpEnd.length - 1].endDate = value;
        setResumeData({ experience: lastExpEnd });
        break;
      case 'exp_responsibilities':
        const lastExpResp = [...resumeData.experience];
        lastExpResp[lastExpResp.length - 1].responsibilities = value;
        setResumeData({ experience: lastExpResp });
        break;

      // Education
      case 'edu_degree':
        const newEdu: Education = { degree: value, institution: '', graduationYear: '' };
        setResumeData({ education: [...resumeData.education, newEdu] });
        break;
      case 'edu_institution':
        const lastEduInst = [...resumeData.education];
        lastEduInst[lastEduInst.length - 1].institution = value;
        setResumeData({ education: lastEduInst });
        break;
      case 'edu_year':
        const lastEduYear = [...resumeData.education];
        lastEduYear[lastEduYear.length - 1].graduationYear = value;
        setResumeData({ education: lastEduYear });
        break;
      case 'edu_grade':
        const lastEduGrade = [...resumeData.education];
        lastEduGrade[lastEduGrade.length - 1].gradeOrCGPA = value;
        setResumeData({ education: lastEduGrade });
        break;

      // Certifications
      case 'cert_name':
        const newCert: Certification = { name: value, issuingBody: '', year: '' };
        setResumeData({ certifications: [...resumeData.certifications, newCert] });
        break;
      case 'cert_issuer':
        const lastCertIss = [...resumeData.certifications];
        lastCertIss[lastCertIss.length - 1].issuingBody = value;
        setResumeData({ certifications: lastCertIss });
        break;
      case 'cert_year':
        const lastCertYear = [...resumeData.certifications];
        lastCertYear[lastCertYear.length - 1].year = value;
        setResumeData({ certifications: lastCertYear });
        break;
    }
  };

  return {
    messages,
    currentQuestion,
    isComplete,
    processInput,
  };
};
