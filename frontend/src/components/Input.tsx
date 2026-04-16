interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-purple-100 mb-1.5 ml-1">{label}</label>
      <input
        {...props}
        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${props.className || ""}`}
      />
    </div>
  );
}
