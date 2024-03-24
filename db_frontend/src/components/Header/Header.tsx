import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import './Header.css';
import UserMenu from '../UserMenu/UserMenu';
import { secondaryTheme } from '../../theme';
import LoginFrom from '../LoginForm/LoginForm';
import ModalCard from '../ModalCard/ModalCard';
import authApi from '../../services/AuthService';
import { useAppSelector } from '../../hooks/redux';
import parentApi from '../../services/ParanrtService';
import { IUser } from '../../models/IParent';
import RegisterForm from '../RegisterForm/RegisterForm';

const pages = [
  {
    title: 'Главная',
    path: '/',
  },
  {
    title: 'расписание',
    path: '/schedule',
  },
  {
    title: 'Отзывы',
    path: '/reviews',
  },
];

const initStateUser: IUser = {
  name: '',
  username: '',
  password: '',
  address: '',
  email: '',
  phoneNumber: '',
};

function Header() {
  const { user } = useAppSelector(state => state.auth);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [newUser, setUser] = useState<IUser>(initStateUser);
  const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false);
  const [login, { isSuccess: isSuccessLogin, isError: isErrorLogin }] = authApi.useLoginMutation();
  const [register, { isSuccess: isSuccessRegister, isError: isErrorRegister }] = parentApi.useCreateNewParentMutation();


  const returnTitle = () => {
    if (openLogin) return 'Вход';
    return 'Регистрация';
  };

  const returnButtonTitle = () => {
    if (openLogin) return 'Войти';
    return 'Зарегистриоваться';
  };

  const closeCard = () => {
    if (openLogin) setOpenLogin(false);
    if (openRegister) setOpenRegister(false);
  };

  const submit = () => setIsUpdateUser(true);

  const sendData = () => {
    if (openLogin) {
      const { username, password } = newUser;
      if (username && password) {
        login({ username, password });
      }
    }
    if (openRegister) {
      register(newUser);
    }
    setUser(initStateUser);
  };

  useEffect(() => {
    if (isUpdateUser) {
      sendData();
      setIsUpdateUser(false);
    }
  }, [newUser]);

  useEffect(() => {
    if (isSuccessLogin) setUser(initStateUser);
  }, [isSuccessLogin]);

  return (
    <>
      <AppBar position="fixed" color="primary" className='Header'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ my: 2, height: '50px', width: '50px' }}>
              <Link to="/">
                <Icon
                  sx={{ width: '50px', display: 'block', height: '60px' }}
                >
                  <img className='Header__logo' src="./children-s-leisure-center.svg" alt="" />
                </Icon>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, color: 'white', display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
              {pages.map((page) => (
                (page.title !== 'расписание' || user) &&
                <Link key={page.title} to={page.path} style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      my: 2, color: 'gray', display: 'block', marginRight: '20px',
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
              <ThemeProvider theme={secondaryTheme}>
                {user
                  ? <UserMenu />
                  : <AuthorizationButton color="white" openLogin={() => { setOpenLogin(true); }} openRegister={() => { setOpenRegister(true); }} />
                }
              </ThemeProvider>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ModalCard
        title={returnTitle()}
        titleButton={returnButtonTitle()}
        isSuccess={isSuccessLogin || isSuccessRegister}
        isError={isErrorLogin || isErrorRegister}
        submit={submit}
        open={openLogin || openRegister}
        close={closeCard}
        formStyle={openRegister ? { display: 'grid' } : null}
      >
        {openLogin ?
          <LoginFrom user={newUser} setUser={setUser} isUpdateUser={isUpdateUser} setIsUpdateUser={() => { setIsUpdateUser(false); }} />
          :
          <RegisterForm user={newUser} setUser={setUser} isUpdateUser={isUpdateUser} setIsUpdateUser={() => { setIsUpdateUser(false); }} />
        }
      </ModalCard>
    </>
  );
}

export default Header;
