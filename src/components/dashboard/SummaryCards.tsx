import SummaryCard from "../common/SummaryCard";

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
                <SummaryCard title ="Meals logged this week" value={data.mealsLogged} icon={<i className="fa-solid fa-bowl-food text-4xl text-blue-600"></i>} />
                <SummaryCard title ="Average Calories Consumed" value={data.avgCalories} icon={<i className="fa-solid fa-dumbbell text-4xl text-blue-600"></i>} />
                <SummaryCard title ="Tags Used" value={data.tagsUsed} icon={<i className="fa-solid fa-tags text-4xl text-blue-600"></i>} />
            </div>
        </div>
    )
}

export default SummaryCards;