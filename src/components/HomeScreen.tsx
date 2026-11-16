import React, { useMemo } from 'react';
import { 
  Check, 
  Lock, 
  Play, 
  Star, 
  Flame, 
  Zap, 
  BookOpen, 
  Award,
  Sparkles,
  Heart,
  Compass,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { PlayerProfile, Section } from '../types/game';
import { SECTIONS, ALL_LESSONS } from '../data/lessonsData';
import { getRankForXP, getTodayDateString } from '../utils/cloudSyncService';
import { triggerHaptic } from '../utils/haptics';
import { sound } from '../utils/soundEffects';

interface HomeScreenProps {
  profile: PlayerProfile;
  onSelectLesson: (lessonId: string) => void;
  onOpenSettings: () => void;
  onOpenCloudSync: () => void;
  onOpenAchievements: () => void;
  onOpenTutorial: () => void;
  onOpenStreak: () => void;
  onOpenLanding?: () => void;
  activeTab: 'path' | 'review' | 'quest';
  setActiveTab: (tab: 'path' | 'review' | 'quest') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  onSelectLesson,
  onOpenCloudSync,
  onOpenAchievements,
  onOpenTutorial,
  onOpenStreak,
  onOpenLanding,
  activeTab,
  setActiveTab,
}) => {
  const currentRank = getRankForXP(profile.xp);
  const nextRankMin = currentRank.nextXP;
  const prevRankMin = currentRank.minXP;
  const xpInRange = Math.max(0, profile.xp - prevRankMin);
  const xpNeededInRange = Math.max(1, nextRankMin - prevRankMin);
  const rankPercent = Math.min(100, Math.round((xpInRange / xpNeededInRange) * 100));

  // Determine the next playable lesson
  const currentPlayableLesson = useMemo(() => {
    for (const lesson of ALL_LESSONS) {
      if (!profile.completedLessonIds.includes(lesson.id)) {
        return lesson;
      }
    }
    return ALL_LESSONS[ALL_LESSONS.length - 1];
  }, [profile.completedLessonIds]);

  // Encouraging streak copy
  const streakMessage = useMemo(() => {
    if (profile.currentStreak === 0) return 'Begin your daily Scripture journey.';
    if (profile.currentStreak === 1) return 'Your streak is alive! Walk faithfully.';
    if (profile.currentStreak < 4) return 'Keep walking. One more day in the Word.';
    if (profile.currentStreak < 7) return 'Wonderful consistency in the Scriptures.';
    return 'A steadfast disciple walking the Way!';
  }, [profile.currentStreak]);

  // Section icon mapping
  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Heart': return <Heart className="w-4 h-4 text-rose-500" />;
      case 'Compass': return <Compass className="w-4 h-4 text-blue-500" />;
      case 'Flame': return <Flame className="w-4 h-4 text-amber-600" />;
      case 'Crown': return <Award className="w-4 h-4 text-yellow-500" />;
      default: return <BookOpen className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Pilgrim Header Greeting */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#1E3F20]/10 shadow-xs mb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
              <span>{currentRank.icon}</span>
              <span>{currentRank.name} Rank</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
              Grace & Peace, {profile.name}
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playButtonClick();
              onOpenCloudSync();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-emerald-50 text-[#1E3F20] text-xs font-semibold border border-[#1E3F20]/15 transition-colors cursor-pointer"
          >
            <span>Cloud Sync</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </button>
        </div>

        {/* Rank XP Progress */}
        <div className="w-full">
          <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1">
            <span>{profile.xp} XP</span>
            <span className="text-stone-400">{nextRankMin} XP next rank</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-[#E9B44C] rounded-full transition-all duration-500"
              style={{ width: `${rankPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Celebratory Streak Card */}
        <div
          onClick={() => {
            sound.playButtonClick();
            triggerHaptic('medium');
            onOpenStreak();
          }}
          className={`mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs cursor-pointer select-none rounded-2xl p-2.5 -mx-1 transition-all active:scale-[0.98] ${
            profile.currentStreak > 0
              ? 'bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200/60 shadow-2xs'
              : 'hover:bg-stone-50 border border-transparent'
          }`}
          title="Tap to view streak milestones & weekly walk"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              profile.currentStreak >= 3
                ? 'bg-amber-100 text-amber-600 animate-flame shadow-xs'
                : profile.currentStreak > 0
                ? 'bg-amber-50 text-amber-500 animate-pulse'
                : 'bg-stone-100 text-stone-400'
            }`}>
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 truncate">
                <span>{profile.currentStreak} Day Streak</span>
                {profile.lastPlayedDate === getTodayDateString() && profile.currentStreak > 0 ? (
                  <span className="text-[10px] font-black tracking-wide text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs animate-pulse">
                    <Sparkles className="w-2.5 h-2.5 fill-amber-700 text-amber-700" />
                    <span>Active Today</span>
                  </span>
                ) : (
                  profile.currentStreak >= 3 && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-md">
                      🔥 Milestone
                    </span>
                  )
                )}
              </div>
              <span className="text-[11px] text-stone-500 italic truncate block">{streakMessage}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 shrink-0 ml-2">
            <span className="hidden sm:inline">Milestones</span>
            <ChevronRight className="w-4 h-4 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Quick Action Badges: Awards & Tutorial */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Awards & Bonus Words Card */}
        <button
          onClick={() => {
            sound.playButtonClick();
            onOpenAchievements();
          }}
          className="bg-white hover:bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 shadow-2xs text-left transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base group-hover:scale-105 transition-transform">
              🏆
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                <span>Awards</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
              <div className="text-xs font-extrabold text-stone-900">
                {profile.totalBonusWordsFound || 0} Bonus Words
              </div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Beginner's Tutorial Card */}
        <button
          onClick={() => {
            sound.playButtonClick();
            onOpenTutorial();
          }}
          className="bg-white hover:bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200/80 shadow-2xs text-left transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base group-hover:scale-105 transition-transform">
              📖
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Beginner's Guide
              </div>
              <div className="text-xs font-extrabold text-stone-900">
                How to Play
              </div>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-200/60 p-1 rounded-2xl mb-4 text-xs font-bold">
        <button
          onClick={() => {
            sound.playButtonClick();
            setActiveTab('path');
          }}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'path'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Learning Path
        </button>

        <button
          onClick={() => {
            sound.playButtonClick();
            setActiveTab('quest');
          }}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'quest'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <span>Daily Quest</span>
          {profile.dailyQuest.currentWords >= profile.dailyQuest.targetWords && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>

        <button
          onClick={() => {
            sound.playButtonClick();
            setActiveTab('review');
          }}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'review'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Scripture Glossary
        </button>
      </div>

      {/* TAB 1: LEARNING PATH */}
      {activeTab === 'path' && (
        <div className="space-y-6">
          {/* Quick Continue Card */}
          {currentPlayableLesson && (
            <div className="bg-gradient-to-br from-[#1E3F20] to-[#2D6A4F] text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E9B44C] block mb-1">
                  Continue Your Journey
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  {currentPlayableLesson.title}
                </h3>
                <p className="text-xs text-emerald-100 font-serif-bible italic mb-4">
                  "{currentPlayableLesson.subtitle}" — {currentPlayableLesson.sectionTitle}
                </p>

                <button
                  onClick={() => {
                    sound.playButtonClick();
                    onSelectLesson(currentPlayableLesson.id);
                  }}
                  className="py-3 px-5 rounded-2xl bg-[#E9B44C] hover:bg-[#D4AF37] text-stone-950 font-extrabold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>START LESSON {currentPlayableLesson.lessonNumber}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Decorative background shape */}
              <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
            </div>
          )}

          {/* Vertical Sections Progression */}
          {SECTIONS.map((section: Section) => {
            const sectionCompletedLessons = section.lessons.filter(l =>
              profile.completedLessonIds.includes(l.id)
            ).length;
            const isSectionCompleted = sectionCompletedLessons === section.lessons.length;

            return (
              <div
                key={section.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#1E3F20]/15 shadow-xs"
              >
                {/* Section Header */}
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#1E3F20]/15 flex items-center justify-center">
                      {getSectionIcon(section.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] block">
                        Section {section.number}
                      </span>
                      <h3 className="font-extrabold text-base text-stone-900 leading-tight">
                        {section.title}
                      </h3>
                      <p className="text-xs text-stone-500">{section.subtitle}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {sectionCompletedLessons} / {section.lessons.length}
                  </span>
                </div>

                {/* Lesson Nodes List */}
                <div className="space-y-2.5">
                  {section.lessons.map((lesson, idx) => {
                    const isCompleted = profile.completedLessonIds.includes(lesson.id);
                    const isCurrent = currentPlayableLesson?.id === lesson.id;
                    const isLocked = !isCompleted && !isCurrent;
                    const stats = profile.lessonStats[lesson.id];

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          if (!isLocked) {
                            sound.playButtonClick();
                            onSelectLesson(lesson.id);
                          }
                        }}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20 cursor-pointer active:scale-99'
                            : isCompleted
                            ? 'bg-stone-50/80 border-stone-200/80 hover:bg-white hover:border-emerald-300 cursor-pointer'
                            : 'bg-stone-50/40 border-stone-200/40 opacity-70 cursor-not-allowed'
                        }`}
                      >
                        {/* Status Icon */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isCompleted
                                ? 'bg-[#1E3F20] text-white'
                                : isCurrent
                                ? 'bg-emerald-600 text-white animate-pulse'
                                : 'bg-stone-200 text-stone-400'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-4 h-4 stroke-[3]" />
                            ) : isCurrent ? (
                              <Play className="w-4 h-4 fill-white" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-stone-400">
                                #{idx + 1}
                              </span>
                              <h4 className="font-bold text-stone-900 text-sm truncate">
                                {lesson.title}
                              </h4>
                            </div>
                            <p className="text-xs text-stone-500 font-serif-bible italic truncate">
                              "{lesson.subtitle}"
                            </p>
                          </div>
                        </div>

                        {/* Right side info */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isCompleted && stats && (
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {[...Array(stats.stars || 3)].map((_, sIdx) => (
                                <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400" />
                              ))}
                            </div>
                          )}

                          {isCurrent && (
                            <span className="px-3 py-1 rounded-xl bg-[#1E3F20] text-amber-300 font-bold text-xs shadow-2xs">
                              PLAY
                            </span>
                          )}

                          {isLocked && (
                            <span className="text-xs text-stone-400 font-medium">
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: DAILY QUEST */}
      {activeTab === 'quest' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#1E3F20]/15 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                Today's Daily Quest
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Resets daily at midnight
              </span>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Find 15 Biblical Words
            </h3>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Explore lessons today to discover at least 15 target words across the puzzles.
            </p>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 mb-5">
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1.5">
                <span>Progress: {profile.dailyQuest.currentWords} / {profile.dailyQuest.targetWords} Words</span>
                <span className="text-emerald-700">
                  {Math.round((profile.dailyQuest.currentWords / profile.dailyQuest.targetWords) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (profile.dailyQuest.currentWords / profile.dailyQuest.targetWords) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-stone-800 text-sm font-bold">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Reward: +{profile.dailyQuest.rewardXP} XP</span>
              </div>

              {profile.dailyQuest.claimed ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>Claimed</span>
                </span>
              ) : (
                <span className="text-xs text-stone-500 font-medium">
                  {profile.dailyQuest.currentWords >= profile.dailyQuest.targetWords
                    ? 'Completed! XP awarded.'
                    : `${profile.dailyQuest.targetWords - profile.dailyQuest.currentWords} words left`}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCRIPTURE GLOSSARY */}
      {activeTab === 'review' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#1E3F20]/15 shadow-xs mb-3">
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Scripture Words Unlocked ({profile.completedLessonIds.length * 5}+)
            </h3>
            <p className="text-xs text-stone-500">
              Review words, Greek/Hebrew meanings, and Bible verses you have encountered so far.
            </p>
          </div>

          <div className="space-y-2.5">
            {ALL_LESSONS.filter(l => profile.completedLessonIds.includes(l.id)).map(lesson => (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className="bg-white rounded-2xl p-4 border border-stone-200/80 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-stone-900 text-sm">
                    {lesson.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#2D6A4F]">
                    {lesson.scripture.reference}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {lesson.words.map(w => (
                    <span
                      key={w.word}
                      className="px-2 py-0.5 bg-stone-100 text-stone-700 text-xs font-semibold rounded-md"
                    >
                      {w.word}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {profile.completedLessonIds.length === 0 && (
              <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-stone-500">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <h4 className="font-bold text-stone-700 text-sm mb-1">
                  No lessons completed yet
                </h4>
                <p className="text-xs text-stone-500">
                  Complete your first lesson on the Learning Path to unlock words and references here!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiet Footer with Link to Landing Page */}
      {onOpenLanding && (
        <div className="mt-8 pt-6 pb-4 border-t border-stone-200/50 text-center text-xs text-stone-500">
          <span>WORD & WAY · Contemplative Scripture Word Search · </span>
          <button
            onClick={() => {
              sound.playButtonClick();
              onOpenLanding();
            }}
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 cursor-pointer transition-colors"
          >
            About & Story
          </button>
        </div>
      )}
    </div>
  );
};
