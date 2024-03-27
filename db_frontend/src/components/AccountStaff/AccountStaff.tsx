import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import staffApi from "../../services/StaffService";
import TableGrid from "../TableGrid/TableGrid";
import { staffHeader } from "../../headers";
import ModalCard from "../ModalCard/ModalCard";
import { IStaff } from "../../models/IStaff";
import StaffForm from "../StaffFrom/StaffForm";
import returnErrorMessage from "../../utils/returnErrorMessage";
import './AccountStaff.css';

const initStateStaff: IStaff = {
    position: '',
    salary: 0
};

const AccountStaff = () => {
    const { user } = useAppSelector(state => state.auth);
    const [newStaff, setNewStaff] = useState<IStaff>(initStateStaff);
    const [isUpdateStaff, setIsUpdateStaff] = useState<boolean>(false);
    const [openNewStaffCard, setOpenNewStaffCard] = useState<boolean>(false);
    const [openEditStaffCard, setOpenEditStaffCard] = useState<boolean>(false);
    const [getStaff, { data: staffs, isLoading }] = staffApi.useFetchAllStaffMutation({
        fixedCacheKey: 'staff'
    });
    const [updateStaff, { isSuccess: isSuccessUpdate, isError: isErrorUdpate, error: errorCreate }] = staffApi.useUpdateStaffMutation();
    const [createStaff, { isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorUpdate }] = staffApi.useCreateNewStaffMutation();



    const returnTitle = (): string => {
        if (openNewStaffCard) return 'Регистрация сотрудника';
        return 'Изменение данных сотрудника';
    };

    const openEditCard = (staff: IStaff) => {
        setNewStaff(staff);
        setOpenEditStaffCard(true);
    };

    const closeCard = () => {
        if (openNewStaffCard) setOpenNewStaffCard(false);
        if (openEditStaffCard) {
            setOpenEditStaffCard(false);
            setNewStaff(initStateStaff);
        }
    };

    const submit = () => setIsUpdateStaff(true);

    const sendData = async () => {
        if (user?.id) {
            if (openNewStaffCard) {
                await createStaff(newStaff);
                setNewStaff(initStateStaff);

            }
            if (openEditStaffCard) {
                await updateStaff(newStaff);
            }
            getStaff([user.id]);
        }
    };

    useEffect(() => {
        if (isUpdateStaff) {
            sendData();
            setIsUpdateStaff(false);
        }
    }, [newStaff]);

    useEffect(() => {
        if (user?.id) getStaff([user?.id]);
    }, [user]);

    return (
        <>
            <TableGrid row={staffs} isLoading={isLoading} tableHeader={staffHeader} openEditCard={openEditCard} />
            <Button
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => setOpenNewStaffCard(true)}
            >
                Добавить сотрудника
            </Button>
            <ModalCard
                title={returnTitle()}
                titleButton="Сохранить"
                open={openNewStaffCard || openEditStaffCard}
                close={closeCard}
                isSuccess={isSuccessCreate || isSuccessUpdate}
                isError={isErrorCreate || isErrorUdpate}
                submit={submit}
                successAlertText="Данные успешно сохранены!"
                errorAlertText={returnErrorMessage(openNewStaffCard, openEditStaffCard, errorCreate, errorUpdate)}
            >
                <StaffForm staff={newStaff} setStaff={setNewStaff}
                    isUpdateStaff={isUpdateStaff} setIsUpdateStaff={() => { setIsUpdateStaff(false); }} />
            </ModalCard>
        </>
    );
};

export default AccountStaff;