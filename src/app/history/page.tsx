'use client';
import MealHistoryActions from "@/components/mealHistory/mealHistoryActions";
import MealHistoryTable from "@/components/mealHistory/mealHistoryTable";
import { meals } from "@/data/mealData";
import { DateOption, Meal, MealType } from "@/types/meal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function History() {
    const DATE_DEFAULT_OPTION = "Select Date Range...";
    const MEALTYPE_DEFAULT_OPTION = "Select Meal Type...";
    const [searchText, setSearchText] = useState("");
    const [dateRange, setDateRange] = useState(DATE_DEFAULT_OPTION);
    const [mealType, setMealType] = useState(MEALTYPE_DEFAULT_OPTION);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const {status} = useSession();
    
    useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/login");
    }
    }, [status, router]);
      
    useEffect(() => {
        // Simulate loading state
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

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
      <MealHistoryTable data={filterMealData(searchText, dateRange, mealType)} loading={loading} />
    </div>
  );
}