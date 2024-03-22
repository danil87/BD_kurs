import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import ButtonTable from './components/ButtonTable/ButtonTable';

export const lessonHeader: GridColDef[] = [
  {
    field: 'name', headerName: 'Название', width: 180, headerAlign: 'center', align: 'center', disableReorder: true
  },
  {
    field: 'staff_position', headerName: 'Специалист', width: 180, align: 'center', headerAlign: 'center',
  },
  {
    field: 'date_lesson', headerName: 'Дата', width: 200, align: 'center', headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toLocaleString()
  },
  {
    field: 'duration', headerName: 'Продолжительность', width: 170, align: 'center', headerAlign: 'center',
  },
  {
    field: 'age', headerName: 'Возраст', width: 100, align: 'center', headerAlign: 'center',
  },
  {
    field: 'price', headerName: 'Стоимость', width: 100, align: 'center', headerAlign: 'center',
  },
  {
    field: 'subscribe',
    headerName: 'Записаться',
    width: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <ButtonTable lessonId={params.row.id} lessonName={params.row.name} />
    ),
  },
];

export const staffHeader: GridColDef[] = [
  { field: 'postion', headerName: 'Должность' },
  { field: 'salary', headerName: 'Зарплата' }
];