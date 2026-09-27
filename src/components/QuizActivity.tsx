import React, { useState } from 'react';
import { Unit, QuizQuestion } from '../types/curriculum';
import { MassiTheFennec } from './MassiTheFennec';
import { speakText } from '../services/speechService';
import {
  playPopSound,
  playCorrectSound,
  playTryAgainSound,
  playSuccessChime,
  playStarEarnedSound,
  playFanfare
} from '../services/soundEffects';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Star,
  Trophy,
  RotateCcw
} from 'lucide-react';

interface QuizActivityProps {
  unit: Unit;
  onAwardStars: (count: number) => void;
  onBack: () => void;
}

export const QuizActivity: React.FC<QuizActivityProps> = ({
  unit,
  onAwardStars,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions: QuizQuestion[] = unit.quizQuestions.length > 0
    ? unit.quizQuestions
    : [
        {
          id: 'q-auto-1',
          type: 'listen-choice',
          promptEn: `Listen and pick the correct word for: "${unit.vocabulary[0].arabic}"`,
          promptAr: `استمع واختر الكلمة الصحيحة لـ: "${unit.vocabulary[0].arabic}"`,
          targetWord: unit.vocabulary[0].english,
          options: [
            { id: 'opt1', text: unit.vocabulary[0].english, emoji: unit.vocabulary[0].emoji, isCorrect: true },
            { id: 'opt2', text: unit.vocabulary[1]?.english || 'Book', emoji: unit.vocabulary[1]?.emoji || '📚', isCorrect: false },
            { id: 'opt3', text: unit.vocabulary[2]?.english || 'Pen', emoji: unit.vocabulary[2]?.emoji || '🖊️', isCorrect: false }
          ]
        }
      ];

  const currentQ = questions[currentQuestionIndex];

  const handlePlayPromptAudio = () => {
    playPopSound();
    if (currentQ.targetWord) {
      speakText(currentQ.targetWord, 'en-US');
    } else {
      speakText(currentQ.promptEn, 'en-US');
    }
  };

  const handleSelectOption = (option: { id: string; isCorrect: boolean; text: string }) => {
    if (isAnswered) return;
    playPopSound();
    setSelectedOptionId(option.id);
    setIsAnswered(true);

    if (option.isCorrect) {
      playSuccessChime();
      playStarEarnedSound();
      setScore((prev) => prev + 1);
      onAwardStars(2);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 }
      });
      speakText(`Correct! ${option.text}!`, 'en-US');
    } else {
      playTryAgainSound();
      speakText('Try again next time!', 'en-US');
    }
  };

  const handleNextQuestion = () => {
    playPopSound();
    setSelectedOptionId(null);
    setIsAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      playFanfare();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestartQuiz = () => {
    playPopSound();
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
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
            Curriculum Challenge Quiz
          </span>
          <div className="text-sm font-black text-slate-800">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 space-y-6">
          {/* Question Prompt */}
          <div className="text-center space-y-2">
            <span className="inline-block bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-full border border-amber-300">
              Unit {unit.unitNumber} Quiz
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentQ.promptEn}
            </h2>

            {currentQ.promptAr && (
              <p className="text-sm sm:text-base font-bold text-amber-700 font-['Tajawal',sans-serif]" dir="rtl">
                {currentQ.promptAr}
              </p>
            )}

            {/* Audio Button */}
            <div className="pt-2">
              <button
                onClick={handlePlayPromptAudio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-300 transition active:scale-95"
              >
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span>Listen to Question</span>
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle =
                'bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 text-slate-800';

              if (isAnswered) {
                if (option.isCorrect) {
                  optionStyle =
                    'bg-emerald-100 border-3 border-emerald-500 text-emerald-950 font-black scale-102';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle =
                    'bg-rose-100 border-3 border-rose-500 text-rose-950 opacity-80';
                } else {
                  optionStyle = 'opacity-40 border-slate-200';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all shadow-md active:scale-95 text-center ${optionStyle}`}
                >
                  {option.emoji && (
                    <span className="text-5xl mb-2">{option.emoji}</span>
                  )}
                  <span className="text-lg font-black">{option.text}</span>

                  {isAnswered && option.isCorrect && (
                    <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold mt-2">
                      <CheckCircle2 className="w-4 h-4" /> Correct!
                    </div>
                  )}

                  {isAnswered && isSelected && !option.isCorrect && (
                    <div className="flex items-center gap-1 text-xs text-rose-700 font-bold mt-2">
                      <XCircle className="w-4 h-4" /> Not this one
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Button */}
          {isAnswered && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-amber-800 uppercase block">
                  Massi's Explanation:
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {currentQ.explanationEn || 'Super job! Keep rocking your English journey!'}
                </p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-md shadow-amber-300 transition active:scale-95 shrink-0"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question ➡️' : 'See Results 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Victory Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-4 border-amber-300 text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-300 animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Quiz Completed! 🌟
            </h2>
            <p className="text-base text-slate-600 font-semibold">
              You scored <span className="font-extrabold text-amber-600 text-xl">{score}</span> out of {questions.length} questions!
            </p>
            <p className="text-sm font-bold text-amber-700 font-['Tajawal',sans-serif]" dir="rtl">
              أحسنت صنعاً! ماسي فخور بإنجازك الرائع في هذه الوحدة!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={onBack}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-lg shadow-amber-300 transition active:scale-95"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Back to Unit Hub</span>
            </button>
          </div>
        </div>
      )}

      {/* Massi Footer Advice */}
      <div className="bg-amber-100/70 rounded-2xl p-4 border border-amber-300 flex items-center justify-between gap-4">
        <MassiTheFennec
          mood="excited"
          size="sm"
          speechTextEn="Read carefully and listen to the audio! You can do it!"
          speechTextAr="استمع جيداً واختر الإجابة الصحيحة، أنت ذكي ومميز!"
        />
      </div>
    </div>
  );
};
