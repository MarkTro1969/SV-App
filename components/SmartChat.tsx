import React, { useState, useRef, useEffect } from 'react';
import { generateSupportResponse } from '../services/claudeService';
import { Message } from '../types';

export const SmartChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('sv_chat_history');
    return saved ? JSON.parse(saved) : [
      { id: '1', role: 'model', text: "Welcome to SoundVision Concierge. I'm your technical assistant. What system are you having trouble with?" }
    ];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ mimeType: string; data: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    localStorage.setItem('sv_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          mimeType: file.type,
          data: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if ((!textToSend.trim() && !selectedImage) || isLoading) return;
    
    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: textToSend || (selectedImage ? "Check this photo for me." : ""),
      media: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);
    
    try {
      const reply = await generateSupportResponse(messages, textToSend, selectedImage || undefined);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'model', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: "I'm having trouble connecting. Please check your internet or call us directly.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Clear your conversation history?")) {
      const initialMsg: Message[] = [{ id: '1', role: 'model', text: "Welcome to SoundVision Concierge. I'm your technical assistant. What system are you having trouble with?" }];
      setMessages(initialMsg);
      localStorage.removeItem('sv_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="px-5 py-2 flex justify-end bg-white border-b border-slate-100">
        <button 
          onClick={clearChat}
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-sv-teal transition-colors"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`relative max-w-[85%] px-5 py-4 rounded-3xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-sv-teal text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-sv-dark rounded-bl-none'
            }`}>
              {m.media && (
                <img 
                  src={m.media.data} 
                  alt="User uploaded attachment" 
                  className="rounded-xl mb-3 max-h-60 object-cover w-full border border-white/20"
                />
              )}
              <p className="text-[16px] leading-relaxed font-medium whitespace-pre-wrap">{m.text}</p>
              <span className={`text-[9px] mt-2 block font-bold uppercase tracking-widest opacity-40 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.role === 'user' ? 'You' : 'SoundVision AI'}
              </span>
            </div>
          </div>
        ))}
        
        {/* Suggestion Chips - Only show when one message is present */}
        {messages.length === 1 && !isLoading && (
          <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
            {['Fix my Internet', 'TV No Signal', 'Music is not playing'].map(tip => (
              <button 
                key={tip}
                onClick={() => handleSend(tip)}
                className="bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-bold text-sv-teal shadow-sm hover:border-sv-teal active:scale-95 transition-all"
              >
                {tip}
              </button>
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-slate-200 px-6 py-4 rounded-3xl rounded-bl-none flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-sv-teal rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-sv-teal rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-sv-teal rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} className="h-4" />
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        {selectedImage && (
          <div className="mb-4 relative inline-block">
            <img src={selectedImage.data} className="h-20 w-20 object-cover rounded-xl border-2 border-sv-teal shadow-md" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200 focus-within:border-sv-teal transition-all">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-sv-teal transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSend()} 
            className="flex-1 bg-transparent px-4 py-3 text-sv-dark font-medium outline-none placeholder:text-slate-400" 
            placeholder="Describe the issue..." 
          />
          <button 
            onClick={() => handleSend()} 
            disabled={(!input.trim() && !selectedImage) || isLoading}
            className="bg-sv-teal disabled:bg-slate-300 text-white p-3 rounded-xl shadow-lg shadow-sv-teal/20 transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">
          AI Assistant • Photo Support Active
        </p>
      </div>
    </div>
  );
};
