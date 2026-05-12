'use client';

import React, { useEffect, useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import ResumeDocument from '@/components/preview/ResumeDocument';
import { Button } from '@/components/ui/button';
import { Download, ChevronLeft, FileText, Printer } from 'lucide-react';
import Link from 'next/link';
import PDFDownloadButton from '@/components/pdf/PDFDownloadButton';

export default function FinalResumePage() {
  const { resumeData } = useResumeStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="h-16 border-b bg-white flex items-center px-4 md:px-8 justify-between sticky top-0 z-30 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/builder">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
              <ChevronLeft size={18} /> Back to Edit
            </Button>
          </Link>
          <div className="h-6 w-px bg-slate-200 hidden md:block" />
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-indigo-600 p-1 rounded text-white">
              <FileText size={14} />
            </div>
            <span className="font-bold tracking-tight text-slate-800">Final Resume — Quick Resume</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
            <Printer size={16} /> Print
          </Button>
          
          <PDFDownloadButton 
            data={resumeData} 
            fileName={`${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`} 
          />
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-4 md:p-12 flex justify-center overflow-y-auto">
        <div className="max-w-[210mm] w-full shadow-2xl bg-white mb-12">
          <ResumeDocument data={resumeData} />
        </div>
      </main>

      {/* Mobile Sticky Download */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40 print:hidden">
        <PDFDownloadButton 
          data={resumeData} 
          fileName={`${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`} 
          className="w-full"
        />
      </div>

      <style jsx global>{`
        @media print {
          body {
            background-color: white;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .shadow-2xl {
            shadow: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
