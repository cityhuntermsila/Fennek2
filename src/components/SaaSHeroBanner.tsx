import React from 'react';
import { Sparkles, ArrowRight, Users } from 'lucide-react';
import { MassiTheFennec } from './MassiTheFennec';
import { playPopSound } from '../services/soundEffects';

interface SaaSHeroBannerProps {
  onGoToStudent: () => void;
  onGoToParent: () => void;
  onGoToTeacher: () => void;
  onOpenPricing: () => void;
  isPro: boolean;
}

export const SaaSHeroBanner: React.FC<SaaSHeroBannerProps> = ({
  onGoToStudent,
  onGoToParent,
  onGoToTeacher,
  onOpenPricing,
  isPro
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-transparent border-b border-slate-200/80 pt-8 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-8 space-y-4">
            {/* Unboxed Metadata / Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Official 3PS Ministry Curriculum
              </span>
              <span className="text-slate-300">·</span>
              <span>Voice Recognition & Camera OCR</span>
              <span className="text-slate-300">·</span>
              <span>Family & School Portals</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Primary English{' '}
              <span className="ventureo-scribble text-blue-600">
                <span className="italic">simplified</span>
                <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 14C45 3.5 110 -1 195 10C150 14 80 16 40 18"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{' '}
              with AI & Massi
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-medium">
              An EdTech SaaS platform tailored for <strong>3rd Primary Year students in Algeria</strong>. Real-time pronunciation practice, interactive homework, printable worksheets, and weekly parental insights.
            </p>

            {/* Quick Action CTAs with Ventureo arrow */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playPopSound();
                  onGoToStudent();
                }}
                className="ventureo-arrow-btn flex items-center gap-2.5 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition active:scale-98 group"
              >
                <span>🎒 Launch Student Quest</span>
                <div className="ventureo-arrow-circle w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  onGoToParent();
                }}
                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200/90 shadow-xs transition active:scale-98"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>Parents Portal</span>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  onOpenPricing();
                }}
                className="flex items-center gap-1.5 px-3 py-3 text-slate-600 hover:text-blue-700 font-semibold text-xs transition"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isPro ? 'Pro Plan Active ⭐' : 'View Pro Plans'}</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 text-xs text-slate-600">
              <div>
                <span className="block font-bold text-slate-900">100% Aligned</span>
                <span className="text-[11px] text-slate-500 font-medium">3PS Official Textbook</span>
              </div>
              <div>
                <span className="block font-bold text-slate-900">AI Speech Coach</span>
                <span className="text-[11px] text-slate-500 font-medium">Instant Feedback</span>
              </div>
              <div>
                <span className="block font-bold text-slate-900">Certificate & Sheets</span>
                <span className="text-[11px] text-slate-500 font-medium">Printable A4 Ready</span>
              </div>
            </div>
          </div>

          {/* Right Mascot Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm text-center relative max-w-sm w-full">
              <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                Official Mascot
              </div>
              <MassiTheFennec
                mood="excited"
                size="md"
                speechTextEn="Welcome to Fenneco! Let's master 3PS English together!"
                speechTextAr="مرحباً بك في فينكو! هيا نتقن الإنجليزية معاً!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
