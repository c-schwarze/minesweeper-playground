import React, { useReducer } from "react";

import { BOARD_HEIGHT, BOARD_WIDTH, NUM_MINES } from "./constants";
import { createEmptyMinesweeper, placeStartingMines, getRevealedBoard, hasWon, hasLost } from "./utils";
import DisplayBoard from "../../components/DisplayBoard";
import { MinesweeperGlobalState } from "./interfaces";


// TODO - update type: string to be an enum
// TODO - update these names
const testReducer = (prevState: MinesweeperGlobalState, action: { type: string; payload: {rowIndex?: number, colIndex?: number}; }): MinesweeperGlobalState => {
  let MinesweeperState: MinesweeperGlobalState;
  switch (action.type) {
      case 'FIRST_CLICK':
        MinesweeperState = {...prevState};
         
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return {...MinesweeperState};
        }
        if (MinesweeperState.hasFirstClick) {
          return {...MinesweeperState};
        }
        
        MinesweeperState.hasFirstClick = true;
        MinesweeperState.board = placeStartingMines(MinesweeperState.board, action.payload.rowIndex, action.payload.colIndex, BOARD_WIDTH, BOARD_HEIGHT, NUM_MINES);

        return {...MinesweeperState};
      case 'REVEAL':
        MinesweeperState = {...prevState};
       
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return {...MinesweeperState};
        }

        // do a recursive loop to reveal all applicable
        MinesweeperState.board = getRevealedBoard(MinesweeperState.board, action.payload.rowIndex, action.payload.colIndex, BOARD_WIDTH, BOARD_HEIGHT)

        return {...MinesweeperState};
      case 'FLAG':
        MinesweeperState = {...prevState};
       
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return {...MinesweeperState};
        }
        
        MinesweeperState.board[action.payload.rowIndex][action.payload.colIndex].isFlagged = true;
        
        return {...MinesweeperState};
      case 'UNFLAG':
        MinesweeperState = {...prevState};
        
        // make sure we have our params
        if (action.payload.rowIndex === undefined || action.payload.colIndex === undefined) {
          return {...MinesweeperState};
        }
        
        MinesweeperState.board[action.payload.rowIndex][action.payload.colIndex].isFlagged = false;
        
        return {...MinesweeperState};
      case 'CLEAR':
        MinesweeperState = {...prevState};
        MinesweeperState = createEmptyMinesweeper(BOARD_WIDTH, BOARD_HEIGHT);
        return {...MinesweeperState}
      default:
        return createEmptyMinesweeper(BOARD_WIDTH, BOARD_HEIGHT)
  }
}

const Minesweeper = () => {
  const [boardState, boardDispatcher] = useReducer(testReducer, createEmptyMinesweeper(BOARD_WIDTH, BOARD_HEIGHT));

  // disable right click menu
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  
  const revealHandler = (type: string, rowIndex: number, colIndex: number) => {
    // Generate the board - if there are none revealed
    if (type === 'reveal') {
      if (!boardState.hasFirstClick) {
        boardDispatcher({type: "FIRST_CLICK", payload: { rowIndex, colIndex }})
      } else {
        boardDispatcher({type: "REVEAL", payload: { rowIndex, colIndex }})
      }
    } else {
      if (boardState.board[rowIndex][colIndex].isFlagged) {
        boardDispatcher({type: "UNFLAG", payload: { rowIndex, colIndex }})
      } else {
        boardDispatcher({type: "FLAG", payload: { rowIndex, colIndex }})
      }
    }
  }

  return (
    <div>
      <h1>Minesweeper</h1>
      {hasWon(boardState.board) && (
        <h2>YOU HAVE WON THE GAME!</h2>
      )}
      {hasLost(boardState.board) && (
        <h2>YOU HAVE LOST THE GAME!</h2>
      )}
      <div className="minesweeper-board">
        <DisplayBoard 
          viewableBoard={boardState.board}
          clickHandler={revealHandler}
          disabled={hasWon(boardState.board) || hasLost(boardState.board)}
          viewAll={hasWon(boardState.board) || hasLost(boardState.board)}
        />
      </div>
      <div className="button-container">
        <button onClick={() => boardDispatcher({type: "CLEAR", payload: {}})}>Clear</button>
      </div>
    </div>
  );
}

export default Minesweeper;
