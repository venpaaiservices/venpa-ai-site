import React from 'react';
import { CheckCircle2, Search, Code2, Rocket, LineChart } from 'lucide-react';
import { motion } from 'motion/react';

const Process: React.FC = () => {
  const steps = [
    { 
      id: '01', 
      title: 'Technical Stack Audit', 
      desc: 'We identify the 20% of technical debt causing 80% of your operational friction.', 
      icon: Search
    },
    { 
      id: '02', 
      title: 'Agentic Prototyping', 
      desc: 'Rapid deployment of isolated RAG pipelines to prove viability within 14 days.', 
      icon: Code2
    },
    { 
      id: '03', 
      title: 'Enterprise Hardening', 
      desc: 'Rigorous VPC isolation and security audits for 99.9% reliability.', 
      icon: Rocket
    },
    { 
      id: '04', 
      title: 'ROI Realization', 
      desc: 'Continuous optimization until targeted B2B revenue benchmarks are met.', 
      icon: LineChart
    },
  ];

  return (
    <section id="process" className="scroll-mt-20 py-24 bg-white/50 dark:bg-slate-950/30 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              ROI-First Engineering <br />
              <span className="text-blue-600">Built for Enterprise Scale</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Venpa AI is your strategic partner in translating complex data architecture into measurable business growth. Our 4-step framework is designed to deliver immediate technical authority and long-term ROI.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      <step.icon size={24} />
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="absolute top-12 left-6 w-0.5 h-full bg-slate-200 dark:bg-slate-800 -ml-[1px] -z-10"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-1 lg:order-2 perspective-1000"
          >
            {/* Abstract visual representation of process */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-square md:aspect-auto md:h-[600px] transform-gpu">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-slate-900/90"></div>
               
               {/* Decorative Dashboard UI */}
               <div className="absolute inset-4 md:inset-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 h-2 w-32 bg-slate-600/50 rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-4">
                     <div className="bg-slate-700/30 rounded-lg p-4 border border-white/5">
                        <div className="h-2 w-16 bg-blue-500/50 rounded mb-4"></div>
                        <div className="h-8 w-24 bg-white/10 rounded mb-2"></div>
                        <div className="h-16 w-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-b-lg mt-auto"></div>
                     </div>
                     <div className="bg-slate-700/30 rounded-lg p-4 border border-white/5">
                        <div className="h-2 w-16 bg-purple-500/50 rounded mb-4"></div>
                        <div className="h-8 w-24 bg-white/10 rounded mb-2"></div>
                        <div className="flex gap-1 mt-4 items-end h-16">
                           <div className="w-1/4 h-[40%] bg-purple-500/40 rounded-t"></div>
                           <div className="w-1/4 h-[70%] bg-purple-500/60 rounded-t"></div>
                           <div className="w-1/4 h-[50%] bg-purple-500/40 rounded-t"></div>
                           <div className="w-1/4 h-[90%] bg-purple-500/80 rounded-t"></div>
                        </div>
                     </div>
                     <div className="col-span-2 bg-slate-700/30 rounded-lg p-4 border border-white/5 flex flex-col justify-center">
                        <div className="h-2 w-24 bg-green-500/50 rounded mb-4"></div>
                         <div className="space-y-2">
                            <div className="h-2 w-full bg-slate-600/30 rounded overflow-hidden">
                               <div className="h-full w-[75%] bg-green-500 rounded"></div>
                            </div>
                            <div className="h-2 w-full bg-slate-600/30 rounded overflow-hidden">
                               <div className="h-full w-[60%] bg-blue-500 rounded"></div>
                            </div>
                             <div className="h-2 w-full bg-slate-600/30 rounded overflow-hidden">
                               <div className="h-full w-[90%] bg-purple-500 rounded"></div>
                            </div>
                         </div>
                     </div>
                  </div>
               </div>

               {/* Floating Badge */}
               <div className="absolute bottom-8 right-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">System Status</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">100% Operational</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;