import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import { setNotification } from '../../../redux/slices/notificationSlice';
import { resetPassword } from '../../../services/userService';
import { setUser } from '../../../redux/slices/userSlice';
import { useLoading } from '../../../hooks/useLoading';
import { vi } from 'vitest';

vi.mock('../../../services/userService.js', async (importOriginal) => {
    const actual = await importOriginal();

    return {
        ...actual,
        resetPassword: vi.fn(),
    };
});
vi.mock('../../../redux/slices/notificationSlice');
vi.mock('../../../redux/slices/userSlice');
vi.mock('../../../hooks/useLoading');

const mockStore = configureMockStore([]);

describe('ChangePassword component', () => {
    const user = { id: 'user123' };
    const initialState = {
        user: { user },
        notification: {},
    };
    const store = mockStore(initialState);

    beforeEach(() => {
        vi.clearAllMocks();
        useLoading.mockReturnValue([false, vi.fn()]);
    });

    test('renders ChangePassword component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/profile/edit']}>
                    <ChangePassword />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Change Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Old Password')).toBeInTheDocument();
        expect(screen.getByLabelText('New Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    });
});
