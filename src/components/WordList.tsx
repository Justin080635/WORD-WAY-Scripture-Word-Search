import React, { useState } from 'react';
import { Check, Info, X, Sparkles } from 'lucide-react';
import { ScriptureWord, FoundWordData } from '../types/game';
import { WORD_HIGHLIGHT_COLORS } from '../utils/wordSearchEngine';
import { sound } from '../utils/soundEffects';

interface WordListProps {
  words: ScriptureWord[];
  foundWords: FoundWordData[];
  bonusWordsFound?: string[];
  highlightedFoundWord?: string | null;
}

export const WordList: React.FC<WordListProps> = ({ 
  words, 
  foundWords, 
  bonusWordsFound = [],
  highlightedFoundWord = null
}) => {
  const [activeWordInfo, setActiveWordInfo] = useState<ScriptureWord | null>(null);

  const isWordFound = (wordStr: string) => {
    return foundWords.some(f => f.word === wordStr);
  };

  const getWordColorStyle = (wordStr: string) => {
    const foundItem = foundWords.find(f => f.word === wordStr);
    if (!foundItem) return null;
    return WORD_HIGHLIGHT_COLORS[foundItem.colorIndex % WORD_HIGHLIGHT_COLORS.length];
  };

  return (
    <div className="w-full max-w-[440px] mx-auto px-1 py-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3F20]/75 flex items-center gap-1.5">
          <span>Find these words</span>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full font-mono">
            {foundWords.length} / {words.length}
          </span>
        </h3>
        <span className="text-[10px] text-stone-500 font-medium">
          Tap word for meaning
        </span>
      </div>

      {/* Target Word Chips */}
      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
        {words.map((item) => {
          const found = isWordFound(item.word);
          const colorTheme = getWordColorStyle(item.word);
          const isHighlighted = highlightedFoundWord === item.word;

          return (
            <button
              key={item.word}
              onClick={() => {
                sound.playButtonClick();
                setActiveWordInfo(item);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all border cursor-pointer active:scale-95 select-none ${
                found
                  ? `${colorTheme?.bg || 'bg-emerald-50'} ${colorTheme?.text || 'text-emerald-900'} ${colorTheme?.border || 'border-emerald-300'} line-through opacity-90 shadow-2xs`
                  : 'bg-white text-stone-700 border-stone-200/80 hover:border-emerald-600/40 hover:bg-stone-50 shadow-2xs'
              } ${isHighlighted ? 'ring-2 ring-blue-500 animate-pulse scale-105' : ''}`}
            >
              {found ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
              )}
              <span>{item.word}</span>
            </button>
          );
        })}
      </div>

      {/* Bonus Words Found Tray */}
      {bonusWordsFound && bonusWordsFound.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-amber-200/60 text-left animate-fadeIn">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1">
              <span>💎 Bonus Words Found</span>
              <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full font-mono text-[10px]">
                +{bonusWordsFound.length * 10} XP
              </span>
            </span>
            <span className="text-[10px] text-amber-700/90 font-bold">
              Recorded
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {bonusWordsFound.map(bw => {
              const isHighlighted = highlightedFoundWord === bw;
              return (
                <div
                  key={bw}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300/90 text-amber-950 shadow-2xs transition-all ${
                    isHighlighted ? 'ring-2 ring-amber-500 scale-105 animate-bounce' : ''
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>{bw}</span>
                  <span className="text-[10px] text-amber-700 font-bold ml-0.5">(+10 XP)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Scripture Word Definition Popover Modal */}
      {activeWordInfo && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-stone-200 relative text-left">
            <button
              onClick={() => setActiveWordInfo(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-[#1E3F20] text-[#FAF7F2] rounded-lg font-bold text-xs tracking-wider">
                {activeWordInfo.word}
              </span>
              {activeWordInfo.hebrewOrGreek && (
                <span className="text-xs text-stone-500 font-serif-bible italic">
                  {activeWordInfo.hebrewOrGreek}
                </span>
              )}
            </div>

            <div className="space-y-3 mt-3">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Definition
                </span>
                <p className="text-xs sm:text-sm text-stone-700 font-medium">
                  {activeWordInfo.definition}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Scripture Context
                </span>
                <p className="text-xs sm:text-sm text-emerald-800 font-semibold font-serif-bible italic">
                  "{activeWordInfo.explanation}"
                </p>
                <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                  — {activeWordInfo.reference}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveWordInfo(null)}
              className="w-full mt-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
            >
              Continue Playing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
