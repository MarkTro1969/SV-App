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
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setSelectedDevice(null); // Reset device selection when collapsing
  };

  const renderDeviceInstructions = (device: string) => {
    switch(device) {
      case 'appletv':
        return (
          <div className="device-instructions">
            <h4>How to restart your Apple TV</h4>
            
            <div className="method-section">
              <h5>Method 1: Using Settings (Recommended)</h5>
              <ol>
                <li>Go to <strong>Settings</strong> on your Apple TV</li>
                <li>Select <strong>System</strong></li>
                <li>Select <strong>Restart</strong></li>
                <li>Wait for your Apple TV to restart (about 1-2 minutes)</li>
              </ol>
            </div>

            <div className="method-section">
              <h5>Method 2: Using the Remote</h5>
              <ol>
                <li>Press and hold the <strong>Home button</strong> (TV icon) and <strong>Menu button</strong> together</li>
                <li>Hold for about 5-10 seconds until the light on your Apple TV starts flashing</li>
                <li>Release the buttons and wait for restart</li>
              </ol>
            </div>

            <div className="method-section">
              <h5>Method 3: Unplug (Last Resort)</h5>
              <ol>
                <li>Unplug the Apple TV power cord from the outlet</li>
                <li>Wait 10 seconds</li>
                <li>Plug it back in</li>
                <li>Wait for it to fully restart</li>
              </ol>
            </div>

            <div className="step-result success">
              <strong>Did this fix your issue?</strong> Great! You're all set.
            </div>
          </div>
        );
      
      case 'roku':
        return (
          <div className="device-instructions">
            <h4>How to restart your Roku</h4>
            
            <div className="method-section">
              <h5>Method 1: Using Settings (Recommended)</h5>
              <ol>
                <li>Press the <strong>Home button</strong> on your Roku remote</li>
                <li>Go to <strong>Settings</strong></li>
                <li>Select <strong>System</strong></li>
                <li>Select <strong>System restart</strong></li>
                <li>Select <strong>Restart</strong> to confirm</li>
                <li>Wait for your Roku to restart (about 1-2 minutes)</li>
              </ol>
            </div>

            <div className="method-section">
              <h5>Method 2: Using the Remote</h5>
              <ol>
                <li>Press the <strong>Home button</strong> 5 times</li>
                <li>Press the <strong>Up arrow</strong> once</li>
                <li>Press the <strong>Rewind button</strong> twice</li>
                <li>Press the <strong>Fast Forward button</strong> twice</li>
                <li>Your Roku will restart automatically</li>
              </ol>
            </div>

            <div className="method-section">
              <h5>Method 3: Unplug (Last Resort)</h5>
              <ol>
                <li>Unplug the Roku power cord from the outlet or TV</li>
                <li>Wait 10 seconds</li>
                <li>Plug it back in</li>
                <li>Wait for it to fully restart</li>
              </ol>
            </div>

            <div className="step-result success">
              <strong>Did this fix your issue?</strong> Great! You're all set.
            </div>
          </div>
        );
      
      case 'lgtv':
        return (
          <div className="device-instructions">
            <h4>How to restart your LG TV</h4>
            
            <div className="method-section">
              <h5>Method 1: Soft Reset (Quick Restart)</h5>
              <ol>
                <li>Press and hold the <strong>Power button</strong> on your remote</li>
                <li>Keep holding until the TV turns off and back on</li>
                <li>This takes about 5 seconds</li>
              </ol>
            </div>

            <div className="method-section">
              <h5>Method 2: Power Cycle (Recommended)</h5>
              <ol>
                <li>Turn off your TV using the remote</li>
                <li>Unplug the TV power cord from the wall outlet</li>
                <li>Wait 60 seconds (this clears the TV's memory)</li>
                <li>Plug the power cord back in</li>
                <li>Turn the TV back on</li>
              </ol>
            </div>

            <div className="method-section">
              <h5>Method 3: Factory Reset (Only if nothing else works)</h5>
              <ol>
                <li>Press the <strong>Home/Smart button</strong> on your remote</li>
                <li>Go to <strong>Settings</strong> (gear icon)</li>
                <li>Select <strong>All Settings</strong></li>
                <li>Go to <strong>General</strong> → <strong>Reset to Initial Settings</strong></li>
                <li><strong>Warning:</strong> This will erase all your settings and apps</li>
              </ol>
            </div>

            <div className="step-result success">
              <strong>Did this fix your issue?</strong> Great! You're all set.
            </div>
          </div>
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
