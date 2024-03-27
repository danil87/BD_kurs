import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { ILesson } from "../../models/ILesson";
import { IStaff } from "../../models/IStaff";
import { IChild } from "../../models/IChild";
import { IRecord } from "../../models/IRecord";
import { IPayment } from "../../models/IPayment";

type rowType = ILesson[] | IStaff[] | IChild[] | IRecord[] | IPayment[] | undefined;

type Props = {
    row: rowType;
    tableHeader: GridColDef[];
    isLoading: boolean;
    openEditCard?: (row: any) => void;
}

const TableGrid = ({ row, tableHeader, isLoading, openEditCard }: Props) => (
    <Box>
        <DataGrid
            rows={row || []}
            columns={tableHeader}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            loading={isLoading}
            autoHeight={true}
            // getRowHeight={() => 'auto'}
            sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none",
                },
            }}
            onRowClick={(e) => { if (openEditCard) openEditCard(e.row); }
            }
        />
    </Box>
);

export default TableGrid;