import React, { useState, useEffect } from 'react';
import { Screen, SmartChatContext } from './types';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import DashboardConceptA from './components/DashboardConceptA';
import DashboardConceptB from './components/DashboardConceptB';
import { SmartChat } from './components/SmartChat';
import { KnowledgeBase } from './components/KnowledgeBase';
import { ContactOptions } from './components/ContactOptions';
import { Feedback } from './components/Feedback';
import ExpertHelpFAQ from './components/ExpertHelpFAQ';
import { ServiceMembership } from './components/ServiceMembership';

type Concept = 'current' | 'A' | 'B';

const CONCEPT_LABELS: Record<Concept, string> = {
  current: 'Current App',
  A: 'Concept A: Hub Grid',
  B: 'Concept B: Tab Navigation',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [chatContext, setChatContext] = useState<SmartChatContext | null>(null);
  const [chatKey, setChatKey] = useState<number>(0);
  const [concept, setConcept] = useState<Concept>(() => {
    return (localStorage.getItem('sv_concept') as Concept) || 'A';
  });

  useEffect(() => {
    localStorage.setItem('sv_concept', concept);
  }, [concept]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setCurrentScreen(Screen.DASHBOARD);
        setChatContext(null);
        setChatKey(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleBack = () => {
    setCurrentScreen(Screen.DASHBOARD);
    setChatKey(prev => prev + 1);
  };

  const navigateToSmartChat = (context?: SmartChatContext) => {
    setChatContext(context || null);
    setCurrentScreen(Screen.SMART_CHAT);
  };

  const cycleConcept = () => {
    const order: Concept[] = ['current', 'A', 'B'];
    const next = order[(order.indexOf(concept) + 1) % order.length];
    setConcept(next);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const renderDashboard = () => {
    switch (concept) {
      case 'A': return <DashboardConceptA setScreen={setCurrentScreen} />;
      case 'B': return <DashboardConceptB setScreen={setCurrentScreen} />;
      default: return <Dashboard setScreen={setCurrentScreen} />;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD: return renderDashboard();
      case Screen.SMART_CHAT: return <SmartChat key={chatKey} context={chatContext} onClearContext={() => setChatContext(null)} />;
      case Screen.KNOWLEDGE_BASE: return <KnowledgeBase />;
      case Screen.CONTACT: return <ContactOptions setScreen={setCurrentScreen} />;
      case Screen.FEEDBACK: return <Feedback onComplete={handleBack} />;
      case Screen.HELP_FAQ: return <ExpertHelpFAQ navigateToSmartChat={navigateToSmartChat} setScreen={setCurrentScreen} />;
      case Screen.MEMBERSHIP: return <ServiceMembership />;
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl flex flex-col relative">
        <Header currentScreen={currentScreen} onBack={handleBack} />

        {/* Concept switcher — only visible on Dashboard */}
        {currentScreen === Screen.DASHBOARD && (
          <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between text-xs z-50">
            <span className="font-bold tracking-wide uppercase text-[10px] text-slate-400">Leadership Preview</span>
            <button
              onClick={cycleConcept}
              className="bg-sv-teal px-3 py-1 rounded-full font-bold text-[11px] active:scale-95 transition-transform"
            >
              {CONCEPT_LABELS[concept]} &#8594;
            </button>
          </div>
        )}

        <main className="flex-1 relative overflow-hidden flex flex-col">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
