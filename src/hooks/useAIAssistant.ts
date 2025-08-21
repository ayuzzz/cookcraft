'use client';
import { useAiStore } from "@/store/aiStore";
import { Meal } from "@/types/meal";
import { useState } from "react";

export const useAIAssistant = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAiResponse } = useAiStore();
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
            setAiResponse(data.response as string);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Error fetching AI response:", err);
            setLoading(false);
            setAiResponse(null);
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
        }
    }
    return {
        getAIResponse,
        loading,
        error,
    };
};