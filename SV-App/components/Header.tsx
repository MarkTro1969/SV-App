import React from 'react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onBack }) => {
  const isDashboard = currentScreen === Screen.DASHBOARD;

  return (
    <header className="bg-sv-teal text-white shadow-xl relative z-50">
      <div className="w-full h-36 flex flex-col items-center justify-center p-4">
        {/* Back Button */}
        {!isDashboard && (
          <button 
            onClick={onBack} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-all active:scale-90"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {/* Text-based Logo and Tagline */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-1">
            SoundVision
          </h1>
          <div className="h-0.5 w-16 bg-white/40 rounded-full mb-2"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/90">
            Simplifying Life Through Technology
          </span>
        </div>
      </div>
    </header>
  );
};