import React from 'react';
import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AllHouseholds from './AllHouseholds';
import store from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';
import * as householdsService from '../../services/householdsService';
import { vi } from 'vitest';
import Navbar from '../Navbar/Navbar.jsx';

describe('AllHouseholds Component', () => {
    it('renders AllHouseholds component with all households', async () => {
        const getAllHouseholdsSpy = vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([
            { _id: 1, name: 'Household 1' },
            { _id: 2, name: 'Household 2' },
        ]);

        const mockUser = { user: { username: 'someUserName', avatar: 'someAvatar' }, isAuthenticated: true };
        store.dispatch(setUser(mockUser));

        await act(async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <AllHouseholds />
                    </BrowserRouter>
                </Provider>
            );
        });

        expect(screen.getByText('Household 1')).toBeInTheDocument();
        expect(screen.getByText('Household 2')).toBeInTheDocument();

        expect(getAllHouseholdsSpy).toHaveBeenCalledWith('');

        getAllHouseholdsSpy.mockRestore();
    });

    it('renders AllHouseholds component with search results', async () => {
        const getAllHouseholdsSpy = vi
            .spyOn(householdsService, 'getAllHouseholds')
            .mockResolvedValue([{ _id: 1, name: 'Search Result Household' }]);

        const mockUser = { user: { username: 'someUserName', avatar: 'someAvatar' }, isAuthenticated: true };
        store.dispatch(setUser(mockUser));

        Object.defineProperty(window, 'location', {
            value: {
                search: '?query=searchTerm',
            },
        });

        await act(async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <AllHouseholds />
                    </BrowserRouter>
                </Provider>
            );
        });

        expect(screen.getByText('Search Result Household')).toBeInTheDocument();

        expect(getAllHouseholdsSpy).toHaveBeenCalledWith('searchTerm');

        getAllHouseholdsSpy.mockRestore();
    });

    it('renders AllHouseholds component with no households', async () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByText(/Regrettably, it appears that no households/)).toBeInTheDocument();
        });
    });

    it('renders AllHouseholds component with a single household', async () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([
            {
                _id: '1',
                name: 'Single Household Name',
                presentation: 'Presentation of Single Household',
                master: { username: 'MasterUser' },
            },
        ]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByText('Single Household Name')).toBeInTheDocument();
            expect(screen.getByText('Presentation of Single Household')).toBeInTheDocument();
            expect(screen.getByText('MasterUser')).toBeInTheDocument();
        });
    });

    it('renders AllHouseholds component with multiple households', () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([
            {
                _id: '1',
                name: 'Household Name 1',
                presentation: 'Presentation of Household 1',
                master: { username: 'MasterUser' },
            },
            {
                _id: '2',
                name: 'Household Name 2',
                presentation: 'Presentation of Household 2',
                master: { username: 'MasterUser' },
            },
        ]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByText('Household Name 1')).toBeInTheDocument();
            expect(screen.getByText('Household Name 2')).toBeInTheDocument();
        });
    });

    it('renders pagination component', () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([
            {
                _id: '1',
                name: 'Household Name 1',
                presentation: 'Presentation of Household 1',
                master: { username: 'MasterUser' },
            },
            {
                _id: '2',
                name: 'Household Name 2',
                presentation: 'Presentation of Household 2',
                master: { username: 'MasterUser' },
            },
        ]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByRole('pagination')).toBeInTheDocument();
        });
    });

    it('handles pagination correctly', () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([
            {
                _id: '1',
                name: 'Household Name 1',
                presentation: 'Presentation of Household 1',
                master: { username: 'MasterUser' },
            },
            {
                _id: '2',
                name: 'Household Name 2',
                presentation: 'Presentation of Household 2',
                master: { username: 'MasterUser' },
            },
            {
                _id: '3',
                name: 'Household Name 3',
                presentation: 'Presentation of Household 3',
                master: { username: 'MasterUser' },
            },
            {
                _id: '4',
                name: 'Household Name 4',
                presentation: 'Presentation of Household 4',
                master: { username: 'MasterUser' },
            },
            {
                _id: '5',
                name: 'Household Name 5',
                presentation: 'Presentation of Household 5',
                master: { username: 'MasterUser' },
            },
        ]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByText('2'));

            expect(screen.getByText('Household Name 11')).toBeInTheDocument();
        });
    });

    it('renders loading spinner while fetching data', async () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([
            {
                _id: '1',
                name: 'Household Name 1',
                presentation: 'Presentation of Household 1',
                master: { username: 'MasterUser' },
            },
        ]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'));

        expect(screen.getByText('Household Name 1')).toBeInTheDocument();
    });

    it('renders correctly when a search query is provided', async () => {
        const mockHouseholds = [
            {
                _id: '1',
                name: 'Household Name 1',
                presentation: 'Presentation of Household 1',
                master: { username: 'MasterUser' },
            },
            {
                _id: '2',
                name: 'Household Name 2',
                presentation: 'Presentation of Household 2',
                master: { username: 'MasterUser' },
            },
        ];

        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue(mockHouseholds);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar>
                        <AllHouseholds />
                    </Navbar>
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByText('Household Name 1')).toBeInTheDocument();
            expect(screen.getByText('Household Name 2')).toBeInTheDocument();
        });

        const searchInput = screen.getByTestId('search-component');
        fireEvent.change(searchInput, { value: 'Household Name 1' });

        waitFor(() => {
            expect(screen.getByText('Household Name 1')).toBeInTheDocument();
            expect(screen.queryByText('Household Name 2')).not.toBeInTheDocument();
        });
    });

    it('renders a message when there are no households', async () => {
        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue([]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            const emptyStateMessage = screen.getByText(
                /Regrettably, it appears that no households have been created under your esteemed account./i
            );
            expect(emptyStateMessage).toBeInTheDocument();

            expect(screen.getByText(/Create household/i)).toBeInTheDocument();
        });
    });

    it('navigates to the correct household details page when clicked', async () => {
        const mockHouseholds = [
            {
                _id: '1',
                name: 'Household Name 1',
                presentation: 'Presentation of Household 1',
                master: { username: 'MasterUser' },
            },
        ];

        vi.spyOn(householdsService, 'getAllHouseholds').mockResolvedValue(mockHouseholds);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllHouseholds />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByText('Household Name 1'));
            expect(window.location.pathname).toBe('/households/details/1');
        });
    });
});
