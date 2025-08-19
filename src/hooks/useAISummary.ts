'use client';
import { AiSummaryResponse } from "@/app/api/apiSchema/aiSummaryResponse";
import { useState } from "react";

export const useAISummary = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<AiSummaryResponse | null>(null);
    const getSummary = async (ingredients: string[], instructions: string) => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch("/api/ai/summary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ingredients, instructions })
            });
            const data = await response.json();
            setSummary(data as AiSummaryResponse);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Error fetching AI summary:", err);
            setLoading(false);
            setSummary(null);
            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred.");
            }
        }
    }
    return {
        getSummary,
        summary,
        loading,
        error,
    };
};