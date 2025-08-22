'use client';
import { AiSummaryResponse } from "@/app/api/apiSchema/aiSummaryResponse";
import { useMealFormStore } from "@/store/mealFormStore";
import { useState } from "react";

export const useAISummary = () => {
    const {setField} = useMealFormStore();
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
            setField("aiSummary", (data as AiSummaryResponse).suggestion);
            setField("macros", (data as AiSummaryResponse).macros);
            setField("calories", (data as AiSummaryResponse).calories);
            setField("tags", (data as AiSummaryResponse).tags);
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