'use client';

import React from 'react';
import ResumeDocument from './ResumeDocument';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const ResumePreviewPane: React.FC = () => {
  const { resumeData } = useResumeStore();

  return (
    <div className="h-full flex flex-col bg-slate-100 overflow-hidden relative">
      <div className="p-4 border-b bg-white flex items-center justify-between z-10 shadow-sm">
        <h2 className="font-semibold text-slate-800">Live Preview</h2>
        <div className="flex gap-2">
          <Link href="/resume">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              Full Review <ExternalLink size={14} />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="shadow-2xl mb-8 transform origin-top scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform duration-300">
          <ResumeDocument data={resumeData} />
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6 z-10">
        <Link href="/resume">
          <Button size="lg" className="rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Download size={18} /> Download PDF
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResumePreviewPane;
