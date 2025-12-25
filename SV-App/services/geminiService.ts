import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

/**
 * Retrieves the API key. 
 * Because we added the 'define' block to vite.config.ts, 
 * process.env.API_KEY is replaced with the real key during the Vercel build.
 */
const getApiKey = () => {
  return process.env.API_KEY;
};

export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey || apiKey === "undefined") {
    console.error("API Key is missing. Check Vercel Environment Variables.");
    return "The assistant is currently in maintenance mode. Please call SoundVision support at 704-696-2792 for immediate help.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Provide the last 6 messages for context so the AI remembers the conversation
    const recentHistory = history
      .slice(-6)
      .map(m => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.text}`)
      .join('\n');
    
    const parts: any[] = [
      { text: `Conversation Context:\n${recentHistory}` },
      { text: `Current Customer Inquiry: ${currentMessage}` }
    ];

    // If a photo was attached, include it in the request
    if (currentMedia) {
      parts.push({
        inlineData: {
          mimeType: currentMedia.mimeType,
          data: currentMedia.data.split(',')[1] // Strip the base64 header
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
