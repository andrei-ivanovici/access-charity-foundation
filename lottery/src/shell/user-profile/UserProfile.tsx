import React from "react";
import {TagAvatar} from "@tag/tag-components-react-v2";
import {User} from "../../services/login.service";
import defaultAvatar from "./defaultUser.png"
import style from "./UserProfile.module.scss"

const {root, avatar, name} = style;

export interface UserProfileProps {
    user: User;
}

export function UserProfile({user}: UserProfileProps) {
    return <div className={root}>
        <div className={name}>{user.name}</div>
        <TagAvatar
            className={avatar}
            src={user.avatar || defaultAvatar}
            size='40px'
            placeholder='GS'/>
    </div>
}
