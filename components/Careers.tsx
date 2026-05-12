import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Briefcase, MapPin, Mail, User, Clock, IndianRupee, MessageSquare, AlertCircle, Phone, Link } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

const Careers: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    currentCtc: '',
    expectedCtc: '',
    resumeLink: '',
    message: ''
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[+\d\s-]{10,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid contact number (10-20 digits)';
    }

    if (!formData.experience || parseInt(formData.experience) < 0) {
      newErrors.experience = 'Please enter valid years of experience';
    }

    if (formData.location.trim().length < 2) {
      newErrors.location = 'Please enter your preferred location';
    }

    if (formData.currentCtc.trim().length < 1) {
      newErrors.currentCtc = 'Please enter your current CTC';
    }

    if (formData.expectedCtc.trim().length < 1) {
      newErrors.expectedCtc = 'Please enter your expected CTC';
    }

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .?%&=-]*)*\/?$/i;
    if (!urlRegex.test(formData.resumeLink)) {
      newErrors.resumeLink = 'Please enter a valid URL for your resume';
    } else if (!formData.resumeLink.toLowerCase().includes('drive.google.com') && !formData.resumeLink.toLowerCase().includes('docs.google.com')) {
      newErrors.resumeLink = 'Please provide a Google Drive or Google Docs link';
    }

    if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide a message of at least 20 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed:", newErrors);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked");
    
    if (!validate()) {
      console.log("Form validation failed, stopping submission");
      return;
    }

    setFormStatus('submitting');
    
    try {
      console.log("Starting application submission...");
      
      // Ensure resume link has protocol for Firestore rules
      let finalResumeLink = formData.resumeLink.trim();
      if (!finalResumeLink.startsWith('http://') && !finalResumeLink.startsWith('https://')) {
        finalResumeLink = 'https://' + finalResumeLink;
      }

      // Store in Firestore
      console.log("Storing application in Firestore...");
      const path = "career_applications";
      try {
        await addDoc(collection(db, path), {
          ...formData,
          resumeLink: finalResumeLink,
          appliedAt: serverTimestamp(),
          status: 'pending'
        });
      } catch (error) {
        console.error("Firestore addDoc failed:", error);
        handleFirestoreError(error, OperationType.CREATE, path);
      }

      console.log("Application submitted successfully!");
      setFormStatus('success');
    } catch (error) {
      console.error("Error submitting application:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Application Received!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Thank you for your interest in joining Venpa AI. Our hiring team will review your profile and get back to you soon.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6"
          >
            <Briefcase size={16} />
            <span>Join Our Team</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Build the Future of <span className="text-blue-600">AI with Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            We're looking for passionate individuals who want to push the boundaries of what's possible with artificial intelligence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User size={16} className="text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.fullName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail size={16} className="text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Phone size={16} className="text-blue-600" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 5"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.experience ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />
                  Preferred Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, Bangalore, Chennai"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.location ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>

              {/* Current CTC */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <IndianRupee size={16} className="text-blue-600" />
                  Current CTC (Annual)
                </label>
                <input
                  type="text"
                  name="currentCtc"
                  value={formData.currentCtc}
                  onChange={handleChange}
                  placeholder="e.g. 12 LPA"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.currentCtc ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.currentCtc && <p className="text-xs text-red-500 mt-1">{errors.currentCtc}</p>}
              </div>

              {/* Expected CTC */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <IndianRupee size={16} className="text-blue-600" />
                  Expected CTC (Annual)
                </label>
                <input
                  type="text"
                  name="expectedCtc"
                  value={formData.expectedCtc}
                  onChange={handleChange}
                  placeholder="e.g. 18 LPA"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.expectedCtc ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
                />
                {errors.expectedCtc && <p className="text-xs text-red-500 mt-1">{errors.expectedCtc}</p>}
              </div>
            </div>

            {/* Resume Link */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Link size={16} className="text-blue-600" />
                Resume Link (Google Drive)
              </label>
              <input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/d/..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.resumeLink ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
              />
              {errors.resumeLink && <p className="text-xs text-red-500 mt-1">{errors.resumeLink}</p>}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Please ensure the link access is set to <span className="font-semibold">"Anyone with the link can view"</span>.
              </p>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-600" />
                Message to the Hiring Team
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us why you're interested in working with us..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none`}
              ></textarea>
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            {formStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                <AlertCircle size={18} />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <button
              disabled={formStatus === 'submitting'}
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              {formStatus === 'submitting' ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
