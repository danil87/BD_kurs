import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { childHeader } from "../../headers";
import childApi from "../../services/ChildService";
import TableGrid from "../TableGrid/TableGrid";
import './AccountChildren.css';
import { useAppSelector } from "../../hooks/redux";
import ModalCard from "../ModalCard/ModalCard";
import ChildForm from "../ChildForm/ChildForm";
import { IChild } from "../../models/IChild";
import returnErrorMessage from "../../utils/returnErrorMessage";

const initStateChild: IChild = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    age: NaN,
    gender: '',
    parentId: NaN,
};

const AccountChildren = () => {
    const { user } = useAppSelector(state => state.auth);
    const [newChild, setNewChild] = useState<IChild>(initStateChild);
    const [openNewChildCard, setOpenNewChildCard] = useState<boolean>(false);
    const [openEditChildCard, setOpenEditChildCard] = useState<boolean>(false);
    const [isUpdateChild, setIsUpdateChild] = useState<boolean>(false);
    const [getChildren, { data: children, isLoading }] = childApi.useFetchAllChildMutation({
        fixedCacheKey: 'child'
    });
    const [createChild, { isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorCreate }] = childApi.useCreateNewChildMutation();
    const [updateChild, { isSuccess: isSuccessUpdate, isError: isErrorUdpate, error: errorUpdate }] = childApi.useUpdateChildMutation();


    const openEditCard = (child: IChild) => {
        setNewChild(child);
        setOpenEditChildCard(true);
    };

    const closeCard = () => {
        if (openNewChildCard) setOpenNewChildCard(false);
        if (openEditChildCard) {
            setOpenEditChildCard(false);
            setNewChild(initStateChild);
        }
    };

    const returnTitle = (): string => {
        if (openNewChildCard) return 'Регистрация ребёнка';
        return 'Изменение данных ребёнка';
    };

    const submit = () => setIsUpdateChild(true);

    const sendData = async () => {
        if (user?.id) {
            if (openNewChildCard) {
                await createChild({
                    ...newChild,
                    parentId: user.id
                });
                setNewChild(initStateChild);

            }
            if (openEditChildCard) {
                await updateChild(newChild);
            }
            getChildren([user.id]);
        }
    };

    useEffect(() => {
        if (user?.id) {
            getChildren([user.id]);
        }
    }, [user]);

    useEffect(() => {
        if (isUpdateChild) {
            sendData();
            setIsUpdateChild(false);
        }
    }, [newChild]);

    return (
        <>
            <TableGrid row={children} isLoading={isLoading} tableHeader={childHeader} openEditCard={openEditCard} />
            <Button
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => setOpenNewChildCard(true)}
            >
                Добавить ребёнка
            </Button>

            <ModalCard
                title={returnTitle()}
                titleButton="Сохранить"
                open={openNewChildCard || openEditChildCard}
                close={closeCard}
                isSuccess={isSuccessCreate || isSuccessUpdate}
                isError={isErrorCreate || isErrorUdpate}
                submit={submit}
                successAlertText="Данные успешно сохранены!"
                errorAlertText={returnErrorMessage(openNewChildCard, openEditChildCard, errorCreate, errorUpdate)}
            >
                <ChildForm child={newChild} setChild={setNewChild}
                    isUpdateChild={isUpdateChild} setIsUpdateChild={() => { setIsUpdateChild(false); }} />
            </ModalCard>
        </>
    );
};

export default AccountChildren;