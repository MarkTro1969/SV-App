import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

/**
 * Handles communication with the Gemini AI model.
 * Uses gemini-2.0-flash-exp for advanced technical troubleshooting.
 */
export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Gemini API Error: API_KEY is missing from the environment.");
    return "Technical assistant initialization in progress. Please wait a moment or call our support line at 704-696-2792.";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_INSTRUCTION
    });
    
    // Gemini history must alternate User -> Model.
    // Filter out the generic welcome message to ensure a clean start.
    const contents: any[] = history
      .filter(m => m.id !== '1')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
    
    // Add current user prompt
    const userParts: any[] = [{ 
      text: currentMessage || "Please assist based on this information." 
    }];
    
    // Handle image attachments if present
    if (currentMedia) {
      userParts.push({
        inlineData: {
          mimeType: currentMedia.mimeType,
          data: currentMedia.data.split(',')[1] // Strip base64 metadata prefix
        }
      });
    }
    
    contents.push({ role: 'user', parts: userParts });
    
    // Generate response
    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });
    
    const response = await result.response;
    const resultText = response.text();
    
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }
    
    return resultText;
    
  } catch (err) {
    console.error("Gemini Support Service Error:", err);
    return "I'm having a brief connection issue. Please try again in a moment or call our support line directly at 704-696-2792.";
  }
};

