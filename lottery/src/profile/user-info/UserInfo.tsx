import React from "react";
import {TagAvatar, TagButton, TagEditField} from "@tag/tag-components-react-v2";
import defaultAvatar from "../../shell/user-profile/defaultUser.png";
import {User} from "../../services/login.service";
import style from "./UserInfo.module.scss";

const {root, avatar, footer, formField} = style;

export interface UserDetailsProps {
    user: User;
}

export function UserInfo({user}: UserDetailsProps) {
    return <div className={root}>

        <TagAvatar className={avatar}
                   src={user.avatar || defaultAvatar}
                   size='120px'
        />
        <div>
            <div className={formField}>
                <TagEditField label={"Name"} value={user.name}/>
            </div>
            <div className={formField}>
                <TagEditField label={"E-mail"} value={user.mail}/>
            </div>
            <div className={formField}>
                <TagEditField label={"Address Line"} value={user.address}/>
            </div>
        </div>
        < div className={footer}>
            < TagButton
                text={"Save"}
                icon={"Save"}
                accent={"access"}
                buttonIconStyle={
                    {
                        fill: "#FFF"
                    }
                }
            />

            < TagButton
                text={"Reset"}
                icon={"Save"}
                buttonIconStyle={
                    {
                        fill: "#c3c3c3"
                    }
                }
            />
        </div>

    </div>;
}
