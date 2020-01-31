import React from "react";
import {navigationService} from "../services/navigation.service";

function newTicket() {
    navigationService.go("/buy-ticket");
}

export function Dashboard() {
    return <div>
        <button onClick={newTicket}>New Ticket</button>
    </div>
}
