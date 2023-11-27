import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import EditHousehold from './EditHousehold';
import store from '../../redux/store'; // Import your Redux store
import { Provider } from 'react-redux';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';
import { updateHousehold } from '../../services/householdsService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';

// Mocking householdsService module
vi.mock('../../services/householdsService', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        updateHousehold: vi.fn(async (data, id) => ({
            success: 'Household updated successfully!',
        })),
        deleteHousehold: vi.fn(async () => {}),
    };
});

// Mocking notificationSlice module
vi.mock('../../redux/slices/notificationSlice', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        setNotification: vi.fn(),
        setNotificationOpen: vi.fn(),
        clearNotification: vi.fn(),
    };
});

// Mocking formVisibilitySlice module
vi.mock('../../redux/slices/formVisibilitySlice', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        setFormVisibility: vi.fn(),
    };
});

const mockHousehold = {
    _id: 'household-id',
    name: 'Test Household',
    presentation: 'Test presentation',
};

describe('EditHousehold component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders EditHousehold component with the provided household data', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <EditHousehold household={mockHousehold} handleUpdateHousehold={vi.fn()} />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getAllByText('Edit Household')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('Household name')).toHaveValue('Test Household');
        expect(screen.getByLabelText('Presentation')).toHaveValue('Test presentation');
    });

    // it('closes the edit form when close button is clicked', () => {
    //     render(
    //         <BrowserRouter>
    //             <Provider store={store}>
    //                 <EditHousehold household={mockHousehold} handleUpdateHousehold={vi.fn()} />
    //             </Provider>
    //         </BrowserRouter>
    //     );

    //     fireEvent.click(screen.getByLabelText('close'));

    //     waitFor(() => {
    //         expect(vi.mocked(setFormVisibility)).toHaveBeenCalledWith({
    //             formType: 'isEditOpen',
    //             value: false,
    //         });
    //     });
    // });

    it('calls handleAlertModal when delete button is clicked', async () => {
        const mockHandleAlertModal = vi.fn();

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <EditHousehold household={mockHousehold} handleUpdateHousehold={vi.fn()} />
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Delete'));

        waitFor(() => {
            expect(mockHandleAlertModal).toHaveBeenCalled();
        });
    });

    it('calls handleDelete when confirm button is clicked in AlertDialog', async () => {
        const mockHandleDelete = vi.fn();

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <EditHousehold household={mockHousehold} handleUpdateHousehold={vi.fn()} />
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Delete'));

        waitFor(() => {
            expect(mockHandleDelete).toHaveBeenCalled();
            expect(vi.householdsService.deleteHousehold).toHaveBeenCalledWith('household-id');
        });
    });

    // it('calls handleUpdate on form submission with valid data', async () => {
    //     const mockHandleUpdate = vi.fn();

    //     render(
    //         <BrowserRouter>
    //             <Provider store={store}>
    //                 <EditHousehold household={mockHousehold} handleUpdateHousehold={mockHandleUpdate} />
    //             </Provider>
    //         </BrowserRouter>
    //     );

    //     fireEvent.change(screen.getByLabelText('Household name'), { target: { value: 'Updated Household' } });
    //     fireEvent.change(screen.getByLabelText('Presentation'), { target: { value: 'Updated presentation' } });

    //     await act(async () => {
    //         fireEvent.submit(screen.getAllByText('Edit Household')[0]);
    //     });

    //     waitFor(() => {
    //         expect(vi.mocked(updateHousehold)).toHaveBeenCalledWith(
    //             { name: 'Updated Household', presentation: 'Updated presentation' },
    //             'household-id'
    //         );

    //         expect(vi.mocked(setNotification)).toHaveBeenCalledWith({
    //             notification: ['Household updated successfully!'],
    //             severity: 'success',
    //             open: true,
    //         });
    //     });

    //     waitFor(() => {
    //         expect(mockHandleUpdate).toHaveBeenCalled();
    //     });
    // });
});
