import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  // Vite will replace this with your actual key during the 'npm run build' step on Vercel.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Connection Error: API_KEY not found in build environment.");
    return "I am currently unable to establish a secure connection to the AI. Please ensure the API_KEY is set in your Vercel project settings and that you have performed a 'Redeploy'. If you need immediate help, call SoundVision at 704-696-2792.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const recentHistory = history
      .slice(-6)
      .map(m => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.text}`)
      .join('\n');
    
    const parts: any[] = [
      { text: `Conversation Context:\n${recentHistory}` },
      { text: `Current Customer Inquiry: ${currentMessage}` }
    ];

    if (currentMedia) {
      parts.push({
        inlineData: {
          mimeType: currentMedia.mimeType,
          data: currentMedia.data.split(',')[1]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION, 
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Could you try rephrasing your question?";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "I'm having a brief connection issue. Please try again in a moment or call our support line for urgent assistance.";
  }
};
