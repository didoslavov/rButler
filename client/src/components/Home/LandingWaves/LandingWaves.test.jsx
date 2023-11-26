import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingWaves from './LandingWaves';

describe('LandingWaves Component', () => {
    it('renders the component without errors', () => {
        render(<LandingWaves />);
    });

    it('renders the correct number of air elements', () => {
        render(<LandingWaves />);

        const airElements = screen.getAllByTestId(/air/i);
        expect(airElements).toHaveLength(4);
    });

    it('renders air elements with the correct class names', () => {
        render(<LandingWaves />);

        const airElements = screen.getAllByTestId(/air/i);

        airElements.forEach((airElement, index) => {
            expect(airElement).toHaveClass(`air air${index + 1}`);
        });
    });
});
