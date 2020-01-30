import React from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {GuardedRoute} from "../components/GuardedRoute";
import {App} from "../shell/App";
import {LogIn} from "../authorization/login/LogIn";


function useAuthorization() {

    return {
        isAuthorized: false
    }
}

export function Root() {
    const {isAuthorized} = useAuthorization();

    return <BrowserRouter>
        <Switch>
            <Route path={"/"}>
                <GuardedRoute canNavigate={() => isAuthorized}
                              onSuccess={() => <App/>}
                              onFail={() => <Redirect to={"/login"}/>}
                />
            </Route>
            <Route path={"/login"}>
                <LogIn/>
            </Route>
        </Switch>
    </BrowserRouter>
}
