import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost', fullWidth?: boolean }> = ({ 
  children, variant = 'primary', fullWidth, className, ...props 
}) => (
  <button 
    className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${variant === 'primary' ? 'bg-sv-teal text-white' : 'text-sv-teal border-2 border-sv-teal'} ${fullWidth ? 'w-full' : ''} ${className}`}
    {...props}
  >
    {children}
  </button>
);