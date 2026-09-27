import React, { useState } from 'react';
import { playPopSound, playSuccessChime } from '../services/soundEffects';
import { speakText } from '../services/speechService';
import {
  ArrowLeft,
  Volume2,
  Mic,
  Camera,
  PenTool,
  CheckCircle2,
  Sparkles,
  Award,
  FileText,
  HelpCircle,
  ArrowRight,
  Search
} from 'lucide-react';

interface ToolsHubViewProps {
  onBackToHome: () => void;
  onOpenActivityShortcut: (activityType: 'pronunciation' | 'camera' | 'handwriting' | 'quiz') => void;
  onOpenCertificate: () => void;
  onOpenWorksheets: () => void;
  onOpenCurriculumGuide: () => void;
}

const SAMPLE_PROMPTS = [
  { word: 'Father', ar: 'الأب', tip: 'Soft "th" sound between teeth like the Arabic letter ذ' },
  { word: 'Pen', ar: 'قلم جاف', tip: 'Crisp /P/ puff without vocal cord vibration, unlike /B/' },
  { word: 'Letter A', ar: 'حرف A', tip: 'Traced across 3 notebook interlines in cursive capital' },
  { word: 'Canary', ar: 'طائر الكناري', tip: '3 distinct syllables: ca-na-ry with rhythmic beats' },
];

export const ToolsHubView: React.FC<ToolsHubViewProps> = ({
  onBackToHome,
  onOpenActivityShortcut,
  onOpenCertificate,
  onOpenWorksheets,
  onOpenCurriculumGuide
}) => {
  const [testWord, setTestWord] = useState('Father');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTestAudio = (text: string) => {
    setIsPlaying(true);
    playPopSound();
    speakText(text, 'en-US', 0.85).then(() => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fadeIn">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <button
          onClick={() => {
            playPopSound();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>6 Dedicated Interactive AI & Learning Studios</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          <span>🛠️ Independent Category · Pedagogical Toolkits</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Interactive Studios & Learning Toolkits
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-medium">
          Access every learning tool directly without starting a unit quest: AI speech coach, webcam flashcard scanner, cursive handwriting slate, exam command quizzes, printable worksheets, and official diplomas.
        </p>
      </div>

      {/* 6 Dedicated Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tool 1: Voice Coach */}
        <div
          onClick={() => {
            playPopSound();
            onOpenActivityShortcut('pronunciation');
          }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🎙️
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
              AI Speech Coach & Phonetics
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              The student speaks into the microphone. AI listens and evaluates pronunciation of key English sounds (/P/, /B/, /θ/, /ð/) with immediate positive feedback.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Launch Voice Studio</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tool 2: Camera OCR */}
        <div
          onClick={() => {
            playPopSound();
            onOpenActivityShortcut('camera');
          }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📷
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
              Flashcard Camera Scanner (OCR)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              Show vocabulary flashcards in front of your camera. Computer vision recognizes the word and triggers native audio pronunciation.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
            <span>Open Camera Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tool 3: Cursive Slate */}
        <div
          onClick={() => {
            playPopSound();
            onOpenActivityShortcut('handwriting');
          }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              ✍️
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
              Cursive Handwriting Slate
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              Practice tracing capital and lowercase letters (Aa to Zz) on Algerian standard Seys notebook interlines with guided stroke paths.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>Open Writing Slate</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tool 4: Exam Commands Quiz */}
        <div
          onClick={() => {
            playPopSound();
            onOpenActivityShortcut('quiz');
          }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🧩
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
              Exam Commands Quiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              Master the official Algerian primary exam rubrics with zero hesitation: <em>Circle, Match, Tick, Cross, Listen, Show</em>.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
            <span>Start Commands Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tool 5: Printable Worksheets */}
        <div
          onClick={() => {
            playPopSound();
            onOpenWorksheets();
          }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📑
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
              Printable PDF Worksheets
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              Download and print structured A4 exercise sheets for pen-and-paper, screen-free evening practice and handwriting mastery.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>View Printable Sheets</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tool 6: Certificate Generator */}
        <div
          onClick={() => {
            playPopSound();
            onOpenCertificate();
          }}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📜
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
              Official A1.1 Certificate Generator
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              Generate and print a personalized certificate of achievement for your student with the verified Fenneco Academy seal.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>Generate Certificate</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mini Interactive Sound Tester */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Volume2 className="w-4 h-4" />
            <span>Interactive Pronunciation Tester</span>
          </div>
          <span className="text-xs text-slate-400">Native US accent · 0.85x speed</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {SAMPLE_PROMPTS.map((item) => (
            <button
              key={item.word}
              onClick={() => handleTestAudio(item.word)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-300" />
              <span>{item.word} ({item.ar})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
