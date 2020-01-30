import React, { useState } from 'react';
import { TagEditField, TagCombobox, TagList } from '@tag/tag-components-react-v2';

import style from "./Lottery.module.scss";

const { lottery: lotteryClass } = style;

export interface ICharity {
    id: string;
    name: string;
}

interface ILotteryProps {
    charities: ICharity[]
}

interface ILotteryState {
    selectedCharityIds: string[];
    name: string;
    price: number;
}



export function Lottery(props: ILotteryProps) {
    const [lotteryState, setLotteryState] = useState<ILotteryState>({ name: '', price: 10, selectedCharityIds: [] });
    const { name, price, selectedCharityIds } = lotteryState;

    const availableCharities = props.charities.filter(c => !selectedCharityIds.includes(c.id));
    const selectedCharities = props.charities.filter(c => selectedCharityIds.includes(c.id));
    const charitiesList = selectedCharities.map(c => <li key={c.id}>{c.name}</li>);

    return (
        <div className={lotteryClass}>
            <TagEditField
                label='Lottery Name'
                value={name}
                onValueChange={s => setLotteryState({
                    ...lotteryState,
                    name: s.detail.value
                })}
            />
            <TagEditField
                label='Price'
                value={price}
                editor='number'
                onValueChange={s => setLotteryState({
                    ...lotteryState,
                    price: s.detail.value
                })}
            />
            <TagCombobox
                textField='name'
                valueField='id'
                placeholder='Select charities'
                clearButton
                data={availableCharities}
                onValueChange={s => {
                    setLotteryState({
                        ...lotteryState,
                        selectedCharityIds: [...selectedCharityIds, s.detail.value]
                    });
                }
                }
            />
            {
                charitiesList.length ?
                <TagList
                    primaryField='name'
                    button1='Delete'
                    data={selectedCharities}/> :
                    null
            }
        </div>
    )
}
