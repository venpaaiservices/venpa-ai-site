import React from 'react';
import { Linkedin, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const Founder: React.FC = () => {
  return (
    <section id="founder" className="scroll-mt-20 py-24 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-950/30 dark:to-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                    About us
                </h2>
                <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden"
            >
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-20 -mb-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    
                    <motion.div
                        initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Quote className="h-16 w-16 text-blue-600 dark:text-blue-400 opacity-20 mb-8 mx-auto" />
                    </motion.div>
                    
                    <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-10 font-sans italic">
                        "AI is no longer optional. The businesses that adopt intelligent systems today will lead tomorrow. We built Venpa AI to cut through the noise and deliver high-performance, private AI systems that actually drive bottom-line growth."
                    </blockquote>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mb-10"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Vanishree Venugopal</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mt-1">Founder & CEO, Venpa AI</p>
                    </motion.div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.a 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            href="https://www.linkedin.com/in/vani-shreechampion/" 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-1 font-semibold"
                        >
                            <Linkedin size={20} />
                            Connect on LinkedIn
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;