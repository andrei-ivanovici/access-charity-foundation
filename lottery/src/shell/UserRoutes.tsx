import React from "react";
import {User} from "../services/login.service";
import {Redirect, Route, Switch} from "react-router";
import {Dashboard} from "../dashboard/Dashboard";
import {Profile} from "../profile/Profile";

export interface UserRoutesProps {
    user: User;
}

export function UserRoutes({user}: UserRoutesProps) {
    return <Switch>
        <Route path={"/user/dashboard"}>
            <Dashboard/>
        </Route>
        <Route path={"/profile"}>
            <Profile user={user}/>
        </Route>
        <Route path={"/"} exact={true}>
            <Redirect to={"/user/dashboard"}/>
        </Route>
    </Switch>
}
