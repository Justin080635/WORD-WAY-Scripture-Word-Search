import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  BoardData, 
  FoundWordData, 
  GameScreenState, 
  GridCoordinate, 
  Lesson, 
  PlacedWord, 
  PlayerProfile 
} from '../types/game';
import { ALL_LESSONS, getLessonById, getNextLesson } from '../data/lessonsData';
import { 
  generateWordSearchBoard, 
  calculateSelectedCells, 
  validateSelection, 
  findMatchingPlacedWord,
  checkAlreadyFoundBonusWord,
  checkBonusWord,
  WORD_HIGHLIGHT_COLORS 
} from '../utils/wordSearchEngine';
import { 
  loadProfileFromLocalStorage, 
  saveProfileToLocalStorage, 
  getRankForXP, 
  getTodayDateString 
} from '../utils/cloudSyncService';
import { triggerHaptic } from '../utils/haptics';
import { useGameAudio } from './useGameAudio';

export interface CompletionStats {
  xpEarned: number;
  baseXP: number;
  puzzleXP: number;
  lessonXP: number;
  perfectBonus: number;
  dailyBonus: number;
  wordsFound: number;
  totalWords: number;
  timeRemaining: number;
  accuracy: number;
  heartsRemaining: number;
  bonusWordsFoundCount: number;
}

export function useGameState() {
  const [profile, setProfile] = useState<PlayerProfile>(() => loadProfileFromLocalStorage());

  // Web Audio Hook linked with profile.soundEnabled
  const audio = useGameAudio({ soundEnabled: profile.soundEnabled });

  const [screen, setScreen] = useState<GameScreenState>('landing');
  const [showWelcome, setShowWelcome] = useState<boolean>(() => !loadProfileFromLocalStorage().hasOnboarded);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showCloudSync, setShowCloudSync] = useState<boolean>(false);

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [foundWords, setFoundWords] = useState<FoundWordData[]>([]);
  const [bonusWordsFound, setBonusWordsFound] = useState<string[]>([]);
  const [recentBonusNotice, setRecentBonusNotice] = useState<{ word: string; xp: number } | null>(null);
  const [alreadyFoundNotice, setAlreadyFoundNotice] = useState<{ word: string; isBonus?: boolean } | null>(null);
  const [alreadyFoundRecords, setAlreadyFoundRecords] = useState<Record<string, number>>({});

  const [selectedCells, setSelectedCells] = useState<GridCoordinate[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<GridCoordinate | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const [hintsRemaining, setHintsRemaining] = useState<number>(2);
  const [hintCells, setHintCells] = useState<GridCoordinate[]>([]);
  const hintTimeoutRef = useRef<number | null>(null);

  const [shakeError, setShakeError] = useState<boolean>(false);
  const [selectionFailed, setSelectionFailed] = useState<boolean>(false);

  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [completionStats, setCompletionStats] = useState<CompletionStats | null>(null);
  const [activeTab, setActiveTab] = useState<'path' | 'review' | 'quest'>('path');

  // Persist profile updates
  useEffect(() => {
    saveProfileToLocalStorage(profile);
  }, [profile]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  // Timer tick
  useEffect(() => {
    if (isTimerRunning && screen === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeExpiration();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, screen]);

  const handleTimeExpiration = () => {
    setIsTimerRunning(false);
    audio.playIncorrectGuess();

    setProfile(prev => {
      const nextHearts = Math.max(0, prev.hearts - 1);
      return {
        ...prev,
        hearts: nextHearts,
      };
    });

    setScreen('game-over');
  };

  /**
   * Start a Lesson (opens Intro screen first)
   */
  const openLessonIntro = useCallback((lessonId: string) => {
    const lesson = getLessonById(lessonId);
    if (!lesson) return;

    audio.playButtonClick();
    setCurrentLesson(lesson);
    setScreen('lesson-intro');
  }, [audio]);

  /**
   * Launch the game screen & generate the board
   */
  const startPlayingLesson = useCallback(() => {
    if (!currentLesson) return;

    audio.playButtonClick();
    const wordList = currentLesson.words.map(w => w.word);
    const newBoard = generateWordSearchBoard(wordList, currentLesson.gridSize, currentLesson.difficulty);

    setBoardData(newBoard);
    setFoundWords([]);
    setBonusWordsFound([]);
    setRecentBonusNotice(null);
    setAlreadyFoundNotice(null);
    setAlreadyFoundRecords({});
    setSelectedCells([]);
    setHintsRemaining(2);
    setHintCells([]);
    setMistakesCount(0);
    setTimeLeft(currentLesson.timeLimit);
    setIsTimerRunning(true);
    setScreen('playing');
  }, [currentLesson, audio]);

  /**
   * Restart current lesson
   */
  const restartLesson = useCallback(() => {
    if (!currentLesson) return;
    audio.playButtonClick();
    startPlayingLesson();
  }, [currentLesson, startPlayingLesson, audio]);

  /**
   * Pause & Resume
   */
  const pauseGame = useCallback(() => {
    if (screen === 'playing') {
      audio.playButtonClick();
      setIsTimerRunning(false);
      setScreen('paused');
    }
  }, [screen, audio]);

  const resumeGame = useCallback(() => {
    if (screen === 'paused') {
      audio.playButtonClick();
      setIsTimerRunning(true);
      setScreen('playing');
    }
  }, [screen, audio]);

  const quitToHome = useCallback(() => {
    audio.playButtonClick();
    setIsTimerRunning(false);
    setScreen('home');
    setSelectedCells([]);
    setHintCells([]);
  }, [audio]);

  /**
   * Drag Interaction
   */
  const handlePointerStart = useCallback((coord: GridCoordinate) => {
    if (screen !== 'playing' || !boardData) return;
    setIsDragging(true);
    dragStartRef.current = coord;
    setSelectedCells([coord]);
    setSelectionFailed(false);
  }, [screen, boardData]);

  const handlePointerMove = useCallback((currentCoord: GridCoordinate) => {
    if (!isDragging || !dragStartRef.current || !boardData) return;
    const cells = calculateSelectedCells(dragStartRef.current, currentCoord, boardData.size);
    setSelectedCells(cells);
  }, [isDragging, boardData]);

  const handlePointerEnd = useCallback(() => {
    if (!isDragging || !boardData || !currentLesson) {
      setIsDragging(false);
      return;
    }
    setIsDragging(false);

    const alreadyFound = foundWords.map(f => f.word);
    const matchedWord: PlacedWord | null = validateSelection(selectedCells, boardData.placedWords, alreadyFound);

    if (matchedWord) {
      // 1. Correct Target Word Found!
      audio.playWordFound();
      triggerHaptic('success');
      const colorIndex = foundWords.length % WORD_HIGHLIGHT_COLORS.length;
      const newFound: FoundWordData = {
        word: matchedWord.word,
        cells: matchedWord.cells,
        colorIndex,
      };

      const updatedFound = [...foundWords, newFound];
      setFoundWords(updatedFound);
      setSelectedCells([]);
      setHintCells([]); // clear active hint

      // Award XP for the word
      setProfile(prev => ({
        ...prev,
        xp: prev.xp + 5,
        rank: getRankForXP(prev.xp + 5).name,
      }));

      // Check if all target words are found
      if (updatedFound.length === boardData.placedWords.length) {
        handleLessonCompletion(updatedFound.length);
      }
    } else {
      // 2. Check if user highlighted a word that has ALREADY been found!
      const anyTargetMatch = findMatchingPlacedWord(selectedCells, boardData.placedWords);
      const draggedLetters = selectedCells.map(c => boardData.grid[c.row]?.[c.col] || '').join('');
      const alreadyFoundBonusMatch = checkAlreadyFoundBonusWord(draggedLetters, bonusWordsFound);

      if (anyTargetMatch && alreadyFound.includes(anyTargetMatch.word)) {
        // Target word was already found previously
        audio.playHint();
        triggerHaptic('medium');
        const word = anyTargetMatch.word;

        // Record the event
        setAlreadyFoundRecords(prev => ({
          ...prev,
          [word]: (prev[word] || 0) + 1,
        }));

        setAlreadyFoundNotice({ word, isBonus: false });
        setSelectedCells([]);

        setTimeout(() => {
          setAlreadyFoundNotice(null);
        }, 2200);
        return;
      }

      if (alreadyFoundBonusMatch) {
        // Bonus word was already found previously
        audio.playHint();
        triggerHaptic('medium');
        const word = alreadyFoundBonusMatch;

        // Record the event
        setAlreadyFoundRecords(prev => ({
          ...prev,
          [word]: (prev[word] || 0) + 1,
        }));

        setAlreadyFoundNotice({ word, isBonus: true });
        setSelectedCells([]);

        setTimeout(() => {
          setAlreadyFoundNotice(null);
        }, 2200);
        return;
      }

      // 3. Check for NEW Hidden Biblical Bonus Word!
      const bonusWord = checkBonusWord(
        draggedLetters,
        boardData.placedWords,
        bonusWordsFound,
        boardData.bonusWords || []
      );

      if (bonusWord) {
        // Bonus word found!
        audio.playBonusWordFound();
        triggerHaptic('celebrate');
        setBonusWordsFound(prev => [...prev, bonusWord]);
        setRecentBonusNotice({ word: bonusWord, xp: 10 });

        setSelectedCells([]);

        // Award bonus XP and track bonus words
        setProfile(prev => {
          const newBonusCount = (prev.totalBonusWordsFound || 0) + 1;
          const newXP = prev.xp + 10;
          return {
            ...prev,
            xp: newXP,
            totalBonusWordsFound: newBonusCount,
            rank: getRankForXP(newXP).name,
          };
        });

        setTimeout(() => {
          setRecentBonusNotice(null);
        }, 2800);
      } else {
        // 4. Incorrect Guess
        if (selectedCells.length > 1) {
          audio.playIncorrectGuess();
          triggerHaptic('medium');
          setShakeError(true);
          setSelectionFailed(true);
          setMistakesCount(prev => prev + 1);

          setTimeout(() => {
            setShakeError(false);
            setSelectionFailed(false);
            setSelectedCells([]);
          }, 320);
        } else {
          setSelectedCells([]);
        }
      }
    }
  }, [isDragging, boardData, currentLesson, foundWords, bonusWordsFound, selectedCells, audio]);

  /**
   * Lesson Complete Logic & Scoring
   */
  const handleLessonCompletion = (totalWordsFound: number) => {
    setIsTimerRunning(false);
    audio.playLessonComplete();

    // Celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#2D6A4F', '#D4AF37', '#52B788', '#F4A261', '#FAF7F2']
      });
    } catch {
      // silent
    }

    const today = getTodayDateString();
    const isFirstLessonToday = profile.lastPlayedDate !== today;
    const isPerfect = mistakesCount === 0;

    const baseXP = totalWordsFound * 5;
    const puzzleXP = 15;
    const lessonXP = 20;
    const perfectBonus = isPerfect ? 10 : 0;
    const dailyBonus = isFirstLessonToday ? 25 : 0;
    const totalXP = baseXP + puzzleXP + lessonXP + perfectBonus + dailyBonus;

    const totalWords = currentLesson?.words.length || totalWordsFound;
    const accuracy = Math.max(50, Math.round((totalWords / (totalWords + mistakesCount)) * 100));

    const stats: CompletionStats = {
      xpEarned: totalXP,
      baseXP,
      puzzleXP,
      lessonXP,
      perfectBonus,
      dailyBonus,
      wordsFound: totalWordsFound,
      totalWords,
      timeRemaining: timeLeft,
      accuracy,
      heartsRemaining: profile.hearts,
      bonusWordsFoundCount: bonusWordsFound.length,
    };

    setCompletionStats(stats);

    // Calculate Streak
    let newStreak = profile.currentStreak;
    if (isFirstLessonToday) {
      if (profile.lastPlayedDate) {
        const lastDate = new Date(profile.lastPlayedDate);
        const todayDate = new Date(today);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
    }

    const longestStreak = Math.max(newStreak, profile.longestStreak);

    // Update Daily Quest
    const questWords = Math.min(
      profile.dailyQuest.targetWords,
      profile.dailyQuest.currentWords + totalWordsFound
    );
    let questClaimed = profile.dailyQuest.claimed;
    let extraQuestXP = 0;
    if (!questClaimed && questWords >= profile.dailyQuest.targetWords) {
      questClaimed = true;
      extraQuestXP = profile.dailyQuest.rewardXP;
    }

    // Save progress
    setProfile(prev => {
      const completedList = prev.completedLessonIds.includes(currentLesson!.id)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, currentLesson!.id];

      const newXP = prev.xp + totalXP + extraQuestXP;

      return {
        ...prev,
        xp: newXP,
        rank: getRankForXP(newXP).name,
        currentStreak: newStreak,
        longestStreak,
        lastPlayedDate: today,
        completedLessonIds: completedList,
        lessonStats: {
          ...prev.lessonStats,
          [currentLesson!.id]: {
            stars: isPerfect ? 3 : mistakesCount <= 2 ? 2 : 1,
            bestTimeSeconds: Math.min(
              prev.lessonStats[currentLesson!.id]?.bestTimeSeconds || 9999,
              currentLesson!.timeLimit - timeLeft
            ),
            completedAt: new Date().toISOString(),
            bonusWordsFound: [...(prev.lessonStats[currentLesson!.id]?.bonusWordsFound || []), ...bonusWordsFound],
          },
        },
        dailyQuest: {
          ...prev.dailyQuest,
          currentWords: questWords,
          claimed: questClaimed,
        },
      };
    });

    setScreen('completed');
  };

  /**
   * Hint Engine
   */
  const useHint = useCallback(() => {
    if (hintsRemaining <= 0 || !boardData || screen !== 'playing') return;

    const alreadyFound = foundWords.map(f => f.word);
    const unrevealedWord = boardData.placedWords.find(p => !alreadyFound.includes(p.word));
    if (!unrevealedWord) return;

    audio.playHint();
    setHintsRemaining(prev => prev - 1);

    if (hintsRemaining === 2) {
      setHintCells([unrevealedWord.start]);
    } else {
      setHintCells([unrevealedWord.start, unrevealedWord.end]);
    }

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = window.setTimeout(() => {
      setHintCells([]);
    }, 4500);
  }, [hintsRemaining, boardData, foundWords, screen, audio]);

  /**
   * Claim an Achievement
   */
  const claimAchievement = useCallback((achievementId: string, rewardXP: number) => {
    audio.playAchievementUnlocked();
    setProfile(prev => {
      if (prev.unlockedAchievementIds?.includes(achievementId)) return prev;
      const newXP = prev.xp + rewardXP;
      return {
        ...prev,
        xp: newXP,
        rank: getRankForXP(newXP).name,
        unlockedAchievementIds: [...(prev.unlockedAchievementIds || []), achievementId],
      };
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // silent
    }
  }, [audio]);

  /**
   * Restore Hearts
   */
  const restoreHearts = useCallback(() => {
    audio.playButtonClick();
    setProfile(prev => ({
      ...prev,
      hearts: 3,
    }));
  }, [audio]);

  /**
   * Reset All Progress
   */
  const resetAllProgress = useCallback(() => {
    audio.playButtonClick();
    localStorage.removeItem('word_and_way_player_profile_v1');
    const fresh = loadProfileFromLocalStorage();
    setProfile(fresh);
    setScreen('home');
    setShowSettings(false);
  }, [audio]);

  /**
   * Cloud sync imported profile handler
   */
  const applyImportedProfile = useCallback((imported: PlayerProfile) => {
    audio.playWordFound();
    setProfile(imported);
    saveProfileToLocalStorage(imported);
  }, [audio]);

  /**
   * Finish Onboarding
   */
  const completeOnboarding = useCallback((name: string) => {
    audio.playButtonClick();
    setProfile(prev => ({
      ...prev,
      name: name.trim() || 'Pilgrim',
      hasOnboarded: true,
      hasSeenTutorial: false,
    }));
    setShowWelcome(false);
    // Show tutorial immediately after onboarding name
    setShowTutorial(true);
  }, [audio]);

  /**
   * Finish Tutorial
   */
  const completeTutorial = useCallback(() => {
    audio.playButtonClick();
    setProfile(prev => ({
      ...prev,
      hasSeenTutorial: true,
    }));
    setShowTutorial(false);
  }, [audio]);

  return {
    profile,
    setProfile,
    audio,
    screen,
    setScreen,
    currentLesson,
    boardData,
    foundWords,
    bonusWordsFound,
    recentBonusNotice,
    alreadyFoundNotice,
    alreadyFoundRecords,
    selectedCells,
    isDragging,
    timeLeft,
    hintsRemaining,
    hintCells,
    shakeError,
    selectionFailed,
    completionStats,
    activeTab,
    setActiveTab,
    showWelcome,
    setShowWelcome,
    showTutorial,
    setShowTutorial,
    showAchievements,
    setShowAchievements,
    showStreakModal,
    setShowStreakModal,
    showSettings,
    setShowSettings,
    showCloudSync,
    setShowCloudSync,
    // Actions
    openLessonIntro,
    startPlayingLesson,
    restartLesson,
    pauseGame,
    resumeGame,
    quitToHome,
    handlePointerStart,
    handlePointerMove,
    handlePointerEnd,
    useHint,
    claimAchievement,
    restoreHearts,
    resetAllProgress,
    applyImportedProfile,
    completeOnboarding,
    completeTutorial,
    nextLesson: currentLesson ? getNextLesson(currentLesson.id) : null,
  };
}
