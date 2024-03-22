import { Button } from "@mui/material";
import { useState } from "react";
import RecordCard from "../RecordCard/RecordCard";

type Props = {
    lessonId: number,
    lessonName: string;
}

const ButtonTable = ({ lessonId, lessonName }: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                color='success'
                onClick={() => setOpen(true)}
                sx={{ my: 2 }}
            >
                Записаться
            </Button>
            {open &&
                <RecordCard open={open} close={() => { setOpen(false); }} idLesson={lessonId} lessonName={lessonName} />
            }
        </>
    );
};

export default ButtonTable;