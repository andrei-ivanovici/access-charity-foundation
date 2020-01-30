import React, { useState } from 'react';
import { TagEditField, TagCombobox, TagList, TagButton } from '@tag/tag-components-react-v2';

import style from "./Lottery.module.scss";

const { lottery: lotteryClass } = style;

export interface ICharity {
    id: string;
    name: string;
}

interface ILotteryProps {
    charities: ICharity[];
    submit: (state: ILotteryInfo) => void;
}

interface ILotteryInfo {
    charities: ICharity[];
    name: string;
    price: number;
}

interface ILotteryState {
    selectedCharityIds: string[];
    name: string;
    price: number;
}

const demoCharities: ICharity[] = [
    {
        id: "1",
        name: "Save the kittens"
    },
    {
        id: "2",
        name: "Hot meals on winter days"
    },
    {
        id: "3",
        name: "Nests for storks"
    }
];

export function Lottery(props: ILotteryProps) {
    const [lotteryState, setLotteryState] = useState<ILotteryState>({ name: '', price: 10, selectedCharityIds: [] });
    const { name, price, selectedCharityIds } = lotteryState;
    const charities = props.charities.length ? props.charities : demoCharities;

    const availableCharities = charities.filter(c => !selectedCharityIds.includes(c.id));
    const selectedCharities = charities.filter(c => selectedCharityIds.includes(c.id));
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
                min={1}
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
                        data={selectedCharities}
                        onButtonClick={event => {
                            setLotteryState({
                                ...lotteryState,
                                selectedCharityIds: selectedCharityIds.filter(sci => sci !== event.detail.item.id)
                            })
                        }} /> :
                    null
            }
            {
                name && price && selectedCharityIds.length > 0 ? 
                    <TagButton
                        text='Submit'
                        onClick={()=>{
                            console.log(name, price, charities.filter(c => selectedCharityIds.includes(c.id)))
                            props.submit({
                                name,
                                price,
                                charities: charities.filter(c => selectedCharityIds.includes(c.id))
                            })
                        }}/> :
                    null
            }
        </div>
    )
}
