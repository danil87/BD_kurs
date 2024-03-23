import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ContextFormLogin } from "../../context";

const LoginFrom = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { userForLogin, changeUser } = useContext(ContextFormLogin);

    return (
        <>
            <TextField
                label="Логин"
                variant="outlined"
                color="info"
                value={userForLogin.username}
                onChange={(event) => changeUser('username', event.target.value)}
            />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" color="info">
                <InputLabel color="info">Пароль</InputLabel>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    value={userForLogin.password}
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