import { combineReducers } from "@reduxjs/toolkit";
import staffApi from "../../services/StaffService";
import lessonApi from "../../services/LessonService";
import childApi from "../../services/ChildService";
import parentApi from "../../services/ParanrtService";
import recordApi from "../../services/RecordService";
import { authSlice } from "./authSlice";
import authApi from "../../services/AuthService";
import checkAuthApi from "../../services/CheckAuthService";

export const rootReducer = combineReducers({
    [staffApi.reducerPath]: staffApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [childApi.reducerPath]: childApi.reducer,
    [parentApi.reducerPath]: parentApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [checkAuthApi.reducerPath]: checkAuthApi.reducer,
    auth: authSlice.reducer
});

export default rootReducer;

