'use client';
import React from 'react';
import { Loader } from '../common/loader';
import { useMealFormStore } from '@/store/mealFormStore';

type AiSummaryProps = {
    error?: string | null;
    loading: boolean;
}

export default function AiSummary({data}: {data: AiSummaryProps}) {
    const {getFields} = useMealFormStore();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">AI Summary</h1>
            {data.loading ? (
                <Loader alignment='left' />
            ) : (
                <>
                    {data.error && <p className="text-red-500">Error: {data.error}</p>}
                    {!data.error && <div className="mt-4">
                        <p><strong>Calories:</strong> {getFields()?.calories}</p>
                        <p><strong>Macros:</strong></p>
                        <ul>
                            <li>Protein: {getFields()?.macros?.protein}</li>
                            <li>Carbs: {getFields()?.macros?.carbs}</li>
                            <li>Fats: {getFields()?.macros?.fats}</li>
                        </ul>
                        <p><strong>Tags:</strong> {getFields()?.tags?.join(", ")}</p>
                        <p><strong>AI Summary:</strong> {getFields()?.aiSummary}</p>
                    </div>}
                </>
            )}
        </div>
    )
}
