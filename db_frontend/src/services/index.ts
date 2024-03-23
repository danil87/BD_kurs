// import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";
import { logout } from "../store/reducers/authSlice";

export const createBaseQuery = (baseUrl: string) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const { auth: {
                user
            }
            } = getState() as RootState;
            if (user?.token) headers.set('Authorization', `Bearer ${user?.token}`);
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
    // headers: {
    //     'Authorization': `Basic ${Base64.encode('admin:admin')}`
    // }
});