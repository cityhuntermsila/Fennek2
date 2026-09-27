import React from 'react';
import { Unit, ActivityType } from '../types/curriculum';
import { MassiTheFennec } from './MassiTheFennec';
import { playPopSound, playSuccessChime } from '../services/soundEffects';
import {
  ArrowLeft,
  Volume2,
  Mic,
  Camera,
  PenTool,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Star,
  Play
} from 'lucide-react';

interface UnitDashboardProps {
  unit: Unit;
  stars: number;
  onSelectActivity: (activity: ActivityType) => void;
  onBackToMap: () => void;
}

export const UnitDashboard: React.FC<UnitDashboardProps> = ({
  unit,
  stars,
  onSelectActivity,
  onBackToMap
}) => {
  const activities = [
    {
      type: 'explore' as ActivityType,
      title: 'Vocabulary Explorer',
      titleAr: 'اكتشاف الكلمات',
      description: 'Flip through flashcards, listen to native English audio, and read examples.',
      icon: <BookOpen className="w-8 h-8 text-amber-500" />,
      color: 'from-amber-400 to-yellow-500',
      badge: `${unit.vocabulary.length} Words`
    },
    {
      type: 'pronunciation' as ActivityType,
      title: 'Voice Pronunciation Check',
      titleAr: 'تحدي نطق الكلمات',
      description: 'Repeat words into your microphone! Evaluated with free smart voice recognition.',
      icon: <Mic className="w-8 h-8 text-rose-500" />,
      color: 'from-rose-500 to-red-500',
      badge: 'Free Voice AI'
    },
    {
      type: 'camera' as ActivityType,
      title: 'Camera Flashcard Scanner',
      titleAr: 'كشف البطاقات بالكاميرا',
      description: 'Show written flashcards to your webcam and let free in-browser OCR verify them!',
      icon: <Camera className="w-8 h-8 text-emerald-500" />,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Free OCR Vision'
    },
    {
      type: 'handwriting' as ActivityType,
      title: 'Handwriting & Script Tracing',
      titleAr: 'تخطيط الحروف والكتابة',
      description: 'Trace letters (Aa, I, J, L, T, U) on the lined practice slate.',
      icon: <PenTool className="w-8 h-8 text-indigo-500" />,
      color: 'from-indigo-500 to-purple-500',
      badge: '3PS Script'
    },
    {
      type: 'quiz' as ActivityType,
      title: 'Interactive Quiz & Commands',
      titleAr: 'ألعاب وأسئلة القسم',
      description: 'Practice classroom commands: Circle, Tick, Cross, and Match!',
      icon: <Award className="w-8 h-8 text-pink-500" />,
      color: 'from-pink-500 to-fuchsia-500',
      badge: 'Earn Stars'
    }
  ];

  const handleLaunchActivity = (type: ActivityType) => {
    playSuccessChime();
    onSelectActivity(type);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            playPopSound();
            onBackToMap();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-blue-50 text-slate-700 font-bold border-2 border-slate-200 hover:border-blue-300 shadow-sm transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to World Map</span>
        </button>

        <div className="flex items-center gap-1 text-blue-900 font-black text-sm bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-200">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>{stars} Stars Collected</span>
        </div>
      </div>

      {/* Unit Hero Banner */}
      <div
        className={`bg-gradient-to-r ${unit.bgGradient} rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden`}
      >
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3.5 py-1 rounded-full text-white font-extrabold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unit {unit.unitNumber} • Term {unit.term}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl">{unit.icon}</span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                {unit.titleEn}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-white/95 font-bold font-['Tajawal',sans-serif]" dir="rtl">
              {unit.titleAr}
            </p>

            <p className="text-xs sm:text-sm text-white/80 max-w-xl font-medium">
              {unit.description}
            </p>
          </div>

          <div className="shrink-0">
            <MassiTheFennec
              mood="happy"
              size="md"
              speechTextEn={`Welcome to Unit ${unit.unitNumber}! Let's train your voice and camera!`}
              speechTextAr={`مرحباً بك في الوحدة ${unit.unitNumber}! هيا نتدرّب على النطق والكاميرا!`}
            />
          </div>
        </div>
      </div>

      {/* Activity Selection Cards */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <span>Choose an Activity</span>
          <span className="text-sm font-bold text-blue-800 font-['Tajawal',sans-serif]">
            (اختر نشاطك المفضل)
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((act) => (
            <div
              key={act.type}
              onClick={() => handleLaunchActivity(act.type)}
              className="group bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50/70 flex items-center justify-center border-2 border-blue-100 group-hover:scale-110 transition-transform">
                    {act.icon}
                  </div>
                  <span className="bg-blue-50 text-blue-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full border border-blue-200">
                    {act.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs font-bold text-blue-800 font-['Tajawal',sans-serif] mt-0.5" dir="rtl">
                  {act.titleAr}
                </p>

                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-blue-600" />
                  <span>Start Activity</span>
                </span>
                <span className="text-lg">⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
