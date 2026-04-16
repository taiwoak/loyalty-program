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
  const [purchaseAmount, setPurchaseAmount] = useState<string>("100");
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#00A859] rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Synchronizing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#00A859] rounded-lg flex items-center justify-center font-bold text-white">B</div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Bumpa Loyalty</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-500 font-medium">{userData.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all font-semibold text-sm"
              >
                <span>Logout</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Alerts Section (Positioned fixed via Alert component) */}
        {message && (
          <Alert 
            type={message.type} 
            text={message.text} 
            onClose={() => setMessage(null)} 
            duration={message.type === "success" ? 8000 : 0}
          />
        )}

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="relative z-[1]">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome, {userData.name.split(' ')[0]}!</h2>
                <p className="text-gray-500 mb-8 max-w-md font-medium leading-relaxed">You're making great progress in the Bumpa Loyalty program. Keep shopping to unlock more rewards.</p>
                <div className="inline-flex items-center px-6 py-3 bg-green-50 rounded-xl border border-green-100 text-sm font-bold text-[#00A859]">
                  Current Wallet Balance: <span className="ml-2 text-lg">₦{balance}</span>
                </div>
              </div>
               <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-50/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StatCard 
                label="Achievements Unlocked" 
                value={data.unlocked_achievements.length} 
                icon="🏆"
              />
              
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-400 uppercase tracking-tighter text-xs">Achievement History</h3>
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-[#00A859] text-lg font-bold">✓</div>
                </div>
                <div className="space-y-4">
                  {data.unlocked_achievements.length > 0 ? (
                    data.unlocked_achievements.map((a: string, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 group hover:border-[#00A859]/30 transition-all">
                        <span className="font-bold text-gray-900">{a}</span>
                        <span className="text-xs bg-[#00A859] text-white px-2 py-1 rounded font-bold uppercase">Unlocked</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm font-medium italic py-4">No awards yet. Start shopping!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-gray-400 uppercase tracking-tighter text-xs mb-8">Loyalty Level</h3>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner">
                  <div className="text-6xl">{data.current_badge ? "⭐" : "🌱"}</div>
                </div>
                <p className="text-2xl font-extrabold text-gray-900 mb-1">
                  {data.current_badge || "Bronze Member"}
                </p>
                <div className="w-full h-px bg-gray-100 my-8"></div>
                <div className="w-full text-left space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-500">Next Level: {data.next_badge || "Silver"}</span>
                    <span className="text-sm font-extrabold text-[#00A859]">{data.remaining_to_unlock_next_badge} tasks left</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                    <div 
                      className="h-full bg-[#00A859] transition-all duration-1000 shadow-sm" 
                      style={{ width: `${Math.max(5, 100 - (data.remaining_to_unlock_next_badge * 20))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-gray-400 uppercase tracking-tighter text-xs mb-8">Quick Action</h3>
              <form onSubmit={makePurchase} className="space-y-6">
                <Input 
                  label="Purchase Amount (₦)"
                  type="number"
                  placeholder="e.g. 5000"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  min="1"
                  required
                />
                <Button
                  type="submit"
                  loading={purchaseLoading}
                  variant="primary"
                  className="py-4 shadow-md"
                >
                  Process Purchase
                </Button>
              </form>
              <p className="text-center text-[11px] text-gray-400 mt-6 leading-relaxed font-medium">
                Unlock higher loyalty levels and cashback with every naira spent on our platform.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

