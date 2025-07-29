import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto py-12 text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome to CookCraft 👩‍🍳</h1>
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
  );
}
