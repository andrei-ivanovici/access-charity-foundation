import React, {useState} from "react";
import {TagButton, TagCombobox, TagEditField} from "@tag/tag-components-react-v2";
import style from "./Register.module.scss"
import {loginService, User} from "../../services/login.service";
import {navigationService} from "../../services/navigation.service";

const {
    root: rootClass,
    form: formClass,
} = style;

type RegisteredUser = User & {
    password: string;
    confirmPassword: string;
    role: string
}

export function Register() {
    const [newUser, setNewUser] = useState<RegisteredUser>({
        confirmPassword: "",
        mail: "",
        name: "",
        password: "",
        role: "user"
    });
    const {password, name, mail, confirmPassword, role} = newUser;
    return <div className={rootClass}>
        Register
        <div className={formClass}>
            <TagEditField
                label='name'
                value={name}
                onValueChange={v => setNewUser({
                    ...newUser,
                    name: v.detail.value
                })}
            />
            <TagEditField
                label='email'
                value={mail}
                onValueChange={v => setNewUser({
                    ...newUser,
                    mail: v.detail.value
                })}
            />

            <TagEditField editor={"password"}
                          value={password}
                          onValueChange={v => setNewUser({
                              ...newUser,
                              password: v.detail.value
                          })}
                          label='password'
            />
            <TagEditField editor={"password"}
                          value={confirmPassword}
                          onValueChange={v => setNewUser({
                              ...newUser,
                              confirmPassword: v.detail.value
                          })}
                          label='Confirm Password'

            />
            <TagCombobox
                textField='name'
                valueField='id'
                placeholder='Card type'
                value={role}
                onValueChange={c => setNewUser({
                    ...newUser,
                    role: c.detail.item.id
                })}
                data={[
                    {id: "user", name: 'User'},
                    {id: "admin", name: 'Admin'}
                ]}
            />

            <TagButton onClick={() => doRegister(newUser)} text={"Register"}/>
        </div>
    </div>
}

async function doRegister(credentials: RegisteredUser) {
    await loginService.register(credentials);
    navigationService.go("/login");
}
