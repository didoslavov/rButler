import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Notification from './Notification';
import { clearNotification } from '../../redux/slices/notificationSlice';

const mockStore = configureMockStore([]);

describe('Notification component', () => {
    test('renders Notification component with provided message and severity', async () => {
        const initialState = {
            notification: {
                open: true,
                message: ['Test notification message'],
                severity: 'success',
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <Notification open={true} message={['Test notification message']} severity="success" />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test notification message')).toBeInTheDocument();
        });
    });

    test('clears notification when close button is clicked', async () => {
        const initialState = {
            notification: {
                open: true,
                message: ['Test notification message'],
                severity: 'success',
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <Notification open={true} message={['Test notification message']} severity="success" />
            </Provider>
        );

        fireEvent.click(screen.getByTestId('CloseIcon'));

        await waitFor(() => {
            expect(store.getActions()).toEqual([clearNotification()]);
        });
    });

    test('does not clear notification on clickaway', async () => {
        const initialState = {
            notification: {
                open: true,
                message: ['Test notification message'],
                severity: 'success',
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <Notification open={true} message={['Test notification message']} severity="success" />
            </Provider>
        );

        await waitFor(() => {
            expect(store.getActions()).toEqual([]);
        });
    });

    test('does not render Notification component when closed', () => {
        const initialState = {
            notification: {
                open: false,
                message: ['Test notification message'],
                severity: 'success',
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <Notification open={true} message={['Test notification message']} severity="success" />
            </Provider>
        );

        expect(screen.queryByTestId('notification')).toBeNull();
    });
});
