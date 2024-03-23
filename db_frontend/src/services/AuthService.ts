import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, User } from "../models/IParent";
import { login } from "../store/reducers/authSlice";

const baseUrl = 'http://localhost/token';

const baseQuery = fetchBaseQuery({ baseUrl });
// const queryCheck = fetchBaseQuery({
//     baseUrl,
//     prepareHeaders: (Headers) 
// })

const baseQueryWithSaveToken: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (!result.error && args.url === 'get') {
        const user = JSON.stringify(result.data);
        localStorage.setItem('user', user);

        api.dispatch(login(JSON.parse(user) as IUser));
    }
    return result;
};

const authApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: baseQueryWithSaveToken,
    endpoints: build => ({
        login: build.mutation<IUser, User>({
            query: (user: User) => ({
                url: 'get',
                method: 'POST',
                body: user
            })
        }),
        checkToken: build.mutation<void, IUser>({
            query: (user: IUser) => ({
                url: 'check',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
        })
    })
});

export default authApi;