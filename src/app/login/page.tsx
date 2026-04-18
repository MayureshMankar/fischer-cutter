"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, ShieldCheck, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // BACKEND RETURNS: { _id, name, email, role, token }
        localStorage.setItem("fischer_cutter_token", data.token);
        localStorage.setItem("fischer_cutter_user", JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role
        }));
        router.push("/");
      } else {
        setError(data.message || "LOGIN ERROR. ACCESS DENIED.");
      }
    } catch (err) {
      setError("COMMUNICATION FAILURE. PLEASE TRY AGAIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0C0E] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-machine-green/5 rounded-full blur-[200px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-[#111111] p-10 lg:p-12 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border border-white/5 relative rounded-none">
          <div className="absolute -top-10 left-12 bg-machine-green w-16 h-1 bg-neon-green shadow-[0_0_15px_rgba(50,205,50,0.5)]" />

          <div className="mb-10">
            <div className="text-machine-green text-[10px] font-bold uppercase tracking-wider mb-2 opacity-80">
              Sri Devi Engineers
            </div>
            <h2 className="text-3xl font-bold text-white uppercase leading-none">
              Partner <span className="text-machine-green">Login.</span>
            </h2>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-950/20 border-l-2 border-red-500 flex items-center gap-4">
              <AlertCircle className="text-red-500 w-4 h-4 shrink-0" />
              <p className="text-[11px] font-bold text-red-200 uppercase tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wide text-slate-300 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@company.com"
                required
                className="w-full h-12 bg-black border border-white/5 rounded-none px-6 text-sm font-medium text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wide text-slate-300 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-12 bg-black border border-white/5 rounded-none px-6 pr-12 text-sm font-medium text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-machine-green transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-machine-neon w-full h-14 rounded-none text-[12px] uppercase tracking-widest font-bold"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-4 text-black">Login <ArrowRight className="w-4 h-4" /></span>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
               <Link href="/signup" className="text-[10px] font-bold text-slate-400 uppercase hover:text-machine-green transition-colors">Create Account</Link>
               <Link href="/" className="text-[10px] font-bold text-slate-500 uppercase hover:text-machine-green transition-colors">Cancel</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
