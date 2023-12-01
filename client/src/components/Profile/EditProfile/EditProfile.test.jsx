import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import EditProfile from './EditProfile';
import { setNotification } from '../../../redux/slices/notificationSlice';
import { editUser } from '../../../services/userService';
import { setUser } from '../../../redux/slices/userSlice';
import { useLoading } from '../../../hooks/useLoading';
import { vi } from 'vitest';

vi.mock('../../../services/userService.js');
vi.mock('../../../redux/slices/notificationSlice');
vi.mock('../../../redux/slices/userSlice');
vi.mock('../../../hooks/useLoading');

const mockStore = configureMockStore([]);

describe('EditProfile component', () => {
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

    test('renders EditProfile component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/profile/edit']}>
                    <EditProfile />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
});
