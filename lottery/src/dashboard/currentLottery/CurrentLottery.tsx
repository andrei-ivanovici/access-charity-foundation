import {TagAppHeader, TagCard, TagList, TagStats} from "@tag/tag-components-react-v2";
import React, {useEffect, useState} from "react";
import {Config, getAppConfig} from "../../app.config";

interface CharityInfo {
    id: number;
    name: string;
}

interface LotteryInfo {
    id: number;
    name: string;
    charities: CharityInfo[];
    price: number;
    drawDate: string;
}

export const CurrentLottery = () => {
    const [lotteryInfo, setLotteryInfo] = useState<LotteryInfo>();
    const [charityList, setCharityList] = useState<CharityInfo[]>([] as any[]);
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/LotteryEventApi/latest`;
    useEffect(() => {
        (async () => {
            const result = await fetch(url);
            const lotteryInfo = JSON.parse(await result.text()) as LotteryInfo;
            setLotteryInfo(lotteryInfo);
            setCharityList(lotteryInfo.charities)
        })()


    }, []);

    const charityData = charityList.map(c => ({
        name: c.name
    }));

    return (
        <TagCard
            className="current-lottery"
            accent='shiraz'
            style={{minWidth: "430px", marginTop: "100px"}}>
            <TagAppHeader
                icon='ArrowRight'
                heading='Active Lottery'
                heading-accent='white'
            />
            <TagStats
                accent='white'
                heading=''
                subHeading=''
                labelField='label'
                valueField='value'
                data={[
                    {label: 'Lottery Name', value: lotteryInfo?.name},
                    {label: 'Ticket Price', value: `${lotteryInfo?.price}$`},
                ]}
            />
            <TagList
                leftIcon='Circle'
                leftIconAccent='access'
                primaryField='name'
                data={charityData}
            />
        </TagCard>
    );
};