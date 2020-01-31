import React from "react";
import style from "./TopNav.module.scss";
import {TagAccessLogo, TagIcon} from "@tag/tag-components-react-v2";
import {User} from "../../services/login.service";
import {UserProfile} from "../../shell/user-profile/UserProfile";
import clsx from "clsx";

const {root, headerContent, admin, logo} = style;

export interface TopNavProps {
    user: User;
    className?: string
}

function useTitle(uer: User) {
    const title = "Foundation";
    return title;

}

export function TopNav({user, className,}: TopNavProps) {
    const title = useTitle(user);
    const clazz = clsx(className, root, {[admin]: user.role === 'admin'});
    return <div className={clazz}>

        {user.role == 'admin' ?
            <TagIcon icon={"Access"} className={logo} accent={"white"} size={"medium"}/>
            : <TagAccessLogo className={logo}/>}
        <div className={headerContent}>
            {title}
            <UserProfile user={user}/>
        </div>
    </div>
}
