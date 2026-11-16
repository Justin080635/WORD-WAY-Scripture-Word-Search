import React from 'react';
import { Flame, Check, Sparkles, X, Trophy, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerProfile } from '../types/game';
import { triggerHaptic } from '../utils/haptics';
import { sound } from '../utils/soundEffects';

interface StreakModalProps {
  profile: PlayerProfile;
  onClose: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({ profile, onClose }) => {
  const current = profile.currentStreak;

  const milestones = [
    { days: 1, title: 'Holy Spark', reward: '+15 XP', desc: 'First day in the Word' },
    { days: 3, title: 'Steadfast Pilgrim', reward: '+35 XP', desc: '3 consecutive days' },
    { days: 7, title: 'Sabbath Flame', reward: '+75 XP', desc: 'A full week faithful' },
    { days: 14, title: 'Beacon of Light', reward: '+150 XP', desc: 'Two weeks unbroken' },
    { days: 30, title: 'Eternal Torch', reward: '+300 XP', desc: 'A full month in Scripture' },
  ];

  const nextMilestone = milestones.find(m => m.days > current) || milestones[milestones.length - 1];
  const prevDays = milestones.filter(m => m.days <= current).pop()?.days || 0;
  const progressToNext = Math.min(
    100,
    Math.round(((current - prevDays) / Math.max(1, nextMilestone.days - prevDays)) * 100)
  );

  const handleCelebrate = () => {
    sound.playCorrectWord();
    triggerHaptic('celebrate');
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#F59E0B', '#D97706', '#E9B44C', '#2D6A4F', '#FAF7F2']
      });
    } catch {
      // silent
    }
  };

  // 7-day visual calendar indicators
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative text-center overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close Streak Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          {/* Flame Icon with subtle celebratory pulsing aura */}
          <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping opacity-50 pointer-events-none" />
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg animate-flame">
              <Flame className="w-12 h-12 fill-amber-100 text-white" />
            </div>
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
            Daily Scripture Walk
          </span>

          <h3 className="text-3xl font-black text-stone-900 tracking-tight mb-1">
            {current} Day Streak!
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm mb-4">
            {current >= 7
              ? 'Incredible faithfulness! Your daily devotion is burning bright.'
              : current >= 3
              ? 'Steadfast dedication. Walking in the Word transforms the heart.'
              : current >= 1
              ? 'Your streak is alive! Return tomorrow to keep the flame burning.'
              : 'Begin your journey today by completing a lesson.'}
          </p>

          {/* Weekly Habit Tracker */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-amber-200/70 mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>This Week's Walk</span>
              </span>
              <span className="text-[11px] text-amber-800">
                Best: {profile.longestStreak} Days
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {daysOfWeek.map((day, idx) => {
                const isPastOrToday = idx <= todayDayIndex;
                const isCompleted = isPastOrToday && current > 0 && (todayDayIndex - idx < current);
                const isToday = idx === todayDayIndex;

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xs'
                          : isToday
                          ? 'bg-amber-100 border-2 border-amber-500 text-amber-900'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : day}
                    </div>
                    <span className="text-[9px] font-semibold text-stone-400">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Milestone Progress Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs mb-4 text-left">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Next Milestone: {nextMilestone.title} ({nextMilestone.days}d)</span>
              </div>
              <span className="text-amber-700">{nextMilestone.reward}</span>
            </div>

            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60 p-0.5 mb-1.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              />
            </div>

            <div className="text-[11px] text-stone-500 flex justify-between">
              <span>{current} / {nextMilestone.days} days completed</span>
              <span>{Math.max(0, nextMilestone.days - current)} days left</span>
            </div>
          </div>

          {/* Scripture Encouragement */}
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/50 mb-5 text-left">
            <p className="font-serif-bible text-xs italic text-stone-700 leading-relaxed mb-1">
              "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."
            </p>
            <span className="text-[10px] font-bold text-emerald-800 block">
              — Galatians 6:9
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCelebrate}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-amber-200" />
              <span>Celebrate Consistency</span>
            </button>

            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
