import {
  Button, Avatar, Typography, Box, MenuItem, ThemeProvider, Menu,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './UserMenu.css';
import { secondaryTheme } from '../../theme';

const user = {
  login: "User's login",
  avatar: '',
};

type Props = {
  logOut: () => void
}

function UserMenu({ logOut }: Props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

  return (
    <Box>
      <Button color='secondary'
        sx={{ my: 1 }}
        onClick={openMenu}>
        <Typography variant="spanBlock">{user.login}</Typography>
        <Avatar sx={{ marginLeft: '20px' }} src={user.avatar} />
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
          <MenuItem onClick={logOut}>
            <Typography color='primary' textAlign="center">Выйти</Typography>
          </MenuItem>
        </ThemeProvider>
      </Menu>
    </Box>
  );
}

export default UserMenu;
