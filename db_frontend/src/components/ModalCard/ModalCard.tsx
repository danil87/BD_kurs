import { ThemeProvider } from "styled-components";
import { Alert, Box, Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
import { secondaryTheme } from "../../theme";

interface Props {
    title: string;
    titleButton: string;
    open: boolean;
    close: () => void;
    isSuccess: boolean;
    isError: boolean;
    submit: () => void;
    children: JSX.Element;
}

const ModalCard = ({ title, titleButton, open, close, isSuccess, isError, submit, children }: Props) => (
    <ThemeProvider theme={secondaryTheme}>
        <Modal
            open={open}
            onClose={close}
            sx={{ width: '40%', margin: '0 auto', top: '30%' }}
        >
            <Card>
                <CardContent>
                    {isSuccess &&
                        <Alert
                            severity="success">
                            Запись успешно добавлена!
                        </Alert>
                    }
                    {isError &&
                        <Alert
                            severity="error">
                            Что-то пошло не так, попробуйте позже :(
                        </Alert>
                    }
                    <Box
                        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="spanBlock"
                            sx={{ margin: '10px auto 20px auto', fontFamily: '"Roboto", sans-serif' }}>
                            {title}
                        </Typography>
                    </Box>
                    <Box className="RecordCard__form">
                        {children}
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', marginRight: '35px' }}>
                    <Button size="small" color='info' onClick={submit}>
                        {titleButton}
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    </ThemeProvider>
);

export default ModalCard;