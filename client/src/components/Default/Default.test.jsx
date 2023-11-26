import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Default from './Default';

describe('Default Component', () => {
    it('renders default inscription and info components', () => {
        render(
            <Router>
                <Default />
            </Router>
        );

        expect(screen.getByTestId('default-inscription')).toBeInTheDocument();
        expect(screen.getByTestId('default-info')).toBeInTheDocument();
    });

    it('renders a link back to the home page', () => {
        render(
            <Router>
                <Default />
            </Router>
        );

        expect(screen.getByRole('link', { name: 'Back Home' })).toBeInTheDocument();
    });

    it('navigates to the home page when the link is clicked', () => {
        render(
            <Router>
                <Default />
            </Router>
        );

        const link = screen.getByRole('link', { name: 'Back Home' });
        link.click();

        expect(window.location.pathname).toBe('/');
    });
});
