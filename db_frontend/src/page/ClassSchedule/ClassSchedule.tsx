import lessonApi from '../../services/LessonService';
import TableGrid from '../../components/TableGrid/TableGrid';
import { lessonHeader } from '../../headers';
import './ClassSchedule.css';

function ClassSchedule() {
  const { data: lessons, isLoading } = lessonApi.useFetchAllLessonQuery();

  return (
    <div className='ClassSchedule'>
      <TableGrid row={lessons} isLoading={isLoading} tableHeader={lessonHeader} />
    </div>
  );
}

export default ClassSchedule;
