import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import lessonApi from "../../services/LessonService";
import childApi from "../../services/ChildService";
import { useAppSelector } from "../../hooks/redux";
import { Record } from "../../models/IRecord";
import { ILesson } from "../../models/ILesson";
import { IChild } from "../../models/IChild";
import './RecordCard.css';

type Props = {
    newRecord: Record,
    changeLesson: (lesson: ILesson) => void,
    changeChild: (child: IChild) => void
}

const RecordCard = ({ newRecord, changeLesson, changeChild }: Props) => {
    const { user } = useAppSelector(state => state.auth);
    const [getLessons, { data: lessons }] = lessonApi.useFetchAllLessonMutation();
    const [getChildren, { data: children }] = childApi.useFetchAllChildMutation();

    useEffect(() => {
        if (user?.id) {
            getChildren([user.id]);
            getLessons([user.id]);
        }
    }, [user]);

    return (
        <>
            <FormControl sx={{ margin: '10px' }}>
                <InputLabel color="info">Занятие</InputLabel>
                <Select
                    className="RecordCard__form__select"
                    color="info"
                    value={lessons ? newRecord?.lessonName : ''}
                    label="Занятие"
                >
                    {lessons?.map(lesson => (
                        <MenuItem
                            key={lesson.id}
                            value={lesson.name}
                            onClick={() => changeLesson(lesson)}>{lesson.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ margin: '10px' }}>
                <InputLabel color="info">Ребёнок</InputLabel>
                <Select
                    className="RecordCard__form__select"
                    color="info"
                    value={children ? newRecord.childName : ''}
                    label="ребёнок"
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