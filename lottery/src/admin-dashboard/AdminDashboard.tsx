import React from "react";
import {TagCard, TagAppHeader, TagStats} from "@tag/tag-components-react-v2";
import "./AdminDashboard.css";
import {navigationService} from "../services/navigation.service";

function newLottery() {
    navigationService.newLottery();
}

export function AdminDashboard() {
    return (
        <div className="main">
            <TagCard
                accent='porcelain'
                background-image='access'
                style={{minWidth: "400px", minHeight: "400px", height: "400px", width: "400px"}}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Current Charity'
                    heading-accent='plum'
                />
                <div className="spacer">Current charity</div>
            </TagCard>
            <div className="space"></div>
            <TagCard
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
            <div className="space"></div>

            <TagCard
                accent='porcelain'
                background-image='access'
                style={{minWidth: "400px", minHeight: "400px", height: "400px", width: "400px"}}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Draw'
                    heading-accent='plum'
                />
            </TagCard>
            <div className="space"></div>
            <TagCard
                accent='porcelain'
                background-image='access'
                style={{minWidth: "400px", minHeight: "400px", height: "400px", width: "400px"}}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Create new lottery'
                    heading-accent='plum'
                />
                <button onClick={newLottery}>New Lottery</button>
            </TagCard>
        </div>
    )

}
