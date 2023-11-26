import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultInfo from './DefaultInfo';

describe('DefaultInfo Component', () => {
    it('renders the default info text', () => {
        render(<DefaultInfo />);

        expect(screen.getByText(/uncharted territory/i)).toBeInTheDocument();
        expect(screen.getByText(/404/i)).toBeInTheDocument();
        expect(screen.getByText(/your digital butler shall guide you/i)).toBeInTheDocument();
        expect(screen.getByText(/prepare a suitable diversion for your journey back home/i)).toBeInTheDocument();
    });

    it('renders the default info with the correct styles', () => {
        render(<DefaultInfo />);

        expect(screen.getByTestId('default-info')).toHaveClass('default-text');
        expect(screen.getByTestId('default-info')).toHaveClass('default-text');
        expect(screen.getByText(/404/i)).toHaveClass('default-text-404');
    });

    it('renders the default info with a border-bottom style on the header', () => {
        render(<DefaultInfo />);

        const header = screen.getByText(/uncharted territory/i);
        expect(header).toHaveClass('border-bottom');
    });

    it('renders the default info with the correct font size for the 404 text', () => {
        render(<DefaultInfo />);

        const text404 = screen.getByText(/404/i);
        expect(text404).toHaveStyle({ fontSize: 'inherit' }); // Adjust the expected font size as needed
    });
});
