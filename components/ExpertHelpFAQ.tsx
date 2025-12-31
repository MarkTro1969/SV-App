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
            <h4>Step 1: Check if it's a provider outage</h4>
            <ul>
              <li>Open your phone's cellular data (turn off Wi-Fi temporarily)</li>
              <li>Visit your internet provider's website or check their app for outage notifications</li>
            </ul>
            <div className="step-result">
              <strong>If there's an outage in your area</strong> → You're done! Just wait for your provider to fix it.
            </div>
            <div className="step-result">
              <strong>If no outage</strong> → Continue to Step 2
            </div>
          </div>

          <div className="step-section">
            <h4>Step 2: Power cycle your modem and router</h4>
            <ul>
              <li>Unplug the power cable from your modem (the device connected to the wall)</li>
              <li>Unplug the power cable from your router (if separate from modem)</li>
              <li>Wait 30 seconds</li>
              <li>Plug the modem back in first, wait for all lights to stabilize (about 2 minutes)</li>
              <li>Plug the router back in, wait for lights to stabilize</li>
              <li>Try connecting to the internet</li>
            </ul>
            <div className="step-result success">
              <strong>Did this fix it?</strong> → You're all set!
            </div>
            <div className="step-result">
              <strong>Still not working?</strong> → Continue to Step 3
            </div>
          </div>

          <div className="step-section">
            <h4>Step 3: Check your cables</h4>
            <ul>
              <li>Look at the cable going from the wall to your modem - is it firmly connected?</li>
              <li>Check the cable between your modem and router - is it secure?</li>
              <li>Look for any damaged, bent, or chewed cables</li>
            </ul>
            <div className="step-result">
              <strong>Found a loose or damaged cable?</strong> → Reconnect it firmly or contact us for a replacement
            </div>
            <div className="step-result">
              <strong>Everything looks good?</strong> → Continue to Step 4
            </div>
          </div>

          <div className="step-section">
            <h4>Step 4: Test with one device</h4>
            <ul>
              <li>Connect one device directly to your router with an ethernet cable (if possible)</li>
              <li>OR stand very close to your router and test Wi-Fi on one device</li>
            </ul>
            <div className="step-result">
              <strong>Working now?</strong> → Your equipment is fine, but you may have a Wi-Fi coverage issue. Contact us to discuss solutions.
            </div>
            <div className="step-result">
              <strong>Still not working?</strong> → Time to reach out to us
            </div>
          </div>

          <div className="step-section contact-section">
            <h4>Step 5: Contact SoundVision</h4>
            <p>At this point, we've ruled out the simple fixes. Our team can:</p>
            <ul>
              <li>Run remote diagnostics on your network equipment</li>
              <li>Schedule a service visit if needed</li>
              <li className="premium-feature">Service members get priority scheduling</li>
            </ul>
            <button className="contact-button">Contact Support</button>
          </div>
        </div>
      )
    },
    {
      id: 'tv',
      category: 'VIDEO',
      categoryColor: '#FFE8E8',
      question: 'Video (TV) issues',
      content: (
        <div className="faq-content">
          <p className="coming-soon">Troubleshooting guide coming soon...</p>
        </div>
      )
    },
    {
      id: 'smoke',
      category: 'SECURITY',
      categoryColor: '#E8F5E9',
      question: 'Smoke detectors beeping',
      content: (
        <div className="faq-content">
          <p className="coming-soon">Troubleshooting guide coming soon...</p>
        </div>
      )
    }
  ];

  return (
    <div className="expert-help-container">
      <div className="content-wrapper">
        <h2 className="page-title">Expert Help & FAQ</h2>
        
        <div className="faq-list">
          {faqItems.map((item) => (
            <div key={item.id} className="faq-item">
              <button 
                className={`faq-button ${expandedId === item.id ? 'expanded' : ''}`}
                onClick={() => toggleFAQ(item.id)}
              >
                <div className="faq-header">
                  <span 
                    className="category-badge" 
                    style={{ backgroundColor: item.categoryColor }}
                  >
                    {item.category}
                  </span>
                  <span className="question">{item.question}</span>
                </div>
                <svg 
                  className={`chevron ${expandedId === item.id ? 'rotated' : ''}`}
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="#4FC3F7" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {expandedId === item.id && (
                <div className="faq-expanded">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertHelpFAQ;
