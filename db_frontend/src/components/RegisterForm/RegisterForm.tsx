import { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IUser } from "../../models/IParent";

type Props = {
    user: IUser,
    setUser: (user: IUser) => void;
    isUpdateUser: boolean;
    setIsUpdateUser: () => void;
}

const keyTranslate: IUser = {
    name: 'Имя',
    username: 'username',
    password: 'Пароль',
    email: 'email',
    address: 'Адрес',
    phoneNumber: 'Телефон'
};

const RegisterForm = ({ user, setUser, isUpdateUser, setIsUpdateUser }: Props) => {
    const [newUser, setNewUSer] = useState<IUser>(user);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const keys = Object.keys(keyTranslate);

    const changeUser = (key: string, value: string) => {
        setNewUSer({
            ...newUser,
            [key]: value
        });
    };

    useEffect(() => {
        if (isUpdateUser && newUser !== user) setUser(newUser);
        else setIsUpdateUser();
    }, [isUpdateUser]);

    return (
        <>
            {keys.map(key => (
                key !== 'password' ?
                    <TextField
                        key={key}
                        label={keyTranslate[key as keyof IUser]}
                        variant="outlined"
                        color="info"
                        value={newUser[key as keyof IUser]}
                        onChange={(event) => changeUser(key, event.target.value)}
                        sx={{ margin: '10px 0' }}
                    />
                    :
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
            ))}
        </>
    );
};

export default RegisterForm;