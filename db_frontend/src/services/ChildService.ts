import { createApi } from "@reduxjs/toolkit/query/react";
import { IChild } from "../models/IChild";
import { createBaseQuery, getQueryObject } from ".";

const childApi = createApi({
    reducerPath: 'ChildApi',
    baseQuery: createBaseQuery('http://localhost/child'),
    endpoints: (build) => ({
        fetchAllChild: build.mutation<IChild[], number[]>({
            query: (ids: number[]) => getQueryObject('/list', {
                filter: {
                    parentIds: ids
                },
                navigation: {}
            }
            )
        }),
        fetchOneChild: build.query<IChild, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewChild: build.mutation<void, IChild>({
            query: (newChild: IChild) => getQueryObject('/create', newChild),
        }),
        updateChild: build.mutation<void, IChild>({
            query: (child: IChild) => getQueryObject('/update', child),
        }),
        removeChild: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id),
        })
    })
});

export default childApi;