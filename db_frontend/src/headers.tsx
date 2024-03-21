import { Button, ThemeProvider } from '@mui/material';
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { secondaryTheme } from './theme';

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
    renderCell: () => {
      const onClick = (event: React.MouseEvent) => {
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

export const staffHeader: GridColDef[] = [
  { field: 'postion', headerName: 'Должность' },
  { field: 'salary', headerName: 'Зарплата' }
];