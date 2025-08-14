import CalorieLineChart from "@/components/dashboard/caloriesLineChart";
import MacroRadarChart from "@/components/dashboard/macroRadarChart";
import MealTypePieChart from "@/components/dashboard/mealTypePieChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { MealType } from "@/types/meal";

export default function Dashboard() {
  const caloriesLineChartData = [
    { date: "2023-10-01", calories: 2000 },
    { date: "2023-10-02", calories: 1800 },
    { date: "2023-10-03", calories: 2200 },
    { date: "2023-10-04", calories: 2100 },
    { date: "2023-10-05", calories: 1900 },
    { date: "2023-10-06", calories: 2300 },
    { date: "2023-10-07", calories: 2500 }
  ];

  const macrosData = {
    protein: 350,
    carbs: 1100,
    fats: 600
  };

  const mealTypeData = [
    { mealType: MealType.Breakfast, value: 10 },
    { mealType: MealType.Lunch, value: 15 },
    { mealType: MealType.Dinner, value: 20 },
    { mealType: MealType.Snack, value: 5 }
  ];

  return (
    <main>
      <section className="container mx-auto py-8">
        <SummaryCards />
      </section>

      <section className="container mx-auto py-8">
        <CalorieLineChart data={caloriesLineChartData} />
        <MacroRadarChart data={macrosData} />
        <MealTypePieChart data={mealTypeData} />
      </section>

      <section className="container mx-auto py-8">
        Action Section
      </section>
    </main>
  );
}