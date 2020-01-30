import React, {useState} from "react";
import style from "./LogIn.module.scss";
import {TagButton, TagEditField} from "@tag/tag-components-react-v2";
import {loginService} from "../../services/login.service";
import {navigationService} from "../../services/navigation.service";

const {form: formClass, root: rootClass} = style;


interface Credentials {
    username: string;
    password: string;
}

export function LogIn() {

    const [credentials, setCredentials] = useState<Credentials>({username: "", password: ""});
    const {password, username} = credentials;
    return <div className={rootClass}>
        Login
        <div className={formClass}>
            <TagEditField
                label='email'
                value={username}
                onValueChange={v => setCredentials({
                    ...credentials,
                    username: v.detail.value
                })}
            />

            <TagEditField editor={"password"}
                          value={password}
                          onValueChange={v => setCredentials({
                              ...credentials,
                              password: v.detail.value
                          })}
                          label='password'
            />

            <TagButton onClick={() => doLogin(credentials)} text={"Login"}/>
            <TagButton onClick={() => register()} text={"Register"}/>
        </div>
    </div>
}

function register() {
    navigationService.go("/register")
}

async function doLogin({username, password}: Credentials) {
    await loginService.login(username, password);


}
