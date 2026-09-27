import React, { useState } from 'react';
import { X, Printer, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../services/soundEffects';

interface CertificateModalProps {
  studentName: string;
  starsCount: number;
  completedUnitsCount: number;
  onClose: () => void;
  onUpdateStudentName?: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentName: initialName,
  starsCount,
  completedUnitsCount,
  onClose,
  onUpdateStudentName
}) => {
  const [name, setName] = useState(initialName || 'Amina Benali');
  const [isEditing, setIsEditing] = useState(false);

  const todayStr = new Intl.DateTimeFormat('en-DZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    playSuccessChime();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 print:shadow-none print:border-none print:m-0 animate-fadeIn">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-800 text-sm font-display">
              Official 3PS Certificate · Algerian National Curriculum
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 sm:p-12 text-center bg-radial from-blue-50/40 via-white to-slate-50/60 relative border-8 border-double border-blue-600 m-4 rounded-xl print:m-0 print:border-8">
          {/* Header Banner */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold tracking-wide border-b border-slate-200 pb-3 mb-6">
            <span>PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA</span>
            <span className="font-['Tajawal',sans-serif]" dir="rtl">الجمهورية الجزائرية الديمقراطية الشعبية</span>
          </div>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-700 mb-3 border-2 border-blue-200 shadow-inner">
            <span className="text-3xl">🦊</span>
          </div>

          <p className="text-xs uppercase font-extrabold tracking-widest text-blue-800 mb-1">
            Fenneco EdTech · 3rd Primary School English
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 font-display">
            Certificate of Achievement
          </h2>
          <p className="text-sm font-bold text-blue-900 font-['Tajawal',sans-serif] mb-6" dir="rtl">
            شهادة تفوق وإتمام المستوى التأسيسي للغة الإنجليزية
          </p>

          <p className="text-sm text-slate-600 mb-2 font-medium">
            This certificate is proudly awarded to:
          </p>

          {/* Student Name */}
          <div className="my-3 inline-block">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-1.5 text-xl sm:text-2xl font-black text-center text-blue-900 border-b-2 border-blue-600 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsEditing(false);
                    onUpdateStudentName?.(name);
                  }}
                  className="p-1 bg-emerald-600 text-white rounded"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditing(true)}
                className="cursor-pointer group relative"
                title="Click to edit name"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 underline decoration-blue-500 decoration-wavy underline-offset-8 px-4 py-1 font-display">
                  {name}
                </div>
                <span className="text-[11px] text-blue-700 opacity-0 group-hover:opacity-100 transition print:hidden">
                  (click to edit name)
                </span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mt-4 font-medium">
            For outstanding commitment and progress in oral expression, phonetics, object recognition, and cursive handwriting, successfully fulfilling the <strong>3PS Primary Level</strong> competencies of the Ministry of National Education.
          </p>

          {/* Stats Badges */}
          <div className="flex items-center justify-center gap-6 my-6 text-xs text-slate-600">
            <div>
              <span className="block text-lg font-black text-blue-900 font-mono tabular-nums">
                {starsCount}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Gold Stars Earned</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="block text-lg font-black text-blue-900 font-mono tabular-nums">
                {Math.max(1, completedUnitsCount)} / 6
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Units Validated</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="block text-lg font-black text-emerald-700 font-mono tabular-nums">
                Level A1.1
              </span>
              <span className="text-[11px] text-slate-500 font-medium">CEFR Junior Framework</span>
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="flex items-end justify-between pt-6 border-t border-slate-200 mt-6 text-left">
            <div>
              <p className="text-[11px] text-slate-500">Issued on:</p>
              <p className="text-xs font-semibold text-slate-800">{todayStr}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 bg-blue-50 text-blue-900 font-bold text-[10px] uppercase shadow-sm">
                3PS Seal
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">Verified Platform</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-500">Pedagogical Mascot:</p>
              <p className="text-sm font-black text-blue-900 font-['Fredoka'] flex items-center gap-1 justify-end">
                <span>Massi the Fennec</span>
                <span>🐾</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
