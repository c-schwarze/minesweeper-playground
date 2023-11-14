import React, { useState, useReducer } from "react";

import { BOARD_HEIGHT, BOARD_WIDTH, NUM_MINES} from "./constants";
import { CreateEmptyBoard, GenerateBoard} from "./utils";
import DisplayBoard from "../../components/DisplayBoard";
import { MinesweeperItem } from "./interfaces";


// TODO - update type: string to be an enum
// TODO - update these names
const testReducer = (prevState: MinesweeperItem[][], action: { type: string; payload: {rowIndex?: number, colIndex?: number}; }): MinesweeperItem[][] => {
  let array;
  switch (action.type) {
      case 'REVEAL':
        array = [...prevState];
       
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return array;
        }

        // if there are none revealed, we need to generate the board
        if (array.map((col) => col.find((item) => item.isRevealed)).length > 0 ) {
          // TODO - we need to generate the official board
          GenerateBoard(array, BOARD_WIDTH, BOARD_HEIGHT, NUM_MINES);
        }

        let squareClicked = array[action.payload.rowIndex][action.payload.colIndex];
        squareClicked.isRevealed = true;
        if (squareClicked.numSurroundingMines === 0) {
          // TODO - update each of the 8 surrounding tiles as well
        }
        return array;
      case 'CLEAR':
          return prevState = CreateEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT);
      default:
          return CreateEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT)
  }
}

const Minesweeper = () => {
  const [board, boardDispatcher] = useReducer(testReducer, CreateEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT));

  const revealHandler = (rowIndex: number, colIndex: number) => {
    const itemClicked = board[rowIndex][colIndex];
    if (!itemClicked.isRevealed) {
      if (itemClicked.isMine) {
        alert("You Lose!");
      } else {
        boardDispatcher({type: "REVEAL", payload: { rowIndex, colIndex }})
      }
    }
  }

  return (
    <div>
      <h1>Minesweeper</h1>
      <div className="minesweeper-board">
        <DisplayBoard 
          viewableBoard={board}
          clickHandler={revealHandler}
        />
      </div>
      <div className="button-container">
        <button onClick={() => boardDispatcher({type: "CLEAR", payload: {}})}>Clear</button>
      </div>
    </div>
  );
}

export default Minesweeper;
