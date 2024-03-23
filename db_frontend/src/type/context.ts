import { IChild } from "../models/IChild";
import { ILesson } from "../models/ILesson";
import { User } from "../models/IParent";
import { Record } from "../models/IRecord";

export type ContextRecord = {
    newRecord: Record,
    changeLesson: (lesson: ILesson) => void;
    changeChild: (child: IChild) => void
}

export type ContextLogin = {
    userForLogin: User,
    changeUser: (key: string, value: string) => void;
}

