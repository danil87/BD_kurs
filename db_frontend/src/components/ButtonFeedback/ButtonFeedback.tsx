import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { IFeedback } from "../../models/IFeedback";
import feedbackApi from "../../services/FeedbackService";
import ModalCard from "../ModalCard/ModalCard";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import returnErrorMessage from "../../utils/returnErrorMessage";

type Props = {
    lessonId: number
}

const initFeedback: IFeedback = {
    text: '',
    parentId: 0,
    lessonId: 0,
    raiting: 0,
};

const ButtonFeedback = ({ lessonId }: Props) => {
    const { user } = useAppSelector(state => state.auth);
    const [openCreateFeedbackCard, setOpenCreateFeedbackCard] = useState<boolean>(false);
    const [isUpdateFeedback, setIsUpdateFeedback] = useState<boolean>(false);

    const [createFeedback, { isError, isSuccess, error }] = feedbackApi.useCreateNewFeedbackMutation();
    const [newFeedback, setNewFeedback] = useState<IFeedback>(initFeedback);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpenCreateFeedbackCard(true);
    };

    const submit = () => setIsUpdateFeedback(true);

    const sendData = async () => {
        if (openCreateFeedbackCard) {
            await createFeedback(newFeedback);
        }
    };

    useEffect(() => {
        if (isUpdateFeedback) {
            sendData();
            setIsUpdateFeedback(false);
        }
    }, [newFeedback]);

    useEffect(() => {
        if (user?.id) {
            setNewFeedback({
                ...newFeedback,
                parentId: user.id,
                lessonId
            });
        }
    }, [user]);

    return (
        <>
            <Button
                color='warning'
                variant='outlined'
                onClick={handleClick}>
                отзыв
            </Button>
            {openCreateFeedbackCard &&
                <ModalCard
                    title='Добавление нового отзыва'
                    titleButton='сохранить'
                    open={openCreateFeedbackCard}
                    close={() => setOpenCreateFeedbackCard(false)}
                    isSuccess={isSuccess}
                    isError={isError}
                    errorAlertText={returnErrorMessage(openCreateFeedbackCard, false, {}, error)}
                    successAlertText='Данные успешно сохранены'
                    submit={submit}
                >
                    <FeedbackForm
                        feedback={newFeedback}
                        setFeedback={setNewFeedback}
                        isUpdateFeedback={isUpdateFeedback}
                        setIsUpdateFeedback={() => { setIsUpdateFeedback(false); }}
                    />
                </ModalCard>
            }
        </>
    );
};

export default ButtonFeedback;