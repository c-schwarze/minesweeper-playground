export interface MinesweeperGlobalState {
    hasFirstClick: boolean;
    board: MinesweeperItem[][];
}

export interface MinesweeperItem {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    numSurroundingMines: number;
}

export interface CoordinateTuple {
    rowIndex: number;
    colIndex: number;
}