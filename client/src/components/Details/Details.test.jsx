import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Details from './Details';
import * as householdsService from '../../services/householdsService.js';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store.js';

vi.mock('../../services/householdsService');

vi.mock('react-hook-form', () => {
    return {
        ...'react-hook-form',
        useForm: vi.fn(),
    };
});

const mockHousehold = {
    _id: '1',
    master: 'ahgiah22gag',
    name: 'Household name 1',
    presentation: 'Household name 1 presentation',
    lists: [{ _id: '1', title: 'test', household: '1' }],
    users: [{ _id: '1', role: 'Master', user: { _id: '1', username: 'Test' } }],
};

describe('Details Component', () => {
    it('renders loading spinner while data is being fetched', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Details />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('renders household details after data is loaded', () => {
        householdsService.getUserHouseholdById.mockResolvedValue(mockHousehold);

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Details />
                </Provider>
            </BrowserRouter>
        );

        act(async () => {
            await screen.findByText('Welcome back to the sanctuary of your residence.');
        });

        waitFor(() => {
            expect(screen.getByText('Welcome back to the sanctuary of your residence.')).toBeInTheDocument();
        });
    });

    it('renders CreateList component when the create form is open', async () => {
        householdsService.getUserHouseholdById.mockResolvedValue(mockHousehold);
        const mockUseForm = vi.fn();
        mockUseForm.mockReturnValue({
            register: vi.fn(),
            handleSubmit: vi.fn(),
        });

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Details />
                </Provider>
            </BrowserRouter>
        );

        waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).toBeNull();
        });

        waitFor(() => {
            expect(screen.getByText('Welcome back to the sanctuary of your residence.')).toBeInTheDocument();
        });

        waitFor(() => {
            fireEvent.click(screen.getByText('Create List'));
        });

        waitFor(() => {
            expect(screen.getByText('Create List')).toBeInTheDocument();
        });

        waitFor(() => {
            fireEvent.click(screen.getByText('Create List'));
        });

        waitFor(() => {
            expect(screen.getByTestId('create-list-form')).toBeInTheDocument();
        });
    });

    it('renders EditHousehold component when the edit form is open', async () => {
        householdsService.getUserHouseholdById.mockResolvedValue(mockHousehold);
        const mockUseForm = vi.fn();
        mockUseForm.mockReturnValue({
            register: vi.fn(),
            handleSubmit: vi.fn(),
        });

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Details />
                </Provider>
            </BrowserRouter>
        );

        householdsService.getUserHouseholdById.mockResolvedValue(mockHousehold);

        await waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).toBeNull();
        });

        waitFor(() => {
            screen.findByText('Welcome back to the sanctuary of your residence.');
        });

        waitFor(() => {
            fireEvent.click(screen.getByText('Edit Household'));
        });

        waitFor(() => {
            expect(screen.getByTestId('edit-household-form')).toBeInTheDocument();
        });
    });
});
