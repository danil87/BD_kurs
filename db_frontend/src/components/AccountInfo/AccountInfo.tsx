/* eslint-disable import/no-extraneous-dependencies */
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import './AccountInfo.css';

const testuser = {
    name: 'test_name',
    email: 'test_email',
    phoneNumber: 'test_phone',
    address: 'test_addres'
};

const AccountInfo = () => {
    const userKeys = Object.keys(testuser);

    return (
        <Box className="AccountInfo">
            <Box className="AccountInfo__img">
                <img className="AccountInfo__img__img" alt="" src="https://www.no5.com/media/1772/place-holder-image.png" />
            </Box>
            <Box className="AccountInfo__info">
                {userKeys.map(key => (
                    <Box key={key}
                        sx={{ margin: '20px' }}>
                        <TextField
                            color="secondary"
                            label={key}
                            variant="outlined"
                            value={testuser[key as keyof (typeof testuser)]} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AccountInfo;