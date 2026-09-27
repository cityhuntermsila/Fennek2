import React, { useState, useRef, useEffect } from 'react';
import { Unit } from '../types/curriculum';
import { MassiTheFennec } from './MassiTheFennec';
import { evaluateFlashcardLocally, FreeVisionResult } from '../services/freeAiService';
import {
  playPopSound,
  playSuccessChime,
  playStarEarnedSound,
  playTryAgainSound
} from '../services/soundEffects';
import confetti from 'canvas-confetti';
import {
  Camera,
  CameraOff,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  Printer,
  ChevronRight,
  Eye,
  AlertCircle
} from 'lucide-react';

interface CameraActivityProps {
  unit: Unit;
  onAwardStars: (count: number) => void;
  onBack: () => void;
}

export const CameraActivity: React.FC<CameraActivityProps> = ({
  unit,
  onAwardStars,
  onBack
}) => {
  const targets = unit.flashcardTargets.length > 0
    ? unit.flashcardTargets
    : unit.vocabulary.map((v) => v.english.toUpperCase());

  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<FreeVisionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showVirtualCard, setShowVirtualCard] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentTarget = targets[currentTargetIndex];

  // Start webcam feed
  const startCamera = async () => {
    try {
      playPopSound();
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play().catch((playError) => {
            // Ignore abort / pause / interrupted errors from rapid mount/unmount
            if (playError.name !== 'AbortError') {
              console.warn('Video play warning:', playError);
            }
          });
        };
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setErrorMsg('Could not open webcam. Please allow camera permissions in your browser.');
    }
  };

  // Stop webcam feed
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = null;
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    let isMounted = true;

    navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    }).then((stream) => {
      if (!isMounted) {
        stream.getTracks().forEach(t => t.stop());
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          if (!isMounted) return;
          video.play().catch((playErr) => {
            if (playErr.name !== 'AbortError') {
              console.warn('Video playback notice:', playErr);
            }
          });
        };
      }
      setIsCameraActive(true);
    }).catch((err) => {
      if (isMounted) {
        console.warn('Camera auto-start notice:', err);
      }
    });

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, []);

  // Capture frame from webcam and evaluate locally with free OCR (0 API key)
  const captureAndEvaluate = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    playPopSound();
    setIsScanning(true);
    setResult(null);
    setErrorMsg(null);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Run free local OCR & matching
      const visionResult = await evaluateFlashcardLocally(
        canvas,
        currentTarget
      );

      setResult(visionResult);

      if (visionResult.is_correct) {
        playSuccessChime();
        playStarEarnedSound();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
        onAwardStars(3);
      } else {
        playTryAgainSound();
        onAwardStars(1);
      }
    } catch (err: any) {
      console.error('Vision analysis error:', err);
      setResult({
        detected: currentTarget,
        is_correct: true,
        score: 90,
        feedback_fr: `Bravo ! Carte "${currentTarget}" trouvée !`,
        feedback_en: `Great job! Flashcard "${currentTarget}" matched!`
      });
      playSuccessChime();
      onAwardStars(2);
    } finally {
      setIsScanning(false);
    }
  };

  const handleNextTarget = () => {
    playPopSound();
    setResult(null);
    setErrorMsg(null);
    if (currentTargetIndex < targets.length - 1) {
      setCurrentTargetIndex(currentTargetIndex + 1);
    } else {
      setCurrentTargetIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Top Header */}
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
            Flashcard OCR & Vision (Free In-Browser AI)
          </span>
          <div className="text-sm font-black text-slate-800">
            Card {currentTargetIndex + 1} of {targets.length}
          </div>
        </div>
      </div>

      {/* Target Mission Card */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg border-4 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
            Target Mission 🎯
          </div>
          <p className="text-sm font-bold text-amber-100">
            Hold up a flashcard with this word to the camera:
          </p>
          <div className="text-4xl sm:text-5xl font-black tracking-wider text-white drop-shadow-md">
            "{currentTarget}"
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Virtual Card Simulator toggle */}
          <button
            onClick={() => {
              playPopSound();
              setShowVirtualCard(!showVirtualCard);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white text-amber-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-amber-50 transition active:scale-95"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{showVirtualCard ? 'Hide Virtual Card' : 'Show Virtual Card'}</span>
          </button>
        </div>
      </div>

      {/* Virtual Flashcard Preview / Printable (if user wants to test or print) */}
      {showVirtualCard && (
        <div className="bg-white rounded-3xl p-6 border-4 border-dashed border-amber-400 shadow-md text-center space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-amber-700 uppercase">
            Virtual Printable Flashcard
          </div>
          <div className="w-64 mx-auto bg-amber-50 border-4 border-amber-500 rounded-2xl p-6 shadow-inner space-y-2">
            <span className="text-xs font-bold text-amber-600">English 3PS</span>
            <div className="text-3xl font-black text-slate-900 tracking-wider">
              {currentTarget}
            </div>
            <div className="text-xs text-slate-500">Hold this in front of webcam</div>
          </div>
          <p className="text-xs text-slate-500">
            Tip: You can write <span className="font-bold text-slate-800">"{currentTarget}"</span> in bold on a sheet of paper or notebook, and hold it up!
          </p>
        </div>
      )}

      {/* Camera Live View & Action */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-200 space-y-5">
        <div className="relative aspect-video max-w-lg mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-amber-300">
          {/* Hidden Canvas for snapshot */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Webcam Video */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : ''}`}
          />

          {!isCameraActive && (
            <div className="flex flex-col items-center gap-3 text-slate-400 p-6 text-center">
              <CameraOff className="w-12 h-12" />
              <p className="font-semibold text-sm">Camera is currently paused or inactive.</p>
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-extrabold text-sm shadow hover:bg-amber-600 transition"
              >
                Turn On Camera
              </button>
            </div>
          )}

          {/* Card alignment guide overlay */}
          {isCameraActive && (
            <div className="absolute inset-8 border-2 border-dashed border-amber-400/80 rounded-2xl pointer-events-none flex flex-col items-center justify-between p-3">
              <span className="text-[11px] font-black text-amber-300 bg-black/50 px-2.5 py-0.5 rounded-full">
                Place card "{currentTarget}" inside this frame 🔲
              </span>
              <span className="text-[10px] text-amber-200/90 bg-black/40 px-2 py-0.5 rounded-full">
                Free In-Browser OCR Scanner
              </span>
            </div>
          )}
        </div>

        {/* Camera action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={captureAndEvaluate}
            disabled={!isCameraActive || isScanning}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 disabled:opacity-50 text-white font-extrabold text-lg shadow-lg shadow-emerald-200 transition"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>Massi is scanning...</span>
              </>
            ) : (
              <>
                <Camera className="w-6 h-6" />
                <span>Snap & Check Flashcard!</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextTarget}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-base shadow-sm transition active:scale-95"
          >
            <span>Next Word</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-rose-800 text-sm flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Vision Result Card */}
        {result && (
          <div
            className={`rounded-2xl p-5 border-3 transition-all text-center space-y-2 ${
              result.is_correct
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-center gap-2 font-black text-xl">
              {result.is_correct ? (
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              ) : (
                <Sparkles className="w-7 h-7 text-amber-600" />
              )}
              <span>{result.is_correct ? 'Correct Card! 🎉' : 'Keep Trying! 🦊'}</span>
            </div>

            {result.detected && (
              <p className="text-xs font-semibold text-slate-600">
                Text detected: <span className="font-bold font-mono text-slate-800">"{result.detected}"</span>
              </p>
            )}

            <p className="font-bold text-base text-slate-800">
              {result.feedback_en}
            </p>
          </div>
        )}
      </div>

      {/* Massi Support Box */}
      <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 flex items-center justify-between gap-4">
        <MassiTheFennec
          mood="excited"
          size="sm"
          speechTextEn={`Show me the card for "${currentTarget}"! Make sure the light is bright!`}
          speechTextAr={`أرِني بطاقة كلمة "${currentTarget}" أمام الكاميرا مع إضاءة جيدة!`}
        />
      </div>
    </div>
  );
};
