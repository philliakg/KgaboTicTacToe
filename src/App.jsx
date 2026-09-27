import React, { useEffect, useReducer } from 'react';
import Board from './components/Board.jsx';
import { createInitialState, gameReducer } from './state/gameReducer.js';
import { getComputerMove, getWinningLine } from './util/gameLogic.js';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  const { board, currentPlayer, winner, draw, mode } = state;
  const computerTurn = mode === 'computer' && currentPlayer === 'O' && !winner && !draw;
  const finished = Boolean(winner || draw);

  useEffect(() => {
    if (!computerTurn) return;
    const timer = setTimeout(() => {
      const index = getComputerMove(board);
      if (index !== null) dispatch({ type: 'MAKE_MOVE', index, actor: 'computer' });
    }, 550);
    return () => clearTimeout(timer);
  }, [board, computerTurn]);

  let status = `Next Player: ${currentPlayer}`;
  let hint = computerTurn ? 'The computer is thinking…' : 'Pick an empty square. Make your move.';
  if (winner) {
    status = `Winner: ${winner}`;
    hint = 'Three in a row. Nicely played!';
  } else if (draw) {
    status = 'Draw!';
    hint = 'A well-matched game. Go again?';
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="./" aria-label="Tic tac toe home"><span className="brand-icon">#</span> little games<span className="brand-dot">.</span></a>
        <span className="topbar-note">A CLASSIC, FOR A REASON</span>
      </header>
      <main>
        <div className="intro">
          <div className="eyebrow"><span /> YOUR NEXT LITTLE BREAK</div>
          <h1>Tic. Tac. <span>Toe.</span></h1>
          <p>Three in a row. A little friendly competition.</p>
        </div>
        <section className="game-card" aria-label="Game">
          <div className="mode-switch" role="group" aria-label="Game mode">
            <button aria-pressed={mode === 'computer'} onClick={() => dispatch({ type: 'SET_MODE', mode: 'computer' })}>▦ <span>Vs computer</span></button>
            <button aria-pressed={mode === 'friend'} onClick={() => dispatch({ type: 'SET_MODE', mode: 'friend' })}>♧ <span>With a friend</span></button>
          </div>
          <div className="players">
            <div className={`player ${currentPlayer === 'X' && !finished ? 'active' : ''}`}>
              <span className="player-mark x">×</span><div><strong>{mode === 'computer' ? 'You' : 'Player one'}</strong><small>PLAYING X</small></div>
              {currentPlayer === 'X' && !finished && <span className="turn-dot" />}
            </div>
            <span className="versus">vs</span>
            <div className={`player ${currentPlayer === 'O' && !finished ? 'active' : ''}`}>
              <span className="player-mark o">○</span><div><strong>{mode === 'computer' ? 'Computer' : 'Player two'}</strong><small>{mode === 'computer' ? 'EASY · O' : 'PLAYING O'}</small></div>
              {currentPlayer === 'O' && !finished && <span className="turn-dot" />}
            </div>
          </div>
          <div className={`status ${finished ? 'finished' : ''}`} role="status" aria-live="polite" aria-atomic="true">
            <h2>{status}</h2><p>{hint}</p>
          </div>
          <Board board={board} winningLine={getWinningLine(board)} disabled={finished || computerTurn}
            onMove={(index) => dispatch({ type: 'MAKE_MOVE', index, actor: 'human' })} />
          <button className="restart" onClick={() => dispatch({ type: 'RESET' })}><span aria-hidden="true">↻</span> Restart game</button>
          <p className="game-note">X goes first. Every game is a fresh start.</p>
        </section>
        <div className="how-to"><span className="info-icon">i</span><p><strong>Small board. Big possibilities.</strong><br />Connect three marks in a row, column, or diagonal to win.</p></div>
      </main>
      <footer>LESS SCROLLING. MORE PLAYING. <span>✳</span></footer>
    </div>
  );
}
