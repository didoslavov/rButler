import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AlertDialog from './AlertDialog.jsx';

const defaultProps = {
    open: true,
    handleClose: vi.fn(),
    handleDelete: vi.fn(),
    message: 'Confirmation Message',
};

describe('AlertDialog Component', () => {
    it('renders the AlertDialog component with proper message', () => {
        render(<AlertDialog {...defaultProps} />);
        expect(screen.getByText('Confirmation Message')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to do this ?')).toBeInTheDocument();
    });

    it('calls handleClose function when "Disagree" button is clicked', () => {
        render(<AlertDialog {...defaultProps} />);
        fireEvent.click(screen.getByText('Disagree'));
        expect(defaultProps.handleClose).toHaveBeenCalled();
    });

    it('calls handleDelete function when "Agree" button is clicked', () => {
        render(<AlertDialog {...defaultProps} />);
        fireEvent.click(screen.getByText('Agree'));
        expect(defaultProps.handleDelete).toHaveBeenCalled();
    });

    it('renders the AlertDialog component with different message', () => {
        render(<AlertDialog {...defaultProps} message="Different Message" />);
        expect(screen.getByText('Different Message')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to do this ?')).toBeInTheDocument();
    });

    it('does not render the AlertDialog component when open is false', () => {
        render(<AlertDialog {...defaultProps} open={false} />);
        expect(screen.queryByText('Confirmation Message')).toBeNull();
        expect(screen.queryByText('Are you sure you want to do this ?')).toBeNull();
    });
});
