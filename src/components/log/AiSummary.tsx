'use client';
import React from 'react';
import { Loader } from '../common/loader';

type AiSummaryProps = {
    loading: boolean;
    error?: string | null;
    calories: number;
    macros: { protein: number; carbs: number; fats: number };
    tags: string[];
    aiSummary: string;
}

export default function AiSummary({data}: {data: AiSummaryProps}) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">AI Summary</h1>
            {data.loading ? (
                <Loader alignment='left' />
            ) : (
                <>
                    {data.error && <p className="text-red-500">Error: {data.error}</p>}
                    {!data.error && <div className="mt-4">
                        <p><strong>Calories:</strong> {data.calories}</p>
                        <p><strong>Macros:</strong></p>
                        <ul>
                            <li>Protein: {data.macros.protein}</li>
                            <li>Carbs: {data.macros.carbs}</li>
                            <li>Fats: {data.macros.fats}</li>
                        </ul>
                        <p><strong>Tags:</strong> {data.tags.join(", ")}</p>
                        <p><strong>AI Summary:</strong> {data.aiSummary}</p>
                    </div>} 
                </>
            )}
        </div>
    )
}
