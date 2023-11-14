import MinesweeperSquare from "../MinesweeperSquare";
import { MinesweeperItem } from "../../containers/Minesweeper/interfaces";

interface DisplayBoardProps {
    viewableBoard: MinesweeperItem[][];
    clickHandler: (rowIndex: number, colIndex: number) => void;
}

const DisplayBoard = ({viewableBoard, clickHandler}: DisplayBoardProps) => {
    return (
        viewableBoard.map((col: MinesweeperItem[], rowIndex: number) => (
            <div className="grid-container">
                {col.map((squareValue: MinesweeperItem, colIndex: number) => (
                    <MinesweeperSquare squareValue={squareValue} clickHandler={() => clickHandler(rowIndex, colIndex)} rowIndex={rowIndex} colIndex={colIndex} />
                ))}
            </div>
        ))
    )
}

export default DisplayBoard;