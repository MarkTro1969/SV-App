import React from 'react';
import { Screen } from '../types';
import { DASHBOARD_TITLE, DASHBOARD_SUBTITLE, SUPPORT_PHONE } from '../constants';

interface DashboardProps {
  setScreen: (screen: Screen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setScreen }) => {
  return (
    <div className="flex flex-col h-full p-6 space-y-6 animate-fade-in bg-slate-50/50">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold text-sv-dark tracking-tight leading-tight">
          How can we <span className="text-sv-teal">simplify</span> your home today?
        </h2>
      </div>

      <div className="grid gap-4 flex-1">
        {/* Main AI Action */}
        <button
          onClick={() => setScreen(Screen.SMART_CHAT)}
          className="group relative overflow-hidden bg-sv-teal p-8 rounded-[2rem] shadow-xl hover:shadow-sv-teal/20 transition-all text-left active:scale-[0.98]"
        >
          <div className="relative z-10">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Smart Assistant</h3>
            <p className="text-white/80 font-medium text-sm">Instant troubleshooting for audio, video, & network.</p>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setScreen(Screen.CONTACT)}
            className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:border-sv-teal transition-all text-left group active:scale-[0.95]"
          >
            <div className="text-sv-teal mb-3 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-sv-dark">Call Support</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mt-1">Direct Line</p>
          </button>

          <button
            onClick={() => setScreen(Screen.HELP_FAQ)}
            className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:border-sv-teal transition-all text-left group active:scale-[0.95]"
          >
            <div className="text-sv-teal mb-3 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-sv-dark">Help & FAQ</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mt-1">Step by Step</p>
          </button>
        </div>
      </div>

      <div className="mt-auto py-4 border-t border-slate-100 text-center">
        <button 
          onClick={() => setScreen(Screen.FEEDBACK)}
          className="text-[10px] font-black text-slate-300 hover:text-sv-teal transition-colors uppercase tracking-[0.3em]"
        >
          Rate Our Service App
        </button>
      </div>
    </div>
  );
};
