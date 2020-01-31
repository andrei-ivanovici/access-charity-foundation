import React, {useState} from 'react';
import {TagCombobox, TagEditField, TagModal, TagButton} from "@tag/tag-components-react-v2";
import {Payment} from "../../profile.service";
import style from "./PaymentEntryForm.module.scss";

const {footer, btn, root} = style;

export interface PaymentEntryFormProps {
    onSave: (info: Payment) => void;
    onClose: () => void;
}

export function PaymentEntryForm({onClose, onSave}: PaymentEntryFormProps) {
    const [payment, setPayment] = useState<Payment>({
        cardType: "",
        cardNumber: ""
    });
    const {cardType, cardNumber} = payment;
    return <TagModal
        className={root}
        heading='Add new card'
        visible={true}
    >
        <div>
            <TagEditField
                label='Number'
                value={cardNumber}
                onValueChange={v => setPayment({
                    ...payment,
                    cardNumber: v.detail.value
                })}
            />
            <TagCombobox
                textField='name'
                valueField='id'
                placeholder='Card type'
                value={cardType}
                onValueChange={c => setPayment({
                    ...payment,
                    cardType: c.detail.value
                })}
                data={[
                    {id: "visa", name: 'Visa'},
                    {id: "mastercard", name: 'Master Card'},]}
            />
            <div className={footer}>
                <TagButton className={btn} accent={"access"} text={"Save"} onClick={() => onSave(payment)}/>
                <TagButton className={btn} text={"Cancel"} onClick={onClose}/>
            </div>

        </div>
    </TagModal>;
}
