import React from "react";
import {UserTickets} from "./user-tickets/UserTickets";
import {navigationService} from "../services/navigation.service";
import {CurrentLottery} from "./currentLottery/CurrentLottery";

function newTicket() {
    navigationService.go("/buy-ticket");
}

export function Dashboard() {
    return (<>
        <div>Dashboard</div>
        <UserTickets/>
        <CurrentLottery/>
        <button onClick={newTicket}>New Ticket</button>
    </>)
}
