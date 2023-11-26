import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Auth from './Auth';
import store from '../../redux/store';
import { afterEach, vi } from 'vitest';
import { createMemoryHistory } from 'history';
import * as userService from '../../services/userService.js';

const userServiceWrapper = {
    ...userService,
    login: () => Promise.resolve({ username: 'testuser', avatar: 'testavatar' }),
    userRegister: () => Promise.resolve({ username: 'testuser', avatar: 'testavatar' }),
};

describe('Auth Component', () => {
    it('renders the Auth component with Login form by default', () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Your return is a delight!')).toBeInTheDocument();
        expect(screen.getAllByText('Username')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Password')[0]).toBeInTheDocument();
        expect(screen.getByText('Forgot password?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();

        waitFor(() => {
            expect(screen.queryByText('Step inside, dear newcomer!')).toBeNull();
        });
    });

    it('renders the Register form after clicking on the "Sign Up" button', () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getAllByText('Sign Up')[0]);

        expect(screen.getByText('Step inside, dear newcomer!')).toBeInTheDocument();
        expect(screen.getAllByText('Username')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getAllByText('Password')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Choose Avatar')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();

        waitFor(() => {
            expect(screen.queryByText('Your return is a delight!')).toBeNull();
        });
    });

    it('renders the Login form after clicking on the "Sign In" button', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getAllByText('Sign Up')[0]);

        fireEvent.click(screen.getAllByText('Sign In')[0]);

        expect(screen.getByText('Your return is a delight!')).toBeInTheDocument();
        expect(screen.getAllByText('Username')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Password')[0]).toBeInTheDocument();
        expect(screen.getByText('Forgot password?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();

        waitFor(() => {
            expect(screen.queryByText('Step inside, dear newcomer!')).toBeNull();
        });
    });

    it('handles form submission with valid data for Login', async () => {
        vi.spyOn(userService, 'login').mockImplementation(userServiceWrapper.login);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getAllByText('Username')[0], { value: 'testuser' });
        fireEvent.change(screen.getAllByText('Password')[0], { value: 'testpassword' });

        fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        waitFor(() => {
            expect(userService.login).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'testpassword',
            });
        });
    });

    it('handles form submission with valid data for Register', async () => {
        vi.spyOn(userService, 'userRegister').mockImplementation(userServiceWrapper.userRegister);

        render(
            <Provider store={store}>
                <BrowserRouter history={createMemoryHistory()}>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getAllByText('Username')[0], { value: 'testuser' });
        fireEvent.change(screen.getByLabelText('Email'), { value: 'test@email.com' });
        fireEvent.change(screen.getAllByText('Password')[0], { value: 'testpassword' });
        fireEvent.change(screen.getByLabelText('Repeat Password'), { value: 'testpassword' });

        fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
        fireEvent.click(screen.getAllByText('Sign Up')[0]);

        waitFor(() => {
            expect(userService.userRegister).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'test@email.com',
                password: 'testpassword',
                repass: 'testpassword',
                avatar: '',
            });
        });
    });
});
