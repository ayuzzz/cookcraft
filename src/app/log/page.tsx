'use client'
import AiSummary from "@/components/log/AiSummary";
import LogMealForm from "@/components/log/LogMealForm";
import { useAISummary } from "@/hooks/useAISummary";
import { useMealFormStore } from "@/store/mealFormStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Log(){
    const router = useRouter();
    const {status} = useSession();
    const {getFields, clearStore} = useMealFormStore();
    
    useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/login");
    }
    }, [status, router]);

    const { getSummary, loading, error } = useAISummary();

    const generateAISummary = async (ingredients: string[], instructions: string) => {
        await getSummary(ingredients, instructions);
    }

    const submitData = async () => {
        // Store the latest form data for use in useEffect        
        console.log("Submitting meal data:", getFields());
        clearStore();
        router.push("/history");
    };

    return (
        <div className="container mx-auto py-8 flex justify-start gap-8">
            <div className="flex-none py-8">
                <LogMealForm onSubmit={submitData} onGenerateAISummary={generateAISummary} />
            </div>
            <div className="flex-grow py-8">
                <AiSummary
                    data={{
                        loading,
                        error
                }} />
            </div>
        </div>
    )
}