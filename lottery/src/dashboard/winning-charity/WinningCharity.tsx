import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import {Config, getAppConfig} from "../../app.config";

interface Charity{
    name: string;
}

export const WinningCharity: React.FC = () => {

    const[charity, setCharity] = useState({name:""});
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/CharityEntities/1`;
    useEffect(()=>{
        (async() =>{
            const result = await fetch(url);
            const dbCharity = JSON.parse(await  result.text()) as Charity;
            console.log(dbCharity.name);
            setCharity(dbCharity);
            return dbCharity;
        })();
    }, []);

    return (
        <TagCard
            accent='access'
            background-image='access'
            style={{minWidth: "430px"}}>
            <TagAppHeader
                icon='CashBook'
                heading='Winning charity'
                heading-accent='white'
            />
            <TagStats
                accent='white'
                heading='Charity'
                labelField='label'
                valueField='value'
                data={[
                    {label: 'Charity', value: charity.name},
                    {label: 'Funds', value: '£66,040.98'},
                ]}
            />
        </TagCard>
    );
};