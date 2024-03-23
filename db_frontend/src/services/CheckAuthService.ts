import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from ".";

const checkAuthApi = createApi({
    reducerPath: 'checkAuthApi',
    baseQuery: createBaseQuery('http://localhost/token'),
    endpoints: build => ({
        checkToken: build.mutation<void, void>({
            query: () => 'check'
        })
    }),
});

export default checkAuthApi;