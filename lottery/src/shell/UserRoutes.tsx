import React from "react";
import {User} from "../services/login.service";
import {Redirect, Route, Switch} from "react-router";
import {Dashboard} from "../dashboard/Dashboard";
import {Profile} from "../profile/Profile";
import {TicketWizard} from "../ticket/TicketWizard/TicketWizard";

export interface UserRoutesProps {
    user: User;
}

export function UserRoutes({user}: UserRoutesProps) {
    return <Switch>
        <Route path={"/user/dashboard"}>
            <Dashboard/>
        </Route>
        <Route path={"/buy-ticket"}>
            <TicketWizard user={user!}/>
        </Route>
        <Route path={"/profile"}>
            <Profile user={user}/>
        </Route>
        <Route path={"/"} exact={true}>
            <Redirect to={"/user/dashboard"}/>
        </Route>
    </Switch>
}
