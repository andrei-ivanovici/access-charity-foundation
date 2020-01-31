import React, {useEffect, useState} from "react";
import {TagAvatar, TagButton, TagEditField} from "@tag/tag-components-react-v2";
import defaultAvatar from "../../shell/user-profile/defaultUser.png";
import {User} from "../../services/login.service";
import style from "./UserInfo.module.scss";

const {root, avatar, footer, formField} = style;

export interface UserDetailsProps {
    user: User;
    onSaveUserInfo: (user: User) => void
}

function useFormData(user: User) {
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        setUserInfo(user)
    }, [user]);


    return {
        userInfo,
        reset: () => {
            setUserInfo(user);
        },
        updateUser: (user: Partial<User>) => {
            setUserInfo({
                ...userInfo,
                ...user
            })
        }

    }
}

export function UserInfo({user, onSaveUserInfo}: UserDetailsProps) {

    const {userInfo, reset, updateUser} = useFormData(user);
    if (!userInfo) {
        return null;
    }
    return <div className={root}>

        <TagAvatar className={avatar}
                   src={(userInfo && userInfo.avatar) || defaultAvatar}
                   size='120px'
        />
        <div>
            <div className={formField}>
                <TagEditField label={"Name"} value={userInfo.name} onValueChange={e => {
                    updateUser({
                        name: e.detail.value
                    })
                }}/>
            </div>
            <div className={formField}>
                <TagEditField label={"E-mail"} value={userInfo.mail} onValueChange={e => {
                    updateUser({
                        mail: e.detail.value
                    })
                }}/>
            </div>
            <div className={formField}>
                <TagEditField label={"Address Line"} value={userInfo.address}
                              onValueChange={e => {
                                  updateUser({
                                      address: e.detail.value
                                  })
                              }}/>
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
                onClick={() => onSaveUserInfo(userInfo)}
            />

            < TagButton
                text={"Reset"}
                icon={"Save"}
                onClick={reset}
                buttonIconStyle={
                    {
                        fill: "#c3c3c3"
                    }
                }
            />
        </div>

    </div>;
}
