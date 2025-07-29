'use client';
import MealHistoryActions from "@/components/mealHistory/mealHistoryActions";
import MealHistoryTable from "@/components/mealHistory/mealHistoryTable";
import { DateOption, Meal, MealType } from "@/types/meal";
import { useState } from "react";

export default function History() {
    const DATE_DEFAULT_OPTION = "Select Date Range...";
    const MEALTYPE_DEFAULT_OPTION = "Select Meal Type...";
    const [searchText, setSearchText] = useState("");
    const [dateRange, setDateRange] = useState(DATE_DEFAULT_OPTION);
    const [mealType, setMealType] = useState(MEALTYPE_DEFAULT_OPTION);
    
    const meals: Meal[] = [
        {
            id: "1",
            date: "2025-07-07",
            name: "Spaghetti Bolognese",
            type: MealType.Dinner,
            tags: ["pasta", "dinner"],
        },
        {
            id: "2",
            date: "2025-07-28",
            name: "Caesar Salad",
            type: MealType.Lunch,
            tags: ["salad", "lunch"],
        },
        {
            id: "3",
            date: "2025-06-30",
            name: "Chicken Curry",
            type: MealType.Dinner,
            tags: ["curry", "dinner"],
        },
        {
            id: "4",
            date: "2025-05-05",
            name: "Vegetable Stir Fry",
            type: MealType.Lunch,
            tags: ["vegan", "lunch"],
        },
        {
            id: "5",
            date: "2025-07-25",
            name: "Beef Tacos",
            type: MealType.Dinner,
            tags: ["tacos", "dinner"],
        },
    ];

    const filterMealData = (searchText: string, dateRange: string, mealType: string): Meal[] => {
        return meals.filter(meal =>
            (meal.name.toLowerCase().includes(searchText.toLowerCase()) ||
            meal.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))) &&
            (
                dateRange === DATE_DEFAULT_OPTION ||
                (new Date(meal.date) > getDateRange(dateRange))
            ) &&
            (mealType === MEALTYPE_DEFAULT_OPTION || meal.type === mealType)
        );
    };

    const getDateRange = (dateOption: string): Date => {
        switch (dateOption) {
            case DateOption.Last7Days:
                return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            case DateOption.Last30Days:
                return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            default:
                return new Date(Math.min(...meals.map(meal => new Date(meal.date).getTime())));
        }
    };

  return (
    <div className="mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Meal History</h1>
      <MealHistoryActions dateOptions={[DATE_DEFAULT_OPTION, ...Object.values(DateOption)]} mealTypeOptions={[MEALTYPE_DEFAULT_OPTION,...Object.values(MealType)]} searchText={searchText} 
        onSearchTextChange={setSearchText} onChangeDate={setDateRange} onChangeMealType={setMealType} />
      <MealHistoryTable data={filterMealData(searchText, dateRange, mealType)} />
    </div>
  );
}