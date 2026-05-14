import React from 'react';
import { ResumeData } from '@/types/resume.types';

interface ResumeDocumentProps {
  data: ResumeData;
}

const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  return (
    <div className="bg-white p-[20mm] min-h-[297mm] w-full max-w-[210mm] mx-auto shadow-sm text-[#000] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase mb-2 tracking-tight">
          {data.fullName || 'Your Name'}
        </h1>
        <div className="text-xs flex flex-wrap justify-center gap-x-2 gap-y-1">
          {data.email && <span>{data.email}</span>}
          {data.phone && (
            <>
              <span className="text-slate-300">|</span>
              <span>{data.phone}</span>
            </>
          )}
          {data.linkedIn && (
            <>
              <span className="text-slate-300">|</span>
              <a href={data.linkedIn} className="text-blue-700 underline">LinkedIn</a>
            </>
          )}
          {data.github && (
            <>
              <span className="text-slate-300">|</span>
              <a href={data.github} className="text-blue-700 underline">GitHub</a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[2px] border-b border-black mb-2 pb-1">Summary</h2>
          <p className="text-[11px] leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[2px] border-b border-black mb-2 pb-1">Skills</h2>
          <p className="text-[11px] leading-relaxed">
            {data.skills.split(',').map((skill, i) => (
              <span key={i}>
                {skill.trim()}{i !== data.skills.split(',').length - 1 ? ' • ' : ''}
              </span>
            ))}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[2px] border-b border-black mb-2 pb-1">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[12px]">{proj.name}</h3>
                  <div className="flex gap-2">
                    {proj.githubUrl && <a href={proj.githubUrl} className="text-blue-700 underline">Code</a>}
                    {proj.liveUrl && <a href={proj.liveUrl} className="text-blue-700 underline">Live</a>}
                  </div>
                </div>
                <p className="mb-1 italic">{proj.tech}</p>
                <p className="leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[2px] border-b border-black mb-2 pb-1">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[12px]">{exp.jobTitle} — {exp.company}</h3>
                  <span className="italic">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc ml-4 space-y-1">
                  {exp.responsibilities.split('\n').map((resp, j) => (
                    <li key={j} className="leading-relaxed">{resp.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[2px] border-b border-black mb-2 pb-1">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[12px]">{edu.degree} — {edu.institution}</h3>
                  <span className="italic">{edu.graduationYear}</span>
                </div>
                {edu.gradeOrCGPA && <p className="mt-1">Grade: {edu.gradeOrCGPA}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[2px] border-b border-black mb-2 pb-1">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, i) => (
              <div key={i} className="text-[11px] flex justify-between">
                <span><span className="font-bold">{cert.name}</span> — {cert.issuingBody}</span>
                <span className="italic">{cert.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumeDocument;
