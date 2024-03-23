import { createContext } from "react";
import { Record } from "./models/IRecord";
import { ContextLogin, ContextRecord } from "./type/context";
import { ILesson } from "./models/ILesson";
import { IChild } from "./models/IChild";
import { User } from "./models/IParent";

export const initStateRecord: Record = {
    childName: '',
    lessonName: '',
    childId: null,
    lessonId: null,
    parentId: 1
};

export const ContextFormRecord = createContext<ContextRecord>({
    newRecord: initStateRecord,
    changeLesson: (_: ILesson) => { },
    changeChild: (_: IChild) => { }
});

export const initStateLogin: User = {
    username: '',
    password: '',
};

export const ContextFormLogin = createContext<ContextLogin>({
    userForLogin: initStateLogin,
    changeUser: (_, __) => { }
});
