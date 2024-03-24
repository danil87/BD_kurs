import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { IStaff } from "../../models/IStaff";

type Props = {
    staff: IStaff,
    setStaff: (staff: IStaff) => void;
    isUpdateStaff: boolean;
    setIsUpdateStaff: () => void;
}

const keyTranslate = {
    position: 'Должность',
    salary: 'Зарплата'
};

const StaffForm = ({ staff, setStaff, isUpdateStaff, setIsUpdateStaff }: Props) => {
    const [newStaff, setNewStaff] = useState<IStaff>(staff);
    const newStaffKeys = Object.keys(keyTranslate);

    const changeStaff = (key: string, value: string) => {
        let newValue: string | number = value;

        if (typeof staff[key as keyof IStaff] === 'number') {
            newValue = parseInt(value, 10);
            newValue = Number.isNaN(newValue) ? '' : newValue;
        }

        setNewStaff({
            ...newStaff,
            [key]: newValue
        });
    };

    useEffect(() => {
        if (isUpdateStaff && newStaff !== staff) setStaff(newStaff);
        else setIsUpdateStaff();
    }, [isUpdateStaff]);

    return (
        <>
            {newStaffKeys.map(key => (
                <TextField
                    key={key}
                    color="info"
                    value={Number.isNaN(newStaff[key as keyof IStaff]) ? '' : newStaff[key as keyof IStaff]}
                    onChange={(event) => changeStaff(key, event.target.value)}
                    label={keyTranslate[key as keyof (typeof keyTranslate)]}
                    placeholder={keyTranslate[key as keyof (typeof keyTranslate)]}
                    variant="outlined"
                    sx={{ margin: '10px' }}
                />
            ))}
        </>
    );
};

export default StaffForm;