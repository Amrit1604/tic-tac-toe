// src/Cell.js
import React from "react";

const Cell = ({ value, onClick, isWinningCell }) => {
  return (
    <div className={`cell ${isWinningCell ? "winning-cell" : ""}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
