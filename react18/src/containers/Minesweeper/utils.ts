import { MinesweeperItem, CoordinateTuple, MinesweeperGlobalState } from "./interfaces";

export const createEmptyMinesweeper = (width: number, height: number): MinesweeperGlobalState => {
    const nilBoard = Array.from(Array(width), () => new Array(height).fill(new Object))
    const board = nilBoard.map((col) => (
        col.map((item) => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            numSurroundingMines: 0,
        } as MinesweeperItem))
    ))
    return {"board": board, hasFirstClick: false};
}

export const generateBoard = (board: MinesweeperItem[][], startingRowIndex: number, startingColIndex: number, width: number, height: number, numMines: number): MinesweeperItem[][] => {
    // Place the mines
    let minesRemain = numMines
    let surroundingStartingIndices = Get9SurroundingIndices(width, height, startingRowIndex, startingColIndex);
    board[startingRowIndex][startingColIndex].isRevealed = true;

    while (minesRemain > 0) {
        let colAttempt = getRandomInt(width);
        let rowAttempt = getRandomInt(height);
        let attempt: CoordinateTuple = {rowIndex: rowAttempt, colIndex: colAttempt};
        
        // a mine cannot be surrounding the start tile
        if (surroundingStartingIndices.includes(attempt)) {
            continue
        }
        board[rowAttempt][colAttempt].isMine = true;
        minesRemain = minesRemain - 1

        let surroundingIndices = Get9SurroundingIndices(width, height, rowAttempt, colAttempt);
        // bump the surrounding mines
        surroundingIndices.map((adjacentTile) => {
            let tileToAdd = board[adjacentTile.rowIndex][adjacentTile.colIndex];
            if (!(adjacentTile.rowIndex === rowAttempt && adjacentTile.colIndex === colAttempt)) {
                tileToAdd.numSurroundingMines = tileToAdd.numSurroundingMines + 1;
            }
        })
    }

    return board
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}

export const Get9SurroundingIndices = (widthBoundary: number, heightBoundary: number, rowIndex: number, colIndex: number): CoordinateTuple[] => {
    let surroundingLegalIndices: CoordinateTuple[] = [];
    [-1, 0, 1].map((row) => {
        let newRowIndex = rowIndex + row;
        [-1, 0, 1].map((col) => {
            let newColIndex = colIndex + col;
            let isRowGood = 0 <= newRowIndex && newRowIndex < widthBoundary;
            let isColGood = 0 <= newColIndex && newColIndex < heightBoundary;
            if (isRowGood && isColGood) {
                surroundingLegalIndices.push({rowIndex: newRowIndex, colIndex: newColIndex})
            }
        })
    })

    return surroundingLegalIndices;
}