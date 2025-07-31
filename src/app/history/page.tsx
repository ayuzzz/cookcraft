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
            id: 1,
            date: "2025-07-07",
            name: "Spaghetti Bolognese",
            type: MealType.Dinner,
            tags: ["pasta", "dinner"],
            ingredients: ["spaghetti", "ground beef", "tomato sauce"],
            instructions: "Cook spaghetti, brown beef, add sauce, combine.",
            aiSummary: "A classic Italian dish with a rich meat sauce.",
        },
        {
            id: 2,
            date: "2025-07-28",
            name: "Caesar Salad",
            type: MealType.Snack,
            tags: ["salad", "snack"],
            ingredients: ["romaine lettuce", "croutons", "Caesar dressing"],
            instructions: "Toss lettuce with dressing, add croutons.",
            aiSummary: "A refreshing salad with a creamy dressing.",
        },
        {
            id: 3,
            date: "2025-06-30",
            name: "Chicken Curry",
            type: MealType.Lunch,
            tags: ["curry", "lunch"],
            ingredients: ["chicken", "curry powder", "coconut milk"],
            instructions: "Cook chicken, add curry powder, stir in coconut milk.",
            aiSummary: "A spicy and flavorful dish with tender chicken.",
        },
        {
            id: 4,
            date: "2025-05-05",
            name: "Vegetable Stir Fry",
            type: MealType.Breakfast,
            tags: ["vegan", "breakfast"],
            ingredients: ["mixed vegetables", "soy sauce", "ginger"],
            instructions: "Stir fry vegetables with soy sauce and ginger.",
            aiSummary: "A quick and healthy stir fry packed with flavor.",
        },
        {
            id: 5,
            date: "2025-07-25",
            name: "Beef Tacos",
            type: MealType.Lunch,
            tags: ["tacos", "lunch"],
            ingredients: ["ground beef", "taco shells", "lettuce", "cheese"],
            instructions: "Cook beef, fill taco shells with beef, lettuce, and cheese.",
            aiSummary: "A fun and customizable meal with seasoned beef in crispy shells.",
        },
    ];

    const filterMealData = (searchText: string, dateRange: string, mealType: string): Meal[] => {
        return meals.filter(meal =>
            (meal.name.toLowerCase().includes(searchText.toLowerCase()) ||
            meal.tags?.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))) &&
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