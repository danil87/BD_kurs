import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IParent";
import { getQueryObject, createBaseQuery } from ".";

const parentApi = createApi({
    reducerPath: 'ParentApi',
    baseQuery: createBaseQuery('http://localhost/user'),
    endpoints: (build) => ({
        fetchAllParent: build.query<IUser[], void>({
            query: () => getQueryObject('/list')
        }),
        fetchOneParent: build.query<IUser, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewParent: build.mutation<void, IUser>({
            query: (newParent: IUser) => getQueryObject('/create', newParent)
        }),
        updateParent: build.mutation<void, IUser>({
            query: (parent: IUser) => {
                const newParent = {
                    id: parent.id,
                    item: {
                        ...parent
                    }
                };
                delete newParent.item.id;
                return getQueryObject('/update', newParent);
            }
        }),
        removeParent: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default parentApi;