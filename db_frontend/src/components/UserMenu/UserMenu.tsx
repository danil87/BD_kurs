import {
  Button, Avatar, Typography, Box, Menu, MenuItem, Popper, ThemeProvider, ClickAwayListener,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    console.log(1);
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function redirectToCabinet() {
    navigate('/cabinet');
  }

  useEffect(() => {
    console.log(anchorEl);
  }, [anchorEl]);

  return (
    <Box>
      <Button color='secondary'
        sx={{ my: 1 }}
        // onClick={openMenu}
        onClickCapture={openMenu}>
        <Typography variant="spanBlock">{user.login}</Typography>
        <Avatar sx={{ marginLeft: '20px' }} src={user.avatar} />
      </Button>
      <ClickAwayListener onClickAway={closeMenu}>
        <Popper
          className='UserMenu_popper'
          sx={{ width: '300px', position: 'absolute' }}
          id="menu-appbar"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          disablePortal
        >
          <ThemeProvider theme={secondaryTheme}>
            <MenuItem onClick={redirectToCabinet}>
              <Typography color='primary' textAlign="center">Профиль</Typography>
            </MenuItem>
            <MenuItem onClick={logOut}>
              <Typography color='primary' textAlign="center">Выйти</Typography>
            </MenuItem>
          </ThemeProvider>
        </Popper>
      </ClickAwayListener>
    </Box>
  );
}

export default UserMenu;
