import { Divider, IconButton, Rating } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IFeedback } from "../../models/IFeedback";
import { useAppSelector } from "../../hooks/redux";

type Props = {
    feedbacks: IFeedback[];
    removeFeedback: (id: number) => void;
    showDeleteButton: boolean;
    openEditCard: (feedback: IFeedback) => void;
}

const FeedbackList = ({ feedbacks, removeFeedback, showDeleteButton, openEditCard }: Props) => {
    const { user } = useAppSelector(state => state.auth);

    return (
        feedbacks.map((feedback, index) => (
            <div className="UsersFeedback__feedback" key={feedback.id}>
                <div className="UsersFeedback__feedback-header">
                    <div className="feedback-header__user-info">
                        <div className="user-info__name">
                            {feedback.parentName}
                        </div>
                    </div>
                    <div className="feedback-header__feedback-info">
                        <div className="feedback-info__raiting">
                            <Rating value={feedback.raiting} readOnly />
                        </div>
                        {(showDeleteButton || user?.id === feedback.parentId) &&
                            <>
                                <IconButton
                                    className='UserFeedback__delete'
                                    onClick={() => openEditCard(feedback)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className='UserFeedback__delete'
                                    onClick={() => removeFeedback(feedback.id || 0)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    </div>
                </div>
                <div className="UsersFeedback__body">
                    {feedback.text}
                </div>
                {index !== feedbacks.length - 1 && <Divider />}
            </div>
        ))
    );
};

export default FeedbackList;