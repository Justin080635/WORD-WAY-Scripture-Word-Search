import React from 'react';
import { Award, Zap, Heart, Clock, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { Lesson } from '../types/game';
import { CompletionStats } from '../hooks/useGameState';
import { sound } from '../utils/soundEffects';

interface LessonCompleteModalProps {
  lesson: Lesson;
  stats: CompletionStats | null;
  onContinue: () => void;
  onReviewWords: () => void;
}

export const LessonCompleteModal: React.FC<LessonCompleteModalProps> = ({
  lesson,
  stats,
  onContinue,
  onReviewWords,
}) => {
  if (!stats) return null;

  const formattedTimeRemaining = () => {
    const mins = Math.floor(stats.timeRemaining / 60);
    const secs = stats.timeRemaining % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#1E3F20]/15 text-center relative overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-100 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-100 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Trophy / Ribbon badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E9B44C] to-[#D4AF37] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] mb-1 block">
            Lesson Complete
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-1">
            Well Done!
          </h2>

          <p className="text-stone-500 text-xs sm:text-sm mb-6">
            You completed <span className="font-semibold text-stone-700">{lesson.title}</span>
          </p>

          {/* XP Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-[#1E3F20] text-white p-4 rounded-2xl shadow-sm mb-4 flex items-center justify-between">
            <div className="text-left">
              <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider block">
                Total XP Earned
              </span>
              <span className="text-3xl font-extrabold tracking-tight flex items-center gap-1.5">
                <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
                +{stats.xpEarned} XP
              </span>
            </div>

            <div className="text-right text-xs space-y-0.5 text-emerald-100">
              <div>Base: +{stats.baseXP}</div>
              <div>Lesson: +{stats.lessonXP + stats.puzzleXP}</div>
              {stats.perfectBonus > 0 && <div className="text-amber-300 font-bold">★ Perfect +{stats.perfectBonus}</div>}
              {stats.dailyBonus > 0 && <div className="text-amber-300 font-bold">☀️ Daily 1st +{stats.dailyBonus}</div>}
            </div>
          </div>

          {/* Bonus Words notice if found */}
          {stats.bonusWordsFoundCount > 0 && (
            <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl py-2 px-3 text-xs font-bold mb-4 flex items-center justify-center gap-1.5 shadow-2xs">
              <span>💎 {stats.bonusWordsFoundCount} Hidden Biblical Bonus Word{stats.bonusWordsFoundCount > 1 ? 's' : ''} Found (+{stats.bonusWordsFoundCount * 10} XP)!</span>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[10px] text-stone-500 font-medium">Words</div>
              <div className="text-xs font-bold text-stone-800">{stats.wordsFound}/{stats.totalWords}</div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60">
              <Clock className="w-4 h-4 text-stone-600 mx-auto mb-1" />
              <div className="text-[10px] text-stone-500 font-medium">Time Left</div>
              <div className="text-xs font-bold text-stone-800">{formattedTimeRemaining()}</div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60">
              <Award className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <div className="text-[10px] text-stone-500 font-medium">Accuracy</div>
              <div className="text-xs font-bold text-stone-800">{stats.accuracy}%</div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mx-auto mb-1" />
              <div className="text-[10px] text-stone-500 font-medium">Hearts</div>
              <div className="text-xs font-bold text-stone-800">{stats.heartsRemaining}/3</div>
            </div>
          </div>

          {/* Scripture Reflection Card */}
          <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#1E3F20]/15 mb-6 text-left">
            <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">
              Scripture Reflection
            </span>
            <p className="font-serif-bible text-stone-900 text-sm sm:text-base italic leading-relaxed mb-2">
              "{lesson.scripture.text}"
            </p>
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-emerald-900">— {lesson.scripture.reference}</span>
            </div>
            {lesson.scripture.context && (
              <p className="mt-2 text-xs text-stone-600 pt-2 border-t border-stone-200/60 leading-normal">
                {lesson.scripture.context}
              </p>
            )}
          </div>

          {/* Buttons: Review Words & Continue */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                sound.playButtonClick();
                onReviewWords();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>REVIEW WORDS</span>
            </button>

            <button
              onClick={() => {
                sound.playButtonClick();
                onContinue();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
