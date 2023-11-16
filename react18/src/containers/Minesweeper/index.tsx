import React, { useState, useReducer, useEffect } from "react";

import { BOARD_HEIGHT, BOARD_WIDTH, NUM_MINES } from "./constants";
import { createEmptyMinesweeper, generateBoard, getRevealedBoard } from "./utils";
import DisplayBoard from "../../components/DisplayBoard";
import { MinesweeperItem, MinesweeperGlobalState } from "./interfaces";


// TODO - update type: string to be an enum
// TODO - update these names
const testReducer = (prevState: MinesweeperGlobalState, action: { type: string; payload: {rowIndex?: number, colIndex?: number}; }): MinesweeperGlobalState => {
  let MinesweeperState: MinesweeperGlobalState;
  switch (action.type) {
      case 'FIRST_CLICK':
        MinesweeperState = {...prevState};
        console.log("FIRST CLICK")       
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return MinesweeperState;
        }
  
        MinesweeperState.board = generateBoard(MinesweeperState.board, action.payload.rowIndex, action.payload.colIndex, BOARD_WIDTH, BOARD_HEIGHT, NUM_MINES);
        MinesweeperState.hasFirstClick = true;
        return MinesweeperState;
      case 'REVEAL':
        console.log("REVEAL")
        MinesweeperState = {...prevState};
       
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return MinesweeperState;
        }
        
        // do a recursive loop to reveal all applicable
        MinesweeperState.board = getRevealedBoard(MinesweeperState.board, action.payload.rowIndex, action.payload.colIndex, BOARD_WIDTH, BOARD_HEIGHT)
        
        return MinesweeperState;
      case 'CLEAR':
        MinesweeperState = {...prevState};
        MinesweeperState = createEmptyMinesweeper(BOARD_WIDTH, BOARD_HEIGHT);
        return MinesweeperState
      default:
        return createEmptyMinesweeper(BOARD_WIDTH, BOARD_HEIGHT)
  }
}

const Minesweeper = () => {
  const [boardState, boardDispatcher] = useReducer(testReducer, createEmptyMinesweeper(BOARD_WIDTH, BOARD_HEIGHT));
  
  const revealHandler = (rowIndex: number, colIndex: number) => {
    const itemClicked = boardState.board[rowIndex][colIndex];

    // Generate the board - if there are none revealed
    if (!boardState.hasFirstClick) {
      boardDispatcher({type: "FIRST_CLICK", payload: { rowIndex, colIndex }})
    } else if (!itemClicked.isRevealed) {
      if (itemClicked.isMine) {
        // TODO - add in a "losing" screen. display things
        boardDispatcher({type: "CLEAR", payload: {}})
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
          viewableBoard={boardState.board}
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
