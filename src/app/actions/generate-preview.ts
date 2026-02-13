"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateRealisticPreview(artworkBase64: string) {
    try {
        if (!process.env.GOOGLE_API_KEY) {
            return { success: false, error: "Google API Key is missing. Please check your .env.local file." };
        }

        // Read the sneaker template from public folder
        const templatePath = path.join(process.cwd(), "public", "sneaker-template.png");
        const templateBuffer = fs.readFileSync(templatePath);
        const templateBase64 = templateBuffer.toString("base64");

        // Clean base64 strings if they contain prefixes
        const cleanArtwork = artworkBase64.replace(/^data:image\/\w+;base64,/, "");

        try {
            // Try Image Generation First
            // "models/gemini-2.0-flash-exp-image-generation"
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp-image-generation" });

            const prompt = `
            Create a realistic product mockup.
            Overlay the provided artwork pattern onto the side panel of the sneaker template.
            The result should be a high-quality photo-realistic image of the sneaker with the artwork applied.
            Maintain the lighting and shadows of the original shoe.
        `;

            const result = await model.generateContent([
                prompt,
                { inlineData: { data: templateBase64, mimeType: "image/png" } },
                { inlineData: { data: cleanArtwork, mimeType: "image/png" } },
            ]);

            const response = await result.response;
            const candidates = response.candidates;
            if (candidates && candidates.length > 0) {
                const parts = candidates[0].content.parts;
                if (parts && parts.length > 0) {
                    const imagePart = parts.find((part: any) => part.inlineData);
                    if (imagePart && imagePart.inlineData) {
                        const imgBase64 = imagePart.inlineData.data;
                        const mimeType = imagePart.inlineData.mimeType || "image/png";
                        return { success: true, image: `data:${mimeType};base64,${imgBase64}` };
                    }
                }
            }
        } catch (imageError: any) {
            console.warn("Image generation failed, falling back to text analysis:", imageError.message);

            // Fallback to Text Analysis with Gemini 1.5 Flash
            try {
                const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const textPrompt = `
                You are an expert product visualizer. 
                I have provided two images: 1. A sneaker template. 2. An artwork pattern.
                
                Analyze how this artwork looks when printed on the shoe.
                Describe in VIVID detail:
                - How the design flows across the side panel.
                - How the shoe's leather texture interacts with the graphics.
                - The lighting and shadow effects.
                
                Provide a short, exciting marketing description of this custom design.
            `;

                const textResult = await textModel.generateContent([
                    textPrompt,
                    { inlineData: { data: templateBase64, mimeType: "image/png" } },
                    { inlineData: { data: cleanArtwork, mimeType: "image/png" } },
                ]);

                const textResponse = await textResult.response;
                return {
                    success: true,
                    text: textResponse.text(),
                    warning: "Image generation limit reached. Showing AI analysis instead."
                };
            } catch (textError: any) {
                console.error("Text fallback failed:", textError);
                throw new Error("AI service unavailable: " + imageError.message);
            }
        }

        return { success: false, error: "No content generated" };
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return { success: false, error: error.message || "Failed to generate preview" };
    }
}
