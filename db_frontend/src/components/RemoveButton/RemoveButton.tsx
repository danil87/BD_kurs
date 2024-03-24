import { Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { IChild } from "../../models/IChild";
import { IRecord } from "../../models/IRecord";

type Props = {
    row: IChild | IRecord,
    deleteMethod: (id: number) => void;
    getMethod: (ids: number[]) => void;
}

const RemovedButton = ({ row, deleteMethod, getMethod }: Props) => {
    const { user } = useAppSelector(state => state.auth);

    const handleDelete = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (user?.id && row.id) {
            await deleteMethod(row.id);
            getMethod([user?.id]);
        }
    };

    return (
        <Button
            variant='outlined'
            color='error'
            onClick={handleDelete}
        >
            Удалить
        </Button>
    );
};

export default RemovedButton;