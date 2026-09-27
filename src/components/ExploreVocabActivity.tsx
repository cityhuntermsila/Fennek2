import React, { useState } from 'react';
import { Unit, VocabWord } from '../types/curriculum';
import { MassiTheFennec } from './MassiTheFennec';
import { speakText, stopSpeaking } from '../services/speechService';
import { playPopSound, playStarEarnedSound } from '../services/soundEffects';
import {
  Volume2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Repeat,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface ExploreVocabProps {
  unit: Unit;
  onAwardStars: (count: number) => void;
  onBack: () => void;
}

export const ExploreVocabActivity: React.FC<ExploreVocabProps> = ({
  unit,
  onAwardStars,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exploredIds, setExploredIds] = useState<Set<string>>(new Set());

  const currentWord: VocabWord = unit.vocabulary[currentIndex];

  const handleSpeak = (text: string) => {
    playPopSound();
    speakText(text, 'en-US', 0.85);

    // Track explored word & award star if new
    if (!exploredIds.has(currentWord.id)) {
      const next = new Set(exploredIds);
      next.add(currentWord.id);
      setExploredIds(next);
      playStarEarnedSound();
      onAwardStars(1);
    }
  };

  const handleNext = () => {
    playPopSound();
    stopSpeaking();
    if (currentIndex < unit.vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    playPopSound();
    stopSpeaking();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            playPopSound();
            stopSpeaking();
            onBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 font-bold border-2 border-amber-200 shadow-sm transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Activities</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Interactive Flashcards
          </span>
          <div className="text-sm font-black text-slate-800">
            {currentIndex + 1} of {unit.vocabulary.length} Words
          </div>
        </div>
      </div>

      {/* Main Flashcard */}
      <div className="bg-gradient-to-b from-white to-amber-50/60 rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-amber-300 text-center space-y-6 relative overflow-hidden">
        {/* Category Pill */}
        <div className="flex items-center justify-between">
          <span className="bg-amber-200/80 text-amber-950 font-black text-xs px-3.5 py-1 rounded-full border border-amber-300">
            {currentWord.category}
          </span>
          {exploredIds.has(currentWord.id) && (
            <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Listened ⭐
            </span>
          )}
        </div>

        {/* Big Emoji / Image */}
        <div 
          onClick={() => handleSpeak(currentWord.english)}
          className="text-7xl sm:text-8xl my-3 cursor-pointer hover:scale-110 active:scale-95 transition-transform inline-block select-none"
          title="Click to hear pronunciation!"
        >
          {currentWord.emoji || '📖'}
        </div>

        {/* English Title & Phonetics */}
        <div className="space-y-1">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {currentWord.english}
          </h2>
          {currentWord.phonetic && (
            <p className="text-slate-500 font-mono text-base font-semibold">
              {currentWord.phonetic}
            </p>
          )}
        </div>

        {/* Pronunciation audio button */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleSpeak(currentWord.english)}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-amber-300 transition active:scale-95"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
            <span>Listen & Pronounce (استمع)</span>
          </button>
        </div>

        {/* Translation Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-3">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3 text-center">
            <span className="text-[11px] font-bold text-emerald-700 block uppercase">
              بالعربية (Arabic)
            </span>
            <span className="text-xl font-black text-emerald-950 font-['Tajawal',sans-serif]" dir="rtl">
              {currentWord.arabic}
            </span>
          </div>

          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 text-center">
            <span className="text-[11px] font-bold text-sky-700 block uppercase">
              French (Reference)
            </span>
            <span className="text-lg font-bold text-sky-950">
              {currentWord.french}
            </span>
          </div>
        </div>

        {/* Example Sentence from Algerian Schoolbook */}
        {currentWord.exampleSentence && (
          <div className="bg-white/80 border border-amber-200 rounded-2xl p-4 max-w-lg mx-auto text-left shadow-sm">
            <div className="text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>In Classroom Dialogue:</span>
            </div>
            <p className="text-sm font-bold text-slate-800">
              "{currentWord.exampleSentence}"
            </p>
            {currentWord.exampleArabic && (
              <p className="text-xs text-amber-700 font-['Tajawal',sans-serif] font-bold text-right mt-1" dir="rtl">
                {currentWord.exampleArabic}
              </p>
            )}
          </div>
        )}

        {/* Controls: Prev & Next */}
        <div className="flex items-center justify-between pt-4 border-t border-amber-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none font-bold text-slate-700 text-xs sm:text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {unit.vocabulary.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => {
                  playPopSound();
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-amber-500'
                    : exploredIds.has(w.id)
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-300 transition active:scale-95"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Massi Mascot Footer Tip */}
      <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 flex items-center justify-between gap-4">
        <MassiTheFennec
          mood="happy"
          size="sm"
          speechTextEn={`Click the speaker button to hear how I pronounce "${currentWord.english}"!`}
          speechTextAr={`اضغط على زر مكبر الصوت لتسمع كيف ينطق ماسي كلمة "${currentWord.english}"!`}
        />
      </div>
    </div>
  );
};
