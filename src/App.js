// src/App.js
import React, { useState } from "react";
import Board from "./Board";
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return pattern;
      }
    }

    return board.includes(null) ? null : "Tie";
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const player1Name = document.getElementById("player1-name").value || "Player 1";
    const player2Name = document.getElementById("player2-name").value || "Player 2";
    setPlayer1(player1Name);
    setPlayer2(player2Name);
    resetGame();
  };

  const currentPlayer = isXNext ? player1 : player2;

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="players">
        <form onSubmit={handleNameSubmit}>
          <input type="text" id="player1-name" placeholder="Player 1 Name" className="player-input" />
          <input type="text" id="player2-name" placeholder="Player 2 Name" className="player-input" />
          <button type="submit" className="start-btn">Start Game</button>
        </form>
      </div>
      <Board board={board} onClick={handleClick} winner={winner} />
      <div className="status">
        {winner ? (
          winner === "Tie" ? "It's a Tie!" : `${board[winner[0]] === "X" ? player1 : player2} Wins!`
        ) : (
          `${currentPlayer}'s Turn (${isXNext ? "X" : "O"})`
        )}
      </div>
      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;
