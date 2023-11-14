import MinesweeperSquare from "../MinesweeperSquare";
import { MinesweeperItem } from "../../containers/Minesweeper/interfaces";

interface DisplayBoardProps {
    viewableBoard: MinesweeperItem[][];
    clickHandler: (rowIndex: number, colIndex: number) => void;
}

const DisplayBoard = ({viewableBoard, clickHandler}: DisplayBoardProps) => {
    return (
        viewableBoard.map((col: MinesweeperItem[], colIndex: number) => (
            <div className="grid-container" key={`col-${colIndex}`}>
                {col.map((squareValue: MinesweeperItem, rowIndex: number) => (
                    <MinesweeperSquare squareValue={squareValue} clickHandler={() => clickHandler(colIndex, rowIndex)} rowIndex={rowIndex} colIndex={colIndex} />
                ))}
            </div>
        ))
    )
}

export default DisplayBoard;