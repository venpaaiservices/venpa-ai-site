import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Founder from './components/Founder';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Careers from './components/Careers';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'careers'>('home');

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
        <Navbar 
          darkMode={darkMode} 
          toggleTheme={toggleTheme} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
        <main>
          {currentPage === 'home' ? (
            <>
              <Hero />
              <Services />
              <Process />
              <Founder />
              <Contact />
            </>
          ) : (
            <Careers />
          )}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;