import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import './Header.css';
import UserMenu from '../UserMenu/UserMenu';
import { secondaryTheme } from '../../theme';
import LoginFrom from '../LoginForm/LoginForm';
import ModalCard from '../ModalCard/ModalCard';
import authApi from '../../services/AuthService';
import { ContextFormLogin, initStateLogin } from '../../context';
import { useAppSelector } from '../../hooks/redux';

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

function Header() {
  const { user } = useAppSelector(state => state.auth);
  const [openLogin, setOpenLogin] = useState(false);
  const [userForLogin, setUser] = useState(initStateLogin);
  const [login, { isSuccess, isError }] = authApi.useLoginMutation();

  const changeUser = (key: string, value: string) => {
    setUser({ ...userForLogin, [key]: value });
  };

  const submit = () => {
    login(userForLogin);
  };

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
                  : <AuthorizationButton color="white" openLogin={() => { setOpenLogin(true); }} />
                }
              </ThemeProvider>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ContextFormLogin.Provider value={{ userForLogin, changeUser }}>
        <ModalCard
          title='Вход'
          titleButton='Войти'
          isSuccess={isSuccess}
          isError={isError}
          submit={submit}
          open={openLogin} close={() => setOpenLogin(false)}>
          <LoginFrom />
        </ModalCard>
      </ContextFormLogin.Provider>
    </>
  );
}

export default Header;
