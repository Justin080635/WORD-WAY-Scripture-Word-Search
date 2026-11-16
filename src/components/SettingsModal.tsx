import React, { useState } from 'react';
import { Volume2, VolumeX, Cloud, RotateCcw, X, Info, Award, HelpCircle } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/soundEffects';

interface SettingsModalProps {
  profile: PlayerProfile;
  onUpdateSound: (enabled: boolean) => void;
  onResetProgress: () => void;
  onOpenCloudSync: () => void;
  onOpenTutorial: () => void;
  onOpenAchievements: () => void;
  onOpenLanding?: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  onUpdateSound,
  onResetProgress,
  onOpenCloudSync,
  onOpenTutorial,
  onOpenAchievements,
  onOpenLanding,
  onClose,
}) => {
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-extrabold text-stone-900 mb-1">
          Settings & Options
        </h3>
        <p className="text-xs text-stone-500 mb-5">
          Configure preferences and manage your progress.
        </p>

        <div className="space-y-3 mb-6">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700">
                {profile.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Sound Effects</div>
                <div className="text-[11px] text-stone-500">Harmonic chimes & fanfares</div>
              </div>
            </div>

            <button
              onClick={() => {
                const nextVal = !profile.soundEnabled;
                onUpdateSound(nextVal);
                if (nextVal) {
                  sound.setEnabled(true);
                  sound.playCorrectWord();
                }
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                profile.soundEnabled ? 'bg-[#1E3F20]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  profile.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Awards & Achievements Button */}
          <button
            onClick={() => {
              sound.playButtonClick();
              onClose();
              onOpenAchievements();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-amber-600">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Awards & Achievements</div>
                <div className="text-[11px] text-stone-500">{profile.totalBonusWordsFound || 0} bonus words found</div>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-lg">
              View
            </span>
          </button>

          {/* Beginner's Tutorial Button */}
          <button
            onClick={() => {
              sound.playButtonClick();
              onClose();
              onOpenTutorial();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Beginner's Tutorial</div>
                <div className="text-[11px] text-stone-500">How to play & mechanics guide</div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-lg">
              Open
            </span>
          </button>

          {/* Cloud Sync Button */}
          <button
            onClick={() => {
              sound.playButtonClick();
              onClose();
              onOpenCloudSync();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700">
                <Cloud className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Cloud Save & Sync</div>
                <div className="text-[11px] text-stone-500">Transfer progress across devices</div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#1E3F20] bg-emerald-100/60 px-2 py-0.5 rounded-lg">
              Manage
            </span>
          </button>

          {/* View Story & Landing Page Button */}
          {onOpenLanding && (
            <button
              onClick={() => {
                sound.playButtonClick();
                onClose();
                onOpenLanding();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/60 border border-amber-200/80 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-amber-700">
                  <Info className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-950">About Word & Way</div>
                  <div className="text-[11px] text-amber-700">View story, roadmap & landing page</div>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-lg">
                View
              </span>
            </button>
          )}
        </div>

        {/* Reset Progress Section */}
        <div className="pt-4 border-t border-stone-100 mb-5">
          {!confirmReset ? (
            <button
              onClick={() => {
                sound.playButtonClick();
                setConfirmReset(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Progress</span>
            </button>
          ) : (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-left animate-fadeIn">
              <div className="text-xs font-bold text-rose-900 mb-1">
                Are you sure?
              </div>
              <p className="text-[11px] text-rose-700 mb-3">
                This will reset your XP, streaks, completed lessons, and words found back to zero.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* About Info */}
        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#1E3F20]/10 text-left text-xs text-stone-600 space-y-1">
          <div className="font-bold text-[#1E3F20] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Word & Way v1.0</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            "Find the Word. Walk the Way." All Scripture citations are verified biblical texts designed to foster reflection and vocabulary learning.
          </p>
        </div>
      </div>
    </div>
  );
};
