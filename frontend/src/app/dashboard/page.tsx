"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/services/api";
import { 
  Users, 
  Clock, 
  BarChart3, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function DashboardOverview() {
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await API.get("/api/students");
        setStudentCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900/80 via-slate-800 to-purple-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg shadow-indigo-900/10">
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
            Monitor registry metrics, manage student profiles, and update information from this central administrative workspace.
          </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Total Students */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-750/80 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Students</span>
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tight text-white">
              {loading ? "..." : studentCount}
            </h3>
            <p className="text-xs text-slate-500">
              {studentCount === 0 ? "Student registry is currently empty" : `${studentCount} active students registered`}
            </p>
          </div>
        </div>

        {/* Metric 2: Activities Today */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-750/80 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Activities Today</span>
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tight text-white">Active</h3>
            <p className="text-xs text-slate-500">Realtime management enabled</p>
          </div>
        </div>

        {/* Metric 3: Database Status */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-750/80 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Database Status</span>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tight text-emerald-450">Online</h3>
            <p className="text-xs text-slate-500">Connected to local standalone MongoDB</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Panel */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold tracking-tight text-white">Quick Navigation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/students/add" className="group flex justify-between items-center p-6 bg-slate-800 border border-slate-750/80 rounded-2xl hover:border-slate-700 transition-all cursor-pointer">
            <div className="space-y-1">
              <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Register New Student</h4>
              <p className="text-xs text-slate-400">Launch form to add a student to the directory</p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/dashboard/students" className="group flex justify-between items-center p-6 bg-slate-800 border border-slate-750/80 rounded-2xl hover:border-slate-700 transition-all cursor-pointer">
            <div className="space-y-1">
              <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Manage Directory</h4>
              <p className="text-xs text-slate-400">View, search, edit and delete registered student records</p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
