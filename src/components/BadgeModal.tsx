import React from 'react';
import { BADGES_LIST } from '../data/curriculumData';
import { UserProgress } from '../types/curriculum';
import { playPopSound } from '../services/soundEffects';
import { X, Award, Star, CheckCircle2, Lock } from 'lucide-react';

interface BadgeModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ progress, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-blue-400 relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-1">
          <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-blue-200">
            🏆
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            My Badges & Trophies
          </h2>
          <p className="text-sm font-bold text-blue-700 font-['Tajawal',sans-serif]" dir="rtl">
            أوسمتي وإنجازاتي في برنامج اللغة الإنجليزية 3PS
          </p>
        </div>

        {/* Overall Progress Counter */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4 flex items-center justify-around text-center shadow-md">
          <div>
            <div className="text-2xl font-black">{progress.stars}</div>
            <div className="text-xs font-bold text-blue-100">Gold Stars ⭐</div>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div>
            <div className="text-2xl font-black">{progress.voicePracticeCount}</div>
            <div className="text-xs font-bold text-blue-100">Voice Practices 🎙️</div>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div>
            <div className="text-2xl font-black">{progress.cameraCardsFound}</div>
            <div className="text-xs font-bold text-blue-100">Cards Scanned 📷</div>
          </div>
        </div>

        {/* Badges List */}
        <div className="space-y-3">
          {BADGES_LIST.map((badge, idx) => {
            const isUnlocked = progress.stars >= idx * 10 || progress.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/80 border-amber-300 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                    isUnlocked ? 'bg-amber-200' : 'bg-slate-200'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {badge.title}
                    </h3>
                    <span className="text-xs font-bold text-amber-700 font-['Tajawal',sans-serif]">
                      ({badge.titleAr})
                    </span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400 ml-auto" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md shadow-amber-300 transition active:scale-95"
        >
          Keep Playing! 🦊
        </button>
      </div>
    </div>
  );
};
