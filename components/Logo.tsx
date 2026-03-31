import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Venpa AI Logo"
    >
      <defs>
        <linearGradient id="gradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" /> {/* Amber/Gold */}
          <stop offset="100%" stopColor="#c084fc" /> {/* Purple */}
        </linearGradient>
        <linearGradient id="gradRight" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
          <stop offset="100%" stopColor="#c084fc" /> {/* Purple */}
        </linearGradient>
      </defs>
      
      {/* Left Wing */}
      <path 
        d="M50 92 C 30 75, 10 50, 15 20 L 35 20 C 32 45, 40 70, 50 92 Z" 
        fill="url(#gradLeft)" 
        stroke="url(#gradLeft)"
        strokeWidth="1"
      />
      
      {/* Right Wing */}
      <path 
        d="M50 92 C 70 75, 90 50, 85 20 L 65 20 C 68 45, 60 70, 50 92 Z" 
        fill="url(#gradRight)" 
        stroke="url(#gradRight)"
        strokeWidth="1"
      />
      
      {/* Stylized Ribs/Lines Overlay for Detail Effect */}
      <path d="M20 30 Q 30 50 48 80" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <path d="M25 25 Q 35 45 49 75" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <path d="M80 30 Q 70 50 52 80" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <path d="M75 25 Q 65 45 51 75" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none" />
    </svg>
  );
};

export default Logo;