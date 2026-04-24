import React from 'react';
import { Screen } from '../types';
import {
  WEBSITE_URL,
  NEWSLETTER_URL,
  MARKETING_URL,
  JOB_ESTIMATOR_URL,
  VIRTUAL_SHOWROOM_URL,
  GOOGLE_REVIEW_URL,
} from '../constants';

interface DashboardProps {
  setScreen: (screen: Screen) => void;
}

type TileProps = {
  label: string;
  sub: string;
  onClick: () => void;
  icon: React.ReactNode;
  external?: boolean;
};

const Tile: React.FC<TileProps> = ({ label, sub, onClick, icon, external }) => (
  <button
    onClick={onClick}
    className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-sv-teal transition-all text-left group active:scale-[0.96] flex flex-col"
  >
    <div className="text-sv-teal mb-3 group-hover:scale-110 transition-transform flex items-center justify-between w-full">
      {icon}
      {external && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </div>
    <h3 className="text-base font-bold text-sv-dark leading-tight">{label}</h3>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{sub}</p>
  </button>
);

const openExternal = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const DashboardConceptA: React.FC<DashboardProps> = ({ setScreen }) => {
  return (
    <div className="flex flex-col h-full p-6 space-y-5 animate-fade-in bg-slate-50/50 overflow-y-auto">
      <div className="text-center py-2">
        <h2 className="text-2xl font-bold text-sv-dark tracking-tight leading-tight">
          How can we <span className="text-sv-teal">simplify</span> your home today?
        </h2>
      </div>

      {/* Hero: Smart Assistant */}
      <button
        onClick={() => setScreen(Screen.SMART_CHAT)}
        className="group relative overflow-hidden bg-sv-teal p-7 rounded-2xl shadow-xl hover:shadow-sv-teal/20 transition-all text-left active:scale-[0.98]"
      >
        <div className="relative z-10">
          <div className="bg-white/20 w-11 h-11 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Smart Assistant</h3>
          <p className="text-white/80 font-medium text-sm">Instant troubleshooting for audio, video & network.</p>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-36 w-36 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </button>

      {/* Service */}
      <div>
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Service & Support</h4>
        <div className="grid grid-cols-3 gap-2.5">
          <Tile
            label="Call Us"
            sub="Direct Line"
            onClick={() => setScreen(Screen.CONTACT)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
          />
          <Tile
            label="Help & FAQ"
            sub="Step by Step"
            onClick={() => setScreen(Screen.HELP_FAQ)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <Tile
            label="Membership"
            sub="Save More"
            onClick={() => setScreen(Screen.MEMBERSHIP)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
          />
        </div>
      </div>

      {/* Explore SoundVision */}
      <div>
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Explore SoundVision</h4>
        <div className="grid grid-cols-3 gap-2.5">
          <Tile label="Website" sub="svavnc.com" external onClick={() => openExternal(WEBSITE_URL)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a13 13 0 010 18M12 3a13 13 0 000 18" /></svg>}
          />
          <Tile label="Newsletters" sub="Latest News" external onClick={() => openExternal(NEWSLETTER_URL)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v5h5M8 13h8M8 17h5" /></svg>}
          />
          <Tile label="Portfolio" sub="Our Work" external onClick={() => openExternal(MARKETING_URL)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          />
          <Tile label="Estimator" sub="Plan a Project" external onClick={() => openExternal(JOB_ESTIMATOR_URL)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-6 4h6m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>}
          />
          <Tile label="Showroom" sub="See It Live" external onClick={() => openExternal(VIRTUAL_SHOWROOM_URL)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
          />
          <Tile label="Review Us" sub="Google" external onClick={() => openExternal(GOOGLE_REVIEW_URL)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.074 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z" /></svg>}
          />
        </div>
      </div>

      <div className="mt-auto pt-3 pb-4 border-t border-slate-100 text-center">
        <button
          onClick={() => setScreen(Screen.FEEDBACK)}
          className="text-[10px] font-black text-slate-300 hover:text-sv-teal transition-colors uppercase tracking-[0.3em]"
        >
          Share Feedback
        </button>
      </div>
    </div>
  );
};

export default DashboardConceptA;
