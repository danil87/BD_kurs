import { TextField } from "@mui/material";
import React from "react";
import { IChild } from "../../models/IChild";

type Props = {
    child: IChild,
    changeChild: (key: string, value: string) => void,
}

const keyTranslate = {
    name: 'Имя',
    email: 'Почта',
    phoneNumber: 'Телефон',
    address: 'Адрес',
    age: 'Возраст',
    gender: 'Пол'
};

const ChildForm = ({ child, changeChild }: Props) => {
    const childKeys = Object.keys(keyTranslate);

    return (
        <>
            {childKeys.map(key => (
                <TextField
                    key={key}
                    color="info"
                    value={Number.isNaN(child[key as keyof IChild]) ? '' : child[key as keyof IChild]}
                    onChange={(event) => changeChild(key, event.target.value)}
                    label={keyTranslate[key as keyof (typeof keyTranslate)]}
                    placeholder={keyTranslate[key as keyof (typeof keyTranslate)]}
                    variant="outlined"
                    id="outlined-basic"
                    sx={{ margin: '10px' }}
                />

            ))}
        </>
    );
};

export default ChildForm;