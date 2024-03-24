import { createApi } from "@reduxjs/toolkit/query/react";
import { ILesson } from "../models/ILesson";
import { getQueryObject, createBaseQuery } from ".";

const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: createBaseQuery('http://localhost/lesson'),
    endpoints: (build) => ({
        fetchAllLesson: build.mutation<ILesson[], number[]>({
            query: (ids: number[]) => getQueryObject('/list', { filter: {}, navigation: {} })
        }),
        fetchOneLesson: build.query<ILesson, number>({
            query: (id: number) => getQueryObject('/get', id)
        }),
        createNewLesson: build.mutation<void, ILesson>({
            query: (newLesson: ILesson) => getQueryObject('/create', newLesson)
        }),
        updateLesson: build.mutation<void, ILesson>({
            query: (lesson: ILesson) => getQueryObject('/update', lesson)
        }),
        removeLesson: build.mutation<void, number>({
            query: (id: number) => getQueryObject('/remove', id)
        })
    })
});

export default lessonApi;