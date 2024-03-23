import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ILesson } from "../../models/ILesson";
import { IStaff } from "../../models/IStaff";
import { IChild } from "../../models/IChild";
import { IRecord } from "../../models/IRecord";

type rowType = ILesson[] | IStaff[] | IChild[] | IRecord[] | undefined;

type Props = {
    row: rowType;
    tableHeader: GridColDef[];
    isLoading: boolean;
}

const TableGrid = ({ row, tableHeader, isLoading }: Props) => (
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
        sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none",
            },
        }}
    />
);

export default TableGrid;