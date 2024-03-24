import { Box, Button } from '@mui/material';

type Props = {
	color: string;
	openLogin: () => void;
	openRegister: () => void;
}

function AuthorizationButton({ color, openLogin, openRegister }: Props) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Button
				color='secondary'
				sx={{
					my: 2, display: 'block', marginLeft: '15px', marginRight: '20px',
				}}
				onClick={openRegister}
			>
				Зарегистрироваться
			</Button >
			<Button
				onClick={openLogin}
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
