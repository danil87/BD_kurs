import { createApi } from "@reduxjs/toolkit/query/react";
import { IRecord } from "../models/IRecord";
import { getQueryObject, createBaseQuery } from ".";

const recordApi = createApi({
    reducerPath: 'RecordApi',
    baseQuery: createBaseQuery('http://localhost/record'),
    endpoints: (build) => ({
        fetchAllRecord: build.mutation<IRecord[], number[]>({
            query: (ids?: number[]) => getQueryObject('/list', {
                filter: {
                    parentIds: ids
                }, navigation: {}
            }),
        }),
        fetchOneRecord: build.query<IRecord, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewRecord: build.mutation<IRecord, IRecord>({
            query: (newRecord: IRecord) => getQueryObject('/create', newRecord)
        }),
        updateRecord: build.mutation<void, IRecord>({
            query: (record: IRecord) => {
                const newRecord = {
                    id: record.id,
                    item: {
                        ...record
                    }
                };

                delete newRecord.item.id;
                return getQueryObject('/update', newRecord);
            }
        }),
        removeRecord: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default recordApi;