import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IUser } from "../../models/IParent";

type Props = {
    user: IUser,
    setUser: (user: IUser) => void;
    isUpdateUser: boolean;
    setIsUpdateUser: () => void;
}

const LoginFrom = ({ user, setUser, isUpdateUser, setIsUpdateUser }: Props) => {
    const [newUser, setNewUser] = useState(user);
    const [showPassword, setShowPassword] = useState(false);

    const changeUser = (key: string, value: string) => {
        setNewUser({ ...newUser, [key]: value });
    };

    useEffect(() => {
        if (isUpdateUser && newUser !== user) setUser(newUser);
        else setIsUpdateUser();
    }, [isUpdateUser]);

    return (
        <>
            <TextField
                label="Логин"
                variant="outlined"
                color="info"
                value={newUser.username}
                onChange={(event) => changeUser('username', event.target.value)}
            />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" color="info">
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
        </>
    );
};

export default LoginFrom;