import { render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { getUserHouseholds } from '../../services/householdsService.js';
import MyHouseholds from './MyHouseholds';
import { vi } from 'vitest';

const mockStore = configureMockStore([]);

vi.mock('../../services/householdsService.js');

async function wait(ms = 0) {
    vi.useFakeTimers();

    await act(async () => {
        vi.advanceTimersByTime(ms);

        await Promise.resolve();
    });
}

describe('MyHouseholds component', () => {
    test('renders loading spinner while fetching households', async () => {
        // Mock the asynchronous operation
        getUserHouseholds.mockResolvedValueOnce([]);

        const store = mockStore({ user: { user: { id: 'user123', token: 'token123' } } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MyHouseholds />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        });
    });

    test('renders households when data is fetched', async () => {
        const mockHouseholds = [
            { id: 'household1', name: 'Household 1' },
            { id: 'household2', name: 'Household 2' },
        ];

        getUserHouseholds.mockResolvedValueOnce(mockHouseholds);

        const store = mockStore({ user: { user: { id: 'user123', token: 'token123' } } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MyHouseholds />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            mockHouseholds.forEach((household) => {
                expect(screen.getByText(household.name)).toBeInTheDocument();
            });
        });
    });

    test('renders pagination component when there are multiple pages', async () => {
        const mockHouseholds = Array.from({ length: 10 }, (_, index) => ({
            id: `household${index + 1}`,
            name: `Household ${index + 1}`,
        }));

        getUserHouseholds.mockResolvedValueOnce(mockHouseholds);

        const store = mockStore({ user: { user: { id: 'user123', token: 'token123' } } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MyHouseholds />
                </MemoryRouter>
            </Provider>
        );

        // Wait for the component to render
        await waitFor(() => {
            expect(screen.getByTestId('pagination-component')).toBeInTheDocument();
        });
    });
});
