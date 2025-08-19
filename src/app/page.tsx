import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="mx-auto py-12 text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to CookCraft <Image src="/images/icon.ico" alt="CookCraft Logo" className="inline-block" width={50} height={50} /></h1>
        <p className="text-gray-600 text-lg">
          Your personal AI-powered meal log and nutrition assistant.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="/log" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Log Your First Meal
          </Link>
          <Link href="/dashboard" className="bg-gray-100 text-blue-700 px-6 py-3 rounded-md hover:bg-gray-200">
            View Dashboard
          </Link>
        </div>
      </section>
      <section className="py-16 max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: "🍽️", title: "Log Meals Easily", desc: "Type it or speak it — track what you eat in seconds." },
          { icon: "🤖", title: "AI Summaries", desc: "Calories, macros, and smart suggestions — all auto-generated." },
          { icon: "📊", title: "Visual Insights", desc: "Track your nutritional trends over time with clear charts." },
          { icon: "📥", title: "PDF Reports", desc: "Export summaries for weekly reviews or diet planning." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="p-6 bg-white rounded shadow text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </section>

      <section className="py-12 text-center text-gray-600 italic">
        <p>“CookCraft made it easy for me to understand what I actually eat.” – Alex, Home Chef</p>
      </section>


      <section className="py-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">See Insights Like This</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow flex flex-col items-center align-middle justify-between">
            <h3 className="font-semibold">Caloric Intake</h3>
            <Image src="/images/Calorie-Line-Chart-Sample.png" alt="Caloric Intake Chart" className="mx-auto" width={1000} height={1500}/>
            <p className="text-gray-500">Track your daily calories easily.</p>
          </div>
          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-between">
            <h3 className="font-semibold">Macro Breakdown</h3>
            <Image src="/images/Macros-Radar-Chart-Sample.png" alt="Macro Breakdown Chart" className="mx-auto" width={1000} height={1500}/>
            <p className="text-gray-500">See your protein, carbs, and fats at a glance.</p>
          </div>
          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-between">
            <h3 className="font-semibold">Meal Suggestions</h3>
            <Image src="/images/MealType-Pie-Chart-Sample.png" alt="Meal Suggestions Chart" className="mx-auto" width={1000} height={1500}/>
            <p className="text-gray-500">Get AI-generated meal ideas based on your logs.</p>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Ready to take control of your meals?</h3>
        <Link href="/log" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block">
          Start Logging Now
        </Link>
      </section>
    </>
  );
}
