import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isEditOpen: false,
    isCreateOpen: false,
    isAddMemberOpen: false,
    isShareOpen: false,
};

const formVisibilitySlice = createSlice({
    name: 'formVisibility',
    initialState,
    reducers: {
        setFormVisibility: (state, action) => {
            const { formType, value } = action.payload;
            state[formType] = value;
        },
    },
});

export const { setFormVisibility } = formVisibilitySlice.actions;
export default formVisibilitySlice.reducer;
