import React from 'react';
import { Linkedin, Quote, Award } from 'lucide-react';

const Founder: React.FC = () => {
  return (
    <section id="founder" className="scroll-mt-20 py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Visionary Leadership
                </h2>
                <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden text-center">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-20 -mb-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    
                    <Quote className="h-16 w-16 text-blue-600 dark:text-blue-400 opacity-20 mb-8 mx-auto" />
                    
                    <blockquote className="text-2xl md:text-4xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-10 font-sans">
                        "True engineering elegance isn't just found in the code—it's in the massive business bottlenecks you eliminate. We built Venpa AI to cut through the bloat of traditional IT and bridge the gap between complex legacy infrastructure and the transformative power of secure, private AI."
                    </blockquote>

                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Vanishree Venugopal</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mt-1">Founder & CEO, Venpa AI</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a 
                            href="https://www.linkedin.com/in/vani-shreechampion/" 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-1 font-semibold"
                        >
                            <Linkedin size={20} />
                            Connect on LinkedIn
                        </a>
                        
                        <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                            <Award className="text-yellow-500" size={24} />
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Industry Leader</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
