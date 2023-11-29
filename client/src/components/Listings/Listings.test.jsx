import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Listings from './Listings';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const mockStore = configureMockStore([]);

describe('Listings component', () => {
    const initialState = {
        household: { isHouseholdOwner: true },
        user: { user: { _id: 'user123', username: 'testUser' }, isAuthenticated: true },
    };
    const store = mockStore(initialState);

    test('renders lists and create button for household owner', () => {
        render(
            <Provider store={store}>
                <Listings lists={[]} />
            </Provider>
        );
        expect(screen.getByText('Create List')).toBeInTheDocument();
    });

    test('does not render "Create List" button for non-household owner', () => {
        const initialState = {
            user: {},
            household: { isHouseholdOwner: false },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Listings lists={[]} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('Create List')).toBeNull();
    });

    test('renders "Sign in to create a list" link for non-logged-in user', () => {
        const initialState = {
            user: {},
            household: { isHouseholdOwner: true },
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Listings lists={[]} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Sign in to create a list')).toBeInTheDocument();
    });

    test('calls handleShowCreateForm when "Create List" button is clicked for household owner', async () => {
        const initialState = {
            household: { isHouseholdOwner: true },
            user: { user: { _id: 'user123', username: 'testUser' }, isAuthenticated: true },
            setFormVisibility: vi.fn(),
        };

        const store = mockStore(initialState);

        const handleShowCreateFormMock = vi.fn();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Listings lists={[]} handleShowCreateForm={handleShowCreateFormMock} />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Create List'));

        await waitFor(() => {
            expect(store.getActions()).toEqual([vi.mocked(setFormVisibility)({ formType: 'isCreateOpen', value: true })]);
        });
    });
});
