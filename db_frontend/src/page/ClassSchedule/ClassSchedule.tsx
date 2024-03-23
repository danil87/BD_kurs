import { useEffect } from 'react';
import lessonApi from '../../services/LessonService';
import TableGrid from '../../components/TableGrid/TableGrid';
import { lessonHeader } from '../../headers';
import './ClassSchedule.css';
import { useAppSelector } from '../../hooks/redux';

function ClassSchedule() {
  const { user } = useAppSelector(state => state.auth);
  const [getLessons, { data: lessons, isLoading }] = lessonApi.useFetchAllLessonMutation();

  useEffect(() => {
    if (user) getLessons();
  }, [user]);

  return (
    <div className='ClassSchedule'>
      <TableGrid row={lessons} isLoading={isLoading} tableHeader={lessonHeader} />
    </div>
  );
}

export default ClassSchedule;
