import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * The main TicTacToe game component. Handles the board state, player turns, and renders the layout.
 */
function TicTacToe() {
  // Board is a 9-element array of 'X', 'O', or null
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' starts by default
  const [xIsNext, setXIsNext] = useState(true);
  // 'X', 'O', or null (ongoing)
  const [winner, setWinner] = useState(null);
  // true if the game is a draw
  const [isDraw, setIsDraw] = useState(false);

  // Handles cell click and updates state
  const handleClick = (idx) => {
    if (board[idx] || winner) return; // ignore if filled or game ended
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';

    const win = calculateWinner(newBoard);
    const draw = !win && newBoard.every(cell => cell);
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(win);
    setIsDraw(draw);
  };

  // Reset game state to initial
  // PUBLIC_INTERFACE
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  /**
   * Simple winner calculation logic for classic 3x3 tic-tac-toe.
   * @param {string[]} boardArray
   * @returns {'X'|'O'|null}
   */
  function calculateWinner(boardArray) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6] // diags
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
        return boardArray[a];
      }
    }
    return null;
  }

  // Game status messages
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = `Draw!`;
  } else {
    status = `Current Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="tictactoe-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 120 }}>
      <h1 className="title" style={{ marginBottom: 0, fontSize: '2.5rem' }}>Tic Tac Toe</h1>
      <div className="subtitle" style={{ marginBottom: 14, color: 'var(--base-light)' }}>Two Player Classic Game</div>
      <div className="game-status" style={{ marginBottom: 16, fontWeight: 500 }}>{status}</div>
      <div className="board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 70px)',
          gap: '7px',
          marginBottom: 28,
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="cell"
            onClick={() => handleClick(idx)}
            style={{
              width: 70,
              height: 70,
              fontSize: '2rem',
              color: cell === 'X' ? '#00ffff' : '#4caf50',
              background: 'var(--border-color,rgba(255,255,255,0.06))',
              border: '2px solid var(--base-dark)',
              borderRadius: 6,
              cursor: cell || winner ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={"Cell " + (idx + 1)}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="btn btn-large" onClick={handleReset} style={{ minWidth: 90 }}>
        Reset Game
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span />
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;