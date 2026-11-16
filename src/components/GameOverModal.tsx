import React from 'react';
import { RotateCcw, BookOpen, Home } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface GameOverModalProps {
  onTryAgain: () => void;
  onReviewWords: () => void;
  onQuit: () => void;
  heartsRemaining: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  onTryAgain,
  onReviewWords,
  onQuit,
  heartsRemaining,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-stone-200 text-center">
        {/* Soft icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
          <RotateCcw className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-extrabold text-stone-900 mb-1">
          Take a breath. Try again.
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm mb-4 leading-relaxed">
          {heartsRemaining > 0
            ? 'Time ran out on this attempt! You still have hearts left.'
            : 'No worries — learning Scripture is a lifelong walk. Your hearts have refreshed so you can continue.'}
        </p>

        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#1E3F20]/10 mb-6 text-stone-700 font-serif-bible text-xs italic">
          "The steadfast love of the Lord never ceases; His mercies never come to an end."
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              sound.playButtonClick();
              onTryAgain();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>TRY AGAIN</span>
          </button>

          <button
            onClick={() => {
              sound.playButtonClick();
              onReviewWords();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Review Words First</span>
          </button>

          <button
            onClick={() => {
              sound.playButtonClick();
              onQuit();
            }}
            className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Home className="w-3 h-3" />
            <span>Return to Learning Path</span>
          </button>
        </div>
      </div>
    </div>
  );
};
