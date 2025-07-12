import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }
        hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle handle */}
      <div
        className={`
          absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ease-in-out
          ${isDark ? 'translate-x-6' : 'translate-x-0.5'}
          bg-white shadow-md
        `}
      >
        {/* Icon inside handle */}
        <div className="flex items-center justify-center w-full h-full">
          {isDark ? (
            <Moon className="w-3 h-3 text-blue-600" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-500" />
          )}
        </div>
      </div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`w-3 h-3 transition-all duration-300 ${
          isDark ? 'text-white/30' : 'text-white/80'
        }`} />
        <Moon className={`w-3 h-3 transition-all duration-300 ${
          isDark ? 'text-white/80' : 'text-white/30'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle; 