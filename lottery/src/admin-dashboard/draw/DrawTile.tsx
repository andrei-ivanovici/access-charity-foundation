import React, {useEffect, useState} from "react";
import {TagAppHeader, TagButton, TagCard} from "@tag/tag-components-react-v2";
import {adminDashboardService, DrawResult} from "../admin-dashboard.service";
import style from "./DrawTile.module.scss"

const {details, actions} = style;

function useDraw() {

    const [draw, setDraw] = useState<DrawResult>({
        charity: {} as any,
        ticket: {} as any,
        user: {} as any,
        totalParticipants: 0
    });
    useEffect(() => {
        const loadData = async () => {
            const data = await adminDashboardService.getLastDrawAsync();
            setDraw(data);
        };
        loadData();
    }, [])

    return {
        draw,
        onDraw: async () => {
            const draw = await adminDashboardService.draw();
            setDraw(draw);
        }
    }
}

export function DrawTile() {
    const {onDraw, draw} = useDraw();
    return <TagCard
        accent='porcelain'
        background-image='access'
        style={{ minWidth: "400px", height: "400px", width: "400px" }}>
        <TagAppHeader
            icon='Trophy'
            iconAccent="plum"
            heading='DrawTile'
            heading-accent='plum'
        />
        <div className={details}>
            <div>Winner</div>
            <div>{draw.user.name}</div>

            <div>Charity</div>
            <div>{draw.charity.name}</div>

            <div>Participants</div>
            <div>{draw.totalParticipants}</div>


        </div>
        <div className={actions}>
            <TagButton text={"Draw Winner"} onClick={onDraw}/>
        </div>
    </TagCard>
}
