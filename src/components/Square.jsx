import React from "react";

export default function Square({ value, index, winning, disabled, onClick }) {
  return (
    <><button
          className={`square ${value ? `mark-${value.toLowerCase()}` : ''} ${winning ? 'winning' : ''}`}
          disabled={disabled || value !== null}
          onClick={onClick}
          aria-label={`Row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}: ${value || 'empty'}`}
      >
          {value && <span className={`symbol symbol-${value.toLowerCase()}`} aria-hidden="true" />}
      </button></>
  );
}