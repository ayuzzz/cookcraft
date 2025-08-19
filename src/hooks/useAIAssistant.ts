'use client';
import { Meal } from "@/types/meal";
import { useState } from "react";

export const useAIAssistant = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [aiResponse, setAIResponse] = useState<string | null>(null);
    const getAIResponse = async (query: string, meals: Meal[]) => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch("/api/ai/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query, meals })
            });
            const data = await response.json();
            setAIResponse(data.response as string);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Error fetching AI response:", err);
            setLoading(false);
            setAIResponse(null);
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
        }
    }
    return {
        getAIResponse,
        aiResponse,
        loading,
        error,
    };
};