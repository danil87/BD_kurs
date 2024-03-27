import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Alert, Box, Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
import { secondaryTheme } from "../../theme";
import './ModalCard.css';

interface Props {
    title: string;
    titleButton: string;
    open: boolean;
    close: () => void;
    isSuccess: boolean;
    isError: boolean;
    submit: () => void;
    children: JSX.Element;
    formStyle?: React.CSSProperties | null;
    successAlertText?: string;
    errorAlertText?: () => string;
}

const ModalCard = ({ title, titleButton, open, close, isSuccess, isError, submit, children, successAlertText, errorAlertText, formStyle }: Props) => {
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess || isError) setIsOpenAlert(true);
        const timer = setTimeout(() => setIsOpenAlert(false), 3000);

        return () => clearTimeout(timer);
    }, [isSuccess, isError]);

    // useEffect(() => {
    //     console.log(children);
    // }, [children]);

    return (
        <ThemeProvider theme={secondaryTheme}>
            <Modal
                className='ModalCard'
                open={open}
                onClose={close}
                sx={{ width: '30%', top: '10%' }}
            >
                <Card sx={{ position: 'relative' }}>
                    <CardContent>
                        {isSuccess && isOpenAlert &&
                            <Alert className="ModalCard__alert"
                                severity="success">
                                {successAlertText || 'Запись успешно добавлена!'}
                            </Alert>
                        }
                        {isError && isOpenAlert &&
                            <Alert className="ModalCard__alert"
                                severity="error">
                                {errorAlertText && errorAlertText() ? errorAlertText() : 'Что-то пошло не так, попробуйте позже :('}
                            </Alert>
                        }
                        <Box
                            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="spanBlock"
                                sx={{ margin: '10px auto 20px auto', fontFamily: '"Roboto", sans-serif' }}>
                                {title}
                            </Typography>
                        </Box>
                        <Box className="ModalCard__form"
                            sx={{ display: 'grid' }}>
                            {children}
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', marginRight: '20px' }}>
                        <Button size="small" variant="outlined" color='info' onClick={submit} sx={{ padding: '5px 10px' }}>
                            {titleButton}
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </ThemeProvider>
    );
};

export default ModalCard;