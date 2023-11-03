import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import notificationSlice from './slices/notificationSlice';
import formVisibilitySlice from './slices/formVisibilitySlice.js';
import householdSlice from './slices/householdSlice.js';
import weatherSlice from './slices/weatherSlice.js';

const store = configureStore({
    reducer: {
        user: userSlice,
        notification: notificationSlice,
        formVisibility: formVisibilitySlice,
        household: householdSlice,
        weather: weatherSlice,
    },
});

export default store;
