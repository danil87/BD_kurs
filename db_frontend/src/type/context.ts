import { IChild } from "../models/IChild";
import { ILesson } from "../models/ILesson";
import { User } from "../models/IParent";
import { Record } from "../models/IRecord";

export type ContextRecord = {
    newRecord: Record,
    changeLesson: (_: ILesson) => void;
    changeChild: (_: IChild) => void
}

export type ContextLogin = {
    userForLogin: User,
    changeUser: (_: string, __: string) => void;
}

export type ContextChild = {
    newChild: IChild,
    changeChild: (_: string, __: string) => void,
}
