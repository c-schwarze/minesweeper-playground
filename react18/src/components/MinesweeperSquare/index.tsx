import { MinesweeperItem } from "../../containers/Minesweeper/interfaces";

interface MinesweeperSquareProps {
    rowIndex: number;
    colIndex: number;
    squareValue: MinesweeperItem;
    clickHandler: (rowIndex: number, colIndex: number) => void;
}

const MinesweeperSquare = ({squareValue, clickHandler, rowIndex, colIndex}: MinesweeperSquareProps) => {
    return <div className="grid-item">
        {
            squareValue.isRevealed ? (
                    squareValue.numSurroundingMines > 0 ? (
                        <button className="minesweeper-square" disabled>{squareValue.numSurroundingMines}</button>
                    ) : (
                        <button className="minesweeper-square" disabled />
                    )
            ) : (
                <button className="minesweeper-square" onClick={() => !squareValue.isRevealed && clickHandler(rowIndex, colIndex)}>{squareValue.isFlagged ? 'M' : '?'}</button>
            )
        }
    </div>
}

export default MinesweeperSquare;