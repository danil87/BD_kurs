import { combineReducers, configureStore } from "@reduxjs/toolkit";
import staffApi from "../services/StaffService";
import lessonApi from "../services/LessonService";

const rootReducer = combineReducers({
    [staffApi.reducerPath]: staffApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(staffApi.middleware)
            .concat(lessonApi.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
