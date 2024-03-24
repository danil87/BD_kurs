import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import staffApi from "../../services/StaffService";
import TableGrid from "../TableGrid/TableGrid";
import { staffHeader } from "../../headers";
import './AccountStaff.css';
import ModalCard from "../ModalCard/ModalCard";
import { IStaff } from "../../models/IStaff";
import StaffForm from "../StaffFrom/StaffForm";

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
    const [updateStaff, { isSuccess: isSuccessUpdate, isError: isErrorUdpate }] = staffApi.useUpdateStaffMutation();
    const [createStaff, { isSuccess: isSuccessCreate, isError: isErrorCreate }] = staffApi.useCreateNewStaffMutation();



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
        <Box className='AccountStaff'>
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
                formStyle={{ display: 'grid' }}
                successAlertText="Данные успешно сохранены!"
            >
                <StaffForm staff={newStaff} setStaff={setNewStaff}
                    isUpdateStaff={isUpdateStaff} setIsUpdateStaff={() => { setIsUpdateStaff(false); }} />
            </ModalCard>
        </Box>
    );
};

export default AccountStaff;