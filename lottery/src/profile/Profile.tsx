import React from "react";
import style from "./Profile.module.scss"
import {TagCardProfile} from "@tag/tag-components-react-v2";
import {User} from "../services/login.service";
import {UserInfo} from "./user-info/UserInfo";
import {PaymentInfo} from "./payment-info/PaymentInfo";

const {root} = style;

export interface ProfileProps {
    user: User;
}

export function Profile({user}: ProfileProps) {
    return <div className={root}>
        <UserInfo user={user}/>


        <PaymentInfo/>

    </div>
}
