import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from './Login';
import store from '../../../redux/store';
import { vi } from 'vitest';
import * as userService from '../../../services/userService.js';

const userServiceWrapper = {
    ...userService,
    login: () => Promise.resolve({ username: 'testuser', avatar: 'testavatar' }),
};

describe('Login Component', () => {
    it('renders the login form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Your return is a delight!')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Forgot password?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    it('handles form submission with valid data', async () => {
        vi.spyOn(userService, 'login').mockImplementation(userServiceWrapper.login);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Username'), { value: 'testuser' });
        fireEvent.change(screen.getByLabelText('Password'), { value: 'testpassword' });

        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        waitFor(() => {
            expect(userService.login).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'testpassword',
            });
        });
    });

    it('displays error message for empty fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        waitFor(() => {
            expect(screen.getByText('All fields are required!')).toBeInTheDocument();
        });
    });

    it('displays error message for login failure', async () => {
        vi.spyOn(userService, 'login').mockRejectedValue(new Error('Login failed'));

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Username'), { value: 'testuser' });
        fireEvent.change(screen.getByLabelText('Password'), { value: 'testpassword' });

        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        waitFor(() => {
            expect(screen.getByText('Login failed')).toBeInTheDocument();
        });
    });

    it('redirects to home page after successful login', async () => {
        vi.spyOn(userService, 'login').mockImplementation(userServiceWrapper.login);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText('Username'), { value: 'testuser' });
        fireEvent.change(screen.getByLabelText('Password'), { value: 'testpassword' });

        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        waitFor(() => {
            expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
        });
    });
});
