'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

export default function CalorieLineChart({ data }: { data: { date: string; calories: number }[] }) {
  return (
   <div className="w-full h-[500px] mt-6">
        <h2 className="text-lg font-semibold mb-4">Calorie Intake</h2>
        <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="date"/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                <Legend align="right"/>
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}