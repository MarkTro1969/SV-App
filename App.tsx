import React, { useState, useEffect } from 'react';
import { Screen, SmartChatContext } from './types';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SmartChat } from './components/SmartChat';
import { KnowledgeBase } from './components/KnowledgeBase';
import { ContactOptions } from './components/ContactOptions';
import { Feedback } from './components/Feedback';
import ExpertHelpFAQ from './components/ExpertHelpFAQ';
import { ServiceMembership } from './components/ServiceMembership';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [chatContext, setChatContext] = useState<SmartChatContext | null>(null);
  const [chatKey, setChatKey] = useState<number>(0);

  // Reset to dashboard when app becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setCurrentScreen(Screen.DASHBOARD);
        setChatContext(null);
        setChatKey(prev => prev + 1); // Force SmartChat to remount
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleBack = () => {
    setCurrentScreen(Screen.DASHBOARD);
    setChatKey(prev => prev + 1); // Force SmartChat to remount when going back
  };

  const navigateToSmartChat = (context?: SmartChatContext) => {
    setChatContext(context || null);
    setCurrentScreen(Screen.SMART_CHAT);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD: 
        return <Dashboard setScreen={setCurrentScreen} />;
      case Screen.SMART_CHAT: 
        return <SmartChat key={chatKey} context={chatContext} onClearContext={() => setChatContext(null)} />;
      case Screen.KNOWLEDGE_BASE: 
        return <KnowledgeBase />;
      case Screen.CONTACT:
        return <ContactOptions setScreen={setCurrentScreen} />;
      case Screen.FEEDBACK: 
        return <Feedback onComplete={handleBack} />;
      case Screen.HELP_FAQ:
        return <ExpertHelpFAQ navigateToSmartChat={navigateToSmartChat} setScreen={setCurrentScreen} />;
      case Screen.MEMBERSHIP:
        return <ServiceMembership />;
      default:
        return <Dashboard setScreen={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl flex flex-col relative">
        <Header currentScreen={currentScreen} onBack={handleBack} />
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
