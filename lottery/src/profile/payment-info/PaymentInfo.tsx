import React, {useState} from "react";
import style from "./PaymentInfo.module.scss";
import {Payment} from "../profile.service";
import {PaymentEntry} from "./payment-entry/PaymentEntry";
import {TagButton} from "@tag/tag-components-react-v2";
import {PaymentEntryForm} from "./payment-entry-form/PaymentEntryForm";

const {root, list, footer} = style;

export interface PaymentInfoProps {
    payments: Payment[]
    onNewPayment: (payment: Payment) => void;
    onRemovePayment: (payment: Payment) => void;
}

function useAddNew({onNewPayment, onRemovePayment}: PaymentInfoProps) {

    const [showAdd, setShowAdd] = useState();

    return {
        showAdd,
        onAdd: () => setShowAdd(true),
        onClose: () => setShowAdd(false),
        onSave: (payment: Payment) => {

            onNewPayment(payment);
            setShowAdd(false);
        },
    };
}

export function PaymentInfo(props: PaymentInfoProps) {
    const {onAdd, onClose, showAdd, onSave} = useAddNew(props);
    const {payments, onRemovePayment} = props;
    return <div className={root}>
        <h3>Payments</h3>
        <div className={list}>
            {payments.map(p => <PaymentEntry key={p.id} payment={p} onRemove={onRemovePayment}/>)}
            {showAdd && <PaymentEntryForm onSave={onSave} onClose={onClose}/>}
        </div>

        <div className={footer}>
            <TagButton icon={"PlusThin"} text={"Add"} onClick={onAdd}/>
        </div>
    </div>;
};

