'use client';
import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

type MacroData = {
    macro: string;
    value: number;
}

type MacroDataProps = {
    data : {protein: number, carbs: number, fats: number};
}

const MacroRadarChart = ({data}: MacroDataProps) => {
    const chartData: MacroData[] = [
        { macro: "Protein", value: data.protein },
        { macro: "Carbs", value: data.carbs },
        { macro: "Fats", value: data.fats },
    ];

    return (
        <div className="w-full h-[500px] mt-6">
            <h2 className="text-lg font-semibold mb-4">Macro Balance</h2>
            <ResponsiveContainer>
                <RadarChart data={chartData} outerRadius={200}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="macro" />
                    <PolarRadiusAxis angle={-30} domain={[0, 1.5*Math.max(data.protein, data.carbs, data.fats)]} />
                    <Radar
                        name="Macro value"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                    />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MacroRadarChart;