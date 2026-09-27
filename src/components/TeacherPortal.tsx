import React, { useState } from 'react';
import { UserProgress } from '../types/curriculum';
import { WORLDS_DATA } from '../data/curriculumData';
import { Building2, Users, BookOpen, Send, Download, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { playPopSound, playSuccessChime } from '../services/soundEffects';

interface TeacherPortalProps {
  onOpenWorksheets: () => void;
  onOpenPricing: () => void;
  onReturnToQuest: () => void;
}

interface StudentEntry {
  id: string;
  name: string;
  stars: number;
  pronunciationScore: number;
  lastActive: string;
  completedHomework: boolean;
}

const INITIAL_STUDENTS: StudentEntry[] = [
  { id: '1', name: 'Amina Benali', stars: 45, pronunciationScore: 94, lastActive: 'Today 10:15 AM', completedHomework: true },
  { id: '2', name: 'Rayan Khelifi', stars: 38, pronunciationScore: 88, lastActive: 'Yesterday', completedHomework: true },
  { id: '3', name: 'Youcef Mansouri', stars: 22, pronunciationScore: 78, lastActive: '3 days ago', completedHomework: false },
  { id: '4', name: 'Ines Boumediene', stars: 52, pronunciationScore: 96, lastActive: 'Today 08:30 AM', completedHomework: true },
  { id: '5', name: 'Mehdi Zerrouki', stars: 16, pronunciationScore: 71, lastActive: '5 days ago', completedHomework: false },
  { id: '6', name: 'Sarah Larbi', stars: 41, pronunciationScore: 90, lastActive: 'Yesterday', completedHomework: true },
  { id: '7', name: 'Walid Haddad', stars: 30, pronunciationScore: 82, lastActive: 'Today 11:00 AM', completedHomework: true },
];

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  onOpenWorksheets,
  onOpenPricing,
  onReturnToQuest
}) => {
  const [selectedClass, setSelectedClass] = useState<'3AP-1' | '3AP-2'>('3AP-1');
  const [students, setStudents] = useState<StudentEntry[]>(INITIAL_STUDENTS);
  const [assignedSuccess, setAssignedSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAssignHomework = () => {
    playSuccessChime();
    setAssignedSuccess(true);
    setTimeout(() => setAssignedSuccess(false), 3500);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Teachers Portal</span>
            <span>·</span>
            <span>El-Amel Primary School</span>
            <span>·</span>
            <span className="text-blue-700 font-bold">3rd Primary Year (3PS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Classroom Management & Progress Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
            Assign interactive oral homework, track students' AI pronunciation metrics, and download curriculum-compliant evaluation sheets.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAssignHomework}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Assign Homework</span>
          </button>

          <button
            onClick={() => {
              playPopSound();
              onOpenWorksheets();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition active:scale-95"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Printable 3PS Sheets</span>
          </button>
        </div>
      </div>

      {assignedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>
              Homework assigned successfully: "Unit 2: Family & Friends - Voice Practice" sent to {students.length} students!
            </span>
          </div>
          <span className="text-[11px] text-emerald-700">Due date: Next Sunday</span>
        </div>
      )}

      {/* Class Selector & Aggregate Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {students.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Class {selectedClass}</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Homework Completion</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
            {Math.round((students.filter(s => s.completedHomework).length / students.length) * 100)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">5 out of 7 completed</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Class AI Pronunciation</span>
            <span className="text-sm font-bold text-amber-600">🎙️</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            86%
          </div>
          <p className="text-[11px] text-emerald-700 mt-1 font-semibold">High phonetic clarity</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Current Curriculum Unit</span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-base font-extrabold text-slate-900 truncate">
            Unit 2: Family
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Term 1 · Active</p>
        </div>
      </div>

      {/* Class Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter class:</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
              <button
                onClick={() => {
                  playPopSound();
                  setSelectedClass('3AP-1');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                  selectedClass === '3AP-1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                3AP-1 (Morning)
              </button>
              <button
                onClick={() => {
                  playPopSound();
                  setSelectedClass('3AP-2');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                  selectedClass === '3AP-2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                3AP-2 (Afternoon)
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg w-56 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4 text-center">Gold Stars</th>
                <th className="py-3 px-4 text-center">AI Phonetics Score</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-center">Unit 2 Homework</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <span>{student.name}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums font-bold text-amber-800">
                    ⭐ {student.stars}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums">
                    <span
                      className={`font-bold ${
                        student.pronunciationScore >= 85
                          ? 'text-emerald-700'
                          : student.pronunciationScore >= 75
                          ? 'text-amber-700'
                          : 'text-rose-600'
                      }`}
                    >
                      {student.pronunciationScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">
                    {student.lastActive}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {student.completedHomework ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        playPopSound();
                        alert(`Reminder sent to the parents of ${student.name} via notification!`);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition"
                    >
                      Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Quiz Smartboard Generator */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
            Smartboard / Data Show Tool
          </span>
          <h3 className="text-lg font-black mt-1">
            Launch a Collective 3PS Classroom Quiz
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-lg font-medium">
            Project Massi's oral questions onto the whiteboard to engage the entire class with lively group answers.
          </p>
        </div>
        <button
          onClick={() => {
            playPopSound();
            onReturnToQuest();
          }}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition whitespace-nowrap active:scale-95"
        >
          Launch Classroom Mode
        </button>
      </div>
    </div>
  );
};
