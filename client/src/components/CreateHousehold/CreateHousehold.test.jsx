import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateHousehold from './CreateHousehold';
import store from '../../redux/store';
import * as householdsService from '../../services/householdsService';
import { vi } from 'vitest';

const householdsServiceWrapper = {
    ...householdsService,
    createHousehold: vi.fn(),
};

describe('CreateHousehold Component', () => {
    it('renders the create household form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Welcome, esteemed guest, to the creation of your digital household.')).toBeInTheDocument();
        expect(screen.getByLabelText('Household name')).toBeInTheDocument();
        expect(screen.getByLabelText('Presentation')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Household' })).toBeInTheDocument();
    });

    it('handles form submission with valid data', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'Test Household' } });
        fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'Test Presentation' } });

        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(householdsService.createHousehold).toHaveBeenCalledWith({
                name: 'Test Household',
                presentation: 'Test Presentation',
                master: '1',
            });
        });
    });

    it('displays error message for empty fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('All fields are required!')).toBeInTheDocument();
        });
    });

    it('displays error message for household creation failure', async () => {
        householdsServiceWrapper.createHousehold.mockRejectedValue(new Error('Household creation failed'));

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'Test Household' } });
        fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'Test Presentation' } });

        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('Household creation failed')).toBeInTheDocument();
        });
    });

    it('redirects to the household page after successful creation', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'Test Household' } });
        fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'Test Presentation' } });

        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('Welcome to Test Household!')).toBeInTheDocument();
        });
    });

    it('displays notification for successful creation', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'Test Household' } });
        fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'Test Presentation' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('Household created successfully!')).toBeInTheDocument();
        });
    });

    it('displays error message for empty fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('All fields are required!')).toBeInTheDocument();
        });
    });

    it('displays error message for short household name', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'ab' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('Household name must be at least 3 characters long!')).toBeInTheDocument();
        });
    });

    it('displays error message for short presentation', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'abcd' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText('Presentation must be at least 5 characters long!')).toBeInTheDocument();
        });
    });

    it('handles error from createHousehold function', async () => {
        const errorMessage = 'Household creation failed';
        vi.spyOn(householdsService, 'createHousehold').mockRejectedValue(new Error(errorMessage));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreateHousehold />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'Test Household' } });
        fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'Test Presentation' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create Household' }));

        waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
});
