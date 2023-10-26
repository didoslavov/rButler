import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('userData');
const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem('userData', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        logoutUser(state) {
            localStorage.removeItem('userData');
            state.user = null;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
