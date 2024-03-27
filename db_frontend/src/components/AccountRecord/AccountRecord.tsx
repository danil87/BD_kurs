import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import recordApi from "../../services/RecordService";
import TableGrid from "../TableGrid/TableGrid";
import { recordHeader } from "../../headers";
import { useAppSelector } from "../../hooks/redux";
import ModalCard from "../ModalCard/ModalCard";
import { Record } from "../../models/IRecord";
import RecordCard from "../RecordCard/RecordCard";
import { ILesson } from "../../models/ILesson";
import { IChild } from "../../models/IChild";
import returnErrorMessage from "../../utils/returnErrorMessage";
import './AccountRecord.css';

const initStateRecord: Record = {
    childName: '',
    lessonName: '',
    childId: null,
    lessonId: null,
    parentId: 0
};


const AccountRecord = () => {
    const { user } = useAppSelector(state => state.auth);
    const [newRecord, setNewRecord] = useState<Record>(initStateRecord);
    const [openNewRecordCard, setOpenNewRecordCard] = useState<boolean>(false);
    const [openEditRecordCard, setOpenEditRecordCard] = useState<boolean>(false);
    const [getRecords, { data: records, isLoading }] = recordApi.useFetchAllRecordMutation({
        fixedCacheKey: 'record'
    });
    const [createRecord, { isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorCreate }] = recordApi.useCreateNewRecordMutation();
    const [updateRecord, { isSuccess: isSuccessUpdate, isError: isErrorUdpate, error: errorUpdate }] = recordApi.useUpdateRecordMutation();

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

    const openEditCard = (record: Record) => {
        setNewRecord(record);
        setOpenEditRecordCard(true);
    };

    const returnTitle = (): string => {
        if (openNewRecordCard) return 'Добавление новой записи';
        return 'Изменение запси';
    };

    const closeCard = () => {
        if (openNewRecordCard) setOpenNewRecordCard(false);
        if (openEditRecordCard) {
            setOpenEditRecordCard(false);
            setNewRecord(initStateRecord);
        }
    };


    const submit = async () => {
        if (user?.id) {
            if (openNewRecordCard) {
                await createRecord({
                    ...newRecord,
                    parentId: user.id
                });
                setNewRecord(initStateRecord);

            }
            if (openEditRecordCard) {
                const { id, childId, parentId, lessonId } = newRecord;
                await updateRecord({ id, childId, parentId, lessonId });
            }
            getRecords([user.id]);
        }
    };

    useEffect(() => {
        if (user?.id) getRecords([user.id]);
    }, [user]);

    return (
        <>
            <TableGrid isLoading={isLoading} row={records} tableHeader={recordHeader} openEditCard={openEditCard} />
            <Button
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => setOpenNewRecordCard(true)}
            >
                Добавить запись
            </Button>
            <ModalCard
                title={returnTitle()}
                titleButton="Сохранить"
                open={openNewRecordCard || openEditRecordCard}
                close={closeCard}
                isSuccess={isSuccessCreate || isSuccessUpdate}
                isError={isErrorCreate || isErrorUdpate}
                submit={submit}
                successAlertText="Данные успешно сохранены!"
                errorAlertText={returnErrorMessage(openNewRecordCard, openEditRecordCard, errorCreate, errorUpdate)}
            >
                <RecordCard newRecord={newRecord} changeChild={changeChild} changeLesson={changeLesson} />
            </ModalCard>
        </>
    );
};

export default AccountRecord;