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
      <ButtonTable idLesson={params.row.id} lessonName={params.row.name} />
    ),
  },
];

export const staffHeader: GridColDef[] = [
  { field: 'postion', headerName: 'Должность' },
  { field: 'salary', headerName: 'Зарплата' }
];

export const childHeader: GridColDef[] = [
  { field: 'name', headerName: 'Имя', headerAlign: 'center', align: 'center' },
  { field: 'email', headerName: 'email', headerAlign: 'center', align: 'center' },
  { field: 'phoneNumber', headerName: 'Телефон', headerAlign: 'center', align: 'center' },
  { field: 'address', headerName: 'Адрес', headerAlign: 'center', align: 'center' },
  { field: 'age', headerName: 'Возраст', headerAlign: 'center', align: 'center' },
  { field: 'gender', headerName: 'Пол', headerAlign: 'center', align: 'center' },
];

export const recordHeader: GridColDef[] = [
  { field: 'lessonName', headerName: 'Заняти', headerAlign: 'center', align: 'center', width: 150 },
  { field: 'childName', headerName: 'Имя ребёнка', headerAlign: 'center', align: 'center', width: 150 },
  {
    field: 'lessonDate', headerName: 'Дата', headerAlign: 'center', align: 'center', width: 200,
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toLocaleString()
  }
];