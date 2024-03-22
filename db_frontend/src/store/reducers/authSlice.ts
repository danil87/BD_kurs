import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    user: any,
    token: string | null;
}

const initialState: User = {
    user: {},
    token: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = initialState.user;
            state.token = initialState.token;
        }
    }
});

export const { login, logout } = authSlice.actions;