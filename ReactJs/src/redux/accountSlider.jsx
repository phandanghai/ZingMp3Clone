import { createSlice } from '@reduxjs/toolkit';

const initaState = {
    account: null,
};

const AccountSlider = createSlice({
    name: 'account',
    initialState: initaState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
    },
});

export const { setAccount } = AccountSlider.actions;
export default AccountSlider.reducer;
