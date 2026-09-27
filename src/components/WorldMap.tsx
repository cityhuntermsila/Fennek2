import React, { useState } from 'react';
import { WORLDS_DATA } from '../data/curriculumData';
import { Unit, UserProgress } from '../types/curriculum';
import { playPopSound, playSuccessChime } from '../services/soundEffects';
import { Star, CheckCircle2, ChevronRight } from 'lucide-react';

interface WorldMapProps {
  progress: UserProgress;
  onSelectUnit: (unit: Unit) => void;
  onOpenPricing?: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ progress, onSelectUnit }) => {
  const [selectedTerm, setSelectedTerm] = useState<number>(1);

  const currentWorld = WORLDS_DATA.find((w) => w.term === selectedTerm) || WORLDS_DATA[0];
  const dailyTarget = progress.dailyStarsGoal || 15;
  const todayStars = progress.todayStars || Math.min(progress.stars, 12);
  const dailyPercent = Math.min(100, Math.round((todayStars / dailyTarget) * 100));

  const handleUnitClick = (unit: Unit) => {
    playSuccessChime();
    onSelectUnit(unit);
  };

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto space-y-6">
      {/* Daily Goal & Streak Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-lg">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Daily Practice Goal
              </span>
              <span className="text-[11px] text-slate-500">
                · {todayStars}/{dailyTarget} stars
              </span>
            </div>
            <div className="w-48 sm:w-64 bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${dailyPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🔥</span>
            <span>Active Streak: <strong className="text-slate-900 font-mono">{progress.streakDays || 4} days</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-900">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-mono font-bold">{progress.stars} total</span>
          </div>
        </div>
      </div>

      {/* World / Term Selector (Clean Segmented Tabs) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {WORLDS_DATA.map((world) => {
          const isActive = world.term === selectedTerm;
          return (
            <button
              key={world.id}
              onClick={() => {
                playPopSound();
                setSelectedTerm(world.term);
              }}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                isActive
                  ? 'bg-blue-600 text-white shadow-blue-600/25'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span className="text-xl">{world.badgeIcon}</span>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">
                  Term {world.term}
                </div>
                <div className="leading-tight font-extrabold">{world.nameEn}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* World Stage Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
        {/* World Header Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-1">
              <span>Term {currentWorld.term}</span>
              <span>·</span>
              <span className="font-['Tajawal',sans-serif]" dir="rtl">{currentWorld.nameAr}</span>
              <span>·</span>
              <span>{currentWorld.units.length} Learning Units</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 font-['Inter_Tight',sans-serif]">
              <span>{currentWorld.badgeIcon}</span>
              <span>{currentWorld.nameEn}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1 max-w-xl">
              {currentWorld.descriptionEn}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Term Badge
            </span>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1 mt-0.5">
              <span>{currentWorld.badgeIcon}</span>
              <span>{currentWorld.badgeName}</span>
            </span>
          </div>
        </div>

        {/* Units Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {currentWorld.units.map((unit) => {
            const isCompleted = progress.completedUnits.includes(unit.id);
            const score = progress.unitScores[unit.id] || 0;

            return (
              <div
                key={unit.id}
                onClick={() => handleUnitClick(unit)}
                className="group bg-white hover:bg-slate-50/90 rounded-2xl p-5 border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs ${unit.color} text-white group-hover:scale-105 transition-transform`}
                      >
                        {unit.icon}
                      </div>
                      <div>
                        {/* Unboxed metadata */}
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                          <span>Unit {unit.unitNumber}</span>
                          <span>·</span>
                          <span className="font-['Tajawal'] text-blue-900 font-bold" dir="rtl">{unit.titleAr}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors font-['Inter_Tight',sans-serif]">
                          {unit.titleEn}
                        </h3>
                      </div>
                    </div>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
                    {unit.description}
                  </p>

                  {/* Vocabulary preview items */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400">Key words:</span>
                    {unit.vocabulary.slice(0, 4).map((v) => (
                      <span key={v.id} className="text-slate-700 font-medium">
                        {v.emoji} {v.english}
                      </span>
                    ))}
                    {unit.vocabulary.length > 4 && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        +{unit.vocabulary.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Action */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 font-mono tabular-nums">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{score} Stars</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-extrabold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform">
                    <span>Start Unit</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
