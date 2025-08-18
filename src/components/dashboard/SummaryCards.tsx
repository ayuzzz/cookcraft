import SummaryCard from "../common/summaryCard";

type SummaryCardProps = {
    mealsLogged: number;
    avgCalories: number;
    tagsUsed: number;
}

const SummaryCards = (data: SummaryCardProps) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Summary Cards</h1>
            <div className="grid grid-cols-3 gap-4 mx-auto">            
                <SummaryCard title ="Meals logged this week" value={data.mealsLogged} />
                <SummaryCard title ="Average Calories Consumed" value={data.avgCalories} />
                <SummaryCard title ="Tags Used" value={data.tagsUsed} />
            </div>
        </div>
    )
}

export default SummaryCards;