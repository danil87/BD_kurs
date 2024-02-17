import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { createTheme, getContrastRatio, alpha } from '@mui/material';
import AuthorizationButton from './AuthorizationButton';
import './Header.css'

const pages = ['расписание', 'Специалисты', 'Отзывы', 'О нас'];

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        secondary: {
            main: '#fb8627',
            light: alpha('#fb8627', 0.5),
            dark: alpha('#fb8627', 0.9),
            contrastText: getContrastRatio('#fb8627', '#fff') > 4.5 ? '#fff' : '#111',
        }
    }
  })

function Header() {
    return (
        <AppBar position="fixed" theme={theme} color="primary" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ my: 2, height: '50px', width: '50px' }}>
                        <Icon
                            sx={{ width: '50px', display: 'block', height: '60px' }}
                        >
                            <img className='Header__logo' src="./children-s-leisure-center.svg" />
                        </Icon>
                    </Box>
                    <Box sx={{ flexGrow: 1, color: 'white', display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'gray', display: 'block', marginRight: '20px' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <AuthorizationButton theme={theme} color="white" />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;