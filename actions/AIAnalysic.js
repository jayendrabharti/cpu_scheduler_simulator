"use server";

import { GoogleGenAI } from "@google/genai";

export async function AnalyzeProcesses(processes) {

    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const contents = `Analyze the processes: ${JSON.stringify(processes)} 50-70 words`

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
      });
    
    const result = response.text;
    return JSON.stringify(result);
}



