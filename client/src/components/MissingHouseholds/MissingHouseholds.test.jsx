import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MissingHouseholds from './MissingHouseholds';

const mockStore = configureStore();

describe('MissingHouseholds component', () => {
    test('renders component with create household button for authenticated user', () => {
        const initialState = {
            user: {
                user: {
                    username: 'testUser',
                    isAuthenticated: true,
                },
            },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MissingHouseholds />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/no households/i)).toBeInTheDocument();
        expect(screen.getByText(/create household/i)).toBeInTheDocument();
    });

    test('renders component with sign-in button for unauthenticated user', () => {
        const initialState = {
            user: { user: null },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MissingHouseholds />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/no households/i)).toBeInTheDocument();
        expect(screen.getByText(/sign in to create household/i)).toBeInTheDocument();
    });

    test('clicking create household button navigates to /households/create for authenticated user', () => {
        const initialState = {
            user: {
                user: {
                    /* user data */
                },
            },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MissingHouseholds />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText(/create household/i));

        expect(window.location.pathname).toBe('/households/create');
    });

    test('clicking sign-in button navigates to /profile/auth for unauthenticated user', () => {
        const initialState = {
            user: { user: null },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MissingHouseholds />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText(/sign in to create household/i));

        expect(window.location.pathname).toBe('/profile/auth');
    });
});
