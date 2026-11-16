import { DailyQuest, PlayerProfile } from '../types/game';

const STORAGE_KEY = 'word_and_way_player_profile_v1';

export const RANKS = [
  { name: 'Seedling', minXP: 0, nextXP: 100, icon: '🌱', description: 'Planting the seeds of the Word' },
  { name: 'Seeker', minXP: 100, nextXP: 250, icon: '🔍', description: 'Searching the Scriptures daily' },
  { name: 'Disciple', minXP: 250, nextXP: 500, icon: '📜', description: 'Walking closely with the Master' },
  { name: 'Builder', minXP: 500, nextXP: 850, icon: '🧱', description: 'Building faith upon the Rock' },
  { name: 'Witness', minXP: 850, nextXP: 1300, icon: '🕊️', description: 'Bearing testimony of God’s grace' },
  { name: 'Messenger', minXP: 1300, nextXP: 1900, icon: '🎺', description: 'Proclaiming the Gospel of Peace' },
  { name: 'Kingdom Builder', minXP: 1900, nextXP: 3000, icon: '👑', description: 'Rooted firmly in the eternal Kingdom' },
];

export function getRankForXP(xp: number) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function generateSyncCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'WW-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += '-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function createDefaultProfile(): PlayerProfile {
  const today = getTodayDateString();
  return {
    name: 'Pilgrim',
    xp: 0,
    rank: 'Seedling',
    hearts: 3,
    maxHearts: 3,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
    completedLessonIds: [],
    lessonStats: {},
    totalBonusWordsFound: 0,
    unlockedAchievementIds: [],
    dailyQuest: {
      date: today,
      targetWords: 15,
      currentWords: 0,
      rewardXP: 50,
      claimed: false,
    },
    soundEnabled: true,
    syncCode: generateSyncCode(),
    lastSyncedAt: new Date().toISOString(),
    hasOnboarded: false,
    hasSeenTutorial: false,
  };
}

export function loadProfileFromLocalStorage(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultProfile();
    }
    const parsed = JSON.parse(raw);
    const today = getTodayDateString();

    // Verify daily quest reset
    if (!parsed.dailyQuest || parsed.dailyQuest.date !== today) {
      parsed.dailyQuest = {
        date: today,
        targetWords: 15,
        currentWords: 0,
        rewardXP: 50,
        claimed: false,
      };
    }

    if (!parsed.syncCode) {
      parsed.syncCode = generateSyncCode();
    }

    if (parsed.totalBonusWordsFound === undefined) {
      parsed.totalBonusWordsFound = 0;
    }

    if (!Array.isArray(parsed.unlockedAchievementIds)) {
      parsed.unlockedAchievementIds = [];
    }

    if (parsed.hasSeenTutorial === undefined) {
      parsed.hasSeenTutorial = false;
    }

    return parsed;
  } catch {
    return createDefaultProfile();
  }
}

export function saveProfileToLocalStorage(profile: PlayerProfile): void {
  try {
    profile.lastSyncedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

    // Also attempt background sync if cloud save endpoint is reachable
    syncWithCloudServer(profile).catch(() => {});
  } catch {
    // LocalStorage quota or access error
  }
}

/**
 * Cloud Sync API & Cross-Device Transfer
 */
export async function syncWithCloudServer(profile: PlayerProfile): Promise<boolean> {
  try {
    const res = await fetch('/api/sync/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        syncCode: profile.syncCode,
        data: profile,
      }),
    });
    return res.ok;
  } catch {
    // Endpoint unavailable in standalone static mode - graceful fallback
    return false;
  }
}

export async function fetchProfileFromCloud(syncCode: string): Promise<PlayerProfile | null> {
  const cleanCode = syncCode.trim().toUpperCase();
  try {
    const res = await fetch(`/api/sync/load/${encodeURIComponent(cleanCode)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.profile) {
        return data.profile as PlayerProfile;
      }
    }
  } catch {
    // Network or server offline
  }

  // Backup fallback: check if encoded as a valid exported JSON string or base64 token
  try {
    if (cleanCode.startsWith('{') || cleanCode.startsWith('eyJ')) {
      const jsonStr = cleanCode.startsWith('{') ? cleanCode : atob(cleanCode);
      const parsed = JSON.parse(jsonStr);
      if (parsed.xp !== undefined && Array.isArray(parsed.completedLessonIds)) {
        return parsed;
      }
    }
  } catch {
    // Invalid fallback
  }

  return null;
}

export function exportBackupCode(profile: PlayerProfile): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(profile))));
  } catch {
    return JSON.stringify(profile);
  }
}

export function importBackupCode(rawCode: string): PlayerProfile | null {
  try {
    let jsonStr = rawCode.trim();
    if (!jsonStr.startsWith('{')) {
      jsonStr = decodeURIComponent(escape(atob(jsonStr)));
    }
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed.xp === 'number' && Array.isArray(parsed.completedLessonIds)) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}
