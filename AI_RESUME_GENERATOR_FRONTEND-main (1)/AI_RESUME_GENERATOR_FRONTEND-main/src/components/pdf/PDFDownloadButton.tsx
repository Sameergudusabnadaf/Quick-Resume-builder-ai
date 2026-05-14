'use client';

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { ResumeData } from '@/types/resume.types';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { resumeService } from '@/services/api';

interface PDFDownloadButtonProps {
  data: ResumeData;
  fileName: string;
  className?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ data, fileName, className }) => {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBackendDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsGenerating(true);
      const response = await resumeService.generatePDF(data);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Backend PDF generation failed, falling back to client-side...', error);
      // Let the PDFDownloadLink handle it or show a toast
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex gap-2">
      <Button 
        onClick={handleBackendDownload}
        disabled={isGenerating}
        className="bg-indigo-600 hover:bg-indigo-700 gap-2 shadow-md"
      >
        {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
        {isGenerating ? 'Generating...' : 'Download PDF'}
      </Button>

      {/* Hidden PDFDownloadLink as fallback/client-side alternative */}
      <div className="hidden">
        <PDFDownloadLink
          document={<PDFDocument data={data} />}
          fileName={fileName}
        >
          {({ loading }) => (
            <span id="client-pdf-trigger">{loading ? '...' : 'Download'}</span>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PDFDownloadButton;
