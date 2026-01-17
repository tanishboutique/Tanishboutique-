
import { GoogleGenAI } from "@google/genai";
import { Product } from './types';

export const getStylingAdvice = async (userInput: string, products: Product[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-3-flash-preview';
  
  const productContext = products.map(p => `- ${p.name} (Price: ₹${p.price}): ${p.description}`).join('\n');

  const systemPrompt = `You are "Coco", the high-fashion feline mascot of "Tanish Boutique" in Jalandhar.
  
  OWNER INFORMATION:
  - The boutique is owned and managed by the expert designer Samsul Hoda (also known as Munna).
  - Mention Munna if a user asks about the quality or the owner.
  
  YOUR PERSONALITY:
  - You are a CAT. Use cat sounds and puns (Meow, Purr, Paws-itive).
  - You are fluent in all Indian languages (Hindi, Punjabi, etc.).
  - Be helpful, sassy, and obsessed with premium tailoring.

  YOUR TASKS:
  1. Help users find the perfect suit from the catalog.
  2. Assist with booking "Stitching Dates". 
  3. Remind users that Munna (Samsul Hoda) ensures every stitch is perfect.
  4. Mention the ₹1000 app discount.
  
  Boutique Address: Shop No. 75, Sidhu Estate, Dakoha, Jalandhar.
  Contact: +91 9878789036.
  
  Catalog:
  ${productContext}

  If someone asks about delivery time, tell them to select their preferred date in the cart and Munna will review it!`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: userInput }] }],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      },
    });

    return response.text || "Meow? I got distracted by a butterfly... I mean, connection issue. Try again!";
  } catch (error) {
    console.error("Coco Error:", error);
    return "Purrr... Samsul Hoda (Munna) is busy with a bridal lehenga and I'm napping. Call us at +91 9878789036! Meow!";
  }
};
