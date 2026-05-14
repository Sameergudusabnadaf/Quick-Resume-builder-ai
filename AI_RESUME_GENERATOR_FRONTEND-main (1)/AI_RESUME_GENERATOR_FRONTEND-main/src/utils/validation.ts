import { z } from 'zod';

export const schemas = {
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  linkedIn: z.string()
    .url("Must be a valid URL")
    .includes("linkedin.com", { message: "Must be a LinkedIn URL" })
    .optional()
    .or(z.literal("")),
  github: z.string()
    .url("Must be a valid URL")
    .includes("github.com", { message: "Must be a GitHub URL" })
    .optional()
    .or(z.literal("")),
  portfolio: z.string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  summary: z.string()
    .max(500, "Summary must be under 500 characters")
    .optional(),
  skills: z.string().min(3, "Please enter at least one skill"),
  projectName: z.string().min(2, "Project name required"),
  projectDescription: z.string().min(10, "Please provide a description"),
  projectTech: z.string().min(2, "Please list technologies used"),
  jobTitle: z.string().min(2, "Job title required"),
  company: z.string().min(2, "Company name required"),
  startDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Format: MM/YYYY"),
  endDate: z.string().regex(/^((0[1-9]|1[0-2])\/\d{4}|Present)$/, "Format: MM/YYYY or 'Present'"),
  degree: z.string().min(2, "Degree required"),
  institution: z.string().min(2, "Institution required"),
  graduationYear: z.string().regex(/^\d{4}$/, "Enter a valid year"),
};

export type ValidationKey = keyof typeof schemas;
