import { Meal, MealType } from "@/types/meal";
import { useMemo } from "react";

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

  const mealTypeData: Record<MealType, number> = {
    [MealType.Breakfast]: 10,
    [MealType.Lunch]: 15,
    [MealType.Dinner]: 20,
    [MealType.Snack]: 5
  };

export const useDashboardStats = (meals: Meal[]) => {
    if(!meals || meals.length === 0) {
        return {
            mealsLogged: 5,
            avgCalories: 1200,
            tagsUsed: 8,
            calorieTrend: caloriesLineChartData,
            macroBalance: macrosData,
            mealtypeDistribution: mealTypeData
        };
    }
  const mealsLogged = useMemo(() => meals.length, [meals]);
  const avgCalories = useMemo(() => meals.reduce((total, meal) => total + (meal.macros?.calories ?? 0), 0) / mealsLogged || 0, [meals, mealsLogged]);
  const tagsUsed = useMemo(() => meals.reduce((totalTags, meal) => totalTags + (meal.tags?.length ?? 0), 0), [meals]);
  const calorieTrend = useMemo(() => meals.map(meal => ({ date: meal.date, calories: meal.macros?.calories ?? 0 })), [meals]);
  const macroBalance = useMemo(() => meals.reduce((macrosTotal, meal) => {
    if (meal.macros) {
      macrosTotal.protein += meal.macros.protein;
      macrosTotal.carbs += meal.macros.carbs;
      macrosTotal.fats += meal.macros.fats;
    }
    return macrosTotal;
  }, { protein: 0, carbs: 0, fats: 0 }), [meals])

  const mealtypeDistribution = meals.reduce((distribution, meal) => {
    distribution[meal.type] = (distribution[meal.type] || 0) + 1;
    return distribution;
  }, {} as Record<MealType, number>);

  return {
    mealsLogged,
    avgCalories,
    tagsUsed,
    calorieTrend,
    macroBalance,
    mealtypeDistribution    
  };
};