import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChild } from "../models/IChild";
import getQueryObject from ".";

const ChildApi = createApi({
    reducerPath: 'ChildApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/child' }),
    endpoints: (build) => ({
        fetchAllChild: build.query<IChild[], void>({
            query: () => getQueryObject('/list')
        }),
        fetchOneChild: build.query<IChild, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewChild: build.mutation<void, IChild>({
            query: (newChild: IChild) => getQueryObject('/create', newChild)
        }),
        updateChild: build.mutation<void, IChild>({
            query: (child: IChild) => getQueryObject('/update', child)
        }),
        removeChild: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default ChildApi;