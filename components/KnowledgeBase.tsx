import React, { useState, useEffect } from 'react';
import { FAQS } from '../constants';
import { FAQItem } from '../types';
import { marked } from 'marked';

const KnowledgeBaseSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm p-5 flex justify-between items-center">
          <div className="flex items-center gap-4 w-full">
            {/* Category Tag Skeleton */}
            <div className="h-6 w-16 bg-slate-200 rounded animate-pulse flex-shrink-0" />
            {/* Question Text Skeleton */}
            <div className="h-5 bg-slate-100 rounded animate-pulse w-3/4" />
          </div>
          {/* Chevron Skeleton */}
          <div className="h-6 w-6 bg-slate-100 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export const KnowledgeBase: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  // Simulate a realistic loading period for a premium app feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6 h-full overflow-y-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-sv-dark">Expert Help & FAQ</h2>
        {isLoading && (
          <span className="text-xs font-bold text-sv-teal animate-pulse uppercase tracking-widest">
            Updating...
          </span>
        )}
      </div>
      
      {isLoading ? (
        <KnowledgeBaseSkeleton />
      ) : (
        <div className="space-y-4 animate-fade-in">
          {FAQS.map((faq: FAQItem) => (
            <div 
              key={faq.id} 
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:border-sv-teal/30"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                    faq.category === 'Video' ? 'bg-red-100 text-red-700' :
                    faq.category === 'Network' ? 'bg-blue-100 text-blue-700' :
                    faq.category === 'Audio' ? 'bg-green-100 text-green-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {faq.category}
                  </span>
                  <span className="font-bold text-lg text-sv-dark">{faq.question}</span>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-sv-teal transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openId === faq.id && (
                <div 
                  id={`faq-answer-${faq.id}`}
                  className="p-6 pt-0 bg-slate-50 border-t border-slate-100 animate-slide-down"
                  role="region"
                >
                  <div 
                    className="prose max-w-none text-sv-dark/80 leading-relaxed mt-4 text-lg"
                    dangerouslySetInnerHTML={{ __html: marked.parse(faq.answer) as string }} 
                  />
                  
                  <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <p className="text-xs text-slate-400 italic">Was this helpful?</p>
                    <div className="flex gap-2">
                      <button className="text-xs font-bold text-sv-teal hover:underline">Yes</button>
                      <button className="text-xs font-bold text-sv-teal hover:underline">No</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};