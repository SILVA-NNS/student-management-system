"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  GraduationCap, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Loader2, 
  Settings,
  Bell
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
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

  // Active link helper
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 justify-between shrink-0 relative">
        <div className="space-y-8 relative">
          {/* Logo Branding */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              SEMS PORTAL
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                isActive("/dashboard") 
                  ? "bg-indigo-650 text-white shadow-md shadow-indigo-950/20 border border-indigo-500/25" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/dashboard/students" 
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                pathname.startsWith("/dashboard/students") && !pathname.endsWith("/add")
                  ? "bg-indigo-650 text-white shadow-md shadow-indigo-950/20 border border-indigo-500/25" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Students</span>
            </Link>
            <Link 
              href="/dashboard/students/add" 
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                isActive("/dashboard/students/add")
                  ? "bg-indigo-650 text-white shadow-md shadow-indigo-950/20 border border-indigo-500/25" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Student</span>
            </Link>
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
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-semibold text-sm tracking-wider bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
                SEMS
              </span>
            </Link>
          </div>

          <div className="hidden lg:block text-sm font-medium text-slate-400">
            {isActive("/dashboard") ? "Overview / Dashboard" : pathname.includes("/students/add") ? "Students / Add New" : pathname.includes("/students/edit") ? "Students / Edit Record" : "Students / Directory"}
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

        {/* Page Content */}
        <main className="p-6 sm:p-10 space-y-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
