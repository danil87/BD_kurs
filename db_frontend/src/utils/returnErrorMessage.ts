import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Error = FetchBaseQueryError | SerializedError | undefined

const returnErrorMessage = (
    openNewCard: boolean,
    openEditCard: boolean,
    errorCreate: Error,
    errorUpdate: Error
): () => string => () => {
    if (openNewCard && errorCreate && 'status' in errorCreate) {
        const { detail } = errorCreate.data as { detail: string | any[] };
        return typeof detail === 'string' ? detail : detail[0].msg;
    }
    if (openEditCard && errorUpdate && 'status' in errorUpdate) {
        const { detail } = errorUpdate.data as { detail: string | any[] };
        return typeof detail === 'string' ? detail : detail[0].msg;
    }
    if (openNewCard && errorCreate && 'detail' in errorCreate) {
        const { detail } = errorCreate as { detail: string };
        return detail;
    }

    return '';
};

export default returnErrorMessage;