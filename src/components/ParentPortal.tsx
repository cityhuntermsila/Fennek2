import React from 'react';
import { UserProgress } from '../types/curriculum';
import { WORLDS_DATA } from '../data/curriculumData';
import { Award, FileText, CheckCircle2, TrendingUp, Sparkles, BookOpen, Clock, Star, Volume2 } from 'lucide-react';
import { playPopSound } from '../services/soundEffects';

interface ParentPortalProps {
  progress: UserProgress;
  onOpenCertificate: () => void;
  onOpenWorksheets: () => void;
  onOpenPricing: () => void;
  onReturnToQuest: () => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  progress,
  onOpenCertificate,
  onOpenWorksheets,
  onOpenPricing,
  onReturnToQuest
}) => {
  const studentName = progress.studentName || 'Amina Benali';
  const totalStars = progress.stars;
  const completedCount = progress.completedUnits.length;
  const streak = progress.streakDays || 4;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Parents Portal</span>
            <span>·</span>
            <span>3PS Pedagogical Tracking</span>
            <span>·</span>
            <span className="text-blue-700 font-bold">School Year 2026/2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Parents Dashboard · {studentName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
            Monitor your child's speaking practice time, mastered phonetic competencies, official certificates, and printable home worksheets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              playPopSound();
              onOpenCertificate();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>Official 3PS Certificate</span>
          </button>

          <button
            onClick={() => {
              playPopSound();
              onOpenWorksheets();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition active:scale-95"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Printable Worksheets</span>
          </button>
        </div>
      </div>

      {/* Key Metric Numbers Grid (Tabular Numerals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Gold Stars</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalStars}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            +18 this week
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Study Streak</span>
            <span>🔥</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {streak} Days
          </div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            Weekly goal: 5/5 days
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Voice Practice</span>
            <Volume2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {progress.voicePracticeCount || 14}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Words spoken & analyzed
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Completed Units</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {completedCount} / 6
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Official 3PS curriculum
          </p>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Curriculum Mastery Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>3PS Textbook Unit Mastery Progress</span>
              <span className="text-xs font-normal text-slate-500">Ministry of Education aligned</span>
            </h2>

            <div className="space-y-4">
              {WORLDS_DATA.flatMap((w) => w.units).map((unit) => {
                const score = progress.unitScores[unit.id] || 0;
                const isDone = progress.completedUnits.includes(unit.id) || score >= 10;
                const percent = Math.min(100, Math.round((score / 15) * 100));

                return (
                  <div key={unit.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{unit.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">
                            Unit {unit.unitNumber}: {unit.titleEn}
                          </span>
                          <span className="text-xs font-['Tajawal'] text-slate-500" dir="rtl">
                            ({unit.titleAr})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-medium">
                          {unit.vocabulary.length} key words · Greetings, commands & letters
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-28 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700 w-10 text-right">
                        {percent}%
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Printable Materials Highlight */}
          <div className="bg-gradient-to-r from-blue-50/80 via-sky-50/40 to-slate-50 rounded-2xl p-6 border border-blue-200/80 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Printable Practice Sheets & Coloring Homework
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md font-medium">
                Download and print handwriting slates and vocabulary worksheets in 1 click for screen-free revision at the kitchen table.
              </p>
            </div>
            <button
              onClick={() => {
                playPopSound();
                onOpenWorksheets();
              }}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-900 text-xs font-bold rounded-lg border border-blue-300 shadow-xs shrink-0 transition"
            >
              Open Sheets
            </button>
          </div>
        </div>

        {/* Right 1 Col: Pedagogical Advice & Plan Status */}
        <div className="space-y-6">
          {/* Pedagogical Advice for Algerian Parents */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>💡</span>
              <span>Massi's Tips for Parents</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              In Algeria, 3PS primary students learn English alongside Arabic and French. Here are 2 key sounds to monitor at home:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                <span className="font-bold text-blue-900">1. Differentiating /P/ and /B/ :</span>
                <p className="text-slate-600 mt-0.5">
                  Arabic does not have a native /p/. Encourage your child to blow air against a paper slip when pronouncing <em>Pen, Pencil, Pupil</em>.
                </p>
              </div>
              <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                <span className="font-bold text-blue-900">2. The /θ/ sound (Three, Thank you) :</span>
                <p className="text-slate-600 mt-0.5">
                  Identical to the Arabic letter ث. Algerian students master this quickly when referencing this letter!
                </p>
              </div>
            </div>
          </div>

          {/* Pro Account Status Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {progress.isProAccount ? 'Pro Membership Active' : 'Free Plan'}
              </span>
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {progress.isProAccount
                ? 'Unlimited access to all modules, priority AI voice recognition, and certified diploma downloads.'
                : 'Upgrade to Fennec Pro to unlock all 3 Worlds and unlimited printable worksheets.'}
            </p>
            <button
              onClick={() => {
                playPopSound();
                onOpenPricing();
              }}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition"
            >
              {progress.isProAccount ? 'Manage Subscription' : 'Explore Fennec Pro'}
            </button>
          </div>

          {/* Quick Back Action */}
          <button
            onClick={() => {
              playPopSound();
              onReturnToQuest();
            }}
            className="w-full py-2.5 text-center text-xs font-bold text-slate-600 hover:text-blue-900 transition"
          >
            ← Back to Student Quest
          </button>
        </div>
      </div>
    </div>
  );
};
