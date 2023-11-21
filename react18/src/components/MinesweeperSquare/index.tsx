import { MinesweeperItem } from "../../containers/Minesweeper/interfaces";

interface MinesweeperSquareProps {
    rowIndex: number;
    colIndex: number;
    squareValue: MinesweeperItem;
    clickHandler: (type: string, rowIndex: number, colIndex: number) => void;
    disabled?: boolean;
    defaultReveal?: boolean;
}

const MinesweeperSquare = ({squareValue, clickHandler, rowIndex, colIndex, disabled, defaultReveal}: MinesweeperSquareProps) => {

    const displayValue = (item: MinesweeperItem): string => {
        if (item.isRevealed || defaultReveal) {
            if (item.isMine) {
                return 'M'
            } else if (item.numSurroundingMines > 0) {
                return item.numSurroundingMines.toString()
            } else {
                return ''
            }
        } else if (item.isFlagged) {
            return '<|'
        }

        return '?'
    }

    return <div className="grid-item">
        {
            (squareValue.isRevealed || defaultReveal) ? (
                <button className="minesweeper-square" disabled>{displayValue(squareValue)}</button>
            ) : (
                <button 
                    className="minesweeper-square" 
                    onClick={() => clickHandler("reveal", rowIndex, colIndex)} 
                    onContextMenu={() => clickHandler("flag", rowIndex, colIndex)}
                    disabled={disabled}
                >{displayValue(squareValue)}</button>
            )
        }
    </div>
}

export default MinesweeperSquare;