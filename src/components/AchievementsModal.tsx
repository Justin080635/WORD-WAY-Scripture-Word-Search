import React, { useState } from 'react';
import { Award, Check, Sparkles, X, Zap } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { ALL_ACHIEVEMENTS, getAchievementProgress } from '../data/achievementsData';
import { sound } from '../utils/soundEffects';

interface AchievementsModalProps {
  profile: PlayerProfile;
  onClaimAchievement: (achievementId: string, rewardXP: number) => void;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  profile,
  onClaimAchievement,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'bonus' | 'journey' | 'mastery'>('all');

  const filtered = ALL_ACHIEVEMENTS.filter(a => {
    if (filter === 'all') return true;
    return a.category === filter;
  });

  const totalUnlocked = ALL_ACHIEVEMENTS.filter(a => {
    const { completed } = getAchievementProgress(a, profile);
    return completed;
  }).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                Achievements & Awards
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {totalUnlocked} of {ALL_ACHIEVEMENTS.length} Awards Won
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close Awards"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bonus Words Spotlight Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-[#1E3F20] text-white p-3.5 rounded-2xl shadow-xs mb-3 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-lg">
              💎
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                Scripture Bonus Words
              </div>
              <div className="text-sm font-extrabold">
                {profile.totalBonusWordsFound || 0} Bonus Words Discovered
              </div>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-amber-300 bg-black/20 px-2.5 py-1 rounded-lg">
            +10 XP each
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 shrink-0 text-xs font-bold">
          {(['all', 'bonus', 'journey', 'mastery'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playButtonClick();
                setFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? 'bg-[#1E3F20] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Awards' : cat === 'bonus' ? 'Bonus Words' : cat}
            </button>
          ))}
        </div>

        {/* Awards List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {filtered.map(ach => {
            const { current, max, completed } = getAchievementProgress(ach, profile);
            const isClaimed = profile.unlockedAchievementIds?.includes(ach.id);
            const canClaim = completed && !isClaimed;
            const percent = Math.min(100, Math.round((current / max) * 100));

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  completed
                    ? 'bg-amber-50/50 border-amber-200/90 shadow-2xs'
                    : 'bg-stone-50/60 border-stone-200/70 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-1 bg-white rounded-xl shadow-2xs border border-stone-200/60 shrink-0">
                      {ach.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-stone-900 text-sm">
                          {ach.title}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5 fill-amber-600" />
                          +{ach.rewardXP} XP
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  {/* Status / Claim CTA */}
                  <div className="shrink-0">
                    {canClaim ? (
                      <button
                        onClick={() => {
                          onClaimAchievement(ach.id, ach.rewardXP);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-xs transition-all animate-bounce cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Claim</span>
                      </button>
                    ) : isClaimed ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Won</span>
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-stone-400">
                        {current}/{max}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mini progress bar if in progress */}
                {!completed && (
                  <div className="mt-2.5 w-full">
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
