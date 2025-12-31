import React, { useState } from 'react';
import './ExpertHelpFAQ.css';
import { Screen } from '../types';

interface FAQItem {
  id: string;
  category: string;
  categoryColor: string;
  question: string;
  content: JSX.Element;
}

interface ExpertHelpFAQProps {
  setScreen: (screen: Screen) => void;
}

const ExpertHelpFAQ: React.FC<ExpertHelpFAQProps> = ({ setScreen }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setSelectedDevice(null);
  };

  const renderDeviceInstructions = (device: string) => {
    switch(device) {
      case 'appletv':
        return (
          <>
            <div className="step-section">
              <h4>Step 1: Restart your Apple TV using Settings</h4>
              <ul>
                <li>Go to <strong>Settings</strong> on your Apple TV home screen</li>
                <li>Scroll down and select <strong>System</strong></li>
                <li>Select <strong>Restart</strong></li>
                <li>Wait for your Apple TV to fully restart (about 1-2 minutes)</li>
              </ul>
              <div className="step-result success">
                <strong>Did this fix it?</strong> → You're all set!
              </div>
              <div className="step-result">
                <strong>Still having issues?</strong> → Continue to Step 2
              </div>
            </div>

            <div className="step-section">
              <h4>Step 2: Try restarting with the remote</h4>
              <ul>
                <li>Press and hold both the <strong>Home button</strong> (TV icon) and <strong>Menu button</strong> at the same time</li>
                <li>Keep holding for about 5-10 seconds</li>
                <li>Release when the light on your Apple TV starts flashing</li>
                <li>Wait for it to fully restart</li>
              </ul>
              <div className="step-result success">
                <strong>Did this fix it?</strong> → Great!
              </div>
              <div className="step-result">
                <strong>Still not working?</strong> → Continue to Step 3
              </div>
            </div>

            <div className="step-section">
              <h4>Step 3: Power cycle (unplug)</h4>
              <ul>
                <li>Unplug the Apple TV power cord from the wall outlet</li>
                <li>Wait 30 seconds</li>
                <li>Plug it back in</li>
                <li>Wait for it to fully restart and try again</li>
              </ul>
              <div className="step-result success">
                <strong>Working now?</strong> → Perfect!
              </div>
              <div className="step-result">
                <strong>Still having problems?</strong> → Time to get expert help
              </div>
            </div>
          </>
        );
      
      case 'roku':
        return (
          <>
            <div className="step-section">
              <h4>Step 1: Restart your Roku using Settings</h4>
              <ul>
                <li>Press the <strong>Home button</strong> on your Roku remote</li>
                <li>Scroll down and select <strong>Settings</strong></li>
                <li>Select <strong>System</strong></li>
                <li>Select <strong>System restart</strong></li>
                <li>Select <strong>Restart</strong> to confirm</li>
                <li>Wait for your Roku to fully restart (about 1-2 minutes)</li>
              </ul>
              <div className="step-result success">
                <strong>Did this fix it?</strong> → You're all set!
              </div>
              <div className="step-result">
                <strong>Still having issues?</strong> → Continue to Step 2
              </div>
            </div>

            <div className="step-section">
              <h4>Step 2: Try the remote restart sequence</h4>
              <ul>
                <li>Press the <strong>Home button</strong> 5 times quickly</li>
                <li>Press the <strong>Up arrow</strong> once</li>
                <li>Press the <strong>Rewind button</strong> twice</li>
                <li>Press the <strong>Fast Forward button</strong> twice</li>
                <li>Your Roku will restart automatically</li>
              </ul>
              <div className="step-result success">
                <strong>Did this fix it?</strong> → Great!
              </div>
              <div className="step-result">
                <strong>Still not working?</strong> → Continue to Step 3
              </div>
            </div>

            <div className="step-section">
              <h4>Step 3: Power cycle (unplug)</h4>
              <ul>
                <li>Unplug the Roku power cord from the wall outlet or TV</li>
                <li>Wait 30 seconds</li>
                <li>Plug it back in</li>
                <li>Wait for it to fully restart and try again</li>
              </ul>
              <div className="step-result success">
                <strong>Working now?</strong> → Perfect!
              </div>
              <div className="step-result">
                <strong>Still having problems?</strong> → Time to get expert help
              </div>
            </div>
          </>
        );
      
      case 'lgtv':
        return (
          <>
            <div className="step-section">
              <h4>Step 1: Quick restart with the remote</h4>
              <ul>
                <li>Press and hold the <strong>Power button</strong> on your LG remote</li>
                <li>Keep holding for about 5 seconds</li>
                <li>The TV will turn off and back on automatically</li>
                <li>Wait for it to fully restart</li>
              </ul>
              <div className="step-result success">
                <strong>Did this fix it?</strong> → You're all set!
              </div>
              <div className="step-result">
                <strong>Still having issues?</strong> → Continue to Step 2
              </div>
            </div>

            <div className="step-section">
              <h4>Step 2: Full power cycle</h4>
              <ul>
                <li>Turn off your TV using the remote</li>
                <li>Unplug the TV power cord from the wall outlet</li>
                <li>Wait 60 seconds (this clears the TV's memory)</li>
                <li>Plug the power cord back in</li>
                <li>Turn the TV back on and test</li>
              </ul>
              <div className="step-result success">
                <strong>Working now?</strong> → Great!
              </div>
              <div className="step-result">
                <strong>Still not working?</strong> → Continue to Step 3
              </div>
            </div>

            <div className="step-section">
              <h4>Step 3: Check your TV input/source</h4>
              <ul>
                <li>Press the <strong>Input</strong> or <strong>Source</strong> button on your remote</li>
                <li>Make sure the correct input is selected (usually HDMI 1, HDMI 2, etc.)</li>
                <li>Try switching between inputs to see if picture appears</li>
              </ul>
              <div className="step-result success">
                <strong>Working now?</strong> → Perfect!
              </div>
              <div className="step-result">
                <strong>Still having problems?</strong> → Time to get expert help
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
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
          <div className="content-section">
            <h3>Select your streaming device:</h3>
            <p className="intro-text">Most TV issues can be fixed with a simple restart. Choose your device below for step-by-step instructions.</p>
          </div>

          <div className="device-selector">
            <button 
              className={`device-card ${selectedDevice === 'appletv' ? 'selected' : ''}`}
              onClick={() => setSelectedDevice('appletv')}
            >
              <div className="device-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
              <h4>Apple TV</h4>
            </button>

            <button 
              className={`device-card ${selectedDevice === 'roku' ? 'selected' : ''}`}
              onClick={() => setSelectedDevice('roku')}
            >
              <div className="device-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3L16.5 6H8.5l-2 11.5z"/>
                </svg>
              </div>
              <h4>Roku</h4>
            </button>

            <button 
              className={`device-card ${selectedDevice === 'lgtv' ? 'selected' : ''}`}
              onClick={() => setSelectedDevice('lgtv')}
            >
              <div className="device-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                </svg>
              </div>
              <h4>LG TV</h4>
            </button>
          </div>

          {selectedDevice && (
            <div className="selected-device-content">
              {renderDeviceInstructions(selectedDevice)}
              
              <div className="step-section contact-section">
                <h4>Need more help?</h4>
                <p>If these steps didn't resolve your issue, the problem might be more complex. We can help:</p>
                <ul>
                  <li>Use our <button className="smart-assistant-link" onClick={() => setScreen(Screen.SMART_CHAT)}>Smart Assistant</button> for advanced troubleshooting with photos</li>
                  <li>Call our support team for immediate assistance</li>
                  <li className="premium-feature">Service members get priority support and scheduling</li>
                </ul>
                <button className="contact-button">Contact Support</button>
              </div>
            </div>
          )}

          {!selectedDevice && (
            <div className="step-section">
              <p className="intro-text">👆 Click on your device above to see restart instructions</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'smoke',
      category: 'SECURITY',
      categoryColor: '#E8F5E9',
      question: 'My smoke detectors keep beeping. How do I make it stop?',
      content: (
        <div className="faq-content">
          <div className="content-section">
            <h3>Important: These are your electrical smoke detectors</h3>
            <p>The beeping you're hearing is most likely from your home's hardwired electrical smoke detectors, not your security system smoke detectors. By National Electrical Code (NEC), these are all interconnected throughout your home and will chirp when the backup battery is low.</p>
          </div>

          <div className="content-section">
            <p className="intro-text">Good news: This is an easy fix that takes about 15-20 minutes. And yes, it always seems to happen in the middle of the night!</p>
          </div>

          <div className="step-section">
            <h4>Step 1: Replace ALL the 9-volt batteries</h4>
            <ul>
              <li>Walk through your entire home and count how many smoke detectors you have (write this number down!)</li>
              <li>Purchase that many 9-volt batteries</li>
              <li>Replace the battery in every single smoke detector, even if only one is beeping</li>
              <li>Since they're interconnected, replacing just one won't stop the beeping</li>
            </ul>
            <div className="step-result success">
              <strong>Pro tip:</strong> Write down the total number of smoke detectors you have. You'll thank yourself next year!
            </div>
          </div>

          <div className="step-section">
            <h4>Step 2: Set a reminder for next year</h4>
            <ul>
              <li>Add a calendar reminder for one year from today</li>
              <li>Title it: "Replace ALL smoke detector batteries (you have [NUMBER] detectors)"</li>
              <li>Include a note to buy [NUMBER] of 9-volt batteries before the reminder date</li>
              <li>This prevents the dreaded 3 AM beeping next year</li>
            </ul>
            <div className="step-result">
              <strong>Why do this?</strong> Replacing them all at once, every year, means you'll never be woken up by random beeping again.
            </div>
          </div>

          <div className="step-section">
            <h4>Step 3: Label the date (optional but helpful)</h4>
            <ul>
              <li>Use a small piece of masking tape or a label maker</li>
              <li>Write today's date on each detector after replacing the battery</li>
              <li>This helps you track when they were last changed</li>
            </ul>
          </div>

          <div className="step-section contact-section">
            <h4>Still beeping after replacing all batteries?</h4>
            <p>If the beeping continues after you've replaced all the batteries:</p>
            <ul>
              <li>One of the detectors may need to be replaced entirely</li>
              <li>There could be an issue with your electrical system</li>
              <li>Contact an electrician for assistance</li>
            </ul>
            <p className="premium-feature">Note: These electrical smoke detectors are separate from any security system smoke detectors we may have installed.</p>
          </div>
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
