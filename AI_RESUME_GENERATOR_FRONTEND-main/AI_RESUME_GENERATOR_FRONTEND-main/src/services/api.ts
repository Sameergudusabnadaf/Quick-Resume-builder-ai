import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const resumeService = {
  generatePDF: async (resumeData: any) => {
    // Transform frontend ResumeData to backend format if needed
    const backendData = {
      contact: {
        name: resumeData.fullName,
        email: resumeData.email,
        phone: resumeData.phone,
        linkedin: resumeData.linkedIn,
        github: resumeData.github,
      },
      summary: resumeData.summary,
      skills: resumeData.skills.split(',').map((s: string) => s.trim()),
      experience: resumeData.experience.map((exp: any) => ({
        job_title: exp.jobTitle,
        company: exp.company,
        start_date: exp.startDate,
        end_date: exp.endDate,
        description: exp.responsibilities,
      })),
      projects: resumeData.projects.map((proj: any) => ({
        title: proj.name,
        description: proj.description,
        technologies: proj.tech.split(',').map((t: string) => t.trim()),
      })),
      education: resumeData.education.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        year: edu.graduationYear,
      })),
    };

    return apiClient.post('/resume/direct-generate', backendData, {
      responseType: 'blob',
    });
  },
};
