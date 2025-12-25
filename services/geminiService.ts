import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  // Vite replaces this string at build time with your real key from Vercel
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Critical Error: API_KEY is not defined in the build environment.");
    return "The assistant is still setting up its secure connection. Please wait a moment and refresh, or call SoundVision support at 704-696-2792 for immediate help.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare conversation context for the AI
    const recentHistory = history
      .slice(-6)
      .map(m => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.text}`)
      .join('\n');
    
    const parts: any[] = [
      { text: `Conversation Context:\n${recentHistory}` },
      { text: `Current Customer Inquiry: ${currentMessage}` }
    ];

    // Handle photo attachments if present
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
