import SummaryCard from "../common/summaryCard";

const SummaryCards = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Summary Cards</h1>
            <div className="grid grid-cols-3 gap-4 mx-auto">            
                <SummaryCard title ="Meals logged this week" value={5} />
                <SummaryCard title ="Average Calories Consumed" value={6} />
                <SummaryCard title ="Tags Used" value={7} />
            </div>
            
        </div>
    )
}

export default SummaryCards;