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
import Scene3D from './components/three/Scene3D';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if it's stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // If not, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [currentPage, setCurrentPage] = useState<'home' | 'careers'>('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
        <Scene3D />
        <div className="relative z-10">
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
      </div>
    </ErrorBoundary>
  );
}

export default App;