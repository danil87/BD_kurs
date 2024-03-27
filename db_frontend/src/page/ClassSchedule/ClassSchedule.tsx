import { useEffect, useState } from 'react';
import { Button, ThemeProvider } from '@mui/material';
import lessonApi from '../../services/LessonService';
import TableGrid from '../../components/TableGrid/TableGrid';
import { lessonHeader, removeButton } from '../../headers';
import { useAppSelector } from '../../hooks/redux';
import './ClassSchedule.css';
import { secondaryTheme } from '../../theme';
import ModalCard from '../../components/ModalCard/ModalCard';
import { ILesson } from '../../models/ILesson';
import LessonForm from '../../components/LessonForm/LessonForm';
import returnErrorMessage from '../../utils/returnErrorMessage';

const initStateLesson: ILesson = {
  name: '',
  staff_position: '',
  staff_id: NaN,
  date_lesson: '',
  age: NaN,
  duration: NaN,
  price: NaN
};

function ClassSchedule() {
  const { user } = useAppSelector(state => state.auth);
  const [newLesson, setNewLesson] = useState<ILesson>(initStateLesson);
  const [isUpdateLesson, setIsUpdateLesson] = useState<boolean>(false);
  const [openNewLessonCard, setOpenNewLessonCard] = useState<boolean>(false);
  const [openEditLessonCard, setOpenEditLessonCard] = useState<boolean>(false);
  const [getLesson, { data: lessons, isLoading }] = lessonApi.useFetchAllLessonMutation({
    fixedCacheKey: 'lesson'
  });
  const [updateLesson, { isSuccess: isSuccessUpdate, isError: isErrorUdpate, error: errorCreate }] = lessonApi.useUpdateLessonMutation();
  const [createLesson, { isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorUpdate }] = lessonApi.useCreateNewLessonMutation();

  const returnTitle = (): string => {
    if (openNewLessonCard) return 'Регистрация сотрудника';
    return 'Изменение данных сотрудника';
  };

  const openEditCard = (lesson: ILesson) => {
    if (user?.is_superuser) {
      setNewLesson(lesson);
      setOpenEditLessonCard(true);
    }
  };

  const closeCard = () => {
    if (openNewLessonCard) setOpenNewLessonCard(false);
    if (openEditLessonCard) {
      setOpenEditLessonCard(false);
      setNewLesson(initStateLesson);
    }
  };


  const submit = () => setIsUpdateLesson(true);

  const sendData = async () => {
    if (user?.id) {
      if (openNewLessonCard) {
        await createLesson(newLesson);
        setNewLesson(initStateLesson);

      }
      if (openEditLessonCard) {
        await updateLesson(newLesson);
      }
      getLesson([user.id]);
    }
  };

  useEffect(() => {
    if (isUpdateLesson) {
      sendData();
      setIsUpdateLesson(false);
    }
  }, [newLesson]);

  useEffect(() => {
    if (user?.id) getLesson([user.id]);
  }, [user]);

  return (
    <div className='ClassSchedule' style={user?.is_superuser ? { width: '63%' } : {}}>
      <TableGrid
        row={lessons}
        isLoading={isLoading}
        tableHeader={user?.is_superuser ? [...lessonHeader, removeButton] : lessonHeader}
        openEditCard={openEditCard} />
      <ThemeProvider theme={secondaryTheme}>
        {user?.is_superuser &&
          <Button
            sx={{ alignSelf: 'flex-end', marginTop: '20px' }}
            onClick={() => setOpenNewLessonCard(true)}>
            Добавить занятие
          </Button>
        }
      </ThemeProvider>
      <ModalCard
        title={returnTitle()}
        titleButton="Сохранить"
        open={openNewLessonCard || openEditLessonCard}
        close={closeCard}
        isSuccess={isSuccessCreate || isSuccessUpdate}
        isError={isErrorCreate || isErrorUdpate}
        submit={submit}
        formStyle={{ display: 'grid' }}
        successAlertText="Данные успешно сохранены!"
        errorAlertText={returnErrorMessage(openNewLessonCard, openEditLessonCard, errorCreate, errorUpdate)}
      >
        <LessonForm lesson={newLesson} setLesson={setNewLesson}
          isUpdateLesson={isUpdateLesson} setIsUpdateLesson={() => { setIsUpdateLesson(false); }} />
      </ModalCard>
    </div>
  );
}

export default ClassSchedule;
