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
    <div className={`fixed bottom-6 left-6 z-50 max-w-md p-4 rounded-xl shadow-2xl border flex items-center space-x-3 animate-in fade-in slide-in-from-left-full duration-500 bg-white ${styles[type]}`}>
      <span className="text-xl">{type === "success" ? "✨" : "⚠️"}</span>
      <p className="flex-1 font-bold text-gray-900">{text}</p>
      <button 
        onClick={onClose} 
        className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
