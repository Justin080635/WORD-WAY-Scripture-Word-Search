/**
 * Mobile haptic feedback utility using the Navigator Vibration API
 */
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'celebrate' = 'light') {
  if (typeof window === 'undefined' || !navigator || !navigator.vibrate) return;

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(8);
        break;
      case 'medium':
        navigator.vibrate(18);
        break;
      case 'success':
        navigator.vibrate([15, 40, 25]);
        break;
      case 'celebrate':
        navigator.vibrate([30, 50, 40, 60, 60]);
        break;
    }
  } catch {
    // Unsupported or blocked by browser policy
  }
}
