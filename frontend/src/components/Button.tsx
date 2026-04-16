interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "success";
}

export default function Button({ 
  children, 
  loading, 
  loadingText, 
  variant = "primary", 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-[#00A859] hover:bg-[#008e4b] text-white shadow-sm",
    secondary: "bg-black hover:bg-zinc-900 text-white",
    success: "bg-[#00A859] hover:bg-[#008e4b] text-white shadow-sm",
    outline: "bg-white border border-[#00A859] text-[#00A859] hover:bg-green-50",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full ${variants[variant]} font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center ${props.className || ""}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText || "Processing..."}
        </>
      ) : (
        children
      )}
    </button>
  );
}
