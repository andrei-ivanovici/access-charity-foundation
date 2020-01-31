import React from "react";
import {UserTickets} from "./user-tickets/UserTickets";
import {navigationService} from "../services/navigation.service";

function newTicket() {
    navigationService.go("/buy-ticket");
}

export function Dashboard() {
    return (<>
        <div>Dashboard</div>
        <UserTickets/>
        <button onClick={newTicket}>New Ticket</button>
    </>)
}
