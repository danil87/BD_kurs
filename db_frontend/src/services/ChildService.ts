import { createApi } from "@reduxjs/toolkit/query/react";
import { IChild } from "../models/IChild";
import { createBaseQuery, getQueryObject } from ".";

const childApi = createApi({
    reducerPath: 'ChildApi',
    baseQuery: createBaseQuery('http://localhost/child'),
    tagTypes: ['Children'],
    endpoints: (build) => ({
        fetchAllChild: build.query<IChild[], number[]>({
            query: (ids: number[]) => getQueryObject('/list', {
                filter: {
                    parentIds: ids
                },
                navigation: {}
            }
            ),
            providesTags: result => ['Children']
        }),
        fetchOneChild: build.query<IChild, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewChild: build.mutation<void, IChild>({
            query: (newChild: IChild) => getQueryObject('/create', newChild),
            invalidatesTags: ['Children']
        }),
        updateChild: build.mutation<void, IChild>({
            query: (child: IChild) => getQueryObject('/update', child),
            invalidatesTags: ['Children']
        }),
        removeChild: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id),
            invalidatesTags: ['Children']
        })
    })
});

export default childApi;