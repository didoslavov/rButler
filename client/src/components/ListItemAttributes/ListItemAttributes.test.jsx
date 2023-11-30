import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListItemAttributes from './ListItemAttributes';
import { beforeEach, vi } from 'vitest';

describe('ListItemAttributes component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockHandleCheckItem = vi.fn();

    test('renders ListItemAttributes component', () => {
        render(<ListItemAttributes itemId="item123" handleCheckItem={mockHandleCheckItem} />);

        const divider = screen.getByTestId('divider');
        expect(divider).toBeInTheDocument();

        const iconButton = screen.getByLabelText('delete');
        expect(iconButton).toBeInTheDocument();
    });

    test('calls handleCheckItem when IconButton is clicked', () => {
        render(<ListItemAttributes itemId="item123" handleCheckItem={mockHandleCheckItem} />);

        fireEvent.click(screen.getByLabelText('delete'));

        expect(mockHandleCheckItem).toHaveBeenCalledWith('item123');
    });

    test('does not call handleCheckItem when IconButton is not clicked', () => {
        render(<ListItemAttributes itemId="item123" handleCheckItem={mockHandleCheckItem} />);

        expect(mockHandleCheckItem).not.toHaveBeenCalled();
    });
});
