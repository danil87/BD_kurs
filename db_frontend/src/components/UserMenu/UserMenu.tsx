import {
  Button, Typography, Box, MenuItem, ThemeProvider, Menu,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './UserMenu.css';
import { secondaryTheme } from '../../theme';
import { logout } from '../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';


function UserMenu() {
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
    navigate('/cabinet');
  }

  const resetsUser = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box>
      <Button color='secondary'
        sx={{ my: 1 }}
        onClick={openMenu}>
        <Typography variant="spanBlock">{user?.name}</Typography>
        {/* <Avatar sx={{ marginLeft: '20px' }} src={user.avatar} /> */}
      </Button>
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
        <ThemeProvider theme={secondaryTheme}>
          <MenuItem onClick={redirectToCabinet}>
            <Typography color='primary' textAlign="center">Профиль</Typography>
          </MenuItem>
          <MenuItem onClick={resetsUser}>
            <Typography color='primary' textAlign="center">Выйти</Typography>
          </MenuItem>
        </ThemeProvider>
      </Menu>
    </Box>
  );
}

export default UserMenu;
