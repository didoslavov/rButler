import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateList from './CreateList';
import store from '../../redux/store';
import { vi } from 'vitest';
import * as listsService from '../../services/listsService.js';

const listsServiceWrapper = {
    ...listsService,
    createList: () =>
        Promise.resolve({ id: '123', title: 'Test List', type: 'shopping', createdBy: 'user123', household: 'house123' }),
};

describe('CreateList Component', () => {
    it('renders the create list form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateList householdId="house123" setLists={() => {}} lists={[]} />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Create List')).toBeInTheDocument();
        expect(screen.getByLabelText('List Name')).toBeInTheDocument();
        expect(screen.getByLabelText('List Type')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'CREATE' })).toBeInTheDocument();
    });

    it('handles form submission with valid data', async () => {
        vi.spyOn(listsService, 'createList').mockImplementation(listsServiceWrapper.createList);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateList householdId="house123" setLists={() => {}} lists={[]} />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('List Name'), { target: { value: 'Test List' } });

        fireEvent.click(screen.getByRole('button', { name: 'CREATE' }));

        waitFor(() => {
            expect(listsService.createList).toHaveBeenCalledWith({
                title: 'Test List',
                type: 'shopping',
                createdBy: 'user123',
                household: 'house123',
            });
        });
    });

    it('displays error message for empty fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateList householdId="house123" setLists={() => {}} lists={[]} />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: 'CREATE' }));

            expect(screen.getByText('All fields are required!')).toBeInTheDocument();
        });
    });

    it('updates list type when selected', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateList householdId="house123" setLists={() => {}} lists={[]} />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('List Type'), { value: 'todo' });

        waitFor(() => {
            expect(screen.getByLabelText('List Type')).toHaveValue('todo');
        });
    });

    it('closes the form when close button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateList householdId="house123" setLists={() => {}} lists={[]} />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('close'));

        waitFor(() => {
            expect(screen.queryByText('Create List')).not.toBeInTheDocument();
        });
    });

    it('calls setLists with updated lists after successful list creation', async () => {
        const setListsMock = vi.fn();

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <CreateList householdId="house123" setLists={setListsMock} lists={[]} />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('List Name'));

        fireEvent.click(screen.getByRole('button', { name: 'CREATE' }));

        waitFor(() => {
            expect(setListsMock).toHaveBeenCalledWith([
                { id: '123', title: 'Test List', type: 'shopping', createdBy: 'user123', household: 'house123' },
            ]);
        });
    });
});
