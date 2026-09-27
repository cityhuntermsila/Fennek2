import React from 'react';
import { Star, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import { playPopSound, setMuted, getMuted } from '../services/soundEffects';

export type ActivePortalView = 'home' | 'student' | 'parent' | 'teacher' | 'marketplace' | 'curriculum' | 'tools';

interface NavbarProps {
  stars: number;
  streakDays?: number;
  isPro?: boolean;
  activeView: ActivePortalView;
  onChangeView: (view: ActivePortalView) => void;
  onOpenBadges: () => void;
  onOpenPricing: () => void;
  currentUnitTitle?: string;
  onReturnToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stars,
  streakDays = 4,
  isPro = false,
  activeView,
  onChangeView,
  onOpenBadges,
  onOpenPricing,
  currentUnitTitle,
  onReturnToHome
}) => {
  const [muted, setLocalMuted] = React.useState(getMuted());

  const toggleSound = () => {
    const next = !muted;
    setLocalMuted(next);
    setMuted(next);
    if (!next) {
      playPopSound();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <div
          onClick={() => {
            playPopSound();
            onReturnToHome();
          }}
          className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-xs group-hover:scale-105 transition-transform">
            <span>🦊</span>
          </div>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight font-display">
            Fenneco<span className="text-blue-600">.Academy</span>
          </span>
        </div>

        {/* Zone 2: Clean unboxed navigation links with hover states */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/70">
          <button
            onClick={() => {
              playPopSound();
              onChangeView('home');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'home'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              playPopSound();
              onChangeView('student');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'student'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student Quest
          </button>

          <button
            onClick={() => {
              playPopSound();
              onChangeView('parent');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'parent'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Parents
          </button>

          <button
            onClick={() => {
              playPopSound();
              onChangeView('teacher');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'teacher'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teachers
          </button>

          <button
            onClick={() => {
              playPopSound();
              onChangeView('marketplace');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'marketplace'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3PS Bookstore
          </button>

          <button
            onClick={() => {
              playPopSound();
              onChangeView('curriculum');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'curriculum'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Curriculum
          </button>

          <button
            onClick={() => {
              playPopSound();
              onChangeView('tools');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeView === 'tools'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Labs & Tools
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions & metrics */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Streak indicator */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 text-xs font-semibold"
            title="Consecutive daily practice streak"
          >
            <span>🔥</span>
            <span className="font-mono tabular-nums">{streakDays}d</span>
          </div>

          {/* Stars counter */}
          <button
            onClick={() => {
              playPopSound();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-lg text-amber-950 text-xs font-semibold transition"
            title="View earned badges and stars"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="font-mono tabular-nums">{stars}</span>
          </button>

          {/* Pro Button with Ventureo-inspired subtle arrow */}
          <button
            onClick={() => {
              playPopSound();
              onOpenPricing();
            }}
            className={`ventureo-arrow-btn flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl shadow-xs transition active:scale-95 whitespace-nowrap ${
              isPro
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPro ? 'Pro Active' : 'Go Pro'}</span>
            <div className="ventureo-arrow-circle hidden sm:flex w-4 h-4 rounded-full bg-white/20 items-center justify-center transition-transform">
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </button>

          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title={muted ? 'Unmute sound' : 'Mute sound'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Portal Navigation Bar (Scrollable horizontally) */}
      <div className="flex lg:hidden items-center gap-1 overflow-x-auto pt-2 mt-2 border-t border-slate-200/70 text-xs font-medium text-slate-600 scrollbar-none pb-0.5">
        <button
          onClick={() => {
            playPopSound();
            onChangeView('home');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'home' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => {
            playPopSound();
            onChangeView('student');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'student' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          Student
        </button>
        <button
          onClick={() => {
            playPopSound();
            onChangeView('parent');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'parent' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          Parents
        </button>
        <button
          onClick={() => {
            playPopSound();
            onChangeView('teacher');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'teacher' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          Teachers
        </button>
        <button
          onClick={() => {
            playPopSound();
            onChangeView('marketplace');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'marketplace' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          Bookstore
        </button>
        <button
          onClick={() => {
            playPopSound();
            onChangeView('curriculum');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'curriculum' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          Curriculum
        </button>
        <button
          onClick={() => {
            playPopSound();
            onChangeView('tools');
          }}
          className={`py-1 px-2.5 rounded-md whitespace-nowrap ${activeView === 'tools' ? 'text-blue-900 bg-blue-50 font-bold' : ''}`}
        >
          AI Tools
        </button>
      </div>
    </header>
  );
};
