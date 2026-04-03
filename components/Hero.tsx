
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Hero: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["Orchestrate.", "Scale.", "Transform.", "Empower."];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // FIX: This function handles the smooth scrolling without breaking the page
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Stop the "refused to connect" error
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" id="hero">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern text-slate-200/40 dark:text-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none animate-background-pan"></div>

      {/* Background Blobs - Enhanced */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/3 w-[550px] h-[550px] bg-pink-400/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-blue-500/20 animate-float pointer-events-none">
        <Plus size={48} />
      </div>
      <div className="absolute bottom-40 right-20 text-purple-500/20 animate-float animation-delay-2000 pointer-events-none">
        <Plus size={64} />
      </div>
      <div className="absolute top-1/2 left-20 text-pink-500/20 animate-pulse-soft pointer-events-none">
        <Plus size={32} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-8 animate-fade-in-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            BEYOND TRADITIONAL IT OPERATIONS
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Innovate. Build.
          <br className="hidden md:block" />
          <div className="relative h-[1.2em] overflow-hidden inline-flex items-center justify-center min-w-[320px] md:min-w-[500px] px-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap"
              >
                {words[textIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-10"
        >
          From intelligent cloud architectures to autonomous AI agents, Venpa AI engineers secure, scalable infrastructure that accelerates enterprise velocity.
        </motion.p>

        {/* CTAs - UPDATED WITH ONCLICK HANDLERS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:scale-105 cursor-pointer"
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, 'services')}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            Explore Solutions
          </a>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Sparkles, text: "AI & LLM Integration", color: "text-purple-500" },
            { icon: TrendingUp, text: "ROI Growth Strategy", color: "text-green-500" },
            { icon: ArrowRight, text: "Enterprise Infrastructure", color: "text-blue-500" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
              <item.icon className={`h-6 w-6 ${item.color}`} />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
