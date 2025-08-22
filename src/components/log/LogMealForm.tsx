'use client'
import { Meal, MealType, MealFormData } from "@/types/meal";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMealFormStore } from "@/store/mealFormStore";

type LogMealFormProps = {
    onSubmit: (data: MealFormData) => void;
    initialData?: Meal;
    onGenerateAISummary?: (ingredients: string[], instructions: string) => void;
}

export default function LogMealForm({ onSubmit, initialData, onGenerateAISummary }: LogMealFormProps) {
    const { setField, getFields } = useMealFormStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<MealFormData>({mode: "onChange"});

    const [summaryFieldsValid, setSummaryFieldsValid] = useState(false);

    // Update summaryFieldsValid reactively
    useEffect(() => {
        setSummaryFieldsValid(
            !!getFields().ingredients &&
            !!getFields().instructions &&
            errors.ingredients === undefined &&
            errors.instructions === undefined
        );
    }, [getFields().ingredients, getFields().instructions, errors.ingredients, errors.instructions]);

    const [summaryGenerated, setSummaryGenerated] = useState(getFields().aiSummary ? true : false);

    const handleGenerateSummary = () => {
            onGenerateAISummary?.(getFields().ingredients.split(", "), getFields().instructions);
            setSummaryGenerated(true);
            setSummaryFieldsValid(true);
    };

    const validationErrorElement = (errorField: FieldError) => {
        return errorField ? (
            <span className="text-red-500 text-sm">{errorField?.message}</span>
        ) : null;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Log a Meal</h1>
            <form className="max-w-lg p-6 border border-gray-200 shadow-lg" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="date" className="block mb-2 mt-4">Date <span className="text-red-500">*</span></label>
            <input
                type="date"
                value={getFields().date?.toString() ?? ""}
                id="date"
                {...register("date", {
                    required: 'Date is required',
                    onChange: (e) => setField("date", (e.target.valueAsDate.toISOString().split("T")[0]) as Date)
                })}
                className="border p-2 rounded-lg min-w-full cursor-pointer"
            />
                {errors.date && validationErrorElement(errors.date as FieldError)}

                <label htmlFor="type" className="block mb-2 mt-4">Meal Type <span className="text-red-500">*</span></label>
                <select id="type" value={getFields().type} {...register("type", {required: 'Meal type is required', onChange: (e) => setField("type", e.target.value as MealType)})}
                className="border p-2 rounded-lg min-w-full cursor-pointer">
                    <option value="">Select Meal Type...</option>
                    {Object.entries(MealType).map(([key, value], index) => (
                        <option key={`${key}-${value}-${index}`} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                {errors.type && validationErrorElement(errors.type as FieldError)}

                <label htmlFor="name" className="block mb-2 mt-4">Meal Name <span className="text-red-500">*</span></label>
                <input type="text" value={getFields().name} id="name" {...register("name", {required: 'Meal name is required', onChange: (e) => setField("name", e.target.value)})}
                placeholder="e.g. Chicken Curry" className="border p-2 rounded-lg min-w-full" />
                {errors.name && validationErrorElement(errors.name as FieldError)}

                <label htmlFor="ingredients" className="block mb-2 mt-4">Ingredients <span className="text-red-500">*</span></label>
                <textarea id="ingredients" value={getFields().ingredients} {...register("ingredients", {required: 'Ingredients are required', onChange: (e) => setField("ingredients", e.target.value)})}
                placeholder="e.g. chicken, rice, olive oil, spinach" className="border p-2 rounded-lg min-w-full disabled:bg-gray-300" disabled={summaryGenerated} />
                {errors.ingredients && validationErrorElement(errors.ingredients as FieldError)}

                <label htmlFor="instructions" className="block mb-2 mt-4">Instructions <span className="text-red-500">*</span></label>
                <textarea id="instructions" value={getFields().instructions} {...register("instructions", {required: 'Instructions are required', onChange: (e) => setField("instructions", e.target.value)})}
                placeholder="e.g. Cook chicken, boil rice, add olive oil, mix spinach" className="border p-2 rounded-lg min-w-full disabled:bg-gray-300" disabled={summaryGenerated} />
                {errors.instructions && validationErrorElement(errors.instructions as FieldError)}

                <label htmlFor="notes" className="block mb-2 mt-4">Notes</label>
                <textarea id="notes" value={getFields().notes} {...register("notes", {onChange: (e) => setField("notes", e.target.value)})} placeholder="e.g. Low carbs today" className="border p-2 rounded-lg min-w-full" />

                <label htmlFor="audioNotes" className="block mb-2 mt-4">Audio Notes</label>
                <input type="file" accept="audio/*" {...register("audioNotes", {onChange: (e) => setField("audioNotes", e.target.files)})} className="border p-2 rounded-lg min-w-full cursor-pointer" />

                <button type="button" onClick={() => handleGenerateSummary()} 
                className="border bg-blue-600 text-white mb-2 mt-4 px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={summaryGenerated || !summaryFieldsValid}>
                    Generate AI Summary
                </button>

                <button type="submit" className="border bg-blue-600 text-white mb-2 mt-4 px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!isValid || !summaryGenerated}>
                    Add Meal
                </button>
            </form>
        </div>
    )
}