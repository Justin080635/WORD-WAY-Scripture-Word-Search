import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Flame, 
  Heart, 
  Award, 
  Cloud, 
  BookOpen, 
  Grid 
} from 'lucide-react';
import { useGameAudio } from '../hooks/useGameAudio';

interface TutorialModalProps {
  soundEnabled: boolean;
  onComplete: () => void;
  isFirstTime?: boolean;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  soundEnabled,
  onComplete,
  isFirstTime = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const audio = useGameAudio({ soundEnabled });

  const steps = [
    {
      title: 'Find the Word',
      badge: 'Step 1 of 4 • Mechanics',
      description: 'Swipe or drag across letters in any direction to highlight and discover Scripture words.',
      icon: <Grid className="w-8 h-8 text-emerald-600" />,
      visual: (
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#1E3F20]/15 my-3">
          <div className="grid grid-cols-5 gap-1.5 max-w-[200px] mx-auto text-xs font-bold text-stone-800">
            {['F', 'A', 'I', 'T', 'H'].map((l, i) => (
              <div key={i} className="aspect-square rounded-lg bg-[#1E3F20] text-amber-300 flex items-center justify-center shadow-xs animate-pulse">
                {l}
              </div>
            ))}
            {['G', 'O', 'D', 'W', 'P'].map((l, i) => (
              <div key={i} className="aspect-square rounded-lg bg-stone-100 flex items-center justify-center">
                {l}
              </div>
            ))}
            {['L', 'I', 'G', 'H', 'T'].map((l, i) => (
              <div key={i} className="aspect-square rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center">
                {l}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 text-center mt-2.5 font-medium">
            Supports forward, backward, horizontal, vertical & diagonal selections!
          </p>
        </div>
      ),
    },
    {
      title: 'Discover Scripture Roots',
      badge: 'Step 2 of 4 • Reflection',
      description: 'Learn biblical vocabulary with original Greek and Hebrew meanings, references, and reflections.',
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      visual: (
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#1E3F20]/15 my-3 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-[#1E3F20] text-amber-300 rounded-lg font-bold text-xs">
              FAITH
            </span>
            <span className="text-[11px] text-stone-500 italic font-serif-bible">
              Greek: Πίστις (Pistis)
            </span>
          </div>
          <p className="text-xs font-medium text-stone-800">
            "Now faith is confidence in what we hope for and assurance about what we do not see."
          </p>
          <div className="text-[10px] text-emerald-800 font-bold">
            — Hebrews 11:1
          </div>
        </div>
      ),
    },
    {
      title: 'Hidden Bonus Words & Awards',
      badge: 'Step 3 of 4 • Hidden Treasures',
      description: 'Uncover extra biblical bonus words embedded in each level (like AMEN, PRAY, ZION, GRACE) to earn bonus XP and win achievement trophies.',
      icon: <Award className="w-8 h-8 text-amber-500" />,
      visual: (
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 my-3 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-extrabold text-xs rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ BONUS WORD FOUND: PRAY (+10 XP)</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
            Explore every corner of the grid for hidden biblical treasures to unlock prestigious trophies!
          </p>
        </div>
      ),
    },
    {
      title: 'Walk the Daily Way',
      badge: 'Step 4 of 4 • Consistency',
      description: 'Build your daily streak, protect your 3 hearts, and sync seamlessly between your phone, tablet, and computer with your Way Code.',
      icon: <Flame className="w-8 h-8 text-amber-600" />,
      visual: (
        <div className="grid grid-cols-3 gap-2 my-3 text-center">
          <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <div className="text-[10px] font-bold text-stone-700">Daily Streak</div>
            <div className="text-[10px] text-stone-500">Walk daily</div>
          </div>
          <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mx-auto mb-1" />
            <div className="text-[10px] font-bold text-stone-700">3 Hearts</div>
            <div className="text-[10px] text-stone-500">Graceful retry</div>
          </div>
          <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200">
            <Cloud className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-[10px] font-bold text-stone-700">Cloud Sync</div>
            <div className="text-[10px] text-stone-500">Multi-device</div>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    audio.playButtonClick();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      audio.playLessonComplete();
      onComplete();
    }
  };

  const handlePrev = () => {
    audio.playButtonClick();
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    audio.playButtonClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative text-center">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6A4F]">
            {current.badge}
          </span>
          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            {isFirstTime ? 'Skip Tutorial' : 'Close'}
          </button>
        </div>

        {/* Icon & Title */}
        <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center mx-auto mb-3 shadow-2xs">
          {current.icon}
        </div>

        <h3 className="text-xl font-extrabold text-stone-900 mb-1.5">
          {current.title}
        </h3>

        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-1">
          {current.description}
        </p>

        {/* Visual Preview */}
        {current.visual}

        {/* Dots progress indicator */}
        <div className="flex justify-center gap-1.5 my-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'w-6 bg-[#1E3F20]'
                  : 'w-2 bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{currentStep === steps.length - 1 ? (isFirstTime ? 'READY — BEGIN JOURNEY' : 'GOT IT!') : 'NEXT'}</span>
            {currentStep === steps.length - 1 ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
