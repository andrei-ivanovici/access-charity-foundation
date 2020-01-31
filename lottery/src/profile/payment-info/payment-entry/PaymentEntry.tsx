import React, {useMemo} from 'react';
import {Payment} from "../../profile.service";
import {TagAppHeader, TagCard} from "@tag/tag-components-react-v2";
import style from "./PaymentEntry.module.scss";
import visaLogo from "./visa.png";
import masterCard from "./mastercard.png";

const {
    root, cardDetails, logo: logoClass, cardNumber
} = style;

export interface PaymentEntryProps {
    payment: Payment
    onRemove: (item: Payment) => void
}

function useLogo(payment: Payment) {
    return useMemo(() => payment.cardType == "visa" ?
        {
            logo: visaLogo,
            color: "navy"
        } : {
            logo: masterCard,
            color: "keppel" as any
        }, [payment]);
}

export function PaymentEntry({payment, onRemove}: PaymentEntryProps) {
    const {logo, color} = useLogo(payment);
    return <div className={root}>
        <TagCard
            version={2}
            accent={color}
            style={{minWidth: "430px"}}>
            <TagAppHeader
                icon='Payslip'
                heading='Card Details'
                heading-accent='white'
                menuItems={[
                    {
                        icon: 'Delete',
                        name: 'remove',
                        text: 'Remove',
                    },
                ]}
                onMenuItemClick={item => onRemove(payment)}
            />
            <div className={cardDetails}>
                <div className={cardNumber}>{payment.cardNumber}</div>
                <img src={logo} className={logoClass}/>
            </div>
        </TagCard>
    </div>;
}
