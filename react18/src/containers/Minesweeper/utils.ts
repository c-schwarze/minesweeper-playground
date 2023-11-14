import { MinesweeperItem } from "./interfaces";

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

export const GenerateBoard = (width: number, height: number): MinesweeperItem[][] => {
    // TODO - generate it
    return Array.from(Array(width), () => new Array(height).fill({} as MinesweeperItem))
}