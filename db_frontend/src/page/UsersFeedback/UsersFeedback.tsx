/* eslint-disable no-unsafe-optional-chaining */
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import feedbackApi from '../../services/FeedbackService';
import { useAppSelector } from '../../hooks/redux';
import FeedbackList from '../../components/FeedbackList/FeedbackList';
import { IFeedback } from '../../models/IFeedback';
import ModalCard from '../../components/ModalCard/ModalCard';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';
import returnErrorMessage from '../../utils/returnErrorMessage';
import './UsersFeedback.css';

type Props = {
  accountView?: boolean;
}

const initFeedback: IFeedback = {
  id: 0,
  text: '',
  parentId: 0,
  lessonId: 0,
  raiting: 0
};

const UsersFeedback = ({ accountView }: Props) => {
  const { user } = useAppSelector(state => state.auth);
  const [feedbacks, setFeedback] = useState<IFeedback[]>([]);
  const [newFeedback, setNewFeedback] = useState<IFeedback>(initFeedback);
  const [offset, setOffset] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [openEditFeedbackCard, setOpenEditFeedbackCard] = useState<boolean>(false);
  const [isUpdateFeedback, setIsUpdateFeedback] = useState<boolean>(false);
  const [getFeedback, { data: dataFeedback }] = feedbackApi.useFetchAllFeedbackMutation();
  const [updateFeedback, { isSuccess, isError, error }] = feedbackApi.useUpdateFeedbackMutation();
  const [deleteFeedback] = feedbackApi.useRemoveFeedbackMutation();

  const removeFeedback = async (id: number | undefined) => {
    if (id) {
      await deleteFeedback(id);
      getFeedbacks();
    }
  };

  const getFeedbacks = () => {
    if (user?.id && accountView) getFeedback({ offset, limit, ids: [user?.id] });
    if (!accountView) getFeedback({ offset, limit });
  };

  const openEditCard = (feedback: IFeedback) => {
    setNewFeedback(feedback);
    setOpenEditFeedbackCard(true);
  };

  useEffect(() => {
    setOffset(limit * (page - 1));
  }, [page]);

  useEffect(() => {
    getFeedbacks();
  }, [limit, offset, user]);

  useEffect(() => {
    if (dataFeedback) {
      const { count, data } = dataFeedback;
      setFeedback(data);
      setMaxPage(Math.ceil(count / limit));
    }
  }, [dataFeedback]);


  const submit = () => setIsUpdateFeedback(true);

  const sendData = async () => {
    if (openEditFeedbackCard) {
      await updateFeedback(newFeedback);
    }
    getFeedbacks();
  };

  useEffect(() => {
    if (isUpdateFeedback) {
      sendData();
      setIsUpdateFeedback(false);
    }
  }, [newFeedback]);

  return (
    <div className="UsersFeedback">
      <FeedbackList
        feedbacks={feedbacks}
        removeFeedback={removeFeedback}
        showDeleteButton={user?.is_superuser || false}
        openEditCard={openEditCard} />

      {!!maxPage &&
        <Pagination
          count={maxPage}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: 'center'
            },
          }} />
      }
      <ModalCard
        title='Редактирование отзыва'
        titleButton='сохранить'
        open={openEditFeedbackCard}
        close={() => setOpenEditFeedbackCard(false)}
        isSuccess={isSuccess}
        isError={isError}
        errorAlertText={returnErrorMessage(false, openEditFeedbackCard, {}, error)}
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
    </div>
  );
};

export default UsersFeedback;
