// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from "@mui/system";
import recordApi from "../../services/RecordService";
import TableGrid from "../TableGrid/TableGrid";
import { recordHeader } from "../../headers";

const AccountRecord = () => {
    const { data: records, isLoading } = recordApi.useFetchAllRecordQuery([1]);

    return (
        <Box>
            <TableGrid isLoading={isLoading} row={records} tableHeader={recordHeader} />
        </Box>
    );
};

export default AccountRecord;