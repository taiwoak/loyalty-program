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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Create Account</h1>
            <p className="text-green-400/70">Join our loyalty program today</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-6 text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Taiwo Akerele"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="focus:ring-green-500/50"
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="taiwo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-green-500/50"
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:ring-green-500/50"
            />

            <Button type="submit" loading={loading} loadingText="Creating Account..." variant="primary">
              Sign Up
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            Already have an account? <Link to="/" className="text-green-500 hover:text-green-400 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

