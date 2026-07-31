"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  MapPin, 
  Calendar,
  Loader2,
  ArrowLeft,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function AddStudent() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [registrationDate, setRegistrationDate] = useState(new Date().toISOString().split("T")[0]);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic Validation
    if (!fullName || !email || !course || !age || !gender) {
      setError("Please fill in all required fields marked with *");
      setLoading(false);
      return;
    }

    try {
      await API.post("/api/students", {
        fullName,
        email,
        phoneNumber,
        course,
        age: parseInt(age),
        gender,
        address,
        registrationDate
      });
      
      router.push("/dashboard/students");
    } catch (err: any) {
      if (err.response?.data) {
        setError(typeof err.response.data === "string" ? err.response.data : "Failed to register student record");
      } else {
        setError("Unable to connect to the backend server. Please verify it is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Back button and title */}
      <div className="space-y-4">
        <Link 
          href="/dashboard/students" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Directory</span>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Register Student</h2>
          <p className="text-sm text-slate-400">Fill in the administrative details below to add a student.</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/85 rounded-3xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-sm rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Full Name <span className="text-indigo-400">*</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <User className="h-5 w-5" />
                </span>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-650 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Email Address <span className="text-indigo-400">*</span>
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
                  placeholder="john.doe@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-650 transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Phone Number
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Phone className="h-5 w-5" />
                </span>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-650 transition-all"
                />
              </div>
            </div>

            {/* Course */}
            <div className="space-y-2">
              <label htmlFor="course" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Course Course <span className="text-indigo-400">*</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <BookOpen className="h-5 w-5" />
                </span>
                <select
                  id="course"
                  required
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-150 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-500">Select a course...</option>
                  <option value="Computer Science" className="bg-slate-900">Computer Science</option>
                  <option value="Software Engineering" className="bg-slate-900">Software Engineering</option>
                  <option value="Information Technology" className="bg-slate-900">Information Technology</option>
                  <option value="Business Administration" className="bg-slate-900">Business Administration</option>
                  <option value="Data Science" className="bg-slate-900">Data Science</option>
                  <option value="Cyber Security" className="bg-slate-900">Cyber Security</option>
                </select>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label htmlFor="age" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Age <span className="text-indigo-400">*</span>
              </label>
              <input
                id="age"
                type="number"
                required
                min="16"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="21"
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-650 transition-all"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label htmlFor="gender" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Gender <span className="text-indigo-400">*</span>
              </label>
              <div className="flex gap-4 pt-1">
                <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-700/85 rounded-xl cursor-pointer transition-all has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-500/5 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={() => setGender("Male")}
                    className="accent-indigo-500 h-4 w-4"
                  />
                  <span>Male</span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-700/85 rounded-xl cursor-pointer transition-all has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-500/5 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={() => setGender("Female")}
                    className="accent-indigo-500 h-4 w-4"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Registration Date */}
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="registrationDate" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Registration Date <span className="text-indigo-400">*</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Calendar className="h-5 w-5" />
                </span>
                <input
                  id="registrationDate"
                  type="date"
                  required
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-150 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="address" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Home Address
              </label>
              <div className="relative group">
                <span className="absolute top-3.5 left-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <MapPin className="h-5 w-5" />
                </span>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, City, Country"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-900/40 border border-slate-700/85 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-650 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-indigo-650 hover:bg-indigo-600 active:bg-indigo-700 disabled:bg-indigo-850 text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-900/40 border border-indigo-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registering student...</span>
              </>
            ) : (
              <>
                <GraduationCap className="h-5 w-5" />
                <span>Register Student</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
