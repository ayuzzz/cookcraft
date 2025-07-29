import SummaryCards from "@/components/dashboard/SummaryCards";

export default function Dashboard() {
  return (
    <main>
      <section className="container mx-auto py-8">
        <SummaryCards />
      </section>

      <section>
        <h1>Charts Section</h1>
      </section>

      <section>
        Action Section
      </section>
    </main>
  );
}