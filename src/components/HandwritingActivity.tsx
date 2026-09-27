import React, { useRef, useState, useEffect } from 'react';
import { Unit } from '../types/curriculum';
import { MassiTheFennec } from './MassiTheFennec';
import { speakText } from '../services/speechService';
import { playPopSound, playSuccessChime, playStarEarnedSound, playTryAgainSound } from '../services/soundEffects';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Volume2,
  Trash2,
  Sparkles,
  Check,
  Palette,
  ChevronRight
} from 'lucide-react';

interface HandwritingProps {
  unit: Unit;
  onAwardStars: (count: number) => void;
  onBack: () => void;
}

export const HandwritingActivity: React.FC<HandwritingProps> = ({
  unit,
  onAwardStars,
  onBack
}) => {
  const letters = unit.tracingLetters && unit.tracingLetters.length > 0
    ? unit.tracingLetters
    : ['I', 'i', 'J', 'j', 'L', 'l', 'T', 't', 'U', 'u'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState('#2563EB'); // default blue
  const [strokeWidth, setStrokeWidth] = useState(24); // Matching the reference guide letter thickness
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [evaluationFeedback, setEvaluationFeedback] = useState<{
    score: number;
    isCorrect: boolean;
    messageEn: string;
    messageAr: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const templateCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentLetter = letters[currentIndex];

  const colors = ['#2563EB', '#DC2626', '#16A34A', '#9333EA', '#D97706'];

  // Helper to accurately get pointer coordinates scaled to canvas resolution (fixes cursor offset)
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Prepare reference template bitmap to evaluate actual tracing match
  const renderTemplateBitmap = () => {
    if (!templateCanvasRef.current) {
      templateCanvasRef.current = document.createElement('canvas');
      templateCanvasRef.current.width = 380;
      templateCanvasRef.current.height = 380;
    }
    const tCanvas = templateCanvasRef.current;
    const tCtx = tCanvas.getContext('2d', { willReadFrequently: true });
    if (!tCtx) return;

    tCtx.clearRect(0, 0, tCanvas.width, tCanvas.height);
    tCtx.fillStyle = '#000000';
    tCtx.font = 'bold 220px "Fredoka", sans-serif';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText(currentLetter, tCanvas.width / 2, tCanvas.height / 2);
  };

  const clearCanvas = () => {
    playPopSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeCount(0);
    setEvaluationFeedback(null);
  };

  useEffect(() => {
    renderTemplateBitmap();
    clearCanvas();
  }, [currentIndex]);

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setStrokeCount((prev) => prev + 1);
    setEvaluationFeedback(null);

    const { x, y } = getCanvasCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    // Draw initial dot immediately
    ctx.arc(x, y, strokeWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);

    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleStopDraw = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e) e.preventDefault();
    setIsDrawing(false);
  };

  // Evaluate the child's drawing against the reference letter
  const evaluateTracingAccuracy = (): { score: number; isMatch: boolean; reason: string; reasonAr: string } => {
    const canvas = canvasRef.current;
    const tCanvas = templateCanvasRef.current;
    if (!canvas || !tCanvas) {
      return { score: 0, isMatch: false, reason: 'Please write first!', reasonAr: 'اكتب الحرف أولاً!' };
    }

    const userCtx = canvas.getContext('2d', { willReadFrequently: true });
    const tempCtx = tCanvas.getContext('2d', { willReadFrequently: true });
    if (!userCtx || !tempCtx) {
      return { score: 0, isMatch: false, reason: 'Canvas error', reasonAr: 'خطأ في اللوحة' };
    }

    const userImg = userCtx.getImageData(0, 0, canvas.width, canvas.height);
    const tempImg = tempCtx.getImageData(0, 0, tCanvas.width, tCanvas.height);
    const uData = userImg.data;
    const tData = tempImg.data;

    let templatePixels = 0;
    let userPixels = 0;
    let matchedPixels = 0;
    let wildOffPixels = 0;

    const step = 4; // Check every 4th pixel for speed & accuracy
    const width = canvas.width;
    const height = canvas.height;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const isUserDrawn = uData[idx + 3] > 40;
        const isTemplate = tData[idx + 3] > 40;

        if (isTemplate) {
          templatePixels++;
        }
        if (isUserDrawn) {
          userPixels++;
          if (isTemplate) {
            matchedPixels++;
          } else {
            // Check if within acceptable tolerance distance (12px) of template
            let nearTemplate = false;
            for (let dy = -12; dy <= 12; dy += 6) {
              for (let dx = -12; dx <= 12; dx += 6) {
                const ny = y + dy;
                const nx = x + dx;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const nIdx = (ny * width + nx) * 4;
                  if (tData[nIdx + 3] > 40) {
                    nearTemplate = true;
                    break;
                  }
                }
              }
              if (nearTemplate) break;
            }
            if (!nearTemplate) {
              wildOffPixels++;
            }
          }
        }
      }
    }

    // If user drew almost nothing or just tapped
    if (userPixels < 25) {
      return {
        score: 0,
        isMatch: false,
        reason: `Trace over the letter "${currentLetter}" before checking!`,
        reasonAr: `ارسم فوق الحرف "${currentLetter}" قبل التحقق!`
      };
    }

    // Ratio of template covered
    const coverage = templatePixels > 0 ? (matchedPixels / templatePixels) : 0;
    // Ratio of user drawing that is far outside the letter boundaries
    const offTrackRatio = userPixels > 0 ? (wildOffPixels / userPixels) : 0;

    // Strict validation: Must cover at least 35% of the letter strokes AND not be scribbled wildly outside
    const isMatch = coverage >= 0.35 && offTrackRatio < 0.45;
    const finalScore = Math.min(100, Math.round((coverage * 0.7 + (1 - offTrackRatio) * 0.3) * 100));

    if (!isMatch) {
      if (coverage < 0.35) {
        return {
          score: finalScore,
          isMatch: false,
          reason: `Trace more of the letter "${currentLetter}"! Don't leave it incomplete.`,
          reasonAr: `اكتب كامل شكل الحرف "${currentLetter}"، لا تتركه غير مكتمل!`
        };
      }
      return {
        score: finalScore,
        isMatch: false,
        reason: `Stay inside the lines of "${currentLetter}"! Try not to scribble outside.`,
        reasonAr: `ابقَ داخل خطوط الحرف "${currentLetter}" وحاول ألا تشخبط خارجه!`
      };
    }

    return {
      score: Math.max(75, finalScore),
      isMatch: true,
      reason: `Wonderful handwriting! You traced "${currentLetter}" correctly! ⭐`,
      reasonAr: `خط رائع ومتقن! لقد تتبعت الحرف "${currentLetter}" بشكل صحيح! ⭐`
    };
  };

  const handleDoneLetter = () => {
    playPopSound();
    const evaluation = evaluateTracingAccuracy();

    if (!evaluation.isMatch) {
      playTryAgainSound();
      setEvaluationFeedback({
        score: evaluation.score,
        isCorrect: false,
        messageEn: evaluation.reason,
        messageAr: evaluation.reasonAr
      });
      speakText('Try again! Follow the lines of the letter carefully.', 'en-US');
      return;
    }

    // Correct!
    setEvaluationFeedback({
      score: evaluation.score,
      isCorrect: true,
      messageEn: evaluation.reason,
      messageAr: evaluation.reasonAr
    });
    playSuccessChime();
    playStarEarnedSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onAwardStars(2);
    speakText(`Excellent writing! Letter ${currentLetter}!`, 'en-US');

    setTimeout(() => {
      if (currentIndex < letters.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 font-bold border-2 border-amber-200 shadow-sm transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Activities</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            3PS Handwriting & Tracing (خط اليد)
          </span>
          <div className="text-sm font-black text-slate-800">
            Letter {currentIndex + 1} of {letters.length}
          </div>
        </div>
      </div>

      {/* Main Tracing Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 text-center space-y-6">
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              Official 3PS Focus: Script & Handwriting
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            Trace the Letter "{currentLetter}"
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Follow the guide lines with your finger or mouse!
          </p>
        </div>

        {/* Tracing Canvas Container */}
        <div className="relative w-full max-w-md mx-auto aspect-square bg-amber-50/50 rounded-3xl border-4 border-dashed border-amber-300 shadow-inner flex items-center justify-center overflow-hidden touch-none">
          {/* Background School Lined Paper Guide */}
          <div className="absolute inset-0 flex flex-col justify-around opacity-30 pointer-events-none p-4">
            <div className="border-b-2 border-rose-400 w-full" />
            <div className="border-b-2 border-sky-400 border-dashed w-full" />
            <div className="border-b-2 border-sky-400 border-dashed w-full" />
            <div className="border-b-2 border-emerald-500 w-full" />
          </div>

          {/* Dotted Template Letter in Background */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold pointer-events-none select-none text-[180px] sm:text-[220px] font-['Fredoka',sans-serif] tracking-normal leading-none">
            {currentLetter}
          </div>

          {/* User Drawing Canvas */}
          <canvas
            ref={canvasRef}
            width={380}
            height={380}
            onMouseDown={handleStartDraw}
            onMouseMove={handleDraw}
            onMouseUp={handleStopDraw}
            onMouseLeave={handleStopDraw}
            onTouchStart={handleStartDraw}
            onTouchMove={handleDraw}
            onTouchEnd={handleStopDraw}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />
        </div>

        {/* Visual Evaluation Feedback Banner */}
        {evaluationFeedback && (
          <div
            className={`rounded-2xl p-4 border-2 transition-all flex flex-col items-center justify-center gap-1 ${
              evaluationFeedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 animate-bounce'
                : 'bg-rose-50 border-rose-300 text-rose-950 animate-shake'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-base">
              <span>{evaluationFeedback.isCorrect ? '✅ Well Done!' : '⚠️ Not Quite!'}</span>
              <span>• Match: {evaluationFeedback.score}%</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-center">
              {evaluationFeedback.messageEn}
            </p>
            <p className="text-xs font-bold font-['Tajawal',sans-serif] text-center" dir="rtl">
              {evaluationFeedback.messageAr}
            </p>
          </div>
        )}

        {/* Toolbar: Color picker & tools */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Color choices */}
          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => {
                  playPopSound();
                  setCurrentColor(c);
                }}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full shadow-sm transition-transform ${
                  currentColor === c ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Stroke Width / Thickness Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
            <span className="text-[11px] px-1 text-slate-500 font-semibold">Width:</span>
            {[
              { label: 'Normal', size: 18 },
              { label: 'Thick (Fit)', size: 26 },
              { label: 'Super', size: 34 }
            ].map((item) => (
              <button
                key={item.size}
                onClick={() => {
                  playPopSound();
                  setStrokeWidth(item.size);
                }}
                className={`px-2.5 py-1 rounded-xl transition ${
                  strokeWidth === item.size
                    ? 'bg-amber-500 text-white font-black shadow-sm'
                    : 'bg-white hover:bg-slate-200 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Clear button */}
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200 transition active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>

          {/* Sound Pronunciation */}
          <button
            onClick={() => {
              playPopSound();
              speakText(`Letter ${currentLetter}`, 'en-US');
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs sm:text-sm border border-sky-200 transition active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Hear Sound</span>
          </button>

          {/* Finished & Check button */}
          <button
            onClick={handleDoneLetter}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-200 transition active:scale-95"
          >
            <Check className="w-5 h-5" />
            <span>I Finished! (Next Letter)</span>
          </button>
        </div>
      </div>

      {/* Massi Feedback */}
      <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 flex items-center justify-between gap-4">
        <MassiTheFennec
          mood={evaluationFeedback ? (evaluationFeedback.isCorrect ? 'celebrating' : 'thinking') : 'talking'}
          size="sm"
          speechTextEn={evaluationFeedback ? evaluationFeedback.messageEn : `Practice writing letter "${currentLetter}" carefully! Good handwriting makes teacher happy!`}
          speechTextAr={evaluationFeedback ? evaluationFeedback.messageAr : `تدرب على كتابة الحرف "${currentLetter}" بدقة وخط جميل!`}
        />
      </div>
    </div>
  );
};
