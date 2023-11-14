import { MinesweeperItem, CoordinateTuple } from "./interfaces";

export const CreateEmptyBoard = (width: number, height: number): MinesweeperItem[][] => {
    const nilBoard = Array.from(Array(width), () => new Array(height).fill(new Object))
    const board = nilBoard.map((col) => (
        col.map((item) => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            numSurroundingMines: 0,
        } as MinesweeperItem))
    ))
    return board;
}

export const GenerateBoard = (board: MinesweeperItem[][], width: number, height: number, numMines: number): MinesweeperItem[][] => {
    // TODO - generate it
    return Array.from(Array(width), () => new Array(height).fill({} as MinesweeperItem))
}

// export const Get8SurroundingIndices = (rowIndex: number, colIndex: number): CoordinateTuple[] => {

//     return
// }