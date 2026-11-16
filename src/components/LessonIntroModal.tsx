import React from 'react';
import { Play, ArrowLeft, Clock, Grid, BookOpen, Sparkles } from 'lucide-react';
import { Lesson } from '../types/game';
import { sound } from '../utils/soundEffects';

interface LessonIntroModalProps {
  lesson: Lesson;
  onStart: () => void;
  onBack: () => void;
}

export const LessonIntroModal: React.FC<LessonIntroModalProps> = ({
  lesson,
  onStart,
  onBack,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={() => {
          sound.playButtonClick();
          onBack();
        }}
        className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Journey</span>
      </button>

      {/* Main Intro Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1E3F20]/15 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100/60 to-transparent rounded-bl-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1E3F20] text-xs font-bold uppercase tracking-wider">
              {lesson.sectionTitle}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Lesson {lesson.lessonNumber} of 5
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-1">
            {lesson.title}
          </h2>

          <p className="text-sm font-serif-bible italic text-emerald-800 mb-4">
            "{lesson.subtitle}"
          </p>

          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            {lesson.description}
          </p>

          {/* Lesson Metadata Chips */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60 text-center">
              <Grid className="w-4 h-4 text-stone-500 mx-auto mb-1" />
              <div className="text-[11px] text-stone-500 font-medium">Grid Size</div>
              <div className="text-xs font-bold text-stone-800">{lesson.gridSize} × {lesson.gridSize}</div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60 text-center">
              <Clock className="w-4 h-4 text-stone-500 mx-auto mb-1" />
              <div className="text-[11px] text-stone-500 font-medium">Time Limit</div>
              <div className="text-xs font-bold text-stone-800">{lesson.timeLimit}s</div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/60 text-center">
              <BookOpen className="w-4 h-4 text-stone-500 mx-auto mb-1" />
              <div className="text-[11px] text-stone-500 font-medium">Scripture Words</div>
              <div className="text-xs font-bold text-stone-800">{lesson.words.length} Words</div>
            </div>
          </div>

          {/* Scripture Preview Card */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#1E3F20]/10 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D6A4F] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Theme Verse — {lesson.scripture.reference}</span>
            </div>
            <p className="font-serif-bible text-stone-800 text-sm italic leading-relaxed">
              "{lesson.scripture.text}"
            </p>
          </div>

          {/* Words Preview */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              Words to Discover
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {lesson.words.map(w => (
                <span
                  key={w.word}
                  className="px-2.5 py-1 bg-stone-100 text-stone-700 font-bold text-xs rounded-lg border border-stone-200"
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>

          {/* Start CTA */}
          <button
            onClick={onStart}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>START LESSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
