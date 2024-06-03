import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from '$env/static/private';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(msg) {
    // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = await response.text();
    
    return text;
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const text = await run(data.get('chat'));

        return {
            msg: text
        }
    }
}