import React from 'react';
import Square from './Square.jsx';

export default function Board({ board, winningLine, disabled, onMove }) {
  return (
    <div className="board" role="group" aria-label="Tic tac toe board">
      {board.map((value, index) => (
        <Square key={index} value={value} index={index}
          winning={winningLine.includes(index)} disabled={disabled}
          onClick={() => onMove(index)} />
      ))}
    </div>
  );
}
