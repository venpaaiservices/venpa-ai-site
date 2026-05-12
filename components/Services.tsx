import React, { useState } from 'react';
import { 
  Smartphone, 
  Database, 
  Brain, 
  Layers, 
  Server, 
  Cpu,
  GraduationCap,
  Sparkles,
  CreditCard,
  Search,
  Package,
  Settings,
  Phone,
  Bot
} from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';
import AuditFormModal from './AuditFormModal';

const products: Service[] = [
  {
    id: 'optimization-product',
    title: 'Data-Driven Optimization Engine',
    description: 'Bespoke optimization & personalization engines built on proprietary data to maximize B2B revenue and user LTV.',
    icon: Sparkles,
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'voice-agent',
    title: 'Agentic Voice Triage',
    description: 'Autonomous voice agents that execute complex qualification frameworks and route high-value enterprise leads instantly.',
    icon: Phone,
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'ai-gap-analysis',
    title: 'Enterprise AI Stack Audit',
    description: 'Deep technical audit identifying stack vulnerabilities and deployment bottlenecks for a secure modernization roadmap.',
    icon: Search,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'autonomous-agents',
    title: 'Multi-Agent Orchestrators',
    description: 'Sophisticated AI ecosystems autonomously handling complex workflows from supply chain to internal knowledge retrieval.',
    icon: Bot,
    gradient: 'from-emerald-500 to-teal-600'
  }
];

const services: Service[] = [
  {
    id: 'mobile-web',
    title: 'Architectural Modernization',
    description: 'Migrating legacy monolithic codebases into scalable, AI-ready microservices using advanced automated refactoring.',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'llms',
    title: 'Private LLM Deployment',
    description: 'Isolated, proprietary LLM knowledge engines deployed directly into your VPC. Zero data leakage, 100% control.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'data-eng',
    title: 'ROI-Driven Data Engineering',
    description: 'High-velocity ETL pipelines and real-time data synchronization across fragmented enterprise tech stacks.',
    icon: Database,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'product-mgmt',
    title: 'Strategic AI Roadmap',
    description: 'Agile product management focusing on high-impact AI integration and measurable business outcomes.',
    icon: Layers,
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'infra',
    title: 'Cloud Velocity Audit',
    description: 'Implementation of AI-driven auditing to predict failures and slash cloud waste by up to 40%.',
    icon: Server,
    gradient: 'from-slate-500 to-slate-700'
  },
  {
    id: 'training',
    title: 'Precision Data Synthesis',
    description: 'Expert-led data labeling and synthetic data generation for high-accuracy machine learning models.',
    icon: Cpu,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'corporate-training',
    title: 'Enterprise RAG Pipelines',
    description: 'Retrieval-Augmented Generation at scale for secure, context-aware AI that understands your deep corporate data.',
    icon: GraduationCap,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'payment-gateway',
    title: 'Agentic API Orchestration',
    description: 'Intelligent AI-driven connectivity for complex B2B ecosystems and cross-platform interoperability.',
    icon: CreditCard,
    gradient: 'from-slate-700 to-slate-900'
  }
];

const Services: React.FC = () => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <section id="services" className="scroll-mt-20 py-24 bg-slate-50/50 dark:bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      <AuditFormModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Engineering <span className="text-blue-600">High-Ticket</span> Value
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            We deliver end-to-end technical authority, from agentic AI strategy to complex RAG deployments that drive bottom-line growth.
          </p>
        </motion.div>

        {/* Lead Magnet Section */}
        <div id="readiness-magnet" className="mb-24 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-6">RESOURCES</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Is Your Architecture <br/>Ready for Agentic AI?</h3>
                <p className="text-blue-100 mb-8 text-lg">Download our "Enterprise AI Readiness Checklist" and get a custom architecture roadmap tailored to your specific technical stack.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <button 
                     onClick={() => setIsAuditModalOpen(true)}
                     className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-50 transition-all shadow-lg hover:scale-105"
                   >
                     Get Your Strategic Report
                   </button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                   <div className="space-y-4">
                      {[
                        "Legacy Debt Analysis",
                        "Data Pipeline Scalability",
                        "RAG Optimization Score",
                        "Security & Sovereignty Audit"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">✓</div>
                           <span className="font-medium">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Package size={20} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Products</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${product.gradient} text-white mb-6 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <product.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {product.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div id="our-services" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="p-2 bg-purple-600 rounded-lg text-white">
              <Settings size={20} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Services</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;