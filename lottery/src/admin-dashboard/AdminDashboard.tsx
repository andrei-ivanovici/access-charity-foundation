import React from "react";
import { TagCard, TagAppHeader, TagStats } from "@tag/tag-components-react-v2";
import style from "./AdminDashboard.module.scss";

const { main: mainClass, cardContent: cardContentClass, space: spaceClass } = style;

export function AdminDashboard() {
    return (
        <div className={mainClass}>
            <TagCard
                accent='porcelain'
                background-image='access'
                style={{ minWidth: "400px", minHeight: "400px", height: "400px", width: "400px" }}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Current Charity'
                    heading-accent='plum'
                />
                <div className={cardContentClass}>Current charity</div>
            </TagCard>

            <TagCard
                accent='porcelain'
                background-image='access'
                style={{ minWidth: "400px", height: "400px", width: "400px" }}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Charity lottery information'
                    heading-accent='plum'
                />
                <div className={cardContentClass}>
                    <TagStats
                        accent='plum'
                        heading='Charity Name'
                        labelField='label'
                        valueField='value'
                        data={[
                            { label: 'Tickets sold', value: '100' },
                            { label: 'Amount raised', value: '100000' },
                        ]}
                    />
                </div>
            </TagCard>

            <TagCard
                accent='porcelain'
                background-image='access'
                style={{ minWidth: "400px", minHeight: "400px", height: "400px", width: "400px" }}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Draw'
                    heading-accent='plum'
                />
                <div className={cardContentClass}>Draw Info</div>
            </TagCard>

            <TagCard
                accent='porcelain'
                background-image='access'
                style={{ minWidth: "400px", minHeight: "400px", height: "400px", width: "400px" }}>
                <TagAppHeader
                    icon='Trophy'
                    iconAccent="plum"
                    heading='Create new lottery'
                    heading-accent='plum'
                />
                <div className={cardContentClass}>Create Lottery</div>
            </TagCard>
        </div>
    )

}
