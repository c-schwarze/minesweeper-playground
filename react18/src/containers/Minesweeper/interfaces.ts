export interface MinesweeperItem {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    numSurroundingMines: number;
}