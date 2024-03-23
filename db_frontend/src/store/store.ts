import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import staffApi from "../services/StaffService";
import lessonApi from "../services/LessonService";
import childApi from "../services/ChildService";
import parentApi from "../services/ParanrtService";
import recordApi from "../services/RecordService";
import authApi from "../services/AuthService";
import checkAuthApi from "../services/CheckAuthService";
import updateLocalStorage from "./middlewares/updateLocalStorage";

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(staffApi.middleware)
            .concat(lessonApi.middleware)
            .concat(childApi.middleware)
            .concat(parentApi.middleware)
            .concat(recordApi.middleware)
            .concat(authApi.middleware)
            .concat(checkAuthApi.middleware)
            .concat(updateLocalStorage)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
