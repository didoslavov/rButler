import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import store from '../../redux/store.js';
import { clearUser, setUser } from '../../redux/slices/userSlice.js';
import { beforeEach } from 'vitest';

describe('Home Component', () => {
    beforeEach(() => {
        store.dispatch(clearUser());

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );
    });

    it('renders the component with the correct content', () => {
        const titleElement = screen.getByText(/Welcome home!/i);
        expect(titleElement).toBeInTheDocument();

        const learnMoreButton = screen.getByText(/Learn More/i);
        expect(learnMoreButton).toBeInTheDocument();

        if (store.getState().user.user) {
            const myHouseholdsButton = screen.getByText(/My households/i);
            expect(myHouseholdsButton).toBeInTheDocument();
        }
    });

    it('renders the LandingWaves component', async () => {
        await waitFor(() => {
            const landingWaves = screen.getByTestId('landing-waves');
            expect(landingWaves).toBeInTheDocument();
        });
    });

    it('navigates to the Learn More page when Learn More button is clicked', () => {
        const learnMoreButton = screen.getByText(/Learn More/i);
        fireEvent.click(learnMoreButton);

        expect(window.location.pathname).toBe('/learn-more');
    });

    it('displays "My Households" button when a user is logged in', async () => {
        act(() => {
            store.dispatch(
                setUser({
                    user: { username: 'dido', email: 'dido@abv.bg' },
                    isAuthenticated: true,
                })
            );
        });

        const myHouseholdsButton = await screen.findByText(/My households/i);
        expect(myHouseholdsButton).toBeInTheDocument();
    });

    it('does not display "My Households" button when no user is logged in', () => {
        act(() => {
            store.dispatch(clearUser());
        });

        const myHouseholdsButton = screen.queryByText(/My households/i);
        expect(myHouseholdsButton).toBeNull();
    });

    it('navigates to the correct destination when Learn More button is clicked', () => {
        const learnMoreButton = screen.getByText(/Learn More/i);
        fireEvent.click(learnMoreButton);

        expect(window.location.pathname).toBe('/learn-more');
    });

    it('renders the image with the correct alt text', () => {
        const image = screen.getByAltText('Welcome Home - rButler');
        expect(image).toBeInTheDocument();
    });

    it('renders the correct textual content', () => {
        const welcomeText = screen.getByText(/Welcome home!/i);
        const introText = screen.getByText(/Allow me to introduce myself:/i);

        expect(welcomeText).toBeInTheDocument();
        expect(introText).toBeInTheDocument();
    });

    it('renders user-specific content when a user is logged in', async () => {
        act(() => {
            store.dispatch(
                setUser({
                    user: { username: 'dido', email: 'dido@abv.bg' },
                    isAuthenticated: true,
                })
            );
        });

        const userSpecificElement = await screen.findByText(/My Households/i);
        expect(userSpecificElement).toBeInTheDocument();
    });
});
