// import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Base64 } from "js-base64";
import { RootState } from "../store/store";
import { logout } from "../store/reducers/authSlice";

export const createBaseQuery = (baseUrl: string) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const {
                auth: {
                    token
                }
            } = getState() as RootState;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            else headers.set('Authorization', `Basic ${Base64.encode('admin:admin')}`);
        }

    });
    const baseQueryWithLogout: BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    > = async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(logout());
        }

        return result;
    };
    return baseQueryWithLogout;
};


export const getQueryObject = (url: string, body?: any): FetchArgs => ({
    url,
    body,
    method: 'POST',
});