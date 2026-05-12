'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Zap, Layout, Download, ShieldCheck, FileText } from 'lucide-react';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <FileText size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Quick Resume</span>
          </div>
          <Link href="/builder">
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
              Start Building
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <motion.div 
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Build Your Professional <br />
            <span className="text-indigo-600">Resume in Minutes</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Answer a few simple questions. Our AI-guided chatbot handles the formatting. 
            Get a professionally styled, ATS-friendly PDF instantly. No signup required.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/builder">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 h-auto rounded-full gap-2 shadow-lg transition-all hover:scale-105 active:scale-95">
                Start Building Resume <ArrowRight size={20} />
              </Button>
            </Link>
            <p className="text-sm text-slate-400 font-medium italic">
              ✨ Free forever • No credit card • ATS Compliant
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use Quick Resume?</h2>
            <p className="text-slate-600">The fastest and easiest way to create a resume that gets you hired.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-indigo-600" />}
              title="Chatbot Guided"
              description="No more blank page anxiety. Our chatbot guides you step-by-step through the process."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-indigo-600" />}
              title="ATS-Friendly"
              description="Our templates are designed to pass Applicant Tracking Systems (ATS) used by major companies."
            />
            <FeatureCard 
              icon={<Layout className="text-indigo-600" />}
              title="Live Preview"
              description="Watch your resume come to life in real-time as you answer each question."
            />
            <FeatureCard 
              icon={<Download className="text-indigo-600" />}
              title="Instant PDF"
              description="Download your professionally formatted resume as a high-quality PDF in seconds."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="text-indigo-600" />}
              title="No Signup Required"
              description="Start building immediately. We value your time and privacy — no accounts needed."
            />
            <FeatureCard 
              icon={<FileText className="text-indigo-600" />}
              title="Hyperlinks Preserved"
              description="Clickable links for LinkedIn, GitHub, and Portfolio are automatically integrated into your PDF."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-slate-100 -z-10" />
            
            <Step 
              number="1"
              title="Answer Questions"
              description="Our friendly AI assistant will ask you about your experience, skills, and projects."
            />
            <Step 
              number="2"
              title="Real-time Preview"
              description="See your professional resume being built instantly as you provide information."
            />
            <Step 
              number="3"
              title="Download & Apply"
              description="Once finished, download your high-quality PDF and start applying for jobs!"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-slate-200 p-1 rounded text-slate-600">
              <FileText size={16} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-700">Quick Resume</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Quick Resume Builder. Built with passion for job seekers.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex-1 text-center flex flex-col items-center"
    >
      <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 border-[8px] border-white shadow-xl ring-1 ring-slate-100">
        {number}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 max-w-xs">{description}</p>
    </motion.div>
  );
}
