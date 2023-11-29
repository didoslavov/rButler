import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ListActionIcons from './ListActionIcons';
import { vi } from 'vitest';

const mockStore = configureStore();

describe('ListActionIcons component', () => {
    test('renders component with back button', () => {
        const initialState = {
            household: { isHouseholdOwner: true }, // Assuming the user is the household owner
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListActionIcons handleGoBack={() => {}} handleClickDelete={() => {}} />
                </MemoryRouter>
            </Provider>
        );

        // Check if the back button is rendered
        expect(screen.getByLabelText(/back/i)).toBeInTheDocument();
    });

    test('renders delete button for household owner', () => {
        const initialState = {
            household: { isHouseholdOwner: true }, // Assuming the user is the household owner
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListActionIcons handleGoBack={() => {}} handleClickDelete={() => {}} />
                </MemoryRouter>
            </Provider>
        );

        // Check if the delete button is rendered for the household owner
        expect(screen.getByLabelText(/delete/i)).toBeInTheDocument();
    });

    test('does not render delete button for non-household owner', () => {
        const initialState = {
            household: { isHouseholdOwner: false }, // Assuming the user is not the household owner
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListActionIcons handleGoBack={() => {}} handleClickDelete={() => {}} />
                </MemoryRouter>
            </Provider>
        );

        // Check if the delete button is not rendered for a non-household owner
        expect(screen.queryByLabelText(/delete/i)).toBeNull();
    });

    test('clicking back button calls handleGoBack function', () => {
        const handleGoBackMock = vi.fn();

        const initialState = {
            household: { isHouseholdOwner: true }, // Assuming the user is the household owner
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListActionIcons handleGoBack={handleGoBackMock} handleClickDelete={() => {}} />
                </MemoryRouter>
            </Provider>
        );

        // Click the back button
        fireEvent.click(screen.getByLabelText(/back/i));

        // Check if the handleGoBack function is called
        expect(handleGoBackMock).toHaveBeenCalled();
    });

    test('clicking delete button calls handleClickDelete function for household owner', () => {
        const handleClickDeleteMock = vi.fn();

        const initialState = {
            household: { isHouseholdOwner: true }, // Assuming the user is the household owner
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListActionIcons handleGoBack={() => {}} handleClickDelete={handleClickDeleteMock} />
                </MemoryRouter>
            </Provider>
        );

        // Click the delete button
        fireEvent.click(screen.getByLabelText(/delete/i));

        // Check if the handleClickDelete function is called for the household owner
        expect(handleClickDeleteMock).toHaveBeenCalled();
    });

    test('clicking delete button does not call handleClickDelete function for non-household owner', () => {
        const handleClickDeleteMock = vi.fn();

        const initialState = {
            household: { isHouseholdOwner: false },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListActionIcons handleGoBack={() => {}} handleClickDelete={handleClickDeleteMock} />
                </MemoryRouter>
            </Provider>
        );

        const deleteButton = screen.queryByLabelText(/delete/i);

        if (deleteButton) {
            fireEvent.click(deleteButton);
        }

        expect(handleClickDeleteMock).not.toHaveBeenCalled();
    });
});
