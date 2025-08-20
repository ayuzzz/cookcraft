'use client'
import AiSummary from "@/components/log/AiSummary";
import LogMealForm from "@/components/log/LogMealForm";
import { useAISummary } from "@/hooks/useAISummary";
import { MealFormData } from "@/types/meal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Log(){
    const router = useRouter();
    const {status} = useSession();
    
    useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/login");
    }
    }, [status, router]);

    const initialSummaryData = {
                    calories: 0,
                    macros: { protein: 0, carbs: 0, fats: 0 },
                    tags: [],
                    aiSummary: "Awaiting AI summary..."
                }
    const { getSummary, loading, error, summary } = useAISummary();

    const generateAISummary = async (ingredients: string[], instructions: string) => {
        await getSummary(ingredients, instructions);
    }

    const submitData = async (data: MealFormData) => {
        // Store the latest form data for use in useEffect
        latestFormData.current = {...latestFormData.current, ...data};
        console.log("Submitting meal data:", latestFormData.current);
    };

    // Ref to keep track of the latest form data
    const latestFormData = useRef<MealFormData | null>(null);

    useEffect(() => {
        if (summary && latestFormData.current) {
            const data = latestFormData.current;
            if (!data.macros) {
                data.macros = { protein: 0, carbs: 0, fats: 0 };
            }
            data.calories = summary.calories ?? 0;
            data.macros.protein = summary.macros?.protein ?? 0;
            data.macros.carbs = summary.macros?.carbs ?? 0;
            data.macros.fats = summary.macros?.fats ?? 0;
            data.tags = summary.tags ?? [];
            data.aiSummary = summary.suggestion ?? "";
            latestFormData.current = data;
        }
        if (error) {
            console.error("Error fetching AI summary:", error);
        }
    }, [summary, error, loading]);

    return (
        <div className="container mx-auto py-8 flex justify-start gap-8">
            <div className="flex-none py-8">
                <LogMealForm onSubmit={submitData} onGenerateAISummary={generateAISummary} />
            </div>
            <div className="flex-grow py-8">
                <AiSummary
                    data={{
                        loading,
                        error,
                        ...initialSummaryData,
                        calories: summary?.calories ?? 0,
                        macros: {
                    protein: summary?.macros?.protein ?? 0,
                    carbs: summary?.macros?.carbs ?? 0,
                    fats: summary?.macros?.fats ?? 0,
                    },
                    tags: summary?.tags ?? [],
                    aiSummary: summary?.suggestion ?? "Awaiting AI summary...",
                }} />
            </div>
        </div>
    )
}