export type TermNumber = 1 | 2 | 3;

export interface VocabWord {
  id: string;
  english: string;
  arabic: string;
  french: string;
  category: string;
  phonetic?: string;
  emoji?: string;
  image?: string;
  exampleSentence?: string;
  exampleArabic?: string;
}

export type ActivityType = 
  | 'explore'
  | 'pronunciation'
  | 'camera'
  | 'quiz'
  | 'handwriting';

export interface QuizQuestion {
  id: string;
  type: 'listen-choice' | 'match' | 'command-action' | 'fill-gap';
  promptEn: string;
  promptAr: string;
  targetWord?: string;
  options: {
    id: string;
    text: string;
    emoji?: string;
    isCorrect: boolean;
  }[];
  explanationEn?: string;
  explanationFr?: string;
  explanationAr?: string;
}

export interface Unit {
  id: string;
  unitNumber: number;
  term: TermNumber;
  titleEn: string;
  titleAr: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  vocabulary: VocabWord[];
  tracingLetters?: string[];
  quizQuestions: QuizQuestion[];
  flashcardTargets: string[];
}

export interface World {
  id: string;
  term: TermNumber;
  nameEn: string;
  nameAr: string;
  theme: string;
  bgTheme: string;
  descriptionEn: string;
  descriptionAr: string;
  badgeName: string;
  badgeIcon: string;
  units: Unit[];
}

export interface UserProgress {
  stars: number;
  completedUnits: string[];
  unitScores: Record<string, number>;
  unlockedBadges: string[];
  voicePracticeCount: number;
  cameraCardsFound: number;
  learnedWords: string[];
  streakDays?: number;
  lastActiveDate?: string;
  isProAccount?: boolean;
  studentName?: string;
  dailyStarsGoal?: number;
  todayStars?: number;
}
