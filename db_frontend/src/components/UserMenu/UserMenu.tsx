import {
  Button, Avatar, Typography, Box, Menu, MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

  function openMenu({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(currentTarget);
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
        sx={{ width: '300px', position: 'absolute' }}
        id="menu-appbar"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={closeMenu}
      >
        <MenuItem onClick={redirectToCabinet}>
          <Typography textAlign="center">Профиль</Typography>
        </MenuItem>
        <MenuItem onClick={logOut}>
          <Typography textAlign="center">Выйти</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
