import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStaff } from '../models/IStaff';

const getQueryObject = (url: string, body?: any): FetchArgs => ({
    url,
    body,
    mode: 'no-cors',
    method: 'POST'
});

const staffApi = createApi({
    reducerPath: 'staffApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/staff' }),
    endpoints: (build) => ({
        fetchAllStaff: build.query<IStaff[], void>({
            query: () => getQueryObject('/list')
        }),
        fetchOneStaff: build.query<IStaff, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewStaff: build.mutation<void, IStaff>({
            query: (newStaff: IStaff) => getQueryObject('/create', newStaff)
        }),
        updateStaff: build.mutation<void, IStaff>({
            query: (staff: IStaff) => getQueryObject('/update', staff)
        }),
        removeStaff: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default staffApi;