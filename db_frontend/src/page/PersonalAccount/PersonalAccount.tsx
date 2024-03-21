/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/system';
import './PersonalAccount.css';
import { Route, Routes } from 'react-router';
import AccountMenu from '../../components/AccountMenu/AccountMenu';
import AccountInfo from '../../components/AccountInfo/AccountInfo';

function PersonalAccount(props: any) {
  return (
    <Box className="PersonalAccount">
      <AccountMenu />
      <Routes>
        <Route path='/' element={<AccountInfo />} />
        <Route path='child' element={<AccountMenu />} />
        <Route path='record' element={<AccountMenu />} />
      </Routes>
    </Box>
  );
}

export default PersonalAccount;
