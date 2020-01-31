import React from "react";
import {UserTickets} from "./user-tickets/UserTickets";
import {WinningCharity} from "./winning-charity/WinningCharity";
import {LotteryHistory} from "./lottery-history/LotteryHistory";
import {navigationService} from "../services/navigation.service";
import {CurrentLottery} from "./currentLottery/CurrentLottery";
import {User} from "../services/login.service";
import {TagButton} from "@tag/tag-components-react-v2";
import "./Dashboard.css";

interface DashboardProps {
    user: User;
}

function newTicket() {
    navigationService.go("/buy-ticket");
}

export function Dashboard({user}: DashboardProps) {
    return(
        <>
        <WinningCharity />
            <span className={'btn-buy'}>
            <TagButton onClick={newTicket} text={"Buy Ticket"}/>
            </span>
        <LotteryHistory currentUser = {user}/>
            <UserTickets currentUser={user}/>
            <CurrentLottery/>
        </>
    );
}
