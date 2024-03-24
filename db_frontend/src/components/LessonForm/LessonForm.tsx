/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import { ILesson } from "../../models/ILesson";
import staffApi from "../../services/StaffService";
import { IStaff } from "../../models/IStaff";
import { secondaryTheme } from "../../theme";

type Props = {
    lesson: ILesson,
    setLesson: (lesson: ILesson) => void;
    isUpdateLesson: boolean;
    setIsUpdateLesson: () => void
}

const keyTranslate = {
    name: 'Название',
    staff_position: 'Специалист',
    date_lesson: 'Дата',
    age: 'Возраст',
    duration: 'Продолжительность',
    price: 'Стоимость'
};

dayjs.extend(utc);

const dateFormat = 'YYYY-MM-DD hh:mm:ss';

const LessonForm = ({ lesson, setLesson, isUpdateLesson, setIsUpdateLesson }: Props) => {
    const [newLesson, setNewLesson] = useState(lesson);
    const [getStaff, { data: staffs }] = staffApi.useFetchAllStaffMutation();

    const keys = Object.keys(keyTranslate);

    const changeStaff = (staff: IStaff) => {
        if (staff.id) {
            setNewLesson({
                ...newLesson,
                staff_id: staff.id,
                staff_position: staff.position
            });
        }
    };

    const changeLesson = (key: string, value: string | Dayjs | null) => {
        if (typeof value === 'string') {
            let newValue: string | number = value;
            if (typeof lesson[key as keyof ILesson] === 'number') {
                newValue = parseInt(value, 10);
                newValue = Number.isNaN(newValue) ? '' : newValue;

            }
            setNewLesson({ ...newLesson, [key]: newValue });
        }
        else if (value) {
            setNewLesson({
                ...newLesson,
                [key]: value.format(dateFormat),
            });
        }
    };

    const equalLesson = (lesson1: ILesson, lesson2: ILesson): boolean => {
        const date1 = lesson1.date_lesson;
        const date2 = lesson2.date_lesson;
        return JSON.stringify({ ...lesson1, date_lesson: '' }) === JSON.stringify({ ...lesson2, date_lesson: '' })
            && dayjs.utc(date1).format(dateFormat) === dayjs.utc(date2).format(dateFormat);
    };

    useEffect(() => {
        if (isUpdateLesson && !equalLesson(newLesson, lesson)) setLesson(newLesson);
        else setIsUpdateLesson();
    }, [isUpdateLesson]);

    useEffect(() => {
        getStaff([0]);
        setNewLesson({
            ...newLesson,
            date_lesson: dayjs.utc(newLesson.date_lesson).format('YYYY-MM-DD hh:mm:ss')
        });
    }, []);

    return (
        <>
            {keys.map(key => {
                if (key === 'staff_position') {
                    return (
                        <FormControl key={key} sx={{ margin: '10px' }}>
                            <InputLabel color="info">Специалист</InputLabel>
                            <Select
                                className="RecordCard__form__select"
                                color="info"
                                value={staffs ? newLesson.staff_position : ''}
                                label="Специалист"
                            >
                                {staffs?.map(staff => (
                                    <MenuItem
                                        key={staff.id}
                                        value={staff.position}
                                        onClick={() => changeStaff(staff)}>{staff.position}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    );
                }
                if (key === 'date_lesson') {
                    return (
                        <ThemeProvider key={key} theme={secondaryTheme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker sx={{ margin: '10px' }}
                                    timezone="UTC"
                                    value={dayjs.utc(newLesson.date_lesson)}
                                    onChange={(newDate) => changeLesson(key, newDate)}
                                    label={keyTranslate[key as keyof (typeof keyTranslate)]}
                                    ampm={false}
                                    ampmInClock={false} />
                            </LocalizationProvider>
                        </ThemeProvider>
                    );
                }

                return (<TextField
                    key={key}
                    color="info"
                    value={Number.isNaN(newLesson[key as keyof ILesson]) ? '' : newLesson[key as keyof ILesson]}
                    onChange={(event) => changeLesson(key, event.target.value)}
                    label={keyTranslate[key as keyof (typeof keyTranslate)]}
                    placeholder={keyTranslate[key as keyof (typeof keyTranslate)]}
                    variant="outlined"
                    sx={{ margin: '10px' }}
                />);
            })}
        </>
    );
};

export default LessonForm;