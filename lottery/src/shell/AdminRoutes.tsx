import React from "react";
import {User} from "../services/login.service";
import {Redirect, Route, Switch} from "react-router";
import {Profile} from "../profile/Profile";
import {AdminDashboard} from "../admin-dashboard/AdminDashboard";

export interface AdminRoutes {
    user: User;
}

export function AdminRoutes({user}: AdminRoutes) {
    return <Switch>
        <Route exact path={"/"}>
            <Redirect to={"/admin/settings"}/>
        </Route>
        <Route path={"/admin/settings"}>
            <AdminDashboard/>
        </Route>
        <Route path={"/profile"}>
            <Profile user={user}/>
        </Route>

    </Switch>
}
