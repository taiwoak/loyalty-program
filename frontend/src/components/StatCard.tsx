interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  gradient?: string;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs">{label}</h3>
        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">{icon}</div>
      </div>
      <div className="text-3xl font-extrabold text-gray-900">{value}</div>
    </div>
  );
}
