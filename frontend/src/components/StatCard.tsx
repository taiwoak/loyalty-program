interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  centered?: boolean;
}

export default function StatCard({ label, value, icon, centered }: StatCardProps) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-4 w-full shrink-0">
        <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs">{label}</h3>
        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-xl">{icon}</div>
      </div>
      <div className={`flex-1 flex items-center justify-center ${centered ? 'text-8xl' : 'text-4xl'} font-extrabold text-gray-900 tracking-tighter`}>
        {value}
      </div>
    </div>
  );
}
