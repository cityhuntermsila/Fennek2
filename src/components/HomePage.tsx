import React from 'react';
import { UserProgress } from '../types/curriculum';
import { playPopSound } from '../services/soundEffects';
import {
  ArrowRight,
  Star,
  Users,
  Building2,
  BookOpen,
  ShoppingBag,
  Wrench,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  progress: UserProgress;
  onGoToStudent: () => void;
  onGoToParent: () => void;
  onGoToTeacher: () => void;
  onGoToMarketplace: () => void;
  onGoToCurriculum: () => void;
  onGoToTools: () => void;
  onOpenPricing: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  progress,
  onGoToStudent,
  onGoToParent,
  onGoToTeacher,
  onGoToMarketplace,
  onGoToCurriculum,
  onGoToTools,
  onOpenPricing
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-16 animate-fadeIn">
      {/* ========================================================================= */}
      {/* MINIMALIST VENTUREO-STYLE HERO SECTION                                    */}
      {/* ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-4 sm:pt-10 space-y-6">
        {/* Subtle luminous radial mesh blur */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[320px] bg-gradient-to-tr from-blue-600/10 via-sky-400/10 to-indigo-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Eyebrow Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition cursor-default">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">
            AI EdTech Platform · 3rd Primary Year (3PS) Algeria
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-blue-600">
            Aligned with National Ministry of Education 2026/2027
          </span>
        </div>

        {/* Title with Ventureo signature scribble */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Transform your students into{' '}
            <span className="ventureo-scribble text-blue-600">
              <span className="italic font-black">confident communicators</span>
              <svg viewBox="0 0 340 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 18C70 4.5 175 -2 337 13C265 18 140 20 70 23.5"
                  stroke="#F59E0B"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>{' '}
            with AI 💡
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            A streamlined portal providing direct, independent access to dedicated learning spaces, monitoring tools, and classroom resources.
          </p>
        </div>

        {/* Live Metrics Counter Bar (Next-counter style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-3xl mx-auto">
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums">
              +120h
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
              Audio & Speaking Practice
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              6 Units
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
              Official 3PS Curriculum
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
              98%
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
              Phonetic Mastery Rate
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-amber-500 font-mono tabular-nums">
              58 Wilayas
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
              Schools & Families Reached
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6 INDEPENDENT CATEGORY CARDS (Each routes to its standalone page)          */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Navigation by Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Choose your dedicated space
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Each category features its own standalone and comprehensive page.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. STUDENT QUEST */}
          <div
            onClick={() => {
              playPopSound();
              onGoToStudent();
            }}
            className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎒
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  Student Quest
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                Student Quest & The 3 Worlds
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Interactive journey through all 6 official units: voiced vocabulary, voice recording coach, webcam flashcard scanner, and quizzes with Massi.
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {progress.stars} stars
                </span>
                <span>·</span>
                <span>🔥 {progress.streakDays || 4}d streak</span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Open Student Quest</span>
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 2. PARENTS PORTAL */}
          <div
            onClick={() => {
              playPopSound();
              onGoToParent();
            }}
            className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👨‍👩‍👧
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Parents Portal
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Parents Hub & Home Guidance
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Monitor real study time, access phonetics tips explained in Arabic and French, and download screen-free worksheets for home practice.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/70 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Arabic & French phonetic guidance included</span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>View Parents Portal</span>
              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 3. TEACHERS PORTAL */}
          <div
            onClick={() => {
              playPopSound();
              onGoToTeacher();
            }}
            className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-slate-800 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏫
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                  Teachers Portal
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                Teachers Hub & Classroom Projection
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Full-screen Data Show mode for primary school projectors, 1-click homework assignments, and official Ministry evaluation rubrics.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                <span>🖥️ Calibrated for School Projectors & Smartboards</span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Open Teachers Portal</span>
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 4. BOOKSTORE & SUPPLIES */}
          <div
            onClick={() => {
              playPopSound();
              onGoToMarketplace();
            }}
            className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-amber-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🛍️
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full">
                  3PS Bookstore
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                Bookstore & Approved Supplies
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Official 'My Book of English 3PS' textbooks, handwriting slates, audio headsets, and bilingual reader books with exclusive promo codes.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50/70 p-2.5 rounded-xl">
                <span>🚚 Guaranteed delivery across all 58 Wilayas</span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Visit 3PS Bookstore</span>
              <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 5. CURRICULUM & METHODOLOGY */}
          <div
            onClick={() => {
              playPopSound();
              onGoToCurriculum();
            }}
            className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-sky-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📖
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full">
                  Curriculum Hub
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                Official Curriculum & 5-Step Method
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                The 5 progressive stages (Frame, Immerse, Practice, Trace, Certify) and official pedagogical syllabus from the Ministry of Education.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-50/70 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% National Curriculum Alignment 2026/2027</span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>Explore Curriculum</span>
              <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 6. AI TOOLS & LABS */}
          <div
            onClick={() => {
              playPopSound();
              onGoToTools();
            }}
            className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-purple-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🛠️
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full">
                  AI Tools Hub
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                AI Toolkits & Interactive Studios
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Instant access to Voice Pronunciation Coach, Flashcard Camera OCR, Cursive Handwriting Slate, Exam Command Quizzes, and PDF Worksheets.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-800 bg-purple-50/70 p-2.5 rounded-xl">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>6 Standalone interactive workshops</span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Explore AI Tools</span>
              <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REASSURANCE BANNER                                                        */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            Trusted by primary English inspectors & educators
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold">
            Explore Fenneco Pro for Families & Classrooms
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Unlimited printable PDF worksheets, priority voice recognition, and certified official diplomas.
          </p>
        </div>

        <button
          onClick={() => {
            playPopSound();
            onOpenPricing();
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition whitespace-nowrap active:scale-95 shadow-xs"
        >
          View Pro Plans
        </button>
      </section>

      {/* ========================================================================= */}
      {/* CLEAN FOOTER                                                              */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200/80 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span>🦊</span>
          <span className="font-bold text-slate-700">Fenneco Academy 3PS</span>
          <span>·</span>
          <span>Aligned with Algerian Ministry of National Education 2026/2027</span>
        </div>
        <div className="flex items-center gap-4">
          <span>58 Algerian Wilayas</span>
          <span>·</span>
          <span>Children Privacy & Data Protection Compliant</span>
        </div>
      </footer>
    </div>
  );
};
