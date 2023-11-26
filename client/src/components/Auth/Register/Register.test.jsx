import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Register from './Register';
import store from '../../../redux/store';
import { vi } from 'vitest';
import * as userService from '../../../services/userService.js';

const userServiceWrapper = {
    ...userService,
    userRegister: () => Promise.resolve({ username: 'testuser', avatar: 'testavatar' }),
};

describe('Register Component', () => {
    it('renders the registration form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Step inside, dear newcomer!')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Choose Avatar')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });

    it('handles form submission with valid data', async () => {
        vi.spyOn(userService, 'userRegister').mockImplementation(userServiceWrapper.userRegister);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'testemail@example.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
            fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'testpassword' } });

            fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
            expect(userService.userRegister).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'testemail@example.com',
                password: 'testpassword',
                repass: 'testpassword',
                avatar: '',
            });
        });
    });

    it('displays error message for empty fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

            expect(screen.getByText('All fields are required!')).toBeInTheDocument();
        });
    });

    it('displays error message for registration failure', async () => {
        vi.spyOn(userService, 'userRegister').mockRejectedValue(new Error('Registration failed'));

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'testemail@example.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
            fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'testpassword' } });

            fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

            expect(screen.getByText('Registration failed')).toBeInTheDocument();
        });
    });

    it('redirects to home page after successful login', async () => {
        vi.spyOn(userService, 'userRegister').mockImplementation(userServiceWrapper.userRegister);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'testemail@example.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
            fireEvent.change(screen.getByLabelText('Repeat Password'), { target: { value: 'testpassword' } });

            fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

            expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
        });
    });
});
