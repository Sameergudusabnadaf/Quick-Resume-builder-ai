export interface Project {
  name: string;
  description: string;
  tech: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string; // newline-separated
}

export interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
  gradeOrCGPA?: string;
}

export interface Certification {
  name: string;
  issuingBody: string;
  year: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  summary?: string;
  skills: string; // comma-separated
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}
