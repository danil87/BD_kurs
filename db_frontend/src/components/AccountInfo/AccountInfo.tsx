/* eslint-disable import/no-extraneous-dependencies */
import { Button, TextField, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import './AccountInfo.css';
import { secondaryTheme } from "../../theme";

const testuser = {
    name: 'test_name',
    email: 'test_email',
    phoneNumber: 'test_phone',
    address: 'test_addres'
};

const AccountInfo = () => {
    const userKeys = Object.keys(testuser);

    return (
        <ThemeProvider theme={secondaryTheme}>
            <Box className="AccountInfo">
                {userKeys.map(key => (
                    <Box key={key}
                        sx={{ margin: '10px' }}>
                        <TextField
                            color="primary"
                            label={key}
                            variant="outlined"
                            value={testuser[key as keyof (typeof testuser)]} />
                    </Box>
                ))}
                <Button
                    sx={{ alignSelf: 'flex-end' }}>
                    Сохранить
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default AccountInfo;