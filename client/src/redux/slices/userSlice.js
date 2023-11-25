import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('userData');

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!storedUser,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem('userData', JSON.stringify(action.payload));
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            localStorage.removeItem('userData');
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
