import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { childHeader } from "../../headers";
import childApi from "../../services/ChildService";
import TableGrid from "../TableGrid/TableGrid";
import './AccountChildren.css';
import { useAppSelector } from "../../hooks/redux";

const AccountChildren = () => {
    const { user } = useAppSelector(state => state.auth);
    const [getChildren, { data: children, isLoading }] = childApi.useFetchAllChildMutation();

    useEffect(() => {
        if (user?.id) {
            getChildren([user.id]);
        }
    }, [user]);

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