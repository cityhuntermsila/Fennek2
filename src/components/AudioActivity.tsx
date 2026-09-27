import React, { useState, useRef, useEffect } from 'react';
import { Unit, VocabWord } from '../types/curriculum';
import { MassiTheFennec } from './MassiTheFennec';
import { speakText, stopSpeaking } from '../services/speechService';
import {
  FreeSpeechRecognizer,
  evaluateSpokenWord,
  FreePronunciationResult
} from '../services/freeAiService';
import {
  playPopSound,
  playSuccessChime,
  playStarEarnedSound,
  playTryAgainSound
} from '../services/soundEffects';
import confetti from 'canvas-confetti';
import {
  Mic,
  Square,
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Star
} from 'lucide-react';

interface AudioActivityProps {
  unit: Unit;
  onAwardStars: (count: number) => void;
  onBack: () => void;
}

export const AudioActivity: React.FC<AudioActivityProps> = ({
  unit,
  onAwardStars,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FreePronunciationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const speechRecognizerRef = useRef<FreeSpeechRecognizer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioDetectedRef = useRef<boolean>(false);

  const currentWord: VocabWord = unit.vocabulary[currentIndex] || unit.vocabulary[0];

  useEffect(() => {
    speechRecognizerRef.current = new FreeSpeechRecognizer();

    return () => {
      stopSpeaking();
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Listen to sample word
  const handleListenSample = () => {
    playPopSound();
    speakText(currentWord.english, 'en-US', 0.8);
  };

  // Start Voice Recording (100% Free & Local)
  const startRecording = async () => {
    try {
      playPopSound();
      setResult(null);
      setErrorMessage(null);
      audioDetectedRef.current = false;

      // Access mic for audio volume sensing & permissions
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Audio analysis for volume level
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudioEnergy = () => {
          if (!isRecording && !streamRef.current) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          if (sum > 500) {
            audioDetectedRef.current = true;
          }
          requestAnimationFrame(checkAudioEnergy);
        };
        requestAnimationFrame(checkAudioEnergy);
      }

      setIsRecording(true);

      // Launch Free speech recognizer
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.recognizeOnce(5000).then((spoken) => {
          finishRecording(spoken);
        });
      }
    } catch (err: any) {
      console.error('Microphone error:', err);
      setErrorMessage(
        'Could not access microphone. Please check your browser microphone permissions.'
      );
    }
  };

  // Stop recording manually
  const stopRecording = () => {
    playPopSound();
    if (speechRecognizerRef.current) {
      speechRecognizerRef.current.stop();
    }
    finishRecording('');
  };

  const finishRecording = async (spokenText: string) => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsAnalyzing(true);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // Small playful delay for child feel
    await new Promise((r) => setTimeout(r, 600));

    const evalResult = evaluateSpokenWord(
      spokenText,
      currentWord.english,
      audioDetectedRef.current
    );

    setResult(evalResult);
    setIsAnalyzing(false);

    if (evalResult.is_correct) {
      playSuccessChime();
      playStarEarnedSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onAwardStars(3);
    } else {
      playTryAgainSound();
      onAwardStars(1);
    }
  };

  const handleNextWord = () => {
    playPopSound();
    setResult(null);
    setErrorMessage(null);
    if (currentIndex < unit.vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevWord = () => {
    playPopSound();
    setResult(null);
    setErrorMessage(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Navigation header */}
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
            Voice Pronunciation Check (Free AI & Web Speech)
          </span>
          <div className="text-sm font-black text-slate-800">
            Word {currentIndex + 1} of {unit.vocabulary.length}
          </div>
        </div>
      </div>

      {/* Main Pronunciation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 text-center space-y-6 relative overflow-hidden">
        {/* Top Word Display */}
        <div className="space-y-2">
          <div className="inline-block bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300">
            {currentWord.category}
          </div>

          <div className="text-6xl sm:text-7xl my-2 animate-bounce">
            {currentWord.emoji || '🗣️'}
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {currentWord.english}
          </h2>

          {currentWord.phonetic && (
            <p className="text-slate-500 font-mono text-sm sm:text-base">
              {currentWord.phonetic}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="bg-emerald-50 text-emerald-800 font-['Tajawal',sans-serif] font-bold text-lg px-3 py-1 rounded-xl border border-emerald-200" dir="rtl">
              {currentWord.arabic}
            </span>
            <span className="bg-sky-50 text-sky-800 font-semibold text-sm px-3 py-1 rounded-xl border border-sky-200">
              French: {currentWord.french}
            </span>
          </div>

          {currentWord.exampleSentence && (
            <p className="text-xs sm:text-sm text-slate-600 font-medium italic mt-2">
              "{currentWord.exampleSentence}"
            </p>
          )}
        </div>

        {/* Action Controls: Listen & Record */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t-2 border-amber-100">
          {/* 1. Listen Sample Button */}
          <button
            onClick={handleListenSample}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-extrabold text-base shadow-lg shadow-sky-300 transition"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
            <span>1. Listen to Native Voice</span>
          </button>

          {/* 2. Microphone Record Button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isAnalyzing}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 active:scale-95 text-white font-extrabold text-base shadow-lg shadow-rose-300 transition"
            >
              <Mic className="w-6 h-6" />
              <span>2. Click Mic & Repeat!</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-base shadow-lg shadow-red-400 animate-pulse transition"
            >
              <Square className="w-6 h-6 fill-white" />
              <span>Recording... Click to Stop!</span>
            </button>
          )}
        </div>

        {/* Recording Animation Indicator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 py-2 text-rose-600 font-bold text-sm">
            <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            <span>Listening to you... Speak clearly! 🎙️</span>
          </div>
        )}

        {/* Analyzing Spinner */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="font-extrabold text-amber-800 text-sm">
              Massi is listening carefully to your pronunciation... 🦊✨
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-rose-800 text-sm flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Evaluation Results Card */}
        {result && (
          <div
            className={`rounded-2xl p-5 border-3 transition-all ${
              result.is_correct || (result.score && result.score >= 70)
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-6 h-6 fill-yellow-400" />
                <Star className="w-6 h-6 fill-yellow-400" />
                <Star className={`w-6 h-6 ${result.score >= 85 ? 'fill-yellow-400' : 'text-slate-300'}`} />
              </div>

              <div className="flex items-center gap-2 font-black text-xl">
                {result.is_correct ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Sparkles className="w-6 h-6 text-amber-600" />
                )}
                <span>Score: {result.score || 90}%</span>
              </div>

              {result.recognized_speech && (
                <p className="text-xs font-semibold text-slate-600">
                  Heard: <span className="font-bold font-mono">"{result.recognized_speech}"</span>
                </p>
              )}

              <p className="font-bold text-sm sm:text-base mt-1">
                {result.feedback_en}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-amber-100">
          <button
            onClick={handlePrevWord}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none font-bold text-xs sm:text-sm text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Word</span>
          </button>

          <button
            onClick={handleNextWord}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-300 transition active:scale-95"
          >
            <span>Next Word</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Massi Tips for Pronunciation */}
      <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 flex items-center justify-between gap-4">
        <MassiTheFennec
          mood="talking"
          size="sm"
          speechTextEn={`Say "${currentWord.english}" clearly into your mic! You are doing great!`}
          speechTextAr={`قل "${currentWord.english}" بصوت واضح قرب الميكروفون!`}
        />
      </div>
    </div>
  );
};
