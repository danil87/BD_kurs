import {
  Button, Typography, Box, MenuItem, ThemeProvider, Menu,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './UserMenu.css';
import { secondaryTheme } from '../../theme';
import { logout } from '../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

type Props = {
  openRegister: () => void;
}

function UserMenu({ openRegister }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function openMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function redirectToCabinet() {
    closeMenu();
    navigate('/cabinet');
  }

  const resetsUser = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={{ alignSelf: 'center' }}>
      <Button color='secondary'
        sx={{ marginRight: '10px' }}
        onClick={openRegister}>
        Зарегистрировать пользователя
      </Button>
      <Button color='secondary'
        sx={{ my: 1 }}
        onClick={openMenu}>
        <Typography variant="spanBlock">{user?.name}</Typography>
      </Button>
      <ThemeProvider theme={secondaryTheme}>
        <Menu
          className='UserMenu_popper'
          sx={{ width: '300px', position: 'absolute' }}
          id="menu-appbar"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closeMenu}
          onChange={(event) => event.preventDefault()}
          disableScrollLock
        >

          <MenuItem onClick={redirectToCabinet}>
            <Typography
              color='primary'
              textAlign="center">Профиль</Typography>
          </MenuItem>
          <MenuItem onClick={resetsUser}>
            <Typography color='primary' textAlign="center">Выйти</Typography>
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </Box>
  );
}

export default UserMenu;
