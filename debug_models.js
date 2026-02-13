const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.log("No API Key found");
        return;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            console.log("FOUND MODELS:");
            data.models.forEach(m => {
                if (m.name.includes("flash") || m.name.includes("pro")) {
                    console.log(m.name);
                }
            });
        } else {
            console.log("Error:", JSON.stringify(data));
        }
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

listModels();
