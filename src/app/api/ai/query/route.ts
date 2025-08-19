import { Meal } from "@/types/meal";
import { NextResponse } from "next/server";
import { AiAssistantResponse } from "../../apiSchema/aiAssistantResponse";

export async function POST(request: Request) {
  const { query, meals } = await request.json();

  const prompt = generatePromptForAIQuery(query, meals);
  console.log("Generated Prompt:", prompt);
  const aiResponse = await getAnswerFromAI(prompt);
  console.log("AI Response:", aiResponse);
  return NextResponse.json(aiResponse);
}

function generatePromptForAIQuery(query: string, meals: Meal[]): string {
  return `You are a nutrition expert analyzing a user's meals. Here are the recent meals and the user's query:
            Query: ${query}
            Meals: ${JSON.stringify(meals)}
            Give a helpful, detailed answer.
            Return this as a JSON object: {"response": string}
            Make sure to return only this JSON object and nothing else in the content output.`;
}

async function getAnswerFromAI(prompt: string): Promise<AiAssistantResponse> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch summary from AI");
  }

  try {
    const data = await response.json();
    // Extract the first JSON object from the content string
    const content = data.choices[0].message.content;
    const match = content.match(/{[\s\S]*}/);
    if (!match) {
      throw new Error("No JSON object found in AI response");
    }
    const jsonResponse = JSON.parse(match[0]);

    return jsonResponse as AiAssistantResponse;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Failed to parse AI response");
  }
}