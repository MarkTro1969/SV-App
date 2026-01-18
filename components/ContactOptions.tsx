import React, { useState } from 'react';
import { SUPPORT_PHONE, SUPPORT_EMAIL, WEBSITE } from '../constants';
import { Button } from './ui/Button';
import { Screen } from '../types';

interface ContactOptionsProps {
  setScreen?: (screen: Screen) => void;
}

export const ContactOptions: React.FC<ContactOptionsProps> = ({ setScreen }) => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailBody.trim()) return;

    const subject = encodeURIComponent(emailSubject || 'Service Request from App');
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    
    // Reset form after sending
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="p-6 h-full overflow-y-auto animate-fade-in flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-sv-dark">We're Here to Help</h2>
        <p className="text-sv-dark/60 mt-2 text-lg">Our service team is ready to assist you.</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        
        {/* Phone Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="w-16 h-16 bg-sv-light text-sv-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-sv-dark">Call Support</h3>
          <p className="text-sv-dark/60 mb-6">Immediate assistance for urgent issues.</p>
          <a href={`tel:${SUPPORT_PHONE.replace(/-/g, '')}`}>
            <Button fullWidth>Call {SUPPORT_PHONE}</Button>
          </a>
          <p className="text-sm text-slate-400 mt-3 font-medium uppercase tracking-tight">Select Option 2 for Service</p>
          <p className="text-xs text-slate-400 mt-1">Mon-Fri 9am-4pm</p>
        </div>

        {/* After-hours membership promo */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-amber-500 mt-0.5 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Need help after 4pm or on weekends?</p>
              <p className="text-xs text-amber-700 mt-1">After-hours and weekend support is available exclusively for Elite Plus members.</p>
              {setScreen && (
                <button
                  onClick={() => setScreen(Screen.MEMBERSHIP)}
                  className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                >
                  View membership options →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Improved Email Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-sv-light text-sv-teal rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-sv-dark">Email Request</h3>
              <p className="text-sm text-sv-dark/60">For non-urgent scheduling or questions.</p>
            </div>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="e.g., AppleTV Issue, New Quote Request..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Briefly describe your request..."
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none resize-none transition-all"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth disabled={!emailBody.trim()}>
              Send Message
            </Button>
            <p className="text-[10px] text-center text-slate-400 mt-2 italic">
              Clicking send will open your default email app to {SUPPORT_EMAIL}
            </p>
          </form>
        </div>

         {/* Website & Service Request */}
         <div className="text-center mt-6 space-y-4 w-full">
           <div>
            <a href={`https://${WEBSITE}`} target="_blank" rel="noreferrer" className="text-sv-teal font-bold hover:underline text-base">
              Visit {WEBSITE} for more info
            </a>
           </div>

           <div className="pt-6 border-t border-slate-200">
             <a href={`https://${WEBSITE}/service-request`} target="_blank" rel="noreferrer">
               <Button variant="ghost" className="w-full border-2 border-sv-teal/20 hover:border-sv-teal hover:bg-sv-light !text-sv-teal py-4">
                 Open Official Service Ticket
               </Button>
             </a>
           </div>
         </div>

      </div>
    </div>
  );
};