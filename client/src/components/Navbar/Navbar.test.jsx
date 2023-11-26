import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import Navbar from './Navbar';
import store from '../../redux/store';
import { clearUser, setUser } from '../../redux/slices/userSlice.js';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as userService from '../../services/userService.js';

describe('Navbar Component', () => {
    it('renders the Navbar component with user logged in', () => {
        const user = { id: 1, username: 'testUser', avatar: '/test-avatar.jpg' };
        store.dispatch(setUser(user));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Households')).toBeInTheDocument();
        expect(screen.getByText('My Households')).toBeInTheDocument();
        expect(screen.getByText('Create Household')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.getByText('testUser')).toBeInTheDocument();
        expect(screen.getByRole('avatar')).toBeInTheDocument();
    });

    it('renders the Navbar component with user not logged in', () => {
        store.dispatch(clearUser());

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Households')).toBeInTheDocument();
        expect(screen.getByText('Sign')).toBeInTheDocument();
        expect(screen.queryByText('My Households')).not.toBeInTheDocument();
        expect(screen.queryByText('Create Household')).not.toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
        expect(screen.queryByText('testUser')).not.toBeInTheDocument();
        expect(screen.queryByAltText('user avatar')).not.toBeInTheDocument();
    });

    it('handles navigation correctly', () => {
        const user = { id: 1, username: 'testUser', avatar: '/test-avatar.jpg' };
        store.dispatch(setUser(user));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Households'));

        fireEvent.click(screen.getByText('My Households'));
    });

    it('calls onLogout when "Logout" link is clicked', async () => {
        const logoutSpy = vi.spyOn(userService, 'logout').mockResolvedValue({ success: true });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Logout'));

        await screen.findByText('Households');

        expect(logoutSpy).toHaveBeenCalledTimes(1);

        logoutSpy.mockRestore();
    });

    it('navigates to the correct profile page when user avatar is clicked', () => {
        const user = { id: 1, username: 'testUser', avatar: '/test-avatar.jpg' };
        store.dispatch(setUser(user));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('avatar'));
        expect(window.location.pathname).toBe(`/profile`);
    });

    it('renders Search component within Navbar', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('search-component')).toBeInTheDocument();
    });

    it('navigates to the sign-in page when "Sign" link is clicked', () => {
        store.dispatch(clearUser());

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Sign'));
        expect(window.location.pathname).toBe('/profile/auth');
    });

    it('renders user avatar correctly with an avatar', () => {
        const userWithAvatar = {
            username: 'mockUser',
            avatar: 'mockAvatarUrl',
        };

        act(() => {
            store.dispatch(setUser(userWithAvatar));
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByAltText('user avatar')).toHaveAttribute('src', userWithAvatar.avatar);
    });

    it('renders user avatar correctly without an avatar', () => {
        const userWithoutAvatar = {
            user: {
                username: 'mockUserWithoutAvatar',
            },
            isAuthenticated: true,
        };

        act(() => {
            store.dispatch(clearUser());
            store.dispatch(setUser(userWithoutAvatar));
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByRole('avatar')).not.toHaveTextContent();
    });

    it('navigates to the "Create Household" page when the link is clicked', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Create Household'));
        expect(window.location.pathname).toBe('/households/create');
    });
});
