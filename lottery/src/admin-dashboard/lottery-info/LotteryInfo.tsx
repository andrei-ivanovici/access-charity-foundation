import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import {adminDashboardService, LotteryTileInfo} from "../admin-dashboard.service";
import style from "./LotteryInfo.module.scss";

const {cardContent} = style;

function useData() {
    const [info, setInfo] = useState<LotteryTileInfo>({
        lotteryName: "",
        raised: 0,
        soldCount: 0
    });
    useEffect(() => {
        const loadData = async () => {
            const result = await adminDashboardService.latestLotteryInfo();
            setInfo(result);
        };
        loadData();
    }, []);

    return {info};
}

export function LotteryInfo() {

    const {info} = useData();
    return <TagCard
        accent='porcelain'
        background-image='access'
        style={{minWidth: "400px", height: "400px", width: "400px"}}>
        <TagAppHeader
            icon='Trophy'
            iconAccent="plum"
            heading='Charity lottery information'
            heading-accent='plum'
        />
        <div className={cardContent}>
            <TagStats
                accent='plum'
                heading={info?.lotteryName}
                labelField='label'
                valueField='value'
                data={[
                    {label: 'Tickets sold', value: info?.soldCount},
                    {label: 'Amount raised', value: info?.raised},
                ]}
            />
        </div>
    </TagCard>
}
