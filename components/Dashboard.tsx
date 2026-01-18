import React from 'react';
import { Screen } from '../types';
import { DASHBOARD_TITLE, DASHBOARD_SUBTITLE, SUPPORT_PHONE } from '../constants';

interface DashboardProps {
  setScreen: (screen: Screen) => void;
}

// Holiday schedule checker
const getHolidayInfo = (): { isHolidayPeriod: boolean; holidayName: string; daysUntil: number } | null => {
  const today = new Date();
  const year = today.getFullYear();

  // TEST MODE: Remove this return statement when done testing
  return { isHolidayPeriod: true, holidayName: 'Test Holiday', daysUntil: 0 };

  // Define holidays with their dates and how many days before to show the notice
  const holidays = [
    { name: '4th of July', getDate: (y: number) => new Date(y, 6, 4), daysBefore: 3 },
    { name: 'Thanksgiving', getDate: (y: number) => {
      // 4th Thursday of November
      const nov1 = new Date(y, 10, 1);
      const dayOfWeek = nov1.getDay();
      const firstThursday = dayOfWeek <= 4 ? 5 - dayOfWeek : 12 - dayOfWeek;
      return new Date(y, 10, firstThursday + 21);
    }, daysBefore: 3 },
    { name: 'Black Friday Weekend', getDate: (y: number) => {
      // Day after Thanksgiving through Sunday
      const nov1 = new Date(y, 10, 1);
      const dayOfWeek = nov1.getDay();
      const firstThursday = dayOfWeek <= 4 ? 5 - dayOfWeek : 12 - dayOfWeek;
      return new Date(y, 10, firstThursday + 22); // Friday
    }, daysBefore: 0, duration: 3 },
    { name: 'Christmas Eve', getDate: (y: number) => new Date(y, 11, 24), daysBefore: 3 },
    { name: 'Christmas Day', getDate: (y: number) => new Date(y, 11, 25), daysBefore: 0 },
    { name: "New Year's Eve", getDate: (y: number) => new Date(y, 11, 31), daysBefore: 3 },
    { name: "New Year's Day", getDate: (y: number) => new Date(y + 1, 0, 1), daysBefore: 0 },
  ];

  for (const holiday of holidays) {
    const holidayDate = holiday.getDate(year);
    const duration = (holiday as any).duration || 1;
    const endDate = new Date(holidayDate);
    endDate.setDate(endDate.getDate() + duration - 1);

    const startNotice = new Date(holidayDate);
    startNotice.setDate(startNotice.getDate() - holiday.daysBefore);

    // Check if today is within the notice period
    const todayTime = today.setHours(0, 0, 0, 0);
    const startTime = startNotice.setHours(0, 0, 0, 0);
    const endTime = endDate.setHours(23, 59, 59, 999);

    if (todayTime >= startTime && todayTime <= endTime) {
      const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return {
        isHolidayPeriod: true,
        holidayName: holiday.name,
        daysUntil: daysUntil < 0 ? 0 : daysUntil
      };
    }
  }

  // Also check for next year's New Year's Day if we're in late December
  const nextNewYear = new Date(year + 1, 0, 1);
  const startNotice = new Date(year, 11, 29); // Start showing 3 days before
  if (today >= startNotice && today <= nextNewYear) {
    const daysUntil = Math.ceil((nextNewYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return {
      isHolidayPeriod: true,
      holidayName: "New Year's Day",
      daysUntil: daysUntil < 0 ? 0 : daysUntil
    };
  }

  return null;
};

// Rotating tips/reminders
const getTip = (): { icon: string; title: string; message: string } => {
  const tips = [
    {
      icon: 'update',
      title: 'System Updates Required',
      message: 'Regular updates keep your smart home running smoothly. Contact us to schedule a proactive system review.'
    },
    {
      icon: 'checkup',
      title: 'Proactive System Review',
      message: 'Prevent problems before they happen. Schedule a system checkup to keep your equipment running at its best.'
    },
    {
      icon: 'wifi',
      title: 'Network Health',
      message: 'Slow streaming or connectivity issues? Contact us to optimize your network for peak performance.'
    },
    {
      icon: 'security',
      title: 'Security Check',
      message: 'When was your last security system test? Contact us to ensure your home stays protected.'
    }
  ];

  // Show a tip based on the day of the month to create consistent but rotating display
  const dayOfMonth = new Date().getDate();
  return tips[dayOfMonth % tips.length];
};

export const Dashboard: React.FC<DashboardProps> = ({ setScreen }) => {
  const holidayInfo = getHolidayInfo();
  const tip = getTip();
  return (
    <div className="flex flex-col h-full p-6 space-y-6 animate-fade-in bg-slate-50/50">
      {/* Holiday Notice Banner */}
      {holidayInfo && (
        <div className="bg-sv-light border-2 border-sv-teal/30 rounded-2xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="text-sv-teal mt-0.5 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-sv-dark">
                {holidayInfo.daysUntil === 0
                  ? `${holidayInfo.holidayName} Holiday Hours`
                  : `${holidayInfo.holidayName} is in ${holidayInfo.daysUntil} day${holidayInfo.daysUntil === 1 ? '' : 's'}`}
              </p>
              <p className="text-xs text-sv-dark/70 mt-1">
                In-home service is <strong>emergency only</strong> at <strong>$500/hr</strong>. Remote support available for Elite Plus members.
              </p>
            </div>
          </div>
        </div>
      )}

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

        {/* Service Membership Promo */}
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

        {/* Rotating Tip/Reminder */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-sv-teal mt-0.5 flex-shrink-0">
              {tip.icon === 'update' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {tip.icon === 'checkup' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {tip.icon === 'wifi' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              )}
              {tip.icon === 'security' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-sv-dark uppercase tracking-wide">{tip.title}</p>
              <p className="text-xs text-slate-500 mt-1">{tip.message}</p>
            </div>
          </div>
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
