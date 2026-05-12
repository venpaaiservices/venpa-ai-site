import React, { useState } from 'react';
import { X, Shield, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Venpa AI
            </span>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              © {currentYear} Venpa AI. All rights reserved.
            </p>
          </div>

          {/* Legal Links (Now Buttons) */}
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveModal('terms')}
              className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL OVERLAY --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                {activeModal === 'privacy' ? <Shield className="text-green-500" /> : <FileText className="text-blue-500" />}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="p-6 overflow-y-auto text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
              
              {activeModal === 'privacy' ? (
                <>
                  <p><strong>Last Updated: {currentYear}</strong></p>
                  <p>At Venpa AI, we value your privacy. This policy outlines how we handle your data when you use our services, including Mobile/Web Apps, AI Agents, and Cloud Infrastructure.</p>
                  
                  <h4 className="font-bold text-slate-900 dark:text-white mt-4">1. Data Collection</h4>
                  <p>We collect minimal data necessary to provide our IT services. This may include contact details provided via forms and technical usage logs to improve system performance.</p>

                  <h4 className="font-bold text-slate-900 dark:text-white mt-4">2. Use of Information</h4>
                  <p>Your data is used solely for project delivery, communication, and ROI strategy optimization. We do not sell your personal data to third parties.</p>

                  <h4 className="font-bold text-slate-900 dark:text-white mt-4">3. Security</h4>
                  <p>We employ industry-standard encryption and AWS best practices to protect your infrastructure and proprietary data.</p>
                </>
              ) : (
                <>
                   <p><strong>Last Updated: {currentYear}</strong></p>
                   <p>Welcome to Venpa AI. By accessing our website and services, you agree to these terms.</p>

                   <h4 className="font-bold text-slate-900 dark:text-white mt-4">1. Services</h4>
                   <p>Venpa AI provides software development, AI integration, and data engineering services. All deliverables are subject to the specific contracts signed per project.</p>

                   <h4 className="font-bold text-slate-900 dark:text-white mt-4">2. Intellectual Property</h4>
                   <p>Unless otherwise agreed, code and strategies developed by Venpa AI remain our intellectual property until full payment is settled.</p>

                   <h4 className="font-bold text-slate-900 dark:text-white mt-4">3. Limitation of Liability</h4>
                   <p>Venpa AI is not liable for indirect damages or loss of data resulting from the use of our software solutions, though we strive for 99.9% reliability.</p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl">
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;