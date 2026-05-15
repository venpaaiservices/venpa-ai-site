import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AuditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const AuditFormModal: React.FC<AuditFormModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyWebsite: '',
    objective: '',
    bottleneck: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setFormData({
        fullName: '',
        workEmail: '',
        companyWebsite: '',
        objective: '',
        bottleneck: ''
      });
    }
  }, [isOpen]);

  const objectives = [
    "Automate your workflows",
    "Next-Gen Web Development / 3D Experiences",
    "Architectural Modernization",
    "Private LLM Deployment",
    "ROI-Driven Data Engineering",
    "Strategic AI Roadmap",
    "Cloud Velocity Audit",
    "Precision Data Synthesis",
    "Enterprise RAG Pipelines",
    "Agentic API Orchestration",
    "Data-Driven Optimization Engine",
    "Agentic Voice Triage",
    "Enterprise AI Stack Audit",
    "Multi-Agent Orchestrators"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const auditRef = collection(db, 'audit_requests');
      await addDoc(auditRef, {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'audit_requests');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-10">
              {!isSuccess ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      Get Your Strategic Report
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Right-size your AI strategy with a custom technical roadmap.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 pl-1">
                        First & Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 pl-1">
                        Work Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 pl-1">
                        Company Website URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        placeholder="https://company.com"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 pl-1">
                        Primary Objective for this Audit <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        name="objective"
                        value={formData.objective}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white appearance-none"
                      >
                        <option value="" disabled>Select an objective</option>
                        {objectives.map(obj => (
                          <option key={obj} value={obj}>{obj}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 pl-1">
                        What is your biggest technical or growth bottleneck right now? (Optional)
                      </label>
                      <textarea
                        name="bottleneck"
                        value={formData.bottleneck}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Explain your specific pain points..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Submit & Get Report
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <CheckCircle2 size={48} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Strategy Initialized
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                    We've captured your details and started your technical audit. To maximize its value, let's discuss your specific architecture needs directly.
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
                  >
                    Book Your Architecture Review Call
                    <ArrowRight size={20} />
                  </a>
                  <button
                    onClick={onClose}
                    className="block w-full mt-6 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
                  >
                    Not right now, just send me the report
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuditFormModal;
