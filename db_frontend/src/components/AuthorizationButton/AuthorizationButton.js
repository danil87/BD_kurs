import { Box, Button } from "@mui/material";
import { useState } from "react";

function AuthorizationButton({ theme, color }) {
    const [isUserAuth, changeIsUserAuth] = useState(false);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {isUserAuth ?
                <Button theme={theme}
                    color='secondary'
                    sx={{ my: 2, display: 'block', color: color }}
                    variant="contained"
                >
                    Выход
                </Button>
                :
                <>
                    <Button
                        theme={theme}
                        color='secondary'
                        sx={{ my: 2, display: 'block', marginLeft: '15px', marginRight: '20px' }}
                    >
                        Зарегистрироваться
                    </Button>
                    <Button theme={theme}
                        color='secondary'
                        sx={{ my: 2, display: 'block', color: color }}
                        variant="contained"
                    >
                        Войти
                    </Button>
                </>
            }

        </Box>
    )
}

export default AuthorizationButton;