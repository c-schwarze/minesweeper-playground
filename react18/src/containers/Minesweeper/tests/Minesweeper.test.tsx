import { render, screen } from '@testing-library/react';
// Importing the jest testing library
import '@testing-library/jest-dom'
import Minesweeper from '../index';

describe("Minesweeper Container", () => {
    test('basic render of 5x15 board', () => {
        render(<Minesweeper />);
        
        const title = screen.getByText(/minesweeper/i);
        expect(title).toBeInTheDocument();

        const minesweeperBoard = screen.getByTestId(/minesweeper-board/i);
        expect(minesweeperBoard).toBeInTheDocument();

        const individualTiles = screen.queryAllByText('?', { selector: 'button' });
        expect(individualTiles).toHaveLength(75)
    });
});