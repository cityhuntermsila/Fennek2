import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { speakText } from '../services/speechService';
import { playPopSound } from '../services/soundEffects';

export type MascotMood = 'happy' | 'excited' | 'thinking' | 'talking' | 'celebrating' | 'curious';

interface MassiProps {
  mood?: MascotMood;
  speechTextEn?: string;
  speechTextAr?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export const MassiTheFennec: React.FC<MassiProps> = ({
  mood = 'happy',
  speechTextEn,
  speechTextAr,
  size = 'md',
  interactive = true,
  className = ''
}) => {
  const handleMassiClick = () => {
    if (!interactive) return;
    playPopSound();
    const toSpeak = speechTextEn || "Hello! I am Massi the Fennec! Let's learn English together!";
    speakText(toSpeak, 'en-US');
  };

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44'
  }[size];

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Massi SVG Character */}
      <div
        onClick={handleMassiClick}
        className={`relative ${sizeClasses} cursor-pointer group transition-transform active:scale-95 select-none`}
        title="Click Massi to hear him speak!"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="fennecFur" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="earInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FCA5A5" />
            </linearGradient>
            <linearGradient id="cheeks" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* Left Huge Fennec Ear */}
          <path
            d="M 65 95 C 40 45 10 10 25 5 C 45 1 75 40 85 85 Z"
            fill="url(#fennecFur)"
            className="origin-bottom transition-transform duration-500 group-hover:-rotate-3"
          />
          <path
            d="M 60 90 C 42 50 22 22 32 16 C 45 12 68 45 78 82 Z"
            fill="url(#earInner)"
          />

          {/* Right Huge Fennec Ear */}
          <path
            d="M 135 95 C 160 45 190 10 175 5 C 155 1 125 40 115 85 Z"
            fill="url(#fennecFur)"
            className="origin-bottom transition-transform duration-500 group-hover:rotate-3"
          />
          <path
            d="M 140 90 C 158 50 178 22 168 16 C 155 12 132 45 122 82 Z"
            fill="url(#earInner)"
          />

          {/* Fluffy Tail in Background */}
          <path
            d="M 140 150 C 180 145 195 180 160 185 C 140 188 120 170 140 150 Z"
            fill="url(#fennecFur)"
          />
          <circle cx="170" cy="170" r="14" fill="#FFFFFF" opacity="0.9" />

          {/* Fennec Head */}
          <ellipse cx="100" cy="115" rx="55" ry="46" fill="url(#fennecFur)" />

          {/* White Fluffy Cheeks */}
          <ellipse cx="70" cy="126" rx="26" ry="24" fill="url(#cheeks)" />
          <ellipse cx="130" cy="126" rx="26" ry="24" fill="url(#cheeks)" />
          <path d="M 100 115 Q 100 145 100 150 Q 80 145 70 130 Z" fill="#FFFBEB" />
          <path d="M 100 115 Q 100 145 100 150 Q 120 145 130 130 Z" fill="#FFFBEB" />

          {/* Big Cartoon Eyes */}
          {mood === 'celebrating' || mood === 'excited' ? (
            // Joyful curved laughing eyes
            <g stroke="#1F2937" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M 72 110 Q 82 98 92 110" />
              <path d="M 108 110 Q 118 98 128 110" />
            </g>
          ) : (
            // Big sparkling round eyes
            <g>
              <ellipse cx="80" cy="108" rx="10" ry="12" fill="#1F2937" />
              <ellipse cx="120" cy="108" rx="10" ry="12" fill="#1F2937" />
              {/* Eye Catchlights */}
              <circle cx="77" cy="104" r="3.5" fill="#FFFFFF" />
              <circle cx="83" cy="112" r="1.5" fill="#FFFFFF" />
              <circle cx="117" cy="104" r="3.5" fill="#FFFFFF" />
              <circle cx="123" cy="112" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute Rosy Blushing Cheeks */}
          <circle cx="65" cy="125" r="7" fill="#F43F5E" opacity="0.35" />
          <circle cx="135" cy="125" r="7" fill="#F43F5E" opacity="0.35" />

          {/* Little Black Nose */}
          <path d="M 96 126 C 96 123 104 123 104 126 C 104 130 96 130 96 126 Z" fill="#1F2937" />

          {/* Smiling Mouth */}
          <path
            d="M 92 133 Q 100 141 108 133"
            stroke="#1F2937"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Little Scarf in Algerian Green/White/Red touch */}
          <path
            d="M 75 155 Q 100 166 125 155 Q 115 175 100 175 Q 85 175 75 155 Z"
            fill="#10B981"
          />
          <circle cx="100" cy="165" r="4" fill="#EF4444" />
        </svg>

        {/* Small Audio Pulse Icon badge */}
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-md group-hover:scale-110 transition-transform">
          <Volume2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Mascot Speech Bubble */}
      {(speechTextEn || speechTextAr) && (
        <div className="relative max-w-sm bg-white/95 backdrop-blur-sm border-2 border-amber-300 rounded-2xl p-3 shadow-lg flex flex-col gap-1 text-slate-800 animate-fadeIn">
          {/* Bubble Pointer Arrow */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
          
          <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Massi says:</span>
          </div>

          {speechTextEn && (
            <p className="font-semibold text-sm leading-snug text-slate-900">
              {speechTextEn}
            </p>
          )}

          {speechTextAr && (
            <p className="text-xs text-amber-700 font-['Tajawal',sans-serif] font-bold text-right" dir="rtl">
              {speechTextAr}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
