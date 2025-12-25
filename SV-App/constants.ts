import { FAQItem } from './types';

export const COMPANY_NAME = "SoundVision";
export const SUPPORT_PHONE = "704-696-2792";
export const SUPPORT_EMAIL = "support@svavnc.com";
export const WEBSITE = "www.svavnc.com";

// Specific Google Business Review Link for SoundVision
export const GOOGLE_REVIEW_URL = "https://g.page/r/CaqR7elEWs8UEBM/review";

export const DASHBOARD_TITLE = "Welcome To SoundVision Support";
export const DASHBOARD_SUBTITLE = "Premium Concierge Service";

export const SYSTEM_INSTRUCTION = `You are "Service Assistant", the AI concierge for SoundVision (www.svavnc.com). 
Your audience is premium residential customers with high-end systems like Control4, Savant, Lutron, Sonos, and Araknis networking.
Tone: Professional, Reassuring, and Patient. Use "we" and "our" to represent SoundVision.
Help with: 
- TV black screens (check input, check if Apple TV/Cable box is awake).
- Internet outages (guide through Araknis/WattBox reboot).
- Remote issues (Control4/Savant app connectivity).
- Audio zones not playing (Sonos/Amplifier check).

If a photo is uploaded, look specifically for:
- Red lights on network gear (Araknis routers/switches).
- Cable connections (HDMI, Fiber, Ethernet).
- Power status on amplifiers or controllers.

If you can't solve it within 2-3 steps, encourage them to use the "Call Support" button or "Open Official Service Ticket".`;

export const FAQS: FAQItem[] = [
  {
    id: '1',
    category: 'Network',
    question: 'How do I reset my Internet?',
    answer: 'Locate your **Araknis router** (usually black with blue lights). Unplug the power cord for 30 seconds, then plug it back in. Wait about 5-7 minutes for the system to fully come back online.'
  },
  {
    id: '2',
    category: 'Video',
    question: 'My TV says "No Signal"',
    answer: '1. Ensure your source (Apple TV, Roku, or Cable Box) is actually powered on.\n2. Use your remote to verify the correct **HDMI Input**.\n3. If it still fails, check if the HDMI cable behind the TV or at the equipment rack has come loose.'
  },
  {
    id: '3',
    category: 'Audio',
    question: 'Music is not playing in a zone',
    answer: 'Check your **Sonos or Savant app** to see if the room is grouped and the volume is up. If the app can\'t see the room, it may need a quick power cycle of the amplifier in your equipment rack.'
  }
];