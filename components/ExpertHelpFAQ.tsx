import React, { useState } from 'react';
import './ExpertHelpFAQ.css';

interface FAQItem {
  id: string;
  category: string;
  categoryColor: string;
  question: string;
  content: JSX.Element;
}

const ExpertHelpFAQ: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const faqItems: FAQItem[] = [
    {
      id: 'internet',
      category: 'NETWORK',
      categoryColor: '#E3F2FD',
      question: 'How do I reset my Internet?',
      content: (
        <div className="faq-content">
          <div className="content-section">
            <h3>When to use this guide:</h3>
            <ul>
              <li>Your internet isn't working at all</li>
              <li>Your internet is slower than usual</li>
              <li>Devices won't connect to Wi-Fi</li>
            </ul>
          </div>

          <div className="content-section">
            <p className="intro-text">We'll walk through simple steps together. Most internet issues can be fixed in about 5 minutes.</p>
          </div>

          <div className="step-section">
            <h4>Step 1: Check if it's a provider
