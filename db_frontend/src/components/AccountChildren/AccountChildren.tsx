import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { childHeader } from "../../headers";
import childApi from "../../services/ChildService";
import TableGrid from "../TableGrid/TableGrid";
import './AccountChildren.css';

const AccountChildren = () => {
    const { data: children, isLoading } = childApi.useFetchAllChildQuery([1]);
    const [createChild] = childApi.useCreateNewChildMutation();

    useEffect(() => {
        createChild({
            name: "string",
            email: "string",
            phoneNumber: "string",
            address: "string",
            age: 0,
            gender: "string",
            parentId: 0
        });
    }, []);

    return (
        <Box className='AccountChildren'>
            <TableGrid row={children} isLoading={isLoading} tableHeader={childHeader} />
            <Button
                sx={{ alignSelf: 'flex-end' }}
            >Добавить ребёнка</Button>
        </Box>
    );
};

export default AccountChildren;