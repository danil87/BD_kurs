import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { childHeader } from "../../headers";
import childApi from "../../services/ChildService";
import TableGrid from "../TableGrid/TableGrid";
import './AccountChildren.css';
import { useAppSelector } from "../../hooks/redux";
import ModalCard from "../ModalCard/ModalCard";
import ChildForm from "../ChildForm/ChildForm";
import { IChild } from "../../models/IChild";

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
    const [getChildren, { data: children, isLoading }] = childApi.useFetchAllChildMutation();
    const [createChild, { isSuccess: isSuccessCreate, isError: isErrorCreate }] = childApi.useCreateNewChildMutation();
    const [updateChild, { isSuccess: isSuccessUpdate, isError: isErrorUdpate }] = childApi.useUpdateChildMutation();


    const openEditCard = (child: IChild) => {
        setNewChild(child);
        setOpenEditChildCard(true);
    };

    const closeCard = () => {
        if (openNewChildCard) setOpenNewChildCard(false);
        if (openEditChildCard) setOpenEditChildCard(false);
    };

    const returnTitle = (): string => {
        if (openNewChildCard) return 'Регистрация ребёнка';
        return 'Изменение данных ребёнка';
    };

    const changeChild = (key: string, value: string) => {
        let newValue: string | number = value;

        if (typeof initStateChild[key as keyof IChild] === 'number') {
            newValue = parseInt(value, 10);
            newValue = Number.isNaN(newValue) ? '' : newValue;
        }

        setNewChild({
            ...newChild,
            [key]: newValue
        });
    };

    const submit = () => {
        if (user?.id) {
            if (openNewChildCard) {
                createChild({
                    ...newChild,
                    parentId: user.id
                });
                setNewChild(initStateChild);

            }
            if (openEditChildCard) {
                updateChild(newChild);
            }

            getChildren([user.id]);
        }
    };

    useEffect(() => {
        if (user?.id) {
            getChildren([user.id]);
        }
    }, [user]);

    return (
        <Box className='AccountChildren'>
            <TableGrid row={children} isLoading={isLoading} tableHeader={childHeader} openEditCard={openEditCard} />
            <Button
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => setOpenNewChildCard(true)}
            >Добавить ребёнка</Button>
            <ModalCard
                title={returnTitle()}
                titleButton="Сохранить"
                open={openNewChildCard || openEditChildCard}
                close={closeCard}
                isSuccess={isSuccessCreate || isSuccessUpdate}
                isError={isErrorCreate || isErrorUdpate}
                submit={submit}
            >
                <ChildForm child={newChild} changeChild={changeChild} />
            </ModalCard>
        </Box>
    );
};

export default AccountChildren;