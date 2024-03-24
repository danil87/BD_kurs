import { useEffect, useState } from "react";
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IUser } from "../../models/IParent";
import { useAppSelector } from "../../hooks/redux";

type Props = {
    oldUser: IUser,
    setUser: (user: IUser) => void;
    isUpdateUser: boolean;
    setIsUpdateUser: () => void;
}

const keyTranslate = {
    name: 'Имя',
    username: 'username',
    password: 'Пароль',
    email: 'email',
    address: 'Адрес',
    phoneNumber: 'Телефон',
    is_superuser: 'Администратор'
};

const RegisterForm = ({ oldUser, setUser, isUpdateUser, setIsUpdateUser }: Props) => {
    const { user } = useAppSelector(state => state.auth);
    const [newUser, setNewUSer] = useState<IUser>(oldUser);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const keys = Object.keys(keyTranslate);

    const changeUser = (key: string, value: string) => {
        setNewUSer({
            ...newUser,
            [key]: value
        });
    };

    useEffect(() => {
        if (isUpdateUser && newUser !== oldUser) setUser(newUser);
        else setIsUpdateUser();
    }, [isUpdateUser]);

    return (
        <>
            {keys.map(key => {
                if (key === 'password') {
                    return (
                        <FormControl key={key} sx={{ margin: '10px 0' }} variant="outlined" color="info">
                            <InputLabel color="info">Пароль</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={newUser.password}
                                onChange={(event) => changeUser('password', event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!(showPassword))}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Пароль"
                            />
                        </FormControl>
                    );
                }
                if (key === 'is_superuser') {
                    return (
                        user?.is_superuser &&
                        <FormControl key={key}>
                            <FormControlLabel
                                label='Администратор'
                                control={
                                    <Checkbox
                                        value={newUser.is_superuser}
                                        color="info"
                                        onChange={(event) => changeUser(key, event.target.value)} />
                                } />
                        </FormControl>
                    );
                }

                return (
                    <TextField
                        key={key}
                        label={keyTranslate[key as keyof (typeof keyTranslate)]}
                        variant="outlined"
                        color="info"
                        value={newUser[key as keyof IUser]}
                        onChange={(event) => changeUser(key, event.target.value)}
                        sx={{ margin: '10px 0' }}
                    />);
            })}
        </>
    );
};

export default RegisterForm;