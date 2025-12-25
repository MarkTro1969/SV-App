import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  // Vite replaces process.env.API_KEY during build as configured in vite.config.ts
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("API Key is missing. Ensure API_KEY is set in Vercel Environment Variables.");
    return "The assistant is currently initializing. Please call SoundVision support at 704-696-2792 for immediate help.";
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

    const response: GenerateContentResponse = await ai.models.generateContent({
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
