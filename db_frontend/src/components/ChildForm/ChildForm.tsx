import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IChild } from "../../models/IChild";

type Props = {
    child: IChild,
    setChild: (child: IChild) => void,
    isUpdateChild: boolean;
    setIsUpdateChild: () => void;
}

const keyTranslate = {
    name: 'Имя',
    email: 'Почта',
    phoneNumber: 'Телефон',
    address: 'Адрес',
    age: 'Возраст',
    gender: 'Пол'
};

const ChildForm = ({ child, setChild, isUpdateChild, setIsUpdateChild }: Props) => {
    const [newChild, setNewChild] = useState<IChild>(child);
    const newChildKeys = Object.keys(keyTranslate);

    const changeChild = (key: string, value: string) => {
        let newValue: string | number = value;

        if (typeof child[key as keyof IChild] === 'number') {
            newValue = parseInt(value, 10);
            newValue = Number.isNaN(newValue) ? '' : newValue;
        }

        setNewChild({
            ...newChild,
            [key]: newValue
        });
    };

    useEffect(() => {
        if (isUpdateChild && newChild !== child) setChild(newChild);
        else setIsUpdateChild();
    }, [isUpdateChild]);

    return (
        <>
            {newChildKeys.map(key => (
                key !== 'gender' ?
                    <TextField
                        key={key}
                        color="info"
                        value={Number.isNaN(newChild[key as keyof IChild]) ? '' : newChild[key as keyof IChild]}
                        onChange={(event) => changeChild(key, event.target.value)}
                        label={keyTranslate[key as keyof (typeof keyTranslate)]}
                        placeholder={keyTranslate[key as keyof (typeof keyTranslate)]}
                        variant="outlined"
                        sx={{ margin: '10px' }}
                    />
                    :
                    <FormControl key={key} sx={{ margin: '10px' }}>
                        <InputLabel color="info">Пол</InputLabel>
                        <Select
                            color="info"
                            variant="outlined"
                            label={keyTranslate[key as keyof (typeof keyTranslate)]}
                            placeholder={keyTranslate[key as keyof (typeof keyTranslate)]}
                            value={newChild[key as keyof IChild]}
                            onChange={(event) => changeChild(key, event.target.value.toString())}
                        >
                            <MenuItem value='М'>М</MenuItem>
                            <MenuItem value='Ж'>Ж</MenuItem>
                        </Select >
                    </FormControl>
            ))}
        </>
    );
};

export default React.memo(ChildForm);