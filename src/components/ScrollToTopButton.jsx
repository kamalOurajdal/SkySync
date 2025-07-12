import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group relative bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary hover:from-light-secondary hover:to-purple-600 dark:hover:from-dark-secondary dark:hover:to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-fade-in"
          aria-label="Scroll to top"
        >
          {/* Animated background on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          
          {/* Icon */}
          <ChevronUp className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-light-primary/20 dark:bg-dark-primary/20 animate-ping transition-colors duration-300"></div>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;