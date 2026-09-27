import React, { useState } from 'react';
import { X, Printer, FileText, CheckCircle2, Download } from 'lucide-react';
import { WORLDS_DATA } from '../data/curriculumData';
import { playPopSound, playSuccessChime } from '../services/soundEffects';

interface WorksheetsModalProps {
  onClose: () => void;
}

export const WorksheetsModal: React.FC<WorksheetsModalProps> = ({ onClose }) => {
  const [selectedSheet, setSelectedSheet] = useState<'family' | 'alphabet' | 'classroom'>('family');

  const handlePrint = () => {
    playSuccessChime();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 print:shadow-none print:border-none print:m-0 animate-fadeIn">
        {/* Top bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm font-display">
                Printable Practice & Revision Sheets (3PS)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Official resources for homework and classroom evaluation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print This Sheet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Selector Tabs (Hidden when printing) */}
        <div className="px-6 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center gap-2 print:hidden overflow-x-auto">
          <button
            onClick={() => {
              playPopSound();
              setSelectedSheet('family');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              selectedSheet === 'family'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-blue-900'
            }`}
          >
            👨‍👩‍👧 Sheet 1: Family & Friends (Vocabulary)
          </button>
          <button
            onClick={() => {
              playPopSound();
              setSelectedSheet('alphabet');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              selectedSheet === 'alphabet'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-blue-900'
            }`}
          >
            ✍️ Sheet 2: Handwriting (Tracing & Phonics)
          </button>
          <button
            onClick={() => {
              playPopSound();
              setSelectedSheet('classroom');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              selectedSheet === 'classroom'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-blue-900'
            }`}
          >
            🎒 Sheet 3: School Objects (Match & Connect)
          </button>
        </div>

        {/* Printable Sheet View */}
        <div className="p-8 sm:p-10 font-sans text-slate-800 bg-white">
          {/* Header of Worksheet */}
          <div className="border-b-2 border-slate-300 pb-4 mb-6">
            <div className="flex justify-between items-start text-xs text-slate-500 mb-2">
              <span>Primary School: _______________________</span>
              <span>Class: 3PS ___</span>
              <span>Date: ____ / ____ / 202__</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 font-display">
                  {selectedSheet === 'family' && 'Worksheet 1: My Family & Relatives'}
                  {selectedSheet === 'alphabet' && 'Worksheet 2: English Handwriting & Phonics'}
                  {selectedSheet === 'classroom' && 'Worksheet 3: My School Bag & Classroom'}
                </h1>
                <p className="text-xs text-amber-800 font-semibold font-['Tajawal',sans-serif]" dir="rtl">
                  {selectedSheet === 'family' && 'ورقة عمل: عائلتي وأقاربي - السنة الثالثة ابتدائي'}
                  {selectedSheet === 'alphabet' && 'ورقة عمل: كتابة الحروف ونطقها'}
                  {selectedSheet === 'classroom' && 'ورقة عمل: أدواتي المدرسية وقسمي'}
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-slate-700">Pupil's Name: </span>
                <span className="inline-block w-36 border-b border-slate-800" />
              </div>
            </div>
          </div>

          {/* Content according to selected sheet */}
          {selectedSheet === 'family' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Exercise 1: Look and write the correct word from the box.
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono flex justify-around">
                  <span>father</span>
                  <span>mother</span>
                  <span>brother</span>
                  <span>sister</span>
                  <span>grandfather</span>
                  <span>grandmother</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Father (الأب)', emoji: '👨' },
                  { label: 'Mother (الأم)', emoji: '👩' },
                  { label: 'Brother (الأخ)', emoji: '👦' },
                  { label: 'Sister (الأخت)', emoji: '👧' },
                  { label: 'Grandfather (الجد)', emoji: '👴' },
                  { label: 'Grandmother (الجدة)', emoji: '👵' },
                ].map((item, idx) => (
                  <div key={idx} className="border border-slate-300 rounded-lg p-3 text-center">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-[11px] text-slate-500 mb-1">{item.label}</div>
                    <div className="border-b border-dashed border-slate-500 h-6 mx-2" />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Exercise 2: Complete the sentence about yourself.
                </h4>
                <p className="text-xs text-slate-700 leading-8">
                  Hello, my name is ________________________. I am ________ years old. <br />
                  I have ________ brother(s) and ________ sister(s). I love my family!
                </p>
              </div>
            </div>
          )}

          {selectedSheet === 'alphabet' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Exercise 1: Trace the cursive/script letters and pronounce their sounds.
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Follow the dotted lines to trace uppercase and lowercase letters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['Aa - Apple 🍎', 'Bb - Book 📖', 'Cc - Cat 🐱', 'Dd - Door 🚪'].map((item, i) => (
                  <div key={i} className="border border-slate-300 rounded-lg p-3">
                    <div className="text-sm font-bold text-slate-800 mb-2">{item}</div>
                    <div className="space-y-2">
                      <div className="h-6 border-b border-slate-300 border-dashed text-slate-400 font-mono text-sm tracking-widest pl-2">
                        {item.slice(0, 2)} . . . . . . . . . . . . . . . . .
                      </div>
                      <div className="h-6 border-b border-slate-300" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Exercise 2: Circle the words that begin with the letter <span className="underline font-black">P</span>.
                </h4>
                <div className="flex gap-4 justify-around text-xs font-semibold">
                  <span className="p-2 border border-slate-300 rounded">Pen</span>
                  <span className="p-2 border border-slate-300 rounded">Book</span>
                  <span className="p-2 border border-slate-300 rounded">Pencil</span>
                  <span className="p-2 border border-slate-300 rounded">Eraser</span>
                  <span className="p-2 border border-slate-300 rounded">Pupil</span>
                </div>
              </div>
            </div>
          )}

          {selectedSheet === 'classroom' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Exercise 1: Match the English word with its image.
                </h4>
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div className="space-y-3 text-xs font-semibold">
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span>1. School bag</span>
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                    </div>
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span>2. Book</span>
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                    </div>
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span>3. Ruler</span>
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                    </div>
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span>4. Chair</span>
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-3 text-right">
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                      <span className="text-xl">📏 Ruler</span>
                    </div>
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                      <span className="text-xl">🎒 School bag</span>
                    </div>
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                      <span className="text-xl">🪑 Chair</span>
                    </div>
                    <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                      <span className="w-3 h-3 rounded-full border border-slate-400" />
                      <span className="text-xl">📖 Book</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Grading Box */}
          <div className="mt-8 pt-4 border-t-2 border-slate-300 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-500 font-medium">Massi's Motivational Score: </span>
              <span className="font-bold text-amber-700">⭐⭐⭐ Excellent Effort!</span>
            </div>
            <div className="border border-slate-400 px-4 py-2 rounded text-center">
              <span className="text-[10px] text-slate-500 block">Teacher's Mark:</span>
              <span className="text-sm font-black">_____ / 10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
