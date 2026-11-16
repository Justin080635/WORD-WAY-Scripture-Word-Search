import { Achievement, PlayerProfile } from '../types/game';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first Bible word-search lesson',
    icon: '🌱',
    category: 'journey',
    target: 1,
    rewardXP: 25,
  },
  {
    id: 'streak_3',
    title: 'Steadfast Walk',
    description: 'Maintain a 3-day daily Scripture streak',
    icon: '🔥',
    category: 'journey',
    target: 3,
    rewardXP: 50,
  },
  {
    id: 'streak_7',
    title: 'Sabbath Pilgrim',
    description: 'Maintain a 7-day daily Scripture streak',
    icon: '⚡',
    category: 'journey',
    target: 7,
    rewardXP: 100,
  },
  {
    id: 'bonus_1',
    title: 'Hidden Treasure',
    description: 'Discover your first hidden biblical bonus word in any level',
    icon: '💎',
    category: 'bonus',
    target: 1,
    rewardXP: 30,
  },
  {
    id: 'bonus_5',
    title: 'Scripture Archaeologist',
    description: 'Find 5 hidden biblical bonus words across your lessons',
    icon: '🏺',
    category: 'bonus',
    target: 5,
    rewardXP: 60,
  },
  {
    id: 'bonus_15',
    title: 'Golden Scribe',
    description: 'Uncover 15 hidden biblical bonus words',
    icon: '📜',
    category: 'bonus',
    target: 15,
    rewardXP: 120,
  },
  {
    id: 'flawless_lesson',
    title: 'Faultless Step',
    description: 'Complete any lesson with 100% accuracy and zero mistakes',
    icon: '⭐',
    category: 'mastery',
    target: 1,
    rewardXP: 40,
  },
  {
    id: 'speed_runner',
    title: 'Swift Runner',
    description: 'Finish a word search with at least 30 seconds left on the clock',
    icon: '⏱️',
    category: 'mastery',
    target: 1,
    rewardXP: 40,
  },
  {
    id: 'words_25',
    title: 'Word Collector',
    description: 'Find 25 total biblical target words',
    icon: '📖',
    category: 'scholar',
    target: 25,
    rewardXP: 50,
  },
  {
    id: 'words_75',
    title: 'Scripture Scholar',
    description: 'Find 75 total biblical target words',
    icon: '🎓',
    category: 'scholar',
    target: 75,
    rewardXP: 150,
  },
  {
    id: 'section_1_master',
    title: 'Foundation Pillar',
    description: 'Complete all 5 lessons in Foundations of Faith',
    icon: '🏛️',
    category: 'journey',
    target: 5,
    rewardXP: 80,
  },
  {
    id: 'section_3_master',
    title: 'Devoted Disciple',
    description: 'Complete all 5 lessons in Following Jesus',
    icon: '✝️',
    category: 'journey',
    target: 5,
    rewardXP: 80,
  },
  {
    id: 'kingdom_citizen',
    title: 'Kingdom Citizen',
    description: 'Complete all 5 lessons in Kingdom Life',
    icon: '👑',
    category: 'mastery',
    target: 5,
    rewardXP: 150,
  },
];

export function getAchievementProgress(achievement: Achievement, profile: PlayerProfile): { current: number; max: number; completed: boolean } {
  let current = 0;

  switch (achievement.id) {
    case 'first_steps':
      current = profile.completedLessonIds.length;
      break;
    case 'streak_3':
    case 'streak_7':
      current = Math.max(profile.currentStreak, profile.longestStreak);
      break;
    case 'bonus_1':
    case 'bonus_5':
    case 'bonus_15':
      current = profile.totalBonusWordsFound || 0;
      break;
    case 'flawless_lesson':
      current = Object.values(profile.lessonStats || {}).some(s => s.stars === 3) ? 1 : 0;
      break;
    case 'speed_runner':
      current = Object.values(profile.lessonStats || {}).some(s => s.bestTimeSeconds <= 60) ? 1 : 0;
      break;
    case 'words_25':
    case 'words_75':
      current = profile.completedLessonIds.length * 5; // approx 5-8 words per lesson
      break;
    case 'section_1_master':
      current = ['foundations-01', 'foundations-02', 'foundations-03', 'foundations-04', 'foundations-05'].filter(id =>
        profile.completedLessonIds.includes(id)
      ).length;
      break;
    case 'section_3_master':
      current = ['jesus-01', 'jesus-02', 'jesus-03', 'jesus-04', 'jesus-05'].filter(id =>
        profile.completedLessonIds.includes(id)
      ).length;
      break;
    case 'kingdom_citizen':
      current = ['kingdom-01', 'kingdom-02', 'kingdom-03', 'kingdom-04', 'kingdom-05'].filter(id =>
        profile.completedLessonIds.includes(id)
      ).length;
      break;
    default:
      current = 0;
  }

  const max = achievement.target;
  const completed = profile.unlockedAchievementIds?.includes(achievement.id) || current >= max;

  return { current: Math.min(current, max), max, completed };
}
