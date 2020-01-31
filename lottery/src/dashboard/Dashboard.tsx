import React from "react";
import {WinningCharity} from "./winning-charity/WinningCharity";
import {LotteryHistory} from "./lottery-history/LotteryHistory";
import {navigationService} from "../services/navigation.service";

function newTicket() {
    navigationService.go("/buy-ticket");
}

export function Dashboard() {
    return(
        <>
        <div>Dashboard</div>
        <WinningCharity />
        <LotteryHistory/>
        </>
    );
}
