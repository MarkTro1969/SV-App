import React, { useState } from 'react';
import { SUPPORT_EMAIL } from '../constants';
import { Button } from './ui/Button';

export const ProactiveReview: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const canSubmit = name.trim() && address.trim() && phone.trim() && email.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const subject = `Proactive System Review Request - ${name}`;
    const bodyLines = [
      'Hello SoundVision team,',
      '',
      'I would like to schedule a Proactive System Review for my home.',
      '',
      `Name:    ${name}`,
      `Address: ${address}`,
      `Phone:   ${phone}`,
      `Email:   ${email}`,
      '',
      notes.trim() ? `Additional notes:\n${notes}` : '',
      '',
      'Thank you,',
      name,
    ].filter(Boolean);

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  return (
    <div className="p-6 h-full overflow-y-auto animate-fade-in flex flex-col items-center">
      <div className="text-center mb-6 max-w-md">
        <div className="w-16 h-16 bg-sv-light text-sv-teal rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-sv-dark">Proactive System Review</h2>
        <p className="text-sv-dark/60 mt-2">
          Stay ahead of issues. Share your details and our service team will reach out to schedule a complimentary review of your system's health, software, and network.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div>
          <label htmlFor="pr-name" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">Name</label>
          <input
            id="pr-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="pr-address" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">Address</label>
          <input
            id="pr-address"
            type="text"
            autoComplete="street-address"
            placeholder="Street, City, State, ZIP"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pr-phone" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">Phone</label>
            <input
              id="pr-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="pr-email" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">Email</label>
            <input
              id="pr-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="pr-notes" className="block text-xs font-bold text-sv-dark/50 uppercase tracking-wider mb-1 ml-1">Notes (optional)</label>
          <textarea
            id="pr-notes"
            rows={3}
            placeholder="Best times to reach you, areas of concern, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none resize-none transition-all"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={!canSubmit}>
          Request System Review
        </Button>
        <p className="text-[10px] text-center text-slate-400 mt-2 italic">
          Clicking send will open your default email app to {SUPPORT_EMAIL}
        </p>
      </form>
    </div>
  );
};
