import { createApi } from "@reduxjs/toolkit/query/react";
import { IFeedback } from "../models/IFeedback";
import { getQueryObject, createBaseQuery } from ".";

type Param = {
    offset?: number,
    limit?: number,
    ids?: number[],
}

type Response = {
    count: number,
    data: IFeedback[]
}

const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: createBaseQuery('http://localhost/feedback'),
    endpoints: (build) => ({
        fetchAllFeedback: build.mutation<Response, Param>({
            query: ({ offset, limit, ids }: Param) => {
                const filters = {
                    filter: {},
                    navigation: {}
                };
                if (limit && offset !== undefined) {
                    filters.navigation = {
                        offset,
                        limit
                    };
                }

                if (ids) filters.filter = { parentIds: ids };

                return getQueryObject('/list', filters);
            }
        }),
        fetchOneFeedback: build.query<IFeedback, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewFeedback: build.mutation<void, IFeedback>({
            query: (newFeedback: IFeedback) => getQueryObject('/create', newFeedback)
        }),
        updateFeedback: build.mutation<void, IFeedback>({
            query: (feedback: IFeedback) => {
                const newFeedback = {
                    id: feedback.id,
                    item: {
                        ...feedback
                    }
                };
                return getQueryObject('/update', newFeedback);
            }
        }),
        removeFeedback: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default feedbackApi;