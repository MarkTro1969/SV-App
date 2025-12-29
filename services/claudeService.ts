import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

/**
 * Handles communication with the Claude AI model.
 * Uses claude-3-5-haiku for fast, cost-effective technical troubleshooting.
 */
export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  console.log('API Key exists:', !!apiKey, 'First 10 chars:', apiKey?.substring(0, 10));
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Claude API Error: API_KEY is missing from the environment.");
    return "Technical assistant initialization in progress. Please wait a moment or call our support line at 704-696-2792.";
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    
    // Convert message history to Claude format
    const messages: Anthropic.MessageParam[] = history
      .filter(m => m.id !== '1')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
    
    // Add current user message
    const currentContent: Anthropic.MessageParam = {
      role: 'user',
      content: []
    };
    
    if (currentMessage) {
      (currentContent.content as any[]).push({
        type: 'text',
        text: currentMessage
      });
    }
    
    if (currentMedia) {
      (currentContent.content as any[]).push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: currentMedia.mimeType,
          data: currentMedia.data.split(',')[1]
        }
      });
    }
    
    messages.push(currentContent);
    
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      system: SYSTEM_INSTRUCTION,
      messages: messages
    });
    
    const textContent = response.content.find(
      block => block.type === 'text'
    );
    
    if (!textContent || textContent.type !== 'text') {
      throw new Error("No text content in Claude response");
    }
    
    return textContent.text;
    
  } catch (err) {
    console.error("Claude Support Service Error:", err);
    return "I'm having a brief connection issue. Please try again in a moment or call our support line directly at 704-696-2792.";
  }
};
