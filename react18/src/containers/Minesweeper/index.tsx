import React, { useState, useReducer } from "react";

import { BOARD_HEIGHT, BOARD_WIDTH, NUM_MINES} from "./constants";
import { CreateEmptyBoard, GenerateBoard} from "./utils";
import DisplayBoard from "../../components/DisplayBoard";
import { MinesweeperItem } from "./interfaces";


// TODO - update type: string to be an enum
const testReducer = (prevState: MinesweeperItem[][], action: { type: string; payload: {rowIndex: number, colIndex: number}; }): MinesweeperItem[][] => {
  let array;
  switch (action.type) {
      case 'FIRST_CLICK':
        // TODO - generate the board
        // TODO - 
        array = [...prevState];
        // array[action.payload.rowIndex][action.payload.colIndex].isRevealed = true;
        return array;
      case 'REVEAL':
          console.log("testReducerREVEAL - prevState", prevState)
          array = [...prevState];
          console.log("testReducerREVEAL - array1", array)
          console.log("Indices: ", action.payload.rowIndex, action.payload.colIndex);
          console.log("array[action.payload.rowIndex][action.payload.colIndex]", array[action.payload.rowIndex][action.payload.colIndex])
          const item = array[action.payload.rowIndex][action.payload.colIndex];
          console.log("item", item)
          item.isRevealed = true;
          console.log("testReducerREVEAL - array2", array)
          return array;
      // case 'CLEAR':
      //     return prevState = [];
      default:
          return [[]]
  }
}

const Minesweeper = () => {
  const [board, boardDispatcher] = useReducer(testReducer, CreateEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT));

  console.log("board", board);

  const clickHandler = (rowIndex: number, colIndex: number) => {
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
          clickHandler={clickHandler}
        />
      </div>
    </div>
  );
}

export default Minesweeper;
