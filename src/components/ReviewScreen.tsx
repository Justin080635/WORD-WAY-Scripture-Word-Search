import React from 'react';
import { ArrowLeft, RotateCcw, BookOpen } from 'lucide-react';
import { Lesson } from '../types/game';
import { sound } from '../utils/soundEffects';

interface ReviewScreenProps {
  lesson: Lesson;
  onPlayAgain: () => void;
  onBackToPath: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  lesson,
  onPlayAgain,
  onBackToPath,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 animate-fadeIn pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.playButtonClick();
            onBackToPath();
          }}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Learning Path</span>
        </button>

        <button
          onClick={() => {
            sound.playButtonClick();
            onPlayAgain();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-[#1E3F20] text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Play Lesson Again</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#1E3F20]/15 shadow-xs mb-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Scripture Glossary & Review
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
          {lesson.title}
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Explore the biblical meanings and scriptural roots of every word in this lesson.
        </p>
      </div>

      {/* Words Cards */}
      <div className="space-y-3">
        {lesson.words.map((item, idx) => (
          <div
            key={item.word}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs hover:border-[#1E3F20]/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="font-extrabold text-base tracking-wider text-stone-900">
                  {item.word}
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-[#FAF7F2] text-[#2D6A4F] text-xs font-semibold rounded-lg border border-[#1E3F20]/10">
                {item.reference}
              </span>
            </div>

            {item.hebrewOrGreek && (
              <div className="text-xs text-emerald-800 font-serif-bible italic mb-2">
                {item.hebrewOrGreek}
              </div>
            )}

            <p className="text-stone-800 text-sm font-medium mb-2 leading-snug">
              {item.definition}
            </p>

            <div className="text-stone-600 text-xs leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200/50">
              {item.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Scripture Card */}
      <div className="mt-4 bg-[#FAF7F2] rounded-2xl p-5 border border-[#1E3F20]/15">
        <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">
          Scripture Context
        </span>
        <p className="font-serif-bible text-stone-900 text-sm italic mb-2">
          "{lesson.scripture.text}"
        </p>
        <span className="text-xs font-bold text-stone-600 block mb-1">
          — {lesson.scripture.reference}
        </span>
        {lesson.scripture.context && (
          <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-200/60">
            {lesson.scripture.context}
          </p>
        )}
      </div>

      {/* Footer Bottom Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            sound.playButtonClick();
            onBackToPath();
          }}
          className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-bold transition-colors cursor-pointer"
        >
          Return to Path
        </button>
        <button
          onClick={() => {
            sound.playButtonClick();
            onPlayAgain();
          }}
          className="flex-1 py-3 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-98"
        >
          Play Lesson Again
        </button>
      </div>
    </div>
  );
};
