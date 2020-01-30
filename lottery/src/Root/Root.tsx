import React, { useEffect, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { GuardedRoute } from "../components/GuardedRoute";
import { App } from "../shell/App";
import { LogIn } from "../authorization/login/LogIn";
import { appHistory } from "../services/navigation.service";
import { Register } from "../authorization/register/Register";
import { Lottery } from "../components/lottery/Lottery";
import { loginService, User } from "../services/login.service";
import TicketWizard from "../ticket/TicketWizard/TicketWizard";

function useAuthorization() {

    const [activeUser, setActiveUse] = useState<User>();

    useEffect(() => {

        const activeUser = loginService.tryRestorePayload() as any;
        setActiveUse(activeUser);
        loginService.observeUserChange(setActiveUse)
    }, []);

    return {
        isAuthorized: !!activeUser,
    }
}

export function Root() {
    const { isAuthorized } = useAuthorization();

    return (
        <><Router history={appHistory}>
            <Switch>
                <Route path={"/register"}>
                    <Register />
                </Route>
                <Route path={"/login"}>
                    <GuardedRoute canNavigate={() => !isAuthorized}
                        onSuccess={() => <LogIn />}
                        onFail={() => <Redirect to={"/"} />}
                    />
                </Route>
                <Route path={"/buy-ticket"}>
                    <TicketWizard />
                </Route>
                <Route path={"/"}>
                    <GuardedRoute canNavigate={() => isAuthorized}
                        onSuccess={() => <App />}
                        onFail={() => <Redirect to={"/login"} />}
                    />

                </Route>
            </Switch>
        </Router>
        </>
    );
}
