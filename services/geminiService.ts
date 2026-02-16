import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3-pro-preview for complex Indian crypto compliance interpretation
export const getComplianceHelp = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: "You are an AI compliance assistant for RadiantVaultOTC, an Indian VDA (Virtual Digital Asset) P2P platform. Answer the user query based on FIU-IND regulations, Section 194S of Income Tax Act (1% TDS), and AML guidelines.",
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't generate a response. Please contact support.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently undergoing maintenance. Please contact Radiantvaultv@gmail.com for urgent queries.";
  }
};

// Using gemini-3-pro-preview for advanced AML/fraud pattern recognition
export const analyzeTradeRisk = async (tradeDetails: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this crypto trade for RadiantVaultOTC AML/fraud risk in the Indian market. Look for suspicious patterns: ${JSON.stringify(tradeDetails)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            risk: {
              type: Type.STRING,
              description: "The assessed risk level: low, medium, or high.",
            },
            reason: {
              type: Type.STRING,
              description: "A brief explanation for the risk assessment.",
            }
          },
          required: ["risk", "reason"],
          propertyOrdering: ["risk", "reason"],
        },
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : { risk: 'low', reason: 'Automatic scan unavailable' };
  } catch (e) {
    console.error("Risk Analysis Error:", e);
    return { risk: 'low', reason: 'Automatic scan unavailable' };
  }
};
