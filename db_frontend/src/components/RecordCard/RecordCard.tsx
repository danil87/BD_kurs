import { Alert, Box, Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Modal, Select, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { secondaryTheme } from "../../theme";
import lessonApi from "../../services/LessonService";
import { ILesson } from "../../models/ILesson";
import childApi from "../../services/ChildService";
import { IChild } from "../../models/IChild";
import recordApi from "../../services/RecordService";
import './RecordCard.css';

interface Record {
    childName: string;
    lessonName: string;
    childId: number | null;
    lessonId: number | null;
    parentId: number;
}

const initState: Record = {
    childName: '',
    lessonName: '',
    childId: null,
    lessonId: null,
    parentId: 1
};

type Props = {
    open: boolean;
    close: () => void;
    idLesson: number;
    lessonName: string;
}

const RecordCard = ({ open, close, idLesson, lessonName }: Props) => {
    const { data: lessons } = lessonApi.useFetchAllLessonQuery();
    const { data: children } = childApi.useFetchAllChildQuery([1]);
    const [createRecord, { isSuccess, isError }] = recordApi.useCreateNewRecordMutation();
    const [newRecord, setNewRecord] = useState(initState);

    const changeLesson = (lesson: ILesson) => {
        setNewRecord({
            ...newRecord,
            lessonName: lesson.name,
            lessonId: lesson.id || null
        });
    };

    const changeChild = (child: IChild) => {
        setNewRecord({
            ...newRecord,
            childName: child.name,
            childId: child.id || null
        });
    };

    const submit = () => {
        const { childId, lessonId, parentId } = newRecord;
        createRecord({ childId, lessonId, parentId });
    };

    useEffect(() => {
        if (lessonName && idLesson) {
            setNewRecord({
                ...newRecord,
                lessonId: idLesson,
                lessonName,
            });
        }
    }, []);

    return (
        <ThemeProvider theme={secondaryTheme}>
            <Modal
                open={open}
                onClose={close}
                sx={{ width: '40%', margin: '0 auto', top: '10%' }}
            >
                <Card>
                    <CardContent>
                        {isSuccess &&
                            <Alert
                                severity="success">
                                Запись успешно добавлена!
                            </Alert>
                        }
                        {isError &&
                            <Alert
                                severity="error">
                                Что-то пошло не так, попробуйте позже :(
                            </Alert>
                        }
                        <Typography variant="h5"
                            sx={{ width: '62%', margin: '10px auto 20px auto' }}>
                            Выберите занятия и ребёнка для записи
                        </Typography>
                        <Box className="RecordCard__form">
                            <FormControl>
                                <InputLabel>Занятие</InputLabel>
                                <Select
                                    className="RecordCard__form__select"
                                    value={newRecord.lessonName}
                                    label="Занятие"
                                    sx={{ width: '200px' }}
                                >
                                    {lessons?.map(lesson => (
                                        <MenuItem
                                            key={lesson.id}
                                            value={lesson.name}
                                            onClick={() => changeLesson(lesson)}>{lesson.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Ребёнок</InputLabel>
                                <Select
                                    className="RecordCard__form__select"
                                    value={newRecord.childName}
                                    label="ребёнок"
                                    sx={{ width: '200px' }}
                                >
                                    {children?.map(child => (
                                        <MenuItem
                                            key={child.id}
                                            onClick={() => changeChild(child)}
                                            value={child.name}>
                                            {child.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', marginRight: '35px' }}>
                        <Button size="small" color='info' onClick={submit}>
                            Записаться
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </ThemeProvider>
    );
};

export default RecordCard;