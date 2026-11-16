import React from 'react';
import { useGameState } from './hooks/useGameState';
import { HeaderNav } from './components/HeaderNav';
import { HomeScreen } from './components/HomeScreen';
import { LessonIntroModal } from './components/LessonIntroModal';
import { GameScreen } from './components/GameScreen';
import { LessonCompleteModal } from './components/LessonCompleteModal';
import { ReviewScreen } from './components/ReviewScreen';
import { PauseModal } from './components/PauseModal';
import { GameOverModal } from './components/GameOverModal';
import { WelcomeModal } from './components/WelcomeModal';
import { TutorialModal } from './components/TutorialModal';
import { AchievementsModal } from './components/AchievementsModal';
import { StreakModal } from './components/StreakModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { SettingsModal } from './components/SettingsModal';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const {
    profile,
    setProfile,
    screen,
    setScreen,
    currentLesson,
    boardData,
    foundWords,
    bonusWordsFound,
    recentBonusNotice,
    alreadyFoundNotice,
    alreadyFoundRecords,
    selectedCells,
    timeLeft,
    hintsRemaining,
    hintCells,
    shakeError,
    selectionFailed,
    completionStats,
    activeTab,
    setActiveTab,
    showWelcome,
    setShowWelcome,
    showTutorial,
    setShowTutorial,
    showAchievements,
    setShowAchievements,
    showStreakModal,
    setShowStreakModal,
    showSettings,
    setShowSettings,
    showCloudSync,
    setShowCloudSync,
    nextLesson,
    // Actions
    openLessonIntro,
    startPlayingLesson,
    restartLesson,
    pauseGame,
    resumeGame,
    quitToHome,
    handlePointerStart,
    handlePointerMove,
    handlePointerEnd,
    useHint,
    claimAchievement,
    restoreHearts,
    resetAllProgress,
    applyImportedProfile,
    completeOnboarding,
    completeTutorial,
  } = useGameState();

  // 0. Dedicated Beautiful Landing Page
  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex flex-col font-sans selection:bg-[#2D6A4F]/20 selection:text-[#1E3F20] w-full max-w-full overflow-x-hidden box-border">
        <LandingPage
          profile={profile}
          onStartGame={() => setScreen('home')}
          onOpenStreak={() => setShowStreakModal(true)}
        />

        {/* Global Streak Modal if triggered from landing */}
        {showStreakModal && (
          <StreakModal
            profile={profile}
            onClose={() => setShowStreakModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex flex-col font-sans selection:bg-[#2D6A4F]/20 selection:text-[#1E3F20] w-full max-w-full overflow-x-hidden box-border">
      {/* Sticky Top Navigation */}
      <HeaderNav
        profile={profile}
        onOpenSettings={() => setShowSettings(true)}
        onOpenCloudSync={() => setShowCloudSync(true)}
        onOpenAchievements={() => setShowAchievements(true)}
        onOpenTutorial={() => setShowTutorial(true)}
        onOpenStreak={() => setShowStreakModal(true)}
        onGoHome={quitToHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 1. Home / Learning Path */}
        {screen === 'home' && (
          <HomeScreen
            profile={profile}
            onSelectLesson={openLessonIntro}
            onOpenSettings={() => setShowSettings(true)}
            onOpenCloudSync={() => setShowCloudSync(true)}
            onOpenAchievements={() => setShowAchievements(true)}
            onOpenTutorial={() => setShowTutorial(true)}
            onOpenStreak={() => setShowStreakModal(true)}
            onOpenLanding={() => setScreen('landing')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {/* 2. Lesson Intro */}
        {screen === 'lesson-intro' && currentLesson && (
          <LessonIntroModal
            lesson={currentLesson}
            onStart={startPlayingLesson}
            onBack={quitToHome}
          />
        )}

        {/* 3. Active Gameplay & Paused state */}
        {(screen === 'playing' || screen === 'paused') && currentLesson && boardData && (
          <>
            <GameScreen
              lesson={currentLesson}
              boardData={boardData}
              foundWords={foundWords}
              bonusWordsFound={bonusWordsFound}
              recentBonusNotice={recentBonusNotice}
              alreadyFoundNotice={alreadyFoundNotice}
              alreadyFoundRecords={alreadyFoundRecords}
              selectedCells={selectedCells}
              hintCells={hintCells}
              hintsRemaining={hintsRemaining}
              timeLeft={timeLeft}
              shakeError={shakeError}
              selectionFailed={selectionFailed}
              onPointerStart={handlePointerStart}
              onPointerMove={handlePointerMove}
              onPointerEnd={handlePointerEnd}
              onUseHint={useHint}
              onPause={pauseGame}
            />

            {screen === 'paused' && (
              <PauseModal
                onResume={resumeGame}
                onRestart={restartLesson}
                onQuit={quitToHome}
              />
            )}
          </>
        )}

        {/* 4. Lesson Complete Screen */}
        {screen === 'completed' && currentLesson && (
          <LessonCompleteModal
            lesson={currentLesson}
            stats={completionStats}
            onContinue={() => {
              if (nextLesson) {
                openLessonIntro(nextLesson.id);
              } else {
                setScreen('home');
              }
            }}
            onReviewWords={() => setScreen('review')}
          />
        )}

        {/* 5. Review Words Screen */}
        {screen === 'review' && currentLesson && (
          <ReviewScreen
            lesson={currentLesson}
            onPlayAgain={startPlayingLesson}
            onBackToPath={quitToHome}
          />
        )}

        {/* 6. Game Over Modal */}
        {screen === 'game-over' && (
          <GameOverModal
            heartsRemaining={profile.hearts}
            onTryAgain={() => {
              restoreHearts();
              restartLesson();
            }}
            onReviewWords={() => {
              restoreHearts();
              if (currentLesson) {
                setScreen('review');
              } else {
                setScreen('home');
              }
            }}
            onQuit={() => {
              restoreHearts();
              quitToHome();
            }}
          />
        )}
      </main>

      {/* Global Modals */}

      {/* Welcome / Onboarding Modal for First Time Users */}
      {showWelcome && (
        <WelcomeModal onComplete={completeOnboarding} />
      )}

      {/* Beginner's Tutorial Screen */}
      {showTutorial && (
        <TutorialModal
          soundEnabled={profile.soundEnabled}
          onComplete={completeTutorial}
          isFirstTime={!profile.hasSeenTutorial}
        />
      )}

      {/* Achievements & Awards Modal */}
      {showAchievements && (
        <AchievementsModal
          profile={profile}
          onClaimAchievement={claimAchievement}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {/* Streak Milestones & Celebration Modal */}
      {showStreakModal && (
        <StreakModal
          profile={profile}
          onClose={() => setShowStreakModal(false)}
        />
      )}

      {/* Cloud Sync & Cross-Device Transfer Modal */}
      {showCloudSync && (
        <CloudSyncModal
          profile={profile}
          onApplyProfile={applyImportedProfile}
          onClose={() => setShowCloudSync(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          profile={profile}
          onUpdateSound={enabled =>
            setProfile(prev => ({ ...prev, soundEnabled: enabled }))
          }
          onResetProgress={resetAllProgress}
          onOpenCloudSync={() => {
            setShowSettings(false);
            setShowCloudSync(true);
          }}
          onOpenTutorial={() => {
            setShowSettings(false);
            setShowTutorial(true);
          }}
          onOpenAchievements={() => {
            setShowSettings(false);
            setShowAchievements(true);
          }}
          onOpenLanding={() => {
            setShowSettings(false);
            setScreen('landing');
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
