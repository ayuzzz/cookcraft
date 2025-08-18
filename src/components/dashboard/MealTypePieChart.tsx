'use client';
import { MealType } from '@/types/meal';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

type MealTypeProps = {
    data: Record<MealType, number>;
}

// Cnverting record to array for recharts compatibility
// Recharts PieChart requires data in array format, so we convert the record to an array
const MealTypePieChart = ({data}: MealTypeProps) => {
  const chartData = Object.entries(data).map(([mealType, value]) => ({
    mealType,
    value,
  }));

  return (
    <div className="w-full h-[500px]">
      <h2 className="text-lg font-semibold mb-4">Meal Type Distribution</h2>
      <ResponsiveContainer>
        <PieChart>
        <Pie
          nameKey="mealType"
          dataKey="value"
          data={chartData}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
            key={`cell-${index}`}
            fill={['#8884d8', '#82ca9d', '#4F8FEA', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57'][index % 7]}
            />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    );
};

export default MealTypePieChart;