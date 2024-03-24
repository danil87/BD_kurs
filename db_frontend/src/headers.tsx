import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import ButtonTable from './components/ButtonTable/ButtonTable';
import childApi from "./services/ChildService";
import RemoveButton from "./components/RemoveButton/RemoveButton";
import recordApi from "./services/RecordService";
import staffApi from "./services/StaffService";
import lessonApi from "./services/LessonService";
import PaymentButton from "./components/PaymentButton/PaymentButton";

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

export const removeButton: GridColDef = {
  field: 'delete',
  headerName: 'Удалить',
  width: 200,
  headerAlign: 'center',
  align: 'center',
  renderCell: (params: GridRenderCellParams) => {
    const [deleteMethod] = lessonApi.useRemoveLessonMutation();
    const [getMethod] = lessonApi.useFetchAllLessonMutation({
      fixedCacheKey: 'lesson'
    });

    return (
      <RemoveButton
        row={params.row}
        deleteMethod={deleteMethod}
        getMethod={getMethod} />
    );
  },
};

export const staffHeader: GridColDef[] = [
  { field: 'position', headerName: 'Должность', width: 200, headerAlign: 'center', align: 'center' },
  { field: 'salary', headerName: 'Зарплата', width: 200, headerAlign: 'center', align: 'center' },
  {
    field: 'delete', headerName: 'Удалить', headerAlign: 'center', align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const [deleteMethod] = staffApi.useRemoveStaffMutation();
      const [getMethod] = staffApi.useFetchAllStaffMutation({
        fixedCacheKey: 'staff'
      });

      return (
        <RemoveButton
          row={params.row}
          deleteMethod={deleteMethod}
          getMethod={getMethod} />
      );
    },
  }
];

export const childHeader: GridColDef[] = [
  { field: 'name', headerName: 'Имя', headerAlign: 'center', align: 'center', width: 150 },
  { field: 'email', headerName: 'email', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'phoneNumber', headerName: 'Телефон', headerAlign: 'center', align: 'center', width: 150 },
  { field: 'address', headerName: 'Адрес', headerAlign: 'center', align: 'center', width: 150 },
  { field: 'age', headerName: 'Возраст', headerAlign: 'center', align: 'center', width: 100 },
  { field: 'gender', headerName: 'Пол', headerAlign: 'center', align: 'center', width: 100 },
  {
    field: 'delete', headerName: 'Удалить', headerAlign: 'center', align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const [deleteMethod] = childApi.useRemoveChildMutation();
      const [getMethod] = childApi.useFetchAllChildMutation({
        fixedCacheKey: 'child'
      });

      return (
        <RemoveButton
          row={params.row}
          deleteMethod={deleteMethod}
          getMethod={getMethod} />
      );
    },
  }
];

export const recordHeader: GridColDef[] = [
  { field: 'lessonName', headerName: 'Заняти', headerAlign: 'center', align: 'center', width: 150 },
  { field: 'childName', headerName: 'Имя ребёнка', headerAlign: 'center', align: 'center', width: 150 },
  {
    field: 'lessonDate', headerName: 'Дата', headerAlign: 'center', align: 'center', width: 200,
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toLocaleString()
  },
  {
    field: 'payment', headerName: 'Оплата', headerAlign: 'center', align: 'center', width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <PaymentButton record={params.row} />
    ),
  },
  {
    field: 'delete', headerName: 'Удалить', headerAlign: 'center', align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const [deleteMethod] = recordApi.useRemoveRecordMutation();
      const [getMethod] = recordApi.useFetchAllRecordMutation({
        fixedCacheKey: 'record'
      });

      return (
        <RemoveButton
          row={params.row}
          deleteMethod={deleteMethod}
          getMethod={getMethod} />
      );
    },
  }
];

export const paymentHeader: GridColDef[] = [
  {
    field: 'lessonDate', headerName: 'Дата проведения', headerAlign: 'center', align: 'center', width: 200,
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toLocaleString()
  },
  { field: 'method', headerName: 'Способ оплаты', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'amount', headerName: 'Цена', headerAlign: 'center', align: 'center', width: 100 }
];