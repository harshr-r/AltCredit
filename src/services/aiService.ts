import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Generic AI Service that can be modified for OpenRouter or other backends.
 * Currently uses Gemini via @google/genai.
 */
export const aiService = {
  async generateResponse(messages: Message[]): Promise<string> {
    try {
      // For OpenRouter integration, you would typically call your own backend endpoint here:
      // const response = await fetch('/api/chat', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ messages }) 
      // });
      // return (await response.json()).content;

      // Current implementation using Gemini
      const model = "gemini-3-flash-preview";
      const lastMessage = messages[messages.length - 1].content;
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await genAI.models.generateContent({
        model,
        contents: [
          ...history,
          { role: 'user', parts: [{ text: lastMessage }] }
        ],
        config: {
          systemInstruction: "You are Axiom Assistant, a helpful AI for ArchitectLedger. You monitor system health and help users with credit analysis. Be professional, concise, and technical.",
        }
      });

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("AI Service Error:", error);
      return "An error occurred while connecting to the AI service.";
    }
  }
};
