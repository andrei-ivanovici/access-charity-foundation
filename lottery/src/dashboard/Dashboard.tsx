import React from "react";
import {WinningCharity} from "./winning-charity/WinningCharity";
import {LotteryHistory} from "./lottery-history/LotteryHistory";

export function Dashboard() {
    return(
        <>
        <div>Dashboard</div>
        <WinningCharity />
        <LotteryHistory/>
        </>
    );
}
