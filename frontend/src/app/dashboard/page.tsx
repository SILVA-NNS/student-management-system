"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Sparkles, 
  Loader2, 
  BarChart3, 
  Clock, 
  ArrowRight,
  Settings,
  Bell
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("adminEmail");
    if (!token) {
      router.push("/");
    } else {
      setAdminEmail(email || "admin@sms.com");
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
          <p className="text-sm font-medium text-slate-400">Loading administrative portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 justify-between shrink-0 relative">
        <div className="space-y-8 relative">
          {/* Logo Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              SEMS PORTAL
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl bg-indigo-650 text-white transition-all shadow-md shadow-indigo-950/20 border border-indigo-500/25">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
              <Users className="h-5 w-5" />
              <span>Students</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
              <UserPlus className="h-5 w-5" />
              <span>Add Student</span>
            </a>
          </nav>
        </div>

        {/* User profile / Logout bottom */}
        <div className="space-y-4 pt-6 border-t border-slate-800/60 relative">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-semibold text-indigo-400 uppercase">
              {adminEmail.substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-400 truncate uppercase tracking-wider">Administrator</p>
              <p className="text-xs text-slate-500 truncate">{adminEmail}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 sm:px-10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-semibold text-sm tracking-wider bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              SEMS
            </span>
          </div>

          <div className="hidden lg:block text-sm font-medium text-slate-400">
            Overview / Dashboard
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950 animate-pulse" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* Logout Mobile */}
            <button 
              onClick={handleLogout}
              className="lg:hidden p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content Dashboard */}
        <main className="p-6 sm:p-10 space-y-8 flex-1 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg shadow-indigo-950/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
            <div className="relative max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <Sparkles className="h-3 w-3" />
                <span>Administrative Access Verified</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Welcome back, Administrator
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                We are configuring the Student Module next. Currently, all authentication endpoints are complete. Soon you will be able to manage students directly from this workspace.
              </p>
            </div>
          </div>

          {/* Metrics section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Students</span>
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold tracking-tight text-white">0</h3>
                <p className="text-xs text-slate-500">Student registry is currently empty</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Activities today</span>
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold tracking-tight text-white">1</h3>
                <p className="text-xs text-slate-500">System initialization completed</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Database Status</span>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold tracking-tight text-emerald-450">Active</h3>
                <p className="text-xs text-slate-500">Connected to local standalone MongoDB</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-white">Quick Navigation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group flex justify-between items-center p-6 bg-slate-900 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all cursor-pointer">
                <div className="space-y-1">
                  <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Register New Student</h4>
                  <p className="text-xs text-slate-400">Launch form to add a student to the directory</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>

              <div className="group flex justify-between items-center p-6 bg-slate-900 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all cursor-pointer">
                <div className="space-y-1">
                  <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Manage Directory</h4>
                  <p className="text-xs text-slate-400">View, search, edit and export registered student records</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
