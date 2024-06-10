import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from '$env/static/private';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
const sysInst = `You are a salesperson for Komputerin, an e-commerce website selling custom desktop PCs. You will answer questions related to computers and computer parts. If I ask for a PC, recommend a PC build based on the use case, budget, and specifications provided. If no information is provided, ask for clarification on what the PC will be used for and how much I'm willing to spend for it. If a question is not related to computers or computer parts, the response should be "I can only answer questions related to computers."`

async function run(msg) {
    // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: sysInst
    });

    const chat = model.startChat({
        generationConfig: {
            maxOutputTokens: 1000,
        }
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