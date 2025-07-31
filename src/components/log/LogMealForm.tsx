'use client'
import { Meal, MealType, MealFormData } from "@/types/meal";
import { FieldError, useForm } from "react-hook-form";

type LogMealFormProps = {
    onSubmit: (data: MealFormData) => void;
    initialData?: Meal;
}

export default function LogMealForm({ onSubmit, initialData }: LogMealFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MealFormData>();

    const validationErrorElement = (errorField: FieldError) => {
        return errorField ? (
            <span className="text-red-500 text-sm">{errorField?.message}</span>
        ) : null;
    }
    console.log(errors);
    return (
        <form className="max-w-lg p-6 border border-gray-200 shadow-lg" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="date" className="block mb-2 mt-4">Date <span className="text-red-500">*</span></label>
            <input type="date" id="date" {...register("date", {required: 'Date is required'})} className="border p-2 rounded-lg min-w-full cursor-pointer"/>
            {errors.date && validationErrorElement(errors.date as FieldError)}

            <label htmlFor="type" className="block mb-2 mt-4">Meal Type <span className="text-red-500">*</span></label>
            <select id="type" {...register("type", {required: 'Meal type is required'})} className="border p-2 rounded-lg min-w-full cursor-pointer">
                <option value="">Select Meal Type...</option>
                {Object.values(MealType).map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {errors.type && validationErrorElement(errors.type as FieldError)}

            <label htmlFor="name" className="block mb-2 mt-4">Meal Name <span className="text-red-500">*</span></label>
            <input type="text" id="name" {...register("name", {required: 'Meal name is required'})} placeholder="e.g. Chicken Curry" className="border p-2 rounded-lg min-w-full"/>
            {errors.name && validationErrorElement(errors.name as FieldError)}

            <label htmlFor="ingredients" className="block mb-2 mt-4">Ingredients <span className="text-red-500">*</span></label>
            <textarea id="ingredients" {...register("ingredients", {required: 'Ingredients are required'})} placeholder="e.g. chicken, rice, olive oil, spinach" className="border p-2 rounded-lg min-w-full"/>
            {errors.ingredients && validationErrorElement(errors.ingredients as FieldError)}

            <label htmlFor="instructions" className="block mb-2 mt-4">Instructions <span className="text-red-500">*</span></label>
            <textarea id="instructions" {...register("instructions", {required: 'Instructions are required'})} placeholder="e.g. Cook chicken, boil rice, add olive oil, mix spinach" className="border p-2 rounded-lg min-w-full"/>
            {errors.instructions && validationErrorElement(errors.instructions as FieldError)}

            <label htmlFor="notes" className="block mb-2 mt-4">Notes</label>
            <textarea id="notes" {...register("notes")} placeholder="e.g. Low carbs today" className="border p-2 rounded-lg min-w-full"/>

            <label htmlFor="audioNotes" className="block mb-2 mt-4">Audio Notes</label>
            <input type="file" accept="audio/*" {...register("audioNotes")} className="border p-2 rounded-lg min-w-full cursor-pointer" />

            <button type="submit" className="border bg-blue-600 text-white mb-2 mt-4 px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer">
                Add Meal
            </button>
        </form>
    )
}