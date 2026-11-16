import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface WelcomeModalProps {
  onComplete: (name: string) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  const handleNext = () => {
    sound.playButtonClick();
    setStep(2);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playButtonClick();
    onComplete(name.trim() || 'Pilgrim');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-[#1E3F20]/15 text-center relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-amber-100/60 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-[#1E3F20] text-[#FAF7F2] flex items-center justify-center mx-auto mb-4 shadow-md">
            <Compass className="w-9 h-9 text-[#E9B44C]" />
          </div>

          <h1 className="font-brand font-bold text-2xl sm:text-3xl text-[#1E3F20] tracking-wide mb-1">
            WORD & WAY
          </h1>

          <p className="text-xs sm:text-sm font-serif-bible italic text-[#2D6A4F] mb-6">
            Find the Word. Walk the Way.
          </p>

          {step === 1 ? (
            <div>
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#1E3F20]/10 mb-6 text-stone-700 text-sm leading-relaxed space-y-2">
                <p className="font-semibold text-[#1E3F20]">
                  Welcome to Scripture Word Search.
                </p>
                <p className="text-xs text-stone-600">
                  Search, discover, and reflect on God’s eternal truths through gamified word searches, Scripture verses, and daily reflections.
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-500 mb-6 text-left px-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Interactive touch & mouse word selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25 deep theological & biblical lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>XP, Streaks, Daily Quests & Ranks</span>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>BEGIN JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleFinish} className="animate-fadeIn">
              <h2 className="text-lg font-bold text-stone-900 mb-2">
                What should we call you?
              </h2>
              <p className="text-xs text-stone-500 mb-5">
                Your pilgrim name will be saved with your progress.
              </p>

              <div className="mb-6">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Pilgrim, Ruth, David"
                  maxLength={24}
                  autoFocus
                  className="w-full px-4 py-3 rounded-2xl border-2 border-stone-200 focus:border-[#1E3F20] focus:outline-none text-center font-bold text-stone-900 text-base placeholder:text-stone-400 shadow-2xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>READY — ENTER THE WORD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
