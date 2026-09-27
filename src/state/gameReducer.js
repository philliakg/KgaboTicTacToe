import { createEmptyBoard, determineWinner, getNextPlayer, isBoardFull } from '../util/gameLogic.js';

export const createInitialState = (mode = 'computer') => ({
  board: createEmptyBoard(),
  currentPlayer: 'X',
  winner: null,
  draw: false,
  mode,
});

export function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const index = action.index;
      if (!Number.isInteger(index) || index < 0 || index > 8) return state;
      if (state.winner || state.draw || state.board[index] !== null) return state;
      const computerTurn = state.mode === 'computer' && state.currentPlayer === 'O';
      if (computerTurn !== (action.actor === 'computer')) return state;

      const board = [...state.board];
      board[index] = state.currentPlayer;
      const winner = determineWinner(board);
      const draw = !winner && isBoardFull(board);
      return {
        ...state, board, winner, draw,
        currentPlayer: winner || draw ? state.currentPlayer : getNextPlayer(state.currentPlayer),
      };
    }
    case 'RESET':
      return createInitialState(state.mode);
    case 'SET_MODE':
      if (action.mode !== 'computer' && action.mode !== 'friend') return state;
      return createInitialState(action.mode);
    default:
      return state;
  }
}
