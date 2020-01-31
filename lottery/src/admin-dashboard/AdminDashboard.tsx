import React from "react";
import { TagCard, TagAppHeader, TagStats, TagButton } from "@tag/tag-components-react-v2";
import style from "./AdminDashboard.module.scss";
import { navigationService } from "../services/navigation.service";
import {LotteryInfo} from "./lottery-info/LotteryInfo";
import {DrawTile} from "./draw/DrawTile";

const { main: mainClass, cardContent: cardContentClass } = style;

function newLottery() {
    navigationService.newLottery();
}

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


             <LotteryInfo/>

             <DrawTile/>

            {/*<TagCard*/}
            {/*    accent='porcelain'*/}
            {/*    background-image='access'*/}
            {/*    style={{ minWidth: "400px", minHeight: "400px", height: "400px", width: "400px" }}>*/}
            {/*    <TagAppHeader*/}
            {/*        icon='Trophy'*/}
            {/*        iconAccent="plum"*/}
            {/*        heading='Draw'*/}
            {/*        heading-accent='plum'*/}
            {/*    />*/}
            {/*    <div className={cardContentClass}>Draw Info</div>*/}
            {/*</TagCard>*/}

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
                <div className={cardContentClass}>
                    <TagButton
                        text="New Lottery"
                        onClick={newLottery}>
                    </TagButton>
                </div>
            </TagCard>
        </div>
    )

}
