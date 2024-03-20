import { Box, Button } from '@mui/material';

type Props = {
	color: string;
}

function AuthorizationButton({ color }: Props) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Button
				color='secondary'
				sx={{
					my: 2, display: 'block', marginLeft: '15px', marginRight: '20px',
				}}
			>
				Зарегистрироваться
			</Button >
			<Button
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
