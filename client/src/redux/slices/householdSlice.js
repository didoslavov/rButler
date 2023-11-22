import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isHouseholdOwner: false,
    isMemberInHousehold: false,
};

const householdSlice = createSlice({
    name: 'household',
    initialState,
    reducers: {
        setIsHouseholdOwner(state, action) {
            state.isHouseholdOwner = action.payload;
        },
        setIsMemberInHousehold(state, action) {
            state.isMemberInHousehold = action.payload;
        },
    },
});

export const { setIsHouseholdOwner, setIsMemberInHousehold } = householdSlice.actions;
export default householdSlice.reducer;
