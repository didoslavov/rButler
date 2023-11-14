import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: '',
    severity: '',
    open: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload.notification;
            state.severity = action.payload.severity;
            state.open = action.payload.open;
        },
        setNotificationOpen: (state, action) => {
            state.open = action.payload;
        },
        clearNotification: () => initialState,
    },
});

export const { setNotification, setNotificationOpen, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
