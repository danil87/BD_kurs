/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import { Box } from "@mui/system";
import { useAppSelector } from "../../hooks/redux";
import paymentApi from "../../services/PaymentService";
import TableGrid from "../TableGrid/TableGrid";
import { paymentHeader } from "../../headers";
import './AccountPayment.css';

const AccountPayment = () => {
    const { user } = useAppSelector(state => state.auth);
    const [getPaymentren, { data: payments, isLoading }] = paymentApi.useFetchAllPaymentMutation({
        fixedCacheKey: 'payment'
    });

    useEffect(() => {
        if (user?.id) {
            getPaymentren([user.id]);
        }
    }, [user]);

    return (
        <Box className='AccountPayment'>
            <TableGrid row={payments} isLoading={isLoading} tableHeader={paymentHeader} />
        </Box>
    );
};

export default AccountPayment;