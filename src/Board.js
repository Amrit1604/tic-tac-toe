// src/Board.js
import React from "react";
import Cell from "./Cell";

const Board = ({ board, onClick, winner }) => {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onClick(index)}
          isWinningCell={winner && winner.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
