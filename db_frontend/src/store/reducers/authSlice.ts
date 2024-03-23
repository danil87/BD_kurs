import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IParent";

type AuthState = {
    user: IUser | null,
}

const initialState: AuthState = {
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        updateStoreUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = initialState.user;
        }
    }
});

export const { login, logout, updateStoreUser } = authSlice.actions;
export type ActionType = typeof authSlice.actions;