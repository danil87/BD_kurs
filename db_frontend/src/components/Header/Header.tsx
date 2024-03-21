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
  const [isUserAuth, setIsUserAuth] = useState(true);

  return (
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
              {isUserAuth
                ? <UserMenu logOut={() => setIsUserAuth(false)} />
                : <AuthorizationButton color="white" />
              }
            </ThemeProvider>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
