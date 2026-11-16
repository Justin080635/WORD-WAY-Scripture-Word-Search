import React from 'react';
import { Flame, Zap, Heart, Settings, Cloud, Compass, Award, HelpCircle } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { getRankForXP } from '../utils/cloudSyncService';
import { sound } from '../utils/soundEffects';

interface HeaderNavProps {
  profile: PlayerProfile;
  onOpenSettings: () => void;
  onOpenCloudSync: () => void;
  onOpenAchievements: () => void;
  onOpenTutorial: () => void;
  onOpenStreak: () => void;
  onGoHome: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  profile,
  onOpenSettings,
  onOpenCloudSync,
  onOpenAchievements,
  onOpenTutorial,
  onOpenStreak,
  onGoHome,
}) => {
  const currentRank = getRankForXP(profile.xp);

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#1E3F20]/10 px-2 sm:px-4 py-2 box-border">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-1 sm:gap-2 w-full">
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            sound.playButtonClick();
            onGoHome();
          }}
          className="flex items-center gap-1.5 sm:gap-2 group text-left cursor-pointer transition-transform active:scale-95 shrink-0"
          aria-label="Word & Way Home"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1E3F20] text-[#FAF7F2] flex items-center justify-center shadow-2xs group-hover:bg-[#2D6A4F] transition-colors">
            <Compass className="w-4 h-4 text-[#E9B44C]" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-brand font-bold text-sm sm:text-base leading-none text-[#1E3F20] tracking-wide whitespace-nowrap">
              WORD & WAY
            </h1>
            <p className="text-[9px] font-medium tracking-wider text-[#6B7280] uppercase hidden sm:block">
              Scripture Word Search
            </p>
          </div>
        </button>

        {/* Live Game Stats & Navigation Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Streak Badge */}
          <button 
            onClick={() => {
              sound.playButtonClick();
              onOpenStreak();
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-2xs cursor-pointer active:scale-95 transition-all ${
              profile.currentStreak >= 3
                ? 'bg-amber-100/90 border border-amber-300 text-amber-900 animate-halo'
                : 'bg-amber-50/90 border border-amber-200/80 text-amber-800 hover:bg-amber-100/80'
            }`}
            title={`${profile.currentStreak} Day Streak • Tap to view milestones`}
          >
            <Flame className={`w-3.5 h-3.5 ${profile.currentStreak > 0 ? 'text-amber-600 fill-amber-500 animate-flame' : 'text-stone-400'}`} />
            <span className="font-mono font-bold">{profile.currentStreak}</span>
          </button>

          {/* XP Badge */}
          <div 
            className="flex items-center gap-1 bg-emerald-50/90 border border-emerald-200/80 text-emerald-900 px-2 py-1 rounded-full text-xs font-semibold shadow-2xs"
            title={`${profile.xp} Total XP • ${currentRank.name}`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
            <span className="font-mono font-bold">{profile.xp}</span>
          </div>

          {/* Hearts Badge: Compact on mobile, 3 full hearts on larger screens */}
          <div 
            className="flex items-center gap-1 bg-rose-50/90 border border-rose-200/80 text-rose-800 px-2 py-1 rounded-full text-xs font-semibold shadow-2xs"
            title={`${profile.hearts} Hearts remaining`}
          >
            {/* Mobile compact view: 1 Heart icon + count */}
            <div className="flex items-center gap-1 sm:hidden">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="font-mono font-bold">{profile.hearts}</span>
            </div>

            {/* Desktop / tablet expanded view: 3 individual hearts */}
            <div className="hidden sm:flex items-center gap-0.5">
              {[...Array(profile.maxHearts)].map((_, idx) => (
                <Heart
                  key={idx}
                  className={`w-3.5 h-3.5 transition-colors ${
                    idx < profile.hearts
                      ? 'text-rose-500 fill-rose-500'
                      : 'text-gray-300 fill-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop/Tablet Extra Shortcut Buttons (hidden on narrow screens to prevent overflow) */}
          <div className="hidden md:flex items-center gap-1">
            {/* Awards Button */}
            <button
              onClick={() => {
                sound.playButtonClick();
                onOpenAchievements();
              }}
              className="p-1.5 rounded-full text-amber-800 hover:bg-amber-100/60 transition-colors cursor-pointer"
              title="Achievements & Awards"
              aria-label="Achievements & Awards"
            >
              <Award className="w-4 h-4 text-amber-600" />
            </button>

            {/* Tutorial Help Button */}
            <button
              onClick={() => {
                sound.playButtonClick();
                onOpenTutorial();
              }}
              className="p-1.5 rounded-full text-stone-600 hover:bg-stone-200/60 transition-colors cursor-pointer"
              title="How to Play Tutorial"
              aria-label="How to Play"
            >
              <HelpCircle className="w-4 h-4 text-stone-600" />
            </button>

            {/* Cloud Sync Quick Button */}
            <button
              onClick={() => {
                sound.playButtonClick();
                onOpenCloudSync();
              }}
              className="p-1.5 rounded-full text-emerald-800 hover:bg-emerald-100/60 transition-colors cursor-pointer"
              title="Cloud Save & Device Transfer"
              aria-label="Cloud Save & Device Transfer"
            >
              <Cloud className="w-4 h-4 text-[#2D6A4F]" />
            </button>
          </div>

          {/* Settings Button (Always visible on all screen sizes) */}
          <button
            onClick={() => {
              sound.playButtonClick();
              onOpenSettings();
            }}
            className="p-1.5 rounded-full text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer active:scale-95 shrink-0"
            title="Settings & Options"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-stone-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
