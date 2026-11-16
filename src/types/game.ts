export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'master';

export interface ScriptureWord {
  word: string;
  definition: string;
  reference: string;
  explanation: string;
  hebrewOrGreek?: string;
}

export interface ScriptureQuote {
  reference: string;
  text: string;
  context?: string;
}

export interface Lesson {
  id: string;
  sectionId: string;
  sectionTitle: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: Difficulty;
  gridSize: number;
  timeLimit: number; // in seconds
  words: ScriptureWord[];
  scripture: ScriptureQuote;
}

export interface Section {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  lessons: Lesson[];
}

export interface GridCoordinate {
  row: number;
  col: number;
}

export interface PlacedWord {
  word: string;
  start: GridCoordinate;
  end: GridCoordinate;
  cells: GridCoordinate[];
  direction: [number, number]; // [dr, dc]
}

export interface BoardData {
  grid: string[][];
  size: number;
  placedWords: PlacedWord[];
  bonusWords: string[]; // Level-specific hidden bonus words
}

export interface FoundWordData {
  word: string;
  cells: GridCoordinate[];
  colorIndex: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'journey' | 'bonus' | 'scholar' | 'mastery';
  target: number;
  rewardXP: number;
}

export interface DailyQuest {
  date: string; // YYYY-MM-DD
  targetWords: number;
  currentWords: number;
  rewardXP: number;
  claimed: boolean;
}

export interface PlayerProfile {
  name: string;
  xp: number;
  rank: string;
  hearts: number;
  maxHearts: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string; // YYYY-MM-DD
  completedLessonIds: string[];
  lessonStats: Record<string, {
    stars: number;
    bestTimeSeconds: number;
    completedAt: string;
    bonusWordsFound?: string[];
  }>;
  totalBonusWordsFound: number;
  unlockedAchievementIds: string[];
  dailyQuest: DailyQuest;
  soundEnabled: boolean;
  syncCode: string;
  lastSyncedAt: string;
  hasOnboarded: boolean;
  hasSeenTutorial: boolean;
}

export type GameScreenState = 
  | 'landing'
  | 'home'
  | 'lesson-intro'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'game-over'
  | 'review';
