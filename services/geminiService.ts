import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

// Function to safely get the AI client
const getAIClient = () => {
  const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
  if (!apiKey) {
    console.error("API Key missing. Please set API_KEY in your environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  try {
    const ai = getAIClient();
    
    const parts: any[] = [
      { text: `Conversation so far: ${history.slice(-3).map(m => m.text).join('\n')}` },
      { text: `Current Query: ${currentMessage}` }
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
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.4 }
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Service temporarily unavailable. Please use the Contact Support button to reach our team directly.";
  }
};