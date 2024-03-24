import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery, getQueryObject } from ".";
import { IPayment } from "../models/IPayment";

const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: createBaseQuery('http://localhost/payment'),
    endpoints: build => ({
        fetchAllPayment: build.mutation<IPayment[], number[]>({
            query: (ids?: number[]) => getQueryObject('list', {
                filter: {
                    parentIds: ids
                }, navigation: {}
            }),
        }),
        fetchOnePayment: build.query<IPayment, number>({
            query: (id: number) => getQueryObject('get', id)
        }),
        createNewPayment: build.mutation<IPayment, IPayment>({
            query: (newPayment: IPayment) => getQueryObject('create', newPayment)
        }),
        updatePayment: build.mutation<void, IPayment>({
            query: (record: IPayment) => {
                const newPayment = {
                    id: record.id,
                    item: {
                        ...record
                    }
                };

                delete newPayment.item.id;
                return getQueryObject('update', newPayment);
            }
        }),
        removePayment: build.mutation<void, number>({
            query: (id: number) => getQueryObject('remove', id)
        })
    }),
});

export default paymentApi;