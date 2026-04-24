import React, { useState } from 'react';
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

type Tab = 'home' | 'service' | 'explore';

const openExternal = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

/* ─── HOME TAB ─── */
const HomeTab: React.FC<{ setScreen: (s: Screen) => void; setTab: (t: Tab) => void }> = ({ setScreen, setTab }) => (
  <div className="flex flex-col space-y-5 animate-fade-in">
    {/* Welcome banner */}
    <div className="bg-gradient-to-br from-sv-teal to-sv-teal-dark rounded-2xl p-6 text-white">
      <p className="text-sm font-medium text-white/70 mb-1">Welcome to</p>
      <h2 className="text-2xl font-black tracking-tight">SoundVision</h2>
      <p className="text-sm text-white/80 mt-2 leading-relaxed">Your premium smart home partner. Everything you need — service, inspiration, and planning — in one place.</p>
    </div>

    {/* Quick actions */}
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => setScreen(Screen.SMART_CHAT)}
        className="bg-sv-teal/10 border border-sv-teal/20 p-4 rounded-2xl text-left group active:scale-[0.96] transition-all"
      >
        <div className="bg-sv-teal w-10 h-10 rounded-xl flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-sv-dark">Smart Assistant</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">AI troubleshooting</p>
      </button>
      <button
        onClick={() => setScreen(Screen.CONTACT)}
        className="bg-white border border-slate-200 p-4 rounded-2xl text-left group active:scale-[0.96] transition-all"
      >
        <div className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sv-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-sv-dark">Call Support</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">704-696-2792</p>
      </button>
    </div>

    {/* Featured section */}
    <div>
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Featured</h4>
      <button
        onClick={() => openExternal(VIRTUAL_SHOWROOM_URL)}
        className="w-full bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-5 text-left relative overflow-hidden active:scale-[0.98] transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sv-teal/20 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Virtual Tour</p>
          <h3 className="text-lg font-bold text-white">Experience Our Showroom</h3>
          <p className="text-xs text-white/60 mt-1">See premium A/V systems in action before you buy.</p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </button>
    </div>

    {/* Newsletter CTA */}
    <button
      onClick={() => openExternal(NEWSLETTER_URL)}
      className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
    >
      <div className="bg-sv-teal/10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sv-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-sv-dark">SoundVision Newsletter</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Tips, trends & exclusive offers</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

/* ─── SERVICE TAB ─── */
const ServiceTab: React.FC<{ setScreen: (s: Screen) => void }> = ({ setScreen }) => (
  <div className="flex flex-col space-y-4 animate-fade-in">
    <div className="text-center py-2">
      <h2 className="text-xl font-bold text-sv-dark">Service & Support</h2>
      <p className="text-xs text-slate-400 mt-1">We're here to keep your system running perfectly.</p>
    </div>

    <button
      onClick={() => setScreen(Screen.SMART_CHAT)}
      className="group relative overflow-hidden bg-sv-teal p-6 rounded-2xl shadow-lg text-left active:scale-[0.98] transition-all"
    >
      <div className="relative z-10 flex items-center gap-4">
        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Smart Assistant</h3>
          <p className="text-white/70 text-xs">Describe your issue and get instant help</p>
        </div>
      </div>
    </button>

    <div className="space-y-2.5">
      {[
        { label: 'Call Support', sub: 'Speak with our team directly', screen: Screen.CONTACT,
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> },
        { label: 'Help & FAQ', sub: 'Step-by-step troubleshooting guides', screen: Screen.HELP_FAQ,
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
        { label: 'Service Memberships', sub: 'Priority support, savings & after-hours access', screen: Screen.MEMBERSHIP,
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /> },
      ].map((item) => (
        <button
          key={item.label}
          onClick={() => setScreen(item.screen)}
          className="w-full flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 text-left active:scale-[0.98] transition-all hover:border-sv-teal"
        >
          <div className="bg-slate-50 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sv-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-sv-dark">{item.label}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{item.sub}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ))}
    </div>
  </div>
);

/* ─── EXPLORE TAB ─── */
const ExploreTab: React.FC = () => (
  <div className="flex flex-col space-y-4 animate-fade-in">
    <div className="text-center py-2">
      <h2 className="text-xl font-bold text-sv-dark">Explore SoundVision</h2>
      <p className="text-xs text-slate-400 mt-1">Discover what's possible for your home.</p>
    </div>

    {[
      { label: 'Our Website', sub: 'Learn about SoundVision', url: WEBSITE_URL,
        icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a13 13 0 010 18M12 3a13 13 0 000 18" /></> },
      { label: 'Newsletter', sub: 'Tips, trends & exclusive offers', url: NEWSLETTER_URL,
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
      { label: 'Portfolio', sub: 'See our completed projects', url: MARKETING_URL,
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
      { label: 'Job Estimator', sub: 'Plan and price your next project', url: JOB_ESTIMATOR_URL,
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-6 4h6m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" /> },
      { label: 'Virtual Showroom', sub: 'Experience systems before you buy', url: VIRTUAL_SHOWROOM_URL,
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /> },
      { label: 'Leave a Review', sub: 'Tell others about your experience', url: GOOGLE_REVIEW_URL,
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.074 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z" /> },
    ].map((item) => (
      <button
        key={item.label}
        onClick={() => openExternal(item.url)}
        className="w-full flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 text-left active:scale-[0.98] transition-all hover:border-sv-teal"
      >
        <div className="bg-sv-teal/10 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sv-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-sv-dark">{item.label}</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">{item.sub}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    ))}
  </div>
);

/* ─── MAIN DASHBOARD ─── */
const DashboardConceptB: React.FC<DashboardProps> = ({ setScreen }) => {
  const [tab, setTab] = useState<Tab>('home');

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-5 pb-20">
        {tab === 'home' && <HomeTab setScreen={setScreen} setTab={setTab} />}
        {tab === 'service' && <ServiceTab setScreen={setScreen} />}
        {tab === 'explore' && <ExploreTab />}
      </div>

      {/* Bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 pb-[env(safe-area-inset-bottom)] z-40">
        <div className="flex justify-around py-2">
          {([
            { id: 'home' as Tab, label: 'Home',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
            { id: 'service' as Tab, label: 'Service',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
              icon2: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
            { id: 'explore' as Tab, label: 'Explore',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
              icon2: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a13 13 0 010 18M12 3a13 13 0 000 18" /> },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center px-4 py-1 rounded-xl transition-colors ${
                tab === t.id ? 'text-sv-teal' : 'text-slate-400'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {t.icon}
                {'icon2' in t && t.icon2}
              </svg>
              <span className="text-[10px] font-bold mt-0.5">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardConceptB;
