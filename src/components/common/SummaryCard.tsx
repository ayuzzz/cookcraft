import Image from "next/image";

type SummaryCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
};

export default function SummaryCard({ title, value, icon, className = "" }: SummaryCardProps) {
  return (
    <div
      className={`bg-white shadow-sm rounded-lg p-5 border border-gray-200 flex items-center justify-around ${className} flex-wrap`}
    >
        {icon ? <div className="justify-center items-center">{icon} </div> : <div className="justify-center items-center">
            <Image
                src="/favicon.ico"
                alt="CookCraft Logo"
                width={40}
                height={40}
            /></div>}
      <div className="flex-grow-1 flex flex-col justify-center items-center">
        <h3 className="text-xl text-[var(--primary-text-color)] flex-wrap">{title}</h3>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}