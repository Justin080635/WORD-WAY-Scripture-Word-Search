import { BoardData, Difficulty, GridCoordinate, PlacedWord } from '../types/game';

// 8 Directions: [dr, dc]
export const DIRECTIONS: Record<string, [number, number]> = {
  N:  [-1,  0],
  NE: [-1,  1],
  E:  [ 0,  1],
  SE: [ 1,  1],
  S:  [ 1,  0],
  SW: [ 1, -1],
  W:  [ 0, -1],
  NW: [-1, -1],
};

// Available directions per difficulty tier
export function getDirectionsForDifficulty(difficulty: Difficulty): [number, number][] {
  switch (difficulty) {
    case 'beginner':
      // Horizontal and vertical
      return [DIRECTIONS.E, DIRECTIONS.S, DIRECTIONS.W, DIRECTIONS.N];
    case 'intermediate':
      // Horizontal, vertical, and primary diagonals
      return [DIRECTIONS.E, DIRECTIONS.S, DIRECTIONS.SE, DIRECTIONS.NE, DIRECTIONS.W, DIRECTIONS.SW];
    case 'advanced':
    case 'master':
      // All 8 directions
      return Object.values(DIRECTIONS);
    default:
      return [DIRECTIONS.E, DIRECTIONS.S, DIRECTIONS.SE];
  }
}

// Biblical/English weighted letter pool for natural letter distribution
const WEIGHTED_LETTERS = 'EEEEEEEEAAAAAAIIIIIOOOOONNNNSSSSRRRRTTTTHHHLLLDDDCCCUUUMMMWWFFGGYYPPBVK';

function getRandomLetter(): string {
  const idx = Math.floor(Math.random() * WEIGHTED_LETTERS.length);
  return WEIGHTED_LETTERS[idx] || 'A';
}

function cleanWord(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z]/g, '');
}

// Curated Biblical vocabulary for hidden bonus words in each level
export const BIBLICAL_BONUS_DICTIONARY = [
  'PRAY', 'AMEN', 'LOVE', 'HOPE', 'HOLY', 'GLORY', 'GRACE', 'JOY', 
  'LORD', 'ZION', 'EDEN', 'ARK', 'FAITH', 'SON', 'GOD', 'WAY', 
  'TRUTH', 'LIFE', 'CROSS', 'PEACE', 'HALLELUJAH', 'ABBA', 'MANNA', 
  'LAMB', 'KING', 'PRIEST', 'STAR', 'LIGHT', 'SOUL', 'WORD', 'NAME', 
  'SEED', 'PALM', 'ROCK', 'VINE', 'DOVE', 'FIRE', 'OIL', 'CROWN', 
  'ROOT', 'GOLD', 'ALTAR', 'SHIELD', 'LAMP'
];

/**
 * Generate a guaranteed valid word search board
 */
export function generateWordSearchBoard(
  rawWords: string[],
  size: number,
  difficulty: Difficulty
): BoardData {
  const words = rawWords.map(cleanWord).filter(w => w.length > 0);
  // Sort longest words first
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  const directions = getDirectionsForDifficulty(difficulty);

  // Pick candidate bonus words that aren't already target words
  const availableBonusCandidates = BIBLICAL_BONUS_DICTIONARY.filter(
    bw => !words.includes(bw) && bw.length <= size
  ).sort(() => Math.random() - 0.5);

  const maxAttempts = 80;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Initialize empty grid
    const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
    const placedWords: PlacedWord[] = [];
    const bonusWords: string[] = [];
    let allPlaced = true;

    for (const word of sortedWords) {
      const placed = tryPlaceWord(grid, size, word, directions);
      if (placed) {
        placedWords.push(placed);
      } else {
        allPlaced = false;
        break; // retry board generation
      }
    }

    if (allPlaced) {
      // Try to embed 1-2 hidden bonus words into the remaining cells
      for (const bonusWord of availableBonusCandidates) {
        if (bonusWords.length >= 2) break;
        const placedBonus = tryPlaceWord(grid, size, bonusWord, directions);
        if (placedBonus) {
          bonusWords.push(bonusWord);
        }
      }

      // Fill remaining empty cells with random weighted letters
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c] === '') {
            grid[r][c] = getRandomLetter();
          }
        }
      }

      return {
        grid,
        size,
        placedWords,
        bonusWords,
      };
    }
  }

  // Fallback: If grid was too tight, increase grid size slightly to guarantee completion
  return generateWordSearchBoard(rawWords, size + 1, difficulty);
}

/**
 * Check if a dragged string is a valid biblical bonus word
 */
export function checkBonusWord(
  draggedLetters: string,
  placedWords: PlacedWord[],
  alreadyBonus: string[],
  levelBonusWords: string[]
): string | null {
  const word = draggedLetters.toUpperCase().trim();
  if (word.length < 3) return null;

  const reversed = word.split('').reverse().join('');

  // Not a bonus word if it is an official target word
  if (placedWords.some(p => p.word === word || p.word === reversed)) {
    return null;
  }

  // Already found as a bonus in this session
  if (alreadyBonus.includes(word) || alreadyBonus.includes(reversed)) {
    return null;
  }

  // Check level-specific hidden bonus words
  if (levelBonusWords.includes(word)) return word;
  if (levelBonusWords.includes(reversed)) return reversed;

  // Check global biblical vocabulary
  if (BIBLICAL_BONUS_DICTIONARY.includes(word)) return word;
  if (BIBLICAL_BONUS_DICTIONARY.includes(reversed)) return reversed;

  return null;
}

function tryPlaceWord(
  grid: string[][],
  size: number,
  word: string,
  allowedDirections: [number, number][]
): PlacedWord | null {
  const wordLen = word.length;
  // Shuffle positions and directions for randomness
  const directions = [...allowedDirections].sort(() => Math.random() - 0.5);

  const candidateStarts: GridCoordinate[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      candidateStarts.push({ row: r, col: c });
    }
  }
  candidateStarts.sort(() => Math.random() - 0.5);

  for (const start of candidateStarts) {
    for (const dir of directions) {
      const [dr, dc] = dir;
      const endRow = start.row + dr * (wordLen - 1);
      const endCol = start.col + dc * (wordLen - 1);

      // Check board boundaries
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) {
        continue;
      }

      // Check collisions
      let canPlace = true;
      const cells: GridCoordinate[] = [];

      for (let i = 0; i < wordLen; i++) {
        const currR = start.row + dr * i;
        const currC = start.col + dc * i;
        const existingLetter = grid[currR][currC];
        const targetLetter = word[i];

        if (existingLetter !== '' && existingLetter !== targetLetter) {
          canPlace = false;
          break;
        }

        cells.push({ row: currR, col: currC });
      }

      if (canPlace) {
        // Place letters on grid
        for (let i = 0; i < wordLen; i++) {
          const { row, col } = cells[i];
          grid[row][col] = word[i];
        }

        return {
          word,
          start,
          end: { row: endRow, col: endCol },
          cells,
          direction: dir,
        };
      }
    }
  }

  return null;
}

/**
 * Snap arbitrary pointer drag to nearest valid direction (horizontal, vertical, diagonal)
 * and generate the sequence of cells between start and snapped end.
 */
export function calculateSelectedCells(
  start: GridCoordinate,
  current: GridCoordinate,
  gridSize: number
): GridCoordinate[] {
  if (start.row === current.row && start.col === current.col) {
    return [start];
  }

  const dRow = current.row - start.row;
  const dCol = current.col - start.col;

  // Determine angle in radians
  const angle = Math.atan2(dRow, dCol);
  // Snap to nearest 45 degree (PI / 4) interval
  const octant = Math.round(angle / (Math.PI / 4));
  const snappedAngle = octant * (Math.PI / 4);

  // Unit vector
  let stepR = Math.round(Math.sin(snappedAngle));
  let stepC = Math.round(Math.cos(snappedAngle));

  // Determine maximum distance
  const distance = Math.max(Math.abs(dRow), Math.abs(dCol));
  const cells: GridCoordinate[] = [];

  for (let i = 0; i <= distance; i++) {
    const r = start.row + stepR * i;
    const c = start.col + stepC * i;

    if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
      cells.push({ row: r, col: c });
    } else {
      break;
    }
  }

  return cells.length > 0 ? cells : [start];
}

/**
 * Find if user selection coordinates match ANY placed word (forward or backward)
 */
export function findMatchingPlacedWord(
  selectedCells: GridCoordinate[],
  placedWords: PlacedWord[]
): PlacedWord | null {
  if (selectedCells.length < 2) return null;

  for (const placed of placedWords) {
    if (selectedCells.length !== placed.cells.length) {
      continue;
    }

    // Check forward match: cell[i] matches placed.cells[i]
    let forwardMatch = true;
    for (let i = 0; i < selectedCells.length; i++) {
      if (
        selectedCells[i].row !== placed.cells[i].row ||
        selectedCells[i].col !== placed.cells[i].col
      ) {
        forwardMatch = false;
        break;
      }
    }

    if (forwardMatch) {
      return placed;
    }

    // Check backward match: user dragged from end to start
    let backwardMatch = true;
    const len = selectedCells.length;
    for (let i = 0; i < len; i++) {
      if (
        selectedCells[i].row !== placed.cells[len - 1 - i].row ||
        selectedCells[i].col !== placed.cells[len - 1 - i].col
      ) {
        backwardMatch = false;
        break;
      }
    }

    if (backwardMatch) {
      return placed;
    }
  }

  return null;
}

/**
 * Check if a dragged string matches a bonus word that was already found in this session
 */
export function checkAlreadyFoundBonusWord(
  draggedLetters: string,
  bonusWordsFound: string[]
): string | null {
  const word = draggedLetters.toUpperCase().trim();
  if (word.length < 3) return null;
  const reversed = word.split('').reverse().join('');
  if (bonusWordsFound.includes(word)) return word;
  if (bonusWordsFound.includes(reversed)) return reversed;
  return null;
}

/**
 * Validate user selection coordinates against target placed words.
 * Handles both FORWARD and BACKWARD drags seamlessly!
 */
export function validateSelection(
  selectedCells: GridCoordinate[],
  placedWords: PlacedWord[],
  alreadyFoundWords: string[]
): PlacedWord | null {
  const matched = findMatchingPlacedWord(selectedCells, placedWords);
  if (matched && !alreadyFoundWords.includes(matched.word)) {
    return matched;
  }
  return null;
}

/**
 * Helper to check if a specific cell coordinate is inside an array of cells
 */
export function isCellInList(cell: GridCoordinate, list: GridCoordinate[]): boolean {
  return list.some(item => item.row === cell.row && item.col === cell.col);
}

/**
 * Distinct, beautiful colors for highlighted found words
 */
export const WORD_HIGHLIGHT_COLORS = [
  { bg: 'bg-[#2D6A4F]/25', border: 'border-[#2D6A4F]', text: 'text-[#1B4332]', ring: 'ring-[#2D6A4F]' },
  { bg: 'bg-[#D4A373]/30', border: 'border-[#BC6C25]', text: 'text-[#603813]', ring: 'ring-[#BC6C25]' },
  { bg: 'bg-[#588157]/25', border: 'border-[#3A5A40]', text: 'text-[#344E41]', ring: 'ring-[#3A5A40]' },
  { bg: 'bg-[#E07A5F]/25', border: 'border-[#D94F3D]', text: 'text-[#8C271E]', ring: 'ring-[#D94F3D]' },
  { bg: 'bg-[#3D5A80]/25', border: 'border-[#293241]', text: 'text-[#1D3557]', ring: 'ring-[#293241]' },
  { bg: 'bg-[#8338EC]/20', border: 'border-[#6A21B9]', text: 'text-[#4A154B]', ring: 'ring-[#6A21B9]' },
  { bg: 'bg-[#0081A7]/25', border: 'border-[#0077B6]', text: 'text-[#023E8A]', ring: 'ring-[#0077B6]' },
  { bg: 'bg-[#E76F51]/25', border: 'border-[#F4A261]', text: 'text-[#9C381E]', ring: 'ring-[#E76F51]' },
];
