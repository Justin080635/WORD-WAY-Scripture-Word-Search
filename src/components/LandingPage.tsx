import React, { useState, useRef } from 'react';
import { 
  Compass, 
  Flame, 
  Zap, 
  Heart, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Shield, 
  Award, 
  Check, 
  ArrowRight,
  Scroll,
  Feather,
  Crown,
  Volume2,
  RefreshCw,
  Star,
  MapPin
} from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { SECTIONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { triggerHaptic } from '../utils/haptics';

interface LandingPageProps {
  profile: PlayerProfile;
  onStartGame: () => void;
  onOpenStreak?: () => void;
}

const PILGRIM_RANKS = [
  { name: 'Seedling', xp: '0 XP', icon: '🌱', desc: 'The seed of faith planted in the heart.', perk: 'Access to Foundations Volume' },
  { name: 'Seeker', xp: '100 XP', icon: '🧭', desc: 'Walking diligently through the wilderness.', perk: 'Unlocks Bonus Word tracking' },
  { name: 'Disciple', xp: '300 XP', icon: '🕊️', desc: 'Attentive listener at the Master’s feet.', perk: 'Original Greek & Hebrew Lexicon' },
  { name: 'Builder', xp: '600 XP', icon: '🏛️', desc: 'Constructing spiritual habit upon the Rock.', perk: 'Extra Hint Recharge capability' },
  { name: 'Witness', xp: '1,000 XP', icon: '🕯️', desc: 'A radiant lamp set upon a holy hill.', perk: 'Sanctuary Master Milestone' },
  { name: 'Messenger', xp: '1,500 XP', icon: '📜', desc: 'Carrying the living Word to all nations.', perk: 'Advanced 8-Direction Boards' },
  { name: 'Kingdom Builder', xp: '2,500+ XP', icon: '👑', desc: 'Anchored forever in the heavenly Zion.', perk: 'Golden Pilgrim Crown & Way Sync' },
];

const SACRED_MARQUEE_WORDS = [
  { term: 'SHALOM', lang: 'Hebrew', meaning: 'Peace & Wholeness' },
  { term: 'AGAPE', lang: 'Greek', meaning: 'Unconditional Divine Love' },
  { term: 'LOGOS', lang: 'Greek', meaning: 'The Living Word' },
  { term: 'HESED', lang: 'Hebrew', meaning: 'Steadfast Covenant Mercy' },
  { term: 'RUACH', lang: 'Hebrew', meaning: 'Holy Spirit / Breath of Life' },
  { term: 'CHARIS', lang: 'Greek', meaning: 'Unmerited Transforming Grace' },
  { term: 'EMMANUEL', lang: 'Hebrew', meaning: 'God With Us' },
  { term: 'MARANATHA', lang: 'Aramaic', meaning: 'Our Lord Comes' },
  { term: 'HALLELUJAH', lang: 'Hebrew', meaning: 'Praise Yaweh' },
  { term: 'AMEN', lang: 'Hebrew', meaning: 'Truly & So Be It' },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  profile,
  onStartGame,
  onOpenStreak,
}) => {
  // Interactive mini-board state for hero
  const [miniFound, setMiniFound] = useState<string[]>([]);
  const [activeRankIdx, setActiveRankIdx] = useState<number>(1);
  const [dailyQuoteIdx, setDailyQuoteIdx] = useState<number>(0);

  // Carousel refs for smooth horizontal scrolling
  const volumesCarouselRef = useRef<HTMLDivElement>(null);
  const pillarsCarouselRef = useRef<HTMLDivElement>(null);
  const ranksCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    sound.playButtonClick();
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const miniGrid = [
    ['G', 'R', 'A', 'C', 'E'],
    ['F', 'A', 'I', 'T', 'H'],
    ['P', 'E', 'A', 'C', 'E'],
    ['H', 'O', 'P', 'E', 'S'],
  ];

  const handleMiniWordClick = (word: string) => {
    sound.playCorrectWord();
    triggerHaptic('celebrate');
    if (!miniFound.includes(word)) {
      setMiniFound(prev => [...prev, word]);
    }
  };

  const quotes = [
    { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
    { text: "Let the word of Christ dwell in you richly in all wisdom.", ref: "Colossians 3:16" },
    { text: "For the word of God is living and active, sharper than any two-edged sword.", ref: "Hebrews 4:12" },
    { text: "He has made everything beautiful in its time.", ref: "Ecclesiastes 3:11" },
  ];

  const hasProgress = profile.completedLessonIds.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex flex-col font-sans selection:bg-[#2D6A4F]/20 selection:text-[#1E3F20] overflow-x-hidden">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#1E3F20]/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3F20] to-[#2D6A4F] text-[#FAF7F2] flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5 text-[#E9B44C] animate-spin-slow" />
            </div>
            <div>
              <span className="font-brand font-bold text-base sm:text-lg leading-none text-[#1E3F20] tracking-wide block">
                WORD & WAY
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#6B7280] uppercase block">
                Scripture Word Search
              </span>
            </div>
          </div>

          {/* Quick Stats or Direct CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            {hasProgress && (
              <button
                onClick={onOpenStreak}
                className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-700 bg-white/90 border border-stone-200/90 px-3.5 py-1.5 rounded-full shadow-2xs hover:border-amber-400 transition-colors cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{profile.currentStreak} Day Streak</span>
                <span className="text-stone-300">·</span>
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                <span>{profile.xp} XP</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playButtonClick();
                triggerHaptic('medium');
                onStartGame();
              }}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#1E3F20] to-[#2D6A4F] hover:from-[#2D6A4F] hover:to-[#1E3F20] text-[#FAF7F2] font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>{hasProgress ? 'Continue Walk' : 'Play Free'}</span>
              <ArrowRight className="w-4 h-4 text-[#E9B44C]" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Floating Badges & Interactive Mini Grid */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-8 max-w-6xl mx-auto w-full text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#E9B44C]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Floating Sacred Word Chips (Decorative) */}
        <div className="hidden lg:block absolute top-16 left-8 animate-float">
          <div className="bg-white/90 backdrop-blur-xs border border-amber-200/90 rounded-2xl px-3.5 py-1.5 shadow-sm text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <span>🕊️</span>
            <span>SHALOM</span>
            <span className="text-[10px] text-amber-600 font-serif italic">(Peace)</span>
          </div>
        </div>

        <div className="hidden lg:block absolute top-24 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="bg-white/90 backdrop-blur-xs border border-emerald-200/90 rounded-2xl px-3.5 py-1.5 shadow-sm text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <span>🕯️</span>
            <span>LOGOS</span>
            <span className="text-[10px] text-emerald-700 font-serif italic">(Living Word)</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-12 left-12 animate-float" style={{ animationDelay: '2.5s' }}>
          <div className="bg-white/90 backdrop-blur-xs border border-rose-200/90 rounded-2xl px-3.5 py-1.5 shadow-sm text-xs font-bold text-rose-950 flex items-center gap-1.5">
            <span>❤️</span>
            <span>AGAPE</span>
            <span className="text-[10px] text-rose-700 font-serif italic">(Divine Love)</span>
          </div>
        </div>

        {/* Kicker Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#1E3F20]/15 text-[#1E3F20] text-xs font-extrabold shadow-2xs mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#E9B44C] fill-[#E9B44C]" />
          <span>The Contemplative Bible Word Search</span>
        </div>

        {/* Main Serif Headline */}
        <h1 className="font-serif-bible text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1E3F20] leading-[1.1] max-w-4xl mx-auto mb-5">
          Walk Through Scripture, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3F20] via-[#2D6A4F] to-[#BC6C25]">
            One Word at a Time.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Uncover the living words of Christ, explore original Greek & Hebrew roots, and build a lasting daily rhythm in the Word — peaceful, graceful, and 100% free forever.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => {
              sound.playButtonClick();
              triggerHaptic('celebrate');
              onStartGame();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1E3F20] via-[#2D6A4F] to-[#1E3F20] hover:scale-[1.02] text-[#FAF7F2] font-black text-base shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{hasProgress ? 'Resume Pilgrimage' : 'Begin Your Walk Free'}</span>
            <ArrowRight className="w-5 h-5 text-[#E9B44C] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              volumesCarouselRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-sm border border-stone-200/90 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Browse 7 Volumes</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-stone-500 mb-10">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>45+ Curated Biblical Lessons</span>
          </div>
          <span className="hidden sm:inline text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>Greek & Hebrew Etymology</span>
          </div>
          <span className="hidden sm:inline text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>No In-App Purchases or Ads</span>
          </div>
        </div>

        {/* Interactive Mini-Puzzle Demo */}
        <div className="max-w-md mx-auto bg-white/95 rounded-3xl p-5 sm:p-6 shadow-xl border border-stone-200/90 relative">
          <div className="flex items-center justify-between mb-3 text-left">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D6A4F] block">
                Interactive Grid Demo
              </span>
              <h3 className="font-bold text-sm text-stone-900">
                Tap the words below to illuminate the sanctuary grid
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300/80">
              {miniFound.length} / 4 Found
            </span>
          </div>

          {/* Mini Grid Letters */}
          <div className="grid grid-cols-5 gap-1.5 p-2 bg-stone-50 rounded-2xl border border-stone-200/70 mb-3.5">
            {miniGrid.map((row, rIdx) =>
              row.map((letter, cIdx) => {
                const isGrace = rIdx === 0 && miniFound.includes('GRACE');
                const isFaith = rIdx === 1 && miniFound.includes('FAITH');
                const isPeace = rIdx === 2 && miniFound.includes('PEACE');
                const isHope = rIdx === 3 && cIdx < 4 && miniFound.includes('HOPE');
                const isHighlighted = isGrace || isFaith || isPeace || isHope;

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm select-none transition-all ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-[#1E3F20] to-[#2D6A4F] text-[#FAF7F2] shadow-xs scale-105 ring-2 ring-[#E9B44C]/60'
                        : 'bg-white text-stone-800 border border-stone-200/60 hover:bg-stone-100'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

          {/* Interactive Word Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['GRACE', 'FAITH', 'PEACE', 'HOPE'].map((word) => {
              const isFound = miniFound.includes(word);
              return (
                <button
                  key={word}
                  onClick={() => handleMiniWordClick(word)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer select-none active:scale-95 ${
                    isFound
                      ? 'bg-emerald-100 text-emerald-950 line-through border border-emerald-300 scale-95 shadow-inner'
                      : 'bg-stone-100 hover:bg-amber-50 hover:border-amber-300 text-stone-700 border border-stone-200 shadow-2xs'
                  }`}
                >
                  {isFound ? `✓ ${word}` : word}
                </button>
              );
            })}
          </div>

          {miniFound.length === 4 ? (
            <div className="mt-3.5 pt-3 border-t border-amber-200/80 bg-amber-50/70 p-2.5 rounded-2xl text-left animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>All Demo Words Discovered! +40 XP Pilgrim Blessing</span>
              </div>
              <button
                onClick={() => {
                  sound.playButtonClick();
                  onStartGame();
                }}
                className="w-full mt-2 py-2 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-[#FAF7F2] font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Launch Full Learning Path</span>
                <ChevronRight className="w-4 h-4 text-[#E9B44C]" />
              </button>
            </div>
          ) : (
            <div className="mt-3 pt-2 text-center text-[11px] text-stone-400 font-medium">
              Tap words to test interactive sound and discovery!
            </div>
          )}
        </div>
      </section>

      {/* 3. Sacred Words Marquee Bar (Moving Horizontal Banner) */}
      <section className="w-full bg-[#1E3F20] text-[#FAF7F2] py-3 overflow-hidden border-y border-[#E9B44C]/30 relative">
        <div className="animate-marquee flex items-center gap-8 text-xs font-bold tracking-widest whitespace-nowrap">
          {SACRED_MARQUEE_WORDS.concat(SACRED_MARQUEE_WORDS).map((item, idx) => (
            <div key={`${item.term}-${idx}`} className="flex items-center gap-2 shrink-0">
              <span className="text-[#E9B44C]">{item.term}</span>
              <span className="text-white/40 text-[10px]">({item.lang} • {item.meaning})</span>
              <span className="text-[#E9B44C]/50 ml-4">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CAROUSEL 1: Seven Sacred Scripture Volumes (Horizontal Moving Carousel) */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2D6A4F]">
                The Scripture Volumes
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                7 Volumes · 45 Lessons
              </span>
            </div>
            <h2 className="font-serif-bible text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Journey Through the Living Canon
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
              Swipe horizontally to explore each sacred book, from Genesis to the New Jerusalem.
            </p>
          </div>

          {/* Carousel Left / Right Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(volumesCarouselRef, 'left')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll Volumes Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(volumesCarouselRef, 'right')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll Volumes Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          ref={volumesCarouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-2 sm:mx-0"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {SECTIONS.map((section, idx) => (
            <div
              key={section.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
              onClick={() => {
                sound.playButtonClick();
                onStartGame();
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    Volume {section.number}
                  </span>
                  <span className="text-xs font-bold text-stone-400">
                    {section.lessons.length} Lessons
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-[#1E3F20]/10 text-[#1E3F20] flex items-center justify-center font-bold text-base mb-3 group-hover:bg-[#1E3F20] group-hover:text-[#E9B44C] transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-lg text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                  {section.title}
                </h3>
                <p className="text-xs font-semibold text-stone-500 mb-2.5">
                  {section.subtitle}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                  {section.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-stone-400">
                  {section.lessons.reduce((acc, l) => acc + l.words.length, 0)} Words to Find
                </span>
                <span className="text-xs font-extrabold text-[#1E3F20] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Enter</span>
                  <ChevronRight className="w-4 h-4 text-[#E9B44C]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CAROUSEL 2: The Core Game Pillars (Horizontal Moving Carousel) */}
      <section className="py-14 sm:py-20 bg-stone-100/60 border-y border-stone-200/80 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2D6A4F] block mb-1.5">
                The Word & Way Pillars
              </span>
              <h2 className="font-serif-bible text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Crafted for Peaceful Contemplation
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Flick through the intentional mechanics that make Word & Way distinct.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel(pillarsCarouselRef, 'left')}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll Pillars Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel(pillarsCarouselRef, 'right')}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll Pillars Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Pillars Track */}
          <div
            ref={pillarsCarouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-2 sm:mx-0"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Pillar 1 */}
            <div className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Scroll className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  01. Hebrew & Greek Lexicon
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Tap any discovered word in the list to reveal its sacred etymology (*Agape*, *Hesed*, *Shalom*, *Ruach*) with biblical verses and context.
                </p>
              </div>
              <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl w-fit">
                Interactive Meaning Popups
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  02. Hidden Bonus Words
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Explore grids for secret biblical words like *PRAY*, *AMEN*, *GRACE*, and *ZION*. Discovered bonus words award +10 XP each and shine in your tray!
                </p>
              </div>
              <div className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-xl w-fit">
                +10 XP Bonus Tray Tracking
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  03. Grace-Filled Sanctuary
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Wrong swipes are never punished with lost hearts. Re-highlighting words acknowledges them gently. If time runs out, hearts refresh freely!
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-xl w-fit">
                Zero Punitive Paywalls
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 text-amber-600 fill-amber-500 animate-pulse" />
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">
                  04. Daily Sacred Flame
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Keep your daily spiritual habit ablaze. Track your 7-day walk, earn First Walk bonuses, and complete daily 15-word quests.
                </p>
              </div>
              <div className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-xl w-fit">
                Daily Quest & Streak Perks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAROUSEL 3: The 7 Pilgrim Ranks (Horizontal Moving Carousel & Interactive) */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2D6A4F] block mb-1.5">
              The Pilgrim's Ascent
            </span>
            <h2 className="font-serif-bible text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Seven Ranks of Wisdom & Energy
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Earn XP by finding words and completing boards to elevate your pilgrim standing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(ranksCarouselRef, 'left')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll Ranks Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(ranksCarouselRef, 'right')}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll Ranks Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Ranks Track */}
        <div
          ref={ranksCarouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-2 sm:mx-0"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {PILGRIM_RANKS.map((rank, idx) => {
            const isSelected = activeRankIdx === idx;
            return (
              <div
                key={rank.name}
                onClick={() => {
                  sound.playButtonClick();
                  setActiveRankIdx(idx);
                }}
                className={`w-[240px] sm:w-[260px] shrink-0 snap-start rounded-3xl p-5 border transition-all text-left cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#1E3F20] to-[#2D6A4F] text-[#FAF7F2] shadow-lg border-[#E9B44C] scale-[1.02]'
                    : 'bg-white text-stone-800 border-stone-200/90 shadow-2xs hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{rank.icon}</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                        isSelected
                          ? 'bg-[#E9B44C] text-[#1E3F20]'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {rank.xp}
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-base mb-1 ${
                      isSelected ? 'text-[#FAF7F2]' : 'text-stone-900'
                    }`}
                  >
                    Rank {idx + 1}: {rank.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-3 ${
                      isSelected ? 'text-white/80' : 'text-stone-500'
                    }`}
                  >
                    {rank.desc}
                  </p>
                </div>

                <div
                  className={`pt-2.5 border-t text-[11px] font-bold ${
                    isSelected
                      ? 'border-white/20 text-[#E9B44C]'
                      : 'border-stone-100 text-emerald-800'
                  }`}
                >
                  ✦ {rank.perk}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Interactive Daily Scripture Reflection Banner */}
      <section className="py-16 bg-[#1E3F20] text-[#FAF7F2] px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E9B44C_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Feather className="w-5 h-5 text-[#E9B44C]" />
          </div>

          <blockquote className="font-serif-bible text-2xl sm:text-3xl italic leading-relaxed text-[#FAF7F2] mb-3 transition-all duration-300">
            "{quotes[dailyQuoteIdx].text}"
          </blockquote>
          <cite className="not-italic text-xs font-bold tracking-widest text-[#E9B44C] uppercase block mb-6">
            — {quotes[dailyQuoteIdx].ref}
          </cite>

          {/* Quick Quote Changer */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => {
                sound.playButtonClick();
                setDailyQuoteIdx((prev) => (prev + 1) % quotes.length);
              }}
              className="text-[11px] text-white/80 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-[#E9B44C]" />
              <span>Inspire another verse</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playButtonClick();
              triggerHaptic('celebrate');
              onStartGame();
            }}
            className="px-8 py-4 rounded-2xl bg-[#E9B44C] hover:bg-[#d69e37] text-[#1E3F20] font-black text-base shadow-xl transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Enter the Living Sanctuary Now</span>
            <ArrowRight className="w-5 h-5 text-[#1E3F20]" />
          </button>
        </div>
      </section>

      {/* 8. Editorial Footer */}
      <footer className="py-8 bg-[#FAF7F2] border-t border-[#1E3F20]/10 px-4 sm:px-8 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1E3F20]" />
            <span className="font-bold text-stone-900">WORD & WAY</span>
            <span>·</span>
            <span>The Contemplative Scripture Word Search</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playButtonClick();
                onStartGame();
              }}
              className="text-stone-700 hover:text-stone-900 font-bold cursor-pointer"
            >
              Play Game
            </button>
            <span>·</span>
            <span>Cross-Device Cloud Sync</span>
            <span>·</span>
            <span>100% Free Forever</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
