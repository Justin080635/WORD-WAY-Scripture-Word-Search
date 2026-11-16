import React from 'react';
import { Play, RotateCcw, Home, X } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface PauseModalProps {
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestart,
  onQuit,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center relative">
        <button
          onClick={onResume}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          aria-label="Resume"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mx-auto mb-3">
          <Play className="w-6 h-6 fill-stone-700 translate-x-0.5" />
        </div>

        <h3 className="text-xl font-extrabold text-stone-900 mb-1">
          PAUSED
        </h3>
        <p className="text-stone-500 text-xs mb-6">
          Your timer is frozen. Take your time.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              sound.playButtonClick();
              onResume();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>RESUME</span>
          </button>

          <button
            onClick={() => {
              sound.playButtonClick();
              onRestart();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Lesson</span>
          </button>

          <button
            onClick={() => {
              sound.playButtonClick();
              onQuit();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Quit to Learning Path</span>
          </button>
        </div>
      </div>
    </div>
  );
};
