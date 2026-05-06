import React from 'react';
import { Screen } from '../types';

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
        {/* Smart Assistant */}
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

        {/* Call Support + Help & FAQ */}
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

        {/* Service Memberships */}
        <button
          onClick={() => setScreen(Screen.MEMBERSHIP)}
          className="group relative overflow-hidden bg-sv-light border-2 border-sv-teal/30 p-5 rounded-[2rem] shadow-sm hover:border-sv-teal hover:shadow-md transition-all text-left active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-sv-teal/20 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sv-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-sv-dark">Service Memberships</h3>
              <p className="text-xs text-sv-dark/70 mt-0.5">Get after-hours support, priority scheduling & save on service calls</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sv-teal group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Proactive System Review */}
        <button
          onClick={() => setScreen(Screen.PROACTIVE_REVIEW)}
          className="bg-white border border-slate-200 p-5 rounded-[1.75rem] shadow-sm hover:border-sv-teal transition-all text-left group active:scale-[0.98] flex items-center gap-4"
        >
          <div className="text-sv-teal flex-shrink-0 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-sv-dark">Proactive System Review</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Schedule a complimentary check-up of your system.</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-sv-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
