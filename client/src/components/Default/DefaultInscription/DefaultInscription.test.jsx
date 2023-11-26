import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultInscription from './DefaultInscription';

describe('DefaultInscription Component', () => {
    it('renders the default inscription elements', () => {
        render(<DefaultInscription />);

        expect(screen.getByTestId('default-inscription')).toBeInTheDocument();
        expect(screen.getAllByText(/4/)[0]).toBeInTheDocument();
        expect(screen.getByTestId('eyes')).toBeInTheDocument();
        expect(screen.getByTestId('rosyCheeks')).toBeInTheDocument();
        expect(screen.getByTestId('mouth')).toBeInTheDocument();
    });

    it('renders the default inscription with the correct structure', () => {
        render(<DefaultInscription />);

        expect(screen.getByTestId('default-inscription')).toHaveClass('error');
        expect(screen.getAllByText(/4/)).toHaveLength(2);
        expect(screen.getByTestId('illustration')).toBeInTheDocument();
        expect(screen.getByTestId('circle')).toBeInTheDocument();
        expect(screen.getByTestId('clip')).toBeInTheDocument();
    });
});
