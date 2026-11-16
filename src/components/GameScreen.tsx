import React, { useMemo } from 'react';
import { Pause, Lightbulb, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { 
  BoardData, 
  FoundWordData, 
  GridCoordinate, 
  Lesson 
} from '../types/game';
import { WordGrid } from './WordGrid';
import { WordList } from './WordList';

interface GameScreenProps {
  lesson: Lesson;
  boardData: BoardData;
  foundWords: FoundWordData[];
  bonusWordsFound: string[];
  recentBonusNotice: { word: string; xp: number } | null;
  alreadyFoundNotice: { word: string; isBonus?: boolean } | null;
  alreadyFoundRecords: Record<string, number>;
  selectedCells: GridCoordinate[];
  hintCells: GridCoordinate[];
  hintsRemaining: number;
  timeLeft: number;
  shakeError: boolean;
  selectionFailed: boolean;
  onPointerStart: (coord: GridCoordinate) => void;
  onPointerMove: (coord: GridCoordinate) => void;
  onPointerEnd: () => void;
  onUseHint: () => void;
  onPause: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  lesson,
  boardData,
  foundWords,
  bonusWordsFound,
  recentBonusNotice,
  alreadyFoundNotice,
  alreadyFoundRecords,
  selectedCells,
  hintCells,
  hintsRemaining,
  timeLeft,
  shakeError,
  selectionFailed,
  onPointerStart,
  onPointerMove,
  onPointerEnd,
  onUseHint,
  onPause,
}) => {
  // Extract currently selected letters from coordinates
  const currentSelectionString = useMemo(() => {
    if (!selectedCells || selectedCells.length === 0 || !boardData) return '';
    return selectedCells
      .map((c) => boardData.grid[c.row]?.[c.col] || '')
      .join('');
  }, [selectedCells, boardData]);

  // Format time mm:ss
  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, [timeLeft]);

  const progressPercent = Math.round((foundWords.length / lesson.words.length) * 100);
  const isTimeCritical = timeLeft <= 15;

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-xl mx-auto px-3 sm:px-4 py-2 pb-6 relative">
      {/* Top Status & Controls */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-2.5 sm:p-4 border border-[#1E3F20]/10 shadow-xs mb-2">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2">
          {/* Pause Button */}
          <button
            onClick={onPause}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
            aria-label="Pause Lesson"
          >
            <Pause className="w-3.5 h-3.5 fill-stone-700" />
            <span className="hidden sm:inline">Pause</span>
          </button>

          {/* Lesson Identifier */}
          <div className="text-center flex-1 min-w-0 px-1">
            <span className="block text-[9px] sm:text-[10px] font-bold tracking-widest text-[#2D6A4F] uppercase truncate">
              {lesson.sectionTitle} • Level {lesson.lessonNumber} / 5
            </span>
            <h2 className="font-bold text-stone-900 text-xs sm:text-base leading-tight truncate">
              {lesson.title}
            </h2>
          </div>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-colors shrink-0 ${
              isTimeCritical
                ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
                : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Progress Bar & Bonus Words Indicator */}
        <div className="w-full">
          <div className="flex justify-between items-center text-[11px] font-semibold text-stone-500 mb-1">
            <span>Progress: {foundWords.length} of {lesson.words.length} found</span>
            <div className="flex items-center gap-2">
              {bonusWordsFound.length > 0 && (
                <span className="text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300/80 shadow-2xs flex items-center gap-1 animate-pulse">
                  <span>💎 {bonusWordsFound.length} Bonus</span>
                </span>
              )}
              <span className="text-[#2D6A4F] font-bold">{progressPercent}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#2D6A4F] to-[#52B788] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Word Chips & Discovered Bonus Words Tray */}
      <WordList 
        words={lesson.words} 
        foundWords={foundWords}
        bonusWordsFound={bonusWordsFound}
        highlightedFoundWord={alreadyFoundNotice?.word}
      />

      {/* Dynamic Notification: Already Found Notice, Bonus Word Banner, or Active Drag */}
      <div className="h-9 flex items-center justify-center my-1 relative">
        {alreadyFoundNotice ? (
          <div className="animate-bounce bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-md border border-blue-300 flex items-center gap-1.5 z-20">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>
              {alreadyFoundNotice.isBonus ? 'Bonus Word' : 'Word'} Already Found: "{alreadyFoundNotice.word}"
              {alreadyFoundRecords[alreadyFoundNotice.word] > 1 ? (
                <span className="opacity-90 ml-1 text-[10px] font-bold">
                  ({alreadyFoundRecords[alreadyFoundNotice.word]}x recorded)
                </span>
              ) : (
                <span className="opacity-90 ml-1 text-[10px] font-bold">(Recorded)</span>
              )}
            </span>
          </div>
        ) : recentBonusNotice ? (
          <div className="animate-bounce bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-md border border-amber-300 flex items-center gap-1.5 z-20">
            <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200 animate-spin" />
            <span>✨ BONUS WORD FOUND: {recentBonusNotice.word} (+{recentBonusNotice.xp} XP)!</span>
          </div>
        ) : currentSelectionString ? (
          <div
            className={`px-4 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all shadow-xs ${
              selectionFailed
                ? 'bg-rose-500 text-white animate-shake'
                : 'bg-[#1E3F20] text-[#E9B44C] ring-2 ring-[#E9B44C]/50'
            }`}
          >
            {currentSelectionString.split('').join(' ')}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <span>Drag across letters to select</span>
            <span className="text-stone-300">•</span>
            <span className="text-amber-700 font-semibold">Tip: Look for hidden bonus words!</span>
          </div>
        )}
      </div>

      {/* Word Search Grid */}
      <WordGrid
        boardData={boardData}
        foundWords={foundWords}
        selectedCells={selectedCells}
        hintCells={hintCells}
        shakeError={shakeError}
        selectionFailed={selectionFailed}
        onPointerStart={onPointerStart}
        onPointerMove={onPointerMove}
        onPointerEnd={onPointerEnd}
      />

      {/* Bottom Action Bar: Hints */}
      <div className="w-full flex items-center justify-between max-w-[420px] mx-auto mt-2 pt-2 border-t border-stone-200/50">
        <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
          <span>Direction:</span>
          <span className="capitalize font-semibold text-stone-700">
            {lesson.difficulty === 'beginner' ? 'Horizontal & Vertical' : 'Any 8 Directions'}
          </span>
        </div>

        {/* Hint Button */}
        <button
          onClick={onUseHint}
          disabled={hintsRemaining <= 0 || foundWords.length === lesson.words.length}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
            hintsRemaining > 0
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
              : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed opacity-60'
          }`}
          title="Highlight starting letter of a remaining word"
        >
          <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-600" />
          <span>Hint ({hintsRemaining})</span>
        </button>
      </div>
    </div>
  );
};
