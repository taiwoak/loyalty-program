interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  gradient?: string;
}

export default function StatCard({ label, value, icon, gradient }: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl border border-white/5 relative overflow-hidden group ${gradient || "bg-slate-900"}`}>
      <div className="relative z-[1]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs">{label}</h3>
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-lg">{icon}</div>
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
    </div>
  );
}
