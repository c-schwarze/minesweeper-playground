import React, { useState, useReducer, useEffect } from "react";

import { BOARD_HEIGHT, BOARD_WIDTH, NUM_MINES } from "./constants";
import { createEmptyMinesweeper, generateBoard, Get9SurroundingIndices } from "./utils";
import DisplayBoard from "../../components/DisplayBoard";
import { MinesweeperItem, MinesweeperGlobalState } from "./interfaces";


// TODO - update type: string to be an enum
// TODO - update these names
const testReducer = (prevState: MinesweeperGlobalState, action: { type: string; payload: {rowIndex?: number, colIndex?: number}; }): MinesweeperGlobalState => {
  let MinesweeperState: MinesweeperGlobalState;
  switch (action.type) {
      case 'FIRST_CLICK':
        MinesweeperState = {...prevState};
       
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

        let squareClicked = MinesweeperState.board[action.payload.rowIndex][action.payload.colIndex];
        squareClicked.isRevealed = true;
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
  
  // TODO - this is a bad practice. Need to adjust this so it doesn't run on every render.
  //        Probably should just do all of this inside a single REVEAL, but this was interesting to consider.
  useEffect(() => {
    if (boardState.hasFirstClick) {
      boardState.board.map((col, rowIndex) => {
        col.map((tile, colIndex) => {
          if (tile.isRevealed && tile.numSurroundingMines === 0 && !tile.isMine) {
            Get9SurroundingIndices(BOARD_WIDTH, BOARD_HEIGHT, rowIndex, colIndex).map((surroundingTiles) => {
              let colIndexToSet = surroundingTiles.colIndex;
              let rowIndexToSet = surroundingTiles.rowIndex;
              boardDispatcher({type: "REVEAL", payload: {rowIndex: rowIndexToSet, colIndex: colIndexToSet}})
              // break, so we do 1 at a time
              return
            })
          }})
      })
    }
  }, [boardState])

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
