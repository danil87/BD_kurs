// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from "@mui/system";
import { useEffect } from "react";
import recordApi from "../../services/RecordService";
import TableGrid from "../TableGrid/TableGrid";
import { recordHeader } from "../../headers";
import './AccountRecord.css';
import { useAppSelector } from "../../hooks/redux";

const AccountRecord = () => {
    const { user } = useAppSelector(state => state.auth);
    const [getRecords, { data: records, isLoading }] = recordApi.useFetchAllRecordMutation();

    useEffect(() => {
        if (user?.id) getRecords([user.id]);
    }, [user]);

    return (
        <Box className='AccountRecord'>
            <TableGrid isLoading={isLoading} row={records} tableHeader={recordHeader} />
        </Box>
    );
};

export default AccountRecord;