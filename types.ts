import React from 'react';

export enum Screen {
  DASHBOARD = 'DASHBOARD',
  SMART_CHAT = 'SMART_CHAT',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  CONTACT = 'CONTACT',
  FEEDBACK = 'FEEDBACK',
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  media?: {
    mimeType: string;
    data: string;
  };
  isError?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Video' | 'Audio' | 'Network' | 'Control';
}