import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { NavItem } from '../types';
import Logo from './Logo';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  currentPage: 'home' | 'careers';
  onPageChange: (page: 'home' | 'careers') => void;
}

const navItems: NavItem[] = [
  { label: 'Products', href: '#services' },
  { label: 'Services', href: '#our-services' },
  { label: 'Process', href: '#process' },
  { label: 'Founder', href: '#founder' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, currentPage, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); 
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.label === 'Careers') {
      e.preventDefault();
      onPageChange('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else if (currentPage === 'careers') {
      e.preventDefault();
      onPageChange('home');
      setTimeout(() => {
        const id = item.href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsMobileMenuOpen(false);
    } else {
      handleScrollTo(e, item.href);
    }
  };

  const scrollToTop = () => {
    if (currentPage === 'careers') {
      onPageChange('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Logo className="h-10 w-10 relative z-10" />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              Venpa AI
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-sm font-medium transition-colors relative group ${
                  (currentPage === 'careers' && item.label === 'Careers') || (currentPage === 'home' && item.label !== 'Careers' && false)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  currentPage === 'careers' && item.label === 'Careers' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600 dark:text-slate-300" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                  currentPage === 'careers' && item.label === 'Careers'
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                className="block w-full text-center px-5 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md"
                onClick={(e) => handleScrollTo(e, '#contact')}
              >
                Start Project
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;