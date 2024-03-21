import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, ThemeProvider } from '@mui/material';
import lessonApi from '../../services/LessonService';
import { secondaryTheme } from '../../theme';
import './ClassSchedule.css';

const tableHeader: GridColDef[] = [
  { field: 'name', headerName: 'Название', width: 100 },
  {
    field: 'staff_position', headerName: 'Специалист', width: 100, align: 'right',
  },
  {
    field: 'date_lesson', headerName: 'Дата', width: 200, align: 'right',
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toLocaleString()
  },
  { field: 'duration', headerName: 'Продолжительность', width: 150, align: 'right' },
  { field: 'age', headerName: 'Возраст', width: 70, align: 'right' },
  { field: 'price', headerName: 'Стоимость', align: 'right' },
  {
    field: 'subscribe',
    headerName: 'Записаться',
    width: 150,
    renderCell: () => {
      const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
      };

      return (
        <ThemeProvider theme={secondaryTheme}>
          <Button
            color='secondary'
            onClick={onClick}
            sx={{ my: 2 }}
          >
            Записаться
          </Button>
        </ThemeProvider>
      );
    },
  },
];


function ClassSchedule() {
  const { data: lessons, isLoading } = lessonApi.useFetchAllLessonQuery();

  return (
    <div className='ClassSchedule'>
      <DataGrid
        rows={lessons || []}
        columns={tableHeader}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: (lessons && lessons?.length > 10 ? 10 : lessons?.length) || 10 },
          },
        }}
        disableRowSelectionOnClick
        loading={isLoading}
      />
    </div>
  );
}

export default ClassSchedule;
