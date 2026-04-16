import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  
  const [data, setData] = useState<any>(null);
  const [balance, setBalance] = useState<number>(userData.balance || 0);
  const [purchaseAmount, setPurchaseAmount] = useState<string>("500");
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = async () => {
    try {
      const res = await api.get(`/users/${userData.id}/achievements`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const makePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setPurchaseLoading(true);
    setMessage(null);
    try {
      const res = await api.post("/purchase", { amount: parseInt(purchaseAmount) });
      
      // Update balance from purchase response as requested
      if (res.data.balance !== undefined) {
        setBalance(res.data.balance);
      }
      
      await fetchData();
      
      if (res.data.cashback) {
        setMessage({ type: "success", text: res.data.cashback });
      } else {
        setMessage({ type: "success", text: "Purchase successful!" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Purchase failed." });
    } finally {
      setPurchaseLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
          <p className="text-purple-200/50 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center font-bold text-white">B</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">Bumpa Loyalty</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{userData.name}</p>
                <p className="text-xs text-slate-400">{userData.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-green-500 transition-colors"
                title="Logout"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {message && (
          <div className="mb-8">
            <Alert 
              type={message.type} 
              text={message.text} 
              onClose={() => setMessage(null)} 
              duration={message.type === "success" ? 8000 : 0}
            />
          </div>
        )}

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-green-600/20 to-black rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
              <div className="relative z-[1]">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome, {userData.name.split(' ')[0]}!</h2>
                <p className="text-slate-400 mb-6 max-w-md">You're making great progress in the Bumpa Loyalty program.</p>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/10 text-sm font-medium text-white">
                  Current Balance: <span className="text-green-400 ml-2 font-bold">₦{balance}</span>
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard 
                label="Achievements Unlocked" 
                value={data.unlocked_achievements.length} 
                icon="🏆"
                gradient="bg-gradient-to-br from-green-900/50 to-black"
              />
              
              <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs">Achievement History</h3>
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 text-lg">✅</div>
                </div>
                <div className="space-y-3">
                  {data.unlocked_achievements.length > 0 ? (
                    data.unlocked_achievements.map((a: string, i: number) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/20 transition-colors">
                        <span className="text-green-500 font-bold">✓</span>
                        <span className="font-medium text-white">{a}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm italic py-4">No achievements earned yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center">
              <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-6 w-full text-left">Level Progress</h3>
              <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-900/20 rounded-full flex items-center justify-center mb-6 relative">
                <div className="text-6xl animate-bounce">{data.current_badge ? "⭐" : "🌱"}</div>
                {data.current_badge && (
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
                )}
              </div>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 mb-2">
                {data.current_badge || "Bronze Member"}
              </p>
              <div className="w-full h-px bg-white/5 my-6"></div>
              <div className="w-full text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Next: {data.next_badge || "Silver"}</span>
                  <span className="text-sm font-bold text-green-400">{data.remaining_to_unlock_next_badge} left</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-1000" 
                    style={{ width: `${Math.max(10, 100 - (data.remaining_to_unlock_next_badge * 20))}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl">
              <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-6">Shopping Action</h3>
              <form onSubmit={makePurchase} className="space-y-4">
                <Input 
                  label="Purchase Amount (₦)"
                  type="number"
                  placeholder="500"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  min="1"
                  required
                  className="bg-black/50 border-white/10 focus:border-green-500/50"
                />
                <Button
                  type="submit"
                  loading={purchaseLoading}
                  variant="primary"
                >
                  Confirm Purchase
                </Button>
              </form>
              <p className="text-center text-[10px] text-slate-500 mt-4 leading-relaxed italic">
                Get rewarded for every spent naira.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
