import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IParent } from "../models/IParent";
import getQueryObject from ".";

const ParentApi = createApi({
    reducerPath: 'ParentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/parent' }),
    endpoints: (build) => ({
        fetchAllParent: build.query<IParent[], void>({
            query: () => getQueryObject('/list')
        }),
        fetchOneParent: build.query<IParent, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewParent: build.mutation<void, IParent>({
            query: (newParent: IParent) => getQueryObject('/create', newParent)
        }),
        updateParent: build.mutation<void, IParent>({
            query: (parent: IParent) => getQueryObject('/update', parent)
        }),
        removeParent: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default ParentApi;