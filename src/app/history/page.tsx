'use client';
import MealHistory from "@/components/mealHistory/mealHistoryTable";
import { Meal } from "@/types/meal";
import { useState } from "react";

export default function History() {
    const [searchText, setSearchText] = useState("");
    

    const meals: Meal[] = [
        {
            id: "1",
            date: "2023-10-01",
            name: "Spaghetti Bolognese",
            tags: ["pasta", "dinner"],
        },
        {
            id: "2",
            date: "2023-10-02",
            name: "Caesar Salad",
            tags: ["salad", "lunch"],
        },
        {
            id: "3",
            date: "2023-10-03",
            name: "Chicken Curry",
            tags: ["curry", "dinner"],
        },
        {
            id: "4",
            date: "2023-10-04",
            name: "Vegetable Stir Fry",
            tags: ["vegan", "lunch"],
        },
        {
            id: "5",
            date: "2023-10-05",
            name: "Beef Tacos",
            tags: ["tacos", "dinner"],
        },
    ];

    const filteredMeals = meals.filter(meal =>
        meal.name.toLowerCase().includes(searchText.toLowerCase()) ||
        meal.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
    );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Meal History</h1>
      <input type="text" value={searchText} id="search" placeholder="Search by meal or tag..." className="border p-2 rounded-lg mb-4" onChange={e => setSearchText((e.target as HTMLInputElement).value)} />
      <MealHistory data={filteredMeals} />
    </div>
  );
}