'use client'
import LogMealForm from "@/components/log/LogMealForm";
import { MealFormData } from "@/types/meal";

export default function Log(){

    const submitData = (data: MealFormData) => {
        console.log("Form submitted with data:", data);
    }

    return (
        <div className="mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Log a Meal</h1>
            <LogMealForm onSubmit={submitData} />
        </div>
    )
}