// import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost/auth' });

// const baseQueryWithSaveToken: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//     const result = await baseQuery(args, api, extraOptions);

//     if (!result.error) {
//  result.data;
//     }

//     return result;
// };

// const authApi = createApi({
//     reducerPath: 'AuthApi',
//     baseQuery: baseQueryWithSaveToken,
//     endpoints: build => ({})
// });