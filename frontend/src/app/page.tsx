"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import { Lock, Mail, Loader2, Sparkles, GraduationCap, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/api/auth/login", { email, password });
      const { token } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("adminEmail", email);
      
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.data) {
        setError(typeof err.response.data === "string" ? err.response.data : "Authentication failed");
      } else {
        setError("Unable to connect to the backend server. Please verify it is running on port 5000.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
          <p className="text-sm font-medium text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-12 bg-slate-950 text-slate-100 antialiased overflow-hidden">
      {/* Left side: Premium Brand Panel */}
      <section className="hidden md:flex md:col-span-5 lg:col-span-6 relative flex-col justify-between p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-r border-slate-900">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.05),transparent_40%)]" />
        
        {/* Header Branding */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            SEMS PORTAL
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative max-w-md my-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Sparkles className="h-3 w.5 animate-pulse" />
            <span>Next-Generation Management</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
            Student <br />Management <br />System.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            A comprehensive, secure, and intuitive admin interface engineered to manage student directories, track statistics, and coordinate administrative processes seamlessly.
          </p>
        </div>

        {/* Footer Branding */}
        <div className="relative text-xs text-slate-500 font-medium">
          &copy; 2026 Student Management System. Built with Next.js & Spring Boot.
        </div>
      </section>

      {/* Right side: Login Panel */}
      <section className="flex col-span-1 md:col-span-7 lg:col-span-6 flex-col justify-center items-center p-6 sm:p-12 md:p-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8">
          {/* Header Mobile / Title */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex md:hidden h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Administrator Login
            </h2>
            <p className="text-sm text-slate-400">
              Welcome back. Access the administration portal with your credentials.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-sm rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="h-5 w-5" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@sms.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-600 transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="h-5 w-5" />
                  </span>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-600 transition-all backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="submit-login"
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-indigo-650 hover:bg-indigo-600 active:bg-indigo-700 disabled:bg-indigo-850 text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-950/40 relative group overflow-hidden border border-indigo-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="text-center md:text-left text-xs text-slate-600 font-medium">
            Authorized administrative access only. System activity is logged.
          </div>
        </div>
      </section>
    </main>
  );
}
