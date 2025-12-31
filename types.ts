export enum Screen {
  DASHBOARD = 'DASHBOARD',
  SMART_CHAT = 'SMART_CHAT',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  CONTACT = 'CONTACT',
  FEEDBACK = 'FEEDBACK',
  HELP_FAQ = 'HELP_FAQ'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  media?: {
    type: string;
    data: string;
  };
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SmartChatContext {
  device?: string;
  issue?: string;
}
