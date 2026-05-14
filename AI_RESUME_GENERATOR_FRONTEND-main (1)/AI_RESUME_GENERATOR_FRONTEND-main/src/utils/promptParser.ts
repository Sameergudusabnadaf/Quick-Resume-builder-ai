import { ResumeData, Project, Experience, Education } from '@/types/resume.types';

export const parseMagicPrompt = (prompt: string): Partial<ResumeData> => {
  const data: Partial<ResumeData> = {};
  
  // 1. Extract Email
  const emailMatch = prompt.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) {
    data.email = emailMatch[0];
  }

  // 2. Extract Phone
  const phoneMatch = prompt.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);
  if (phoneMatch) {
    data.phone = phoneMatch[0];
  }

  // 3. Extract Links
  const linkedinMatch = prompt.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i);
  if (linkedinMatch) {
    data.linkedIn = linkedinMatch[0];
  }

  const githubMatch = prompt.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i);
  if (githubMatch) {
    data.github = githubMatch[0];
  }

  // 4. Extract Name
  const nameMatch = prompt.match(/name(?: is)?[:\-]?\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i);
  if (nameMatch && nameMatch[1]) {
    data.fullName = nameMatch[1];
  } else {
    // Fallback: first 2 capitalized words
    const firstWordsMatch = prompt.trim().match(/^([A-Z][a-z]+\s+[A-Z][a-z]+)/);
    if (firstWordsMatch) {
      data.fullName = firstWordsMatch[1];
    }
  }

  // 5. Extract Sections
  // Splits by common keywords. We use a positive lookahead to keep the keyword if needed,
  // but it's easier to just split by it and process in pairs.
  const sectionRegex = /(?:\n|^|\.\s+)(skills?|experience|work history|education|projects?|summary|about me)[:\-\n]/i;
  const parts = prompt.split(sectionRegex);
  
  // parts[0] is usually intro
  if (parts[0] && parts[0].trim().length > 20 && !data.summary) {
     // Check if we haven't already assigned a summary
     // We will assign it later if no 'summary' section is explicitly found
     data.summary = parts[0].trim();
  }

  for (let i = 1; i < parts.length; i += 2) {
    const sectionName = parts[i].toLowerCase();
    const sectionContent = parts[i + 1] ? parts[i + 1].trim() : '';

    if (!sectionContent) continue;

    if (sectionName.includes('skill')) {
      data.skills = sectionContent;
    } else if (sectionName.includes('summary') || sectionName.includes('about')) {
      data.summary = sectionContent;
    } else if (sectionName.includes('experience') || sectionName.includes('work')) {
      const expItem: Experience = {
        jobTitle: 'Professional',
        company: 'Company',
        startDate: '',
        endDate: '',
        responsibilities: sectionContent
      };
      // Try to extract a date range like 2020-2022
      const yearRange = sectionContent.match(/\b(20\d{2})\s*-\s*(20\d{2}|Present)\b/i);
      if (yearRange) {
        expItem.startDate = yearRange[1];
        expItem.endDate = yearRange[2];
      }
      data.experience = [expItem];
    } else if (sectionName.includes('education')) {
      const eduItem: Education = {
        degree: 'Degree',
        institution: 'Institution',
        graduationYear: ''
      };
      const yearMatch = sectionContent.match(/\b(19|20)\d{2}\b/);
      if (yearMatch) eduItem.graduationYear = yearMatch[0];
      data.education = [eduItem];
    } else if (sectionName.includes('project')) {
      const projItem: Project = {
        name: 'Project',
        description: sectionContent,
        tech: ''
      };
      data.projects = [projItem];
    }
  }

  // If no sections were found, and we only have the raw prompt, just dump it into summary
  if (!data.skills && !data.experience && !data.education && !data.projects) {
    // Avoid duplicating if we already set summary
    if (!data.summary || data.summary !== prompt.trim()) {
      data.summary = prompt.trim();
    }
  }

  return data;
};
