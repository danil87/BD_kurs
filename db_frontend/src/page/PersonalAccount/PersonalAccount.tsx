/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/system';
import { Route, Routes, Navigate } from 'react-router';
import { ThemeProvider } from '@mui/material';
import AccountMenu from '../../components/AccountMenu/AccountMenu';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import AccountChildren from '../../components/AccountChildren/AccountChildren';
import AccountRecord from '../../components/AccountRecord/AccountRecord';
import { secondaryTheme } from '../../theme';
import AccountStaff from '../../components/AccountStaff/AccountStaff';
import { useAppSelector } from '../../hooks/redux';
import './PersonalAccount.css';

const PersonalAccount = () => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <ThemeProvider theme={secondaryTheme}>
      <Box className="PersonalAccount">
        <AccountMenu />
        <Routes>
          <Route path='/' element={<AccountInfo />} />
          <Route path='child' element={<AccountChildren />} />
          <Route path='record' element={<AccountRecord />} />
          <Route path='staff' element={user?.is_superuser ? <AccountStaff /> : <Navigate replace to='/' />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default PersonalAccount;
