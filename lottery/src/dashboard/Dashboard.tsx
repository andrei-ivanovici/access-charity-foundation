import React from "react";
import {WinningCharity} from "./winning-charity/WinningCharity";
import {LotteryHistory} from "./lottery-history/LotteryHistory";
import {navigationService} from "../services/navigation.service";
import {User} from "../services/login.service";

interface DashboardProps {
    user: User;
}
function newTicket() {
    navigationService.go("/buy-ticket");
}

export function Dashboard({user}: DashboardProps) {
    return(
        <>
        <div>Dashboard</div>
        <WinningCharity />
        <LotteryHistory currentUser = {user}/>
        </>
    );
}
