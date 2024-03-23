import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Box,
  ThemeProvider
} from '@mui/material';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './page/Main/Main';
import Footer from './components/Footer/Footer';
import ClassSchedule from './page/ClassSchedule/ClassSchedule';
import UsersReviews from './page/UsersReviews/UsersReviews';
import PersonalAccount from './page/PersonalAccount/PersonalAccount';
import './App.css';
import { mainTheme } from './theme';
import { IUser } from './models/IParent';
import authApi from './services/AuthService';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { login, logout } from './store/reducers/authSlice';

const App = () => {
  const [checkUser, { isError, isSuccess }] = authApi.useCheckTokenMutation();
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInStorage = localStorage.getItem('user');

    if (userInStorage && userInStorage !== 'undefined') {
      checkUser(JSON.parse(userInStorage) as IUser);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const userInStorage = localStorage.getItem('user');
      if (userInStorage) dispatch(login(JSON.parse(userInStorage) as IUser));
    }
    else if (isError) {
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/');
    }
  }, [isError, isSuccess]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Box className="App">
        <Header />
        <Box sx={{ marginTop: '82px' }}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/schedule' element={<ClassSchedule />} />
            <Route path='/reviews' element={<UsersReviews />} />
            <Route path='/cabinet/*' element={<PersonalAccount />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider >
  );
};

export default App;
