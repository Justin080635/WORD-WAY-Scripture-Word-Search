import React, { useRef, useCallback, useEffect } from 'react';
import { BoardData, FoundWordData, GridCoordinate } from '../types/game';
import { WORD_HIGHLIGHT_COLORS, isCellInList } from '../utils/wordSearchEngine';
import { triggerHaptic } from '../utils/haptics';

interface WordGridProps {
  boardData: BoardData;
  foundWords: FoundWordData[];
  selectedCells: GridCoordinate[];
  hintCells: GridCoordinate[];
  shakeError: boolean;
  selectionFailed: boolean;
  onPointerStart: (coord: GridCoordinate) => void;
  onPointerMove: (coord: GridCoordinate) => void;
  onPointerEnd: () => void;
}

export const WordGrid: React.FC<WordGridProps> = ({
  boardData,
  foundWords,
  selectedCells,
  hintCells,
  shakeError,
  selectionFailed,
  onPointerStart,
  onPointerMove,
  onPointerEnd,
}) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const lastCellRef = useRef<GridCoordinate | null>(null);

  // Helper to map screen (clientX, clientY) to grid coordinate (row, col)
  const getCellFromPoint = useCallback(
    (clientX: number, clientY: number): GridCoordinate | null => {
      if (!gridContainerRef.current) return null;
      const rect = gridContainerRef.current.getBoundingClientRect();

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }

      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      const cellWidth = rect.width / boardData.size;
      const cellHeight = rect.height / boardData.size;

      const col = Math.floor(relX / cellWidth);
      const row = Math.floor(relY / cellHeight);

      if (row >= 0 && row < boardData.size && col >= 0 && col < boardData.size) {
        return { row, col };
      }
      return null;
    },
    [boardData.size]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    e.preventDefault();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) {
      isPointerDownRef.current = true;
      lastCellRef.current = cell;
      triggerHaptic('light');
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // ignore pointer capture errors if not supported
      }
      onPointerStart(cell);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    e.preventDefault();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) {
      if (
        !lastCellRef.current ||
        lastCellRef.current.row !== cell.row ||
        lastCellRef.current.col !== cell.col
      ) {
        lastCellRef.current = cell;
        triggerHaptic('light');
      }
      onPointerMove(cell);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    onPointerEnd();
  };

  const handlePointerCancel = () => {
    if (isPointerDownRef.current) {
      isPointerDownRef.current = false;
      onPointerEnd();
    }
  };

  // Global window pointerup fallback to guarantee drag never gets stuck if pointer leaves window
  useEffect(() => {
    const handleGlobalUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        onPointerEnd();
      }
    };
    window.addEventListener('pointerup', handleGlobalUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalUp);
    };
  }, [onPointerEnd]);

  // Determine cell styles
  const getCellRenderingInfo = (row: number, col: number) => {
    const coord: GridCoordinate = { row, col };
    const letter = boardData.grid[row][col];

    // Check if cell is in currently selected path
    const isSelected = isCellInList(coord, selectedCells);
    const isSelectionHead = selectedCells.length > 0 && selectedCells[selectedCells.length - 1].row === row && selectedCells[selectedCells.length - 1].col === col;
    const isSelectionStart = selectedCells.length > 0 && selectedCells[0].row === row && selectedCells[0].col === col;

    // Check if part of already found words
    let foundColorIndex: number | null = null;
    for (const f of foundWords) {
      if (isCellInList(coord, f.cells)) {
        foundColorIndex = f.colorIndex;
        break;
      }
    }

    // Check if cell is an active hint
    const isHint = isCellInList(coord, hintCells);

    return {
      letter,
      isSelected,
      isSelectionHead,
      isSelectionStart,
      foundColorIndex,
      isHint,
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-auto">
      <div
        ref={gridContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{
          touchAction: 'none',
          gridTemplateColumns: `repeat(${boardData.size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${boardData.size}, minmax(0, 1fr))`,
        }}
        className={`grid select-none prevent-select p-2 sm:p-3 rounded-2xl bg-white/95 border-2 shadow-md w-full max-w-[420px] aspect-square transition-all duration-200 ${
          shakeError
            ? 'animate-shake border-rose-400 bg-rose-50/50'
            : 'border-[#1E3F20]/15'
        }`}
      >
        {boardData.grid.map((rowArr, r) =>
          rowArr.map((_, c) => {
            const {
              letter,
              isSelected,
              isSelectionHead,
              isSelectionStart,
              foundColorIndex,
              isHint,
            } = getCellRenderingInfo(r, c);

            let cellClass = 'bg-stone-50/80 text-stone-800 border-stone-200/50';

            // Found words styling
            if (foundColorIndex !== null) {
              const theme = WORD_HIGHLIGHT_COLORS[foundColorIndex % WORD_HIGHLIGHT_COLORS.length];
              cellClass = `${theme.bg} ${theme.text} font-bold border-transparent`;
            }

            // Current drag selection styling
            if (isSelected) {
              if (selectionFailed) {
                cellClass = 'bg-rose-500 text-white font-bold scale-95 shadow-sm';
              } else {
                cellClass = 'bg-[#1E3F20] text-amber-200 font-bold scale-102 shadow-sm ring-2 ring-[#E9B44C]/80';
              }
            }

            // Hint highlight styling (golden pulsing border)
            if (isHint && !isSelected) {
              cellClass += ' ring-2 ring-amber-500 bg-amber-100/90 text-amber-950 animate-pulse font-extrabold';
            }

            return (
              <div
                key={`${r}-${c}`}
                data-row={r}
                data-col={c}
                className="flex items-center justify-center p-0.5 sm:p-1"
              >
                <div
                  className={`w-full h-full rounded-lg sm:rounded-xl flex items-center justify-center text-center font-bold tracking-tight text-sm sm:text-base md:text-lg border transition-all duration-100 select-none ${cellClass}`}
                >
                  <span>{letter}</span>
                  {isSelectionStart && isSelected && !selectionFailed && (
                    <span className="absolute w-1.5 h-1.5 rounded-full bg-[#E9B44C] bottom-1" />
                  )}
                  {isSelectionHead && isSelected && !selectionFailed && (
                    <span className="absolute w-2 h-2 rounded-full bg-white top-1" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
