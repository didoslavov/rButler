import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isHouseholdOwner: false,
};

const householdSlice = createSlice({
    name: 'household',
    initialState,
    reducers: {
        setIsHouseholdOwner(state, action) {
            state.isHouseholdOwner = action.payload;
        },
    },
});

export const { setIsHouseholdOwner } = householdSlice.actions;
export default householdSlice.reducer;
