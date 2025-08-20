'use client';
import CalorieLineChart from "@/components/dashboard/CaloriesLineChart";
import MacroRadarChart from "@/components/dashboard/MacroRadarChart";
import MealTypePieChart from "@/components/dashboard/MealTypePieChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useEffect, useState } from "react";
import { Loader } from "@/components/common/loader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const {status} = useSession();
  
  useEffect(() => {
  if (status === "unauthenticated") {
      router.push("/login");
  }
  }, [status, router]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { mealsLogged, avgCalories, tagsUsed, calorieTrend, macroBalance, mealtypeDistribution } = useDashboardStats([]); // Replace with actual meals data when available

  return (
    loading ? 
      <Loader alignment='center' /> : 
      (
        <>
          <main>
            <section className="container mx-auto py-8">
              <SummaryCards
                mealsLogged={mealsLogged}
                avgCalories={avgCalories}
                tagsUsed={tagsUsed}
              />
            </section>

            <section className="container mx-auto py-8">
              <CalorieLineChart data={calorieTrend} />
              <MacroRadarChart data={macroBalance} />
              <MealTypePieChart data={mealtypeDistribution} />
            </section>

            <section className="container mx-auto py-8">
              Action Section
            </section>
          </main>
        </>
      )
  );
}