import { useEffect, useState } from "react";
import { Rating, TextField } from "@mui/material";
import { IFeedback } from "../../models/IFeedback";

type Props = {
    feedback: IFeedback;
    setFeedback: (feedback: IFeedback) => void;
    isUpdateFeedback: boolean;
    setIsUpdateFeedback: () => void;
}

const FeedbackForm = ({ feedback, setFeedback, isUpdateFeedback, setIsUpdateFeedback }: Props) => {
    const [newFeedback, setNewFeedback] = useState<IFeedback>(feedback);

    const changeFeedback = (key: string, value: number | string | null) => {
        if (value) {
            setNewFeedback({
                ...newFeedback,
                [key]: value
            });
        }
    };

    useEffect(() => {
        if (isUpdateFeedback && newFeedback !== feedback) setFeedback(newFeedback);
        else setIsUpdateFeedback();
    }, [isUpdateFeedback]);

    return (
        <>
            <Rating
                value={newFeedback.raiting || null}
                precision={0.5}
                onChange={(_, newValue) => changeFeedback('raiting', newValue)}
            />
            <TextField
                label="Текст отзыва"
                multiline
                value={newFeedback.text}
                onChange={(event) => changeFeedback('text', event.target.value)}
                color="info"
                sx={{ marginTop: '30px' }}
            />
        </>
    );
};

export default FeedbackForm;