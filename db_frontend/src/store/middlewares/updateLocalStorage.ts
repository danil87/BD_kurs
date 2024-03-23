import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { updateStoreUser } from "../reducers/authSlice";

const updateLocalStorage: Middleware<{}, RootState> =
    state => next => action => {
        if (updateStoreUser.match(action)) {
            localStorage.setItem('user', JSON.stringify(action.payload));
        }
        next(action);
    };

export default updateLocalStorage;