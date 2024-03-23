/* eslint-disable import/no-extraneous-dependencies */
import { Alert, Button, TextField, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import './AccountInfo.css';
import { useEffect, useState } from "react";
import { secondaryTheme } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../models/IParent";
import parentApi from "../../services/ParanrtService";
import { updateStoreUser } from "../../store/reducers/authSlice";

const keys = ['name', 'username', 'email', 'phoneNumber', 'address'];

const AccountInfo = () => {
    const { user } = useAppSelector(state => state.auth);
    const [userKeys, setUserKeys] = useState<string[]>([]);
    const [userForm, setUserForm] = useState<IUser | null>(null);
    const [updateUser, { isSuccess, isError }] = parentApi.useUpdateParentMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            setUserKeys(Object.keys(user).filter((key: string) => keys.includes(key)));
            setUserForm(user);
        };
    }, [user]);

    const changeUserForm = (key: string, value: string) => {
        if (userForm)
            setUserForm({
                ...userForm,
                [key]: value
            });
    };

    const submit = () => {
        if (userForm) updateUser(userForm);
    };

    useEffect(() => {
        if (isSuccess && userForm) dispatch(updateStoreUser(userForm));
    }, [isSuccess]);

    return (
        <ThemeProvider theme={secondaryTheme}>
            <Box className="AccountInfo">
                {isSuccess && <Alert severity="success">Данные успешно обновлены</Alert>}
                {isError && <Alert severity="error">Что-то пошло не так :(</Alert>}

                {userKeys.map(key => (
                    <Box key={key}
                        sx={{ margin: '10px' }}>
                        <TextField
                            color="primary"
                            label={key}
                            variant="outlined"
                            onChange={(event) => changeUserForm(key, event.target.value)}
                            value={userForm ? userForm[key as keyof IUser] : ''} />
                    </Box>
                ))}
                <Button
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={submit}>
                    Сохранить
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default AccountInfo;