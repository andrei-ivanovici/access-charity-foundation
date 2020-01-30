import React from "react";
import {BrowserRouter, Route, Redirect, Switch, Router} from "react-router-dom";
import {GuardedRoute} from "../components/GuardedRoute";
import {App} from "../shell/App";
import {LogIn} from "../authorization/login/LogIn";
import {appHistory} from "../services/navigation.service";
import {Register} from "../authorization/register/Register";


function useAuthorization() {

    return {
        isAuthorized: false
    }
}

export function Root() {
    const {isAuthorized} = useAuthorization();

    return <Router history={appHistory}>
        <Switch>
            <Route path={"/register"}>
                <Register/>
            </Route>
            <Route path={"/login"}>
                <GuardedRoute canNavigate={() => !isAuthorized}
                              onSuccess={() => <LogIn/>}
                              onFail={() => <Redirect to={"/"}/>}
                />
            </Route>
            <Route path={"/"}>
                <GuardedRoute canNavigate={() => isAuthorized}
                              onSuccess={() => <App/>}
                              onFail={() => <Redirect to={"/login"}/>}
                />
            </Route>
        </Switch>
    </Router>
}
