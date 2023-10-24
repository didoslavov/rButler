import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import notificationSlice from './slices/notificationSlice';
import formVisibilitySlice from './slices/formVisibilitySlice.js';

const store = configureStore({
    reducer: {
        user: userSlice,
        notification: notificationSlice,
        formVisibility: formVisibilitySlice,
    },
});

export default store;
