import React, { useState, useEffect } from 'react';
import { TagEditField, TagCombobox, TagList, TagButton, TagDatePicker } from '@tag/tag-components-react-v2';

import style from "./Lottery.module.scss";
import { ICharity, lotteryService } from '../../services/lottery.service';

const { lottery: lotteryClass } = style;

interface ILotteryState {
    selectedCharityIds: string[];
    charities: ICharity[];
    name: string;
    price: number;
    drawDate: Date;
}

async function getCharities() {
    return lotteryService.getCharities();
}

export function Lottery() {
    const [lotteryState, setLotteryState] = useState<ILotteryState>({
        name: '', price: 10,
        selectedCharityIds: [],
        drawDate: undefined as any,
        charities: []
    });
    const { name, price, selectedCharityIds, drawDate, charities } = lotteryState;

    const availableCharities = charities.filter(c => !selectedCharityIds.includes(c.id));
    const selectedCharities = charities.filter(c => selectedCharityIds.includes(c.id));
    const charitiesList = selectedCharities.map(c => <li key={c.id}>{c.name}</li>);

    useEffect(() => {
        getCharities().then(cs => {
            setLotteryState({
                ...lotteryState,
                charities: cs.data
            })
        });
    }, []);

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
                    price: +s.detail.value
                })}
            />
            <TagDatePicker
                value={drawDate}
                placeholder="Select draw date"
                onValueChange={d => {
                    drawDate !== d.detail.value &&
                        setLotteryState({
                            ...lotteryState,
                            drawDate: d.detail.value
                        })
                }} />
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
                        onClick={() => {
                            console.log(name, price, drawDate, charities.filter(c => selectedCharityIds.includes(c.id)))
                            lotteryService.submitLottery({
                                name,
                                price,
                                drawDate,
                                charities: charities.filter(c => selectedCharityIds.includes(c.id))
                            })
                        }} /> :
                    null
            }
        </div>
    )
}
