import { useEffect } from "react";

interface AlertProps {
  type: "success" | "error";
  text: string;
  onClose: () => void;
  duration?: number;
}

export default function Alert({ type, text, onClose, duration = 5000 }: AlertProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: "bg-emerald-500/10 border-emerald-500/50 text-emerald-200",
    error: "bg-red-500/10 border-red-500/50 text-red-200",
  };

  return (
    <div className={`p-4 rounded-xl border flex items-center space-x-3 animate-in fade-in slide-in-from-top-4 duration-300 ${styles[type]}`}>
      <span className="text-xl">{type === "success" ? "✨" : "⚠️"}</span>
      <p className="flex-1 font-medium">{text}</p>
      <button 
        onClick={onClose} 
        className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-50 hover:opacity-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
