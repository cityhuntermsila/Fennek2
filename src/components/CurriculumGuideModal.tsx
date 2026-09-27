import React from 'react';
import { playPopSound } from '../services/soundEffects';
import { X, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';

interface CurriculumGuideModalProps {
  onClose: () => void;
}

export const CurriculumGuideModal: React.FC<CurriculumGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative space-y-6 max-h-[90vh] overflow-y-auto">
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
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>People's Democratic Republic of Algeria</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Official 3PS English Curriculum Guide
          </h2>
          <p className="text-sm font-bold text-amber-700 font-['Tajawal',sans-serif]" dir="rtl">
            المنهاج الرسمي للغة الإنجليزية - السنة الثالثة ابتدائي (3PS)
          </p>
        </div>

        {/* Breakdown by Terms */}
        <div className="space-y-4">
          {/* Term 1 */}
          <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-900 text-sm">
                📌 First Term (الفصل الأول)
              </span>
              <span className="text-xs bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                Units 1 & 2
              </span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-medium">
              <li><strong className="text-slate-900">Unit 1 - Me, my family and my friends:</strong> Greetings (Hello, Good morning), Self-Introduction (My name is, I am X years old, I live in Bouira/Algiers, I speak Arabic, Tamazight, English, French), Family (Father, Mother, Brother, Sister), Numbers 0-10.</li>
              <li><strong className="text-slate-900">Classroom Commands:</strong> Listen, Look, Read, Draw, Colour, Write, Repeat/Say, Tick (✓), Cross (✗), Circle, Match.</li>
              <li><strong className="text-slate-900">Handwriting:</strong> Letters i, j, l, t, u (Script & Capital). Phonics /ɪ/ (six, sister, tick, in).</li>
            </ul>
          </div>

          {/* Term 2 */}
          <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sky-900 text-sm">
                📌 Second Term (الفصل الثاني)
              </span>
              <span className="text-xs bg-sky-200 text-sky-950 font-bold px-2 py-0.5 rounded-full">
                Units 3 & 4
              </span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-medium">
              <li><strong className="text-slate-900">Unit 3 - My Home:</strong> Rooms of the house (Kitchen, Bedroom, Living-room, Bathroom, Garden), Prepositions of location (in, on, under, opposite, next to).</li>
              <li><strong className="text-slate-900">Unit 4 - My Play Time:</strong> Toys (Kite, train, bike, doll, robot, car, ball), Colours (Red, Blue, Yellow, Green, Black, White).</li>
              <li><strong className="text-slate-900">Handwriting:</strong> Letters b, h, k, m, n, p, r, c, a, d, e, g. Phonics /ʌ/, /e/, /æ/.</li>
            </ul>
          </div>

          {/* Term 3 */}
          <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-900 text-sm">
                📌 Third Term (الفصل الثالث)
              </span>
              <span className="text-xs bg-emerald-200 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                Units 5 & 6
              </span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-medium">
              <li><strong className="text-slate-900">Unit 5 - My Pets:</strong> Dog, Cat, Canary, Goldfish, Rabbit, Chick. Possession ("Have you got a pet? - Yes, I have got a cat!"). Big, small, tail, feather.</li>
              <li><strong className="text-slate-900">Unit 6 - My Fancy Birthday:</strong> Cake, candle, juice, plate, sweets, saying Thank you. Parts of the face (Eye, Ear, Nose, Mouth) & Feelings (Happy, Sad).</li>
              <li><strong className="text-slate-900">Handwriting:</strong> Letters o, q, f, s, v, w, x, y, z. Phonics /ɒ/ (dog, doll).</li>
            </ul>
          </div>
        </div>

        {/* AI Features Note */}
        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs text-purple-900 space-y-1">
          <div className="font-extrabold flex items-center gap-1.5">
            <span>✨ Zero-Config Smart AI Features (No API Keys Required):</span>
          </div>
          <p>
            • <strong>Camera OCR Vision:</strong> Client-side optical character recognition directly in the browser to validate physical cards shown by pupils in real time.
          </p>
          <p>
            • <strong>Audio Pronunciation Evaluation:</strong> Native Web Speech recognition with encouraging phonetic tolerance specifically calibrated for Algerian 3rd primary grade students!
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md shadow-amber-300 transition active:scale-95"
        >
          Got it! Let's Learn! 🚀
        </button>
      </div>
    </div>
  );
};
