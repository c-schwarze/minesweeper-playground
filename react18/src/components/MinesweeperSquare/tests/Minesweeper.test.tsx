import { render, screen } from '@testing-library/react';
// Importing the jest testing library
import '@testing-library/jest-dom'
import MinesweeperSquare from '../index';

describe("MinesweeperSquare Component", () => {
    test('mine (unrevealed)', () => {
        render(<MinesweeperSquare 
            rowIndex={0}
            colIndex={0}
            squareValue={{
                isMine: true,
                isRevealed: false,
                isFlagged: false,
                numSurroundingMines: 0,
            }} 
            clickHandler={jest.fn()} 
            disabled={false}
        />);
        
        const button = screen.getByText('?', { selector: 'button' });
        expect(button).toBeInTheDocument();
    });

    test('mine (revealed)', () => {
        render(<MinesweeperSquare 
            rowIndex={0}
            colIndex={0}
            squareValue={{
                isMine: true,
                isRevealed: true,
                isFlagged: false,
                numSurroundingMines: 0,
            }} 
            clickHandler={jest.fn()} 
            disabled={false}
        />);
        
        const button = screen.getByText('M', { selector: 'button' });
        expect(button).toBeInTheDocument()
    });

    test('not a mine with no surrounding mines', () => {
        render(<MinesweeperSquare 
            rowIndex={0}
            colIndex={0}
            squareValue={{
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                numSurroundingMines: 0,
            }} 
            clickHandler={jest.fn()} 
            disabled={false}
        />);
        
        const button = screen.getByText('?', { selector: 'button' });
        expect(button).toBeInTheDocument()
    });

    test('not a mine with surrounding mines (revealed)', () => {
        render(<MinesweeperSquare 
            rowIndex={0}
            colIndex={0}
            squareValue={{
                isMine: false,
                isRevealed: true,
                isFlagged: false,
                numSurroundingMines: 7,
            }} 
            clickHandler={jest.fn()} 
            disabled={false}
        />);
        
        const button = screen.getByText('7', { selector: 'button' });
        expect(button).toBeInTheDocument()
    });

    test('flagged mine', () => {
        render(<MinesweeperSquare 
            rowIndex={0}
            colIndex={0}
            squareValue={{
                isMine: true,
                isRevealed: false,
                isFlagged: true,
                numSurroundingMines: 0,
            }} 
            clickHandler={jest.fn()} 
            disabled={false}
        />);
        
        const button = screen.getByText('<|', { selector: 'button' });
        expect(button).toBeInTheDocument()
    });
});