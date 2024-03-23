import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect } from "react";
import lessonApi from "../../services/LessonService";
import childApi from "../../services/ChildService";
import './RecordCard.css';
import { ContextFormRecord } from "../../context";
import { useAppSelector } from "../../hooks/redux";

const RecordCard = () => {
    const { user } = useAppSelector(state => state.auth);
    const [getLessons, { data: lessons }] = lessonApi.useFetchAllLessonMutation();
    const [getChildren, { data: children }] = childApi.useFetchAllChildMutation();
    const { newRecord, changeLesson, changeChild } = useContext(ContextFormRecord);

    useEffect(() => {
        if (user?.id) {
            getChildren([user.id]);
            getLessons();
        }
    }, [user]);

    return (
        <>
            <FormControl>
                <InputLabel color="info">Занятие</InputLabel>
                <Select
                    className="RecordCard__form__select"
                    color="info"
                    value={newRecord?.lessonName}
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
                <InputLabel color="info">Ребёнок</InputLabel>
                <Select
                    className="RecordCard__form__select"
                    color="info"
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
        </>
    );
};

export default RecordCard;