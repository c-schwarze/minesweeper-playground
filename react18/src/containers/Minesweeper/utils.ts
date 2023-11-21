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

export const placeStartingMines = (board: MinesweeperItem[][], startingRowIndex: number, startingColIndex: number, width: number, height: number, numMines: number): MinesweeperItem[][] => {
    // Place the mines
    let minesPlaced = getTotalMinesOnBoard(board)
    let surroundingStartingIndices = Get9SurroundingIndices(width, height, startingRowIndex, startingColIndex, false);
    while (minesPlaced < numMines) {
        let colAttempt = getRandomInt(width);
        let rowAttempt = getRandomInt(height);
        
        // a mine cannot be surrounding the start tile
        // a mine cannot be placed where another mine is
        let isInProtectedTiles = surroundingStartingIndices.find((startingTiles) => (
            startingTiles.rowIndex === rowAttempt && startingTiles.colIndex === colAttempt
        ))
        if (isInProtectedTiles || board[rowAttempt][colAttempt].isMine) {
            continue
        }
        board[rowAttempt][colAttempt].isMine = true;
        minesPlaced = getTotalMinesOnBoard(board)

        let surroundingIndices = Get9SurroundingIndices(width, height, rowAttempt, colAttempt, true);

        // bump the surrounding mines
        surroundingIndices.map((adjacentTile) => {
            let tileToAdd = board[adjacentTile.rowIndex][adjacentTile.colIndex];
            if (!(adjacentTile.rowIndex === rowAttempt && adjacentTile.colIndex === colAttempt)) {
                tileToAdd.numSurroundingMines = tileToAdd.numSurroundingMines + 1;
            }
        })
    }
    board = getRevealedBoard(board, startingRowIndex, startingColIndex, width, height);

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
    tile.isRevealed = true

    if (tile.numSurroundingMines === 0 && !tile.isMine) {
        const surroundingIndices = Get9SurroundingIndices(boardWidth, boardHeight, rowIndex, colIndex, true);
        surroundingIndices.map((coordinates) => {
            if (!board[coordinates.rowIndex][coordinates.colIndex].isRevealed) {
                board = getRevealedBoard(board, coordinates.rowIndex, coordinates.colIndex, boardWidth, boardHeight);
            }
        })
    }
    return board
}

export const getTotalMinesOnBoard = (board: MinesweeperItem[][]): number => {
    let total = 0
    board.map((row) => (
        row.map((tile) => (
            tile.isMine ? total = total + 1 : undefined
        ))
    ))
    return total;
}

export const hasWon = (board: MinesweeperItem[][]): boolean => {
    let onlyMinesAreRevealed = true;
    
    board.map((row) => 
        row.map((tile) => {
            if (!tile.isMine && !tile.isRevealed) {  
                onlyMinesAreRevealed = false;
            }
        })
    )
    
    return onlyMinesAreRevealed;
}

export const hasLost = (board: MinesweeperItem[][]): boolean => {
    let hasLost = false;
    
    board.map((row) => {
        row.map((tile) => {
            if (tile.isMine && tile.isRevealed) {  
                hasLost = true;
            }
        })
    })

    return hasLost;
}
