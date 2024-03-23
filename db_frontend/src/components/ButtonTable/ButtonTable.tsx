import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import RecordCard from "../RecordCard/RecordCard";
import ModalCard from "../ModalCard/ModalCard";
import { ILesson } from "../../models/ILesson";
import { IChild } from "../../models/IChild";
import recordApi from "../../services/RecordService";
import { ContextFormRecord, initStateRecord } from "../../context";

type Props = {
    idLesson: number,
    lessonName: string;
}

const ButtonTable = ({ idLesson, lessonName }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [newRecord, setNewRecord] = useState(initStateRecord);
    const [createRecord, { isSuccess, isError }] = recordApi.useCreateNewRecordMutation();

    const changeLesson = (lesson: ILesson) => {
        setNewRecord({
            ...newRecord,
            lessonName: lesson.name,
            lessonId: lesson.id || null
        });
    };

    const changeChild = (child: IChild) => {
        setNewRecord({
            ...newRecord,
            childName: child.name,
            childId: child.id || null
        });
    };

    useEffect(() => {
        if (lessonName && idLesson) {
            setNewRecord({
                ...newRecord,
                lessonId: idLesson,
                lessonName,
            });
        }
    }, []);

    const submit = () => {
        const { childId, lessonId, parentId } = newRecord;
        createRecord({ childId, lessonId, parentId });
    };
    return (
        <>
            <Button
                color='success'
                onClick={() => setOpen(true)}
                sx={{ my: 2 }}
            >
                Записаться
            </Button>
            {open &&
                <ContextFormRecord.Provider value={{ newRecord, changeLesson, changeChild }}>
                    <ModalCard
                        title='Выберите занятие и ребёнка для записи'
                        titleButton='Записаться'
                        open={open}
                        close={() => { setOpen(false); }}
                        isSuccess={isSuccess}
                        isError={isError}
                        submit={submit}
                    >
                        <RecordCard />
                    </ModalCard>
                </ContextFormRecord.Provider>
            }
        </>
    );
};

export default ButtonTable;