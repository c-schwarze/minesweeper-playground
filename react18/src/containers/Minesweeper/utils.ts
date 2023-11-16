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
    let surroundingStartingIndices = Get9SurroundingIndices(width, height, startingRowIndex, startingColIndex, false);
    board = getRevealedBoard(board, startingRowIndex, startingColIndex, width, height);

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

        let surroundingIndices = Get9SurroundingIndices(width, height, rowAttempt, colAttempt, true);

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

export const Get9SurroundingIndices = (widthBoundary: number, heightBoundary: number, rowIndex: number, colIndex: number, ignoreCenterTile: boolean): CoordinateTuple[] => {
    let surroundingLegalIndices: CoordinateTuple[] = [];
    [-1, 0, 1].map((rowModifier) => {
        let newRowIndex = rowIndex + rowModifier;
        [-1, 0, 1].map((colModifier) => {
            let newColIndex = colIndex + colModifier;
            let isRowGood = 0 <= newRowIndex && newRowIndex < widthBoundary;
            let isColGood = 0 <= newColIndex && newColIndex < heightBoundary;
            let skipCenter = ignoreCenterTile && rowModifier === 0 && colModifier === 0;

            if (isRowGood && isColGood && !skipCenter) {
                surroundingLegalIndices.push({rowIndex: newRowIndex, colIndex: newColIndex})
            }
        })
    })

    return surroundingLegalIndices;
}

// recursive reveal. For the one revealed, reveal all 8 if its 0. Do that for each of those. Kind of a bummer to deal with duplicates
// TODO - please rename this.
export const getRevealedBoard = (board: MinesweeperItem[][], rowIndex: number, colIndex: number, boardWidth: number, boardHeight: number): MinesweeperItem[][] => {
    const tile = board[rowIndex][colIndex]
    tile.isRevealed = true;

    console.log("tile.numSurroundingMines", tile.numSurroundingMines);
    console.log("tile.isMine", tile.isMine);
    console.log("tile.isRevealed", tile.isRevealed);

    if (tile.numSurroundingMines === 0 && !tile.isMine) {
        const surroundingIndices = Get9SurroundingIndices(boardWidth, boardHeight, rowIndex, colIndex, true);
        console.log("surroundingIndices", surroundingIndices);
        surroundingIndices.map((coordinates) => {
            board = getRevealedBoard(board, coordinates.rowIndex, coordinates.colIndex, boardWidth, boardHeight);
        })
    }
    return board
}