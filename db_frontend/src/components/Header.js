import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
import Icon from '@mui/material/Icon';
import './Header.css'

const pages = ['расписание', 'Специалисты', 'О нас'];

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        }
    }
})

function Header() {
    return (
        <AppBar position="fixed" theme={theme} color="primary" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{my: 2, height: '50px', width: '50px'}}>
                        <Icon
                        sx={{width: '50px', display: 'block', height: '60px'}}
                        >
                            <img className='Header__logo' src="./rainbow.svg" />
                        </Icon>
                    </Box>
                    <Box sx={{ flexGrow: 1, color: 'white', display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'gray', display: 'block', marginRight: '20px'  }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                        sx={{ my: 2, display: 'block', marginLeft: '50px', marginRight: '20px' }}
                        >
                            Зарегистрироваться
                        </Button>
                        <Button
                            sx={{ my: 2, display: 'block' }}
                            variant="contained"
                        >
                            Войти
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;