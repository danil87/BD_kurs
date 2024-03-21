import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILesson } from "../models/ILesson";
import getQueryObject from ".";

const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/lesson' }),
    endpoints: (build) => ({
        fetchAllLesson: build.query<ILesson[], void>({
            query: () => getQueryObject('/list')
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