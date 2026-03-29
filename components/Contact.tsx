import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Linkedin } from 'lucide-react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'General Inquiry',
    message: ''
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("Contact validation failed:", newErrors);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submit clicked");

    if (!validate()) {
      console.log("Contact validation failed, stopping submission");
      return;
    }

    setFormState('submitting');

    try {
      console.log("Starting inquiry submission...");
      // 1. Save to Firestore
      const path = "inquiries";
      try {
        const sanitizedData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          interest: formData.interest,
          message: formData.message.trim(),
          createdAt: serverTimestamp(),
          status: 'new'
        };
        
        console.log("Storing inquiry in Firestore...", sanitizedData);
        await addDoc(collection(db, path), sanitizedData);
      } catch (error) {
        console.error("Firestore addDoc failed for inquiries:", error);
        handleFirestoreError(error, OperationType.CREATE, path);
      }

      console.log("Inquiry submitted successfully!");
      setFormState('success');
      setFormData({ name: '', email: '', interest: 'General Inquiry', message: '' });

    } catch (error) {
      console.error("Error submitting form: ", error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 bg-slate-50 dark:bg-slate-950 pt-24 pb-12 relative overflow-hidden">
       {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Let's Build the <br/>
              <span className="text-blue-600">Future Together</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg">
              Whether you need a custom Clover app, a complex data pipeline, or an AI strategy, Venpa AI is ready to deliver excellence.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Email Us</h4>
                  <a href="mailto:info@venpa.co.in" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    info@venpa.co.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Headquarters</h4>
                  <p className="text-slate-600 dark:text-slate-400">Coimbatore, India</p>
                </div>
              </div>

            </div>
            
            <div className="mt-12 flex gap-4">
               <a href="https://www.linkedin.com/in/vani-shreechampion/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                  <Linkedin size={20} />
               </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
            
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interested Service</label>
                  <select 
                    id="interest" 
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                  >
                    <option disabled value="">Select an option</option>
                    <optgroup label="Products">
                      <option>Booking Page URL</option>
                      <option>Data-Driven Optimization</option>
                      <option>Metadata Extractor</option>
                      <option>Subject Line Generator</option>
                      <option>AI Automated Marketing Platform</option>
                      <option>Voice agent for booking appointments</option>
                    </optgroup>
                    <optgroup label="Services">
                      <option>Mobile/Web App Development</option>
                      <option>LLMs & AI Agents</option>
                      <option>Clover Integration</option>
                      <option>Data Engineering & Training</option>
                      <option>Payment Gateway Integration</option>
                      <option>Corporate Training</option>
                      <option>ROI & Growth Strategy</option>
                      <option>Product Management</option>
                      <option>Infrastructure Management</option>
                    </optgroup>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white resize-none`}
                    placeholder="Tell us about your project needs..."
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                
                {formState === 'error' && (
                    <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                )}

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;