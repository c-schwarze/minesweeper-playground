import { MinesweeperItem } from "../../containers/Minesweeper/interfaces";

interface MinesweeperSquareProps {
    rowIndex: number;
    colIndex: number;
    squareValue: MinesweeperItem;
    clickHandler: (rowIndex: number, colIndex: number) => void;
    defaultReveal?: boolean;
}

const MinesweeperSquare = ({squareValue, clickHandler, rowIndex, colIndex, defaultReveal}: MinesweeperSquareProps) => {
    return <div className="grid-item">
        {
            (squareValue.isRevealed || defaultReveal) ? (
                    (squareValue.isFlagged) || (squareValue.isMine && defaultReveal) ? (
                        <button className="minesweeper-square" disabled>M</button>
                    ) : (
                        <button className="minesweeper-square" disabled>{squareValue.numSurroundingMines || ''}</button>
                    )
            ) : (
                <button className="minesweeper-square" onClick={() => clickHandler(rowIndex, colIndex)}>?</button>
            )
        }
    </div>
}

export default MinesweeperSquare;