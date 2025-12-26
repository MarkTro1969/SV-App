import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

/**
 * Handles communication with the Gemini AI model.
 * Uses gemini-3-pro-preview for advanced technical troubleshooting.
 */
export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Gemini API Error: API_KEY is missing from the environment.");
    return "Technical assistant initialization in progress. Please wait a moment or call our support line at 704-696-2792.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct valid Gemini history (User -> Model turns)
    // We filter out the welcome message (ID: '1') to start the history with a clean User turn
    const contents: any[] = history
      .filter(m => m.id !== '1')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

    // Add current user prompt (text + optional image)
    const userParts: any[] = [{ text: currentMessage || "Check this image." }];
    if (currentMedia) {
      userParts.push({
        inlineData: {
          mimeType: currentMedia.mimeType,
          data: currentMedia.data.split(',')[1] // Remove data:image/xxx;base64, prefix
        }
      });
    }

    contents.push({ role: 'user', parts: userParts });

    // Call the Pro model for technical reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        // High-end AV troubleshooting requires "thinking" to handle complex logic
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response text returned from AI");
    }

    return resultText;
  } catch (err) {
    console.error("Gemini Support Service Error:", err);
    return "I'm having a brief connection issue. Please try again in a moment or call our support line directly at 704-696-2792.";
  }
};
