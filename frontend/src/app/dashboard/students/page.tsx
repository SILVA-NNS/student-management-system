"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/services/api";
import { 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Loader2, 
  X,
  Calendar,
  Phone,
  BookOpen,
  MapPin,
  Mail,
  User,
  Users,
  GraduationCap
} from "lucide-react";

interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  age: number;
  gender: string;
  address: string;
  registrationDate: string;
}

export default function StudentDirectory() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch student lists
  const fetchStudents = async (query = "") => {
    setLoading(true);
    try {
      const url = query ? `/api/students?search=${encodeURIComponent(query)}` : "/api/students";
      const response = await API.get(url);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchStudents("");
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await API.delete(`/api/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting student", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Add Student CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Student Directory</h2>
          <p className="text-sm text-slate-400">View and manage all registered student records.</p>
        </div>
        <Link 
          href="/dashboard/students/add" 
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-950/20 border border-indigo-500/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Register Student</span>
        </Link>
      </div>

      {/* Search Filter Panel */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1 group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by full name or email address..."
            className="w-full pl-10 pr-10 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-600 transition-all backdrop-blur-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Table Directory */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-20 flex flex-col justify-center items-center gap-3 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <span className="text-sm font-medium">Loading student list...</span>
          </div>
        ) : students.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <div className="h-12 w-12 bg-slate-800/60 rounded-full flex items-center justify-center text-slate-500 mx-auto">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">No students found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {searchQuery ? "No records matched your search query. Try another term or clear the filter." : "Get started by adding the first student to the database."}
              </p>
            </div>
            {!searchQuery && (
              <Link 
                href="/dashboard/students/add" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold rounded-lg hover:bg-indigo-500/20 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add First Student</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/60 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-900/80">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Full Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Course</th>
                  <th className="py-4 px-6 text-center">Age</th>
                  <th className="py-4 px-6 text-center">Gender</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-sm">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-indigo-400 font-semibold">{student.studentId}</td>
                    <td className="py-4 px-6 font-semibold text-white">{student.fullName}</td>
                    <td className="py-4 px-6 text-slate-400">{student.email}</td>
                    <td className="py-4 px-6 text-slate-350">{student.course}</td>
                    <td className="py-4 px-6 text-center text-slate-400">{student.age}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        student.gender.toLowerCase() === 'male' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                      }`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link 
                        href={`/dashboard/students/edit/${student.id}`}
                        className="inline-flex p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Edit Record"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => setShowDeleteConfirm(student.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Student"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleUp">
            {/* Header / Close button */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Student Details</h3>
                  <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-wider">{selectedStudent.studentId}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <User className="h-3.5 w-3.5" />
                  <span>Full Name</span>
                </div>
                <p className="text-sm font-semibold text-white">{selectedStudent.fullName}</p>
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Address</span>
                </div>
                <p className="text-sm text-slate-300 break-all">{selectedStudent.email}</p>
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Phone Number</span>
                </div>
                <p className="text-sm text-slate-350">{selectedStudent.phoneNumber || "N/A"}</p>
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Course</span>
                </div>
                <p className="text-sm text-white">{selectedStudent.course}</p>
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span>Age / Gender</span>
                </div>
                <p className="text-sm text-slate-300">{selectedStudent.age} years / {selectedStudent.gender}</p>
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Registration Date</span>
                </div>
                <p className="text-sm text-slate-300">
                  {selectedStudent.registrationDate ? new Date(selectedStudent.registrationDate).toLocaleDateString() : "N/A"}
                </p>
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-1 sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Home Address</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedStudent.address || "No address provided"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl animate-scaleUp text-center">
            <div className="h-12 w-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
              <Trash2 className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">Delete Student Record?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to permanently delete this student record? This operation cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={deleting}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:bg-rose-800"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
