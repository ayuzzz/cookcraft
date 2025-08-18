import { NextResponse } from "next/server";
import { AiSummaryResponse } from "../../apiSchema/aiSummaryResponse";

export async function POST(request: Request) {
  const { ingredients, instructions } = await request.json();

  const prompt = generatePromptForAI(ingredients, instructions);
  const summary = await getSummaryFromAI(prompt);

  return NextResponse.json(summary); // returns a JSON object
}

function generatePromptForAI(ingredients: string[], instructions: string): string {
  return `You are a nutrition expert. Analyze the following meal:
Ingredients: ${ingredients.join(", ")}
Instructions from the user: ${instructions}
Return this as a JSON object: {"calories": number, "macros": { "protein": number, "carbs": number, "fats": number }, "tags": [string], "suggestion": string}
Make sure to return only this JSON object and nothing else in the content output.`;
}

async function getSummaryFromAI(prompt: string): Promise<AiSummaryResponse> {
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

    return jsonResponse as AiSummaryResponse;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Failed to parse AI response");
  }
}