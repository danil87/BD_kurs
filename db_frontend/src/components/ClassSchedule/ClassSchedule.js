import { DataGrid, GridAlignment, GridColType } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './ClassSchedule.css'

const tableHeader = [
    { field: 'title', headerName: 'Название', width: 200,  },
    { field: 'specialist', headerName: 'Специалист', width: 150, aling: "right"  },
    { field: 'date', headerName: 'Дата', width: 100 },
    { field: 'timeStart', headerName: 'Время начала', width: 120 },
    { field: 'timeEnd', headerName: 'Время окончания', width: 150 },
    { field: 'age', headerName: 'Возраст', width: 100 },
    { field: 'cost', headerName: 'Стоимость' },
    {
        field: 'subscribe',
        headerName: 'Записаться',
        width: 150,
        renderCell: (params) => {
            const onClick = (event) => {
                event.stopPropagation();
            };

            console.log(params);

            return (
                <Button
                    onClick={onClick}
                    sx={{ my: 2 }}
                >
                    Записаться
                </Button>
            )
        }
    }
];

const rows = [
    {
        "id": 1,
        "title": "Dental cleaning",
        "specialist": "Dentist",
        "date": "2022-11-15",
        "age": "Adult",
        "cost": "$100",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 2,
        "title": "Eye exam",
        "specialist": "Ophthalmologist",
        "date": "2022-10-20",
        "age": "Adult",
        "cost": "$80",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 3,
        "title": "Flu shot",
        "specialist": "Nurse",
        "date": "2022-09-25",
        "age": "Adult",
        "cost": "$30",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 4,
        "title": "Physical therapy",
        "specialist": "Physiotherapist",
        "date": "2022-10-05",
        "age": "Senior",
        "cost": "$120",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 5,
        "title": "Blood test",
        "specialist": "Lab Technician",
        "date": "2022-11-10",
        "age": "Adult",
        "cost": "$50",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 6,
        "title": "X-ray",
        "specialist": "Radiologist",
        "date": "2022-09-30",
        "age": "Adult",
        "cost": "$70",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 7,
        "title": "Dermatology consultation",
        "specialist": "Dermatologist",
        "date": "2022-10-12",
        "age": "Adult",
        "cost": "$90",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 8,
        "title": "Child vaccination",
        "specialist": "Pediatrician",
        "date": "2022-11-05",
        "age": "Child",
        "cost": "$40",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 9,
        "title": "Chiropractic adjustment",
        "specialist": "Chiropractor",
        "date": "2022-10-15",
        "age": "Adult",
        "cost": "$60",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    },
    {
        "id": 10,
        "title": "Mental health counseling",
        "specialist": "Psychologist",
        "date": "2022-09-20",
        "age": "Adult",
        "cost": "$80",
        "timeStart": "12:00",
        "timeEnd": "13:00",
    }
]

function ClassSchedule() {
    return (
        <div className='ClassSchedule'>
            <DataGrid
                rows={rows}
                columns={tableHeader}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 10 },
                //     },
                // }}
                disableRowSelectionOnClick
                autoHeight
                autoPageSize
            />
        </div>
    )
}

export default ClassSchedule;