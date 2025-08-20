'use client';
import AssistantResponse from "@/components/assistant/assistantResponse";
import { meals } from "@/data/mealData";
import { useAIAssistant } from "@/hooks/useAIAssistant";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Assistant(){
    const router = useRouter();
    const {data, status} = useSession() as { data: Session | null, status: "authenticated" | "unauthenticated" | "loading" };

    const [query, setQuery] = useState("");
    const [response, setResponse] = useState(`Hi ${data?.user?.name}, I am your assistant...`);

    useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/login");
    }
    }, [status, router]);

    const { getAIResponse, aiResponse, loading, error } = useAIAssistant();

    const handleAssistantQuery = async () => {
        await getAIResponse(query, meals);
        setResponse(aiResponse || "No response from AI");
        if(error){
            setResponse("An error occurred. Please try again.");
            return;
        }
    }

    return (
        <div className="mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
            <p>Ask your AI Assistant anything about your meals! The meal history is at your fingertips. Currently, we support using the past 30 days of Meal History</p>
            <input type="text" placeholder="Ask your question here..." className="mt-4 p-2 border border-gray-300 rounded w-full" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="mt-4 flex justify-start gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleAssistantQuery}>
                    Ask AI
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setQuery("")}>
                    Clear Question
                </button>
            </div>
            <AssistantResponse response={response} loading={loading} />          
        </div>
    );
}