import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import {adminDashboardService} from "../admin-dashboard.service";


function useData() {
    const [info, setInfo] = useState()
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
        <TagStats
            accent='plum'
            heading='Charity Name'
            labelField='label'
            valueField='value'
            data={[
                {label: 'Tickets sold', value: '100'},
                {label: 'Amount raised', value: '100000'},
            ]}
        />
    </TagCard>
}
