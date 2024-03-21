import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRecord } from "../models/IRecord";
import getQueryObject from ".";

const RecordApi = createApi({
    reducerPath: 'RecordApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/record' }),
    endpoints: (build) => ({
        fetchAllRecord: build.query<IRecord[], void>({
            query: () => getQueryObject('/list')
        }),
        fetchOneRecord: build.query<IRecord, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewRecord: build.mutation<void, IRecord>({
            query: (newRecord: IRecord) => getQueryObject('/create', newRecord)
        }),
        updateRecord: build.mutation<void, IRecord>({
            query: (record: IRecord) => getQueryObject('/update', record)
        }),
        removeRecord: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default RecordApi;