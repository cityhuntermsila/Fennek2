import React from 'react';
import { WORLDS_DATA } from '../data/curriculumData';
import { playPopSound } from '../services/soundEffects';
import { ArrowLeft, BookOpen, CheckCircle2, Download, ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface CurriculumViewProps {
  onBackToHome: () => void;
  onOpenGuideModal: () => void;
  onGoToStudent: () => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  onBackToHome,
  onOpenGuideModal,
  onGoToStudent
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 animate-fadeIn">
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
          <ShieldCheck className="w-4 h-4" />
          <span>Ministry of National Education Algeria 2026/2027</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          <span>📖 Independent Category · Official Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Official Syllabus & 3PS Pedagogical Method
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-medium">
          Explore the official learning outcomes defined by the Ministry of National Education for the 3rd Primary Year in Algeria: oral communication skills, phonetic discrimination, script and cursive handwriting, and progressive vocabulary acquisition.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              playPopSound();
              onOpenGuideModal();
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Detailed Ministry Guide</span>
          </button>

          <button
            onClick={() => {
              playPopSound();
              onGoToStudent();
            }}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-2"
          >
            <span>Launch Student Quest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5-Step Methodology Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Positive Pedagogy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our progressive 5-step methodology
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Designed to build child confidence and natural speaking fluency from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Frame',
              desc: 'Rigorous alignment with the 6 thematic units of the official 3PS textbook.'
            },
            {
              step: '02',
              title: 'Immerse',
              desc: 'Active listening to native English pronunciations with Massi the fennec.'
            },
            {
              step: '03',
              title: 'Practice',
              desc: 'Microphone speaking practice with instant, encouraging phonetic evaluation.'
            },
            {
              step: '04',
              title: 'Trace',
              desc: 'Cursive writing on interactive digital slates and printable home worksheets.'
            },
            {
              step: '05',
              title: 'Certify',
              desc: 'Awarding stars, competency badges, and official printable A1.1 certificates.'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className="text-3xl font-extrabold text-blue-600 font-mono">
                {item.step}
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Official Units Breakdown */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Official Syllabus
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The 6 Units of the 3PS Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Organized across 3 geographical and thematic worlds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORLDS_DATA.flatMap((world) =>
            world.units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-400 transition space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-slate-400 font-medium">{world.nameEn}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900">
                    {unit.titleEn}
                  </h3>
                  <p className="text-xs font-bold text-blue-900 font-['Tajawal']" dir="rtl">
                    {unit.titleAr}
                  </p>

                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-medium">
                    {unit.description}
                  </p>

                  <div className="mt-3 text-xs text-slate-600 space-y-1">
                    <div>
                      <strong className="text-slate-700">Target Vocabulary:</strong> {unit.vocabulary.map((w: any) => w.english).slice(0, 4).join(', ')}...
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Practice this unit</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
