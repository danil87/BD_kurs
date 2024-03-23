/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/system';
import './PersonalAccount.css';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import AccountMenu from '../../components/AccountMenu/AccountMenu';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import AccountChildren from '../../components/AccountChildren/AccountChildren';
import AccountRecord from '../../components/AccountRecord/AccountRecord';
import { secondaryTheme } from '../../theme';

function PersonalAccount(props: any) {
  return (
    <ThemeProvider theme={secondaryTheme}>
      <Box className="PersonalAccount">
        <AccountMenu />
        <Routes>
          <Route path='/' element={<AccountInfo />} />
          <Route path='child' element={<AccountChildren />} />
          <Route path='record' element={<AccountRecord />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default PersonalAccount;
