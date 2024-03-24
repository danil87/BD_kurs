/* eslint-disable import/no-extraneous-dependencies */
import { Button, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IRecord } from "../../models/IRecord";
import { useAppSelector } from "../../hooks/redux";
import paymentApi from "../../services/PaymentService";
import lessonApi from "../../services/LessonService";
import { IPayment } from "../../models/IPayment";

type Props = {
    record: IRecord
}

const PaymentButton = ({ record }: Props) => {
    const { user } = useAppSelector(state => state.auth);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [getPayment, { data: payments }] = paymentApi.useFetchAllPaymentMutation();
    const [createPayment] = paymentApi.useCreateNewPaymentMutation();
    const { data: lesson, isSuccess } = lessonApi.useFetchOneLessonQuery(record.lessonId || 0);

    const toPay = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (isSuccess && lesson?.id && user?.id && record.id) {
            const newPayment: IPayment = {
                method: 'Карта',
                amount: lesson.price,
                parentId: user?.id,
                lessonId: lesson.id,
                recordId: record.id
            };

            await createPayment(newPayment);
            getPayment([user.id]);
        }
    };

    useEffect(() => {
        if (payments) {
            setIsPaid(!!payments.find(payment => payment.recordId === record.id));
        }
    }, [payments]);

    useEffect(() => {
        if (user?.id) getPayment([user.id]);
    }, [user]);

    return (
        isPaid ?
            <Checkbox color="info" onClick={(event) => event.stopPropagation()} checked />
            :
            <Button
                variant='outlined'
                color='info'
                onClick={toPay}>
                Оплатить
            </Button>
    );
};

export default PaymentButton;