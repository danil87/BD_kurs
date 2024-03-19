import { Box, Button } from '@mui/material';

function AuthorizationButton({ theme, color }) {
  return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                theme={theme}
                color='secondary'
                sx={{
                  my: 2, display: 'block', marginLeft: '15px', marginRight: '20px',
                }}
            >
                Зарегистрироваться
            </Button >
            <Button theme={theme}
                color='secondary'
                sx={{ my: 2, display: 'block', color }}
                variant="contained"
            >
                Войти
            </Button>
        </Box >
  );
}

export default AuthorizationButton;
