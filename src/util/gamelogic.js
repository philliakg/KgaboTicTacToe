export const createEmptyBoard = () => Array(9).fill(null);

export const getWinningPatterns = () => [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export const getWinningLine = (board) => {
  const patterns = getWinningPatterns();
  for (let i = 0; i < patterns.length; i++) {
    const first = patterns[i][0];
    const second = patterns[i][1];
    const third = patterns[i][2];
    if (board[first] !== null) {
      if (board[first] === board[second]) {
        if (board[second] === board[third]) return patterns[i];
      }
    }
  }
  return [];
};

export const determineWinner = (board) => {
  const line = getWinningLine(board);
  return line.length > 0 ? board[line[0]] : null;
};

export const isBoardFull = (board) => board.every((square) => square !== null);
export const getNextPlayer = (player) => player === 'X' ? 'O' : 'X';

export const getComputerMove = (board, random = Math.random) => {
  const emptySquares = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) emptySquares.push(i);
  }
  if (emptySquares.length === 0) return null;
  return emptySquares[Math.floor(random() * emptySquares.length)];
};
