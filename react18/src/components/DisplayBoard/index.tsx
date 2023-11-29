import MinesweeperSquare from "../MinesweeperSquare";
import { MinesweeperItem } from "../../containers/Minesweeper/interfaces";

interface DisplayBoardProps {
    viewableBoard: MinesweeperItem[][];
    clickHandler: (type: string, rowIndex: number, colIndex: number) => void;
    viewAll?: boolean;
    disabled?: boolean;
}

const DisplayBoard = ({viewableBoard, clickHandler, viewAll, disabled}: DisplayBoardProps) => {
    return (
        viewableBoard.map((row: MinesweeperItem[], rowIndex: number) => (
            <div className="grid-container" key={`col-${rowIndex}`}>
                {row.map((squareValue: MinesweeperItem, colIndex: number) => (
                    <MinesweeperSquare 
                        squareValue={squareValue} 
                        clickHandler={clickHandler}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        defaultReveal={viewAll}
                        disabled={disabled}
                        key={`minesweeper-square-${rowIndex}-${colIndex}`}
                    />
                ))}
            </div>
        ))
    )
}

export default DisplayBoard;