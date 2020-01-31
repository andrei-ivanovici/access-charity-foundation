import React, {useMemo, useEffect, useState} from "react";
import style from "./Profile.module.scss";
import {loginService, User} from "../services/login.service";
import {UserInfo} from "./user-info/UserInfo";
import {PaymentInfo} from "./payment-info/PaymentInfo";
import {ProfileService, ProfileData, Payment} from "./profile.service";

const {root} = style;

export interface ProfileProps {
    user: User;
}


function useData({user}: ProfileProps) {
    const [profile, setProfile] = useState<ProfileData>({} as any);
    const [loading, setIsLoading] = useState(true);
    const profileService = useMemo(() => new ProfileService(), []);

    const loadData = async () => {

        setIsLoading(true);
        const result = await profileService.loadProfile(user);
        setIsLoading(false);
        setProfile(result);
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        profile,
        loading,
        saveNewPayment: async (payment: Payment) => {
            await profileService.savePayment(profile.user.id!, payment);
            await loadData();
        },
        removePayment: async (payment: Payment) => {
            await profileService.removePayment(profile.user.id!, payment);
            await loadData();
        },
        saveInfo: async (user: User) => {
            await profileService.saveUser(user);
            await loadData();
            refreshUser();
        }
    };
}

function refreshUser() {
    loginService.refresh();
}

export function Profile(props: ProfileProps) {
    const {profile: {user: userInfo, payments: paymentSources}, saveNewPayment, removePayment, saveInfo} = useData(props);
    return <div className={root}>
        {(userInfo && paymentSources) ? (
                <>
                    <UserInfo user={userInfo} onSaveUserInfo={saveInfo}/>
                    <PaymentInfo payments={paymentSources}
                                 onNewPayment={saveNewPayment}
                                 onRemovePayment={removePayment}/>
                </>)
            : <div>Loading ...</div>
        }
    </div>;
}
