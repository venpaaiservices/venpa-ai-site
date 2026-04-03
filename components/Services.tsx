import React from 'react';
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
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';

const products: Service[] = [
  {
    id: 'optimization-product',
    title: 'Data-Driven Optimizer',
    description: 'Advanced Optimization & Personalization engines driven by data to significantly increase your ROI.',
    icon: Sparkles,
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'voice-agent',
    title: 'Autonomous Inbound SDR & Voice Triage',
    description: 'Deploy conversational AI voice agents that instantly respond to inbound enterprise leads, execute complex qualification frameworks, and intelligently route high-value prospects to your sales team\'s calendars.',
    icon: Phone,
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'ai-gap-analysis',
    title: 'Enterprise AI Gap Analysis Engine',
    description: 'A comprehensive AI-driven audit of your entire technical stack. We identify integration drop-offs, security vulnerabilities, and deployment bottlenecks, delivering an actionable modernization roadmap.',
    icon: Search,
    gradient: 'from-orange-500 to-red-600'
  }
];

const services: Service[] = [
  {
    id: 'mobile-web',
    title: 'Legacy Architecture Modernization',
    description: 'We use advanced AI tooling to map and migrate expensive, outdated monolithic codebases into modern, scalable, decoupled microservices.',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'llms',
    title: 'Secure Enterprise AI (Private Cloud)',
    description: 'We deploy isolated, robust LLM knowledge engines directly into your private AWS/VPC. Zero data leakage. 100% proprietary control for your engineering and operations teams.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'data-eng',
    title: 'Data & DB Engineering',
    description: 'Robust pipelines (ETL/ELT) and database management for real-time analytics.',
    icon: Database,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'product-mgmt',
    title: 'Product Management',
    description: 'Agile roadmapping and strategy to take products from 0 to 1.',
    icon: Layers,
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'infra',
    title: 'Intelligent Cloud & DevOps Audits',
    description: 'Stop bleeding money on inefficient cloud architectures. We implement AI-driven auditing for CI/CD pipelines to predict build failures, slash cloud waste, and accelerate deployment velocity.',
    icon: Server,
    gradient: 'from-slate-500 to-slate-700'
  },
  {
    id: 'training',
    title: 'Data Training',
    description: 'High quality data labelling and preparation for ML models.',
    icon: Cpu,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'corporate-training',
    title: 'Custom RAG Pipelines',
    description: 'Building proprietary knowledge engines with Retrieval-Augmented Generation for secure, context-aware AI.',
    icon: GraduationCap,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'payment-gateway',
    title: 'API Orchestration',
    description: 'Seamlessly connecting and managing complex API ecosystems for enterprise-grade interoperability.',
    icon: CreditCard,
    gradient: 'from-slate-700 to-slate-900'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="scroll-mt-20 py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3">Our Offerings</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Accelerating Engineering Velocity with Autonomous AI & Scalable Systems
          </p>
          <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400 mx-auto leading-relaxed">
            We provide a holistic suite of premium products and services to transform your business infrastructure and intelligence.
          </p>
        </motion.div>

        {/* Products Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Package size={20} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Products</h3>
          </div>
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
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-purple-600 rounded-lg text-white">
              <Settings size={20} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
