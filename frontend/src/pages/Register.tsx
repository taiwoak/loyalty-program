import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/register", { name, email, password });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="mb-10 text-center">
            <div className="flex justify-center mb-6">
               <div className="flex items-center space-x-2">
                 <div className="w-10 h-10 bg-[#00A859] rounded-lg flex items-center justify-center font-bold text-white text-xl">B</div>
                 <span className="text-2xl font-bold text-gray-900 tracking-tight">Bumpa</span>
               </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 font-medium tracking-tight">Join our loyalty program today.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm mb-8 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Taiwo Akerele"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="taiwo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" loading={loading} loadingText="Creating Account..." variant="primary" className="py-4">
              Create Account
            </Button>
          </form>

          <p className="text-center text-gray-600 font-medium mt-10">
            Already have an account? <Link to="/" className="text-[#00A859] hover:underline font-bold ml-1">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

