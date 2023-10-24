import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import notificationSlice from './slices/notificationSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        notification: notificationSlice,
    },
});

export default store;
